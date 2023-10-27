"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[8592],{

/***/ 65296:
/*!****************************************************!*\
  !*** ./src/app/models/tipo-justificativa.model.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoJustificativa: () => (/* binding */ TipoJustificativa)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class TipoJustificativa extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; /* Descrição do tipo da justificativa */
    this.initialization(data);
  }
}

/***/ }),

/***/ 34269:
/*!************************************************!*\
  !*** ./src/app/modules/home/home.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth.service */ 32333);
/* harmony import */ var src_app_services_util_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/util.service */ 49193);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var src_app_services_lexical_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/lexical.service */ 15908);
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/navigate.service */ 92307);
/* harmony import */ var src_app_services_globals_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/globals.service */ 91547);
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ 79084);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 82454);

var _class;











class HomeComponent {
  constructor(auth, utils, usuarioDao, unidadeDao, atividadeDao, injector, lex, go, gb, allPages) {
    this.auth = auth;
    this.utils = utils;
    this.usuarioDao = usuarioDao;
    this.unidadeDao = unidadeDao;
    this.atividadeDao = atividadeDao;
    this.injector = injector;
    this.lex = lex;
    this.go = go;
    this.gb = gb;
    this.allPages = allPages;
  }
  ngOnInit() {
    if (this.gb.isEmbedded) {
      this.allPages.visibilidadeMenuSei(!this.auth.usuario.config.ocultar_menu_sei);
    }
  }
  ngAfterViewInit() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  }
  mensagemSaudacao() {
    const hora = parseInt(this.auth.unidadeHora.replace(":", ""));
    const apelido = this.auth.usuario?.apelido;
    const mail = this.auth.usuario?.email;
    return hora < 1200 ? "Bom dia, " + apelido : hora < 1800 ? "Boa tarde, " + apelido : "Boa noite, " + apelido;
  }
  emailUsuario() {
    const mail = this.auth.usuario?.email;
    return mail;
  }
  tokenGAPI() {
    this.auth.googleApi.getAccessToken().then(res => {
      const sei = res || '';
    });
  }
  getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0);
  }
}
_class = HomeComponent;
_class.ɵfac = function HomeComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_services_util_service__WEBPACK_IMPORTED_MODULE_2__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__.UsuarioDaoService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__.UnidadeDaoService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__.AtividadeDaoService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_services_lexical_service__WEBPACK_IMPORTED_MODULE_6__.LexicalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_7__.NavigateService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_services_globals_service__WEBPACK_IMPORTED_MODULE_8__.GlobalsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__.ListenerAllPagesService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-home"]],
  decls: 5,
  vars: 1,
  consts: [[1, "container-fluid"], [1, "saudacao"], [1, ""]],
  template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx.mensagemSaudacao());
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterOutlet],
  styles: ["@import url(https://fonts.cdnfonts.com/css/neutra-text-alt);.card[_ngcontent-%COMP%] {\n  box-shadow: 0 0.1875rem 0.1875rem 0 rgba(14, 34, 56, 0.07);\n  margin-bottom: 1.875rem;\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 600;\n}\n.card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  font-weight: 200;\n}\n.card.atrasadas[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a00d0d;\n}\n.card.concluidas[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #0e8554;\n}\n\n.minhas[_ngcontent-%COMP%] {\n  padding: 15px;\n  color: #adadad;\n}\n.minhas[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .minhas[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.avaliacoes[_ngcontent-%COMP%] {\n  color: white;\n}\n.avaliacoes.acima[_ngcontent-%COMP%] {\n  background: #ffc100;\n}\n.avaliacoes.abaixo[_ngcontent-%COMP%] {\n  background: #ff4000;\n}\n\n.dashGestor[_ngcontent-%COMP%]   .usuario[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dcdcdc;\n  padding: 10px 0;\n}\n.dashGestor[_ngcontent-%COMP%]   .usuario[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  margin: 0 20px;\n}\n.dashGestor[_ngcontent-%COMP%]   .usuario[_ngcontent-%COMP%]   .w-30[_ngcontent-%COMP%] {\n  width: 30%;\n}\n.dashGestor[_ngcontent-%COMP%]   .usuario[_ngcontent-%COMP%]:last-child {\n  border: none;\n}\n\n.saudacao[_ngcontent-%COMP%] {\n  font-family: neutra text;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDSSwwREFBQTtFQUNBLHVCQUFBO0FBREo7QUFHSTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtBQURSO0FBSUk7RUFDSSxnQkFBQTtFQUNBLGdCQUFBO0FBRlI7QUFNUTtFQUNJLGNBQUE7QUFKWjtBQVNRO0VBQ0ksY0FBQTtBQVBaOztBQVlBO0VBQ0ksYUFBQTtFQUNBLGNBQUE7QUFUSjtBQVdJOztFQUVJLFNBQUE7QUFUUjs7QUFhQTtFQUNJLFlBQUE7QUFWSjtBQVlJO0VBQ0ksbUJBQUE7QUFWUjtBQWFJO0VBQ0ksbUJBQUE7QUFYUjs7QUFnQkk7RUFDSSxnQ0FBQTtFQUNBLGVBQUE7QUFiUjtBQWVRO0VBQ0ksZUFBQTtFQUNBLGNBQUE7QUFiWjtBQWdCUTtFQUNJLFVBQUE7QUFkWjtBQWlCUTtFQUNJLFlBQUE7QUFmWjs7QUFvQkE7RUFFSSx3QkFBQTtFQUNBLGlCQUFBO0FBbEJKIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmNkbmZvbnRzLmNvbS9jc3MvbmV1dHJhLXRleHQtYWx0Jyk7XHJcblxyXG4uY2FyZCB7XHJcbiAgICBib3gtc2hhZG93OiAwIDAuMTg3NXJlbSAwLjE4NzVyZW0gMCByZ2JhKDE0LCAzNCwgNTYsIC4wNyk7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxLjg3NXJlbTtcclxuXHJcbiAgICBoMyB7XHJcbiAgICAgICAgZm9udC1zaXplOiAycmVtO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICB9XHJcblxyXG4gICAgcCB7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcclxuICAgICAgICBmb250LXdlaWdodDogMjAwO1xyXG4gICAgfVxyXG5cclxuICAgICYuYXRyYXNhZGFzIHtcclxuICAgICAgICBwIHtcclxuICAgICAgICAgICAgY29sb3I6ICNhMDBkMGQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICYuY29uY2x1aWRhcyB7XHJcbiAgICAgICAgcCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMGU4NTU0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLm1pbmhhcyB7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG4gICAgY29sb3I6ICNhZGFkYWQ7XHJcblxyXG4gICAgaDQsXHJcbiAgICBoNSB7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4uYXZhbGlhY29lcyB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcblxyXG4gICAgJi5hY2ltYSB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmYzEwMDtcclxuICAgIH1cclxuXHJcbiAgICAmLmFiYWl4byB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmNDAwMDtcclxuICAgIH1cclxufVxyXG5cclxuLmRhc2hHZXN0b3Ige1xyXG4gICAgLnVzdWFyaW8ge1xyXG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGNkY2RjO1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHggMDtcclxuXHJcbiAgICAgICAgaDMge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICAgICAgICAgIG1hcmdpbjogMCAyMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnctMzAge1xyXG4gICAgICAgICAgICB3aWR0aDogMzAlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLnNhdWRhY2FvIHtcclxuICAgLy9jb2xvcjogIzFkMjE0MztcclxuICAgIGZvbnQtZmFtaWx5OiBuZXV0cmEgdGV4dDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 103:
/*!********************************************************!*\
  !*** ./src/app/services/unidade-integrante.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeIntegranteService: () => (/* binding */ UnidadeIntegranteService)
/* harmony export */ });
/* harmony import */ var _lookup_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lookup.service */ 39702);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class UnidadeIntegranteService {
  constructor(injector) {
    this.injector = injector;
    this.lookup = this.injector.get(_lookup_service__WEBPACK_IMPORTED_MODULE_0__.LookupService);
  }
  converterAtribuicoes(atribuicoes) {
    return atribuicoes.map(x => Object.assign({}, {
      key: x,
      value: this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      icon: this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      color: this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, x)
    }));
  }
  alterandoGestor(form, items) {
    let result = [];
    ['GESTOR', 'GESTOR_DELEGADO', 'GESTOR_SUBSTITUTO'].forEach(g => {
      if (form.controls.atribuicoes.value.map(a => a.key).includes(g) && items.find(i => i.atribuicoes.includes(g))) result.push(this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, g));
    });
    return result;
  }
  ordenar(items) {
    items.sort((a, b) => {
      let x = (a.usuario_nome || a.unidade_nome)?.toLowerCase();
      let y = (b.usuario_nome || b.unidade_nome)?.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    return items;
  }
}
_class = UnidadeIntegranteService;
_class.ɵfac = function UnidadeIntegranteService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ })

}]);
//# sourceMappingURL=common.js.map