import { Injectable, Injector } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ToolbarButton } from '../components/toolbar/toolbar.component';
import { AppComponent } from '../app.component';

export type EntidadePetrvs = "ANTAQ" | "PRF" | "";

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public VERSAO_DB: number = 1;
  public URL_SEI: string = "https://sei.prf.gov.br/"; /* Buscar essa configuração da Entidade */
  public IMAGES = environment.images;
  public ENTIDADE = environment.entidade || "";
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

  public refresh() {
    this.app!.cdRef.detectChanges();
  }

  public get isEmbedded(): boolean {
    return this.isExtension || this.isSuperModule;
  }

  public get isExtension(): boolean {
    //@ts-ignore
    return (typeof IS_PETRVS_EXTENSION != "undefined" && !!IS_PETRVS_EXTENSION) || (typeof PETRVS_IS_EXTENSION != "undefined" && !!PETRVS_IS_EXTENSION);
  };

  public get isSuperModule(): boolean {
    //@ts-ignore
    return typeof PETRVS_IS_SUPER_MODULE != "undefined" && !!PETRVS_IS_SUPER_MODULE;
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
    const strRoute = this.isEmbedded ? route : "/home";
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

  constructor(public injector: Injector) { }

  public getResourcePath(resource: string) {
    const key = "URL_" + encodeURI(resource);
    if(this.isEmbedded && !this.urlBuffer[key]) this.urlBuffer[key] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseURL + resource);
    return this.isEmbedded ? this.urlBuffer[key] : resource;
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
}
