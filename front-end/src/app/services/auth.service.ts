import { ChangeDetectorRef, Injectable, Injector } from '@angular/core';
import { DaoBaseService } from '../dao/dao-base.service';
import { Unidade } from '../models/unidade.model';
import { Usuario, UsuarioConfig } from '../models/usuario.model';
import { DialogService } from './dialog.service';
import { GlobalsService } from './globals.service';
import { GoogleApiService } from './google-api.service';
import { FullRoute, NavigateService } from './navigate.service';
import { ServerService } from './server.service';
import { gapiConfig } from 'src/environments/gapi.config';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from './calendar.service';
import { Subject } from 'rxjs';
import { LexicalService } from './lexical.service';
import { UtilService } from './util.service';
import { UsuarioDaoService } from '../dao/usuario-dao.service';
import { IIndexable } from '../models/base.model';

export type AuthKind = "USERPASSWORD" | "GAPI" | "FIREBASE" | "DPRFSEGURANCA" | "SESSION";
export type Permission = string | (string | string[])[];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public success?: (usuario: Usuario, redirectTo?: FullRoute) => void;
  public fail?: (error: string) => void;
  public leave?: () => void;
  public kind?: AuthKind;
  public logged: boolean = false;
  public usuario?: Usuario;
  public capacidades: string[] = [];
  public apiToken?: string;
  public unidade?: Unidade;
  public gapiLoad: Subject<gapi.auth2.GoogleAuth> = new Subject<gapi.auth2.GoogleAuth>();
  public unidades?: Unidade[];

  private _logging: boolean = false;
  public get logging(): boolean {
    return this._logging;
  };
  public set logging(value: boolean) {
    if(value != this._logging) {
      this._logging = value;
      if(!this.gb.isExtension) {
        if(value) {
          this.dialogs.showSppinerOverlay("Logando . . .", 60000);
        } else {
          this.dialogs.closeSppinerOverlay();
        }
      }
    }
  }

  private _server?: ServerService;
  public get server(): ServerService { this._server = this._server || this.injector.get<ServerService>(ServerService); return this._server };
  private _lex?: LexicalService;
  public get lex(): LexicalService { this._lex = this._lex || this.injector.get<LexicalService>(LexicalService); return this._lex };
  private _gb?: GlobalsService;
  public get gb(): GlobalsService { this._gb = this._gb || this.injector.get<GlobalsService>(GlobalsService); return this._gb };
  private _util?: UtilService;
  public get util(): UtilService { this._util = this._util || this.injector.get<UtilService>(UtilService); return this._util }
  private _go?: NavigateService;
  public get go(): NavigateService { this._go = this._go || this.injector.get<NavigateService>(NavigateService); return this._go }
  private _googleApi?: GoogleApiService;
  public get googleApi(): GoogleApiService { this._googleApi = this._googleApi || this.injector.get<GoogleApiService>(GoogleApiService); return this._googleApi };
  private _dialogs?: DialogService;
  public get dialogs(): DialogService { this._dialogs = this._dialogs || this.injector.get<DialogService>(DialogService); return this._dialogs };
  private _route?: ActivatedRoute;
  public get route(): ActivatedRoute { this._route = this._route || this.injector.get<ActivatedRoute>(ActivatedRoute); return this._route };
  private _calendar?: CalendarService;
  public get calendar(): CalendarService { this._calendar = this._calendar || this.injector.get<CalendarService>(CalendarService); return this._calendar };
  private _usuarioDaoService?: UsuarioDaoService;
  public get usuarioDaoService(): UsuarioDaoService { this._usuarioDaoService = this._usuarioDaoService || this.injector.get<UsuarioDaoService>(UsuarioDaoService); return this._usuarioDaoService };

  public googleAuth?: gapi.auth2.GoogleAuth;

  constructor(public injector: Injector) { }

  public get unidadeHora(): string {
    return moment(this.hora).format("HH:mm");
  }

  public get hora(): Date {
    let dataHora = new Date();
    if(this.unidade?.cidade){
      const delta = this.gb.horarioDelta.servidor.getTime() - this.gb.horarioDelta.local.getTime();
      const utc = (this.unidade.cidade.timezone + 3) * 60 * 60 * 1000;
      dataHora.setTime(dataHora.getTime() + utc + delta);
    }
    return dataHora;
  }

  public registerPopupLoginResultListener() {
    /*
    this.bc = new BroadcastChannel('petrvs_login_popup');
    this.bc.onmessage = (event) => {
      this.dialog.closeSppinerOverlay();
      this.auth.authSession().then(success => {
        if(success) this.auth.success!(this.auth.usuario!, {route: ["home"]});
      });
    };*/
    window.addEventListener("message", (event) => {
      //const fromUrl = event?.origin || "";
      if(event?.data == "COMPLETAR_LOGIN") { //fromUrl.includes("login-azure-callback")
        this.dialogs.closeSppinerOverlay();
        this.authSession().then(success => {
          if(success) this.success!(this.usuario!, {route: ["home"]});
        });
      }
    }, false);
  }

  public set usuarioConfig(value: IIndexable) {
    this.updateUsuarioConfig(this.usuario!.id, value);
  }

  public updateUsuarioConfig(usuarioId: string, value: IIndexable) {
    if(this.usuario?.id == usuarioId) this.usuario!.config = this.util.assign(this.usuario!.config, value);
    return this.usuarioDaoService.updateJson(usuarioId, 'config', value);
  }

  public updateUsuarioNotificacoes(usuarioId: string, value: IIndexable) {
    if(this.usuario?.id == usuarioId) this.usuario!.notificacoes = this.util.assign(this.usuario!.notificacoes, value);
    return this.usuarioDaoService.updateJson(usuarioId, 'notificacoes', value);
  }

  public get usuarioConfig(): IIndexable {
    const defaults = new UsuarioConfig();
    return this.util.assign(defaults, this.usuario!.config);
  }

  public registerUser(user: any, token?: string) {
    if(user) {
      this.usuario = Object.assign(new Usuario(), user) as Usuario;
      //this.usuario.config = Object.assign(new UsuarioConfig(), this.usuario.config || {});
      this.capacidades = this.usuario?.perfil?.capacidades?.map(x => x.tipo_capacidade?.codigo || "") || [];
      this.kind = this.kind;
      this.logged = true;
      this.unidades = this.usuario?.lotacoes?.map(x => x.unidade!) || [];
      this.unidade = this.usuario?.lotacoes?.find(x => x.principal)?.unidade;
      if(this.unidade) {
        this.calendar.loadFeriadosCadastrados(this.unidade.id);
        if(this.unidade.entidade) this.lex.loadVocabulary(this.unidade.entidade.nomenclatura || []);
      }
      if(token?.length) localStorage.setItem("petrvs_api_token", token);
    } else {
      this.usuario = undefined;
      this.kind = undefined;
      this.logged = false;
      this.unidades = undefined;
    }
    this.logging = false;
  }

  /*
  Checa se tem permissão
  @param string|(string|string[])[] permission Permissão que se deseja testar, deve seguir o seguinte padrão:
    - string: será testado se o código existe nas capacidades do perfil do usuario
    - (string|string[])[]: o primeiro nível será considerado como OR, e o segundo nível como AND, exemplo:
      ["Codigo1", ["Codigo2", "codigo3"]] => Codigo1 ou [codigo2 e codigo3]
  @return boolean
  */
  public hasPermissionTo(permission: Permission) {
    const permissions = typeof permission == "string" ? [permission] : permission;
    for(let permission of permissions) {
      if((typeof permission == "string" && this.capacidades.includes(permission)) ||
        (Array.isArray(permission) && permission.reduce((a: boolean, v: string) => a && this.capacidades.includes(v), true))) {
        return true;
      }
    }
    return false;
  }

  public authAzure() {
    this.dialogs.showSppinerOverlay("Logando...", 300000);
    this.go.openPopup(this.gb.servidorURL + "/web/login-azure-redirect");
    //this.go.openPopup(this.gb.servidorURL + "/web/login-azure-simulate-callback");
  }

  public authUserPassword(user: string, password: string, redirectTo?: FullRoute) {
    return this.logIn("USERPASSWORD", "login-user-password", {
      email: user,
      password: password
    }, redirectTo);
  }

  public authDprfSeguranca(cpf: string, password: string, token: string, redirectTo?: FullRoute) {
    return this.logIn("DPRFSEGURANCA", "login-institucional", {
      cpf: cpf,
      senha: password,
      token: token
    }, redirectTo);
  }

  public authGapi(tokenId: string, redirectTo?: FullRoute) {
    this.googleApi.tokenId = tokenId;
    return this.logIn("GAPI", "login-gapi-token", {
      token: tokenId
    }, redirectTo);
  }

  public authSession(): Promise<boolean> {
    this.apiToken = localStorage.getItem("petrvs_api_token") || undefined;
    return this.logIn("SESSION", "login-session", {}).then(result => {
      if(!result && this.googleAuth && this.googleAuth.isSignedIn.get()) {
        return this.authGapi(this.googleAuth.currentUser.get().getAuthResponse().id_token);
      }
      return result;
    });
  }

  public get routerTo(): any {
    let routerTo = this.route.snapshot?.queryParams?.redirectTo ? JSON.parse(this.route.snapshot?.queryParams?.redirectTo) : {route: this.gb.initialRoute};
    if(routerTo.route[0] == "login") routerTo = {route: this.gb.initialRoute};
    return routerTo;
  }

  public loadGapi() {
    if(gapiConfig.client_id?.length && !this.googleAuth) {
      console.warn("[ATENÇÃO]: Lembre-se que a biblioteca GAPI não funciona corretamete com o depurador aberto.");
      this.googleApi.load().then(googleAuth => {
        this.googleAuth = googleAuth;
        this.gapiLoad.next(googleAuth);
      }).catch(error => {
        if (this.fail) this.fail(error.message ? error.message : error);
      }).finally(() => {
        if (this.gb.refresh) this.gb.refresh();
      });
    }
  }

  private logIn(kind: AuthKind, route: string, params: any, redirectTo?: FullRoute): Promise<boolean> {
    let deviceName = this.gb.isExtension ? "EXTENSION" : "BROWSER";
    let login = (): Promise<boolean> => {
      return this.server.post((this.gb.isExtension ? "api/" : "web/") + route, { ...params, device_name: deviceName }).toPromise().then(response => {
        if (response?.error)
          throw new Error(response?.error);
        this.kind = response?.kind || kind;
        this.apiToken = response.token;
        this.registerUser(response.usuario, this.apiToken);
        if (response.horario_servidor?.length) {
          this.gb.horarioDelta.servidor = UtilService.iso8601ToDate(response.horario_servidor);
          this.gb.horarioDelta.local = new Date();
        }
        if (this.success && kind != "SESSION") this.success(this.usuario!, redirectTo);
        if (this.gb.refresh) this.gb.refresh();
        return true;
      }).catch(error => {
        this.registerUser(undefined);
        if (this.fail && kind != "SESSION") this.fail(error?.message || error?.error || error.toString());
        if (this.gb.refresh) this.gb.refresh();
        return false;
      });
    };
    this.logging = true;
    if(this.gb.isExtension) {
      return login();
    } else {
      return this.server.get('sanctum/csrf-cookie').toPromise().then(login);
    }
  }

  public logOut() {
    this.logging = true;
    this.server.get((this.gb.isExtension ? "api/" : "web/") + "logout").toPromise().then(response => {
      const clearLogin = () => {
        localStorage.removeItem("petrvs_api_token");
        this.registerUser(undefined);
        if(this.leave) this.leave();
        if(this.gb.refresh) this.gb.refresh();
      }
      /* Garante logout do GAPI */
      if(gapiConfig.client_id?.length) {
        this.googleApi.load().then(googleAuth => {
          if(this.kind == "GAPI" || googleAuth.isSignedIn.get()) {
            this.googleApi.logOut().then(clearLogin);
          }
        });
      } else {
        clearLogin();
      }
    }).finally(() => this.logging = false);
  }

  public selecionaUnidade(id: string, cdRef?: ChangeDetectorRef) {
    if(this.unidades?.find(x => x.id == id)) {
      this.unidade = undefined;
      cdRef?.detectChanges();
      return this.server.post("api/seleciona-unidade", {unidade_id: id}).toPromise().then(response => {
        if(response?.unidade) {
          this.unidade = Object.assign(new Unidade(), response?.unidade) as Unidade;
          //if(!this.unidades?.find(x => x.id == this.unidade!.id)) this.unidades?.push(this.unidade);
          this.calendar.loadFeriadosCadastrados(this.unidade.id);
          if(this.unidade.entidade) this.lex.loadVocabulary(this.unidade.entidade.nomenclatura || []);
        }
        cdRef?.detectChanges();
        return this.unidade;
      }).catch(error => {
        this.dialogs.alert("Erro", "Não foi possível selecionar a unidade!");
        return undefined;
      });
    } else {
      return Promise.resolve(undefined);
    }
  }

}
