import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
let LoginComponent = class LoginComponent {
    constructor(globals, go, router, cdRef, route, auth, util, fh, formBuilder, googleApi, dialog, ngZone, buildInfoService, document) {
        this.globals = globals;
        this.go = go;
        this.router = router;
        this.cdRef = cdRef;
        this.route = route;
        this.auth = auth;
        this.util = util;
        this.fh = fh;
        this.formBuilder = formBuilder;
        this.googleApi = googleApi;
        this.dialog = dialog;
        this.ngZone = ngZone;
        this.buildInfoService = buildInfoService;
        this.document = document;
        this.error = "";
        this.modalInterface = true;
        this.modalWidth = 400;
        this.noSession = false;
        this.titleSubscriber = new Subject();
        this.validate = (control, controlName) => {
            let result = null;
            if (['senha', 'token'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            else if (controlName == "usuario" && !this.util.validarCPF(control.value)) {
                result = "Inválido";
            }
            return result;
        };
        this.closeModalIfSuccess = (result) => {
            if (result && this.modalRoute) {
                this.go.clearRoutes();
            }
        };
        this.document.body.classList.add('login');
        this.login = this.fh.FormBuilder({
            usuario: { default: "" },
            senha: { default: "" },
            token: { default: "" }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        this.buildInfoService.getBuildInfo().subscribe(data => {
            const buildInfo = (typeof data === 'object' && data !== null) ? { ...data } : {};
            const buildDate = this.formatDate(typeof buildInfo['build_date'] === 'string' ? buildInfo['build_date'] :
                typeof buildInfo['buildDate'] === 'string' ? buildInfo['buildDate'] :
                    undefined);
            this.buildInfo = {
                ...buildInfo,
                build_date: buildDate,
                build_number: buildInfo['build_number'] ?? buildInfo['buildNumber'] ?? buildInfo['version'] ?? '-',
            };
        });
        this.titleSubscriber.next("Login Petrvs");
        this.route.queryParams.subscribe(params => {
            this.error = params['error'] ? params['error'] : "";
            if (params["redirectTo"]) {
                let routerTo = JSON.parse(params["redirectTo"]);
                this.redirectTo = routerTo.route[0] == "login" ? routerTo : undefined;
            }
            this.noSession = !!params["noSession"];
        });
        /* Registra listner para logins com popup que necessitam de retorno */
        this.auth.registerPopupLoginResultListener();
        /* Verifica se o usuário não já está logado (login-session), e caso não esteja verifica tambem se algum dos login (Google, Microsoft, etc), estão com sessão ativas e tenta logar com essa sessão */
        (async () => {
            // Inicializa Google Auth e cria o botão na tela
            if (this.globals.hasGoogleLogin) {
                let res = await this.googleApi.initialize(true); //.then((res: any) => {
                res.renderButton(document.getElementById('gbtn'), {
                    size: 'large',
                    width: 320,
                });
                //})
            }
            let result = false;
            if (!this.noSession)
                result = await this.auth.authSession();
            /* verifica tambem se algum dos login (Google, Microsoft, etc), estão com sessão ativas */
            if (!result) {
                if (this.globals.hasGoogleLogin) {
                    var socialUser;
                    try {
                        socialUser = await this.googleApi.getLoginStatus();
                    }
                    catch (error) { }
                    if (socialUser?.idToken)
                        this.auth.authGoogle(socialUser?.idToken);
                }
                if (this.globals.hasAzureLogin) {
                    // TODO: Implementa login automático
                }
            }
            else if (this.auth.success) {
                this.auth.success(this.auth.usuario, this.redirectTo);
            }
        })();
        if (window.location.href.includes('pgdpetrvs.gestao.gov.br')) {
            this.ambiente = "Ambiente antigo";
        }
    }
    openModal(item) {
        if (item.route)
            this.go.navigate({ route: item.route, params: item.params }, { title: "Suporte Petrvs" });
    }
    signInLoginUnico() {
        const entidade = this.globals.ENTIDADE;
        // Construir a URL de autenticação do SouGov com parâmetros
        const baseUrl = 'https://sso.staging.acesso.gov.br/authorize';
        const responseType = 'code';
        const clientId = 'pgd-pre.dth.api.gov.br';
        const scope = 'openid+email+profile';
        const redirectUri = 'https://pgd-pre.dth.api.gov.br/#/login-unico';
        const state = btoa('{"entidade":"' + entidade + '"}');
        const nonce = 'nonce';
        const codeChallenge = 'LwIDqJyJEGgdSQuwygHlkQDKsUXFz6jMIfkM_Jlv94w';
        const codeChallengeMethod = 'S256';
        const authUrl = `${baseUrl}?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&nonce=${nonce}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;
        window.location.href = authUrl;
    }
    signInAzure() {
        this.auth.authAzure();
    }
    signInLoginUnicoBackEnd() {
        this.auth.authLoginUnicoBackEnd();
    }
    ngOnDestroy() {
        this.document.body.classList.remove('login');
    }
    formatDate(dateString) {
        if (!dateString?.trim()) {
            return '-';
        }
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) {
            return dateString;
        }
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return new Intl.DateTimeFormat('pt-BR', options).format(date);
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss'],
        standalone: false
    }),
    __param(13, Inject(DOCUMENT))
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map