(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-configuracoes-unidade-unidade-module"],{

/***/ "0Wht":
/*!**************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-form/unidade-form.component.ts ***!
  \**************************************************************************************/
/*! exports provided: UnidadeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnidadeFormComponent", function() { return UnidadeFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ "lbnZ");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_models_unidade_origem_atividade_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/unidade-origem-atividade.model */ "xjUY");
/* harmony import */ var src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/unidade.model */ "xiSz");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_services_notificacao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/notificacao.service */ "QUyP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ "q/rX");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ "/VYb");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");



























const _c0 = ["unidade_pai"];
const _c1 = ["cidade"];
const _c2 = ["gestor"];
const _c3 = ["gestorSubstituto"];
const _c4 = ["entidade"];
const _c5 = ["unidade_origem_atividade"];
function UnidadeFormComponent_ng_template_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r9.unidade_origem_atividade == null ? null : row_r9.unidade_origem_atividade.nome) || "", "");
} }
const _c6 = function () { return ["configuracoes", "unidade"]; };
const _c7 = function (a0) { return { route: a0 }; };
function UnidadeFormComponent_ng_template_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "input-search", 58, 59);
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("control", ctx_r8.formUnidadesOrigemAtividades.controls.unidade_origem_atividade_id)("dao", ctx_r8.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](5, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](4, _c6)));
} }
const _c8 = function () { return ["configuracoes", "usuario"]; };
const _c9 = function () { return ["cadastros", "cidade"]; };
const _c10 = function () { return ["configuracoes", "entidade"]; };
class UnidadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_8__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_7__["Unidade"], src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["UnidadeDaoService"]);
        this.injector = injector;
        this.validateUnidadesOrigemAtividades = (control, controlName) => {
            var _a;
            let result = null;
            if (controlName == 'unidade_origem_atividade_id' && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['codigo', 'sigla', 'nome', 'cidade_id', 'entidade_id'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            else if (['planos_prazo_comparecimento'].indexOf(controlName) >= 0 && !control.value) {
                result = "Não pode ser zero.";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + ((entity === null || entity === void 0 ? void 0 : entity.sigla) || "") + ' - ' + ((entity === null || entity === void 0 ? void 0 : entity.nome) || "");
        };
        this.entidadeDao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["EntidadeDaoService"]);
        this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["CidadeDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["UnidadeDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioDaoService"]);
        this.notificacao = injector.get(src_app_services_notificacao_service__WEBPACK_IMPORTED_MODULE_9__["NotificacaoService"]);
        this.form = this.fh.FormBuilder({
            codigo: { default: "" },
            sigla: { default: "" },
            nome: { default: "" },
            path: { default: "" },
            cidade_id: { default: "" },
            uf: { default: "" },
            atividades_arquivamento_automatico: { default: "" },
            atividades_avaliacao_automatico: { default: "" },
            planos_prazo_comparecimento: { default: "" },
            planos_tipo_prazo_comparecimento: { default: "" },
            horario_trabalho_inicio: { default: "00:00" },
            horario_trabalho_fim: { default: "23:59" },
            horario_trabalho_intervalo: { default: "00:00" },
            distribuicao_forma_contagem_prazos: { default: "DIAS_UTEIS" },
            entrega_forma_contagem_prazos: { default: "HORAS_UTEIS" },
            notificacoes: { default: {} },
            autoedicao_subordinadas: { default: "" },
            etiquetas: { default: [] },
            data_inicio: { default: "" },
            data_fim: { default: "" },
            unidade_id: { default: "" },
            entidade_id: { default: "" },
            etiqueta_texto: { default: "" },
            etiqueta_icone: { default: null },
            etiqueta_cor: { default: null },
            expediente24: { default: true },
            unidades_origem_atividades: { default: [] },
            gestor_id: { default: null },
            gestor_substituto_id: { default: null },
            notifica_demanda_distribuicao: { default: true },
            notifica_demanda_conclusao: { default: true },
            notifica_demanda_avaliacao: { default: true },
            notifica_demanda_modificacao: { default: true },
            notifica_demanda_comentario: { default: true },
            template_demanda_distribuicao: { default: "" },
            template_demanda_conclusao: { default: "" },
            template_demanda_avaliacao: { default: "" },
            template_demanda_modificacao: { default: "" },
            template_demanda_comentario: { default: "" },
            enviar_email: { default: true },
            enviar_whatsapp: { default: true }
        }, this.cdRef, this.validate);
        this.formUnidadesOrigemAtividades = this.fh.FormBuilder({
            unidade_origem_atividade_id: { default: "" }
        }, this.cdRef, this.validateUnidadesOrigemAtividades);
        this.join = ["cidade", "entidade", "unidades_origem_atividades.unidade_origem_atividade", "gestor", "gestor_substituto"];
    }
    get is24hrs() {
        var _a;
        return ((_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.expediente24.value) ? "" : undefined;
    }
    onExpediente24Change(event) {
        if (this.form.controls.expediente24.value) {
            this.form.controls.horario_trabalho_inicio.setValue("00:00");
            this.form.controls.horario_trabalho_fim.setValue("24:00");
        }
    }
    addItemHandle() {
        let result = undefined;
        const value = this.form.controls.etiqueta_texto.value;
        const key = this.util.textHash(value);
        if ((value === null || value === void 0 ? void 0 : value.length) && this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
            result = {
                key: key,
                value: this.form.controls.etiqueta_texto.value,
                color: this.form.controls.etiqueta_cor.value,
                icon: this.form.controls.etiqueta_icone.value
            };
            this.form.controls.etiqueta_texto.setValue("");
            this.form.controls.etiqueta_icone.setValue(null);
            this.form.controls.etiqueta_cor.setValue(null);
        }
        return result;
    }
    ;
    loadData(entity, form) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            yield Promise.all([
                this.unidadePai.loadSearch(entity.unidade || entity.unidade_id),
                this.cidade.loadSearch(entity.cidade || entity.cidade_id),
                this.gestor.loadSearch(entity.gestor || entity.gestor_id),
                this.gestorSubstituto.loadSearch(entity.gestor_substituto || entity.gestor_substituto_id),
                this.entidade.loadSearch(entity.entidade || entity.entidade_id) /*,
                this.unidadeOrigemAtividade!.loadSearch(entity.unidades_origem_atividades)*/
            ]);
            this.form.patchValue(this.util.fillForm(formValue, Object.assign(Object.assign({}, entity), {
                expediente24: entity.horario_trabalho_fim.startsWith("24:00"),
                notifica_demanda_distribuicao: ((_a = entity.notificacoes) === null || _a === void 0 ? void 0 : _a.notifica_demanda_distribuicao) == undefined || ((_b = entity.notificacoes) === null || _b === void 0 ? void 0 : _b.notifica_demanda_distribuicao),
                notifica_demanda_conclusao: ((_c = entity.notificacoes) === null || _c === void 0 ? void 0 : _c.notifica_demanda_conclusao) == undefined || ((_d = entity.notificacoes) === null || _d === void 0 ? void 0 : _d.notifica_demanda_conclusao),
                notifica_demanda_avaliacao: ((_e = entity.notificacoes) === null || _e === void 0 ? void 0 : _e.notifica_demanda_avaliacao) == undefined || ((_f = entity.notificacoes) === null || _f === void 0 ? void 0 : _f.notifica_demanda_avaliacao),
                notifica_demanda_modificacao: ((_g = entity.notificacoes) === null || _g === void 0 ? void 0 : _g.notifica_demanda_modificacao) == undefined || ((_h = entity.notificacoes) === null || _h === void 0 ? void 0 : _h.notifica_demanda_modificacao),
                notifica_demanda_comentario: ((_j = entity.notificacoes) === null || _j === void 0 ? void 0 : _j.notifica_demanda_comentario) == undefined || ((_k = entity.notificacoes) === null || _k === void 0 ? void 0 : _k.notifica_demanda_comentario),
                template_demanda_distribuicao: ((_l = entity.notificacoes) === null || _l === void 0 ? void 0 : _l.template_demanda_distribuicao) || "",
                template_demanda_conclusao: ((_m = entity.notificacoes) === null || _m === void 0 ? void 0 : _m.template_demanda_conclusao) || "",
                template_demanda_avaliacao: ((_o = entity.notificacoes) === null || _o === void 0 ? void 0 : _o.template_demanda_avaliacao) || "",
                template_demanda_modificacao: ((_p = entity.notificacoes) === null || _p === void 0 ? void 0 : _p.template_demanda_modificacao) || "",
                template_demanda_comentario: ((_q = entity.notificacoes) === null || _q === void 0 ? void 0 : _q.template_demanda_comentario) || "",
                enviar_email: ((_r = entity.notificacoes) === null || _r === void 0 ? void 0 : _r.enviar_email) == undefined || ((_s = entity.notificacoes) === null || _s === void 0 ? void 0 : _s.enviar_email),
                enviar_whatsapp: ((_t = entity.notificacoes) === null || _t === void 0 ? void 0 : _t.enviar_whatsapp) == undefined || ((_u = entity.notificacoes) === null || _u === void 0 ? void 0 : _u.enviar_whatsapp)
            })));
        });
    }
    initializeData(form) {
        this.entity = new src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_7__["Unidade"]();
        this.loadData(this.entity, form);
    }
    addUnidadesOrigemAtividades() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return Object.assign(new src_app_models_unidade_origem_atividade_model__WEBPACK_IMPORTED_MODULE_6__["UnidadeOrigemAtividade"](), { unidade_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id });
        });
    }
    loadUnidadesOrigemAtividades(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.controls.unidade_origem_atividade_id.setValue(row.unidade_origem_atividade_id);
        });
    }
    removeUnidadesOrigemAtividades(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return true;
        });
    }
    saveUnidadesOrigemAtividades(form, row) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            row.unidade_origem_atividade_id = form.controls.unidade_origem_atividade_id.value;
            row.unidade_origem_atividade = yield ((_a = this.dao) === null || _a === void 0 ? void 0 : _a.getById(row.unidade_origem_atividade_id));
            return row;
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let unidade = this.util.fill(new src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_7__["Unidade"](), this.entity);
            unidade = this.util.fillForm(unidade, this.form.value);
            unidade.horario_trabalho_fim = this.form.controls.expediente24.value ? "24:00" : unidade.horario_trabalho_fim;
            unidade.notificacoes.notifica_demanda_distribuicao = form.notifica_demanda_distribuicao;
            unidade.notificacoes.notifica_demanda_conclusao = form.notifica_demanda_conclusao;
            unidade.notificacoes.notifica_demanda_avaliacao = form.notifica_demanda_avaliacao;
            unidade.notificacoes.notifica_demanda_modificacao = form.notifica_demanda_modificacao;
            unidade.notificacoes.notifica_demanda_comentario = form.notifica_demanda_comentario;
            unidade.notificacoes.template_demanda_distribuicao = form.template_demanda_distribuicao;
            unidade.notificacoes.template_demanda_conclusao = form.template_demanda_conclusao;
            unidade.notificacoes.template_demanda_avaliacao = form.template_demanda_avaliacao;
            unidade.notificacoes.template_demanda_modificacao = form.template_demanda_modificacao;
            unidade.notificacoes.template_demanda_comentario = form.template_demanda_comentario;
            unidade.notificacoes.enviar_email = form.enviar_email;
            unidade.notificacoes.enviar_whatsapp = form.enviar_whatsapp;
            /* Remove os ids gerados para os novos unidades_origem_atividades, será gerado pelo servidor como UUID */
            unidade.unidades_origem_atividades.forEach(origem => {
                origem.id = origem.id.includes("-") ? origem.id : "";
            });
            /* O pai vai ser resolvido do lado do servidor
            if(!this.form.controls.unidade_id.value?.length) { //Então, selecionou o Pai.
              unidade.unidade_id = (this.pai?.searchObj as Unidade).id;
              unidade.codigoPai = (this.pai?.searchObj as Unidade).codigo;
              if(!(this.pai?.searchObj as Unidade).path.length) {//Então, o pai não tem Path (não tem Pai do Pai)
                unidade.path = "/"+(this.pai?.searchObj as Unidade).id+"/";
              }
              else{//O Pai tem um Pai, já vai vir algo do tipo '/dadasd-dasdas-dasdas/'
                unidade.path = (this.pai?.searchObj as Unidade).path+(this.pai?.searchObj as Unidade).id+"/";
              }
            }*/
            resolve(unidade);
        });
    }
}
UnidadeFormComponent.ɵfac = function UnidadeFormComponent_Factory(t) { return new (t || UnidadeFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["Injector"])); };
UnidadeFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: UnidadeFormComponent, selectors: [["app-unidade-form"]], viewQuery: function UnidadeFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c5, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.unidadePai = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.cidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.gestor = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.gestorSubstituto = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.entidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.unidadeOrigemAtividade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]], decls: 75, vars: 127, consts: [[3, "title", "form", "disabled", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], ["label", "C\u00F3digo", "controlName", "codigo", 3, "size", "control"], ["label", "Sigla", "controlName", "sigla", 3, "size", "control"], ["label", "Nome", "controlName", "nome", 3, "size", "control"], ["label", "Gestor", "controlName", "gestor_id", "labelInfo", "Respons\u00E1vel pela unidade", 3, "size", "emptyValue", "control", "dao", "selectRoute"], ["gestor", ""], ["label", "Gestor Substituto", "controlName", "gestor_substituto_id", "labelInfo", "Respons\u00E1vel substituto pela unidade", 3, "size", "emptyValue", "control", "dao", "selectRoute"], ["gestorSubstituto", ""], ["label", "Cidade", "controlName", "cidade_id", 3, "size", "control", "dao", "selectRoute"], ["cidade", ""], ["label", "Unidade pai", "controlName", "unidade_id", 3, "size", "control", "dao", "selectRoute"], ["unidade_pai", ""], ["label", "Entidade", "controlName", "entidade_id", 3, "size", "control", "dao", "selectRoute"], ["entidade", ""], ["key", "CONFIGURACOES", "label", "Configura\u00E7\u00F5es"], ["label", "Avalia\u00E7\u00E3o autom\u00E1tica", "controlName", "atividades_avaliacao_automatico", "labelInfo", "Se ao final do prazo de avalia\u00E7\u00E3o do gestor, avaliar\u00E1 como 10 a atividade.", 3, "size", "control", "items"], ["label", "Arquivamento autom\u00E1tico", "controlName", "atividades_arquivamento_automatico", "labelInfo", "Se ap\u00F3s a avalia\u00E7\u00E3o, arquivar\u00E1 automaticamente a atividade.", 3, "size", "control", "items"], ["label", "Auto-edi\u00E7\u00E3o (Subordinadas)", "controlName", "autoedicao_subordinadas", "labelInfo", "Se as Unidades Subordinadas podem editar suas pr\u00F3prias Informa\u00E7\u00F5es Gerais", 3, "size", "control", "items"], ["label", "Contagem Prazo Distribui\u00E7\u00E3o", "controlName", "distribuicao_forma_contagem_prazos", "labelInfo", "A forma da contagem dos prazos para a distribui\u00E7\u00E3o (lan\u00E7amento da demanda).", 3, "size", "control", "items"], ["label", "Contagem Prazo Entrega", "controlName", "entrega_forma_contagem_prazos", "labelInfo", "A forma da contagem dos prazos na entrega da demanda (data da entrega e tempo despendido)", 3, "size", "control", "items"], ["label", "Comparecer", "controlName", "planos_tipo_prazo_comparecimento", "labelInfo", "Formato de Prazo de Comparecimento a Unidade", 3, "size", "control", "items"], ["numbers", "", "label", "Prazo", "controlName", "planos_prazo_comparecimento", "labelInfo", "Prazo de Comparecimento a Unidade", 3, "size", "control"], ["title", "Expediente"], ["label", "24hs", "controlName", "expediente24", "labelInfo", "Se o expediente \u00E9 de 24hs ou \u00E9 um per\u00EDdo, se for per\u00EDodo ser\u00E1 informado in\u00EDcio e fim", 3, "size", "control", "change"], ["time", "", "label", "In\u00EDcio", "controlName", "horario_trabalho_inicio", "labelInfo", "Hor\u00E1rio do in\u00EDcio da Jornada de Trabalho", 3, "size", "disabled", "control"], ["time", "", "label", "Final", "controlName", "horario_trabalho_fim", "labelInfo", "Hor\u00E1rio do Final da Jornada de Trabalho", 3, "size", "disabled", "control"], ["time", "", "noIcon", "", "label", "Dur. Intervalo", "controlName", "horario_trabalho_intervalo", "labelInfo", "Dura\u00E7\u00E3o do intervalo realizado dentro da jornada de trabalho (quantidade de horas, ex.: hor\u00E1rio de almo\u00E7o de duas horas ser\u00E1 02:00). Para fins de computo de jornada de trabalho na aus\u00EAncia do plano de trabalho.", 3, "size", "control"], ["clss", "row"], ["label", "Etiquetas", "multiselectStyle", "inline", "controlName", "etiquetas", 3, "maxItemWidth", "size", "control", "addItemHandle"], ["label", "Texto", "controlName", "etiqueta_texto", 3, "size", "control"], ["label", "\u00CDcone", "controlName", "etiqueta_icone", 3, "size", "control", "items"], ["label", "Cor", "controlName", "etiqueta_cor", 3, "size", "control"], ["key", "ATIVIDADES", "label", "Atividades"], ["editable", "", 3, "control", "form", "add", "load", "remove", "save"], ["title", "Unidades vinculadas", "titleHint", "Unidades auxiliares para origem de atividades", 3, "template", "editTemplate"], ["columnUnidade", ""], ["editUnidade", ""], ["type", "options"], ["key", "NOTIFICACOES", "label", "Notifica\u00E7\u00F5es"], [1, "col-md-6"], ["transparent", "", "title", "Meios de notifica\u00E7\u00E3o"], ["scale", "small", "labelPosition", "right", "label", "Notificar por e-mail", "controlName", "enviar_email", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar por Whatsapp", "controlName", "enviar_whatsapp", 3, "size"], ["transparent", "", "title", "Tipos de notifica\u00E7\u00E3o"], ["scale", "small", "labelPosition", "right", "label", "Notificar distribui\u00E7\u00E3o da demanda", "controlName", "notifica_demanda_distribuicao", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar conclus\u00E3o da demanda", "controlName", "notifica_demanda_conclusao", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar avalia\u00E7\u00E3o da demanda", "controlName", "notifica_demanda_avaliacao", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar modifica\u00E7\u00E3o da demanda", "controlName", "notifica_demanda_modificacao", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar coment\u00E1rio da demanda", "controlName", "notifica_demanda_comentario", 3, "size"], ["transparent", "", "title", "Templates das mensagens"], ["controlName", "template_demanda_distribuicao", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo", "control"], ["controlName", "template_demanda_conclusao", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo", "control"], ["controlName", "template_demanda_avaliacao", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo", "control"], ["controlName", "template_demanda_modificacao", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo", "control"], ["controlName", "template_demanda_comentario", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo", "control"], ["controlName", "unidade_origem_atividade_id", 3, "size", "control", "dao", "selectRoute"], ["unidade_origem_atividade", ""]], template: function UnidadeFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submit", function UnidadeFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function UnidadeFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](6, "input-text", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](8, "input-search", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](10, "input-search", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](13, "input-search", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "input-search", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](17, "input-search", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "tab", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](21, "input-radio", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](22, "input-radio", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](23, "input-radio", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](24, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](26, "input-select", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](27, "input-select", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](28, "input-select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](29, "input-text", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](30, "separator", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "input-switch", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function UnidadeFormComponent_Template_input_switch_change_32_listener($event) { return ctx.onExpediente24Change($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](33, "input-datetime", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](34, "input-datetime", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](35, "input-datetime", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](36, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](37, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](38, "input-multiselect", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](39, "input-text", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](40, "input-select", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](41, "input-color", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](42, "tab", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](43, "grid", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](44, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](45, "column", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](46, UnidadeFormComponent_ng_template_46_Template, 2, 1, "ng-template", null, 38, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](48, UnidadeFormComponent_ng_template_48_Template, 2, 7, "ng-template", null, 39, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](50, "column", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "tab", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](52, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](53, "div", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](54, "separator", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](55, "input-switch", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](56, "input-switch", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](57, "div", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](58, "separator", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](59, "input-switch", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](60, "input-switch", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](61, "input-switch", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](62, "input-switch", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](63, "input-switch", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](64, "separator", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](65, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](66, "input-textarea", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](67, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](68, "input-textarea", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](69, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](70, "input-textarea", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](71, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](72, "input-textarea", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](73, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](74, "input-textarea", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](47);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](49);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.codigo);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.sigla);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("emptyValue", null)("control", ctx.form.controls.gestor_id)("dao", ctx.usuarioDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](113, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](112, _c8)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("emptyValue", null)("control", ctx.form.controls.gestor_substituto_id)("dao", ctx.usuarioDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](116, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](115, _c8)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cidade_id)("dao", ctx.cidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](119, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](118, _c9)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.unidade_id)("dao", ctx.dao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](122, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](121, _c6)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.entidade_id)("dao", ctx.entidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](125, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](124, _c10)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.atividades_avaliacao_automatico)("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.atividades_arquivamento_automatico)("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.autoedicao_subordinadas)("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.distribuicao_forma_contagem_prazos)("items", ctx.lookup.DIA_HORA_CORRIDOS_OU_UTEIS);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.entrega_forma_contagem_prazos)("items", ctx.lookup.HORAS_CORRIDAS_OU_UTEIS);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.planos_tipo_prazo_comparecimento)("items", ctx.lookup.DIA_OU_HORA);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.planos_prazo_comparecimento);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.expediente24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("disabled", ctx.is24hrs)("control", ctx.form.controls.horario_trabalho_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("disabled", ctx.is24hrs)("control", ctx.form.controls.horario_trabalho_fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.horario_trabalho_intervalo);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("maxItemWidth", 250)("size", 12)("control", ctx.form.controls.etiquetas)("addItemHandle", ctx.addItemHandle.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.etiqueta_texto);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.etiqueta_icone)("items", ctx.lookup.ICONES);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.etiqueta_cor);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("control", ctx.form.controls.unidades_origem_atividades)("form", ctx.formUnidadesOrigemAtividades)("add", ctx.addUnidadesOrigemAtividades.bind(ctx))("load", ctx.loadUnidadesOrigemAtividades.bind(ctx))("remove", ctx.removeUnidadesOrigemAtividades.bind(ctx))("save", ctx.saveUnidadesOrigemAtividades.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r5)("editTemplate", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na cria\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaDistribuicao)("control", ctx.form.controls.template_demanda_distribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na conclus\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaConclusao)("control", ctx.form.controls.template_demanda_conclusao);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na avalia\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaAvaliacao)("control", ctx.form.controls.template_demanda_avaliacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na modifica\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaModificacao)("control", ctx.form.controls.template_demanda_modificacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na inclus\u00E3o de coment\u00E1rio " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaComentario)("control", ctx.form.controls.template_demanda_comentario);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_11__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_12__["TabComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__["InputSearchComponent"], _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_15__["InputRadioComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_16__["SeparatorComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__["InputSelectComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_18__["InputSwitchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_19__["InputDatetimeComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_20__["InputMultiselectComponent"], _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_21__["InputColorComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_22__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_23__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_24__["ColumnComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_25__["InputTextareaComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1bmlkYWRlLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "8tza":
/*!**************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-list/unidade-list.component.ts ***!
  \**************************************************************************************/
/*! exports provided: UnidadeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnidadeListComponent", function() { return UnidadeListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ "lbnZ");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/unidade.model */ "xiSz");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
















function UnidadeListComponent_h3_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h3", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r0.title);
} }
function UnidadeListComponent_toolbar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "toolbar");
} }
function UnidadeListComponent_ng_template_11_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", row_r8.unidade.sigla, " ");
} }
function UnidadeListComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, UnidadeListComponent_ng_template_11_span_2_Template, 3, 1, "span", 18);
} if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r8.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", row_r8.unidade);
} }
function UnidadeListComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r11.cidade.nome + "/" + row_r11.cidade.uf);
} }
function UnidadeListComponent_column_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "column", 21);
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("onEdit", ctx_r7.edit)("options", ctx_r7.options);
} }
const _c0 = function () { return ["configuracoes", "entidade"]; };
const _c1 = function (a0) { return { route: a0 }; };
class UnidadeListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_4__["Unidade"], src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["UnidadeDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            var _a, _b;
            let form = filter.value;
            let result = [];
            if ((_a = form.entidade_id) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["entidade_id", "==", form.entidade_id]);
            }
            if ((_b = form.nome) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["or", ["nome", "like", "%" + form.nome.replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.replace(" ", "%") + "%"]]);
            }
            return result;
        };
        this.join = ["cidade", "unidade:id,sigla", "entidade:id,sigla"];
        this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_1__["CidadeDaoService"]);
        this.entidadeDao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["EntidadeDaoService"]);
        /* Inicializações */
        this.title = this.lex.noun("Unidade", true);
        this.code = "MOD_CFG_UND";
        this.filter = this.fh.FormBuilder({
            entidade_id: { default: null },
            nome: { default: "" }
        });
        this.groupBy = [{ field: "entidade.sigla", label: "Entidade" }];
        // Testa se o usuário possui permissão para exibir dados da unidade
        if (this.auth.hasPermissionTo("MOD_UND_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir unidade
        if (this.auth.hasPermissionTo("MOD_UND_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
    }
    filterClear(filter) {
        super.filterClear(filter);
    }
}
UnidadeListComponent.ɵfac = function UnidadeListComponent_Factory(t) { return new (t || UnidadeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["Injector"])); };
UnidadeListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: UnidadeListComponent, selectors: [["app-unidade-list"]], viewQuery: function UnidadeListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], decls: 19, vars: 29, consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Entidade", "controlName", "entidade_id", 3, "size", "control", "dao", "selectRoute"], ["entidade", ""], ["label", "Nome", "controlName", "nome", "placeholder", "Nome ou sigla...", 3, "size", "control"], ["title", "Sigla", "field", "sigla"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "C\u00F3digo", "field", "codigo"], ["title", "Cidade", 3, "template"], ["columnCidade", ""], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], [3, "rows"], [1, "my-2"], [1, "d-block"], ["class", "badge bg-light text-dark", 4, "ngIf"], [1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-arrow-return-right"], ["type", "options", 3, "onEdit", "options"]], template: function UnidadeListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, UnidadeListComponent_h3_0_Template, 2, 1, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("select", function UnidadeListComponent_Template_grid_select_1_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, UnidadeListComponent_toolbar_2_Template, 1, 0, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "filter", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "input-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, UnidadeListComponent_ng_template_11_Template, 3, 2, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, UnidadeListComponent_ng_template_15_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, UnidadeListComponent_column_17_Template, 1, 2, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "pagination", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](12);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.isModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_UND_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_UND_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.entidade_id)("dao", ctx.entidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](27, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](26, _c0)));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 8)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__["FilterComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__["InputSearchComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_14__["ToolbarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1bmlkYWRlLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "Elg6":
/*!*****************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade.module.ts ***!
  \*****************************************************************/
/*! exports provided: UnidadeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnidadeModule", function() { return UnidadeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _unidade_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unidade-routing.module */ "jtVw");
/* harmony import */ var _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unidade-form/unidade-form.component */ "0Wht");
/* harmony import */ var _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./unidade-list/unidade-list.component */ "8tza");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class UnidadeModule {
}
UnidadeModule.ɵfac = function UnidadeModule_Factory(t) { return new (t || UnidadeModule)(); };
UnidadeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: UnidadeModule });
UnidadeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _unidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["UnidadeRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](UnidadeModule, { declarations: [_unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_2__["UnidadeFormComponent"],
        _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_3__["UnidadeListComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _unidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["UnidadeRoutingModule"]] }); })();


/***/ }),

/***/ "jtVw":
/*!*************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: UnidadeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnidadeRoutingModule", function() { return UnidadeRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./unidade-form/unidade-form.component */ "0Wht");
/* harmony import */ var _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./unidade-list/unidade-list.component */ "8tza");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_4__["UnidadeListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Unidades" } },
    { path: 'new', component: _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_3__["UnidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_3__["UnidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_3__["UnidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];
class UnidadeRoutingModule {
}
UnidadeRoutingModule.ɵfac = function UnidadeRoutingModule_Factory(t) { return new (t || UnidadeRoutingModule)(); };
UnidadeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: UnidadeRoutingModule });
UnidadeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](UnidadeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "xjUY":
/*!**********************************************************!*\
  !*** ./src/app/models/unidade-origem-atividade.model.ts ***!
  \**********************************************************/
/*! exports provided: UnidadeOrigemAtividade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnidadeOrigemAtividade", function() { return UnidadeOrigemAtividade; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class UnidadeOrigemAtividade extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.unidade_id = ""; /* ID da unidade pai */
        this.unidade_origem_atividade_id = ""; /* ID da unidade que será utilizada como origem de atividades  */
        this.initialization(data);
    }
}


/***/ })

}]);
//# sourceMappingURL=modules-configuracoes-unidade-unidade-module.js.map