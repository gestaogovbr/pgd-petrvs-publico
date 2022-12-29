(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~modules-cadastros-feriado-feriado-module~modules-configuracoes-entidade-entidade-module~modu~4c5d11a0"],{

/***/ "+vn/":
/*!************************************************!*\
  !*** ./src/app/modules/base/page-list-base.ts ***!
  \************************************************/
/*! exports provided: PageListBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageListBase", function() { return PageListBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _page_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page-base */ "Z2oO");
/* harmony import */ var src_app_dao_query_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/query-context */ "wzDc");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




//@Component({ template: '' })
class PageListBase extends _page_base__WEBPACK_IMPORTED_MODULE_1__["PageBase"] {
    constructor(injector, mType, dType) {
        super(injector);
        this.injector = injector;
        this.join = [];
        this.rowsLimit = src_app_dao_query_context__WEBPACK_IMPORTED_MODULE_2__["QueryContext"].DEFAULT_LIMIT;
        this.selectable = false;
        this.add = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.go.navigate({ route: [...this.go.currentOrDefault.route, "new"] }, {
                filterSnapshot: undefined,
                querySnapshot: undefined,
                modalClose: (modalResult) => {
                    if (modalResult)
                        this.grid.query.refresh();
                }
            });
        });
        this.edit = (doc) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.go.navigate({ route: [...this.go.currentOrDefault.route, doc.id, "edit"] }, {
                filterSnapshot: undefined,
                querySnapshot: undefined,
                modalClose: (modalResult) => {
                    if (modalResult)
                        this.grid.query.refreshId(doc.id);
                }
            });
        });
        this.delete = (doc) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const self = this;
            this.dialog.confirm("Exclui ?", "Deseja realmente excluir?").then(confirm => {
                if (confirm) {
                    this.dao.delete(doc).then(function () {
                        self.grid.query.refresh();
                        self.dialog.alert("Sucesso", "Registro excluído com sucesso!");
                    }).catch(function (error) {
                        self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                    });
                }
            });
        });
        this.error = (error) => {
            if (this.grid)
                this.grid.error = error;
        };
        this.dao = injector.get(dType);
    }
    onLoad() {
        var _a;
        (_a = this.grid) === null || _a === void 0 ? void 0 : _a.queryInit();
    }
    ngOnInit() {
        var _a;
        super.ngOnInit();
        this.selectable = !!((_a = this.queryParams) === null || _a === void 0 ? void 0 : _a.selectable);
        if (this.selectable) {
            this.title = "Selecionar " + this.title;
        }
    }
    ngAfterViewInit() {
        var _a, _b, _c, _d;
        if ((_a = this.queryParams) === null || _a === void 0 ? void 0 : _a.filter) {
            if (this.loadFilterParams) {
                this.loadFilterParams((_b = this.queryParams) === null || _b === void 0 ? void 0 : _b.filter, this.filter);
            }
            else {
                (_c = this.filter) === null || _c === void 0 ? void 0 : _c.patchValue((_d = this.queryParams) === null || _d === void 0 ? void 0 : _d.filter, { emitEvent: true });
            }
        }
        this.onLoad();
    }
    onSelect(selected) {
        var _a, _b;
        const routeId = (_b = (_a = this.modalRoute) === null || _a === void 0 ? void 0 : _a.queryParams) === null || _b === void 0 ? void 0 : _b.idroute;
        if (selected && (routeId === null || routeId === void 0 ? void 0 : routeId.length)) {
            this.go.setModalResult(routeId, selected.id);
            this.go.back(undefined, this.backRoute);
        }
    }
}
PageListBase.ɵfac = function PageListBase_Factory(t) { return new (t || PageListBase)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Type"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Type"])); };
PageListBase.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: PageListBase, factory: PageListBase.ɵfac });


/***/ }),

/***/ "793T":
/*!************************************************!*\
  !*** ./src/app/modules/base/page-form-base.ts ***!
  \************************************************/
/*! exports provided: PageFormBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageFormBase", function() { return PageFormBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _page_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page-base */ "Z2oO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



//@Component({ template: '' })
class PageFormBase extends _page_base__WEBPACK_IMPORTED_MODULE_1__["PageBase"] {
    constructor(injector, mType, dType) {
        super(injector);
        this.injector = injector;
        this.action = "";
        this._submitting = false;
        this._loading = false;
        /* Configurações */
        this.join = [];
        this.mensagemSalvarSucesso = "Registro salvo com sucesso!";
        this.error = (error) => {
            if (this.editableForm)
                this.editableForm.error = error;
        };
        this.dao = injector.get(dType);
    }
    set submitting(value) {
        if (!value) {
            this.dialog.closeSppinerOverlay();
        }
        else if (!this._submitting) {
            this.dialog.showSppinerOverlay("Salvando dados do formulário");
        }
        this._submitting = value;
    }
    get submitting() {
        return this._submitting;
    }
    set loading(value) {
        if (!value) {
            this.dialog.closeSppinerOverlay();
        }
        else if (!this._loading) {
            this.dialog.showSppinerOverlay("Carregando dados do formulário");
        }
        this._loading = value;
    }
    get loading() {
        return this._loading;
    }
    ngOnInit() {
        var _a;
        super.ngOnInit();
        const segment = (this.url ? (_a = this.url[this.url.length - 1]) === null || _a === void 0 ? void 0 : _a.path : "") || "";
        this.action = ["edit", "consult"].includes(segment) ? segment : "new";
    }
    ngAfterViewInit() {
        this.onInitializeData();
        this.cdRef.detectChanges();
    }
    get formDisabled() {
        return this.action == "consult";
    }
    onInitializeData() {
        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            try {
                if (["edit", "consult"].includes(this.action)) {
                    const entity = yield this.dao.getById(this.urlParams.get("id"), this.join);
                    this.entity = entity;
                    yield this.loadData(this.entity, this.form);
                }
                else if (this.action == "new") {
                    yield this.initializeData(this.form);
                }
            }
            catch (erro) {
                this.error("Erro ao carregar dados: " + erro);
            }
            finally {
                this.loading = false;
            }
        }))();
    }
    onSaveData() {
        var _a, _b, _c, _d, _e, _f;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const self = this;
            const error = this.formValidation ? this.formValidation(this.form) : undefined;
            if (this.form.valid && !error) {
                this.submitting = true;
                try {
                    let entity = yield this.saveData(this.form.value);
                    if (entity) {
                        let saved = typeof entity == "boolean" ? { id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id } : yield this.dao.save(entity);
                        if ((_d = (_c = (_b = self.modalRoute) === null || _b === void 0 ? void 0 : _b.queryParams) === null || _c === void 0 ? void 0 : _c.idroute) === null || _d === void 0 ? void 0 : _d.length)
                            self.go.setModalResult((_f = (_e = self.modalRoute) === null || _e === void 0 ? void 0 : _e.queryParams) === null || _f === void 0 ? void 0 : _f.idroute, saved.id);
                        //self.dialog.alert("Sucesso", this.mensagemSalvarSucesso).then(() => self.go.back());
                        self.go.back(undefined, this.backRoute);
                    }
                }
                catch (error) {
                    self.error(error.message ? error.message : error);
                    console.log(error);
                }
                finally {
                    self.submitting = false;
                }
            }
            else {
                this.form.markAllAsTouched();
                if (error) {
                    this.error(error);
                    console.log("Form error => " + error);
                }
                Object.entries(this.form.controls).forEach(([key, value]) => {
                    if (value.invalid)
                        console.log("Validate => " + key, value.value, value.errors);
                });
            }
        });
    }
    onCancel() {
        this.go.back(undefined, this.backRoute);
    }
    ngAfterContentChecked() {
        this.title = this.action == "new" ? "Novo" : this.titleEdit(this.entity);
    }
    getControlByName(controlName) {
        return this.form.controls[controlName];
    }
}
PageFormBase.ɵfac = function PageFormBase_Factory(t) { return new (t || PageFormBase)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injector"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Type"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Type"])); };
PageFormBase.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: PageFormBase, factory: PageFormBase.ɵfac });


/***/ }),

/***/ "aPFm":
/*!*********************************************!*\
  !*** ./src/app/dao/entidade-dao.service.ts ***!
  \*********************************************/
/*! exports provided: EntidadeDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntidadeDaoService", function() { return EntidadeDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class EntidadeDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Entidade", injector);
        this.injector = injector;
        this.searchFields = ["sigla", "nome"];
    }
}
EntidadeDaoService.ɵfac = function EntidadeDaoService_Factory(t) { return new (t || EntidadeDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
EntidadeDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: EntidadeDaoService, factory: EntidadeDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "lbnZ":
/*!*******************************************!*\
  !*** ./src/app/dao/cidade-dao.service.ts ***!
  \*******************************************/
/*! exports provided: CidadeDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CidadeDaoService", function() { return CidadeDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class CidadeDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Cidade", injector);
        this.injector = injector;
        this.searchFields = ["UF", "nome"];
    }
}
CidadeDaoService.ɵfac = function CidadeDaoService_Factory(t) { return new (t || CidadeDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
CidadeDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CidadeDaoService, factory: CidadeDaoService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=default~modules-cadastros-feriado-feriado-module~modules-configuracoes-entidade-entidade-module~modu~4c5d11a0.js.map