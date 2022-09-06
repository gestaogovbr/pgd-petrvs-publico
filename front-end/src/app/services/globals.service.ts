import { Injectable, Injector } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ToolbarButton } from '../components/toolbar/toolbar.component';

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
  public refresh?: () => void;
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

  public get isExtension(): boolean {
    //@ts-ignore
    return typeof IS_PETRVS_EXTENSION != "undefined" && !!IS_PETRVS_EXTENSION;
  };

  public is(entidade: string): boolean {
    return environment.entidade == entidade;
  }

  public get baseURL(): string {
    //@ts-ignore
    return this.isExtension ? EXTENSION_BASE_URL : "";
  }

  public get servidorURL(): string {
    //@ts-ignore
    return this.isExtension && EXTENSION_SERVIDOR_URL?.length ? EXTENSION_SERVIDOR_URL : (environment.https ? 'https://' : 'http://') + environment.host;
  }

  public get isToolbar(): boolean {
    //@ts-ignore
    return this.isExtension ? PETRVS_EXTENSION_TOOLBAR : false;
  }

  public get initialRoute(): string[] {
    //@ts-ignore
    const strRoute = this.isExtension && PETRVS_EXTENSION_ROUTE ? PETRVS_EXTENSION_ROUTE : "/home";
    return strRoute.substring(strRoute.startsWith("/") ? 1 : 0).split("/");
  }

  public get requireLogged(): boolean {
    //@ts-ignore
    return this.isExtension ? PETRVS_EXTENSION_LOGGED : true;
  }

  public get useModals(): boolean {
    return true;
    //return this.isExtension;
  }

  private _sanitizer?: DomSanitizer;
  public get sanitizer(): DomSanitizer { this._sanitizer = this._sanitizer || this.injector.get<DomSanitizer>(DomSanitizer); return this._sanitizer };

  constructor(public injector: Injector) { }

  public getResourcePath(resource: string) {
    const key = "URL_" + encodeURI(resource);
    if(this.isExtension && !this.urlBuffer[key]) this.urlBuffer[key] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseURL + resource);
    return this.isExtension ? this.urlBuffer[key] : resource;
  }

  public isGoogleLogin(): boolean {
    return environment.ativar_login_google == true;
  }

  public isAzureLogin(): boolean {
    return environment.ativar_login_azure == true;
  }
}
