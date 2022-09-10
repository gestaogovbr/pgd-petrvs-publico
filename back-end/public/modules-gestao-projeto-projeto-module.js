(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-gestao-projeto-projeto-module"],{

/***/ "/eKj":
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-planejamento/projeto-planejamento.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: ProjetoPlanejamentoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoPlanejamentoComponent", function() { return ProjetoPlanejamentoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ProjetoPlanejamentoComponent {
    constructor() { }
    ngOnInit() {
    }
}
ProjetoPlanejamentoComponent.ɵfac = function ProjetoPlanejamentoComponent_Factory(t) { return new (t || ProjetoPlanejamentoComponent)(); };
ProjetoPlanejamentoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjetoPlanejamentoComponent, selectors: [["app-projeto-planejamento"]], decls: 2, vars: 0, template: function ProjetoPlanejamentoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "projeto-planejamento works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLXBsYW5lamFtZW50by5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "AQs0":
/*!******************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: ProjetoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoRoutingModule", function() { return ProjetoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projeto-form/projeto-form.component */ "Vzi9");
/* harmony import */ var _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projeto-list/projeto-list.component */ "Qhkk");
/* harmony import */ var _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projeto-planejamento/projeto-planejamento.component */ "/eKj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








const routes = [
    { path: '', component: _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_4__["ProjetoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Projeto" } },
    { path: 'new', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: ':id/planejamento', component: _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__["ProjetoPlanejamentoComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Planejamento", modal: true } },
    { path: ':id/comentar', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Comentar", modal: true } },
    { path: ':id/clonar', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Clonar", modal: true } },
    { path: ':id/recurso', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Recurso", modal: true } },
    { path: ':id/regra', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Regra", modal: true } },
    { path: ':id/alocacao', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Alocação", modal: true } },
    { path: ':id/envolvido', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Envolvido", modal: true } }
];
class ProjetoRoutingModule {
}
ProjetoRoutingModule.ɵfac = function ProjetoRoutingModule_Factory(t) { return new (t || ProjetoRoutingModule)(); };
ProjetoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: ProjetoRoutingModule });
ProjetoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ProjetoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "B2HH":
/*!********************************************!*\
  !*** ./src/app/dao/projeto-dao.service.ts ***!
  \********************************************/
/*! exports provided: ProjetoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoDaoService", function() { return ProjetoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ProjetoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Projeto", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
ProjetoDaoService.ɵfac = function ProjetoDaoService_Factory(t) { return new (t || ProjetoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
ProjetoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ProjetoDaoService, factory: ProjetoDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "LZl6":
/*!*****************************************!*\
  !*** ./src/app/models/projeto.model.ts ***!
  \*****************************************/
/*! exports provided: Projeto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Projeto", function() { return Projeto; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Projeto extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        //public alocacoes?: ProjetoAlocacao[];
        this.numero = 0; /* Número do projeto */
        this.nome = ""; /* Nome do projeto */
        this.descricao = ""; /* Descrição do projeto */
        this.finalidade = ""; /* Descrição do projeto */
        this.status = 'PLANEJADO'; /* Status do projeto */
        this.data_inicio = new Date(); /* Data de criação */
        this.data_fim = null; /* Data final do registro */
        this.inicio = new Date(); /* Inicio do projeto */
        this.termino = new Date(); /* Fim do projeto */
        this.calcula_custos = true; /* Se o projeto calcula custos */
        this.tempo_corrido = false; /* Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas) */
        this.usar_horas = true; /* Se usa horas nas datas */
        this.calcula_intervalo = true; /* Se o termino é calculado automaticamente pelas tarefas */
        this.agrupador = false; /* Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso) */
        this.soma_progresso_filhos = true; /* Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos) */
        this.aloca_proprios_recursos = true; /* Se possui recursos próprios */
        this.soma_recusos_alocados_filhos = true; /* Mostra o somatório dos recursos filhos */
        this.custos_proprios = true; /* Se possui custos próprios */
        this.soma_custos_filhos = true; /* Se possui custos filhos */
        this.duracao = 0.00; /* Duração do projeto */
        this.progresso = 0.00; /* Percentual de progresso do projeto */
        this.usuario_id = null;
        this.tipo_projeto_id = "";
    }
}


/***/ }),

/***/ "Qhkk":
/*!*******************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-list/projeto-list.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ProjetoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoListComponent", function() { return ProjetoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ "B2HH");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/projeto.model */ "LZl6");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ "xp1S");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_progress_progress_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/progress/progress.component */ "1VCC");



















function ProjetoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "toolbar");
} }
function ProjetoListComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r14.numero);
} }
function ProjetoListComponent_ng_template_12_profile_picture_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "profile-picture", 23);
} if (rf & 2) {
    const envolvido_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("url", envolvido_r17.url)("hint", envolvido_r17.hint);
} }
function ProjetoListComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, ProjetoListComponent_ng_template_12_profile_picture_2_Template, 1, 2, "profile-picture", 22);
} if (rf & 2) {
    const row_r15 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r15.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r4.getEnvolvidos(row_r15));
} }
function ProjetoListComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r18.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r18.finalidade);
} }
function ProjetoListComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "badge", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "badge", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r19 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", ctx_r8.util.getDateTimeFormatted(row_r19.inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", ctx_r8.util.getDateTimeFormatted(row_r19.termino));
} }
function ProjetoListComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "progress", 27);
} if (rf & 2) {
    const row_r20 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", row_r20.progresso);
} }
function ProjetoListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "badge", 28);
} if (rf & 2) {
    const row_r21 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMap"](ctx_r12.lookup.getColor(ctx_r12.lookup.PROJETO_STATUS, row_r21.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("icon", ctx_r12.lookup.getIcon(ctx_r12.lookup.PROJETO_STATUS, row_r21.status))("label", ctx_r12.lookup.getValue(ctx_r12.lookup.PROJETO_STATUS, row_r21.status));
} }
function ProjetoListComponent_column_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "column", 29);
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("onEdit", ctx_r13.edit)("onDelete", ctx_r13.delete)("dynamicOptions", ctx_r13.dynamicOptions.bind(ctx_r13))("dynamicButtons", ctx_r13.dynamicButtons.bind(ctx_r13));
} }
const _c0 = function () { return ["configuracoes", "usuario"]; };
const _c1 = function (a0) { return { route: a0 }; };
const _c2 = function () { return ["configuracoes", "unidade"]; };
class ProjetoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__["Projeto"], src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_1__["ProjetoDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            var _a, _b, _c;
            let result = [];
            let form = filter.value;
            if ((_a = form.nome) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["nome", "like", "%" + form.nome + "%"]);
            }
            else if (form.status) {
                result.push(["status", "==", form.status]);
            }
            else if ((_b = form.inicio) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["termino", ">=", form.inicio]);
            }
            else if ((_c = form.termino) === null || _c === void 0 ? void 0 : _c.length) {
                result.push(["inicio", "=<", form.termino]);
            }
            return result;
        };
        /* Inicializações */
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__["UsuarioDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeDaoService"]);
        this.title = this.lex.noun("Projeto", true);
        this.code = "MOD_PROJ";
        this.join = ["envolvidos.recurso.usuario", "envolvidos.recurso.unidade", "envolvidos.regra"];
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            status: { default: null },
            inicio: { default: null },
            termino: { default: null }
        });
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        filter.controls.status.setValue(null);
        filter.controls.inicio.setValue(null);
        filter.controls.termino.setValue(null);
        super.filterClear(filter);
    }
    getEnvolvidos(projeto) {
        var _a, _b;
        let result = [];
        for (let envolvido of projeto.envolvidos || []) {
            if ((_a = envolvido.recurso) === null || _a === void 0 ? void 0 : _a.usuario) {
                result.push({
                    url: envolvido.recurso.usuario.url_foto || "./assets/images/profile.png",
                    hint: "Usuario: " + envolvido.recurso.usuario.nome + (envolvido.regra ? "\n(" + envolvido.regra.nome + ")" : "")
                });
            }
            else if ((_b = envolvido.recurso) === null || _b === void 0 ? void 0 : _b.unidade) {
                result.push({
                    url: "./assets/images/unidade.png",
                    hint: "Usuario: " + envolvido.recurso.unidade.nome + (envolvido.regra ? "\n(" + envolvido.regra.nome + ")" : "")
                });
            }
        }
        return result;
    }
    dynamicOptions(row) {
        let result = [];
        let projeto = row;
        const isEnvolvido = !!(projeto.envolvidos || []).find(x => { var _a; return x.recurso.usuario.id == ((_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id); });
        const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'consult'] }, { modal: true }) };
        const BOTAO_COMENTARIOS = { label: "Comentários", icon: "bi bi-chat-left-quote", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'comentar'] }, this.modalRefreshId(projeto)) };
        const BOTAO_CLONAR = { label: "Clonar", icon: "bi bi-stickies", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'demanda', projeto.id, 'clonar'] }, this.modalRefresh()) };
        const BOTAO_ALTERAR = { label: "Alterar demanda", icon: "bi bi-pencil-square", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'edit'] }, this.modalRefreshId(projeto)) };
        const BOTAO_PLANEJAR = { label: "Planejamento", icon: "bi bi-bar-chart-steps", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'planejamento'] }, this.modalRefreshId(projeto)) };
        const BOTAO_EXCLUIR = { label: "Excluir demanda", icon: "bi bi-trash", onClick: this.delete.bind(this) };
        const BOTAO_RECURSOS = { label: "Recursos", icon: "bi bi-tools", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'recurso'] }, this.modalRefreshId(projeto)) };
        const BOTAO_REGRAS = { label: "Regras", icon: "bi bi-diagram-3", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'regra'] }, this.modalRefreshId(projeto)) };
        const BOTAO_ALOCACOES = { label: "Alocações", icon: "bi bi-cart-check", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'alocacao'] }, this.modalRefreshId(projeto)) };
        const BOTAO_ENVOLVIDOS = { label: "Envolvidos", id: "NAOINICIADO", icon: "bi bi-backspace", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'envolvido'] }, this.modalRefreshId(projeto)) };
        result.push(BOTAO_INFORMACOES);
        if (isEnvolvido) {
            result.push(BOTAO_PLANEJAR);
            result.push(BOTAO_COMENTARIOS);
            result.push(BOTAO_CLONAR);
            result.push(BOTAO_ALTERAR);
            result.push(BOTAO_EXCLUIR);
            result.push(BOTAO_RECURSOS);
            result.push(BOTAO_REGRAS);
            result.push(BOTAO_ALOCACOES);
            result.push(BOTAO_ENVOLVIDOS);
        }
        return result;
    }
    dynamicButtons(row) {
        let result = [];
        let projeto = row;
        const isEnvolvido = !!(projeto.envolvidos || []).find(x => { var _a; return x.recurso.usuario.id == ((_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id); });
        const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'consult'] }, { modal: true }) };
        const BOTAO_PLANEJAR = { label: "Planejamento", icon: "bi bi-bar-chart-steps", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'planejamento'] }, this.modalRefreshId(projeto)) };
        if (isEnvolvido) {
            result.push(BOTAO_PLANEJAR);
        }
        else {
            result.push(BOTAO_INFORMACOES);
        }
        return result;
    }
}
ProjetoListComponent.ɵfac = function ProjetoListComponent_Factory(t) { return new (t || ProjetoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["Injector"])); };
ProjetoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: ProjetoListComponent, selectors: [["app-projeto-list"]], viewQuery: function ProjetoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], decls: 28, vars: 43, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", 3, "size", "control"], ["controlName", "usuario_id", 3, "size", "label", "control", "dao", "selectRoute"], ["controlName", "unidade_id", 3, "size", "label", "control", "dao", "selectRoute"], ["title", "#ID", 3, "template"], ["columnNumero", ""], [3, "title", "template"], ["columnNomeEnvolvidos", ""], ["title", "Descri\u00E7\u00E3o", 3, "template"], ["columnDescricao", ""], ["title", "Datas", 3, "template"], ["columnDatas", ""], ["title", "Progresso", 3, "template"], ["columnProgresso", ""], ["title", "Status", 3, "template"], ["columnStatus", ""], ["type", "options", 3, "onEdit", "onDelete", "dynamicOptions", "dynamicButtons", 4, "ngIf"], [3, "rows"], [1, "d-block"], [3, "url", "hint", 4, "ngFor", "ngForOf"], [3, "url", "hint"], [1, "text-wrap"], ["color", "light", "icon", "bi bi-box-arrow-right", "hint", "Data de in\u00EDcio", 3, "label"], ["color", "light", "icon", "bi bi-box-arrow-in-right", "hint", "Data de t\u00E9rmino", 3, "label"], [3, "value"], [3, "icon", "label"], ["type", "options", 3, "onEdit", "onDelete", "dynamicOptions", "dynamicButtons"]], template: function ProjetoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("select", function ProjetoListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, ProjetoListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "input-search", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "input-search", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, ProjetoListComponent_ng_template_9_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, ProjetoListComponent_ng_template_12_Template, 3, 2, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, ProjetoListComponent_ng_template_15_Template, 4, 2, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, ProjetoListComponent_ng_template_18_Template, 3, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, ProjetoListComponent_ng_template_21_Template, 1, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, ProjetoListComponent_ng_template_24_Template, 1, 4, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](26, ProjetoListComponent_column_26_Template, 1, 4, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](27, "pagination", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](10);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](13);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](16);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](19);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](22);
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PROJ_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PROJ_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("label", ctx.lex.noun("Usuario"))("control", ctx.filter.controls.usuario_id)("dao", ctx.usuarioDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](38, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](37, _c0)));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("label", ctx.lex.noun("Unidade"))("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](41, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](40, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Nome\nEnvolvido")("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_14__["ToolbarComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_15__["ProfilePictureComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__["BadgeComponent"], _components_progress_progress_component__WEBPACK_IMPORTED_MODULE_17__["ProgressComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "Vzi9":
/*!*******************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form/projeto-form.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ProjetoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoFormComponent", function() { return ProjetoFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ProjetoFormComponent {
    constructor() { }
    ngOnInit() {
    }
}
ProjetoFormComponent.ɵfac = function ProjetoFormComponent_Factory(t) { return new (t || ProjetoFormComponent)(); };
ProjetoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjetoFormComponent, selectors: [["app-projeto-form"]], decls: 2, vars: 0, template: function ProjetoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "projeto-form works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "mH8K":
/*!**********************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto.module.ts ***!
  \**********************************************************/
/*! exports provided: ProjetoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoModule", function() { return ProjetoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _projeto_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projeto-routing.module */ "AQs0");
/* harmony import */ var _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projeto-list/projeto-list.component */ "Qhkk");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projeto-form/projeto-form.component */ "Vzi9");
/* harmony import */ var _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projeto-planejamento/projeto-planejamento.component */ "/eKj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class ProjetoModule {
}
ProjetoModule.ɵfac = function ProjetoModule_Factory(t) { return new (t || ProjetoModule)(); };
ProjetoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: ProjetoModule });
ProjetoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"],
            _projeto_routing_module__WEBPACK_IMPORTED_MODULE_1__["ProjetoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ProjetoModule, { declarations: [_projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_2__["ProjetoListComponent"],
        _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_4__["ProjetoFormComponent"],
        _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__["ProjetoPlanejamentoComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"],
        _projeto_routing_module__WEBPACK_IMPORTED_MODULE_1__["ProjetoRoutingModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=modules-gestao-projeto-projeto-module.js.map