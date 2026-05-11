import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Unidade } from '../models/unidade.model';
import { Usuario, UsuarioConfig } from '../models/usuario.model';
import { DialogService } from './dialog.service';
import { GlobalsService } from './globals.service';
import { GoogleApiService } from './google-api.service';
import { NavigateService } from './navigate.service';
import { ServerService } from './server.service';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from './calendar.service';
import { LexicalService } from './lexical.service';
import { UtilService } from './util.service';
import { UsuarioDaoService } from '../dao/usuario-dao.service';
import { Entidade } from '../models/entidade.model';
import { UnidadeDaoService } from '../dao/unidade-dao.service';
import { NotificacaoService } from '../modules/uteis/notificacoes/notificacao.service';
import { UnidadeService } from './unidade.service';
let AuthService = class AuthService {
    get logging() {
        return this._logging;
    }
    ;
    set logging(value) {
        if (value != this._logging) {
            this._logging = value;
            if (!this.gb.isEmbedded) {
                if (value) {
                    this.dialogs.showSppinerOverlay("Logando . . .", 60000);
                }
                else {
                    this.dialogs.closeSppinerOverlay();
                }
            }
        }
    }
    set apiToken(value) {
        this._apiToken = value;
    }
    get apiToken() {
        //@ts-ignore
        return typeof MD_MULTIAGENCIA_PETRVS_SESSION_TOKEN != "undefined" ? MD_MULTIAGENCIA_PETRVS_SESSION_TOKEN : this._apiToken;
    }
    get server() { this._server = this._server || this.injector.get(ServerService); return this._server; }
    ;
    get lex() { this._lex = this._lex || this.injector.get(LexicalService); return this._lex; }
    ;
    get gb() { this._gb = this._gb || this.injector.get(GlobalsService); return this._gb; }
    ;
    get util() { this._util = this._util || this.injector.get(UtilService); return this._util; }
    get go() { this._go = this._go || this.injector.get(NavigateService); return this._go; }
    get googleApi() { this._googleApi = this._googleApi || this.injector.get(GoogleApiService); return this._googleApi; }
    ;
    get dialogs() { this._dialogs = this._dialogs || this.injector.get(DialogService); return this._dialogs; }
    ;
    get route() { this._route = this._route || this.injector.get(ActivatedRoute); return this._route; }
    ;
    get calendar() { this._calendar = this._calendar || this.injector.get(CalendarService); return this._calendar; }
    ;
    get usuarioDao() { this._usuarioDao = this._usuarioDao || this.injector.get(UsuarioDaoService); return this._usuarioDao; }
    ;
    get unidadeDao() { this._unidadeDao = this._unidadeDao || this.injector.get(UnidadeDaoService); return this._unidadeDao; }
    ;
    get notificacao() { this._notificacao = this._notificacao || this.injector.get(NotificacaoService); return this._notificacao; }
    ;
    get unidadeService() { this._unidade = this._unidade || this.injector.get(UnidadeService); return this._unidade; }
    ;
    set usuarioConfig(value) {
        this.updateUsuarioConfig(this.usuario.id, value);
    }
    get usuarioConfig() {
        const defaults = new UsuarioConfig();
        return this.util.assign(defaults, this.usuario?.config || {});
    }
    constructor(injector) {
        this.injector = injector;
        this.logged = false;
        this.capacidades = [];
        this._apiToken = undefined;
        this._logging = false;
    }
    success(usuario, redirectTo) {
        this.app.go.navigate(redirectTo || { route: this.app.gb.initialRoute });
    }
    ;
    fail(error) {
        this.app.go.navigate({ route: ['login'], params: { error: error?.error || error?.message || error } });
    }
    ;
    leave() {
        this.app.go.navigate({ route: ['login'] });
    }
    ;
    get unidadeHora() {
        return moment(this.hora).format("HH:mm");
    }
    get hora() {
        let dataHora = new Date();
        if (this.unidade?.cidade) {
            const delta = this.gb.horarioDelta.servidor.getTime() - this.gb.horarioDelta.local.getTime();
            const utc = (this.unidade.cidade.timezone + Math.abs(this.unidade.cidade.timezone)) * 60 * 60 * 1000;
            dataHora.setTime(dataHora.getTime() + utc + delta);
        }
        return dataHora;
    }
    registerPopupLoginResultListener() {
        window.addEventListener("message", (event) => {
            if (event?.data == "COMPLETAR_LOGIN") {
                this.dialogs.closeSppinerOverlay();
                this.authSession().then(success => {
                    if (success)
                        this.success(this.usuario, { route: ["home"] });
                });
            }
        }, false);
    }
    updateUsuarioConfig(usuarioId, value) {
        if (this.usuario?.id == usuarioId)
            this.usuario.config = this.util.assign(this.usuario.config, value);
        return this.usuarioDao.updateJson(usuarioId, 'config', value);
    }
    updateUsuarioNotificacoes(usuarioId, value) {
        if (this.usuario?.id == usuarioId)
            this.usuario.notificacoes = this.util.assign(this.usuario.notificacoes, value);
        return this.usuarioDao.updateJson(usuarioId, 'notificacoes', value);
    }
    registerEntity(entity) {
        if (entity) {
            this.entidade = Object.assign(new Entidade(), entity);
            this.lex.loadVocabulary(this.entidade.nomenclatura || []);
        }
        else {
            this.entidade = undefined;
        }
    }
    registerUser(user, token) {
        if (user) {
            let usuarioContextos = [];
            this.usuario = Object.assign(new Usuario(), user);
            const unidadesVinculadas = this.mapUnidadesVinculadasFromAuth(user);
            const unidadesVinculadasFromAuth = Array.isArray(unidadesVinculadas);
            if (unidadesVinculadasFromAuth)
                this.unidadesVinculadas = unidadesVinculadas;
            this.capacidades = this.usuario?.perfil?.capacidades?.filter(x => x.deleted_at == null).map(x => x.tipo_capacidade?.codigo || "") || [];
            this.kind = this.kind;
            this.logged = true;
            this.unidades = this.usuario?.areas_trabalho?.map(x => x.unidade) || [];
            if (this.usuario?.config.unidade_id && this.unidades.find(u => u.id === this.usuario?.config.unidade_id)) {
                this.unidade = this.unidades.find(u => u.id === this.usuario?.config.unidade_id);
            }
            else {
                this.unidade = this.usuario?.areas_trabalho?.find(x => x.atribuicoes?.find(y => y.atribuicao == "LOTADO"))?.unidade;
            }
            if (this.unidade)
                this.calendar.loadFeriadosCadastrados(this.unidade.id);
            if (token?.length)
                localStorage.setItem("petrvs_api_token", token);
            if (this.hasPermissionTo("CTXT_GEST"))
                usuarioContextos.push("GESTAO");
            if (this.hasPermissionTo("CTXT_EXEC"))
                usuarioContextos.push("EXECUCAO");
            if (this.hasPermissionTo("CTXT_DEV"))
                usuarioContextos.push("DEV");
            if (this.hasPermissionTo("CTXT_ADM"))
                usuarioContextos.push("ADMINISTRADOR");
            if (this.hasPermissionTo("CTXT_RX"))
                usuarioContextos.push("RAIOX");
            if (!usuarioContextos.includes(this.usuario?.config.menu_contexto))
                this.gb.contexto = this.app?.menuContexto.find(c => c.key === this.usuario?.config.menu_contexto);
            this.gb.setContexto(usuarioContextos[0]);
            this.notificacao.updateNaoLidas();
            if (!unidadesVinculadasFromAuth)
                this.setUnidadesVinculadas();
        }
        else {
            this.usuario = undefined;
            this.kind = undefined;
            this.logged = false;
            this.unidades = undefined;
        }
        this.logging = false;
    }
    mapUnidadesVinculadasFromAuth(user) {
        if (!Array.isArray(user?.unidades_vinculadas))
            return;
        return user.unidades_vinculadas.map((item) => new Unidade(item));
    }
    /*
    Checa se tem permissão
    @param string|(string|string[])[] permission Permissão que se deseja testar, deve seguir o seguinte padrão:
      - string: será testado se o código existe nas capacidades do perfil do usuario
      - (string|string[])[]: o primeiro nível será considerado como OR, e o segundo nível como AND, exemplo:
        ["Codigo1", ["Codigo2", "codigo3"]] => Codigo1 ou [codigo2 e codigo3]
    @return boolean
    */
    hasPermissionTo(permission) {
        const permissions = typeof permission == "string" ? [permission] : permission;
        for (let permission of permissions) {
            if ((typeof permission == "string" && this.capacidades.includes(permission)) ||
                (Array.isArray(permission) && permission.reduce((a, v) => a && this.capacidades.includes(v), true))) {
                return true;
            }
        }
        return false;
    }
    get routerTo() {
        let routerTo = this.route.snapshot?.queryParams?.redirectTo ? JSON.parse(this.route.snapshot?.queryParams?.redirectTo) : { route: this.gb.initialRoute };
        if (routerTo.route[0] == "login")
            routerTo = { route: this.gb.initialRoute };
        return routerTo;
    }
    /********************************************************************************************
    Rotinas para autenticar (cada entidade poderá criar a sua, caso as que estejam aqui não atendam).
    Serve como proxy para a chamada do método logIn, que é quem realmente autentica o usuário. As
    rotinas atuais estão consideram que a entidade utilizada pelo sistema será a configurada no .env
    do back-end, mas caso haja a necessidade de criar um combobox no login para selecionar a entidade
    isso poderá ser feito sem problema algum, somente sendo necessário criar um novo método para receber
    tambem a informação da entidade selecionada ao invés de utilizar a do GlobalService.ENTIDADE;
    *********************************************************************************************/
    authAzure() {
        this.dialogs.showSppinerOverlay("Logando...", 300000);
        this.go.openPopup(this.gb.servidorURL + "/web/login-azure-redirect?entidade=" + encodeURI(this.gb.ENTIDADE));
        //this.go.openPopup(this.gb.servidorURL + "/web/login-azure-simulate-callback");
    }
    authLoginUnicoBackEnd() {
        this.dialogs.showSppinerOverlay("Logando...", 300000);
        this.go.openPopup(this.gb.servidorURL + "/web/login-govbr-redirect?entidade=" + encodeURI(this.gb.ENTIDADE));
    }
    authUserPassword(user, password, redirectTo) {
        return this.logIn("USERPASSWORD", "login-user-password", {
            entidade: this.gb.ENTIDADE,
            email: user,
            password: password
        }, redirectTo);
    }
    authGoogle(tokenId, redirectTo) {
        //this.googleApi.tokenId = tokenId;
        return this.logIn("GOOGLE", "login-google-token", {
            entidade: this.gb.ENTIDADE,
            token: tokenId
        }, redirectTo);
    }
    authLoginUnico(code, state, redirectTo) {
        //this.googleApi.tokenId = tokenId;
        return this.logIn("LOGINUNICO", "login-unico", {
            entidade: this.gb.ENTIDADE,
            code: code,
            state: state,
        }, redirectTo);
    }
    authSession() {
        this._apiToken = localStorage.getItem("petrvs_api_token") || undefined;
        return this.logIn("SESSION", "login-session", {});
    }
    logIn(kind, route, params, redirectTo) {
        let deviceName = this.gb.isExtension ? "EXTENSION" : this.gb.isSeiModule ? "SEI" : "BROWSER";
        let login = () => {
            return this.server.post((this.gb.isEmbedded ? "api/" : "web/") + route, { ...params, device_name: deviceName }).toPromise().then(response => {
                const loginResponse = response;
                if (loginResponse?.error)
                    throw new Error(loginResponse.error);
                this.kind = loginResponse?.kind || kind;
                this.apiToken = loginResponse.token;
                this.registerEntity(loginResponse.entidade);
                this.registerUser(loginResponse.usuario, this.apiToken);
                this.app?.setMenuVars();
                if (loginResponse.horario_servidor?.length) {
                    this.gb.horarioDelta.servidor = UtilService.iso8601ToDate(loginResponse.horario_servidor);
                    this.gb.horarioDelta.local = new Date();
                }
                if (this.success && kind != "SESSION")
                    this.success(this.usuario, redirectTo);
                if (this.gb.refresh)
                    this.gb.refresh();
                return true;
            }).catch(error => {
                this.registerUser(undefined);
                if (this.fail && kind != "SESSION")
                    this.fail(error?.message || error?.error || error.toString());
                if (this.gb.refresh)
                    this.gb.refresh();
                return false;
            });
        };
        this.logging = true;
        if (this.gb.isEmbedded) {
            return login();
        }
        else {
            return this.server.get('sanctum/csrf-cookie').toPromise().then(login);
        }
    }
    async logOut() {
        try {
            this.logging = true;
            await this.server.get((this.gb.isEmbedded ? "api/" : "web/") + "logout").toPromise();
            const clearLogin = () => {
                localStorage.removeItem("petrvs_api_token");
                this.registerUser(undefined);
                if (this.leave)
                    this.leave();
                if (this.gb.refresh)
                    this.gb.refresh();
            };
            /* Garante logout do Google */
            if (this.gb.hasGoogleLogin && this.gb.loginGoogleClientId?.length && this.kind == "GOOGLE") {
                await this.googleApi.initialize();
                await this.googleApi.signOut();
                clearLogin();
            }
            else {
                clearLogin();
            }
            this.logging = false;
        }
        catch (error) {
            console.error("Ocorreu um erro durante o logout:", error);
        }
        finally {
            this.logging = false;
        }
    }
    selecionaUnidade(id, matricula, cdRef) {
        if (this.unidadesVinculadas?.find(x => x.id == id)) {
            this.unidade = undefined;
            cdRef?.detectChanges();
            return this.server.post("api/seleciona-unidade", { unidade_id: id, matricula: matricula ?? undefined }).toPromise().then(response => {
                if (response?.unidade) {
                    this.unidade = Object.assign(new Unidade(), response?.unidade);
                    this.calendar.loadFeriadosCadastrados(this.unidade.id);
                    if (this.unidade.entidade)
                        this.lex.loadVocabulary(this.unidade.entidade.nomenclatura || []);
                }
                cdRef?.detectChanges();
                return this.unidade;
            }).catch(error => {
                this.dialogs.alert("Erro", "Não foi possível selecionar a unidade!");
                return undefined;
            });
        }
        else {
            return Promise.resolve(undefined);
        }
    }
    hasLotacao(unidadeId) {
        return this.usuario.areas_trabalho?.find(x => x.unidade_id == unidadeId);
    }
    /**
     * Informa se o usuário logado é gestor de alguma das suas áreas de trabalho.
     * @returns
     */
    isGestorAlgumaAreaTrabalho(incluiDelegado = true, incluiSubstituto = true) {
        return !!this.unidades?.filter(x => this.unidadeService.isGestorUnidade(x, incluiDelegado, incluiSubstituto)).length;
    }
    /**
     * Retorna a unidade onde o usuário é gestor
     * @returns
     */
    unidadeGestor() {
        return this.unidades?.find(x => this.unidadeService.isGestorUnidade(x));
    }
    /**
     * Retorna a unidade onde o usuário é gestor
     * @returns
     */
    get lotacao() {
        return this.usuario?.areas_trabalho?.find(x => x.atribuicoes?.find(y => y.atribuicao == "LOTADO"))?.unidade;
    }
    /**
     * Retorna um array com os usuários que são gestores da unidade de lotação do usuário logado
     * @returns
     */
    get gestoresLotacao() {
        let lotacao = this.lotacao;
        let result = [];
        if (lotacao?.gestor?.usuario)
            result.push(lotacao?.gestor?.usuario);
        // if(lotacao?.gestor_substituto?.usuario) result.push(lotacao?.gestor_substituto?.usuario);
        if (lotacao?.gestores_substitutos.length)
            (lotacao?.gestores_substitutos.map(x => x.usuario)).forEach(x => result.push(x));
        return result;
    }
    /**
     * Informa se a unidade recebida como parâmetro é a lotação do usuário logado. Se nenhuma unidade for recebida,
     * será adotada a unidade selecionada pelo servidor na homepage.
     * @param pUnidade
     * @returns
     */
    isLotacaoUsuario(pUnidade = null) {
        let unidade = pUnidade || this.unidade;
        let lotacao = this.usuario?.areas_trabalho?.find(x => x.atribuicoes?.find(y => y.atribuicao == "LOTADO"))?.unidade;
        return lotacao?.id == unidade.id;
    }
    isUsuarioDeveloper() {
        return this.usuario?.perfil?.nivel == 0;
    }
    isUsuarioConsulta() {
        return this.usuario?.perfil?.nivel == 7;
    }
    /**
     * Informa se o usuário logado possui função de curador
     * @param pUnidade
     * @returns
     */
    isUsuarioCurador(pUnidade = null) {
        if (this.isUsuarioDeveloper())
            return true;
        const unidade = pUnidade || this.unidade;
        const unidadeFound = this.usuario?.areas_trabalho?.find(area => area.unidade_id == unidade.id);
        if (!unidadeFound)
            return false;
        return unidadeFound.atribuicoes?.find(atribuicao => atribuicao.atribuicao == 'CURADOR') != null;
    }
    /**
     * Informa se o usuário logado possui determinada atribuição para uma unidade específica dentre as suas unidades-integrante.
     * @param atribuicao
     * @param unidade_id
     */
    isIntegrante(atribuicao, unidade_id) {
        let $vinculo = this.usuario?.unidades_integrantes?.find(x => x.unidade_id == unidade_id);
        return !!$vinculo && $vinculo.atribuicoes.map(a => a.atribuicao).includes(atribuicao);
    }
    /**
     * Informa se o usuário logado tem como área de trabalho alguma das unidades pertencentes à linha hierárquica ascendente da unidade
     * recebida como parâmetro.
     * @param unidade
     * @returns
     */
    isLotadoNaLinhaAscendente(unidade) {
        let result = false;
        this.usuario.areas_trabalho?.map(x => x.unidade_id).forEach(x => { if (unidade.path.split('/').slice(1).includes(x))
            result = true; });
        return result;
    }
    /**
     * Informa se o usuário logado é gestor (titular, substituto ou delegado) de alguma das unidades pertencentes à linha hierárquica ascendente da unidade
     * recebida como parâmetro.
     * @param unidade
     * @returns
     */
    isGestorLinhaAscendente(unidade) {
        let result = false;
        let $ids_gerencias_substitutas = this.usuario?.gerencias_substitutas?.map(x => x.unidade_id) || [];
        let $ids_gerencias_delegadas = this.usuario?.gerencias_delegadas?.map(x => x.unidade_id) || [];
        let $ids_gerencias = [...$ids_gerencias_delegadas, ...$ids_gerencias_substitutas];
        if (this.usuario?.gerencia_titular?.unidade?.id)
            $ids_gerencias.push(this.usuario?.gerencia_titular.unidade_id);
        $ids_gerencias.forEach(x => { if (!!unidade.path && unidade.path.split('/').slice(1).includes(x))
            result = true; });
        return result;
    }
    loginPanel(user, password) {
        return this.server.post("api/panel-login", { user: user, password: password }).toPromise().then(response => {
            return response;
        });
    }
    impersonate(user) {
        this._apiToken = localStorage.getItem("petrvs_api_token") || undefined;
        return this.impersonateUser("SESSION", "impersonate", user);
    }
    impersonateUser(kind, route, user, redirectTo) {
        let login = () => {
            return this.server.post("api/impersonate", { user_id: user }).toPromise().then(response => {
                const loginResponse = response;
                if (loginResponse?.error)
                    throw new Error(loginResponse.error);
                this.kind = loginResponse?.kind || kind;
                this.apiToken = loginResponse.token;
                this.registerEntity(loginResponse.entidade);
                this.registerUser(loginResponse.usuario, this.apiToken);
                this.app?.setMenuVars();
                if (loginResponse.horario_servidor?.length) {
                    this.gb.horarioDelta.servidor = UtilService.iso8601ToDate(loginResponse.horario_servidor);
                    this.gb.horarioDelta.local = new Date();
                }
                if (this.success && kind != "SESSION")
                    this.success(this.usuario, redirectTo);
                if (this.gb.refresh)
                    this.gb.refresh();
                return true;
            }).catch(error => {
                this.registerUser(undefined);
                if (this.fail && kind != "SESSION")
                    this.fail(error?.message || error?.error || error.toString());
                if (this.gb.refresh)
                    this.gb.refresh();
                return false;
            });
        };
        this.logging = true;
        if (this.gb.isEmbedded) {
            return login();
        }
        else {
            return this.server.get('sanctum/csrf-cookie').toPromise().then(login);
        }
    }
    buscarUnidadesVinculadas(cpf) {
        return new Promise((resolve, reject) => {
            this.server.post('api/usuario/unidades-vinculadas', { cpf }).subscribe({
                next: (response) => {
                    const unidades = response?.unidades?.map((item) => new Unidade(item)) || [];
                    resolve(unidades);
                },
                error: (error) => reject(error)
            });
        });
    }
    async setUnidadesVinculadas() {
        if (this.usuario?.cpf) {
            try {
                this.unidadesVinculadas = await this.buscarUnidadesVinculadas(this.usuario.cpf);
            }
            catch (error) {
                console.error('Erro ao buscar matrículas do usuário:', error);
                this.unidadesVinculadas = [];
            }
        }
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map