(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~modules-cadastros-plano-plano-module~modules-gestao-demanda-demanda-module"],{

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
        this.options = [];
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
        this.consult = (doc) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.go.navigate({ route: [...this.go.currentOrDefault.route, doc.id, "consult"] });
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
                        self.grid.query.removeId(doc.id);
                        //self.grid!.query!.refresh();
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
        this.options = [
            {
                label: "Informações",
                icon: "bi bi-info-circle",
                onClick: this.consult.bind(this)
            },
            {
                label: "Excluir",
                icon: "bi bi-trash",
                onClick: this.delete.bind(this)
            }
        ];
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

/***/ "A5xB":
/*!************************************************************************************!*\
  !*** ./src/app/modules/uteis/calendar-efemerides/calendar-efemerides.component.ts ***!
  \************************************************************************************/
/*! exports provided: CalendarEfemeridesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarEfemeridesComponent", function() { return CalendarEfemeridesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_util_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/util.service */ "2Rin");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");



function CalendarEfemeridesComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " A data final \u00E9 obtida atrav\u00E9s do c\u00E1lculo ...\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function CalendarEfemeridesComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " As horas \u00FAteis s\u00E3o obtidas atrav\u00E9s do c\u00E1lculo ...\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function CalendarEfemeridesComponent_div_34_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const afastamento_r7 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" De ", ctx_r6.util.getDateTimeFormatted(afastamento_r7.inicio_afastamento), " at\u00E9 ", ctx_r6.util.getDateTimeFormatted(afastamento_r7.fim_afastamento), " - afastamento.observacoes");
} }
function CalendarEfemeridesComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CalendarEfemeridesComponent_div_34_span_4_Template, 3, 2, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Afastamento(s) (", ctx_r2.efemerides == null ? null : ctx_r2.efemerides.afastamentos == null ? null : ctx_r2.efemerides.afastamentos.length, "):");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.efemerides.afastamentos);
} }
function CalendarEfemeridesComponent_div_35_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const pausa_r9 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" De ", ctx_r8.util.getDateTimeFormatted(pausa_r9.data_inicio), " - ", pausa_r9.data_fim ? "at\u00E9 " + ctx_r8.util.getDateTimeFormatted(pausa_r9.data_fim) : "em aberto", "");
} }
function CalendarEfemeridesComponent_div_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CalendarEfemeridesComponent_div_35_span_4_Template, 3, 2, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Suspens\u00E3o(\u00F5es) (", ctx_r3.efemerides == null ? null : ctx_r3.efemerides.pausas == null ? null : ctx_r3.efemerides.pausas.length, "):");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.efemerides.pausas);
} }
function CalendarEfemeridesComponent_div_36_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const fimSemanda_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", fimSemanda_r11[0], " - ", fimSemanda_r11[1], "");
} }
function CalendarEfemeridesComponent_div_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CalendarEfemeridesComponent_div_36_span_4_Template, 3, 2, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Finais de semana (", ctx_r4.finsSemana.length, "):");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.finsSemana);
} }
function CalendarEfemeridesComponent_div_37_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const feriado_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", feriado_r13[0], " - ", feriado_r13[1], "");
} }
function CalendarEfemeridesComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CalendarEfemeridesComponent_div_37_span_4_Template, 3, 2, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Feriado(s) (", ctx_r5.feriados.length, "):");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r5.feriados);
} }
class CalendarEfemeridesComponent {
    constructor(util) {
        this.util = util;
    }
    ngOnInit() {
    }
    get forma() {
        var _a, _b, _c;
        const forma = ((_a = this.efemerides) === null || _a === void 0 ? void 0 : _a.tipo) == "DISTRIBUICAO" ? (_b = this.efemerides) === null || _b === void 0 ? void 0 : _b.formaDistribuicao : (_c = this.efemerides) === null || _c === void 0 ? void 0 : _c.formaEntrega;
        switch (forma) {
            case "DIAS_UTEIS": return "Dias úteis";
            case "DIAS_CORRIDOS": return "Dias corridos";
            case "HORAS_UTEIS": return "Horas úteis";
            case "HORAS_CORRIDAS": return "Horas corridas";
            default: return "Desconhecido";
        }
    }
    get feriados() {
        var _a;
        return Object.entries(((_a = this.efemerides) === null || _a === void 0 ? void 0 : _a.feriados) || {});
    }
    get finsSemana() {
        var _a;
        return Object.entries(((_a = this.efemerides) === null || _a === void 0 ? void 0 : _a.finsSemana) || {});
    }
}
CalendarEfemeridesComponent.ɵfac = function CalendarEfemeridesComponent_Factory(t) { return new (t || CalendarEfemeridesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_util_service__WEBPACK_IMPORTED_MODULE_1__["UtilService"])); };
CalendarEfemeridesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CalendarEfemeridesComponent, selectors: [["calendar-efemerides"]], inputs: { efemerides: "efemerides" }, decls: 38, vars: 14, consts: [["class", "mt-2 alert alert-primary", "role", "alert", 4, "ngIf"], [4, "ngIf"], ["role", "alert", 1, "mt-2", "alert", "alert-primary"], [1, "bi", "bi-info-circle-fill"], [4, "ngFor", "ngForOf"]], template: function CalendarEfemeridesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CalendarEfemeridesComponent_div_0_Template, 3, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CalendarEfemeridesComponent_div_1_Template, 3, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "In\u00EDcio:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Fim:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Dias corridos:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Horas \u00FAteis:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Forma de c\u00E1lculo:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Carga hor\u00E1ria:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Expediente:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Horas de afastamentos e/ou pausas:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, CalendarEfemeridesComponent_div_34_Template, 5, 2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, CalendarEfemeridesComponent_div_35_Template, 5, 2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, CalendarEfemeridesComponent_div_36_Template, 5, 2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, CalendarEfemeridesComponent_div_37_Template, 5, 2, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.efemerides == null ? null : ctx.efemerides.resultado) == "DATA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.efemerides == null ? null : ctx.efemerides.resultado) == "TEMPO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.util.getDateTimeFormatted(ctx.efemerides == null ? null : ctx.efemerides.inicio), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.util.getDateTimeFormatted(ctx.efemerides == null ? null : ctx.efemerides.fim), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.efemerides == null ? null : ctx.efemerides.dias_corridos, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.util.decimalToTimerFormated(ctx.efemerides == null ? null : ctx.efemerides.tempoUtil, true), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.forma, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.util.decimalToTimerFormated(ctx.efemerides == null ? null : ctx.efemerides.cargaHoraria, true), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.util.decimalToTimerFormated(ctx.efemerides == null ? null : ctx.efemerides.expediente, true), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.util.decimalToTimerFormated(ctx.efemerides == null ? null : ctx.efemerides.horasAfastamentosPausas, true), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.efemerides == null ? null : ctx.efemerides.afastamentos == null ? null : ctx.efemerides.afastamentos.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.efemerides == null ? null : ctx.efemerides.pausas == null ? null : ctx.efemerides.pausas.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.finsSemana.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.feriados.length);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWxlbmRhci1lZmVtZXJpZGVzLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "Ufbc":
/*!********************************************!*\
  !*** ./src/app/dao/unidade-dao.service.ts ***!
  \********************************************/
/*! exports provided: UnidadeDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnidadeDaoService", function() { return UnidadeDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class UnidadeDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Unidade", injector);
        this.injector = injector;
        this.searchFields = ["codigo", "sigla", "nome"];
    }
}
UnidadeDaoService.ɵfac = function UnidadeDaoService_Factory(t) { return new (t || UnidadeDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
UnidadeDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: UnidadeDaoService, factory: UnidadeDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "hA/d":
/*!***********************************************!*\
  !*** ./src/app/modules/uteis/uteis.module.ts ***!
  \***********************************************/
/*! exports provided: UteisModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UteisModule", function() { return UteisModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar-efemerides/calendar-efemerides.component */ "A5xB");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class UteisModule {
}
UteisModule.ɵfac = function UteisModule_Factory(t) { return new (t || UteisModule)(); };
UteisModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: UteisModule });
UteisModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](UteisModule, { declarations: [_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_1__["CalendarEfemeridesComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]], exports: [_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_1__["CalendarEfemeridesComponent"]] }); })();


/***/ })

}]);
//# sourceMappingURL=default~modules-cadastros-plano-plano-module~modules-gestao-demanda-demanda-module.js.map