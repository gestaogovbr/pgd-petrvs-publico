"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[6568],{

/***/ 13478:
/*!*************************************************************************!*\
  !*** ./src/app/modules/gestao/desdobramento/desdobramento.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesdobramentoComponent: () => (/* binding */ DesdobramentoComponent)
/* harmony export */ });
/* harmony import */ var _base_page_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/page-base */ 17112);
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ 92214);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var primeng_organizationchart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/organizationchart */ 29124);




class DesdobramentoComponent extends _base_page_base__WEBPACK_IMPORTED_MODULE_0__.PageBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.typeObject = '';
    this.idObject = '';
    this.data = [{
      label: 'F.C Barcelona',
      expanded: true,
      children: [{
        label: 'Argentina',
        expanded: true,
        styleClass: 'bg-success text-white',
        children: [{
          label: 'Argentina'
        }, {
          label: 'France'
        }]
      }, {
        label: 'France',
        expanded: true,
        children: [{
          label: 'France'
        }, {
          label: 'Morocco'
        }]
      }]
    }];
    this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_1__.ProgramaDaoService);
  }
  ngOnInit() {
    super.ngOnInit();
    this.typeObject = this.urlParams?.get('type') || "";
    this.idObject = this.urlParams?.get('id') || "";
    console.log(this.idObject);
    console.log(this.typeObject);
    switch (this.typeObject) {
      case 'programa':
        this.carregaPrograma();
        break;
      default:
        break;
    }
  }
  carregaPrograma() {
    this.programaDao.getById(this.idObject);
  }
  static #_ = this.ɵfac = function DesdobramentoComponent_Factory(t) {
    return new (t || DesdobramentoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: DesdobramentoComponent,
    selectors: [["app-desdobramento"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
    decls: 1,
    vars: 1,
    consts: [[3, "value"]],
    template: function DesdobramentoComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "p-organizationChart", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.data);
      }
    },
    dependencies: [primeng_organizationchart__WEBPACK_IMPORTED_MODULE_3__.OrganizationChart],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 56568:
/*!**********************************************************************!*\
  !*** ./src/app/modules/gestao/desdobramento/desdobramento.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesdobramentoModule: () => (/* binding */ DesdobramentoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _desdobramento_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./desdobramento.component */ 13478);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var primeng_organizationchart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/organizationchart */ 29124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51197);








const routes = [{
  path: ':id/:type',
  component: _desdobramento_component__WEBPACK_IMPORTED_MODULE_0__.DesdobramentoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Desdobramento",
    modal: true
  }
}];
class DesdobramentoModule {
  static #_ = this.ɵfac = function DesdobramentoModule_Factory(t) {
    return new (t || DesdobramentoModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: DesdobramentoModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forRoot(routes), _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, primeng_organizationchart__WEBPACK_IMPORTED_MODULE_6__.OrganizationChartModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](DesdobramentoModule, {
    declarations: [_desdobramento_component__WEBPACK_IMPORTED_MODULE_0__.DesdobramentoComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, primeng_organizationchart__WEBPACK_IMPORTED_MODULE_6__.OrganizationChartModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=6568.js.map