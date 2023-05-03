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
/* harmony import */ var src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/plano-dao.service */ "eHo6");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_models_expediente_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/expediente.model */ "e8A4");
/* harmony import */ var src_app_models_unidade_origem_atividade_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/unidade-origem-atividade.model */ "xjUY");
/* harmony import */ var src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/unidade.model */ "xiSz");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_services_notificacao_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/notificacao.service */ "QUyP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ "q/rX");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ "/VYb");
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ "7B2Z");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../uteis/calendar-expediente/calendar-expediente.component */ "ODvL");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");






























const _c0 = ["unidade_pai"];
const _c1 = ["cidade"];
const _c2 = ["gestor"];
const _c3 = ["gestorSubstituto"];
const _c4 = ["entidade"];
const _c5 = ["unidade_origem_atividade"];
function UnidadeFormComponent_ng_template_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", (row_r11.unidade_origem_atividade == null ? null : row_r11.unidade_origem_atividade.nome) || "", "");
} }
function UnidadeFormComponent_ng_template_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "input-search", 60, 61);
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("control", ctx_r10.formUnidadesOrigemAtividades.controls.unidade_origem_atividade_id)("dao", ctx_r10.unidadeDao);
} }
class UnidadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_9__["Unidade"], src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__["UnidadeDaoService"]);
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
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__["UnidadeDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__["UsuarioDaoService"]);
        this.planoDao = injector.get(src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_4__["PlanoDaoService"]);
        this.notificacao = injector.get(src_app_services_notificacao_service__WEBPACK_IMPORTED_MODULE_11__["NotificacaoService"]);
        this.modalWidth = 1200;
        this.planoDataset = this.planoDao.dataset();
        this.form = this.fh.FormBuilder({
            codigo: { default: "" },
            sigla: { default: "" },
            nome: { default: "" },
            path: { default: "" },
            cidade_id: { default: "" },
            uf: { default: "" },
            atividades_arquivamento_automatico: { default: 1 },
            avaliacao_hierarquica: { default: 0 },
            atividades_avaliacao_automatico: { default: 0 },
            planos_prazo_comparecimento: { default: "" },
            planos_tipo_prazo_comparecimento: { default: "" },
            horario_trabalho_inicio: { default: "00:00" },
            horario_trabalho_fim: { default: "23:59" },
            horario_trabalho_intervalo: { default: "00:00" },
            distribuicao_forma_contagem_prazos: { default: "DIAS_UTEIS" },
            entrega_forma_contagem_prazos: { default: "HORAS_UTEIS" },
            notificacoes: { default: {} },
            autoedicao_subordinadas: { default: 0 },
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
            enviar_whatsapp: { default: true },
            expediente: { default: null },
            usar_expediente_entidade: { default: true },
            texto_complementar_plano: { default: "" }
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
    onUsarExpedienteEntidadeChange() {
        this.form.controls.expediente.setValue(this.form.controls.usar_expediente_entidade.value ? null : this.form.controls.expediente.value || new src_app_models_expediente_model__WEBPACK_IMPORTED_MODULE_7__["Expediente"]());
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
        this.entity = new src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_9__["Unidade"]();
        this.loadData(this.entity, form);
    }
    addUnidadesOrigemAtividades() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return Object.assign(new src_app_models_unidade_origem_atividade_model__WEBPACK_IMPORTED_MODULE_8__["UnidadeOrigemAtividade"](), { unidade_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id });
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
            let unidade = this.util.fill(new src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_9__["Unidade"](), this.entity);
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
UnidadeFormComponent.ɵfac = function UnidadeFormComponent_Factory(t) { return new (t || UnidadeFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["Injector"])); };
UnidadeFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({ type: UnidadeFormComponent, selectors: [["app-unidade-form"]], viewQuery: function UnidadeFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c5, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.unidadePai = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.cidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.gestor = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.gestorSubstituto = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.entidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.unidadeOrigemAtividade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]], decls: 79, vars: 95, consts: [[3, "title", "form", "disabled", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], ["label", "C\u00F3digo", "controlName", "codigo", 3, "size"], ["label", "Sigla", "controlName", "sigla", 3, "size"], ["label", "Nome", "controlName", "nome", 3, "size"], ["label", "Gestor", "controlName", "gestor_id", "labelInfo", "Respons\u00E1vel pela unidade", 3, "size", "emptyValue", "dao"], ["gestor", ""], ["label", "Gestor Substituto", "controlName", "gestor_substituto_id", "labelInfo", "Respons\u00E1vel substituto pela unidade", 3, "size", "emptyValue", "dao"], ["gestorSubstituto", ""], ["controlName", "cidade_id", 3, "size", "dao"], ["cidade", ""], ["controlName", "unidade_id", 3, "size", "label", "dao"], ["unidade_pai", ""], ["controlName", "entidade_id", 3, "size", "dao"], ["entidade", ""], ["key", "CONFIGURACOES", "label", "Configura\u00E7\u00F5es"], ["controlName", "avaliacao_hierarquica", "labelInfo", "Se permite que unidades supeiores fa\u00E7a avalia\u00E7\u00E3o.", 3, "size", "label", "items"], ["controlName", "atividades_avaliacao_automatico", "labelInfo", "Se ao final do prazo de avalia\u00E7\u00E3o do gestor, avaliar\u00E1 como 10 a atividade.", 3, "size", "label", "items"], ["label", "Arquivamento autom\u00E1tico", "controlName", "atividades_arquivamento_automatico", "labelInfo", "Se ap\u00F3s a avalia\u00E7\u00E3o, arquivar\u00E1 automaticamente a atividade.", 3, "size", "items"], ["label", "Auto-edi\u00E7\u00E3o (Subordinadas)", "controlName", "autoedicao_subordinadas", "labelInfo", "Se as Unidades Subordinadas podem editar suas pr\u00F3prias Informa\u00E7\u00F5es Gerais", 3, "size", "items"], ["controlName", "distribuicao_forma_contagem_prazos", "labelInfo", "A forma da contagem dos prazos para a distribui\u00E7\u00E3o (lan\u00E7amento da demanda).", 3, "size", "label", "items"], ["controlName", "entrega_forma_contagem_prazos", "labelInfo", "A forma da contagem dos prazos na entrega da demanda (data da entrega e tempo despendido)", 3, "size", "label", "items"], ["label", "Comparecer", "controlName", "planos_tipo_prazo_comparecimento", "labelInfo", "Formato de Prazo de Comparecimento a Unidade", 3, "size", "items"], ["numbers", "", "label", "Prazo", "controlName", "planos_prazo_comparecimento", "labelInfo", "Prazo de Comparecimento a Unidade", 3, "size"], ["clss", "row"], ["label", "Etiquetas", "multiselectStyle", "inline", "controlName", "etiquetas", 3, "maxItemWidth", "size", "addItemHandle"], ["label", "Texto", "controlName", "etiqueta_texto", 3, "size"], ["label", "\u00CDcone", "controlName", "etiqueta_icone", 3, "size", "items"], ["label", "Cor", "controlName", "etiqueta_cor", 3, "size"], ["controlName", "texto_complementar_plano", 3, "label", "dataset"], ["key", "EXPEDIENTE", "label", "Expediente"], ["labelPosition", "right", "icon", "bi bi-check2", "controlName", "usar_expediente_entidade", "labelInfo", "Se utiliza o expediente configurado na entidade ao inv\u00E9s de especificar na unidade", 3, "label", "size", "change"], ["usarExpedienteEntidade", ""], [3, "disabled", "expedienteDisabled", "control"], ["expediente", ""], ["key", "UNIDADES_VINCULADAS", 3, "label"], ["editable", "", 3, "control", "form", "add", "load", "remove", "save"], ["titleHint", "Unidades auxiliares para origem de atividades", 3, "title", "template", "editTemplate"], ["columnUnidade", ""], ["editUnidade", ""], ["type", "options"], ["key", "NOTIFICACOES", "label", "Notifica\u00E7\u00F5es"], [1, "col-md-6"], ["transparent", "", "title", "Meios de notifica\u00E7\u00E3o"], ["scale", "small", "labelPosition", "right", "label", "Notificar por e-mail", "controlName", "enviar_email", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar por Whatsapp", "controlName", "enviar_whatsapp", 3, "size"], ["transparent", "", "title", "Tipos de notifica\u00E7\u00E3o"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_distribuicao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_conclusao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_avaliacao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_modificacao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_comentario", 3, "size", "label"], ["transparent", "", 3, "title"], ["controlName", "template_demanda_distribuicao", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo"], ["controlName", "template_demanda_conclusao", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo"], ["controlName", "template_demanda_avaliacao", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo"], ["controlName", "template_demanda_modificacao", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo"], ["controlName", "template_demanda_comentario", "placeholder", "Caso em branco, ser\u00E1 utilizado a configura\u00E7\u00E3o da Entidade...", 3, "size", "rows", "label", "labelInfo"], ["controlName", "unidade_origem_atividade_id", 3, "size", "control", "dao"], ["unidade_origem_atividade", ""]], template: function UnidadeFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("submit", function UnidadeFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function UnidadeFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "input-text", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](8, "input-search", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](10, "input-search", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](13, "input-search", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](15, "input-search", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](17, "input-search", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](19, "tab", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](20, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](21, "input-radio", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](22, "input-radio", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](23, "input-radio", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](24, "input-radio", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](25, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](26, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](27, "input-select", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](28, "input-select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](29, "input-select", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](30, "input-text", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](31, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](32, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](33, "input-multiselect", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](34, "input-text", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](35, "input-select", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](36, "input-color", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](37, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](38, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](39, "input-editor", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](40, "tab", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](41, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](42, "input-switch", 33, 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("change", function UnidadeFormComponent_Template_input_switch_change_42_listener() { return ctx.onUsarExpedienteEntidadeChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](44, "calendar-expediente", 35, 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](46, "tab", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](47, "grid", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](48, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](49, "column", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](50, UnidadeFormComponent_ng_template_50_Template, 2, 1, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](52, UnidadeFormComponent_ng_template_52_Template, 2, 3, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](54, "column", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](55, "tab", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](56, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](57, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](58, "separator", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](59, "input-switch", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](60, "input-switch", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](61, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](62, "separator", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](63, "input-switch", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](64, "input-switch", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](65, "input-switch", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](66, "input-switch", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](67, "input-switch", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](68, "separator", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](69, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](70, "input-textarea", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](71, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](72, "input-textarea", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](73, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](74, "input-textarea", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](75, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](76, "input-textarea", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](77, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](78, "input-textarea", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](51);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](53);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6)("emptyValue", null)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6)("emptyValue", null)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 4)("dao", ctx.cidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 4)("label", ctx.lex.noun("Unidade") + " pai")("dao", ctx.dao);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 4)("dao", ctx.entidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3)("label", ctx.lex.noun("Avalia\u00E7\u00E3o") + " hier\u00E1rquica")("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3)("label", ctx.lex.noun("Avalia\u00E7\u00E3o") + " autom\u00E1tica")("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3)("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3)("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 4)("label", "Contagem " + ctx.lex.noun("Prazo de Distribui\u00E7\u00E3o"))("items", ctx.lookup.DIA_HORA_CORRIDOS_OU_UTEIS);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 4)("label", "Contagem " + ctx.lex.noun("Prazo de Entrega"))("items", ctx.lookup.HORAS_CORRIDAS_OU_UTEIS);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 2)("items", ctx.lookup.DIA_OU_HORA);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("maxItemWidth", 250)("size", 12)("addItemHandle", ctx.addItemHandle.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3)("items", ctx.lookup.ICONES);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("label", "Texto complementar " + ctx.lex.noun("Plano de Trabalho", false, true))("dataset", ctx.planoDataset);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("label", "Usar o calend\u00E1rio " + ctx.lex.noun("entidade", false, true))("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("disabled", ctx.form.controls.usar_expediente_entidade.value ? "true" : undefined)("expedienteDisabled", ctx.entity == null ? null : ctx.entity.entidade == null ? null : ctx.entity.entidade.expediente)("control", ctx.form.controls.expediente);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("label", ctx.lex.noun("Unidade", true) + " Vinculadas");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("control", ctx.form.controls.unidades_origem_atividades)("form", ctx.formUnidadesOrigemAtividades)("add", ctx.addUnidadesOrigemAtividades.bind(ctx))("load", ctx.loadUnidadesOrigemAtividades.bind(ctx))("remove", ctx.removeUnidadesOrigemAtividades.bind(ctx))("save", ctx.saveUnidadesOrigemAtividades.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("title", ctx.lex.noun("Unidade", true))("template", _r7)("editTemplate", _r9);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", "Notificar distribui\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", "Notificar conclus\u00E3o " + ctx.lex.noun("demanda", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", "Notificar avalia\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", "Notificar modifica\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", "Notificar coment\u00E1rio " + ctx.lex.noun("demanda", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("title", ctx.lex.noun("Template", true) + " das mensagens");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na cria\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaDistribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na conclus\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaConclusao);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na avalia\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaAvaliacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na modifica\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaModificacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na inclus\u00E3o de coment\u00E1rio " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaComentario);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_13__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_14__["TabComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_15__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_16__["InputSearchComponent"], _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_17__["InputRadioComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_18__["SeparatorComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__["InputSelectComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_20__["InputMultiselectComponent"], _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_21__["InputColorComponent"], _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_22__["InputEditorComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_23__["InputSwitchComponent"], _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_24__["CalendarExpedienteComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_25__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_26__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_27__["ColumnComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_28__["InputTextareaComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1bmlkYWRlLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"] });


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ "lbnZ");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/unidade.model */ "xiSz");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");



















function UnidadeListComponent_h3_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "h3", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r0.title);
} }
function UnidadeListComponent_toolbar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "toolbar", 20);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("buttons", ctx_r1.buttons);
} }
function UnidadeListComponent_ng_template_12_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r9.unidade.sigla, " ");
} }
function UnidadeListComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, UnidadeListComponent_ng_template_12_span_2_Template, 3, 1, "span", 22);
} if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r9.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r9.unidade);
} }
function UnidadeListComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r12 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](((row_r12.cidade == null ? null : row_r12.cidade.nome) || "") + "/" + ((row_r12.cidade == null ? null : row_r12.cidade.uf) || ""));
} }
function UnidadeListComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "badge", 25);
} if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("color", !row_r13.inativo ? "success" : "danger")("icon", !row_r13.inativo ? "bi bi-check-circle" : "bi bi-x-circle")("label", !row_r13.inativo ? "Ativo" : "Inativo");
} }
class UnidadeListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_6__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_5__["Unidade"], src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["UnidadeDaoService"]);
        this.injector = injector;
        this.buttons = [];
        this.filterWhere = (filter) => {
            var _a, _b;
            let form = filter.value;
            let result = [];
            /* Se for selectable trás somente os inativos ou os não inativos, se não for então trás juntamente os inativos se form.inativos */
            result.push(this.selectable ? ["inativo", form.inativos ? "!=" : "==", null] : ["inativos", "==", form.inativos]);
            if ((_a = form.entidade_id) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["entidade_id", "==", form.entidade_id]);
            }
            if ((_b = form.nome) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["or", ["nome", "like", "%" + form.nome.replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.replace(" ", "%") + "%"]]);
            }
            return result;
        };
        this.join = ["cidade", "unidade:id,sigla", "entidade:id,sigla"];
        this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["CidadeDaoService"]);
        this.entidadeDao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["EntidadeDaoService"]);
        /* Inicializações */
        this.title = this.lex.noun("Unidade", true);
        this.code = "MOD_CFG_UND";
        this.filter = this.fh.FormBuilder({
            entidade_id: { default: null },
            inativos: { default: false },
            nome: { default: "" }
        });
        this.groupBy = [{ field: "entidade.sigla", label: "Entidade" }];
        // Testa se o usuário possui permissão unificar unidade
        if (this.auth.hasPermissionTo("MOD_UND_UNIR")) {
            this.buttons.push({
                icon: "bi bi-arrows-collapse",
                color: "btn-outline-danger",
                label: "Unificar",
                onClick: (unidade) => this.go.navigate({ route: ['configuracoes', 'unidade', 'merge'] }, this.modalRefresh())
            });
        }
    }
    dynamicOptions(row) {
        let result = [];
        let unidade = row;
        // Testa se o usuário possui permissão para exibir dados da unidade
        if (this.auth.hasPermissionTo("MOD_UND_CONS"))
            result.push({ icon: "bi bi-activity", label: "Ver Atividades", onClick: this.consultAtividades.bind(this) });
        // Testa se o usuário possui permissão para exibir dados da unidade
        if (this.auth.hasPermissionTo("MOD_UND_CONS"))
            result.push({ icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this) });
        // Testa se o usuário possui permissão de inativar a unidade
        if (this.auth.hasPermissionTo("MOD_UND_INATV"))
            result.push({ icon: unidade.inativo ? "bi bi-check-circle" : "bi bi-x-circle", label: unidade.inativo ? 'Reativar' : 'Inativar', onClick: (unidade) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () { return yield this.inativo(unidade, !unidade.inativo); }) });
        // Testa se o usuário possui permissão para gerenciar integrantes da unidade
        if (this.auth.hasPermissionTo("MOD_UND_INTG"))
            result.push({ icon: "bi bi-people", label: "Integrantes", onClick: (unidade) => this.go.navigate({ route: ['configuracoes', 'unidade', 'NOPERSIST', unidade.id, 'integrante'] }) });
        // Testa se o usuário possui permissão para excluir unidade
        if (this.auth.hasPermissionTo("MOD_UND_EXCL"))
            result.push({ icon: "bi bi-trash", label: "Excluir", onClick: this.delete.bind(this) });
        return result;
    }
    inativo(unidade, inativo) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (yield this.dialog.confirm(inativo ? "Inativar" : "Reativar", inativo ? "Deseja realmente inativar a unidade?" : "Deseja reativar a unidade?")) {
                try {
                    this.submitting = true;
                    yield this.dao.inativo(unidade.id, inativo);
                    yield this.modalRefreshId(unidade).modalClose(undefined);
                }
                finally {
                    this.submitting = false;
                }
            }
        });
    }
    filterClear(filter) {
        super.filterClear(filter);
    }
    consultAtividades(unidade) {
        this.go.navigate({ route: ['gestao', 'atividade'] }, { metadata: { unidade_id: unidade.id, filterHidden: 'true', exibir_vinculadas_toolbar: true, minhas: true }, modal: true });
    }
}
UnidadeListComponent.ɵfac = function UnidadeListComponent_Factory(t) { return new (t || UnidadeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
UnidadeListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: UnidadeListComponent, selectors: [["app-unidade-list"]], viewQuery: function UnidadeListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 23, vars: 29, consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [3, "buttons", 4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "entidade_id", 3, "size", "dao"], ["entidade", ""], ["label", "Nome", "controlName", "nome", "placeholder", "Nome ou sigla...", 3, "size", "control"], ["label", "Inativos", "controlName", "inativos", 3, "size", "control"], ["title", "Sigla", "field", "sigla"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "C\u00F3digo", "field", "codigo"], [3, "title", "template"], ["columnCidade", ""], ["title", "Situa\u00E7\u00E3o", 3, "template"], ["columnSituacao", ""], ["type", "options", 3, "onEdit", "dynamicOptions"], [3, "rows"], [1, "my-2"], [3, "buttons"], [1, "d-block"], ["class", "badge bg-light text-dark", 4, "ngIf"], [1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-arrow-return-right"], [3, "color", "icon", "label"]], template: function UnidadeListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, UnidadeListComponent_h3_0_Template, 2, 1, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("select", function UnidadeListComponent_Template_grid_select_1_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, UnidadeListComponent_toolbar_2_Template, 1, 1, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "filter", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "input-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "input-switch", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, UnidadeListComponent_ng_template_12_Template, 3, 2, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](14, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](16, UnidadeListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](19, UnidadeListComponent_ng_template_19_Template, 1, 3, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](21, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](22, "pagination", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](13);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](17);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_UND_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_UND_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("dao", ctx.entidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 7)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.inativos);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", ctx.lex.noun("Cidade"))("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("onEdit", ctx.edit)("dynamicOptions", ctx.dynamicOptions.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__["FilterComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__["InputTextComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__["InputSwitchComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_13__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_14__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_15__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_16__["ToolbarComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_17__["BadgeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1bmlkYWRlLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


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
/* harmony import */ var _unidade_merge_unidade_merge_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./unidade-merge/unidade-merge.component */ "epKn");
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../uteis/uteis.module */ "hA/d");
/* harmony import */ var _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./unidade-integrante/unidade-integrante.component */ "JmwT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");










class UnidadeModule {
}
UnidadeModule.ɵfac = function UnidadeModule_Factory(t) { return new (t || UnidadeModule)(); };
UnidadeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: UnidadeModule });
UnidadeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_7__["UteisModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _unidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["UnidadeRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](UnidadeModule, { declarations: [_unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_2__["UnidadeFormComponent"],
        _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_3__["UnidadeListComponent"],
        _unidade_merge_unidade_merge_component__WEBPACK_IMPORTED_MODULE_6__["UnidadeMergeComponent"],
        _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_8__["UnidadeIntegranteComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_7__["UteisModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _unidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["UnidadeRoutingModule"]] }); })();


/***/ }),

/***/ "JmwT":
/*!**************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-integrante/unidade-integrante.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: UnidadeIntegranteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnidadeIntegranteComponent", function() { return UnidadeIntegranteComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ "Tlc2");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ "xp1S");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");















function UnidadeIntegranteComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "profile-picture", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("url", row_r8.usuario == null ? null : row_r8.usuario.url_foto)("size", 40)("hint", row_r8.usuario == null ? null : row_r8.usuario.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]((row_r8.usuario == null ? null : row_r8.usuario.nome) || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]((row_r8.usuario == null ? null : row_r8.usuario.apelido) || "");
} }
function UnidadeIntegranteComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "input-search", 12, 13);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("dao", ctx_r3.usuarioDao);
} }
function UnidadeIntegranteComponent_ng_template_8_badge_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "badge", 16);
} if (rf & 2) {
    const atribuicao_r13 = ctx.$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("color", ctx_r12.lookup.getColor(ctx_r12.lookup.UNIDADE_INTEGRANTE_TIPO, atribuicao_r13))("icon", ctx_r12.lookup.getIcon(ctx_r12.lookup.UNIDADE_INTEGRANTE_TIPO, atribuicao_r13))("label", ctx_r12.lookup.getValue(ctx_r12.lookup.UNIDADE_INTEGRANTE_TIPO, atribuicao_r13));
} }
function UnidadeIntegranteComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, UnidadeIntegranteComponent_ng_template_8_badge_1_Template, 1, 3, "badge", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", row_r11.atribuicoes);
} }
function UnidadeIntegranteComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "input-multiselect", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "input-select", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 8)("addItemHandle", ctx_r7.addItemHandleAtribuicoes.bind(ctx_r7));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("items", ctx_r7.lookup.UNIDADE_INTEGRANTE_TIPO);
} }
class UnidadeIntegranteComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.unidadeId = "";
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (["usuario_id", "atribuicoes"].includes(controlName) && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.integranteDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeIntegranteDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__["UsuarioDaoService"]);
        this.form = this.fh.FormBuilder({
            usuario_id: { default: "" },
            atribuicoes: { default: undefined },
            atribuicao: { default: "" }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        this.unidadeId = this.urlParams.get("idUnidade");
    }
    ngAfterViewInit() {
        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.loadData({}, this.form);
        }))();
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.grid.loading = true;
            try {
                let result = yield this.integranteDao.loadIntegrantes(this.unidadeId);
                this.items = result.integrantes;
                this.unidade = result.unidade;
            }
            finally {
                this.grid.loading = false;
            }
            this.cdRef.detectChanges();
        });
    }
    addIntegrante() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return {
                id: this.integranteDao.generateUuid(),
                usuario_id: "",
                atribuicoes: []
            };
        });
    }
    addItemHandleAtribuicoes() {
        let result = undefined;
        const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
        const key = this.form.controls.atribuicao.value;
        if ((value === null || value === void 0 ? void 0 : value.length) && this.util.validateLookupItem(this.form.controls.atribuicoes.value, key)) {
            const icon = this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
            const color = this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
            result = {
                key: key,
                value: value,
                icon: icon,
                color: color
            };
            this.form.controls.atribuicao.setValue("");
        }
        return result;
    }
    ;
    loadIntegrante(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.controls.usuario_id.setValue(row.usuario_id);
            form.controls.atribuicoes.setValue(row.atribuicoes.map((x) => Object.assign({}, {
                key: x,
                value: this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
                icon: this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
                color: this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, x)
            })));
            form.controls.atribuicao.setValue("");
        });
    }
    removeIntegrante(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let confirm = yield this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
            if (confirm) {
                this.loading = true;
                try {
                    yield this.integranteDao.saveIntegrante(this.unidade.id, Object.assign(row, { atribuicoes: [] }));
                    yield this.loadData({}, this.form);
                }
                finally {
                    this.loading = false;
                }
                return true;
            }
            else {
                return false;
            }
        });
    }
    saveIntegrante(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let consolidado = row;
            if (form.controls.atribuicoes.value.length) {
                consolidado.usuario_id = form.controls.usuario_id.value;
                consolidado.atribuicoes = form.controls.atribuicoes.value.map((x) => x.key);
                this.loading = true;
                try {
                    yield this.integranteDao.saveIntegrante(this.unidade.id, consolidado);
                    yield this.loadData({}, this.form);
                }
                finally {
                    this.loading = false;
                }
            }
            return undefined;
        });
    }
}
UnidadeIntegranteComponent.ɵfac = function UnidadeIntegranteComponent_Factory(t) { return new (t || UnidadeIntegranteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
UnidadeIntegranteComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: UnidadeIntegranteComponent, selectors: [["app-unidade-integrante"]], viewQuery: function UnidadeIntegranteComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 13, vars: 13, consts: [["editable", "", 3, "items", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], [3, "title", "template", "editTemplate"], ["columnUsuario", ""], ["editUsuario", ""], ["title", "Atribui\u00E7\u00F5es", "titleHint", "Atribui\u00E7\u00F5es do usu\u00E1rio nesta unidade", 3, "template", "editTemplate"], ["columnUnidadeDestino", ""], ["editUnidadeDestino", ""], ["type", "options"], [1, "row"], [1, "col-2"], [3, "url", "size", "hint"], [1, "col-10"], ["controlName", "usuario_id", 3, "size", "dao"], ["usuario", ""], [1, "text-wrap", "width-min-content"], [3, "color", "icon", "label", 4, "ngFor", "ngForOf"], [3, "color", "icon", "label"], ["controlName", "atribuicoes", 3, "size", "addItemHandle"], ["label", "", "icon", "fas fa-sign-out-alt", "controlName", "atribuicao", 3, "size", "items"]], template: function UnidadeIntegranteComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "column", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, UnidadeIntegranteComponent_ng_template_3_Template, 9, 5, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, UnidadeIntegranteComponent_ng_template_5_Template, 2, 2, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "column", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, UnidadeIntegranteComponent_ng_template_8_Template, 2, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, UnidadeIntegranteComponent_ng_template_10_Template, 2, 4, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](4);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](6);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](9);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("items", ctx.items)("minHeight", 500)("form", ctx.form)("hasDelete", true)("add", ctx.addIntegrante.bind(ctx))("load", ctx.loadIntegrante.bind(ctx))("remove", ctx.removeIntegrante.bind(ctx))("save", ctx.saveIntegrante.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("title", ctx.lex.noun("Usu\u00E1rio"))("template", _r0)("editTemplate", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r4)("editTemplate", _r6);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__["ColumnComponent"], _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_8__["ProfilePictureComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__["InputSearchComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__["BadgeComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_12__["InputMultiselectComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__["InputSelectComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1bmlkYWRlLWludGVncmFudGUuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "epKn":
/*!****************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-merge/unidade-merge.component.ts ***!
  \****************************************************************************************/
/*! exports provided: UnidadeMergeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnidadeMergeComponent", function() { return UnidadeMergeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ "UJzD");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");













const _c0 = ["unidadeOrigem"];
const _c1 = ["unidadeDestino"];
function UnidadeMergeComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"]((row_r8.unidade_origem == null ? null : row_r8.unidade_origem.nome) || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", (row_r8.unidade_origem == null ? null : row_r8.unidade_origem.codigo) || "", " - ", (row_r8.unidade_origem == null ? null : row_r8.unidade_origem.sigla) || "", "");
} }
const _c2 = function () { return ["inativo", "!=", null]; };
const _c3 = function (a0) { return [a0]; };
const _c4 = function () { return ["configuracoes", "unidade"]; };
const _c5 = function () { return { inativos: true }; };
const _c6 = function (a0) { return { filter: a0 }; };
const _c7 = function (a0, a1) { return { route: a0, params: a1 }; };
function UnidadeMergeComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "input-search", 12, 13);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("dao", ctx_r3.dao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](5, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c2)))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](11, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](7, _c4), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](9, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](8, _c5))));
} }
function UnidadeMergeComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"]((row_r11.unidade_destino == null ? null : row_r11.unidade_destino.nome) || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", (row_r11.unidade_destino == null ? null : row_r11.unidade_destino.codigo) || "", " - ", (row_r11.unidade_destino == null ? null : row_r11.unidade_destino.sigla) || "", "");
} }
const _c8 = function () { return ["inativo", "==", null]; };
const _c9 = function () { return { inativos: false }; };
function UnidadeMergeComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "input-search", 14, 15);
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("dao", ctx_r7.dao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](5, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c8)))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](11, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](7, _c4), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](9, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](8, _c9))));
} }
class UnidadeMergeComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.toolbarButtons = [
            {
                icon: "bi bi-yin-yang",
                label: "Mesma sigla",
                hint: "Unificar todos que tenham a mesma sigla. Sendo a inativa considerada como origem.",
                onClick: this.onMesmaSiglaClick.bind(this)
            }
        ];
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.dao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeDaoService"]);
        this.form = this.fh.FormBuilder({
            exclui_origem: { default: false },
            origem_inativo: { default: true },
            unidade_origem_id: { default: "" },
            unidade_destino_id: { default: "" }
        }, this.cdRef, this.validate);
    }
    onMesmaSiglaClick() {
        this.loading = true;
        this.dao.mesmaSigla().then(unidades => {
            let destinos = [];
            destinos = unidades.reduce((acumulador, valor) => {
                if (!valor.inativo && !acumulador.find(x => x.sigla == valor.sigla))
                    acumulador.push(valor);
                return acumulador;
            }, destinos);
            let destinosIds = destinos.map(x => x.id);
            let origens = unidades.filter(x => !destinosIds.includes(x.id) && !!x.inativo);
            let origensIds = origens.map(x => x.id);
            this.items = [];
            for (let origem of origens) {
                let destino = destinos.find(x => x.sigla == origem.sigla);
                if (destino) {
                    this.items.push({
                        id: this.dao.generateUuid(),
                        unidade_origem_id: origem.id,
                        unidade_destino_id: destino.id,
                        unidade_origem: origem,
                        unidade_destino: destino
                    });
                }
            }
            /* Pegas as unidade que tem a Sigla repetida mas que não estão inativas */
            let error = [];
            for (let unidade of unidades) {
                if (!destinosIds.includes(unidade.id) && !origensIds.includes(unidade.id))
                    error.push(unidade.codigo + " - " + unidade.sigla + " - " + unidade.nome);
            }
            if (error.length)
                this.editableForm.error = (error.length == 1 ? "A unidade abaixo possui duplicidade de SIGLA, mas não está inativa:" : "As unidades abaixo possuem duplicidade de SIGLA, mas não estão inativas:") + "\n" + error.join("\n");
        }).finally(() => {
            this.loading = false;
        });
    }
    addMerge() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return {
                id: this.dao.generateUuid(),
                unidade_origem_id: "",
                unidade_destino_id: "",
                unidade_origem: undefined,
                unidade_destino: undefined
            };
        });
    }
    loadMerge(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.controls.unidade_origem_id.setValue(row.unidade_origem_id);
            form.controls.unidade_destino_id.setValue(row.unidade_destino_id);
        });
    }
    removeMerge(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return true;
        });
    }
    saveMerge(form, row) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = undefined;
            if (((_a = this.form.controls.unidade_origem_id.value) === null || _a === void 0 ? void 0 : _a.length) || ((_b = this.form.controls.unidade_destino_id.value) === null || _b === void 0 ? void 0 : _b.length)) {
                row.unidade_origem_id = form.controls.unidade_origem_id.value;
                row.unidade_origem = ((_d = (_c = this.unidadeOrigem) === null || _c === void 0 ? void 0 : _c.selectedItem) === null || _d === void 0 ? void 0 : _d.entity) || (yield ((_e = this.dao) === null || _e === void 0 ? void 0 : _e.getById(row.unidade_origem_id)));
                row.unidade_destino_id = form.controls.unidade_destino_id.value;
                row.unidade_destino = ((_g = (_f = this.unidadeDestino) === null || _f === void 0 ? void 0 : _f.selectedItem) === null || _g === void 0 ? void 0 : _g.entity) || (yield ((_h = this.dao) === null || _h === void 0 ? void 0 : _h.getById(row.unidade_destino_id)));
                result = row;
            }
            return result;
        });
    }
    onMerge() {
        var _a, _b;
        let error = undefined;
        for (let row of this.items)
            error = error || (!((_a = row.unidade_origem_id) === null || _a === void 0 ? void 0 : _a.length) || !((_b = row.unidade_destino_id) === null || _b === void 0 ? void 0 : _b.length) ? "A origem e o destino precisam estar preenchidos em todos" : undefined);
        this.editableForm.error = error;
        if (!(error === null || error === void 0 ? void 0 : error.length)) {
            this.loading = true;
            this.dao.unificar(this.items.map(x => Object.assign({}, { unidade_origem_id: x.unidade_origem_id, unidade_destino_id: x.unidade_destino_id })), this.form.controls.exclui_origem.value).then(result => {
                if (result)
                    this.close();
            }).finally(() => {
                this.loading = false;
            });
        }
    }
}
UnidadeMergeComponent.ɵfac = function UnidadeMergeComponent_Factory(t) { return new (t || UnidadeMergeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
UnidadeMergeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: UnidadeMergeComponent, selectors: [["app-unidade-merge"]], viewQuery: function UnidadeMergeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.unidadeOrigem = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.unidadeDestino = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 17, vars: 16, consts: [["confirmLabel", "Unificar", 3, "form", "title", "submit", "cancel"], ["type", "warning", "message", "Por motivos de seguran\u00E7a ser\u00E1 permitido somente unificar unidades inativas para unidade ativas. E caso [Exclui origem] n\u00E3o esteja habilitado, a unidade de origem continuar\u00E1 na lista (como inativa)."], [3, "buttons"], ["labelPosition", "left", "label", "Exclui origem", "controlName", "exclui_origem", 3, "size"], ["editable", "", 3, "items", "form", "add", "load", "remove", "save"], ["titleHint", "Unidade que ser\u00E1 substitu\u00EDda pela outra", 3, "title", "template", "editTemplate"], ["columnUnidadeOrigem", ""], ["editUnidadeOrigem", ""], ["titleHint", "Unidade que sobrar\u00E1 ap\u00F3s a unifica\u00E7\u00E3o", 3, "title", "template", "editTemplate"], ["columnUnidadeDestino", ""], ["editUnidadeDestino", ""], ["type", "options"], ["controlName", "unidade_origem_id", 3, "size", "dao", "where", "selectRoute"], ["unidade_origem", ""], ["controlName", "unidade_destino_id", 3, "size", "dao", "where", "selectRoute"], ["unidade_destino", ""]], template: function UnidadeMergeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function UnidadeMergeComponent_Template_editable_form_submit_0_listener() { return ctx.onMerge(); })("cancel", function UnidadeMergeComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "top-alert", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "input-switch", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "grid", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, UnidadeMergeComponent_ng_template_7_Template, 5, 3, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, UnidadeMergeComponent_ng_template_9_Template, 2, 14, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, UnidadeMergeComponent_ng_template_12_Template, 5, 3, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, UnidadeMergeComponent_ng_template_14_Template, 2, 14, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](8);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](10);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](13);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.form)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("buttons", ctx.toolbarButtons);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("add", ctx.addMerge.bind(ctx))("load", ctx.loadMerge.bind(ctx))("remove", ctx.removeMerge.bind(ctx))("save", ctx.saveMerge.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", ctx.lex.noun("Unidade") + " origem")("template", _r0)("editTemplate", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", ctx.lex.noun("Unidade") + " destino")("template", _r4)("editTemplate", _r6);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_5__["TopAlertComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_6__["ToolbarComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_7__["InputSwitchComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_8__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__["ColumnComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__["InputSearchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1bmlkYWRlLW1lcmdlLmNvbXBvbmVudC5zY3NzIn0= */"] });


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
/* harmony import */ var _unidade_merge_unidade_merge_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./unidade-merge/unidade-merge.component */ "epKn");
/* harmony import */ var _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./unidade-integrante/unidade-integrante.component */ "JmwT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    { path: '', component: _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_4__["UnidadeListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Unidades" } },
    { path: ':id/subordinadas', component: _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_4__["UnidadeListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Unidades subordinadas" } },
    { path: 'new', component: _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_3__["UnidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_3__["UnidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_3__["UnidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: ':id/:idUnidade/integrante', component: _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_6__["UnidadeIntegranteComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Integrantes", modal: true } },
    { path: 'merge', component: _unidade_merge_unidade_merge_component__WEBPACK_IMPORTED_MODULE_5__["UnidadeMergeComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Unificar", modal: true } }
];
class UnidadeRoutingModule {
}
UnidadeRoutingModule.ɵfac = function UnidadeRoutingModule_Factory(t) { return new (t || UnidadeRoutingModule)(); };
UnidadeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: UnidadeRoutingModule });
UnidadeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](UnidadeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


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