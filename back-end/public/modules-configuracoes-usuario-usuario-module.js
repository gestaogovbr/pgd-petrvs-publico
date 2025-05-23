(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-configuracoes-usuario-usuario-module"],{

/***/ "8+7Z":
/*!*****************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario.module.ts ***!
  \*****************************************************************/
/*! exports provided: UsuarioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioModule", function() { return UsuarioModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _usuario_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./usuario-routing.module */ "IIPB");
/* harmony import */ var _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./usuario-list/usuario-list.component */ "K4Im");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario-form/usuario-form.component */ "x3jR");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./usuario-integrante/usuario-integrante.component */ "JMak");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class UsuarioModule {
}
UsuarioModule.ɵfac = function UsuarioModule_Factory(t) { return new (t || UsuarioModule)(); };
UsuarioModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: UsuarioModule });
UsuarioModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _usuario_routing_module__WEBPACK_IMPORTED_MODULE_1__["UsuarioRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](UsuarioModule, { declarations: [_usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_2__["UsuarioListComponent"],
        _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_4__["UsuarioFormComponent"],
        _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_6__["UsuarioIntegranteComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _usuario_routing_module__WEBPACK_IMPORTED_MODULE_1__["UsuarioRoutingModule"]] }); })();


/***/ }),

/***/ "FZjA":
/*!****************************************************!*\
  !*** ./src/app/models/unidade-integrante.model.ts ***!
  \****************************************************/
/*! exports provided: IntegranteConsolidado, UnidadeIntegrante */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntegranteConsolidado", function() { return IntegranteConsolidado; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnidadeIntegrante", function() { return UnidadeIntegrante; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class IntegranteConsolidado {
    constructor() {
        this.id = ""; /* Utilizado somente para garantir o funcionamento do grid */
        this.atribuicoes = [];
    }
}
;
class UnidadeIntegrante extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.atribuicoes = [];
        this.usuario_id = ""; /* Usuário vinculado */
        this.unidade_id = ""; /* Unidade Vinculada */
        this.initialization(data);
    }
}


/***/ }),

/***/ "IIPB":
/*!*************************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: UsuarioRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioRoutingModule", function() { return UsuarioRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usuario-form/usuario-form.component */ "x3jR");
/* harmony import */ var _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario-list/usuario-list.component */ "K4Im");
/* harmony import */ var _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./usuario-integrante/usuario-integrante.component */ "JMak");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








const routes = [
    { path: '', component: _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_4__["UsuarioListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Usuários" } },
    { path: 'new', component: _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_3__["UsuarioFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Usuário", modal: true } },
    { path: ':id/edit', component: _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_3__["UsuarioFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição de Usuário", modal: true } },
    //{ path: ':usuario_id/lotacao', loadChildren: () => import('./lotacao/lotacao.module').then(m => m.LotacaoModule), canActivate: [AuthGuard] },
    { path: ':id/consult', component: _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_3__["UsuarioFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Usuário", modal: true } },
    //{ path: ':id/:idUsuario/integrante', component: UsuarioIntegranteComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Unidades Integrantes", modal: true } },
    { path: ':id/integrante', component: _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_5__["UsuarioIntegranteComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Unidades Integrantes", modal: true } },
];
class UsuarioRoutingModule {
}
UsuarioRoutingModule.ɵfac = function UsuarioRoutingModule_Factory(t) { return new (t || UsuarioRoutingModule)(); };
UsuarioRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: UsuarioRoutingModule });
UsuarioRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](UsuarioRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "JMak":
/*!**************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario-integrante/usuario-integrante.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: UsuarioIntegranteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioIntegranteComponent", function() { return UsuarioIntegranteComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ "Tlc2");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_models_unidade_integrante_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/unidade-integrante.model */ "FZjA");
/* harmony import */ var src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/usuario.model */ "11oC");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");

















const _c0 = ["unidade"];
function UsuarioIntegranteComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](row_r9.unidade_sigla || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" (IdServo: ", row_r9.unidade_codigo || "", ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", row_r9.unidade_nome || "", " ");
} }
function UsuarioIntegranteComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "input-search", 8, 9);
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx_r4.form.controls.unidade_id)("dao", ctx_r4.unidadeDao);
} }
function UsuarioIntegranteComponent_ng_template_12_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "badge", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const a_r14 = ctx.$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", ctx_r13.lookup.getColor(ctx_r13.lookup.UNIDADE_INTEGRANTE_TIPO, a_r14 || ""))("icon", ctx_r13.lookup.getIcon(ctx_r13.lookup.UNIDADE_INTEGRANTE_TIPO, a_r14 || ""))("label", ctx_r13.lookup.getValue(ctx_r13.lookup.UNIDADE_INTEGRANTE_TIPO, a_r14 || ""));
} }
function UsuarioIntegranteComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, UsuarioIntegranteComponent_ng_template_12_div_0_Template, 3, 3, "div", 10);
} if (rf & 2) {
    const row_r12 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", row_r12.atribuicoes);
} }
function UsuarioIntegranteComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "input-multiselect", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "input-select", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8)("addItemHandle", ctx_r8.addItemHandle.bind(ctx_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("items", ctx_r8.lookup.UNIDADE_INTEGRANTE_TIPO);
} }
class UsuarioIntegranteComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_7__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.validate = (control, controlName) => {
            var _a, _b;
            let result = null;
            if (["unidade_id"].includes(controlName) && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            if (controlName == "atribuicoes" && !((_b = control.value) === null || _b === void 0 ? void 0 : _b.length)) {
                result = "Obrigatório ao menos uma atribuição!";
            }
            return result;
        };
        this.dao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioDaoService"]);
        this.integranteDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_3__["UnidadeIntegranteDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeDaoService"]);
        this.form = this.fh.FormBuilder({
            usuario_id: { default: "" },
            unidade_id: { default: "" },
            atribuicoes: { default: undefined },
            atribuicao: { default: "" },
            _status: { default: "" }
        }, this.cdRef, this.validate);
    }
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    ngOnInit() {
        var _a, _b;
        super.ngOnInit();
        this.entity = ((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.entity) || this.entity;
        this.entity_id = ((_b = this.metadata) === null || _b === void 0 ? void 0 : _b.entity_id) || this.entity_id;
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.patchValue(new src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__["Usuario"]());
            yield this.loadData(this.entity, form);
        });
    }
    /**
     * Método chamado na inicialização do componente para carregar todas as unidades-integrantes do usuário.
     * @param entity
     * @param form
     */
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            form.patchValue(this.util.fillForm(formValue, entity));
            this.grid.loading = true;
            try {
                let result = yield this.integranteDao.loadIntegrantes("", this.entity.id);
                this.items = result.integrantes.filter(x => x.atribuicoes.length > 0);
                this.usuario = result.usuario;
            }
            finally {
                this.grid.loading = false;
            }
            this.cdRef.detectChanges();
        });
    }
    addItemHandle() {
        let result = undefined;
        const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
        const key = this.form.controls.atribuicao.value;
        if ((value === null || value === void 0 ? void 0 : value.length) && this.util.validateLookupItem(this.form.controls.atribuicao.value, key)) {
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
    /**
     * Método chamado para inserir uma atribuição no grid, seja este componente persistente ou não.
     * @returns
     */
    addAtribuicao() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return Object.assign(new src_app_models_unidade_integrante_model__WEBPACK_IMPORTED_MODULE_5__["IntegranteConsolidado"](), {
                _status: this.isNoPersist ? "ADD" : "",
                id: this.dao.generateUuid(),
                atribuicoes: []
                //usuario_id: this.entity?.id
            });
        });
    }
    /**
     * Método utilizado durante a inclusão/alteração de uma atribuição no grid, seja este componente persistente ou não
     * @param form
     * @param row
     */
    loadAtribuicao(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.controls.atribuicoes.setValue(this.converterAtribuicoes(row.atribuicoes));
            form.controls.unidade_id.setValue(row.id);
            form.controls.atribuicao.setValue("");
        });
    }
    /**
     * Método chamado para a exclusão de uma atribuição do grid, seja este componente persistente ou não.
     * @param row
     * @returns
     */
    removeAtribuicao(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let confirm = yield this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
            if (confirm) {
                this.loading = true;
                try {
                    this.isNoPersist ? Object.assign(row, { _status: "DELETE" }) : this.integranteDao.saveIntegrante(row.id, this.usuario.id, []);
                    //await this.loadData({}, this.form);
                }
                finally {
                    this.loading = false;
                }
                return this.isNoPersist ? false : true; // (*3)
            }
            else {
                return false;
            }
        });
    }
    /*   public async saveAtribuicao(form: FormGroup, row: any) {
        if(form!.controls.atribuicoes.value.length) {
          this.loading = true;
          try {
            if(!this.isNoPersist) await this.integranteDao.saveIntegrante(form!.controls.unidade_id.value, this.usuario!.id, form!.controls.atribuicoes.value.map((x: LookupItem) => x.key));
          } finally {
            await this.loadAtribuicao(form, row);
            this.loading = false;
          }
        }
        return undefined;
      } */
    /**
   * Método chamado no salvamento de uma atribuição do usuário, seja este componente persistente ou não.
   * @param form
   * @param row
   * @returns
   */
    saveAtribuicao(form, row) {
        var _a, _b, _c, _d;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.novaAtribuicao = row;
            this.loading = true;
            try {
                if (!this.isNoPersist) {
                    let novasAtribuicoes = form.controls.atribuicoes.value.map((x) => x.key);
                    if (yield this.integranteDao.saveIntegrante(form.controls.unidade_id.value, this.usuario.id, novasAtribuicoes)) {
                        this.novaAtribuicao.id = form.controls.unidade_id.value;
                        this.novaAtribuicao.atribuicoes = novasAtribuicoes;
                        this.novaAtribuicao.unidade_codigo = ((_a = this.unidade) === null || _a === void 0 ? void 0 : _a.searchObj).codigo;
                        this.novaAtribuicao.unidade_sigla = ((_b = this.unidade) === null || _b === void 0 ? void 0 : _b.searchObj).sigla;
                        this.novaAtribuicao.unidade_nome = ((_c = this.unidade) === null || _c === void 0 ? void 0 : _c.searchObj).nome;
                    }
                    ;
                    if ((_d = this.grid) === null || _d === void 0 ? void 0 : _d.adding)
                        this.grid.items[this.grid.items.length - 1].id = ''; // (*4)
                }
            }
            catch (e) {
                this.error(e.message ? e.message : e.toString() || e);
            }
            finally {
                yield this.loadAtribuicao(form, row);
                this.loading = false;
            }
            return this.novaAtribuicao;
        });
    }
    converterAtribuicoes(atribuicoes) {
        return atribuicoes.map((x) => Object.assign({}, {
            key: x,
            value: this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
            icon: this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
            color: this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, x)
        }));
    }
}
UsuarioIntegranteComponent.ɵfac = function UsuarioIntegranteComponent_Factory(t) { return new (t || UsuarioIntegranteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["Injector"])); };
UsuarioIntegranteComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: UsuarioIntegranteComponent, selectors: [["usuario-integrante"]], viewQuery: function UsuarioIntegranteComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
    } }, inputs: { control: "control", entity: "entity", noPersist: "noPersist", entity_id: "entity_id" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 17, vars: 15, consts: [["editable", "", 3, "items", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], ["grid", ""], [3, "title", "template", "editTemplate"], ["columnUnidade", ""], ["editUnidade", ""], ["columnAtribuicao", ""], ["editAtribuicao", ""], ["type", "options"], ["label", "", "icon", "", "controlName", "unidade_id", 3, "size", "control", "dao"], ["unidade", ""], [4, "ngFor", "ngForOf"], [3, "color", "icon", "label"], ["controlName", "atribuicoes", 3, "size", "addItemHandle"], ["label", "", "icon", "fas fa-sign-out-alt", "controlName", "atribuicao", 3, "size", "items"]], template: function UsuarioIntegranteComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "grid", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "column", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, UsuarioIntegranteComponent_ng_template_7_Template, 7, 3, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, UsuarioIntegranteComponent_ng_template_9_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "column", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, UsuarioIntegranteComponent_ng_template_12_Template, 1, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, UsuarioIntegranteComponent_ng_template_14_Template, 2, 4, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](16, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](8);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](10);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](13);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx.items)("minHeight", 500)("form", ctx.form)("hasDelete", true)("add", ctx.addAtribuicao.bind(ctx))("load", ctx.loadAtribuicao.bind(ctx))("remove", ctx.removeAtribuicao.bind(ctx))("save", ctx.saveAtribuicao.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.entity == null ? null : ctx.entity.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("title", ctx.lex.translate("Unidade"))("template", _r1)("editTemplate", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("title", ctx.lex.translate("Atribui\u00E7\u00E3o"))("template", _r5)("editTemplate", _r7);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__["ColumnComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__["InputSearchComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgForOf"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__["BadgeComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_14__["InputMultiselectComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__["InputSelectComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c3VhcmlvLWludGVncmFudGUuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "K4Im":
/*!**************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario-list/usuario-list.component.ts ***!
  \**************************************************************************************/
/*! exports provided: UsuarioListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioListComponent", function() { return UsuarioListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/perfil-dao.service */ "pWMB");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/usuario.model */ "11oC");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ "xp1S");


















function UsuarioListComponent_h3_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r0.title);
} }
function UsuarioListComponent_toolbar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "toolbar");
} }
function UsuarioListComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "profile-picture", 18);
} if (rf & 2) {
    const row_r6 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("url", row_r6.url_foto)("size", 40)("hint", row_r6.nome);
} }
function UsuarioListComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r7 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"]((row_r7.perfil == null ? null : row_r7.perfil.nome) || "");
} }
class UsuarioListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_4__["Usuario"], src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__["UsuarioDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let result = [];
            if ((_b = (_a = filter === null || filter === void 0 ? void 0 : filter.controls.usuario) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["nome", "like", "%" + ((_c = filter === null || filter === void 0 ? void 0 : filter.controls.usuario) === null || _c === void 0 ? void 0 : _c.value) + "%"]);
            }
            if ((_e = (_d = filter === null || filter === void 0 ? void 0 : filter.controls.unidade_id) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.length) {
                result.push(["lotacao", "==", filter === null || filter === void 0 ? void 0 : filter.controls.unidade_id.value]);
            }
            if ((_g = (_f = filter === null || filter === void 0 ? void 0 : filter.controls.perfil_id) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.length) {
                result.push(["perfil_id", "==", (_h = filter === null || filter === void 0 ? void 0 : filter.controls.perfil_id) === null || _h === void 0 ? void 0 : _h.value]);
            }
            return result;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeDaoService"]);
        this.perfilDao = injector.get(src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_1__["PerfilDaoService"]);
        /* Inicializações */
        this.title = this.lex.translate("Usuários");
        this.code = "MOD_CFG_USER";
        this.join = ["perfil:id,nome"];
        this.filter = this.fh.FormBuilder({
            usuario: { default: "" },
            unidade_id: { default: "" },
            perfil_id: { default: null }
        });
        // Testa se o usuário possui permissão para exibir dados do usuário
        if (this.auth.hasPermissionTo("MOD_USER_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir dados do usuario
        if (this.auth.hasPermissionTo("MOD_USER_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
        // Testa se o usuário possui permissão para gerenciar as suas unidades-integrantes
        if (this.auth.hasPermissionTo("MOD_UND_INTG")) {
            this.options.push({
                icon: "bi bi-houses",
                label: "Unidades",
                onClick: (usuario) => {
                    this.go.navigate({ route: ['configuracoes', 'usuario', usuario.id, 'integrante'] });
                }
            });
        }
    }
    filterClear(filter) {
        var _a, _b, _c;
        (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.usuario.setValue("");
        (_b = this.filter) === null || _b === void 0 ? void 0 : _b.controls.unidade_id.setValue("");
        (_c = this.filter) === null || _c === void 0 ? void 0 : _c.controls.perfil_id.setValue(null);
        super.filterClear(filter);
    }
}
UsuarioListComponent.ɵfac = function UsuarioListComponent_Factory(t) { return new (t || UsuarioListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["Injector"])); };
UsuarioListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: UsuarioListComponent, selectors: [["app-usuario-list"]], viewQuery: function UsuarioListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], decls: 20, vars: 33, consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "usuario", "placeholder", "Nome", 3, "size", "label", "control"], ["controlName", "unidade_id", 3, "size", "label", "dao"], ["controlName", "perfil_id", "nullable", "", 3, "size", "label", "control", "dao"], ["icon", "bi-person", 3, "align", "template"], ["columnFoto", ""], ["title", "CPF", "field", "cpf"], ["title", "Matr\u00EDcula", "field", "matricula"], ["title", "Nome", "field", "nome", "orderBy", "nome"], [3, "title", "template"], ["columnPerfil", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], [1, "my-2"], [3, "url", "size", "hint"]], template: function UsuarioListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, UsuarioListComponent_h3_0_Template, 2, 1, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("select", function UsuarioListComponent_Template_grid_select_1_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, UsuarioListComponent_toolbar_2_Template, 1, 0, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "filter", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "input-search", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "input-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, UsuarioListComponent_ng_template_10_Template, 1, 3, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](14, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, UsuarioListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "pagination", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](11);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.isModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_USER_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_USER_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Usu\u00E1rio"))("control", ctx.filter.controls.usuario);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Lota\u00E7\u00E3o"))("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Perfil"))("control", ctx.filter.controls.perfil_id)("dao", ctx.perfilDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("align", "center")("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", ctx.lex.translate("Perfil"))("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__["InputSelectComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_14__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_15__["ToolbarComponent"], _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_16__["ProfilePictureComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c3VhcmlvLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "x3jR":
/*!**************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario-form/usuario-form.component.ts ***!
  \**************************************************************************************/
/*! exports provided: UsuarioFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioFormComponent", function() { return UsuarioFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/perfil-dao.service */ "pWMB");
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ "RHdA");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/usuario.model */ "11oC");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ "Tlc2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ "xp1S");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ "q/rX");
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ "7B2Z");
/* harmony import */ var _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../usuario-integrante/usuario-integrante.component */ "JMak");




















const _c0 = ["usuarioIntegrante"];
const _c1 = ["lotacao"];
class UsuarioFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__["Usuario"], src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['cpf', 'matricula', 'email', 'nome', 'apelido', 'perfil_id'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            else if (controlName == "cpf" && !this.util.validarCPF(control.value)) {
                result = "Inválido";
            }
            return result;
        };
        this.formValidation = (form) => {
            var _a, _b;
            if (!((_b = (_a = this.formLotacao) === null || _a === void 0 ? void 0 : _a.controls.unidade_lotacao_id.value) === null || _b === void 0 ? void 0 : _b.length)) {
                return "É obrigatória a definição da unidade de lotação do servidor!";
            }
            ;
            return undefined;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Usuário") + ': ' + ((entity === null || entity === void 0 ? void 0 : entity.matricula) || "") + ' - ' + ((entity === null || entity === void 0 ? void 0 : entity.apelido) || "");
        };
        this.perfilDao = injector.get(src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_2__["PerfilDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["UnidadeDaoService"]);
        this.integranteDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_8__["UnidadeIntegranteDaoService"]);
        this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanoTrabalhoDaoService"]);
        this.form = this.fh.FormBuilder({
            email: { default: "" },
            nome: { default: "" },
            cpf: { default: "" },
            matricula: { default: "" },
            apelido: { default: "" },
            telefone: { default: "" },
            uf: { default: "" },
            sexo: { default: null },
            url_foto: { default: "" },
            texto_complementar_plano: { default: "" },
            perfil_id: { default: null },
            atribuicoes: { default: [] }
        }, this.cdRef, this.validate);
        this.formLotacao = this.fh.FormBuilder({
            unidade_lotacao_id: { default: "" },
        }, this.cdRef);
        this.planoDataset = this.planoTrabalhoDao.dataset();
        this.join = ["lotacao.unidade:id"];
        //this.join = ["unidades_integrante.unidade", "unidades_integrante.atribuicoes:id, atribuicao", "lotacao.unidade:id"];
    }
    loadData(entity, form) {
        var _a, _b;
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.formLotacao.controls.unidade_lotacao_id.setValue((_b = (_a = entity.lotacao) === null || _a === void 0 ? void 0 : _a.unidade) === null || _b === void 0 ? void 0 : _b.id);
        //this.usuarioIntegrante!.gridControl.value.atribuicoes = this.entity?.unidades_integrante?.filter(x => x.atribuicoes.length > 0);
        //this.usuarioIntegrante!.items = this.entity?.unidades_integrante?.filter(x => x.atribuicoes.length > 0);
    }
    initializeData(form) {
        this.entity = new src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__["Usuario"]();
        this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a;
            let usuario = this.util.fill(new src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__["Usuario"](), this.entity);
            usuario = this.util.fillForm(usuario, this.form.value);
            //usuario.atribuicoes = usuario.atribuicoes.filter((x: { _status: any; unidade_id: string; nome: string; }) => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.unidade_id?.length && x.nome?.length);
            (_a = this.dao) === null || _a === void 0 ? void 0 : _a.save(usuario).then((usuario) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                var _b;
                if (this.formLotacao.controls.unidade_lotacao_id.value != ((_b = usuario.lotacao) === null || _b === void 0 ? void 0 : _b.unidade_id))
                    this.integranteDao.saveIntegrante(this.formLotacao.controls.unidade_lotacao_id.value, usuario.id, ["LOTADO"]);
                resolve(true);
            }));
        });
    }
}
UsuarioFormComponent.ɵfac = function UsuarioFormComponent_Factory(t) { return new (t || UsuarioFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["Injector"])); };
UsuarioFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: UsuarioFormComponent, selectors: [["app-usuario-form"]], viewQuery: function UsuarioFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.usuarioIntegrante = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.lotacao = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 28, vars: 32, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], [1, "form-group", "col-md-3", "text-center"], [1, "mt-5", 3, "url", "size"], [1, "form-group", "col-md-9"], ["label", "CPF", "controlName", "cpf", 3, "disabled", "size", "maskFormat"], ["label", "Matr\u00EDcula", "controlName", "matricula", 3, "disabled", "size"], ["label", "E-mail", "controlName", "email", "textCase", "lower", 3, "disabled", "size"], ["label", "Nome", "controlName", "nome", 3, "size"], ["label", "Apelido", "controlName", "apelido", 3, "size"], ["label", "Perfil", "controlName", "perfil_id", 3, "disabled", "size", "dao"], ["label", "Lota\u00E7\u00E3o", "controlName", "unidade_lotacao_id", "labelInfo", "Unidade de lota\u00E7\u00E3o do Usu\u00E1rio", 3, "size", "emptyValue", "control", "dao"], ["lotacao", ""], ["label", "UF", "icon", "bi bi-flag", "controlName", "uf", 3, "size", "items"], ["label", "Sexo", "controlName", "sexo", 3, "size", "items"], ["label", "Telefone", "controlName", "telefone", 3, "size", "maskFormat"], ["key", "CONFIGURACOES", "label", "Configura\u00E7\u00F5es"], ["controlName", "texto_complementar_plano", 3, "label", "dataset"], ["key", "ATRIBUICOES", 3, "label"], ["noPersist", "", 3, "entity", "entity_id"], ["usuarioIntegrante", ""]], template: function UsuarioFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function UsuarioFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function UsuarioFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "profile-picture", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "input-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "input-text", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](10, "input-text", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](12, "input-text", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](13, "input-text", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](15, "input-select", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](16, "input-search", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](19, "input-select", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](20, "input-radio", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](21, "input-text", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "tab", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](24, "input-editor", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](25, "tab", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](26, "usuario-integrante", 21, 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("url", ctx.form.controls.url_foto == null ? null : ctx.form.controls.url_foto.value)("size", 150);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_CFG_USER_CPF") ? "true" : undefined)("size", 4)("maskFormat", "000.000.000-00");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_CFG_USER_MAT") ? "true" : undefined)("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_CFG_USER_MAIL") ? "true" : undefined)("size", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_CFG_USER_PERFIL") ? "true" : undefined)("size", 4)("dao", ctx.perfilDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 8)("emptyValue", null)("control", ctx.formLotacao.controls.unidade_lotacao_id)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("items", ctx.lookup.UF);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("items", ctx.lookup.SEXO);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("maskFormat", "(00) 0000-0000||(00) 0 0000-0000");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", "Texto complementar " + ctx.lex.translate("Plano de Trabalho"))("dataset", ctx.planoDataset);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", ctx.lex.translate("Atribui\u00E7\u00F5es"));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("entity", ctx.entity)("entity_id", ctx.entity == null ? null : ctx.entity.id);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_10__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_11__["TabComponent"], _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_12__["ProfilePictureComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__["InputTextComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_14__["InputSelectComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__["InputSearchComponent"], _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_16__["InputRadioComponent"], _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_17__["InputEditorComponent"], _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_18__["UsuarioIntegranteComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c3VhcmlvLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ })

}]);
//# sourceMappingURL=modules-configuracoes-usuario-usuario-module.js.map