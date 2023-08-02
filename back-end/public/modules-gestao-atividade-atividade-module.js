(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-gestao-atividade-atividade-module"],{

/***/ "1zD2":
/*!*************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form/atividade-form.component.ts ***!
  \*************************************************************************************/
/*! exports provided: AtividadeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeFormComponent", function() { return AtividadeFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ "+jod");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var src_app_models_comentario__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/comentario */ "nRIp");
/* harmony import */ var src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/atividade-tarefa.model */ "KY1u");
/* harmony import */ var src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/comentario.service */ "GCzM");
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ "LYCz");
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/models/documento.model */ "xrhv");
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ "RHdA");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-link/documentos-link.component */ "7WLf");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../atividade-list-tarefa/atividade-list-tarefa.component */ "sPM3");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios.component */ "KuoT");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ "imFN");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");

































const _c0 = ["etiqueta"];
const _c1 = ["tipoAtividade"];
const _c2 = ["planoTrabalho"];
const _c3 = ["unidade"];
const _c4 = ["usuario"];
const _c5 = ["comentarios"];
function AtividadeFormComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "input-datetime", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function AtividadeFormComponent_div_18_Template_input_datetime_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](); return ctx_r12.onDataDistribuicaoChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](2, "input-number", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](3, "input-datetime", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function AtividadeFormComponent_div_18_Template_input_datetime_change_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r13); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](); return ctx_r14.onPrazoEntregaChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("label", ctx_r5.lex.translate("Data de distribui\u00E7\u00E3o"))("control", ctx_r5.form.controls.data_distribuicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("decimals", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("label", ctx_r5.lex.translate("Prazo de entrega"))("control", ctx_r5.form.controls.prazo_entrega);
} }
function AtividadeFormComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "input-datetime", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function AtividadeFormComponent_ng_template_19_Template_input_datetime_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](); return ctx_r15.onDataDistribuicaoChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](2, "input-timer", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](3, "input-number", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "input-datetime", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function AtividadeFormComponent_ng_template_19_Template_input_datetime_change_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r16); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](); return ctx_r17.onPrazoEntregaChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 3)("label", ctx_r7.lex.translate("Data de distribui\u00E7\u00E3o"))("control", ctx_r7.form.controls.data_distribuicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 3)("label", ctx_r7.lex.translate("Esfor\u00E7o"))("control", ctx_r7.form.controls.esforco);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 3)("decimals", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 3)("label", ctx_r7.lex.translate("Prazo de entrega"))("control", ctx_r7.form.controls.prazo_entrega);
} }
function AtividadeFormComponent_separator_21_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-datetime", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](2, "input-datetime", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](3, "input-datetime", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("control", ctx_r18.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("control", ctx_r18.form.controls.data_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("control", ctx_r18.form.controls.data_inicio);
} }
function AtividadeFormComponent_separator_21_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-datetime", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](2, "input-datetime", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](3, "input-timer", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](4, "input-datetime", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("control", ctx_r20.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("control", ctx_r20.form.controls.data_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("control", ctx_r20.form.controls.tempo_despendido);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("control", ctx_r20.form.controls.data_inicio);
} }
function AtividadeFormComponent_separator_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "separator", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, AtividadeFormComponent_separator_21_div_1_Template, 4, 6, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](2, AtividadeFormComponent_separator_21_ng_template_2_Template, 5, 8, "ng-template", null, 49, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](4, "documento-link", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](3);
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", !(_r3 == null ? null : _r3.selectedItem == null ? null : _r3.selectedItem.data == null ? null : _r3.selectedItem.data.tipo_modalidade == null ? null : _r3.selectedItem.data.tipo_modalidade.atividade_tempo_despendido))("ngIfElse", _r19);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("documento", ctx_r8.form.controls.documento_entrega.value);
} }
class AtividadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"], src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__["AtividadeDaoService"]);
        this.injector = injector;
        this.etiquetas = [];
        this.checklist = [];
        this.planosTrabalhos = [];
        this.planoTrabalhoJoin = ["entregas.entrega:id,nome", "tipo_modalidade:id,nome"];
        this.planoTrabalhoSelecionado = null;
        this.usuarioJoin = ['planos_trabalho.entregas.entrega:id,nome', 'planos_trabalho.tipo_modalidade:id,nome'];
        this.entregas = [];
        /*public get prazoEmDias(): string | undefined {
          const unidade = this.unidade?.searchObj as Unidade || this.auth.unidade!;
          return ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(unidade?.distribuicao_forma_contagem_prazos) ? "true" : undefined;
        }
      
        public get prazoEmHoras(): string | undefined {
          const unidade = this.unidade?.searchObj as Unidade || this.auth.unidade!;
          return ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(unidade?.distribuicao_forma_contagem_prazos) ? undefined : "true";
        }*/
        this.validateChecklist = (control, controlName) => {
            let result = null;
            return result;
        };
        this.validate = (control, controlName) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            let result = null;
            if (["unidade_id", "descricao"].includes(controlName) && !((_a = control === null || control === void 0 ? void 0 : control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            else if (controlName == "tipo_atividade_id" && !((_b = control === null || control === void 0 ? void 0 : control.value) === null || _b === void 0 ? void 0 : _b.length) && !this.auth.hasPermissionTo("MOD_ATV_TIPO_ATV_VAZIO")) {
                result = "Obrigatório";
            }
            else if (["data_distribuicao", "prazo_entrega"].includes(controlName)) {
                let prazoEntrega = (_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.prazo_entrega) === null || _d === void 0 ? void 0 : _d.value;
                let dataDistribuicao = (_f = (_e = this.form) === null || _e === void 0 ? void 0 : _e.controls.data_distribuicao) === null || _f === void 0 ? void 0 : _f.value;
                if (!this.util.isDataValid(control.value)) {
                    result = "Data inválida";
                }
                else if (controlName == "data_distribuicao" && control.value && this.util.isDataValid(prazoEntrega) && control.value.getTime() > prazoEntrega.getTime()) {
                    result = "Maior que entrega";
                }
                else if (controlName == "prazo_entrega" && control.value && this.util.isDataValid(dataDistribuicao) && control.value.getTime() < dataDistribuicao.getTime()) {
                    result = "Menor que distribuição";
                }
            }
            else if (controlName == "plano_trabalho_id" && !((_g = control.value) === null || _g === void 0 ? void 0 : _g.length) && ((_k = (_j = (_h = this.form) === null || _h === void 0 ? void 0 : _h.controls) === null || _j === void 0 ? void 0 : _j.usuario_id.value) === null || _k === void 0 ? void 0 : _k.length)) {
                result = "Obrigatório";
            }
            else if (controlName == "plano_trabalho_entrega_id") {
                if (((_o = (_m = (_l = this.form) === null || _l === void 0 ? void 0 : _l.controls) === null || _m === void 0 ? void 0 : _m.plano_trabalho_id.value) === null || _o === void 0 ? void 0 : _o.length) && !((_p = control.value) === null || _p === void 0 ? void 0 : _p.length)) {
                    result = "Obrigatório";
                }
                else if (((_q = control.value) === null || _q === void 0 ? void 0 : _q.length) && !this.entregas.find(x => x.key == control.value)) {
                    result = "Selecione";
                }
            }
            return result;
        };
        this.formValidation = (form) => {
            let result = undefined;
            //if(!this.isComentarios) {
            this.loadEtiquetas();
            this.loadChecklist();
            const etiquetasKeys = this.etiquetas.map(x => x.key);
            const checklistKeys = this.checklist.map(x => x.key);
            const etiqueta = (this.form.controls.etiquetas.value || []).find((x) => !etiquetasKeys.includes(x.key));
            const checklst = (this.form.controls.checklist.value || []).find((x) => !etiquetasKeys.includes(x.id) && x.checked);
            if (etiqueta)
                result = "Etiqueta " + etiqueta.value + "não pode ser utilizada!";
            if (checklst)
                result = "Checklist " + checklst.texto + "não pode ser utilizado!";
            /* Validações pelo plano *
            if(this.form.controls.plano_id.value?.length) {
              /* Verifica se a atividade seleciona está na lista de atividades permitidas no plano de trabalho *
              if(this.form.controls.atividade_id.value?.length && !this.auth.hasPermissionTo('MOD_DMD_TIPO_ATV_FORA_PL_TRB')) {
                const atividades_termo_adesao = this.planoSelecionado?.documento?.metadados?.atividades_termo_adesao;
                const atividade = this.atividade!.searchObj as Atividade;
                if(!this.planoSelecionado || this.planoSelecionado?.id != this.form.controls.plano_id.value) {
                  result = "Erro ao ler " + this.lex.translate("plano de trabalho") + ". Selecione-o novamente!";
                } else if(atividades_termo_adesao && atividade && atividades_termo_adesao.indexOf(this.util.removeAcentos(atividade.nome.toLowerCase())) < 0){
                  result = this.lex.translate("Atividade") + " não consta na lista permitida pelo " + this.lex.translate("plano de trabalho") + " selecionado.";
                }
              }
            }*/
            //}
            return result;
        };
        const horaInicial = this.auth.hora;
        this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_11__["TipoAtividadeDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__["UnidadeDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__["UsuarioDaoService"]);
        this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_13__["PlanoTrabalhoDaoService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_7__["CalendarService"]);
        this.comentario = injector.get(src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_10__["ComentarioService"]);
        this.form = this.fh.FormBuilder({
            numero: { default: 0 },
            descricao: { default: "" },
            data_distribuicao: { default: horaInicial },
            carga_horaria: { default: 0 },
            tempo_planejado: { default: 0 },
            prazo_entrega: { default: horaInicial },
            data_inicio: { default: null },
            data_entrega: { default: null },
            esforco: { default: 0 },
            tempo_despendido: { default: 0 },
            data_arquivamento: { default: null },
            etiquetas: { default: [] },
            checklist: { default: [] },
            prioridade: { default: 0 },
            progresso: { default: 0 },
            plano_trabalho_id: { default: null },
            plano_trabalho_entrega_id: { default: null },
            tipo_atividade_id: { default: null },
            demandante_id: { default: "" },
            usuario_id: { default: null },
            unidade_id: { default: "" },
            documento_requisicao_id: { default: null },
            documento_entrega_id: { default: null },
            comentarios: { default: [] },
            pausas: { default: [] },
            etiqueta: { default: "" },
            tarefas: { default: [] },
            documento_requisicao: { default: new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_12__["Documento"]() },
            documento_entrega: { default: new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_12__["Documento"]() }
        }, this.cdRef, this.validate);
        this.formChecklist = this.fh.FormBuilder({
            id: { default: "" },
            texto: { default: "" },
            checked: { default: false }
        }, this.cdRef, this.validateChecklist);
        this.join = ["usuario.planos_entrega.entregas.entrega:id,nome", "usuario.planos_entrega.tipo_modalidade:id,nome", "pausas", "tipo_atividade", "unidade", "comentarios.usuario", "tarefas.tipo_tarefa", "tarefas.comentarios.usuario", "documento_requisicao", "documento_entrega"];
    }
    ngOnInit() {
        var _a;
        super.ngOnInit();
        const segment = (this.url ? (_a = this.url[this.url.length - 1]) === null || _a === void 0 ? void 0 : _a.path : "") || "";
        this.action = ["comentar", "clonar"].includes(segment) ? segment : this.action;
    }
    get isClonar() {
        return this.action == "clonar";
    }
    get titleAtividade() {
        var _a, _b, _c, _d;
        return ((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.numero) === null || _b === void 0 ? void 0 : _b.value) ? "#" + ((_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.numero) === null || _d === void 0 ? void 0 : _d.value) : "";
    }
    addItemHandleEtiquetas() {
        var _a;
        let result = undefined;
        if (this.etiqueta && this.etiqueta.selectedItem) {
            const item = this.etiqueta.selectedItem;
            const key = ((_a = item.key) === null || _a === void 0 ? void 0 : _a.length) ? item.key : this.util.textHash(item.value);
            if (this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
                result = {
                    key: key,
                    value: item.value,
                    color: item.color,
                    icon: item.icon
                };
                this.form.controls.etiqueta.setValue("");
            }
        }
        return result;
    }
    ;
    /*private calcularPrazo(source: "PACTUADO" | "COMPLEXIDADE" | "PLANO" | "PLANEJADO" | "ENTREGA") {
      if(this.action != "consult"){
        const atividade = this.atividade?.searchObj as Atividade;
        const plano = (this.plano?.selectedItem?.data || this.planos.find(x => x.key == this.plano?.selectedItem?.key)?.data) as Plano;
        if(source == "PACTUADO") {
          const fator = this.form.controls.fator_complexidade.value || 1;
          const fator_ganho_produtivade = 1 - ((plano?.ganho_produtividade || 0) / 100);
          this.form.controls.tempo_pactuado.setValue((atividade?.tempo_pactuado || 0) * fator * fator_ganho_produtivade || 0);
          this.cdRef.detectChanges();
        } else if(this.deltaChanged()) {
          const unidade = this.unidade?.searchObj as Unidade;
          const fator = this.form.controls.fator_complexidade.value || 1;
          const cargaHoraria = plano?.carga_horaria || this.calendar.expedienteMedio(unidade);
          this.assignDelta(null);
          if(source == "COMPLEXIDADE") {
            if(atividade) this.setControlPreventChange("tempo_planejado", atividade.dias_planejado * cargaHoraria * fator || 0);
            const entrega = this.calendar.prazo(this.form.controls.data_distribuicao.value, this.form.controls.tempo_planejado.value, cargaHoraria, unidade, "DISTRIBUICAO");
            this.setControlPreventChange("prazo_entrega", entrega);
          } else if(source == "PLANO") {
            if(this.planejado) this.planejado.hoursPerDay = cargaHoraria;
            this.form.controls.carga_horaria.setValue(cargaHoraria);
            const tempo = this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.prazo_entrega.value, cargaHoraria, unidade, "DISTRIBUICAO");
            this.setControlPreventChange("tempo_planejado", tempo);
          } else if(source == "PLANEJADO") {
            const entrega = this.calendar.prazo(this.form.controls.data_distribuicao.value, this.form.controls.tempo_planejado.value, cargaHoraria, unidade, "DISTRIBUICAO");
            this.setControlPreventChange("prazo_entrega", entrega);
          } else if(source == "ENTREGA") {
            const tempo = this.form.controls.prazo_entrega.value ? this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.prazo_entrega.value, cargaHoraria, unidade, "DISTRIBUICAO") : 0;
            this.setControlPreventChange("tempo_planejado", tempo);
          }
          this.cdRef.detectChanges();
        }
      }
    }*/
    onUnidadeChange(event) {
        this.loadEtiquetas();
    }
    onDataDistribuicaoChange(event) {
        var _a, _b, _c;
        this.loadUsuario((_b = (_a = this.usuario) === null || _a === void 0 ? void 0 : _a.selectedItem) === null || _b === void 0 ? void 0 : _b.entity); /* Atualiza a lista de planos de trabalho válidos no período */
        (_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.prazo_entrega.updateValueAndValidity();
    }
    onPrazoEntregaChange(event) {
        var _a;
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.data_distribuicao.updateValueAndValidity();
    }
    onPlanoTrabalhoChange(event) {
        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            if (this.entity) {
                const planoTrabalho = (_c = (_b = (_a = this.usuario) === null || _a === void 0 ? void 0 : _a.searchObj) === null || _b === void 0 ? void 0 : _b.planos_trabalho) === null || _c === void 0 ? void 0 : _c.find(x => x.id == this.form.controls.plano_trabalho_id.value);
                const planoTrabalhoEntregaId = this.form.controls.plano_trabalho_entrega_id.value;
                if (planoTrabalho) {
                    if (((_d = this.planoTrabalhoSelecionado) === null || _d === void 0 ? void 0 : _d.id) != planoTrabalho.id) {
                        this.planoTrabalhoSelecionado = yield this.planoTrabalhoDao.getById(planoTrabalho.id, this.planoTrabalhoJoin);
                    }
                    if (this.form.controls.unidade_id.value != planoTrabalho.unidade_id) {
                        const unidade = yield this.unidadeDao.getById(planoTrabalho.unidade_id);
                        if (unidade) {
                            yield ((_e = this.unidade) === null || _e === void 0 ? void 0 : _e.loadSearch(unidade));
                            yield this.auth.selecionaUnidade(unidade.id);
                        }
                    }
                    this.entregas = ((_f = planoTrabalho.entregas) === null || _f === void 0 ? void 0 : _f.map(x => Object.assign({}, {
                        key: x.id,
                        value: x.descricao + (x.entrega ? " (" + x.entrega.nome + ")" : ""),
                        data: x
                    }))) || [];
                    this.cdRef.detectChanges();
                    this.form.controls.plano_trabalho_entrega_id.setValue(!(planoTrabalhoEntregaId === null || planoTrabalhoEntregaId === void 0 ? void 0 : planoTrabalhoEntregaId.length) && this.entregas.length > 0 ? this.entregas[0].key : planoTrabalhoEntregaId);
                }
                else {
                    this.entregas = [];
                    this.form.controls.plano_trabalho_entrega_id.setValue(null);
                }
            }
        }))();
    }
    loadEtiquetas() {
        var _a, _b;
        const unidade = (_a = this.unidade) === null || _a === void 0 ? void 0 : _a.searchObj;
        const tipoAtividade = (_b = this.tipoAtividade) === null || _b === void 0 ? void 0 : _b.searchObj;
        this.etiquetas = this.util.merge(tipoAtividade === null || tipoAtividade === void 0 ? void 0 : tipoAtividade.etiquetas, unidade === null || unidade === void 0 ? void 0 : unidade.etiquetas, (a, b) => a.key == b.key);
    }
    loadChecklist() {
        var _a;
        const tipoAtividade = (_a = this.tipoAtividade) === null || _a === void 0 ? void 0 : _a.searchObj;
        this.checklist = (tipoAtividade === null || tipoAtividade === void 0 ? void 0 : tipoAtividade.checklist) || [];
        let checks = this.util.merge(this.checklist.map(a => {
            return {
                id: a.key,
                texto: a.value,
                checked: false
            };
        }), (this.form.controls.checklist.value || []).filter((b) => b.checked), (a, b) => {
            if (a.id == b.id) {
                a.checked = b.checked;
                return true;
            }
            else {
                return false;
            }
        });
        this.form.controls.checklist.setValue(checks);
    }
    loadTipoAtividade(tipoAtividade) {
        if (tipoAtividade) {
            this.loadEtiquetas();
            this.loadChecklist();
        }
        else {
            this.etiquetas = [];
            this.form.controls.esforco.setValue(0);
            this.form.controls.tempo_planejado.setValue(0);
        }
        this.cdRef.detectChanges();
    }
    getPlanosTrabalhos(usuario, data_distribuicao, plano_trabalho_id) {
        var _a;
        return ((_a = usuario.planos_trabalho) === null || _a === void 0 ? void 0 : _a.filter(x => x.id == plano_trabalho_id || (this.util.between(data_distribuicao, { start: x.data_inicio_vigencia, end: x.data_fim_vigencia }))).map(x => {
            var _a;
            return Object.assign({
                key: x.id,
                value: (((_a = x.tipo_modalidade) === null || _a === void 0 ? void 0 : _a.nome) || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio_vigencia) + " a " + this.usuarioDao.getDateFormatted(x.data_fim_vigencia),
                data: x
            });
        })) || [];
    }
    loadUsuario(usuario) {
        if (usuario) {
            const planoTrabalhoId = this.form.controls.plano_trabalho_id.value;
            const dataDistribuicao = this.form.controls.data_distribuicao.value || new Date();
            this.planosTrabalhos = this.getPlanosTrabalhos(usuario, dataDistribuicao, planoTrabalhoId); //usuario?.planos?.map(x => Object.assign({key: x.id, value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio_vigencia)+ " a " + this.usuarioDao.getDateFormatted(x.data_fim_vigencia), data: x})) || [];
            this.cdRef.detectChanges();
            this.form.controls.plano_trabalho_id.setValue(!(planoTrabalhoId === null || planoTrabalhoId === void 0 ? void 0 : planoTrabalhoId.length) && this.planosTrabalhos.length > 0 ? this.planosTrabalhos[0].key : planoTrabalhoId);
        }
        else {
            this.planosTrabalhos = [];
            this.form.controls.plano_trabalho_id.setValue(null);
        }
        this.cdRef.detectChanges();
    }
    onTipoAtividadeSelect(item) {
        const tipoAtividade = item.entity;
        this.loadTipoAtividade(tipoAtividade);
        this.comentarioAtividade(tipoAtividade);
    }
    comentarioAtividade(tipoAtividade) {
        var _a;
        const comentarios = this.form.controls.comentarios.value || [];
        const index = comentarios.findIndex(x => x.tipo == "TIPO_ATIVIDADE");
        if (index >= 0) {
            if (comentarios[index]._status == "ADD") {
                comentarios.splice(index, 1);
            }
            else {
                comentarios[index]._status == "DELETE";
            }
        }
        if ((_a = tipoAtividade === null || tipoAtividade === void 0 ? void 0 : tipoAtividade.comentario) === null || _a === void 0 ? void 0 : _a.length) {
            const comentario = new src_app_models_comentario__WEBPACK_IMPORTED_MODULE_8__["Comentario"]();
            comentario.id = this.dao.generateUuid();
            comentario.path = "";
            comentario.texto = tipoAtividade.comentario;
            comentario.data_hora = this.auth.hora;
            comentario.usuario_id = this.auth.usuario.id;
            comentario.comentario_id = null;
            comentario.tipo = "TIPO_ATIVIDADE";
            comentario.usuario = this.auth.usuario;
            comentario._status = "ADD";
            comentarios.push(comentario);
            this.form.controls.comentarios.setValue(this.comentario.orderComentarios(comentarios));
            this.cdRef.detectChanges();
        }
    }
    onTipoAtividadeChange(event) {
        var _a, _b;
        if (!((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.tipo_atividade_id.value) === null || _b === void 0 ? void 0 : _b.length))
            this.loadTipoAtividade(undefined);
    }
    onUsuarioSelect(item) {
        const usuario = item.entity;
        this.loadUsuario(usuario);
    }
    onUsuarioChange(event) {
        var _a, _b;
        if (!((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.usuario_id.value) === null || _b === void 0 ? void 0 : _b.length))
            this.loadUsuario(undefined);
    }
    /*public addComentario = async () => {
      this.comentario.newComentario(this.form.controls.comentarios, this.comentarios!);
      return undefined;
    }*/
    orderPausas(pausas) {
        return pausas.sort((a, b) => {
            return a.data_inicio < b.data_inicio ? -1 : 1;
        });
    }
    /*public comentarioDynamicOptions(row: any): ToolbarButton[] {
      return [{
        label: "Comentar",
        icon: "bi bi-chat-left-quote",
        onClick: (comentario: Comentario) => {
          this.comentario.newComentario(this.form.controls.comentarios, this.comentarios!, comentario);
        }
      }];
    }*/
    /*public async saveComentario(form: FormGroup, item: any) {
      const entity = form.value;
      Object.assign(this.comentarios!.editing!, entity);
      return undefined;
    }*/
    /*public async loadComentario(form: FormGroup, row: any) {
      this.formComentarios.controls.texto.setValue(row.texto);
      this.formComentarios.controls.tipo.setValue(row.tipo);
      this.formComentarios.controls.privacidade.setValue(row.privacidade);
    }*/
    loadData(entity, form) {
        var _a, _b, _c;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            this.planoTrabalhoSelecionado = entity.plano_trabalho;
            yield Promise.all([
                (_a = this.unidade) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.unidade || formValue.unidade_id, false),
                (_b = this.usuario) === null || _b === void 0 ? void 0 : _b.loadSearch(entity.usuario || formValue.usuario_id, false),
                (_c = this.tipoAtividade) === null || _c === void 0 ? void 0 : _c.loadSearch(entity.tipo_atividade || formValue.tipo_atividade_id, false)
            ]);
            form.patchValue(formValue, { emitEvent: false }); /* Carrega valores iniciais no form e previne que o plano_id seja sobrescrito */
            if (entity.usuario)
                this.loadUsuario(entity.usuario);
            if (entity.tipo_atividade)
                this.loadTipoAtividade(entity.tipo_atividade);
            if (entity.unidade_id != this.auth.unidade.id)
                yield this.auth.selecionaUnidade(entity.unidade_id);
            entity.comentarios = this.comentario.orderComentarios(entity.comentarios || []);
            entity.pausas = this.orderPausas(entity.pausas || []);
            form.patchValue(formValue); /* Carrega os valores e dispara os eventos */
            this.loadEtiquetas();
        });
    }
    initializeData(form) {
        var _a, _b, _c, _d;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.isClonar) {
                const source = (yield this.dao.getAtividade(this.urlParams.get("id")));
                this.entity = new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"]();
                Object.assign(this.entity, {
                    tipo_atividade: source.tipo_atividade,
                    unidade: source.unidade,
                    usuario: source.usuario,
                    plano_trabalho: source.plano_trabalho,
                    descricao: source.descricao,
                    data_distribuicao: source.data_distribuicao,
                    tempo_planejado: source.tempo_planejado,
                    carga_horaria: source.carga_horaria,
                    prazo_entrega: source.prazo_entrega,
                    esforco: source.esforco,
                    tipo_atividade_id: source.tipo_atividade_id,
                    demandante_id: (_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id,
                    usuario_id: source.usuario_id,
                    unidade_id: source.unidade_id,
                    plano_trabalho_id: source.plano_trabalho_id,
                    etiquetas: source.etiquetas,
                    checklist: source.checklist,
                    plano_trabalho_entrega_id: source.plano_trabalho_entrega_id,
                    progresso: source.progresso,
                    tarefas: (source.tarefas || []).map((tarefa) => new src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_9__["AtividadeTarefa"](Object.assign({}, tarefa, {
                        id: this.dao.generateUuid(),
                        comentarios: [],
                        _status: "ADD"
                    }))),
                    documento_requisicao: !source.documento_requisicao ? undefined : Object.assign({}, new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_12__["Documento"](Object.assign({}, source.documento_requisicao, {
                        id: this.dao.generateUuid(),
                        _status: "ADD"
                    }))),
                    documento_entrega: !source.documento_entrega ? undefined : Object.assign({}, new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_12__["Documento"](Object.assign({}, source.documento_entrega, {
                        id: this.dao.generateUuid(),
                        _status: "ADD"
                    })))
                });
            }
            else {
                this.sei = (_b = this.metadata) === null || _b === void 0 ? void 0 : _b.sei;
                this.entity = new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"]();
                this.entity.data_distribuicao = this.auth.hora;
                this.entity.prazo_entrega = this.entity.data_distribuicao;
                this.entity.demandante_id = ((_c = this.auth.usuario) === null || _c === void 0 ? void 0 : _c.id) || "";
                this.entity.unidade_id = ((_d = this.auth.unidade) === null || _d === void 0 ? void 0 : _d.id) || "";
                this.entity.unidade = this.auth.unidade;
                /* Verificar isso (TODO)
                if(this.queryParams?.numero_requisicao?.length) {
                  this.entity.numero_requisicao = this.queryParams?.numero_requisicao;
                } else if(this.queryParams?.numero_processo?.length) {
                  this.entity.numero_processo = this.queryParams?.numero_processo;
                }*/
            }
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a;
            let atividade = this.util.fill(new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"](), this.entity);
            (_a = this.comentarios) === null || _a === void 0 ? void 0 : _a.confirm();
            atividade = this.util.fillForm(atividade, this.form.value);
            atividade.comentarios = atividade.comentarios.filter((x) => { var _a; return ["ADD", "EDIT", "DELETE"].includes(x._status || "") && ((_a = x.texto) === null || _a === void 0 ? void 0 : _a.length); });
            atividade.tarefas = atividade.tarefas.filter((tarefa) => {
                tarefa.comentarios = tarefa.comentarios.filter((x) => { var _a; return ["ADD", "EDIT", "DELETE"].includes(x._status || "") && ((_a = x.texto) === null || _a === void 0 ? void 0 : _a.length); });
                return ["ADD", "EDIT", "DELETE"].includes(tarefa._status || "");
            });
            resolve(atividade);
        });
    }
}
AtividadeFormComponent.ɵfac = function AtividadeFormComponent_Factory(t) { return new (t || AtividadeFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["Injector"])); };
AtividadeFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({ type: AtividadeFormComponent, selectors: [["app-atividade-form"]], viewQuery: function AtividadeFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_c5, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.tipoAtividade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.planoTrabalho = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.comentarios = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵInheritDefinitionFeature"]], decls: 53, vars: 55, consts: [[3, "form", "disabled", "submit", "cancel"], ["display", "", "right", "", 3, "title"], ["key", "ATIVIDADE", "label", "Atividade"], [3, "sei", "documento"], [1, "row"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", 3, "size", "rows", "control"], ["controlName", "unidade_id", 3, "label", "size", "dao", "change"], ["unidade", ""], ["controlName", "tipo_atividade_id", 3, "label", "emptyValue", "size", "dao", "labelInfo", "select", "change"], ["tipoAtividade", ""], ["label", "Respons\u00E1vel", "controlName", "usuario_id", "labelInfo", "Respons\u00E1vel pela execu\u00E7\u00E3o", 3, "size", "emptyValue", "dao", "join", "select", "change"], ["usuario", ""], ["controlName", "plano_trabalho_id", 3, "label", "size", "control", "items", "labelInfo", "change"], ["planoTrabalho", ""], ["controlName", "plano_trabalho_entrega_id", 3, "label", "size", "control", "items", "labelInfo"], ["entrega", ""], ["class", "row", 4, "ngIf", "ngIfElse"], ["comEsforco", ""], ["title", "Conclus\u00E3o", 4, "ngIf"], ["key", "TAREFAS", 3, "label"], [3, "control", "atividade", "disabled"], ["key", "CARACTERIZACAO", "label", "Caracteriza\u00E7\u00E3o"], ["label", "Etiquetas", "controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["controlName", "etiqueta", 3, "size", "control", "items"], ["etiqueta", ""], [1, "col-md-4"], ["editable", "", 3, "control", "form", "hasAdd", "hasDelete"], ["type", "switch", "title", "Check", "field", "checked"], ["type", "display", "title", "Texto", "field", "texto", 3, "editable"], ["type", "options"], ["key", "COMENTARIOS", "label", "Coment\u00E1rios"], ["clss", "row"], ["origem", "ATIVIDADE", 3, "control"], ["comentarios", ""], ["key", "COMPLEMENTARES", "label", "Complementares"], ["label", "Demandante", "controlName", "demandante_id", "disabled", "", 3, "size", "dao"], [1, "card", "col-md-4", "mt-4"], [1, "card-header"], [1, "bi", "bi-pause-circle"], [1, "card-body"], ["disabled", "", 3, "control", "hasEdit", "hasDelete", "minHeight"], ["pausas", ""], ["title", "In\u00EDcio", "type", "datetime", "field", "data_inicio"], ["title", "Fim", "type", "datetime", "field", "data_fim"], ["noIcon", "", "controlName", "data_distribuicao", "labelInfo", "Data de inclus\u00E3o/distribui\u00E7\u00E3o/lan\u00E7amento", 3, "size", "label", "control", "change"], ["label", "Progresso", "disabled", "", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso de execu\u00E7\u00E3o (% Conclu\u00EDdo)", 3, "size", "decimals"], ["noIcon", "", "controlName", "prazo_entrega", "labelInfo", "Data estipulada para entrega da atividade", 3, "size", "label", "control", "change"], ["icon", "bi bi-stopwatch", "onlyHours", "", "controlName", "esforco", "labelInfo", "Tempo estimado de execu\u00E7\u00E3o", 3, "size", "label", "control"], ["title", "Conclus\u00E3o"], ["comTempoDespendido", ""], [3, "documento"], ["noIcon", "", "label", "Inicio", "controlName", "data_inicio", "disabled", "", "labelInfo", "Data em que o usu\u00E1rio iniciou a atividade", 3, "size", "control"], ["noIcon", "", "label", "Conclus\u00E3o", "controlName", "data_entrega", "disabled", "", "labelInfo", "Data da conclus\u00E3o da atividade", 3, "size", "control"], ["label", "Data de arquivamento", "controlName", "data_arquivamento", "disabled", "", "labelInfo", "Data de arquivamento da atividade", 3, "size", "control"], ["label", "Tempo despendido", "icon", "bi bi-hourglass-bottom", "controlName", "tempo_despendido", "disabled", "", "labelInfo", "Calculado no fim da atividade, sendo o tempo l\u00EDquido (considerando pausas)", 3, "size", "control"]], template: function AtividadeFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("submit", function AtividadeFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function AtividadeFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](3, "documento-link", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](5, "input-textarea", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](7, "input-search", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function AtividadeFormComponent_Template_input_search_change_7_listener($event) { return ctx.onUnidadeChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](9, "input-search", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("select", function AtividadeFormComponent_Template_input_search_select_9_listener($event) { return ctx.onTipoAtividadeSelect($event); })("change", function AtividadeFormComponent_Template_input_search_change_9_listener($event) { return ctx.onTipoAtividadeChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](12, "input-search", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("select", function AtividadeFormComponent_Template_input_search_select_12_listener($event) { return ctx.onUsuarioSelect($event); })("change", function AtividadeFormComponent_Template_input_search_change_12_listener($event) { return ctx.onUsuarioChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](14, "input-select", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function AtividadeFormComponent_Template_input_select_change_14_listener($event) { return ctx.onPlanoTrabalhoChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](16, "input-select", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](18, AtividadeFormComponent_div_18_Template, 4, 8, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](19, AtividadeFormComponent_ng_template_19_Template, 5, 11, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](21, AtividadeFormComponent_separator_21_Template, 5, 3, "separator", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](22, "tab", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](23, "atividade-list-tarefa", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](24, "tab", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](25, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](26, "input-multiselect", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](27, "input-select", 23, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](29, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](30, "grid", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](31, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](32, "column", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](33, "column", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](34, "column", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](35, "tab", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](36, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](37, "comentarios", 32, 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](39, "tab", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](40, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](41, "input-search", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](42, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](43, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](44, "h5", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](45, "i", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](46, " Suspens\u00F5es/Pausas ");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](47, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](48, "grid", 40, 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](50, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](51, "column", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](52, "column", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](15);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("title", ctx.titleAtividade);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("sei", ctx.sei)("documento", ctx.form.controls.documento_requisicao.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx.form.controls.descricao);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("label", ctx.lex.translate("Unidade"))("size", 6)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de atividade"))("emptyValue", null)("size", 6)("dao", ctx.tipoAtividadeDao)("labelInfo", ctx.lex.translate("Tipo de atividade") + " utilizado para classificar a atividade");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 4)("emptyValue", null)("dao", ctx.usuarioDao)("join", ctx.usuarioJoin);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("label", ctx.lex.translate("Plano de trabalho"))("size", 4)("control", ctx.form.controls.plano_trabalho_id)("items", ctx.planosTrabalhos)("labelInfo", ctx.lex.translate("Plano de trabalho"));
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("label", ctx.lex.translate("Entrega") + ctx.lex.translate("plano de trabalho"))("size", 4)("control", ctx.form.controls.plano_trabalho_entrega_id)("items", ctx.entregas)("labelInfo", ctx.lex.translate("Entrega") + ctx.lex.translate("plano de trabalho") + " que a " + ctx.lex.translate("atividade") + " \u00E9 referente");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", !(_r3 == null ? null : _r3.selectedItem == null ? null : _r3.selectedItem.data == null ? null : _r3.selectedItem.data.tipo_modalidade == null ? null : _r3.selectedItem.data.tipo_modalidade.atividade_esforco))("ngIfElse", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.form.controls.data_entrega.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("label", ctx.lex.translate("Tarefa") + " " + ctx.lex.translate("atividade"));
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("control", ctx.form.controls.tarefas)("atividade", ctx.entity)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.etiquetas)("addItemHandle", ctx.addItemHandleEtiquetas.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.etiqueta)("items", ctx.etiquetas);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("control", ctx.form.controls.checklist)("form", ctx.formChecklist)("hasAdd", false)("hasDelete", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("editable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("control", ctx.form.controls.comentarios);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 12)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("control", ctx.form.controls.pausas)("hasEdit", false)("hasDelete", false)("minHeight", 0);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_15__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_16__["TabComponent"], _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_17__["DocumentosLinkComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_18__["InputTextareaComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_19__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_20__["InputSelectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_21__["NgIf"], _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_22__["AtividadeListTarefaComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_23__["InputMultiselectComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_24__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_25__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_26__["ColumnComponent"], _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_27__["ComentariosComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_28__["InputDatetimeComponent"], _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_29__["InputNumberComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_30__["InputTimerComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_31__["SeparatorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtZm9ybS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "Ees2":
/*!*********************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-prorrogar/atividade-form-prorrogar.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: AtividadeFormProrrogarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeFormProrrogarComponent", function() { return AtividadeFormProrrogarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ "+jod");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");








class AtividadeFormProrrogarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"], src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__["AtividadeDaoService"]);
        this.injector = injector;
        this.modalWidth = 400;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (controlName == "prazo_entrega") {
                if (!this.util.isDataValid(control.value)) {
                    result = "Obrigatório";
                }
                else if (((_a = this.entity) === null || _a === void 0 ? void 0 : _a.data_distribuicao) && control.value.getTime() < this.entity.data_distribuicao.getTime()) {
                    result = "Menor que distribuição!";
                }
            }
            return result;
        };
        this.form = this.fh.FormBuilder({
            data_distribuicao: { default: new Date() },
            prazo_entrega: { default: new Date() }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = {
                data_distribuicao: entity.data_distribuicao,
                prazo_entrega: entity.prazo_entrega
            };
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            form.patchValue(formValue);
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getAtividade(this.urlParams.get("id")));
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let prorrogar = {
                id: this.entity.id,
                prazo_entrega: this.form.controls.prazo_entrega.value
            };
            this.dao.prorrogar(prorrogar).then(saved => resolve(saved)).catch(reject);
        });
    }
}
AtividadeFormProrrogarComponent.ɵfac = function AtividadeFormProrrogarComponent_Factory(t) { return new (t || AtividadeFormProrrogarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
AtividadeFormProrrogarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AtividadeFormProrrogarComponent, selectors: [["app-atividade-form-prorrogar"]], viewQuery: function AtividadeFormProrrogarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 7, consts: [[3, "form", "disabled", "submit", "cancel"], [1, "row"], ["label", "Data da distribui\u00E7\u00E3o", "controlName", "data_distribuicao", "disabled", "", "labelInfo", "Data de distribui\u00E7\u00E3o da atividade", 3, "size", "control"], ["controlName", "prazo_entrega", "labelInfo", "Prazo para entrega da atividade", 3, "size", "label", "control"]], template: function AtividadeFormProrrogarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function AtividadeFormProrrogarComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function AtividadeFormProrrogarComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "input-datetime", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "input-datetime", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.data_distribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", ctx.lex.translate("Prazo de entrega"))("control", ctx.form.controls.prazo_entrega);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_6__["InputDatetimeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtZm9ybS1wcm9ycm9nYXIuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "Nnce":
/*!**************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade.module.ts ***!
  \**************************************************************/
/*! exports provided: AtividadeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeModule", function() { return AtividadeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _atividade_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atividade-routing.module */ "lAQF");
/* harmony import */ var _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./atividade-list/atividade-list.component */ "w/7R");
/* harmony import */ var _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./atividade-form/atividade-form.component */ "1zD2");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./atividade-list-grid/atividade-list-grid.component */ "GLIe");
/* harmony import */ var _atividade_form_iniciar_atividade_form_iniciar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./atividade-form-iniciar/atividade-form-iniciar.component */ "gPUr");
/* harmony import */ var _atividade_form_concluir_atividade_form_concluir_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./atividade-form-concluir/atividade-form-concluir.component */ "lBET");
/* harmony import */ var _atividade_form_pausar_atividade_form_pausar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./atividade-form-pausar/atividade-form-pausar.component */ "VCMZ");
/* harmony import */ var _atividade_form_prorrogar_atividade_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./atividade-form-prorrogar/atividade-form-prorrogar.component */ "Ees2");
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../uteis/uteis.module */ "hA/d");
/* harmony import */ var _atividade_list_kanban_atividade_list_kanban_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./atividade-list-kanban/atividade-list-kanban.component */ "V2aU");
/* harmony import */ var _atividade_dashboard_atividade_dashboard_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./atividade-dashboard/atividade-dashboard.component */ "q5se");
/* harmony import */ var _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./atividade-form-tarefa/atividade-form-tarefa.component */ "cAq/");
/* harmony import */ var _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./atividade-list-tarefa/atividade-list-tarefa.component */ "sPM3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../uteis/calendar-efemerides/calendar-efemerides.component */ "A5xB");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../components/grid/order/order.component */ "zUlN");
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../uteis/documentos/documentos-badge/documentos-badge.component */ "xctW");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../../components/progress-bar/progress-bar.component */ "uSqO");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../../components/input/input-number/input-number.component */ "imFN");
/* harmony import */ var _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../uteis/comentarios/comentarios-widget/comentarios-widget.component */ "FCDt");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../../../components/grid/pagination/pagination.component */ "f3Td");







































class AtividadeModule {
}
AtividadeModule.ɵfac = function AtividadeModule_Factory(t) { return new (t || AtividadeModule)(); };
AtividadeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({ type: AtividadeModule });
AtividadeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _atividade_routing_module__WEBPACK_IMPORTED_MODULE_1__["AtividadeRoutingModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_10__["UteisModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](AtividadeModule, { declarations: [_atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_2__["AtividadeListComponent"],
        _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__["AtividadeFormComponent"],
        _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_5__["AtividadeListGridComponent"],
        _atividade_form_iniciar_atividade_form_iniciar_component__WEBPACK_IMPORTED_MODULE_6__["AtividadeFormIniciarComponent"],
        _atividade_form_concluir_atividade_form_concluir_component__WEBPACK_IMPORTED_MODULE_7__["AtividadeFormConcluirComponent"],
        _atividade_form_pausar_atividade_form_pausar_component__WEBPACK_IMPORTED_MODULE_8__["AtividadeFormPausarComponent"],
        _atividade_dashboard_atividade_dashboard_component__WEBPACK_IMPORTED_MODULE_12__["AtividadeDashboardComponent"],
        _atividade_form_prorrogar_atividade_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_9__["AtividadeFormProrrogarComponent"],
        _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_13__["AtividadeFormTarefaComponent"],
        _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_14__["AtividadeListTarefaComponent"],
        _atividade_list_kanban_atividade_list_kanban_component__WEBPACK_IMPORTED_MODULE_11__["AtividadeListKanbanComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _atividade_routing_module__WEBPACK_IMPORTED_MODULE_1__["AtividadeRoutingModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_10__["UteisModule"]], exports: [_atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_5__["AtividadeListGridComponent"]] }); })();
_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetComponentScope"](_atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_2__["AtividadeListComponent"], [_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_16__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_17__["TabComponent"], _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_5__["AtividadeListGridComponent"],
    _atividade_list_kanban_atividade_list_kanban_component__WEBPACK_IMPORTED_MODULE_11__["AtividadeListKanbanComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _atividade_dashboard_atividade_dashboard_component__WEBPACK_IMPORTED_MODULE_12__["AtividadeDashboardComponent"]], []);
_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetComponentScope"](_atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_5__["AtividadeListGridComponent"], [_uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_18__["CalendarEfemeridesComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_19__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_20__["ToolbarComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_21__["InputSwitchComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_22__["FilterComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_23__["InputSearchComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_24__["InputTextComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_25__["InputSelectComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_26__["InputMultiselectComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_27__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_28__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_29__["ColumnComponent"], _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_14__["AtividadeListTarefaComponent"], _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_30__["OrderComponent"], _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_31__["DocumentosBadgeComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_32__["BadgeComponent"], _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_33__["ProgressBarComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_34__["SeparatorComponent"], _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_35__["InputNumberComponent"], _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_36__["ComentariosWidgetComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_37__["PaginationComponent"]], []);


/***/ }),

/***/ "V2aU":
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list-kanban/atividade-list-kanban.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: AtividadeListKanbanComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeListKanbanComponent", function() { return AtividadeListKanbanComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _atividade_list_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../atividade-list-base */ "BD6R");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ "xp1S");
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-badge/documentos-badge.component */ "xctW");
/* harmony import */ var _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios-widget/comentarios-widget.component */ "FCDt");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_kanban_kanban_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/kanban/kanban.component */ "rD7j");
/* harmony import */ var _components_kanban_swimlane_swimlane_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/kanban/swimlane/swimlane.component */ "MWcP");
/* harmony import */ var _components_kanban_docker_docker_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/kanban/docker/docker.component */ "a4nP");



















const _c0 = ["filterRef"];
const _c1 = ["kanbanEtiquetas"];
const _c2 = ["dockerNaoIniciado"];
const _c3 = ["dockerPausado"];
const _c4 = ["dockerIniciado"];
const _c5 = ["dockerConcluido"];
function AtividadeListKanbanComponent_ng_template_17_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "profile-picture", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const card_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().card;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("url", card_r11.data.usuario.url_foto)("hint", "Respons\u00E1vel: " + ((card_r11.data.usuario == null ? null : card_r11.data.usuario.nome) || "N\u00E3o atribuido a nenhum usu\u00E1rio"));
} }
function AtividadeListKanbanComponent_ng_template_17_ng_container_15_badge_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "badge", 36);
} if (rf & 2) {
    const status_r19 = ctx.$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", status_r19.color)("label", status_r19.label)("icon", status_r19.icon)("data", status_r19)("click", status_r19.data.filter ? ctx_r15.onStatusClick.bind(ctx_r15) : undefined);
} }
function AtividadeListKanbanComponent_ng_template_17_ng_container_15_badge_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "badge", 36);
} if (rf & 2) {
    const etiqueta_r20 = ctx.$implicit;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", etiqueta_r20.color)("label", etiqueta_r20.value)("icon", etiqueta_r20.icon)("data", etiqueta_r20)("click", ctx_r16.onEtiquetaClick.bind(ctx_r16));
} }
function AtividadeListKanbanComponent_ng_template_17_ng_container_15_separator_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "separator", 37);
} }
function AtividadeListKanbanComponent_ng_template_17_ng_container_15_table_6_tr_1_i_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 41);
} }
function AtividadeListKanbanComponent_ng_template_17_ng_container_15_table_6_tr_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, AtividadeListKanbanComponent_ng_template_17_ng_container_15_table_6_tr_1_i_2_Template, 1, 0, "i", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const check_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", check_r22.checked);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](check_r22.texto);
} }
function AtividadeListKanbanComponent_ng_template_17_ng_container_15_table_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AtividadeListKanbanComponent_ng_template_17_ng_container_15_table_6_tr_1_Template, 5, 2, "tr", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const card_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).card;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", card_r11.data.checklist);
} }
function AtividadeListKanbanComponent_ng_template_17_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "documentos-badge", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, AtividadeListKanbanComponent_ng_template_17_ng_container_15_badge_3_Template, 1, 5, "badge", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, AtividadeListKanbanComponent_ng_template_17_ng_container_15_badge_4_Template, 1, 5, "badge", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, AtividadeListKanbanComponent_ng_template_17_ng_container_15_separator_5_Template, 1, 0, "separator", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, AtividadeListKanbanComponent_ng_template_17_ng_container_15_table_6_Template, 2, 1, "table", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "comentarios-widget", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const card_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().card;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("documento", card_r11.data.documento_requisicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r13.getStatus(card_r11.data));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", card_r11.data.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", card_r11.data.checklist == null ? null : card_r11.data.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", card_r11.data.checklist == null ? null : card_r11.data.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("entity", card_r11.data)("selectable", false)("query", ctx_r13.query);
} }
function AtividadeListKanbanComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, AtividadeListKanbanComponent_ng_template_17_div_14_Template, 2, 2, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, AtividadeListKanbanComponent_ng_template_17_ng_container_15_Template, 8, 8, "ng-container", 29);
} if (rf & 2) {
    const card_r11 = ctx.card;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" #", card_r11.data.numero, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", card_r11.data.unidade.sigla, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("title", "Respons\u00E1vel: ", (card_r11.data.usuario == null ? null : card_r11.data.usuario.nome) || "N\u00E3o atribuido a nenhum usu\u00E1rio", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"]("bi " + ((card_r11.data.usuario == null ? null : card_r11.data.usuario.nome == null ? null : card_r11.data.usuario.nome.length) ? "bi-person-check" : "bi-person-x"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r4.util.apelidoOuNome(card_r11.data.usuario, true) || "(N\u00E3o atribu\u00EDdo)", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("title", "Demandante: ", (card_r11.data.demandante == null ? null : card_r11.data.demandante.nome) || "Desconhecido", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r4.util.apelidoOuNome(card_r11.data.demandante, true) || "Desconhecido", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", card_r11.data.usuario);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r4.filter == null ? null : ctx_r4.filter.controls == null ? null : ctx_r4.filter.controls.resumido == null ? null : ctx_r4.filter.controls.resumido.value));
} }
function AtividadeListKanbanComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "input-select", 42);
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 12)("control", ctx_r6.formEdit.controls.etiqueta)("items", ctx_r6.etiquetasEdit);
} }
function AtividadeListKanbanComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "h5", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "h6", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "p", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AtividadeListKanbanComponent_kanban_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "kanban", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "swimlane");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "docker", 55, 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "swimlane");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "docker", 57, 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "docker", 59, 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "swimlane");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "docker", 61, 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](18);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("template", _r3)("placeholderTemplate", _r7)("loading", ctx_r9.loading)("dragSwimlanes", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collapse", ctx_r9.cardsConfig.naoIniciado)("toggle", ctx_r9.onDockerCollapse.bind(ctx_r9))("menu", ctx_r9.menuDockerNaoIniciado)("dragged", ctx_r9.onDragged.bind(ctx_r9))("drop", ctx_r9.onDrop.bind(ctx_r9))("dropIf", ctx_r9.canDrop(ctx_r9.DOCKERS[ctx_r9.NAOINICIADO]))("cards", ctx_r9.cards[ctx_r9.NAOINICIADO]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collapse", ctx_r9.cardsConfig.pausado)("toggle", ctx_r9.onDockerCollapse.bind(ctx_r9))("dragged", ctx_r9.onDragged.bind(ctx_r9))("drop", ctx_r9.onDrop.bind(ctx_r9))("dropIf", ctx_r9.canDrop(ctx_r9.DOCKERS[ctx_r9.PAUSADO]))("cards", ctx_r9.cards[ctx_r9.PAUSADO]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collapse", ctx_r9.cardsConfig.iniciado)("toggle", ctx_r9.onDockerCollapse.bind(ctx_r9))("dragged", ctx_r9.onDragged.bind(ctx_r9))("drop", ctx_r9.onDrop.bind(ctx_r9))("dropIf", ctx_r9.canDrop(ctx_r9.DOCKERS[ctx_r9.INICIADO]))("cards", ctx_r9.cards[ctx_r9.INICIADO]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collapse", ctx_r9.cardsConfig.concluido)("toggle", ctx_r9.onDockerCollapse.bind(ctx_r9))("dragged", ctx_r9.onDragged.bind(ctx_r9))("drop", ctx_r9.onDrop.bind(ctx_r9))("dropIf", ctx_r9.canDrop(ctx_r9.DOCKERS[ctx_r9.CONCLUIDO]))("cards", ctx_r9.cards[ctx_r9.CONCLUIDO]);
} }
function AtividadeListKanbanComponent_kanban_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "kanban", 63, 64);
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](18);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](22);
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dockers", ctx_r10.labels)("template", _r3)("placeholderTemplate", _r7)("loading", ctx_r10.loading)("swimlaneDrop", ctx_r10.onSwimlaneDrop.bind(ctx_r10))("dockerDragged", ctx_r10.onDragged.bind(ctx_r10))("dockerDrop", ctx_r10.onDrop.bind(ctx_r10))("dockerEditTemplate", _r5)("dockerToggle", ctx_r10.onDockerCollapse.bind(ctx_r10))("dockerEdit", ctx_r10.editEtiquetas.bind(ctx_r10))("dockerSave", ctx_r10.saveEtiquetas.bind(ctx_r10))("dockerDelete", ctx_r10.deleteEtiquetas.bind(ctx_r10))("dockerCancel", ctx_r10.cancelEtiquetas.bind(ctx_r10))("dockerColorStyle", ctx_r10.getLabelStyle);
} }
class AtividadeListKanbanComponent extends _atividade_list_base__WEBPACK_IMPORTED_MODULE_1__["AtividadeListBase"] {
    constructor(injector) {
        var _a, _b, _c;
        super(injector);
        this.injector = injector;
        this.TITLE_OUTRAS = "Outras";
        this.NAOINICIADO = 0;
        this.PAUSADO = 1;
        this.INICIADO = 2;
        this.CONCLUIDO = 3;
        this.AVALIADO = 4;
        this.DOCKERS = ["NAOINICIADO", "PAUSADO", "INICIADO", "CONCLUIDO"];
        this.cards = [[], [], [], []];
        this.cardsConfig = { naoIniciado: false, pausado: false, iniciado: false, concluido: false };
        this.labels = [];
        this.cardsVersion = 0;
        this.dragDrop = {};
        this.rowsLimit = 500;
        this.kanbanQueryOptions = {};
        this.etiquetasEdit = [];
        this.toolbarButtons = [
            {
                icon: "bi bi-search",
                label: "Filtrar",
                onClick: () => { var _a; return (_a = this.filterRef) === null || _a === void 0 ? void 0 : _a.toggle(); }
            },
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-success",
                label: "Incluir",
                onClick: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () { return yield this.add(); })
            }
        ];
        this.outrasButtons = [
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-success",
                hint: "Incluir nova lista a direita",
                onClick: this.incluirLista.bind(this)
            }
        ];
        this.etiquetasButtons = [
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-success",
                hint: "Incluir nova lista a direita",
                onClick: this.incluirLista.bind(this)
            }
        ];
        this.menuDockerNaoIniciado = [
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-primary",
                hint: "Incluir",
                onClick: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () { return yield this.add(); })
            }
        ];
        this.filterWhere = (filter) => {
            var _a, _b, _c, _d, _e;
            let result = this.fixedFilter || [];
            let form = filter.value;
            if ((_a = form.usuario_id) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["usuario_id", "==", form.usuario_id]);
            }
            if ((_b = form.unidade_id) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.unidades_subordinadas) {
                result.push(["unidades_subordinadas", "==", true]);
            }
            if ((_c = form.etiquetas) === null || _c === void 0 ? void 0 : _c.length) {
                result.push(["etiquetas", "in", form.etiquetas.map((x) => x.value)]);
            }
            if ((_d = form.numero_processo) === null || _d === void 0 ? void 0 : _d.length) {
                result.push(["numero_processo", "==", form.numero_processo]);
            }
            if (((_e = form.status) === null || _e === void 0 ? void 0 : _e.length) && !result.find(x => x[0] == "status")) {
                result.push(["status", "==", form.status]);
            }
            result.push(["data_arquivamento", "==", null]); /* Não trazer as arquivadas */
            return result;
        };
        /* Inicializações */
        this.code = "MOD_DMD";
        this.filter = this.fh.FormBuilder({
            atribuidas_para_mim: { default: false },
            usuario_id: { default: "" },
            somente_unidade_atual: { default: false },
            unidades_subordinadas: { default: false },
            unidade_id: { default: "" },
            numero_processo: { default: "" },
            status: { default: "" },
            usarEtiquetas: { default: !!((_a = this.usuarioConfig) === null || _a === void 0 ? void 0 : _a.kanban_usar_etiquetas) },
            resumido: { default: !!((_b = this.usuarioConfig) === null || _b === void 0 ? void 0 : _b.kanban_resumido) },
            etiquetas: { default: [] }
        });
        this.formEdit = this.fh.FormBuilder({
            etiqueta: { default: null }
        });
        this.cardsConfig = Object.assign(this.cardsConfig, (_c = this.usuarioConfig) === null || _c === void 0 ? void 0 : _c.kanban_status_dockers);
        this.groupBy = [];
        this.loadEtiquetas();
        this.loadLabel();
    }
    defaultUsuarioConfig() {
        return Object.assign(super.defaultUsuarioConfig(), {
            active_tab: "TABELA",
            kanban_resumido: false,
            kanban_usar_etiquetas: false,
            kanban_status_dockers: { naoIniciado: false, pausado: false, iniciado: false, concluido: false },
            kanban_etiquetas_dockers: []
        });
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.query.onLoadingChange = (loading) => {
            this.loading = loading;
            this.cdRef.detectChanges();
        };
        this.loading = this.query.loading;
        this.query.subject.asObservable().subscribe(this.onQueryLoad.bind(this));
        this.cdRef.detectChanges();
    }
    isOutras(x) {
        return x.title == this.TITLE_OUTRAS && !x.labels.length;
    }
    loadLabel() {
        var _a;
        const dockers = [...(((_a = this.usuarioConfig) === null || _a === void 0 ? void 0 : _a.kanban_etiquetas_dockers) || [])];
        if (!dockers.find(this.isOutras.bind(this)))
            dockers.splice(0, 0, { title: this.TITLE_OUTRAS, labels: [], collapse: false });
        this.labels = dockers.reduce((a, v) => {
            if (!a.find((x) => { var _a, _b, _c; return (((_a = x.title) === null || _a === void 0 ? void 0 : _a.length) && x.title == v.title) || (((_b = x.labels) === null || _b === void 0 ? void 0 : _b.length) && ((_c = v.labels) === null || _c === void 0 ? void 0 : _c.length) && x.labels[0].key == v.labels[0].key); })) {
                a.push({
                    labels: this.isOutras(v) ? [] : v.labels,
                    title: v.title,
                    menu: this.isOutras(v) ? this.outrasButtons : this.etiquetasButtons,
                    cards: [],
                    editing: false,
                    collapse: v.collapse
                });
            }
            return a;
        }, []);
        /*this.labels = dockers.map(x => {
          return {
            labels: this.isOutras(x) ? [] : x.labels,
            title: x.title,
            menu: this.isOutras(x) ? this.outrasButtons : this.etiquetasButtons,
            cards: [],
            editing: false,
            collapse: x.collapse
          }
        });*/
    }
    get isEtiquetas() {
        var _a, _b, _c;
        return !!((_c = (_b = (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.usarEtiquetas) === null || _c === void 0 ? void 0 : _c.value);
    }
    onUsarEtiquetasChange(event) {
        this.saveUsuarioConfig({ kanban_usar_etiquetas: this.filter.controls.usarEtiquetas.value });
        if (this.query)
            this.onQueryLoad(this.query.rows);
    }
    incluirLista(docker) {
        var _a;
        this.labels.splice(docker.key + 1, 0, {
            labels: [],
            menu: this.etiquetasButtons,
            cards: [],
            editing: true,
            collapse: false
        });
        (_a = this.kanbanEtiquetas) === null || _a === void 0 ? void 0 : _a.refreshDoubleScrollbar();
        this.cdRef.detectChanges();
    }
    onResumidoChange(event) {
        this.saveUsuarioConfig({ kanban_resumido: this.filter.controls.resumido.value });
        this.cdRef.detectChanges();
    }
    loadEtiquetas() {
        var _a;
        //this.etiquetas = this.util.merge(row.atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key); 
        this.etiquetas = this.util.merge(this.etiquetas, (_a = this.auth.usuario.config) === null || _a === void 0 ? void 0 : _a.etiquetas, (a, b) => a.key == b.key);
    }
    getLabelStyle(label) {
        const bgColor = label.labels.length == 1 ? label.labels[0].color || "#000000" : "#000000";
        //const txtColor = this.util.contrastColor(bgColor);
        return `border-color: ${bgColor} !important;`;
    }
    onDockerCollapse(docker, collapse) {
        var _a, _b, _c, _d, _e;
        if (this.isEtiquetas) {
            this.labels[docker.key].collapse = collapse;
            this.saveEtiquetasUsuarioConfig();
        }
        else {
            this.cardsConfig = {
                naoIniciado: !!((_a = this.dockerNaoIniciado) === null || _a === void 0 ? void 0 : _a.collapse),
                pausado: !!((_b = this.dockerPausado) === null || _b === void 0 ? void 0 : _b.collapse),
                iniciado: !!((_c = this.dockerIniciado) === null || _c === void 0 ? void 0 : _c.collapse),
                concluido: !!((_d = this.dockerConcluido) === null || _d === void 0 ? void 0 : _d.collapse)
            };
            this.saveUsuarioConfig({ kanban_status_dockers: this.cardsConfig });
        }
        (_e = this.kanbanEtiquetas) === null || _e === void 0 ? void 0 : _e.refreshDoubleScrollbar();
    }
    editEtiquetas(docker) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const label = this.labels[docker.key];
            const allUsed = this.labels.reduce((a, v, i) => {
                if (v.labels.length && i != docker.key)
                    a.push(v.labels[0].key);
                return a;
            }, []);
            this.etiquetasEdit = this.etiquetas.filter(x => !allUsed.includes(x.key));
            this.formEdit.controls.etiqueta.setValue(label.labels.length ? label.labels[0].key : null);
        });
    }
    saveEtiquetasUsuarioConfig() {
        const dockers = this.labels.reduce((a, v) => {
            if (!a.find((x) => { var _a, _b, _c; return (((_a = x.title) === null || _a === void 0 ? void 0 : _a.length) && x.title == v.title) || (((_b = x.labels) === null || _b === void 0 ? void 0 : _b.length) && ((_c = v.labels) === null || _c === void 0 ? void 0 : _c.length) && x.labels[0].key == v.labels[0].key); })) {
                a.push({
                    title: v.title,
                    labels: v.labels,
                    collapse: v.collapse
                });
            }
            return a;
        }, []);
        /*const dockers = this.labels.map(x => {
          return {
            title: x.title,
            labels: x.labels,
            collapse: x.collapse
          }
        });*/
        this.saveUsuarioConfig({ kanban_etiquetas_dockers: dockers });
    }
    saveEtiquetas(docker) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const key = this.formEdit.controls.etiqueta.value;
            if (key === null || key === void 0 ? void 0 : key.length) {
                const label = this.labels[docker.key];
                const etiqueta = this.etiquetasEdit.find(x => x.key == key);
                if (etiqueta)
                    label.labels = [etiqueta];
                if (this.query)
                    this.onQueryLoad(this.query.rows);
                this.saveEtiquetasUsuarioConfig();
                return true;
            }
            return false;
        });
    }
    cancelEtiquetas(docker) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const label = this.labels[docker.key];
            if (!((_a = label.labels) === null || _a === void 0 ? void 0 : _a.length)) {
                this.labels.splice(docker.key, 1);
                (_b = this.kanbanEtiquetas) === null || _b === void 0 ? void 0 : _b.refreshDoubleScrollbar();
            }
        });
    }
    deleteEtiquetas(docker) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.labels.splice(docker.key, 1);
            (_a = this.kanbanEtiquetas) === null || _a === void 0 ? void 0 : _a.refreshDoubleScrollbar();
            if (this.query)
                this.onQueryLoad(this.query.rows);
            this.saveEtiquetasUsuarioConfig();
        });
    }
    getNomes(context) {
        return Object.getOwnPropertyNames(context.filter.controls || {}).join(",");
    }
    modalRefreshId(atividade) {
        return {
            modal: true,
            modalClose: (modalResult) => {
                var _a;
                const destination = this.dragDrop.destination;
                const source = this.dragDrop.source;
                if (modalResult) {
                    if (destination && source) {
                        destination.list.splice(destination.index, 0, destination.card);
                        source.list.splice(source.index, 1);
                    }
                    (((_a = this.grid) === null || _a === void 0 ? void 0 : _a.query) || this.query).refreshId(atividade.id);
                }
                this.dragDrop = {};
            }
        };
    }
    mergeEtiqueta(etiqueta) {
        if (!this.etiquetas.find(x => x.key == etiqueta.key)) {
            this.etiquetas.push(etiqueta);
        }
    }
    filterSubmit(filter) {
        super.filterSubmit(filter);
        this.cards = [[], [], [], []];
        this.labels.forEach(x => x.cards = []);
        return this.queryOptions;
    }
    onQueryLoad(rows) {
        var _a, _b, _c;
        super.onGridLoad(rows);
        this.cardsVersion++;
        if (!((_c = (_b = (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.usarEtiquetas) === null || _c === void 0 ? void 0 : _c.value)) {
            rows === null || rows === void 0 ? void 0 : rows.forEach(row => {
                var _a, _b;
                const atividade = row;
                let status = ((_a = atividade.metadados) === null || _a === void 0 ? void 0 : _a.suspenso) ? "SUSPENSO" : (_b = this.lookup.ATIVIDADE_STATUS.find(x => { var _a; return x.key == ((_a = atividade.metadados) === null || _a === void 0 ? void 0 : _a.status); })) === null || _b === void 0 ? void 0 : _b.key;
                switch (status || "LANCADO") {
                    case "SUSPENSO":
                        this.putCard(this.cards[this.PAUSADO], atividade);
                        break;
                    case "INICIADO":
                        this.putCard(this.cards[this.INICIADO], atividade);
                        break;
                    case "CONCLUIDO":
                        this.putCard(this.cards[this.CONCLUIDO], atividade);
                        break;
                    default: this.putCard(this.cards[this.NAOINICIADO], atividade);
                }
            });
            for (let cards of this.cards) {
                for (let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++)
                    ;
            }
        }
        else {
            const outrasIndex = this.labels.findIndex(this.isOutras.bind(this));
            rows === null || rows === void 0 ? void 0 : rows.forEach(row => {
                var _a;
                let atividade = row;
                let docker = undefined;
                atividade.etiquetas = atividade.etiquetas || [];
                for (let i = 0; i < atividade.etiquetas.length; i++) {
                    for (let j = 1; j < this.labels.length && !docker; j++) {
                        if (this.labels[j].labels[0].key == atividade.etiquetas[i].key)
                            docker = this.labels[j];
                    }
                    if (!this.etiquetas.some(x => x.key == atividade.etiquetas[i].key))
                        this.etiquetas.push(atividade.etiquetas[i]);
                }
                this.putCard((docker === null || docker === void 0 ? void 0 : docker.cards) || ((_a = this.labels[outrasIndex]) === null || _a === void 0 ? void 0 : _a.cards) || [], atividade);
            });
            for (let cards of this.labels.map(x => x.cards || [])) {
                for (let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++)
                    ;
            }
            /*this.labels[0].labels = [];
            this.etiquetas.forEach(x => {
              if(!this.labels.find(y => y.labels.find(z => z.key == x.key))) this.labels[0].labels.push(x)
            });*/
        }
        this.cdRef.detectChanges();
    }
    putCard(list, atividade) {
        var _a;
        const index = list.findIndex(x => x.id == atividade.id);
        const card = {
            id: atividade.id,
            title: ((_a = atividade.tipo_atividade) === null || _a === void 0 ? void 0 : _a.nome) || "(Atividade não atribuída)",
            subTitle: atividade.descricao || "",
            data: atividade,
            version: this.cardsVersion,
            menu: undefined,
            dynamicMenu: this.dynamicCardMenu.bind(this)
        };
        if (index >= 0) {
            list[index] = Object.assign(list[index], card);
        }
        else {
            list.push(card);
        }
    }
    dynamicCardMenu(card) {
        const menu = this.dynamicButtons(card.data);
        menu.push({
            icon: "bi bi-three-dots",
            hint: "Opções",
            dynamicItems: this.cardDynamicOptions.bind(this)
        });
        if (!card.menu || card.menu.map(x => x.hint).join() != menu.map(x => x.hint).join())
            card.menu = menu;
        return card.menu;
    }
    cardDynamicOptions(card) {
        var _a;
        const olders = (_a = card.menu) === null || _a === void 0 ? void 0 : _a.find(x => x.hint == "Opções");
        if (olders) {
            const options = this.dynamicOptions.bind(this)(card.data);
            if (!olders.items || (olders === null || olders === void 0 ? void 0 : olders.items.map(x => x.label).join()) != options.map(x => x.label).join())
                olders.items = options;
        }
        return olders === null || olders === void 0 ? void 0 : olders.items;
    }
    canDrop(status) {
        let self = this;
        return (drag) => {
            if (self.isEtiquetas) {
                return true;
            }
            else {
                const buttons = self.dynamicOptions(drag.data);
                return !!buttons.find(x => x.id == status);
            }
        };
    }
    updateEtiquetasAtividade(dragDrop) {
        var _a, _b;
        const sourceLabel = (_a = this.labels.find(x => x.cards == dragDrop.source.list)) === null || _a === void 0 ? void 0 : _a.labels[0];
        const destinationLabel = (_b = this.labels.find(x => x.cards == dragDrop.destination.list)) === null || _b === void 0 ? void 0 : _b.labels[0];
        const atividade = dragDrop.destination.atividade;
        if (sourceLabel && destinationLabel && sourceLabel.key == destinationLabel.key)
            return;
        if (sourceLabel)
            atividade.etiquetas.splice(atividade.etiquetas.findIndex(x => x.key == sourceLabel.key), 1);
        if (destinationLabel)
            atividade.etiquetas.unshift(destinationLabel);
        this.loading = true;
        this.dao.update(atividade.id, { etiquetas: atividade.etiquetas }).then(atividade => this.modalRefreshId(atividade).modalClose.bind(this)(atividade.id)).finally(() => this.loading = false);
    }
    onDragged(item, list, effect) {
        if (["copy", "move"].includes(effect)) {
            const index = list.indexOf(item);
            this.dragDrop.source = { list, index };
            if (this.isEtiquetas)
                this.updateEtiquetasAtividade(this.dragDrop);
        }
    }
    onDrop(event, list) {
        if (list && ["copy", "move"].includes(event.dropEffect)) {
            const atividade = event.data.data;
            const card = event.data;
            let index = typeof event.index === "undefined" ? list.length : event.index;
            this.dragDrop = { destination: { list, index, card, atividade } };
            if (!this.isEtiquetas) {
                const buttons = this.dynamicOptions(atividade);
                const docker = this.cards.indexOf(list);
                if (docker >= 0) {
                    const action = buttons.find(x => x.id == this.DOCKERS[docker]);
                    if (action === null || action === void 0 ? void 0 : action.onClick)
                        action === null || action === void 0 ? void 0 : action.onClick(atividade);
                }
            }
        }
    }
    onStatusClick(status) {
        var _a, _b, _c;
        (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.status.setValue((_b = status.data) === null || _b === void 0 ? void 0 : _b.status);
        this.filterCollapsed = false;
        (_c = this.filterRef) === null || _c === void 0 ? void 0 : _c.onButtonFilterClick();
        this.cdRef.detectChanges();
    }
    onEtiquetaClick(etiqueta) {
        var _a, _b;
        let etiquetas = this.filter.controls.etiquetas.value;
        etiquetas.push(etiqueta);
        (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.etiquetas.setValue(etiquetas);
        this.filterCollapsed = false;
        (_b = this.filterRef) === null || _b === void 0 ? void 0 : _b.onButtonFilterClick();
        this.cdRef.detectChanges();
    }
    filterClear(filter) {
        var _a;
        this.filter.controls.atribuidas_para_mim.setValue(false);
        this.filter.controls.usuario_id.setValue("");
        this.filter.controls.somente_unidade_atual.setValue(false);
        this.filter.controls.unidades_subordinadas.setValue(false);
        this.filter.controls.unidade_id.setValue("");
        this.filter.controls.numero_processo.setValue("");
        if (!((_a = this.fixedFilter) === null || _a === void 0 ? void 0 : _a.length) || !this.fixedFilter.find(x => x[0] == "status"))
            this.filter.controls.status.setValue(null);
        this.filter.controls.etiquetas.setValue([]);
        super.filterClear(filter);
    }
    onSwimlaneDrop(event, fromIndex) {
        const element = this.labels[fromIndex];
        const toIndex = fromIndex < event.index ? event.index - 1 : event.index;
        this.labels.splice(fromIndex, 1);
        this.labels.splice(toIndex, 0, element);
        this.saveEtiquetasUsuarioConfig();
    }
}
AtividadeListKanbanComponent.ɵfac = function AtividadeListKanbanComponent_Factory(t) { return new (t || AtividadeListKanbanComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injector"])); };
AtividadeListKanbanComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AtividadeListKanbanComponent, selectors: [["atividade-list-kanban"]], viewQuery: function AtividadeListKanbanComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c5, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.filterRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.kanbanEtiquetas = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.dockerNaoIniciado = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.dockerPausado = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.dockerIniciado = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.dockerConcluido = _t.first);
    } }, inputs: { snapshot: "snapshot", fixedFilter: "fixedFilter" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]], decls: 25, vars: 38, consts: [[3, "buttons"], ["labelPosition", "left", "label", "Resumido", "controlName", "resumido", 3, "size", "control", "change"], ["labelPosition", "left", "label", "Usar etiquetas", "controlName", "usarEtiquetas", 1, "me-2", 3, "size", "control", "change"], [3, "form", "where", "query", "submit", "clear", "collapseChange", "collapsed"], ["filterRef", ""], [1, "row"], ["label", "Minhas", "controlName", "atribuidas_para_mim", 3, "size", "control", "change"], ["controlName", "usuario_id", 3, "size", "label", "disabled", "dao"], ["usuario", ""], ["label", "Atual", "controlName", "somente_unidade_atual", "labelInfo", "Somente as atividades da unidade selecionada", 3, "size", "control", "change"], ["controlName", "unidade_id", 3, "size", "label", "disabled", "dao"], ["unidade", ""], ["label", "Sub.", "controlName", "unidades_subordinadas", "labelInfo", "Incluir as unidades subordinadas", 3, "size", "control"], ["maskFormat", "00000.000000/0000-00", "controlName", "numero_processo", "labelInfo", "Pesquisa no documento de requisi\u00E7\u00E3o, conclus\u00E3o e nos documentos das tarefas", 3, "size", "label", "control"], ["label", "Status", "itemTodos", "- Todos -", "controlName", "status", 3, "size", "valueTodos", "disabled", "control", "items"], ["noForm", "", "noBox", "", "label", "Etiquetas", "controlName", "etiquetas", 3, "size", "control"], ["ticket", ""], ["editDocker", ""], ["placeholder", ""], ["useCardData", "", 3, "template", "placeholderTemplate", "loading", "dragSwimlanes", 4, "ngIf"], ["useCardData", "", 3, "dockers", "template", "placeholderTemplate", "loading", "swimlaneDrop", "dockerDragged", "dockerDrop", "dockerEditTemplate", "dockerToggle", "dockerEdit", "dockerSave", "dockerDelete", "dockerCancel", "dockerColorStyle", 4, "ngIf"], [1, "d-flex", "w-100"], [1, "flex-fill"], [1, "text-nowrap"], [1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-briefcase"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", 3, "title"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", "fw-light", 3, "title"], [1, "bi", "bi-cursor"], [4, "ngIf"], [3, "url", "hint"], [1, "card-status-container"], [3, "documento"], ["class", "ms-1", 3, "color", "label", "icon", "data", "click", 4, "ngFor", "ngForOf"], ["small", "", "title", "Checklist", 4, "ngIf"], ["origem", "ATIVIDADE", 3, "entity", "selectable", "query"], [1, "ms-1", 3, "color", "label", "icon", "data", "click"], ["small", "", "title", "Checklist"], [4, "ngFor", "ngForOf"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "micro-text", "fw-ligh"], [1, "bi", "bi-check-circle"], ["controlName", "etiqueta", 3, "size", "control", "items"], [1, "card-body"], [1, "card-title", "placeholder-glow"], [1, "placeholder", "col-6"], ["role", "group", "aria-label", "Basic outlined example", 1, "btn-group"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", "disabled", "placeholder"], [1, "bi", "bi-question"], [1, "card-subtitle", "mb-2", "text-muted", "placeholder-glow"], [1, "placeholder", "col-8"], [1, "card-text", "placeholder-glow"], [1, "placeholder", "col-7"], [1, "placeholder", "col-4"], ["useCardData", "", 3, "template", "placeholderTemplate", "loading", "dragSwimlanes"], ["icon", "bi bi-hourglass-split", "title", "N\u00E3o iniciado", "color", "border-warning", 3, "collapse", "toggle", "menu", "dragged", "drop", "dropIf", "cards"], ["dockerNaoIniciado", ""], ["icon", "bi bi-pause-circle", "title", "Pausadas", "color", "border-danger", 3, "collapse", "toggle", "dragged", "drop", "dropIf", "cards"], ["dockerPausado", ""], ["icon", "bi bi-play-circle", "title", "Iniciadas", "color", "border-info", 3, "collapse", "toggle", "dragged", "drop", "dropIf", "cards"], ["dockerIniciado", ""], ["icon", "bi bi-check-circle", "title", "Conclu\u00EDdas", "color", "border-primary", 3, "collapse", "toggle", "dragged", "drop", "dropIf", "cards"], ["dockerConcluido", ""], ["useCardData", "", 3, "dockers", "template", "placeholderTemplate", "loading", "swimlaneDrop", "dockerDragged", "dockerDrop", "dockerEditTemplate", "dockerToggle", "dockerEdit", "dockerSave", "dockerDelete", "dockerCancel", "dockerColorStyle"], ["kanbanEtiquetas", ""]], template: function AtividadeListKanbanComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "input-switch", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_switch_change_1_listener($event) { return ctx.onResumidoChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "input-switch", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_switch_change_2_listener($event) { return ctx.onUsarEtiquetasChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "filter", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "input-switch", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_switch_change_6_listener($event) { return ctx.onAtribuidasParaMimChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "input-search", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "input-switch", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_switch_change_9_listener($event) { return ctx.onSomenteUnidadeAtualChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "input-search", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "input-switch", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "input-text", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "input-select", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "input-multiselect", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, AtividadeListKanbanComponent_ng_template_17_Template, 16, 10, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, AtividadeListKanbanComponent_ng_template_19_Template, 1, 3, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, AtividadeListKanbanComponent_ng_template_21_Template, 16, 0, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, AtividadeListKanbanComponent_kanban_23_Template, 12, 29, "kanban", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](24, AtividadeListKanbanComponent_kanban_24_Template, 2, 14, "kanban", 20);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("buttons", ctx.toolbarButtons);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.resumido);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.usarEtiquetas);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("query", ctx.query)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.atribuidas_para_mim);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 5)("label", ctx.lex.translate("Usu\u00E1rio"))("disabled", ctx.filter.controls.atribuidas_para_mim.value ? "true" : undefined)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.somente_unidade_atual);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Unidade"))("disabled", ctx.filter.controls.somente_unidade_atual.value ? "true" : undefined)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.unidades_subordinadas);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 4)("label", "N\u00BA " + ctx.lex.translate("Processo") + " (Sei)")("control", ctx.filter.controls.numero_processo);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 4)("valueTodos", null)("disabled", (ctx.fixedFilter == null ? null : ctx.fixedFilter.length) && ctx.fixedFilter[0][0] == "status" ? "true" : undefined)("control", ctx.filter.controls.status)("items", ctx.lookup.ATIVIDADE_STATUS);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.etiquetas);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEtiquetas);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isEtiquetas);
    } }, directives: [_components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_3__["ToolbarComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__["InputSwitchComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_5__["FilterComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_6__["InputSearchComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__["InputTextComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__["InputSelectComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_9__["InputMultiselectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_11__["ProfilePictureComponent"], _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_12__["DocumentosBadgeComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_13__["ComentariosWidgetComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_14__["BadgeComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__["SeparatorComponent"], _components_kanban_kanban_component__WEBPACK_IMPORTED_MODULE_16__["KanbanComponent"], _components_kanban_swimlane_swimlane_component__WEBPACK_IMPORTED_MODULE_17__["SwimlaneComponent"], _components_kanban_docker_docker_component__WEBPACK_IMPORTED_MODULE_18__["DockerComponent"]], styles: [".comentario-badge[data-expanded=true][_ngcontent-%COMP%]   .comentario-title[_ngcontent-%COMP%] {\n  display: initial;\n  white-space: normal;\n}\n.comentario-badge[data-expanded=true][_ngcontent-%COMP%]   .comentario-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  height: auto;\n  display: block;\n  max-width: 290px;\n  white-space: initial;\n}\n.atividade-atividade[_ngcontent-%COMP%], .atividade-descricao[_ngcontent-%COMP%] {\n  height: auto;\n  display: block;\n  max-width: 200px;\n  white-space: initial;\n}\n.comentario-badge[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  display: block;\n  background-color: #ffe69c !important;\n  margin-bottom: 1px;\n  text-align: left;\n}\n.comentario-badge[_ngcontent-%COMP%]   .comentario-title[_ngcontent-%COMP%] {\n  display: none;\n}\n.comentario-badge[_ngcontent-%COMP%]   .comentario-text[_ngcontent-%COMP%] {\n  display: inline-block;\n  max-width: 290px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  font-size: 12px;\n}\n.docker-border[_ngcontent-%COMP%] {\n  border-width: 1px;\n}\n.card-status-container[_ngcontent-%COMP%] {\n  width: 330px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2F0aXZpZGFkZS1saXN0LWthbmJhbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7QUFBUjtBQUVJO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtBQUFSO0FBSUE7RUFDSSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7QUFESjtBQUlBO0VBQ0ksbUJBQUE7RUFDQSxjQUFBO0VBRUEsb0NBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBRko7QUFHSTtFQUNJLGFBQUE7QUFEUjtBQUdJO0VBQ0kscUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFEUjtBQUtBO0VBQ0ksaUJBQUE7QUFGSjtBQUtBO0VBQ0ksWUFBQTtBQUZKIiwiZmlsZSI6ImF0aXZpZGFkZS1saXN0LWthbmJhbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb21lbnRhcmlvLWJhZGdlW2RhdGEtZXhwYW5kZWQ9dHJ1ZV0ge1xuICAgIC5jb21lbnRhcmlvLXRpdGxlIHtcbiAgICAgICAgZGlzcGxheTogaW5pdGlhbDtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbiAgICB9XG4gICAgLmNvbWVudGFyaW8tdGV4dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWF4LXdpZHRoOiAyOTBweDtcbiAgICAgICAgd2hpdGUtc3BhY2U6IGluaXRpYWw7XG4gICAgfVxufVxuXG4uYXRpdmlkYWRlLWF0aXZpZGFkZSwgLmF0aXZpZGFkZS1kZXNjcmljYW8ge1xuICAgIGhlaWdodDogYXV0bztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xuICAgIHdoaXRlLXNwYWNlOiBpbml0aWFsO1xufVxuXG4uY29tZW50YXJpby1iYWRnZSB7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICAvL3dpZHRoOiAyMDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlNjljICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMXB4O1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgLmNvbWVudGFyaW8tdGl0bGUge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICAuY29tZW50YXJpby10ZXh0IHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBtYXgtd2lkdGg6IDI5MHB4O1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbn1cblxuLmRvY2tlci1ib3JkZXIge1xuICAgIGJvcmRlci13aWR0aDogMXB4O1xufVxuXG4uY2FyZC1zdGF0dXMtY29udGFpbmVyIHtcbiAgICB3aWR0aDogMzMwcHg7XG59Il19 */"] });


/***/ }),

/***/ "VCMZ":
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-pausar/atividade-form-pausar.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: AtividadeFormPausarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeFormPausarComponent", function() { return AtividadeFormPausarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ "+jod");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ "UJzD");










function AtividadeFormPausarComponent_top_alert_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "top-alert", 5);
} }
function AtividadeFormPausarComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "input-datetime", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("control", ctx_r1.form.controls.inicio);
} }
class AtividadeFormPausarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"], src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__["AtividadeDaoService"]);
        this.injector = injector;
        this.reiniciar = false;
        this.modalWidth = 400;
        this.validate = (control, controlName) => {
            var _a, _b;
            let result = null;
            let pausado = (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.pausas) === null || _b === void 0 ? void 0 : _b.find(x => !x.data_fim);
            if (controlName == "data") {
                if (this.reiniciar && !pausado) {
                    result = "Não á pausa!";
                }
                else if (!this.util.isDataValid(control.value)) {
                    result = "Obrigatório";
                }
                else if (pausado && this.entity && control.value.getTime() < this.entity.data_inicio.getTime()) {
                    result = "Menor que inicio!";
                }
            }
            return result;
        };
        this.form = this.fh.FormBuilder({
            inicio: { default: undefined },
            data: { default: new Date() }
        }, this.cdRef, this.validate);
    }
    ngAfterViewInit() {
        var _a;
        this.reiniciar = !!((_a = this.queryParams) === null || _a === void 0 ? void 0 : _a.reiniciar);
        this.title = this.reiniciar ? "Reiniciar" : "Suspender";
        super.ngAfterViewInit();
    }
    loadData(entity, form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //this.reiniciar = !!this.queryParams?.reiniciar;
            let pausado = (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.pausas) === null || _b === void 0 ? void 0 : _b.find(x => !x.data_fim);
            if (this.reiniciar && !pausado) {
                this.error("Não há pausa ativa para ser reiniciada.");
            }
            let formValue = {
                inicio: this.reiniciar ? pausado === null || pausado === void 0 ? void 0 : pausado.data_inicio : undefined,
                data: this.util.setStrTime(new Date(), this.auth.unidadeHora)
            };
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            form.patchValue(formValue);
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getAtividade(this.urlParams.get("id")));
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let pausa = {
                atividade_id: this.entity.id,
                data: this.form.controls.data.value
            };
            if (this.reiniciar) {
                this.dao.reiniciar(pausa).then(saved => resolve(saved)).catch(reject);
            }
            else {
                this.dao.pausar(pausa).then(saved => resolve(saved)).catch(reject);
            }
        });
    }
}
AtividadeFormPausarComponent.ɵfac = function AtividadeFormPausarComponent_Factory(t) { return new (t || AtividadeFormPausarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
AtividadeFormPausarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AtividadeFormPausarComponent, selectors: [["app-atividade-form-pausar"]], viewQuery: function AtividadeFormPausarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 8, consts: [["type", "warning", "message", "Dica: N\u00E3o \u00E9 necess\u00E1rio suspender a tarefa entre as jornadas de trabalho!", 4, "ngIf"], [3, "form", "disabled", "submit", "cancel"], ["class", "row", 4, "ngIf"], [1, "row"], ["controlName", "data", 3, "size", "label", "control", "labelInfo"], ["type", "warning", "message", "Dica: N\u00E3o \u00E9 necess\u00E1rio suspender a tarefa entre as jornadas de trabalho!"], ["label", "In\u00EDcio da pausa", "controlName", "inicio", "disabled", "", "labelInfo", "Data de inicio da \u00FAltima pausa", 3, "size", "control"]], template: function AtividadeFormPausarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, AtividadeFormPausarComponent_top_alert_0_Template, 1, 0, "top-alert", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "editable-form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function AtividadeFormPausarComponent_Template_editable_form_submit_1_listener() { return ctx.onSaveData(); })("cancel", function AtividadeFormPausarComponent_Template_editable_form_cancel_1_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AtividadeFormPausarComponent_div_2_Template, 2, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "input-datetime", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.reiniciar);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.reiniciar);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", ctx.reiniciar ? "Data de rein\u00EDcio" : "Data da pausa")("control", ctx.form.controls.data)("labelInfo", ctx.reiniciar ? "Data e hora do rein\u00EDcio da atividade" : "Data e hora do in\u00EDcio da pausa/suspens\u00E3o");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_7__["InputDatetimeComponent"], _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_8__["TopAlertComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtZm9ybS1wYXVzYXIuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "cAq/":
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-tarefa/atividade-form-tarefa.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: AtividadeFormTarefaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeFormTarefaComponent", function() { return AtividadeFormTarefaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ "EwcK");
/* harmony import */ var src_app_dao_tipo_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-tarefa-dao.service */ "EwTJ");
/* harmony import */ var src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/atividade-tarefa-dao.service */ "+/Co");
/* harmony import */ var src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/atividade-tarefa.model */ "KY1u");
/* harmony import */ var src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/tipo-processo-dao.service */ "VW5Q");
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/navigate.service */ "RANn");
/* harmony import */ var src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/comentario.service */ "GCzM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-link/documentos-link.component */ "7WLf");
/* harmony import */ var _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios.component */ "KuoT");





















const _c0 = ["documento"];
const _c1 = ["comentarios"];
const _c2 = ["tipoTarefa"];
class AtividadeFormTarefaComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_7__["AtividadeTarefa"], src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_6__["AtividadeTarefaDaoService"]);
        this.injector = injector;
        this.modalWidth = 800;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (["descricao"].includes(controlName) && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.formValidation = (form) => {
            var _a, _b, _c, _d, _e;
            const values = form.value;
            if (((_a = values.tipo_tarefa_id) === null || _a === void 0 ? void 0 : _a.length) && !((_b = this.tipoTarefa) === null || _b === void 0 ? void 0 : _b.searchObj)) {
                return "Aguarde o carregamento " + this.lex.translate("tipo de tarefa") + ". Caso demore, selecione novamente!";
            }
            if (values.concluido && ((_d = (_c = this.tipoTarefa) === null || _c === void 0 ? void 0 : _c.searchObj) === null || _d === void 0 ? void 0 : _d.documental) && ((_e = this.documento) === null || _e === void 0 ? void 0 : _e.isEmpty())) {
                return this.gb.isEmbedded ? "Obrigatório selecionar um arquivo para a tarefa selecionada!" : "Utilize o sistema como extensão para concluir!";
            }
            return undefined;
        };
        this.tipoTarefaDao = injector.get(src_app_dao_tipo_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_5__["TipoTarefaDaoService"]);
        this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_4__["TipoDocumentoDaoService"]);
        this.tipoProcessoDao = injector.get(src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_8__["TipoProcessoDaoService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_3__["ListenerAllPagesService"]);
        this.comentario = injector.get(src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_10__["ComentarioService"]);
        this.title = this.lex.translate("Tarefa da atividade");
        this.form = this.fh.FormBuilder({
            descricao: { default: "" },
            tarefa_id: { default: null },
            tempo_estimado: { default: 0 },
            concluido: { default: false },
            id_processo: { default: 0 },
            numero_processo: { default: "" },
            documento: { default: null },
            comentarios: { default: [] }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        var _a;
        super.ngOnInit();
        const segment = (this.url ? (_a = this.url[this.url.length - 1]) === null || _a === void 0 ? void 0 : _a.path : "") || "";
        this.action = segment == "comentar" ? segment : this.action;
    }
    loadData(entity, form) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            yield ((_a = this.tipoTarefa) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.tipo_tarefa || formValue.tipo_tarefa_id));
            formValue.comentarios = this.comentario.orderComentarios(formValue.comentarios || []);
            form.patchValue(formValue);
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = this.metadata.tarefa;
            this.atividade = this.metadata.atividade;
            this.sei = this.metadata.sei;
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            (_a = this.comentarios) === null || _a === void 0 ? void 0 : _a.confirm();
            this.util.fillForm(this.entity, this.form.value);
            this.entity.tipo_tarefa = (_b = this.tipoTarefa) === null || _b === void 0 ? void 0 : _b.searchObj;
            return new src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_9__["NavigateResult"](this.entity);
        });
    }
    onTipoTarefaSelect(item) {
        const tipoTarefa = item.entity;
        this.form.controls.tempo_estimado.setValue((tipoTarefa === null || tipoTarefa === void 0 ? void 0 : tipoTarefa.tempo_estimado) || 0);
    }
}
AtividadeFormTarefaComponent.ɵfac = function AtividadeFormTarefaComponent_Factory(t) { return new (t || AtividadeFormTarefaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["Injector"])); };
AtividadeFormTarefaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: AtividadeFormTarefaComponent, selectors: [["app-atividade-form-tarefa"]], viewQuery: function AtividadeFormTarefaComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c2, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.documento = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.comentarios = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.tipoTarefa = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]], decls: 16, vars: 17, consts: [[3, "form", "disabled", "submit", "cancel"], ["display", "", "right", "", 3, "title"], ["key", "TAREFA", 3, "label"], [1, "row"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", 3, "size", "rows", "control"], ["controlName", "tipo_tarefa_id", 3, "label", "size", "dao", "select"], ["tipoTarefa", ""], ["onlyHours", "", "label", "Tempo estimado", "controlName", "tempo_estimado", "labelInfo", "Tempo estimado de execu\u00E7\u00E3o", 3, "size", "control"], ["label", "Conclu\u00EDdo", "controlName", "concluido", "labelInfo", "Se foi conclu\u00EDda", 3, "size", "control"], [3, "sei", "documento"], ["documento", ""], ["key", "COMENTARIOS", "label", "Comentarios"], ["clss", "row"], ["origem", "ATIVIDADE_TAREFA", 3, "control"], ["comentarios", ""]], template: function AtividadeFormTarefaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function AtividadeFormTarefaComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function AtividadeFormTarefaComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "input-textarea", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("select", function AtividadeFormTarefaComponent_Template_input_search_select_6_listener($event) { return ctx.onTipoTarefaSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "input-timer", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "input-switch", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "documento-link", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "tab", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](14, "comentarios", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("title", !ctx.isModal ? ctx.title : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("label", ctx.lex.translate("Tarefa da Atividade"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx.form.controls.descricao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de Tarefa"))("size", 7)("dao", ctx.tipoTarefaDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tempo_estimado);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.concluido);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("sei", ctx.sei)("documento", ctx.form.controls.documento.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("control", ctx.form.controls.comentarios);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_12__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__["TabComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_14__["InputTextareaComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__["InputSearchComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_16__["InputTimerComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_17__["InputSwitchComponent"], _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_18__["DocumentosLinkComponent"], _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_19__["ComentariosComponent"]], styles: ["@charset \"UTF-8\";\n.comentario-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.comentario-user[_ngcontent-%COMP%] {\n  width: 50px;\n  vertical-align: top;\n  padding: 8px;\n}\n.comentario-container[_ngcontent-%COMP%] {\n  padding-left: 10px;\n  width: auto;\n  border-left: var(--bs-gray-400) 2px solid;\n  position: relative;\n}\n.comentario-user-indicator[_ngcontent-%COMP%] {\n  content: \"\";\n  position: absolute;\n  width: 0px;\n  height: 0px;\n  top: 0px;\n  left: -12px;\n  border-top: 0.75rem solid var(--bs-gray-400);\n  border-left: 0.75rem solid transparent;\n}\n.comentario-level[_ngcontent-%COMP%] {\n  color: var(--bs-gray);\n}\n.comentario-message-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.7em;\n  color: var(--bs-gray);\n}\n.comentario-message-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]::before {\n  content: \" \u2022 \";\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2F0aXZpZGFkZS1mb3JtLXRhcmVmYS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7RUFDSSxXQUFBO0FBRUo7QUFBQTtFQUNJLFdBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFHSjtBQURBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EseUNBQUE7RUFDQSxrQkFBQTtBQUlKO0FBRkE7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsNENBQUE7RUFDQSxzQ0FBQTtBQUtKO0FBSEE7RUFDSSxxQkFBQTtBQU1KO0FBSEk7RUFDSSxnQkFBQTtFQUNBLHFCQUFBO0FBTVI7QUFKSTtFQUNJLGNBQUE7QUFNUiIsImZpbGUiOiJhdGl2aWRhZGUtZm9ybS10YXJlZmEuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29tZW50YXJpby10YWJsZSB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4uY29tZW50YXJpby11c2VyIHtcbiAgICB3aWR0aDogNTBweDsgXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDsgXG4gICAgcGFkZGluZzogOHB4O1xufVxuLmNvbWVudGFyaW8tY29udGFpbmVyIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgYm9yZGVyLWxlZnQ6IHZhcigtLWJzLWdyYXktNDAwKSAycHggc29saWQ7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmNvbWVudGFyaW8tdXNlci1pbmRpY2F0b3Ige1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAwcHg7XG4gICAgaGVpZ2h0OiAwcHg7XG4gICAgdG9wOiAwcHg7XG4gICAgbGVmdDogLTEycHg7XG4gICAgYm9yZGVyLXRvcDogLjc1cmVtIHNvbGlkIHZhcigtLWJzLWdyYXktNDAwKTtcbiAgICBib3JkZXItbGVmdDogLjc1cmVtIHNvbGlkIHRyYW5zcGFyZW50O1xufVxuLmNvbWVudGFyaW8tbGV2ZWwge1xuICAgIGNvbG9yOiB2YXIoLS1icy1ncmF5KTtcbn1cbi5jb21lbnRhcmlvLW1lc3NhZ2UtdGl0bGUge1xuICAgIHNwYW4ge1xuICAgICAgICBmb250LXNpemU6IDAuN2VtO1xuICAgICAgICBjb2xvcjogdmFyKC0tYnMtZ3JheSk7XG4gICAgfVxuICAgIHNwYW46OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6IFwiIOKAoiBcIjtcbiAgICB9XG59Il19 */"] });


/***/ }),

/***/ "gPUr":
/*!*****************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-iniciar/atividade-form-iniciar.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: AtividadeFormIniciarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeFormIniciarComponent", function() { return AtividadeFormIniciarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ "+jod");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");














const _c0 = ["usuario"];
const _c1 = ["planoTrabalho"];
const _c2 = ["planejado"];
const _c3 = function () { return ["planos_trabalho.tipo_modalidade:id,nome", "planos_trabalho.entregas.entrega:id,nome"]; };
class AtividadeFormIniciarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"], src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__["AtividadeDaoService"]);
        this.injector = injector;
        this.modalWidth = 600;
        this.iniciadas = [];
        this.planosTrabalhos = [];
        this.planosTrabalhosEntregas = [];
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (["usuario_id", "plano_trabalho_id"].includes(controlName) && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            else if (controlName == "data_inicio" && !control.value) {
                result = "Obrigatório";
            }
            return result;
        };
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioDaoService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_6__["CalendarService"]);
        this.form = this.fh.FormBuilder({
            usuario_id: { default: undefined },
            plano_trabalho_id: { default: undefined },
            plano_trabalho_entrega_id: { default: undefined },
            data_distribuicao: { default: new Date() },
            prazo_entrega: { default: new Date() },
            carga_horaria: { default: 0 },
            tempo_planejado: { default: 0 },
            esforco: { default: 0 },
            data_inicio: { default: null },
            suspender: { default: false }
        }, this.cdRef, this.validate);
        this.join = ["unidade", "atividade", "usuario.planos_trabalho.tipo_modalidade", "usuario.planos_trabalho.entregas.entrega:id,nome"];
    }
    get labelInfoSuspender() {
        const n = this.iniciadas.length > 1 ? this.lex.translate("tarefas") : this.lex.translate("tarefa");
        const s = this.iniciadas.length == 1 ? "" : "s";
        const q = this.iniciadas.length == 1 ? "" : " " + this.iniciadas.length.toString();
        return this.iniciadas.length ? `Suspender a${s}${q} ${n} já iniciada${s}?` : "Não há outras atividades iniciadas pelo usuário!";
    }
    loadIniciadas(usuario_id) {
        this.iniciadas = [];
        if (usuario_id === null || usuario_id === void 0 ? void 0 : usuario_id.length) {
            this.dao.iniciadas(usuario_id).then(idsIniciadas => {
                this.iniciadas = idsIniciadas;
                this.cdRef.detectChanges();
            });
        }
    }
    onUsuarioSelect(item) {
        var _a;
        const usuario = item.entity;
        const planosTrabalhos = (usuario === null || usuario === void 0 ? void 0 : usuario.planos_trabalho) || [];
        this.planosTrabalhos = planosTrabalhos.filter(x => x.unidade_id == this.entity.unidade_id).map(x => {
            var _a;
            return {
                key: x.id,
                value: (((_a = x.tipo_modalidade) === null || _a === void 0 ? void 0 : _a.nome) || "") + " - " + this.dao.getDateFormatted(x.data_inicio_vigencia) + " à " + this.dao.getDateFormatted(x.data_fim_vigencia),
                data: x
            };
        });
        this.cdRef.detectChanges();
        if (!((_a = this.form.controls.plano_trabalho_id.value) === null || _a === void 0 ? void 0 : _a.length) && this.planosTrabalhos.length == 1) {
            this.form.controls.plano_trabalho_id.setValue(this.planosTrabalhos[0].key);
        }
        this.cdRef.detectChanges();
    }
    onPlanoChange(event) {
        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            if (this.entity) {
                const planoTrabalho = (_b = (_a = this.planoTrabalho) === null || _a === void 0 ? void 0 : _a.selectedItem) === null || _b === void 0 ? void 0 : _b.data;
                const planoTrabalhoEntregaId = this.form.controls.plano_trabalho_entrega_id.value;
                /*if(plano && this.form!.controls.unidade_id.value != plano.unidade_id) {
                  const unidade = await this.unidadeDao.getById(plano.unidade_id);
                  if(unidade) {
                    await this.unidade?.loadSearch(unidade);
                    await this.auth.selecionaUnidade(unidade.id);
                  }
                }*/
                const cargaHoraria = (planoTrabalho === null || planoTrabalho === void 0 ? void 0 : planoTrabalho.carga_horaria) || this.calendar.expedienteMedio(this.entity.unidade);
                const tempo_planejado = this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.prazo_entrega.value, cargaHoraria, this.entity.unidade, "DISTRIBUICAO");
                this.form.controls.carga_horaria.setValue(cargaHoraria);
                this.form.controls.tempo_planejado.setValue(tempo_planejado);
                this.form.controls.esforco.setValue(this.form.controls.esforco.value || ((_d = (_c = this.entity) === null || _c === void 0 ? void 0 : _c.tipo_atividade) === null || _d === void 0 ? void 0 : _d.esforco) || 0);
                /* Carrega entregas */
                this.planosTrabalhosEntregas = ((_e = planoTrabalho.entregas) === null || _e === void 0 ? void 0 : _e.map(x => Object.assign({}, {
                    key: x.id,
                    value: x.descricao + (x.entrega ? " (" + x.entrega.nome + ")" : ""),
                    data: x
                }))) || [];
                this.cdRef.detectChanges();
                this.form.controls.plano_trabalho_entrega_id.setValue(!(planoTrabalhoEntregaId === null || planoTrabalhoEntregaId === void 0 ? void 0 : planoTrabalhoEntregaId.length) && this.planosTrabalhos.length > 0 ? this.planosTrabalhos[0].key : planoTrabalhoEntregaId);
            }
        }))();
    }
    loadData(entity, form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            if (!((_a = formValue.usuario_id) === null || _a === void 0 ? void 0 : _a.length)) {
                formValue.usuario_id = (_b = this.auth.usuario) === null || _b === void 0 ? void 0 : _b.id;
            }
            formValue.data_inicio = formValue.data_inicio || this.util.setStrTime(new Date(), this.auth.unidadeHora);
            yield this.usuario.loadSearch(entity.usuario || formValue.usuario_id);
            this.loadIniciadas(formValue.usuario_id);
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            form.patchValue(formValue);
            this.onPlanoChange(new Event('change'));
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getById(this.urlParams.get("id"), this.join));
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let atividade = this.util.fill(new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"](), this.entity);
            atividade = this.util.fillForm(atividade, this.form.value);
            atividade.id = this.entity.id;
            atividade.suspender = this.form.controls.suspender.value;
            this.dao.iniciar(atividade).then(saved => resolve(saved)).catch(reject);
        });
    }
}
AtividadeFormIniciarComponent.ɵfac = function AtividadeFormIniciarComponent_Factory(t) { return new (t || AtividadeFormIniciarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
AtividadeFormIniciarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: AtividadeFormIniciarComponent, selectors: [["app-atividade-form-iniciar"]], viewQuery: function AtividadeFormIniciarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c2, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.planoTrabalho = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.planejado = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 17, vars: 28, consts: [[3, "form", "disabled", "submit", "cancel"], [1, "row"], ["controlName", "data_distribuicao", "disabled", "", "labelInfo", "Data de cadastro da atividade", 3, "size", "label", "control"], ["controlName", "prazo_entrega", "disabled", "", "labelInfo", "Data estipulada para entrega da atividade", 3, "size", "label", "control"], ["label", "Respons\u00E1vel", "controlName", "usuario_id", "labelInfo", "Respons\u00E1vel por executar a atividade", 3, "size", "dao", "join", "select"], ["usuario", ""], ["controlName", "plano_trabalho_id", 3, "label", "size", "control", "items", "labelInfo", "change"], ["planoTrabalho", ""], ["controlName", "plano_trabalho_entrega_id", 3, "label", "size", "control", "items", "labelInfo"], ["entrega", ""], ["label", "Inicio", "controlName", "data_inicio", "labelInfo", "Data em que o usu\u00E1rio iniciou a atividade", 3, "size", "control"], ["label", "Suspender as demais", "controlName", "suspender", 3, "size", "control", "disabled", "labelInfo"]], template: function AtividadeFormIniciarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("submit", function AtividadeFormIniciarComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function AtividadeFormIniciarComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "input-datetime", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "input-datetime", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "input-search", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("select", function AtividadeFormIniciarComponent_Template_input_search_select_6_listener($event) { return ctx.onUsuarioSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "input-select", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function AtividadeFormIniciarComponent_Template_input_select_change_9_listener($event) { return ctx.onPlanoChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "input-select", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "input-datetime", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "input-switch", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("label", ctx.lex.translate("Data de distribui\u00E7\u00E3o"))("control", ctx.form.controls.data_distribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("label", ctx.lex.translate("Prazo de entrega"))("control", ctx.form.controls.prazo_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("dao", ctx.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](27, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", ctx.lex.translate("Plano de trabalho"))("size", 7)("control", ctx.form.controls.plano_trabalho_id)("items", ctx.planosTrabalhos)("labelInfo", ctx.lex.translate("Plano de trabalho"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", ctx.lex.translate("Entrega do plano"))("size", 5)("control", ctx.form.controls.plano_trabalho_entrega_id)("items", ctx.planosTrabalhosEntregas)("labelInfo", ctx.lex.translate("Entrega") + " do " + ctx.lex.translate("plano de trabalho") + " que a " + ctx.lex.translate("atividade") + " \u00E9 referente");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.data_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.suspender)("disabled", !ctx.iniciadas.length ? "" : undefined)("labelInfo", ctx.labelInfoSuspender);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_8__["InputDatetimeComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_9__["SeparatorComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__["InputSelectComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__["InputSwitchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtZm9ybS1pbmljaWFyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "lAQF":
/*!**********************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-routing.module.ts ***!
  \**********************************************************************/
/*! exports provided: AtividadeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeRoutingModule", function() { return AtividadeRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _atividade_form_concluir_atividade_form_concluir_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./atividade-form-concluir/atividade-form-concluir.component */ "lBET");
/* harmony import */ var _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./atividade-form-tarefa/atividade-form-tarefa.component */ "cAq/");
/* harmony import */ var _atividade_form_iniciar_atividade_form_iniciar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./atividade-form-iniciar/atividade-form-iniciar.component */ "gPUr");
/* harmony import */ var _atividade_form_pausar_atividade_form_pausar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./atividade-form-pausar/atividade-form-pausar.component */ "VCMZ");
/* harmony import */ var _atividade_form_prorrogar_atividade_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./atividade-form-prorrogar/atividade-form-prorrogar.component */ "Ees2");
/* harmony import */ var _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./atividade-form/atividade-form.component */ "1zD2");
/* harmony import */ var _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./atividade-list-tarefa/atividade-list-tarefa.component */ "sPM3");
/* harmony import */ var _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./atividade-list-grid/atividade-list-grid.component */ "GLIe");
/* harmony import */ var _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./atividade-list/atividade-list.component */ "w/7R");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "fXoL");














const routes = [
    { path: '', component: _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_11__["AtividadeListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Atividades" } },
    { path: 'grid', component: _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_10__["AtividadeListGridComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Atividades" } },
    { path: 'new', component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_8__["AtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Inclusão de Atividade", modal: true } },
    { path: 'tarefa', component: _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_4__["AtividadeFormTarefaComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Tarefa da Atividade", modal: true } },
    { path: 'tarefa/concluir', component: _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_9__["AtividadeListTarefaComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Concluir Tarefa", modal: true } },
    { path: 'tarefa/:tarefa_id/comentar', component: _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_4__["AtividadeFormTarefaComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Comentários", modal: true } },
    { path: ':id/edit', component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_8__["AtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Edição da Atividade", modal: true } },
    { path: ':id/consult', component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_8__["AtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Consulta a Atividade", modal: true } },
    { path: ':id/clonar', component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_8__["AtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Clone de Atividade", modal: true } },
    { path: ':id/iniciar', component: _atividade_form_iniciar_atividade_form_iniciar_component__WEBPACK_IMPORTED_MODULE_5__["AtividadeFormIniciarComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Início de Atividade", modal: true } },
    { path: ':id/concluir', component: _atividade_form_concluir_atividade_form_concluir_component__WEBPACK_IMPORTED_MODULE_3__["AtividadeFormConcluirComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Conclusão de Atividade", modal: true } },
    { path: ':id/pausar', component: _atividade_form_pausar_atividade_form_pausar_component__WEBPACK_IMPORTED_MODULE_6__["AtividadeFormPausarComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Suspensão de Atividade", modal: true } },
    { path: ':id/prorrogar', component: _atividade_form_prorrogar_atividade_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_7__["AtividadeFormProrrogarComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Prorrogação de Atividade", modal: true } },
    { path: ':id/comentar', component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_8__["AtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Comentários de Atividade", modal: true } }
];
class AtividadeRoutingModule {
}
AtividadeRoutingModule.ɵfac = function AtividadeRoutingModule_Factory(t) { return new (t || AtividadeRoutingModule)(); };
AtividadeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: AtividadeRoutingModule });
AtividadeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](AtividadeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "lBET":
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-concluir/atividade-form-concluir.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: AtividadeFormConcluirComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeFormConcluirComponent", function() { return AtividadeFormConcluirComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/atividade.model */ "+jod");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ "EwcK");
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ "LYCz");
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/documento.model */ "xrhv");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-link/documentos-link.component */ "7WLf");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../atividade-list-tarefa/atividade-list-tarefa.component */ "sPM3");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ "imFN");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../uteis/calendar-efemerides/calendar-efemerides.component */ "A5xB");























const _c0 = ["tipoAtividade"];
const _c1 = ["docEntregue"];
function AtividadeFormConcluirComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "input-datetime", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "input-number", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "input-datetime", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("label", ctx_r2.lex.translate("Distribui\u00E7\u00E3o"))("control", ctx_r2.form.controls.data_distribuicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("decimals", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("label", ctx_r2.lex.translate("Prazo de entrega"))("control", ctx_r2.form.controls.prazo_entrega);
} }
function AtividadeFormConcluirComponent_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "input-datetime", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "input-timer", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "input-number", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "input-datetime", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("label", ctx_r4.lex.translate("Distribui\u00E7\u00E3o"))("control", ctx_r4.form.controls.data_distribuicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("label", ctx_r4.lex.translate("Esfor\u00E7o"))("control", ctx_r4.form.controls.esforco);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("decimals", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("label", ctx_r4.lex.translate("Prazo de entrega"))("control", ctx_r4.form.controls.prazo_entrega);
} }
function AtividadeFormConcluirComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "input-datetime", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "input-datetime", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function AtividadeFormConcluirComponent_div_16_Template_input_datetime_change_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r9.onDataEntregaChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "input-datetime", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.data_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.data_inicio);
} }
function AtividadeFormConcluirComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "input-datetime", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "input-datetime", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function AtividadeFormConcluirComponent_ng_template_17_Template_input_datetime_change_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r11.onDataEntregaChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "input-timer", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "input-datetime", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx_r7.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx_r7.form.controls.data_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx_r7.form.controls.tempo_despendido);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx_r7.form.controls.data_inicio);
} }
function AtividadeFormConcluirComponent_separator_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "separator", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "calendar-efemerides", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("efemerides", ctx_r8.efemerides);
} }
class AtividadeFormConcluirComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_4__["Atividade"], src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_3__["AtividadeDaoService"]);
        this.injector = injector;
        this.modalWidth = 800;
        this.entregas = [];
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if ((controlName == "plano_trabalho_entrega_id" && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) ||
                (controlName == "data_entrega" && !this.util.isDataValid(control.value))) {
                result = "Obrigatório";
            }
            return result;
        };
        this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_7__["TipoAtividadeDaoService"]);
        this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_6__["TipoDocumentoDaoService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_5__["CalendarService"]);
        this.form = this.fh.FormBuilder({
            tipo_atividade_id: { default: null },
            data_distribuicao: { default: null },
            esforco: { default: 0 },
            progresso: { default: 0 },
            prazo_entrega: { default: null },
            data_inicio: { default: null },
            tempo_despendido: { default: 0 },
            data_entrega: { default: null },
            arquivar: { default: true },
            descricao_tecnica: { default: "" },
            documento_entrega: { default: new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_8__["Documento"]() },
            documento_entrega_id: { default: null },
            plano_trabalho_entrega_id: { default: null }
        }, this.cdRef, this.validate);
        this.join = ["plano_trabalho.tipo_modalidade", "unidade", "plano_trabalho.entregas.entrega:id,nome"];
    }
    loadData(entity, form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            formValue.data_entrega = this.auth.hora;
            formValue.progresso = 100;
            yield this.tipoAtividade.loadSearch(entity.tipo_atividade || formValue.tipo_atividade_id);
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            this.entregas = ((_b = (_a = entity.plano_trabalho) === null || _a === void 0 ? void 0 : _a.entregas) === null || _b === void 0 ? void 0 : _b.map(x => Object.assign({}, {
                key: x.id,
                value: x.descricao + (x.entrega ? " (" + x.entrega.nome + ")" : ""),
                data: x
            }))) || [];
            formValue.arquivar = true; //!!this.entity?.plano?.tipo_modalidade?.dispensa_avaliacao; 
            form.patchValue(formValue);
            this.onDataEntregaChange();
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getAtividade(this.urlParams.get("id")));
            yield this.loadData(this.entity, form);
        });
    }
    onDataEntregaChange(event) {
        var _a;
        const entrega = this.form.controls.data_entrega.value;
        const inicio = this.entity.data_inicio;
        const cargaHoraria = this.entity.carga_horaria;
        const unidade = this.entity.unidade;
        const pausas = this.entity.pausas || [];
        const afastamentos = ((_a = this.entity.usuario) === null || _a === void 0 ? void 0 : _a.afastamentos) || [];
        this.efemerides = this.util.isDataValid(entrega) ? this.calendar.calculaDataTempoUnidade(inicio, entrega, cargaHoraria, unidade, "ENTREGA", pausas, afastamentos) : undefined;
        if (this.efemerides) {
            this.form.controls.tempo_despendido.setValue(this.efemerides.tempoUtil);
            this.cdRef.detectChanges();
        }
    }
    onTipoAtividadeSelect(item) {
        const tipoAtividade = item.entity;
        this.form.controls.esforco.setValue((tipoAtividade === null || tipoAtividade === void 0 ? void 0 : tipoAtividade.esforco) || 0);
        this.cdRef.detectChanges();
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a, _b, _c;
            let atividade = this.util.fill(new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_4__["Atividade"](), this.entity);
            atividade = this.util.fillForm(atividade, this.form.value);
            atividade.id = this.entity.id;
            atividade.descricao_tecnica = this.form.controls.descricao_tecnica.value;
            atividade.data_arquivamento = this.form.controls.arquivar.value ? new Date() : null;
            atividade.progresso = this.form.controls.progresso.value;
            atividade.produtividade = ((_c = (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.plano_trabalho) === null || _b === void 0 ? void 0 : _b.tipo_modalidade) === null || _c === void 0 ? void 0 : _c.atividade_tempo_despendido) ? this.calendar.produtividade(atividade.esforco, atividade.tempo_despendido) : null;
            this.dao.concluir(atividade).then(saved => resolve(saved)).catch(reject);
        });
    }
}
AtividadeFormConcluirComponent.ɵfac = function AtividadeFormConcluirComponent_Factory(t) { return new (t || AtividadeFormConcluirComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["Injector"])); };
AtividadeFormConcluirComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: AtividadeFormConcluirComponent, selectors: [["app-atividade-form-concluir"]], viewQuery: function AtividadeFormConcluirComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.tipoAtividade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.docEntregue = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 21, vars: 26, consts: [[3, "form", "disabled", "submit", "cancel"], [3, "documento"], [1, "row"], ["controlName", "tipo_atividade_id", 3, "label", "emptyValue", "size", "dao", "select"], ["tipoAtividade", ""], ["controlName", "plano_trabalho_entrega_id", 3, "label", "size", "control", "items", "labelInfo"], ["entrega", ""], ["label", "Arquivar", "controlName", "arquivar", "labelInfo", "Arquivar automaticamente ap\u00F3s a conclus\u00E3o (Somente se o plano dispensar avalia\u00E7\u00E3o)", 3, "size", "control"], ["label", "Descri\u00E7\u00E3o t\u00E9cnica", "controlName", "descricao_tecnica", 3, "size", "rows", "control"], ["collapse", "", 3, "title", "collapsed"], ["persist", "", 3, "atividade"], ["class", "row", 4, "ngIf", "ngIfElse"], ["comEsforco", ""], ["title", "Conclus\u00E3o"], ["comTempoDespendido", ""], ["title", "C\u00E1lculos das horas", "collapse", "", 4, "ngIf"], ["noIcon", "", "controlName", "data_distribuicao", "labelInfo", "Data de inclus\u00E3o/distribui\u00E7\u00E3o/lan\u00E7amento", 3, "size", "label", "control"], ["label", "Progresso", "disabled", "", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso de execu\u00E7\u00E3o (% Conclu\u00EDdo). Sempre ser\u00E1 100% na conclus\u00E3o!", 3, "size", "decimals"], ["noIcon", "", "controlName", "prazo_entrega", "labelInfo", "Data estipulada para entrega da atividade", 3, "size", "label", "control"], ["noIcon", "", "disabled", "", "controlName", "data_distribuicao", "labelInfo", "Data de inclus\u00E3o/distribui\u00E7\u00E3o/lan\u00E7amento", 3, "size", "label", "control"], ["icon", "bi bi-stopwatch", "onlyHours", "", "controlName", "esforco", "labelInfo", "Tempo estimado de execu\u00E7\u00E3o", 3, "size", "label", "control"], ["noIcon", "", "disabled", "", "controlName", "prazo_entrega", "labelInfo", "Data estipulada para entrega da atividade", 3, "size", "label", "control"], ["noIcon", "", "label", "Inicio", "controlName", "data_inicio", "disabled", "", "labelInfo", "Data em que o usu\u00E1rio iniciou a atividade", 3, "size", "control"], ["noIcon", "", "label", "Conclus\u00E3o", "controlName", "data_entrega", "labelInfo", "Data da conclus\u00E3o da atividade", 3, "size", "control", "change"], ["label", "Data de arquivamento", "controlName", "data_arquivamento", "disabled", "", "labelInfo", "Data de arquivamento da atividade", 3, "size", "control"], ["label", "Tempo despendido", "icon", "bi bi-hourglass-bottom", "controlName", "tempo_despendido", "disabled", "", "labelInfo", "Calculado no fim da atividade, sendo o tempo l\u00EDquido (considerando pausas)", 3, "size", "control"], ["title", "C\u00E1lculos das horas", "collapse", ""], [3, "efemerides"]], template: function AtividadeFormConcluirComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function AtividadeFormConcluirComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function AtividadeFormConcluirComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "documento-link", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "input-search", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("select", function AtividadeFormConcluirComponent_Template_input_search_select_3_listener($event) { return ctx.onTipoAtividadeSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "input-select", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](7, "input-switch", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "input-textarea", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "separator", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "atividade-list-tarefa", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, AtividadeFormConcluirComponent_div_12_Template, 4, 8, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, AtividadeFormConcluirComponent_ng_template_13_Template, 5, 11, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "separator", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](16, AtividadeFormConcluirComponent_div_16_Template, 4, 6, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](17, AtividadeFormConcluirComponent_ng_template_17_Template, 5, 8, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](19, "documento-link", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](20, AtividadeFormConcluirComponent_separator_20_Template, 2, 1, "separator", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](14);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("documento", ctx.form.controls.documento_entrega.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de Atividade"))("emptyValue", null)("size", 5)("dao", ctx.tipoAtividadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", ctx.lex.translate("Entrega do plano"))("size", 5)("control", ctx.form.controls.plano_trabalho_entrega_id)("items", ctx.entregas)("labelInfo", ctx.lex.translate("Entrega do plano") + " que a " + ctx.lex.translate("atividade") + " \u00E9 referente");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.arquivar);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx.form.controls.descricao_tecnica);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", ctx.lex.translate("Tarefa da atividade"))("collapsed", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("atividade", ctx.entity);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !(ctx.entity == null ? null : ctx.entity.plano_trabalho == null ? null : ctx.entity.plano_trabalho.tipo_modalidade == null ? null : ctx.entity.plano_trabalho.tipo_modalidade.atividade_esforco))("ngIfElse", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !(ctx.entity == null ? null : ctx.entity.plano_trabalho == null ? null : ctx.entity.plano_trabalho.tipo_modalidade == null ? null : ctx.entity.plano_trabalho.tipo_modalidade.atividade_tempo_despendido))("ngIfElse", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("documento", ctx.form.controls.documento_entrega.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.efemerides && (ctx.entity == null ? null : ctx.entity.plano_trabalho == null ? null : ctx.entity.plano_trabalho.tipo_modalidade == null ? null : ctx.entity.plano_trabalho.tipo_modalidade.atividade_tempo_despendido));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_10__["DocumentosLinkComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__["InputSelectComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__["InputSwitchComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_14__["InputTextareaComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__["SeparatorComponent"], _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_16__["AtividadeListTarefaComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_17__["NgIf"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_18__["InputDatetimeComponent"], _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_19__["InputNumberComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_20__["InputTimerComponent"], _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_21__["CalendarEfemeridesComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtZm9ybS1jb25jbHVpci5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "q5se":
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-dashboard/atividade-dashboard.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: AtividadeDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeDashboardComponent", function() { return AtividadeDashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_form_helper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/form-helper.service */ "mp9f");
/* harmony import */ var _atividade_list_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../atividade-list-base */ "BD6R");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");





const _c0 = ["programa"];
const _c1 = ["unidadesSubordinadas"];
class AtividadeDashboardComponent extends _atividade_list_base__WEBPACK_IMPORTED_MODULE_2__["AtividadeListBase"] {
    /*public static selectRoute?: FullRoute = { route: ["gestao", "atividade", "grid"] };
    public programaSelecionado: Programa | null = null;
    public totalPlanosAtivos: number = 0;
    public totalServidores: number = 0;
    public totalUnidades: number | undefined = 0;
    public unidades: string[] | undefined;
    public filter?: FormGroup;
    public filterWhere?: (filter: FormGroup) => any[];
    public programaDao: ProgramaDaoService;*/
    // Variáveis associadas aos objetos gráficos
    /*public opcoesGraficoNrPlanos: ChartOptions = {};
    public opcoesGraficoServidores: ChartOptions = {};
    public opcoesGraficoModalidades: ChartOptions = {};
    public dadosGraficoNrPlanos: ChartData = {};
    public dadosGraficoServidores: ChartData = {};
    public dadosGraficoModalidades: ChartData = {};
    public dashUnidades: UnidadeDashboard[] | null = [];
    public labelsGraficosAreasEServidores: string[] = [];
    public alturaAreaGrafico: string = '300px';*/
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            /*if(controlName == 'programa_id' && !control.value?.length) {
              result = "Obrigatório";
            }*/
            return result;
        };
        /* Inicializações */
        //this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
        this.title = this.lex.translate("Atividades");
        this.code = "MOD_DMD";
        this.fh = this.injector.get(src_app_services_form_helper_service__WEBPACK_IMPORTED_MODULE_1__["FormHelperService"]);
        this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]);
        this.filter = this.fh.FormBuilder({
            programa_id: { default: "" },
            unidadesSubordinadas: { default: false }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        /* TODO
        Chart.plugins.register(ChartDataLabels);
        this.unidades = this.auth.unidades?.map(x => x.id);
        this.programaDao.query({where: [
          ["normativa", "!=", null],
          ["unidade_id", "==",this.auth.unidade!.id],
          ["data_fim", "==", null],
          //["data_fim_vigencia", ">=", Date.now()]
        ]}).asPromise().then((programas) => {
          this.programaSelecionado = programas.sort((a, b) => b.data_inicio_vigencia.getMilliseconds() - a.data_inicio_vigencia.getMilliseconds())[0];
          this.programa?.loadSearch(this.programaSelecionado);
        });
        Promise.all([
          this.programaDao.getById(this.filter!.controls.programa_id.value),
          this.unidadeDao.dashboards(this.unidades!, this.filter!.controls.programa_id.value, this.filter!.controls.unidadesSubordinadas.value)
        ]).then(results => {
          this.programaSelecionado = results[0];
          this.dashUnidades = results[1];
          this.cdRef.detectChanges;
          if (this.dashUnidades) {
            this.construirGraficoAreas(this.dashUnidades);
            this.construirGraficoServidores(this.dashUnidades);
            this.construirGraficoModalidades(this.dashUnidades);
          }
        });*/
    }
}
AtividadeDashboardComponent.ɵfac = function AtividadeDashboardComponent_Factory(t) { return new (t || AtividadeDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"])); };
AtividadeDashboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AtividadeDashboardComponent, selectors: [["atividade-dashboard"]], viewQuery: function AtividadeDashboardComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_3__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.unidadesSubordinadas = _t.first);
    } }, inputs: { snapshot: "snapshot", fixedFilter: "fixedFilter" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 0, vars: 0, template: function AtividadeDashboardComponent_Template(rf, ctx) { }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "sPM3":
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list-tarefa/atividade-list-tarefa.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: AtividadeListTarefaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeListTarefaComponent", function() { return AtividadeListTarefaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/atividade-tarefa-dao.service */ "+/Co");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/atividade-tarefa.model */ "KY1u");
/* harmony import */ var src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-base */ "Z2oO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-badge/documentos-badge.component */ "xctW");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios-widget/comentarios-widget.component */ "FCDt");















function AtividadeListTarefaComponent_ng_template_3_strong_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "strong", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"]((row_r11.tipo_tarefa == null ? null : row_r11.tipo_tarefa.nome) || "");
} }
function AtividadeListTarefaComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, AtividadeListTarefaComponent_ng_template_3_strong_0_Template, 2, 1, "strong", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
} if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r11.tipo_tarefa == null ? null : row_r11.tipo_tarefa.nome == null ? null : row_r11.tipo_tarefa.nome.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r11.descricao, " ");
} }
function AtividadeListTarefaComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "documentos-badge", 14);
} if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("documento", row_r14.documento);
} }
function AtividadeListTarefaComponent_ng_template_10_i_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "i", 17);
} }
function AtividadeListTarefaComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, AtividadeListTarefaComponent_ng_template_10_i_1_Template, 1, 0, "i", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r15 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r15.concluido);
} }
function AtividadeListTarefaComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "input-switch", 18);
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("control", ctx_r7.formEdit.controls.concluido);
} }
function AtividadeListTarefaComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "comentarios-widget", 19);
} if (rf & 2) {
    const row_r18 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("entity", row_r18)("noPersist", ctx_r9.isPersist ? undefined : "true")("selectable", ctx_r9.selectable)("grid", ctx_r9.grid)("save", ctx_r9.addComentarioResult.bind(ctx_r9));
} }
function AtividadeListTarefaComponent_column_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "column", 20);
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("onEdit", ctx_r10.editEntrega.bind(ctx_r10))("onDelete", ctx_r10.deleteEntrega.bind(ctx_r10));
} }
class AtividadeListTarefaComponent extends src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_6__["PageBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.disabled = false;
        this.editable = true;
        this.selectable = false;
        this.id_processo = 0;
        this.addComentarioButton = {
            icon: "bi bi-plus-circle",
            hint: "Incluir comentário"
        };
        this.editEntrega = (row) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.go.navigate({ route: ['gestao', 'atividade', 'tarefa'] }, { metadata: { tarefa: row, atividade: this.atividade }, modalClose: (modalResult) => {
                    if (modalResult) {
                        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                            var _a;
                            const tarefas = this.control.value;
                            const index = tarefas.findIndex(x => x.id == row.id);
                            if (index >= 0) {
                                modalResult._status = modalResult._status == "ADD" ? "ADD" : "EDIT";
                                if (this.isPersist && ((_a = this.atividade) === null || _a === void 0 ? void 0 : _a.tarefas)) {
                                    this.grid.error = undefined;
                                    try {
                                        this.dialog.showSppinerOverlay("Salvando dados do formulário");
                                        modalResult = yield this.dao.save(modalResult, this.join);
                                    }
                                    catch (error) {
                                        this.grid.error = error.message ? error.message : error;
                                        modalResult = undefined;
                                    }
                                    finally {
                                        this.dialog.closeSppinerOverlay();
                                    }
                                }
                                if (modalResult) {
                                    tarefas[index] = modalResult;
                                    this.control.setValue(tarefas);
                                }
                            }
                            this.cdRef.detectChanges();
                        }))();
                    }
                } });
            return undefined;
        });
        this.dao = injector.get(src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_3__["AtividadeTarefaDaoService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_4__["ListenerAllPagesService"]);
        this.formEdit = this.fh.FormBuilder({
            concluido: { default: false }
        });
        this.join = ["tipo_tarefa", "comentarios.usuario"];
    }
    set atividade(value) {
        if (this._atividade != value) {
            this._atividade = value;
            if (this.isPersist && (value === null || value === void 0 ? void 0 : value.tarefas)) {
                this.control.setValue(value === null || value === void 0 ? void 0 : value.tarefas);
            }
        }
    }
    get atividade() {
        return this._atividade;
    }
    ngOnInit() {
        var _a, _b, _c, _d;
        super.ngOnInit();
        if ((_a = this.queryParams) === null || _a === void 0 ? void 0 : _a.id_processo) {
            this.id_processo = (_b = this.queryParams) === null || _b === void 0 ? void 0 : _b.id_processo;
        }
        if (this.isPersist && ((_c = this.atividade) === null || _c === void 0 ? void 0 : _c.tarefas)) {
            this.control.setValue((_d = this.atividade) === null || _d === void 0 ? void 0 : _d.tarefas);
        }
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.id_processo) {
            this.loading = true;
            this.dao.query({ where: [["id_processo", "==", this.id_processo]] }).asPromise().then(tarefas => {
                this.control.setValue(tarefas || []);
                this.cdRef.detectChanges();
            }).finally(() => {
                this.loading = false;
            });
        }
    }
    get isPersist() {
        return this.persist != undefined;
    }
    addTarefa() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const tarefa = new src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_5__["AtividadeTarefa"]();
            tarefa.id = this.dao.generateUuid();
            tarefa.usuario = this.auth.usuario;
            tarefa.usuario_id = this.auth.usuario.id;
            tarefa.atividade_id = ((_a = this.atividade) === null || _a === void 0 ? void 0 : _a.id) || "";
            tarefa.comentarios = [];
            tarefa._status = "ADD";
            this.go.navigate({ route: ['gestao', 'atividade', 'tarefa'] }, { metadata: { tarefa: tarefa, atividade: this.atividade }, modalClose: (modalResult) => {
                    if (modalResult) {
                        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                            var _a;
                            const tarefas = (this.control.value || []);
                            if (this.isPersist && ((_a = this.atividade) === null || _a === void 0 ? void 0 : _a.tarefas)) {
                                this.grid.error = undefined;
                                try {
                                    this.dialog.showSppinerOverlay("Salvando dados do formulário");
                                    modalResult = yield this.dao.save(modalResult, this.join);
                                }
                                catch (error) {
                                    this.grid.error = error.message ? error.message : error;
                                    modalResult = undefined;
                                }
                                finally {
                                    this.dialog.closeSppinerOverlay();
                                }
                            }
                            if (modalResult) {
                                tarefas.push(modalResult);
                                this.control.setValue(tarefas);
                            }
                            this.cdRef.detectChanges();
                        }))();
                    }
                } });
            return undefined;
        });
    }
    deleteEntrega(row) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const confirm = yield this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
            this.grid.error = undefined;
            if (confirm) {
                try {
                    if ((this.isPersist && ((_a = this.atividade) === null || _a === void 0 ? void 0 : _a.tarefas)) || row._status == "ADD") {
                        const tarefas = this.control.value;
                        const index = tarefas.findIndex(x => x.id == row.id);
                        if (this.isPersist && ((_b = this.atividade) === null || _b === void 0 ? void 0 : _b.tarefas))
                            yield this.dao.delete(row);
                        if (index >= 0) {
                            tarefas.splice(index, 1);
                            this.control.setValue(tarefas);
                        }
                    }
                    else {
                        row._status = "DELETE";
                    }
                    this.dialog.alert("Sucesso", "Registro excluído com sucesso!");
                    this.cdRef.detectChanges();
                }
                catch (error) {
                    this.grid.error = (error === null || error === void 0 ? void 0 : error.message) ? error === null || error === void 0 ? void 0 : error.message : error;
                }
            }
        });
    }
    /*public comentarioClick(element: HTMLSpanElement) {
      const value = element.getAttribute("data-expanded");
      element.setAttribute("data-expanded", value == "true" ? "false" : "true");
    }*/
    /*public addComentarioClick(row: any) {
      this.go.navigate({route: ['gestao', 'atividade', 'entrega', row.id, 'comentar']}, {modal: true, metadata: {entrega: row, atividade: this.atividade}, modalClose: this.addComentarioResult.bind(this)});
    }*/
    onColumnConcluidoEdit(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.formEdit.controls.concluido.setValue(row.concluido);
        });
    }
    onColumnConcluidoSave(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const saved = yield this.dao.update(row.id, {
                    concluido: this.formEdit.controls.concluido.value
                });
                row.concluido = this.formEdit.controls.concluido.value;
                return !!saved;
            }
            catch (error) {
                return false;
            }
        });
    }
    addComentarioResult(modalResult) {
        if (modalResult) {
            if (this.isPersist) {
                this.dao.getById(modalResult.id, this.join).then(tarefa => {
                    if (tarefa) {
                        const tarefas = this.control.value || [];
                        const index = tarefas.findIndex((x) => x.id = tarefa.id);
                        if (index >= 0) {
                            tarefas[index] = tarefa;
                            this.control.setValue(tarefas);
                            this.cdRef.detectChanges();
                        }
                    }
                });
            }
            else {
                const changed = modalResult.comentarios.filter((x) => ["ADD", "EDIT", "DELETE"].includes(x._status || "")).length > 0;
                modalResult._status = changed && !["ADD", "EDIT", "DELETE"].includes(modalResult._status || "") ? "EDIT" : modalResult._status;
            }
        }
    }
}
AtividadeListTarefaComponent.ɵfac = function AtividadeListTarefaComponent_Factory(t) { return new (t || AtividadeListTarefaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
AtividadeListTarefaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: AtividadeListTarefaComponent, selectors: [["atividade-list-tarefa"]], viewQuery: function AtividadeListTarefaComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, inputs: { control: "control", persist: "persist", disabled: "disabled", editable: "editable", selectable: "selectable", id_processo: "id_processo", atividade: "atividade" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 18, vars: 16, consts: [[3, "control", "add", "disabled", "minHeight", "hasDelete", "editable"], [3, "title", "template"], ["tipoTarefaDescricao", ""], ["type", "timer", "title", "Tempo estimado", "onlyHours", "", "field", "tempo_estimado"], ["title", "Documento", 3, "template"], ["documento", ""], ["title", "Conclu\u00EDdo", 3, "align", "template", "editTemplate", "edit", "save"], ["concluido", ""], ["editConcluido", ""], ["title", "Informa\u00E7\u00F5es adicionais", 3, "template"], ["tarefaComentarios", ""], ["type", "options", 3, "onEdit", "onDelete", 4, "ngIf"], ["class", "d-block", 4, "ngIf"], [1, "d-block"], [3, "documento"], [1, "text-center"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "bi", "bi-check-circle"], ["controlName", "concluido", 3, "size", "control"], ["origem", "ATIVIDADE_TAREFA", 3, "entity", "noPersist", "selectable", "grid", "save"], ["type", "options", 3, "onEdit", "onDelete"]], template: function AtividadeListTarefaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "column", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, AtividadeListTarefaComponent_ng_template_3_Template, 2, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "column", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "column", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, AtividadeListTarefaComponent_ng_template_7_Template, 1, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, AtividadeListTarefaComponent_ng_template_10_Template, 2, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, AtividadeListTarefaComponent_ng_template_12_Template, 1, 2, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](15, AtividadeListTarefaComponent_ng_template_15_Template, 1, 5, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, AtividadeListTarefaComponent_column_17_Template, 1, 2, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](4);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](8);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](11);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](13);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("control", ctx.control)("add", ctx.addTarefa.bind(ctx))("disabled", ctx.disabled ? "true" : undefined)("minHeight", ctx.isPersist ? 50 : 300)("hasDelete", true)("editable", ctx.editable ? "true" : undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", ctx.lex.translate("Tipo de Tarefa") + " e Descri\u00E7\u00E3o")("template", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("align", "center")("template", _r4)("editTemplate", _r6)("edit", ctx.editable ? ctx.onColumnConcluidoEdit.bind(ctx) : undefined)("save", ctx.editable ? ctx.onColumnConcluidoSave.bind(ctx) : undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.editable && !ctx.selectable && !ctx.id_processo);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__["ColumnComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_11__["DocumentosBadgeComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__["InputSwitchComponent"], _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_13__["ComentariosWidgetComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtbGlzdC10YXJlZmEuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "w/7R":
/*!*************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list/atividade-list.component.ts ***!
  \*************************************************************************************/
/*! exports provided: AtividadeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeListComponent", function() { return AtividadeListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-base */ "Z2oO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



function AtividadeListComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "atividade-list-grid", 6);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("snapshot", ctx_r1.snapshot || ctx_r1.modalRoute || ctx_r1.route.snapshot);
} }
function AtividadeListComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "atividade-list-kanban", 6);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("snapshot", ctx_r3.snapshot || ctx_r3.modalRoute || ctx_r3.route.snapshot);
} }
function AtividadeListComponent_tab_7_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "atividade-dashboard", 6);
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("snapshot", ctx_r6.snapshot || ctx_r6.modalRoute || ctx_r6.route.snapshot);
} }
function AtividadeListComponent_tab_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tab", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AtividadeListComponent_tab_7_ng_template_1_Template, 1, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("template", _r5);
} }
class AtividadeListComponent extends src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_1__["PageBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.activeTab = "TABELA";
        /* Inicializações */
        this.title = this.lex.translate("Atividades");
        this.code = "MOD_DMD";
    }
    ngOnInit() {
        super.ngOnInit();
        this.activeTab = this.usuarioConfig.active_tab || "TABELA";
    }
    onSelectTab(tab) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.activeTab = tab.key;
            this.saveUsuarioConfig({ active_tab: this.activeTab });
        });
    }
}
AtividadeListComponent.ɵfac = function AtividadeListComponent_Factory(t) { return new (t || AtividadeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injector"])); };
AtividadeListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AtividadeListComponent, selectors: [["app-atividade-list"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]], decls: 8, vars: 6, consts: [["right", "", 3, "title", "select", "active"], ["key", "TABELA", "icon", "bi bi-table", "label", "Lista", 3, "template"], ["grid", ""], ["key", "KANBAN", "icon", "bi bi-card-heading", "label", "Quadro", 3, "template"], ["kanban", ""], ["key", "DASHBOARD", "icon", "bi bi-file-earmark-bar-graph", "label", "Dashboard", 3, "template", 4, "ngIf"], [3, "snapshot"], ["key", "DASHBOARD", "icon", "bi bi-file-earmark-bar-graph", "label", "Dashboard", 3, "template"], ["dashboard", ""]], template: function AtividadeListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tabs", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, AtividadeListComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, AtividadeListComponent_ng_template_5_Template, 1, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, AtividadeListComponent_tab_7_Template, 3, 1, "tab", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx))("active", ctx.activeTab);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("template", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf",  false && false);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=modules-gestao-atividade-atividade-module.js.map