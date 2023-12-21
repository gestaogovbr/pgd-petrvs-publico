import { Inject, Injectable, Injector, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ToolbarButton } from '../components/toolbar/toolbar.component';
import { AppComponent, MenuContexto } from '../app.component';
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
  public URL_SEI: string = "https://sei.prf.gov.br/"; /* Buscar essa configuração da Entidade */
  public IMAGES = environment.images;
  public ENTIDADE = environment.entidade || "";
  public ENV = environment.env || "";
  public SUPPORT_URL = environment.suporte || "";
  public app?: AppComponent;
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
    const ngTheme = this.document.getElementById("primeng-thme") as HTMLLinkElement;
    if (ngTheme) ngTheme.href = this.theme + ".css";
    this.app!.cdRef.detectChanges();
  }

  public setContexto(context: string, goToContextoHome: boolean = true) {
    if(this.contexto?.key != context) {
      let novoContexto = this.app!.menuContexto.find(x => x.key == context);
      if(!novoContexto?.permition || this.auth.capacidades.includes(novoContexto.permition)) this.contexto = novoContexto;
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

  public get isEmbedded(): boolean {
    return this.isExtension || this.isSeiModule;
  }

  public get isExtension(): boolean {
    //@ts-ignore
    return (typeof IS_PETRVS_EXTENSION != "undefined" && !!IS_PETRVS_EXTENSION) || (typeof PETRVS_IS_EXTENSION != "undefined" && !!PETRVS_IS_EXTENSION);
  };

  public get isSeiModule(): boolean {
    //@ts-ignore
    return typeof PETRVS_IS_SEI_MODULE != "undefined" && !!PETRVS_IS_SEI_MODULE;
  };

  public is(entidade: string): boolean {
    return environment.entidade == entidade;
  }

  public get baseURL(): string {
    //@ts-ignore
    const baseUrl =  typeof MD_MULTIAGENCIA_PETRVS_URL != "undefined" ? MD_MULTIAGENCIA_PETRVS_URL : typeof EXTENSION_BASE_URL != "undefined" ? EXTENSION_BASE_URL : typeof PETRVS_BASE_URL != "undefined" ? PETRVS_BASE_URL : undefined;
    const path = (this.isEmbedded ? baseUrl : this.servidorURL) as string;
    return path.endsWith("/") ? path : path + "/";
  }

  public get servidorURL(): string {
    //@ts-ignore
    const url = typeof PETRVS_SERVIDOR_URL != "undefined" ? PETRVS_SERVIDOR_URL : typeof EXTENSION_SERVIDOR_URL != "undefined" ? EXTENSION_SERVIDOR_URL : "";
    return this.isExtension && url.length ? url : (environment.https ? 'https://' : 'http://') + environment.host;
  }

  public get isToolbar(): boolean {
    //@ts-ignore
    const toolbar = typeof PETRVS_EXTENSION_TOOLBAR != "undefined" ? PETRVS_EXTENSION_TOOLBAR : typeof PETRVS_TOOLBAR != "undefined" ? PETRVS_TOOLBAR : false;
    return this.isEmbedded ? toolbar : false;
  }

  public get initialRoute(): string[] {
    //@ts-ignore
    const route = typeof PETRVS_EXTENSION_ROUTE != "undefined" ? PETRVS_EXTENSION_ROUTE : typeof PETRVS_ROUTE != "undefined" ? PETRVS_ROUTE : "/home";
    const strRoute = this.isEmbedded ? route : (this.contexto ? "/home/"+ this.contexto!.key.toLowerCase() : "/home");
    return strRoute.substring(strRoute.startsWith("/") ? 1 : 0).split("/");
  }

  public get requireLogged(): boolean {
    //@ts-ignore
    const logged = typeof PETRVS_EXTENSION_LOGGED != "undefined" ? PETRVS_EXTENSION_LOGGED : typeof PETRVS_LOGGED != "undefined" ? PETRVS_LOGGED : true;
    return this.isEmbedded ? logged : true;
  }

  public get useModals(): boolean {
    return true;
    //return this.isEmbedded;
  }

  private _sanitizer?: DomSanitizer;
  public get sanitizer(): DomSanitizer { this._sanitizer = this._sanitizer || this.injector.get<DomSanitizer>(DomSanitizer); return this._sanitizer };



  public getResourcePath(resource: string) {
    const key = "URL_" + encodeURI(resource);
    const isAsset = !!resource.match(/\/?assets\//);
    if(this.isEmbedded && !this.urlBuffer[key]) this.urlBuffer[key] = this.sanitizer.bypassSecurityTrustResourceUrl((isAsset ? this.baseURL : this.servidorURL + "/") + resource);
    return this.isEmbedded ? this.urlBuffer[key] : (!isAsset && !resource.startsWith("http") ? this.servidorURL + "/" + resource : resource);
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
}
