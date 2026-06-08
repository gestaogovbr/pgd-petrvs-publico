import { Inject, Injectable, Injector, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ToolbarButton } from '../components/toolbar/toolbar-types';
import { IAppComponent, MenuContexto } from '../app-types';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';
import { NavigateService } from './navigate.service';

export type EntidadePetrvs = "ANTAQ" | "PRF" | "";

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public VERSAO_DB: number = 1;
  public VERSAO_SYS: number =  environment.versao;
  public IMAGES = environment.images;
  public ENTIDADE = environment.entidade || "";
  public ENV = environment.env || "";
  public SUPPORT_URL = environment.suporte || "";
  public app?: IAppComponent;
  public set toolbarButtons(value: ToolbarButton[]) {
    this._toolbarButtons = value;
    if(this.refresh) this.refresh();
  }
  public get toolbarButtons(): ToolbarButton[] {
    return this._toolbarButtons;
  }

  private urlBuffer: {[url: string]: SafeUrl} = {};
  private _toolbarButtons: ToolbarButton[] = [];

  public horarioDelta = {
    servidor: new Date(),
    local: new Date()
  };

  public auth: AuthService;
  public go: NavigateService;
  public contexto?: MenuContexto;

  constructor(@Inject(DOCUMENT) private document: any, public injector: Injector) {
    this.auth = injector.get<AuthService>(AuthService);
    this.go = injector.get<NavigateService>(NavigateService);    
  }

  public refresh() {
    //this.document.getElementById("html-petrvs").setAttribute("data-bs-theme", this.theme)
    document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", this.theme);
    const themeLink = this.document.getElementById("theme-css") as HTMLLinkElement;
    if (themeLink) themeLink.href = this.theme + ".css";
    this.app!.cdRef.detectChanges();
  }

  public setContexto(context: string, goToContextoHome: boolean = true) {
    if(this.contexto?.key != context) {
      let novoContexto = this.app!.menuContexto.find(x => x.key == context);
      if(!this.auth.usuario || !novoContexto?.permition || this.auth.capacidades.includes(novoContexto.permition)) this.contexto = novoContexto;
      if(this.contexto && goToContextoHome) this.goHome();
      this.app!.cdRef.detectChanges();
    }
    if(this.auth.usuario && this.auth.usuarioConfig.menu_contexto != this.contexto?.key) {
      this.auth.usuarioConfig = { menu_contexto: this.contexto?.key || "" };
    }
  }

  public goHome() {
    this.go.navigate({ route: ["home", this.contexto!.key.toLowerCase()] });
  }

  public is(entidade: string): boolean {
    return environment.entidade == entidade;
  }

  public get baseURL(): string {
    //@ts-ignore
    const path = this.servidorURL as string;
    return path.endsWith("/") ? path : path + "/";
  }

  public get servidorURL(): string {
    //@ts-ignore
    return (environment.https ? 'https://' : 'http://') + environment.host;
  }

  public get isToolbar(): boolean {
    //@ts-ignore
    return false;
  }

  public get initialRoute(): string[] {
    //@ts-ignore
    const strRoute = (this.contexto ? "/home/"+ this.contexto!.key.toLowerCase() : "/home");
    return strRoute.substring(strRoute.startsWith("/") ? 1 : 0).split("/");
  }

  public get requireLogged(): boolean {
    //@ts-ignore
    return true;
  }

  public get useModals(): boolean {
    return true;
  }

  private _sanitizer?: DomSanitizer;
  public get sanitizer(): DomSanitizer { this._sanitizer = this._sanitizer || this.injector.get<DomSanitizer>(DomSanitizer); return this._sanitizer };



  public getResourcePath(resource: string) {
    const key = "URL_" + encodeURI(resource);
    const isAsset = !!resource.match(/\/?assets\//);
    return (!isAsset && !resource.startsWith("http") ? this.servidorURL + "/" + resource : resource);
  }

  public get isFirefox(): boolean {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }

  public get loginGoogleClientId(): string {
    return environment.login.google_client_id || "";
  }

  public get hasGoogleLogin(): boolean {
    return environment.login.gsuit == true;
  }

  public get hasAzureLogin(): boolean {
    return environment.login.azure == true;
  }

  public get hasUserPasswordLogin(): boolean {
    return environment.login.user_password == true;
  }

  public get hasFirebaseLogin(): boolean {
    return environment.login.firebase == true;
  }

  public get hasInstitucionalLogin(): boolean {
    return environment.login.institucional == true;
  }

  public get hasLoginUnicoLogin(): boolean {
    return environment.login.login_unico == true;
  }

  public get theme(): string {
    const theme = this.auth.usuarioConfig.theme
    return theme ? theme : 'light'
  }

  public get edicao(): string {
    return environment.edicao
  }
}
