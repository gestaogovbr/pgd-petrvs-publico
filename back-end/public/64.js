"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[64],{

/***/ 37878:
/*!*************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/curriculum-cadastros-routing.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumCadastrosRoutingModule: () => (/* binding */ CurriculumCadastrosRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;




const routes = [{
  path: 'areaatividadeexterna',
  loadChildren: () => __webpack_require__.e(/*! import() */ 5908).then(__webpack_require__.bind(__webpack_require__, /*! ./area-atividade-externa/area-atividade-externa.module */ 45908)).then(m => m.AreaAtividadeExternaModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'areaconhecimento',
  loadChildren: () => __webpack_require__.e(/*! import() */ 2720).then(__webpack_require__.bind(__webpack_require__, /*! ./area-conhecimento/area-conhecimento.module */ 62720)).then(m => m.AreaConhecimentoModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'curso',
  loadChildren: () => __webpack_require__.e(/*! import() */ 575).then(__webpack_require__.bind(__webpack_require__, /*! ./curso/curso.module */ 10575)).then(m => m.CursoModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'tipocurso',
  loadChildren: () => __webpack_require__.e(/*! import() */ 2747).then(__webpack_require__.bind(__webpack_require__, /*! ./tipo-curso/tipo-curso.module */ 82747)).then(m => m.TipoCursoModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'centrotreinamento',
  loadChildren: () => __webpack_require__.e(/*! import() */ 7869).then(__webpack_require__.bind(__webpack_require__, /*! ./centro-treinamento/centro-treinamento.module */ 97869)).then(m => m.CentroTreinamentoModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'funcao',
  loadChildren: () => __webpack_require__.e(/*! import() */ 651).then(__webpack_require__.bind(__webpack_require__, /*! ./funcao/funcao.module */ 70651)).then(m => m.FuncaoModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'grupoespecializado',
  loadChildren: () => __webpack_require__.e(/*! import() */ 1199).then(__webpack_require__.bind(__webpack_require__, /*! ./grupo-especializado/grupo-especializado.module */ 81199)).then(m => m.GrupoEspecializadoModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'materia',
  loadChildren: () => __webpack_require__.e(/*! import() */ 8275).then(__webpack_require__.bind(__webpack_require__, /*! ./materia/materia.module */ 68275)).then(m => m.MateriaModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'cargo',
  loadChildren: () => __webpack_require__.e(/*! import() */ 4286).then(__webpack_require__.bind(__webpack_require__, /*! ./cargo/cargo.module */ 94286)).then(m => m.CargoModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'funcao',
  loadChildren: () => __webpack_require__.e(/*! import() */ 651).then(__webpack_require__.bind(__webpack_require__, /*! ./funcao/funcao.module */ 70651)).then(m => m.FuncaoModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'areatematica',
  loadChildren: () => __webpack_require__.e(/*! import() */ 2238).then(__webpack_require__.bind(__webpack_require__, /*! ./area-tematica/area-tematica.module */ 92238)).then(m => m.AreaTematicaModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'capacidadetecnica',
  loadChildren: () => __webpack_require__.e(/*! import() */ 8919).then(__webpack_require__.bind(__webpack_require__, /*! ./capacidade-tecnica/capacidade-tecnica.module */ 28919)).then(m => m.CapacidadeTecnicaModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'questionario',
  loadChildren: () => __webpack_require__.e(/*! import() */ 8934).then(__webpack_require__.bind(__webpack_require__, /*! ./questionario/questionario.module */ 98934)).then(m => m.QuestionarioModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}
//{ path: 'materia', component: MateriaListComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Lista", modal: false } },
//{ path: 'materia/new', component: MateriaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
//{ path: 'materia/:id/edit', component: MateriaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
//{ path: 'materia/:id/consult', component: MateriaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
];

class CurriculumCadastrosRoutingModule {}
_class = CurriculumCadastrosRoutingModule;
_class.ɵfac = function CurriculumCadastrosRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](CurriculumCadastrosRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 64:
/*!*****************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/curriculum-cadastros.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumCadastrosModule: () => (/* binding */ CurriculumCadastrosModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _curriculum_cadastros_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curriculum-cadastros-routing.module */ 37878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;





class CurriculumCadastrosModule {}
_class = CurriculumCadastrosModule;
_class.ɵfac = function CurriculumCadastrosModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _curriculum_cadastros_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumCadastrosRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CurriculumCadastrosModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _curriculum_cadastros_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumCadastrosRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=64.js.map