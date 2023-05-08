(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-configuracoes-preferencia-preferencia-module"],{

/***/ "FJiX":
/*!****************************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/preferencia/preferencia-form-petrvs/preferencia-form-petrvs.component.ts ***!
  \****************************************************************************************************************/
/*! exports provided: PreferenciaFormPetrvsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenciaFormPetrvsComponent", function() { return PreferenciaFormPetrvsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/entidade.model */ "4IcU");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");








function PreferenciaFormPetrvsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
class PreferenciaFormPetrvsComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_3__["Entidade"], src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["EntidadeDaoService"]);
        this.injector = injector;
        this.carregando = false;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando "; // + (entity?.unidade_id || "");
        };
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    }
    get isPanel() {
        return this.panel != undefined;
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            form.patchValue(this.util.fillForm(formValue, entity));
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.carregando = true;
            try {
                this.entity = new src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_3__["Entidade"]();
                yield this.loadData(this.entity, form);
            }
            finally {
                this.carregando = false;
            }
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            //let atividade = this.util.fill(new Entidade(), this.entity!);
            //resolve(this.util.fillForm(atividade, this.form!.value));
            resolve(!this.isPanel);
        });
    }
}
PreferenciaFormPetrvsComponent.ɵfac = function PreferenciaFormPetrvsComponent_Factory(t) { return new (t || PreferenciaFormPetrvsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
PreferenciaFormPetrvsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PreferenciaFormPetrvsComponent, selectors: [["preferencia-form-petrvs"]], viewQuery: function PreferenciaFormPetrvsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, inputs: { panel: "panel" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 5, consts: [["class", "d-flex justify-content-center", 4, "ngIf"], [3, "form", "noButtons", "submit", "cancel"], [1, "d-flex", "justify-content-center"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"]], template: function PreferenciaFormPetrvsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, PreferenciaFormPetrvsComponent_div_0_Template, 3, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "editable-form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function PreferenciaFormPetrvsComponent_Template_editable_form_submit_2_listener() { return ctx.onSaveData(); })("cancel", function PreferenciaFormPetrvsComponent_Template_editable_form_cancel_2_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " Em desenvolvimento ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.carregando);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("d-none", ctx.carregando);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("noButtons", ctx.isPanel ? "true" : undefined);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcmVmZXJlbmNpYS1mb3JtLXBldHJ2cy5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "GDlR":
/*!*************************************************************************!*\
  !*** ./src/app/modules/configuracoes/preferencia/preferencia.module.ts ***!
  \*************************************************************************/
/*! exports provided: PreferenciaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenciaModule", function() { return PreferenciaModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _preferencia_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preferencia-routing.module */ "XgWA");
/* harmony import */ var _preferencia_form_preferencia_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./preferencia-form/preferencia-form.component */ "P1d/");
/* harmony import */ var _preferencia_form_petrvs_preferencia_form_petrvs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preferencia-form-petrvs/preferencia-form-petrvs.component */ "FJiX");
/* harmony import */ var _preferencia_form_usuario_preferencia_form_usuario_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./preferencia-form-usuario/preferencia-form-usuario.component */ "bMRo");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class PreferenciaModule {
}
PreferenciaModule.ɵfac = function PreferenciaModule_Factory(t) { return new (t || PreferenciaModule)(); };
PreferenciaModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: PreferenciaModule });
PreferenciaModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_5__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
            _preferencia_routing_module__WEBPACK_IMPORTED_MODULE_1__["PreferenciaRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](PreferenciaModule, { declarations: [_preferencia_form_preferencia_form_component__WEBPACK_IMPORTED_MODULE_2__["PreferenciaFormComponent"],
        _preferencia_form_petrvs_preferencia_form_petrvs_component__WEBPACK_IMPORTED_MODULE_3__["PreferenciaFormPetrvsComponent"],
        _preferencia_form_usuario_preferencia_form_usuario_component__WEBPACK_IMPORTED_MODULE_4__["PreferenciaFormUsuarioComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_5__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
        _preferencia_routing_module__WEBPACK_IMPORTED_MODULE_1__["PreferenciaRoutingModule"]] }); })();


/***/ }),

/***/ "P1d/":
/*!**************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/preferencia/preferencia-form/preferencia-form.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: PreferenciaFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenciaFormComponent", function() { return PreferenciaFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-base */ "Z2oO");
/* harmony import */ var _preferencia_form_petrvs_preferencia_form_petrvs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../preferencia-form-petrvs/preferencia-form-petrvs.component */ "FJiX");
/* harmony import */ var _preferencia_form_usuario_preferencia_form_usuario_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../preferencia-form-usuario/preferencia-form-usuario.component */ "bMRo");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");












function PreferenciaFormComponent_tab_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tab", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Em desenvolvimento ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("label", ctx_r2.lex.noun("Entidade"));
} }
class PreferenciaFormComponent extends src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_2__["PageBase"] {
    /*private _submitting: boolean = false;
    public set submitting(value: boolean) {
      if(!value) {
        this.dialog.closeSppinerOverlay();
      } else if(!this._submitting) {
        this.dialog.showSppinerOverlay("Salvando dados do formulário");
      }
      this._submitting = value;
    }
    public get submitting(): boolean {
      return this._submitting;
    }
    private _loading: boolean = false;
    public set loading(value: boolean) {
      if(!value) {
        this.dialog.closeSppinerOverlay();
      } else if(!this._loading) {
        this.dialog.showSppinerOverlay("Carregando dados do formulário");
      }
      this._loading = value;
    }
    public get loading(): boolean {
      return this._loading;
    }*/
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.mensagemCarregando = "Carregando dados do formulário...";
        this.mensagemSalvando = "Salvando dados do formulário...";
        this.form = this.fh.FormBuilder({});
    }
    get forceInvalid() {
        var _a, _b, _c, _d;
        return !!((_b = (_a = this.petrvs) === null || _a === void 0 ? void 0 : _a.form) === null || _b === void 0 ? void 0 : _b.invalid) || !!((_d = (_c = this.usuario) === null || _c === void 0 ? void 0 : _c.form) === null || _d === void 0 ? void 0 : _d.invalid);
    }
    onSaveData() {
        var _a, _b, _c, _d, _e, _f;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.forceInvalid) {
                this.submitting = true;
                try {
                    yield Promise.all([
                        (_a = this.petrvs) === null || _a === void 0 ? void 0 : _a.onSaveData(),
                        (_b = this.usuario) === null || _b === void 0 ? void 0 : _b.onSaveData()
                    ]);
                    this.dialog.alert("Atenção", "Algumas modificações só surtirão efeito após atualizar a página.\nPor motivos de segurança esse procedimento, de atualizar a pagina, deverá ser executado pelo usuário.");
                    this.go.back();
                }
                catch (error) {
                    this.editableForm.error = error.message ? error.message : error;
                }
                finally {
                    this.submitting = false;
                }
            }
            else {
                if (!((_d = (_c = this.petrvs) === null || _c === void 0 ? void 0 : _c.form) === null || _d === void 0 ? void 0 : _d.invalid))
                    this.editableForm.error = "Forme Petrvs com erro";
                if (!((_f = (_e = this.usuario) === null || _e === void 0 ? void 0 : _e.form) === null || _f === void 0 ? void 0 : _f.invalid))
                    this.editableForm.error = "Forme do usuário com erro";
            }
        });
    }
    onCancel() {
        this.close();
    }
}
PreferenciaFormComponent.ɵfac = function PreferenciaFormComponent_Factory(t) { return new (t || PreferenciaFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
PreferenciaFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PreferenciaFormComponent, selectors: [["app-preferencia-form"]], viewQuery: function PreferenciaFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_preferencia_form_petrvs_preferencia_form_petrvs_component__WEBPACK_IMPORTED_MODULE_3__["PreferenciaFormPetrvsComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_preferencia_form_usuario_preferencia_form_usuario_component__WEBPACK_IMPORTED_MODULE_4__["PreferenciaFormUsuarioComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.petrvs = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 6, consts: [[3, "form", "forceInvalid", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "USUARIO", 3, "label"], ["panel", "", 3, "usuarioId"], ["usuario", ""], ["key", "PETRVS", "label", "Petrvs"], ["panel", ""], ["petrvs", ""], ["key", "ENTIDADE", 3, "label", 4, "ngIf"], ["key", "ENTIDADE", 3, "label"]], template: function PreferenciaFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function PreferenciaFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function PreferenciaFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "preferencia-form-usuario", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "tab", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "preferencia-form-petrvs", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, PreferenciaFormComponent_tab_8_Template, 2, 1, "tab", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("forceInvalid", ctx.forceInvalid)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("label", ctx.lex.noun("Usu\u00E1rio"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("usuarioId", ctx.auth.usuario.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.auth.entidade);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_7__["TabComponent"], _preferencia_form_usuario_preferencia_form_usuario_component__WEBPACK_IMPORTED_MODULE_4__["PreferenciaFormUsuarioComponent"], _preferencia_form_petrvs_preferencia_form_petrvs_component__WEBPACK_IMPORTED_MODULE_3__["PreferenciaFormPetrvsComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcmVmZXJlbmNpYS1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "XgWA":
/*!*********************************************************************************!*\
  !*** ./src/app/modules/configuracoes/preferencia/preferencia-routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: PreferenciaRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenciaRoutingModule", function() { return PreferenciaRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _preferencia_form_usuario_preferencia_form_usuario_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preferencia-form-usuario/preferencia-form-usuario.component */ "bMRo");
/* harmony import */ var _preferencia_form_preferencia_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./preferencia-form/preferencia-form.component */ "P1d/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _preferencia_form_preferencia_form_component__WEBPACK_IMPORTED_MODULE_4__["PreferenciaFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Preferências" } },
    { path: 'usuario/:id', component: _preferencia_form_usuario_preferencia_form_usuario_component__WEBPACK_IMPORTED_MODULE_3__["PreferenciaFormUsuarioComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Preferências do usuário" } }
];
class PreferenciaRoutingModule {
}
PreferenciaRoutingModule.ɵfac = function PreferenciaRoutingModule_Factory(t) { return new (t || PreferenciaRoutingModule)(); };
PreferenciaRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: PreferenciaRoutingModule });
PreferenciaRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](PreferenciaRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "bMRo":
/*!******************************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/preferencia/preferencia-form-usuario/preferencia-form-usuario.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: PreferenciaFormUsuarioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenciaFormUsuarioComponent", function() { return PreferenciaFormUsuarioComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/usuario.model */ "11oC");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ "/VYb");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");















function PreferenciaFormUsuarioComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function PreferenciaFormUsuarioComponent_separator_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "separator", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "input-switch", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "input-switch", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("title", "Prefer\u00EAncias de exibi\u00E7\u00E3o " + ctx_r1.lex.noun("usu\u00E1rio", false, true));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", "Ocultar menu lateral do sei no Controle de " + ctx_r1.lex.noun("Processo", true));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12);
} }
class PreferenciaFormUsuarioComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_3__["Usuario"], src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioDaoService"]);
        this.injector = injector;
        this.etiquetas = false;
        this.carregando = false;
        this.toolbarButtons = [
            {
                label: "Resetar",
                icon: "bi bi-backspace",
                onClick: () => {
                    this.loading = true;
                    this.dao.update(this.usuarioId, { config: new src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_3__["UsuarioConfig"]() }).then(usuario => {
                        this.initializeData(this.form);
                    }).finally(() => {
                        this.loading = false;
                    });
                }
            }
        ];
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando "; // + (entity?.unidade_id || "");
        };
        this.form = this.fh.FormBuilder({
            etiquetas: { default: [] },
            etiqueta_texto: { default: "" },
            etiqueta_icone: { default: null },
            etiqueta_cor: { default: null },
            ocultar_menu_sei: { default: true },
            ocultar_container_petrvs: { default: false },
            notifica_demanda_distribuicao: { default: true },
            notifica_demanda_conclusao: { default: true },
            notifica_demanda_avaliacao: { default: true },
            notifica_demanda_modificacao: { default: true },
            notifica_demanda_comentario: { default: true },
            enviar_email: { default: true },
            enviar_whatsapp: { default: true }
        }, this.cdRef, this.validate);
    }
    get isPanel() {
        return this.panel != undefined;
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.urlParams.get("id")) {
            this.usuarioId = this.urlParams.get("id");
        }
        this.etiquetas = !!this.queryParams.etiquetas;
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity.config || {});
            formValue = this.util.fillForm(formValue, entity.notificacoes || {});
            form.patchValue(formValue);
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.carregando = true;
            try {
                this.entity = (yield this.dao.getById(this.usuarioId));
                yield this.loadData(this.entity, form);
            }
            finally {
                this.carregando = false;
            }
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            /*let config = this.util.fill(new UsuarioConfig(), this.entity!.config || {});
            config = this.util.fillForm(config, this.form!.value);
            this.usuario!.config = Object.assign(this.usuario!.config, value);
            this.usuarioDaoService.updateJson(this.usuario!.id, 'config', value);*/
            //this.dao!.update(this.usuarioId!, {config: config})
            let config = this.util.fill(new src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_3__["UsuarioConfig"](), this.form.value);
            let notificacoes = this.util.fill(new src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_3__["UsuarioNotificacoes"](), this.form.value);
            Promise.all([
                this.auth.updateUsuarioConfig(this.usuarioId, config),
                this.auth.updateUsuarioNotificacoes(this.usuarioId, notificacoes)
            ]).then(results => {
                if (this.usuarioId == this.auth.usuario.id) {
                    this.auth.authSession().then(result => resolve(!this.isPanel)).catch(reject);
                }
                else {
                    resolve(!this.isPanel);
                }
            }).catch(reject);
        });
    }
    addItemHandleEtiquetas() {
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
}
PreferenciaFormUsuarioComponent.ɵfac = function PreferenciaFormUsuarioComponent_Factory(t) { return new (t || PreferenciaFormUsuarioComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
PreferenciaFormUsuarioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PreferenciaFormUsuarioComponent, selectors: [["preferencia-form-usuario"]], viewQuery: function PreferenciaFormUsuarioComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, inputs: { panel: "panel", usuarioId: "usuarioId" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 23, vars: 25, consts: [["class", "d-flex justify-content-center", 4, "ngIf"], [3, "buttons"], [3, "form", "noButtons", "submit", "cancel"], [1, "row"], ["label", "Etiquetas", "multiselectStyle", "inline", "controlName", "etiquetas", 3, "size", "addItemHandle"], ["label", "Texto", "controlName", "etiqueta_texto", 3, "size"], ["label", "\u00CDcone", "icon", "fas fa-sign-out-alt", "controlName", "etiqueta_icone", "liveSearch", "", 3, "size", "items"], ["label", "Cor", "controlName", "etiqueta_cor", 3, "size"], ["transparent", "", 3, "title", 4, "ngIf"], ["transparent", "", "title", "Prefer\u00EAncias notifica\u00E7\u00F5es"], [1, "col-md-6"], ["transparent", "", "title", "Meios de notifica\u00E7\u00E3o"], ["scale", "small", "labelPosition", "right", "label", "Notificar por e-mail", "controlName", "enviar_email", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar por Whatsapp", "controlName", "enviar_whatsapp", 3, "size"], ["transparent", "", "title", "Tipos de notifica\u00E7\u00E3o"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_distribuicao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_conclusao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_avaliacao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_modificacao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "notifica_demanda_comentario", 3, "size", "label"], [1, "d-flex", "justify-content-center"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], ["transparent", "", 3, "title"], ["scale", "small", "labelPosition", "right", "controlName", "ocultar_menu_sei", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "label", "Ocultar o container Petrvs", "controlName", "ocultar_container_petrvs", 3, "size"]], template: function PreferenciaFormUsuarioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, PreferenciaFormUsuarioComponent_div_0_Template, 3, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "editable-form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function PreferenciaFormUsuarioComponent_Template_editable_form_submit_3_listener() { return ctx.onSaveData(); })("cancel", function PreferenciaFormUsuarioComponent_Template_editable_form_cancel_3_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "input-multiselect", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "input-select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "input-color", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, PreferenciaFormUsuarioComponent_separator_9_Template, 4, 4, "separator", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "separator", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "separator", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](14, "input-switch", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](15, "input-switch", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](17, "separator", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](18, "input-switch", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](19, "input-switch", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](20, "input-switch", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](21, "input-switch", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](22, "input-switch", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.carregando);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("d-none", ctx.carregando);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("buttons", ctx.toolbarButtons);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("noButtons", ctx.isPanel ? "true" : undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("addItemHandle", ctx.addItemHandleEtiquetas.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 3)("items", ctx.lookup.ICONES);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.etiquetas);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", "Notificar distribui\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", "Notificar conclus\u00E3o " + ctx.lex.noun("demanda", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", "Notificar avalia\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", "Notificar modifica\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", "Notificar coment\u00E1rio " + ctx.lex.noun("demanda", false, true));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__["ToolbarComponent"], src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_8__["InputMultiselectComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__["InputTextComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__["InputSelectComponent"], _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_11__["InputColorComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__["SeparatorComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__["InputSwitchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcmVmZXJlbmNpYS1mb3JtLXVzdWFyaW8uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ })

}]);
//# sourceMappingURL=modules-configuracoes-preferencia-preferencia-module.js.map