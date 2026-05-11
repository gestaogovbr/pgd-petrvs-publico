import { __decorate, __param } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';
import { NavigateService } from './navigate.service';
let GlobalsService = class GlobalsService {
    set toolbarButtons(value) {
        this._toolbarButtons = value;
        if (this.refresh)
            this.refresh();
    }
    get toolbarButtons() {
        return this._toolbarButtons;
    }
    constructor(document, injector) {
        this.document = document;
        this.injector = injector;
        this.VERSAO_DB = 1;
        this.VERSAO_SYS = environment.versao;
        this.URL_SEI = "https://sei.prf.gov.br/"; /* Buscar essa configuração da Entidade */
        this.IMAGES = environment.images;
        this.ENTIDADE = environment.entidade || "";
        this.ENV = environment.env || "";
        this.SUPPORT_URL = environment.suporte || "";
        this.urlBuffer = {};
        this._toolbarButtons = [];
        this.horarioDelta = {
            servidor: new Date(),
            local: new Date()
        };
        this.auth = injector.get(AuthService);
        this.go = injector.get(NavigateService);
    }
    refresh() {
        //this.document.getElementById("html-petrvs").setAttribute("data-bs-theme", this.theme)
        document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", this.theme);
        const ngTheme = this.document.getElementById("primeng-thme");
        if (ngTheme)
            ngTheme.href = this.theme + ".css";
        this.app.cdRef.detectChanges();
    }
    setContexto(context, goToContextoHome = true) {
        if (this.contexto?.key != context) {
            let novoContexto = this.app.menuContexto.find(x => x.key == context);
            if (!this.auth.usuario || !novoContexto?.permition || this.auth.capacidades.includes(novoContexto.permition))
                this.contexto = novoContexto;
            if (this.contexto && goToContextoHome)
                this.goHome();
            this.app.cdRef.detectChanges();
        }
        if (this.auth.usuario && this.auth.usuarioConfig.menu_contexto != this.contexto?.key) {
            this.auth.usuarioConfig = { menu_contexto: this.contexto?.key || "" };
        }
    }
    goHome() {
        this.go.navigate({ route: ["home", this.contexto.key.toLowerCase()] });
    }
    get isEmbedded() {
        return this.isExtension || this.isSeiModule;
    }
    get isExtension() {
        //@ts-ignore
        return (typeof IS_PETRVS_EXTENSION != "undefined" && !!IS_PETRVS_EXTENSION) || (typeof PETRVS_IS_EXTENSION != "undefined" && !!PETRVS_IS_EXTENSION);
    }
    ;
    get isSeiModule() {
        //@ts-ignore
        return typeof PETRVS_IS_SEI_MODULE != "undefined" && !!PETRVS_IS_SEI_MODULE;
    }
    ;
    is(entidade) {
        return environment.entidade == entidade;
    }
    get baseURL() {
        //@ts-ignore
        const baseUrl = typeof MD_MULTIAGENCIA_PETRVS_URL != "undefined" ? MD_MULTIAGENCIA_PETRVS_URL : typeof EXTENSION_BASE_URL != "undefined" ? EXTENSION_BASE_URL : typeof PETRVS_BASE_URL != "undefined" ? PETRVS_BASE_URL : undefined;
        const path = (this.isEmbedded ? baseUrl : this.servidorURL);
        return path.endsWith("/") ? path : path + "/";
    }
    get servidorURL() {
        //@ts-ignore
        const url = typeof PETRVS_SERVIDOR_URL != "undefined" ? PETRVS_SERVIDOR_URL : typeof EXTENSION_SERVIDOR_URL != "undefined" ? EXTENSION_SERVIDOR_URL : "";
        return this.isExtension && url.length ? url : (environment.https ? 'https://' : 'http://') + environment.host;
    }
    get isToolbar() {
        //@ts-ignore
        const toolbar = typeof PETRVS_EXTENSION_TOOLBAR != "undefined" ? PETRVS_EXTENSION_TOOLBAR : typeof PETRVS_TOOLBAR != "undefined" ? PETRVS_TOOLBAR : false;
        return this.isEmbedded ? toolbar : false;
    }
    get initialRoute() {
        //@ts-ignore
        const route = typeof PETRVS_EXTENSION_ROUTE != "undefined" ? PETRVS_EXTENSION_ROUTE : typeof PETRVS_ROUTE != "undefined" ? PETRVS_ROUTE : "/home";
        const strRoute = this.isEmbedded ? route : (this.contexto ? "/home/" + this.contexto.key.toLowerCase() : "/home");
        return strRoute.substring(strRoute.startsWith("/") ? 1 : 0).split("/");
    }
    get requireLogged() {
        //@ts-ignore
        const logged = typeof PETRVS_EXTENSION_LOGGED != "undefined" ? PETRVS_EXTENSION_LOGGED : typeof PETRVS_LOGGED != "undefined" ? PETRVS_LOGGED : true;
        return this.isEmbedded ? logged : true;
    }
    get useModals() {
        return true;
        //return this.isEmbedded;
    }
    get sanitizer() { this._sanitizer = this._sanitizer || this.injector.get(DomSanitizer); return this._sanitizer; }
    ;
    getResourcePath(resource) {
        const key = "URL_" + encodeURI(resource);
        const isAsset = !!resource.match(/\/?assets\//);
        if (this.isEmbedded && !this.urlBuffer[key])
            this.urlBuffer[key] = this.sanitizer.bypassSecurityTrustResourceUrl((isAsset ? this.baseURL : this.servidorURL + "/") + resource);
        return this.isEmbedded ? this.urlBuffer[key] : (!isAsset && !resource.startsWith("http") ? this.servidorURL + "/" + resource : resource);
    }
    get isFirefox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }
    get loginGoogleClientId() {
        return environment.login.google_client_id || "";
    }
    get hasGoogleLogin() {
        return environment.login.gsuit == true;
    }
    get hasAzureLogin() {
        return environment.login.azure == true;
    }
    get hasUserPasswordLogin() {
        return environment.login.user_password == true;
    }
    get hasFirebaseLogin() {
        return environment.login.firebase == true;
    }
    get hasInstitucionalLogin() {
        return environment.login.institucional == true;
    }
    get hasLoginUnicoLogin() {
        return environment.login.login_unico == true;
    }
    get theme() {
        const theme = this.auth.usuarioConfig.theme;
        return theme ? theme : 'light';
    }
    get edicao() {
        return environment.edicao;
    }
};
GlobalsService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(DOCUMENT))
], GlobalsService);
export { GlobalsService };
//# sourceMappingURL=globals.service.js.map