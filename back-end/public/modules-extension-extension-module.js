(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-extension-extension-module"],{

/***/ "E4bg":
/*!****************************************************************!*\
  !*** ./src/app/modules/extension/options/options.component.ts ***!
  \****************************************************************/
/*! exports provided: OptionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsComponent", function() { return OptionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_form_helper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/form-helper.service */ "mp9f");
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ "lYxd");







function OptionsComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "input-text", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "input-text", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 6);
} }
class OptionsComponent {
    constructor(fh) {
        this.fh = fh;
        this.webBrowser = (chrome || browser);
        this.form = this.fh.FormBuilder({
            desenvolvimento: { default: false },
            useLocal: { default: false },
            homologacao: { default: false },
            baseUrl: { default: "" },
            servidorUrl: { default: "" }
        });
    }
    ngOnInit() {
        this.webBrowser.storage.sync.get(['petrvs'], (result) => {
            this.config = result.petrvs || {};
            this.form.patchValue(this.config);
        });
    }
    salvar() {
        const values = this.form.value;
        const newValues = Object.assign(this.config, values);
        this.webBrowser.storage.sync.set({ petrvs: newValues }, () => {
            alert("Salvo com sucesso!");
            window.close();
        });
    }
    cancelar() {
        window.close();
    }
}
OptionsComponent.ɵfac = function OptionsComponent_Factory(t) { return new (t || OptionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_form_helper_service__WEBPACK_IMPORTED_MODULE_1__["FormHelperService"])); };
OptionsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OptionsComponent, selectors: [["app-options"]], decls: 8, vars: 5, consts: [["title", "Op\u00E7\u00F5es do Petrvs", 3, "form", "submit", "cancel"], [1, "row"], ["scale", "small", "labelPosition", "right", "label", "Usar arquivos locais", "controlName", "useLocal", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Homologa\u00E7\u00E3o", "controlName", "homologacao", 3, "size"], ["title", "Desenvolvedor", "transparent", ""], ["scale", "small", "labelPosition", "right", "label", "Modo do desenvolvedor", "controlName", "desenvolvimento", 3, "size"], ["class", "row", 4, "ngIf"], ["label", "URL da Aplica\u00E7\u00E3o (Deploy)", "controlName", "baseUrl", 3, "size"], ["label", "URL do Servidor (API)", "controlName", "servidorUrl", 3, "size"]], template: function OptionsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function OptionsComponent_Template_editable_form_submit_0_listener() { return ctx.salvar(); })("cancel", function OptionsComponent_Template_editable_form_cancel_0_listener() { return ctx.cancelar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "input-switch", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input-switch", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "separator", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input-switch", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, OptionsComponent_div_7_Template, 3, 2, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("form", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.form.controls.desenvolvimento.value);
    } }, directives: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_3__["InputSwitchComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_4__["SeparatorComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__["InputTextComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvcHRpb25zLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "Rb2M":
/*!************************************************************!*\
  !*** ./src/app/modules/extension/popup/popup.component.ts ***!
  \************************************************************/
/*! exports provided: PopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupComponent", function() { return PopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class PopupComponent {
    constructor() { }
    ngOnInit() {
    }
}
PopupComponent.ɵfac = function PopupComponent_Factory(t) { return new (t || PopupComponent)(); };
PopupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PopupComponent, selectors: [["app-popup"]], decls: 2, vars: 0, template: function PopupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "popup works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwb3B1cC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "hrbr":
/*!*******************************************************!*\
  !*** ./src/app/modules/extension/extension.module.ts ***!
  \*******************************************************/
/*! exports provided: ExtensionModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtensionModule", function() { return ExtensionModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _extension_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extension-routing.module */ "nlUK");
/* harmony import */ var _popup_popup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popup/popup.component */ "Rb2M");
/* harmony import */ var _options_options_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options/options.component */ "E4bg");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class ExtensionModule {
}
ExtensionModule.ɵfac = function ExtensionModule_Factory(t) { return new (t || ExtensionModule)(); };
ExtensionModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: ExtensionModule });
ExtensionModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _extension_routing_module__WEBPACK_IMPORTED_MODULE_1__["ExtensionRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ExtensionModule, { declarations: [_popup_popup_component__WEBPACK_IMPORTED_MODULE_2__["PopupComponent"],
        _options_options_component__WEBPACK_IMPORTED_MODULE_3__["OptionsComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _extension_routing_module__WEBPACK_IMPORTED_MODULE_1__["ExtensionRoutingModule"]] }); })();


/***/ }),

/***/ "nlUK":
/*!***************************************************************!*\
  !*** ./src/app/modules/extension/extension-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: ExtensionRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtensionRoutingModule", function() { return ExtensionRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _options_options_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options/options.component */ "E4bg");
/* harmony import */ var _popup_popup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popup/popup.component */ "Rb2M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





const routes = [
    { path: 'popup', component: _popup_popup_component__WEBPACK_IMPORTED_MODULE_2__["PopupComponent"] },
    { path: 'options', component: _options_options_component__WEBPACK_IMPORTED_MODULE_1__["OptionsComponent"] },
];
class ExtensionRoutingModule {
}
ExtensionRoutingModule.ɵfac = function ExtensionRoutingModule_Factory(t) { return new (t || ExtensionRoutingModule)(); };
ExtensionRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ExtensionRoutingModule });
ExtensionRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ExtensionRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=modules-extension-extension-module.js.map