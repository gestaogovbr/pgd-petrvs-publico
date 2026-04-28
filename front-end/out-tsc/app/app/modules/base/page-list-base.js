import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { PageBase } from './page-base';
import { QueryContext } from 'src/app/dao/query-context';
import { AppComponent } from 'src/app/app.component';
let PageListBase = class PageListBase extends PageBase {
    constructor(injector, mType, dType) {
        super(injector);
        this.injector = injector;
        this.filterCollapsed = true;
        this.modalInfiniteScrollContainer = null;
        this.join = [];
        this.rowsLimit = QueryContext.DEFAULT_LIMIT;
        this.selectable = false;
        this.onDeleteMessage = "Deseja realmente excluir";
        this.selectButtons = [
            {
                color: "btn-outline-success",
                label: "Selecionar",
                icon: "bi-check-circle",
                disabled: () => !this.grid?.selected,
                onClick: () => this.onSelect(this.grid.selected)
            },
            {
                color: "btn-outline-danger",
                label: "Cancelar",
                icon: "bi bi-dash-circle",
                onClick: () => this.close()
            }
        ];
        this.add = async () => {
            this.go.navigate({ route: this.addRoute || [...this.go.currentOrDefault.route, "new"], params: this.addParams }, {
                filterSnapshot: undefined,
                querySnapshot: undefined,
                modalClose: (modalResult) => {
                    if (modalResult) {
                        this.refresh();
                        if (this.afterAdd)
                            this.afterAdd(modalResult);
                        this.dialog.topAlert("Registro incluído com sucesso!", 5000);
                    }
                }
            });
        };
        this.consult = async (doc) => {
            this.go.navigate({ route: [...this.go.currentOrDefault.route, doc.id, "consult"] });
        };
        this.showLogs = async (doc) => {
            this.go.navigate({ route: ['logs', 'change', doc.id, "consult"] });
        };
        this.edit = async (doc) => {
            this.go.navigate({ route: [...this.go.currentOrDefault.route, doc.id, "edit"] }, {
                filterSnapshot: undefined,
                querySnapshot: undefined,
                modalClose: (modalResult) => {
                    if (modalResult) {
                        this.refresh(doc.id);
                        if (this.afterEdit)
                            this.afterEdit(modalResult);
                        this.dialog.topAlert("Registro alterado com sucesso!", 5000);
                    }
                }
            });
        };
        this.delete = async (doc) => {
            const self = this;
            this.dialog.confirm("Excluir?", this.onDeleteMessage).then(confirm => {
                if (confirm) {
                    this.dao.delete(doc).then(function () {
                        (self.grid.query || self.query).removeId(doc.id);
                        self.dialog.topAlert("Registro excluído com sucesso!", 5000);
                    }).catch((error) => {
                        self.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error));
                    });
                }
            });
        };
        this.error = (error) => {
            if (this.grid)
                this.grid.error = error;
        };
        this.cancel = async (doc) => {
            const self = this;
            this.dialog.confirm("Cancelar ?", "Deseja realmente cancelar o registro?").then(confirm => {
                if (confirm) {
                    this.dao.delete(doc).then(function () {
                        (self.grid.query || self.query).removeId(doc.id);
                        self.dialog.topAlert("Registro cancelado com sucesso!", 5000);
                    }).catch((error) => {
                        self.dialog.alert("Erro", "Erro ao cancelar: " + (error?.message ? error?.message : error));
                    });
                }
            });
        };
        this.dao = injector.get(dType);
        this.OPTION_INFORMACOES.onClick = this.consult.bind(this);
        this.OPTION_EXCLUIR.onClick = this.delete.bind(this);
        this.OPTION_LOGS.onClick = this.showLogs.bind(this);
    }
    saveUsuarioConfig(config) {
        const filter = {
            filter: this.storeFilter ? this.storeFilter(this.filter) : undefined,
            filterCollapsed: this.filterCollapsed
        };
        const order = {
            orderBy: this.orderBy
        };
        super.saveUsuarioConfig(Object.assign(filter, order, config || {}));
    }
    filterSubmit(filter) {
        this.saveUsuarioConfig();
        return undefined;
    }
    filterClear(filter) {
        this.saveUsuarioConfig();
    }
    filterCollapseChange(filter) {
        this.filterCollapsed = !!this.grid?.filterRef?.collapsed;
        this.saveUsuarioConfig();
    }
    static modalSelect(params) {
        return new Promise((resolve, reject) => {
            if (this.selectRoute) {
                const route = {
                    route: this.selectRoute.route,
                    params: Object.assign(this.selectRoute.params || {}, { selectable: true, modal: true }, params)
                };
                AppComponent.instance.go.navigate(route, { modalClose: resolve.bind(this) });
            }
            else {
                reject("Rota de seleção indefinida");
            }
        });
    }
    modalRefreshId(entity) {
        return { modal: true, modalClose: (async (modalResult) => this.refresh(entity.id)).bind(this) };
    }
    modalRefresh() {
        return { modal: true, modalClose: (async (modalResult) => this.refresh()).bind(this) };
    }
    get queryOptions() {
        return {
            where: this.filterWhere && this.filter ? this.filterWhere(this.filter) : [],
            orderBy: [...(this.groupBy || []).map(x => [x.field, "asc"]), ...(this.orderBy || [])],
            join: this.join || [],
            limit: this.rowsLimit,
            leftJoin: this.leftJoin,
            fields: this.fields
        };
    }
    onLoad() {
        this.grid?.queryInit({
            before: () => this.beforeQuery(),
            resolve: (rows) => this.onQueryResolve(rows),
            after: () => this.afterQuery()
        });
        if (!this.grid)
            this.query = this.dao?.query(this.queryOptions, {
                before: () => this.beforeQuery(),
                resolve: (rows) => this.onQueryResolve(rows),
                after: () => this.afterQuery()
            });
    }
    onQueryResolve(rows) {
    }
    beforeQuery() { }
    afterQuery() {
        this.cdRef.detectChanges();
    }
    ngOnInit() {
        super.ngOnInit();
        this.selectable = !!this.queryParams?.selectable;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.usuarioConfig?.filter) {
            this.filter?.patchValue(this.usuarioConfig.filter, { emitEvent: true });
        }
        if (this.usuarioConfig?.filterCollapsed != undefined) {
            this.filterCollapsed = this.usuarioConfig?.filterCollapsed;
            this.cdRef.detectChanges();
        }
        if (this.queryParams?.filter) {
            if (this.loadFilterParams) {
                this.loadFilterParams(this.queryParams?.filter, this.filter);
            }
            else {
                this.filter?.patchValue(this.queryParams?.filter, { emitEvent: true });
            }
        }
        if (this.queryParams?.fixedFilter) {
            this.fixedFilter = this.queryParams?.fixedFilter;
        }
        if (this.selectable && !this.title.startsWith("Selecionar ")) {
            this.title = "Selecionar " + this.title;
        }
        this.onLoad();
    }
    refresh(id) {
        if (id) {
            return (this.grid?.query || this.query).refreshId(id);
        }
        else {
            return (this.grid?.query || this.query).refresh();
        }
    }
    onSelect(selected) {
        const routeId = (this.modalRoute || this.snapshot)?.queryParams?.idroute;
        /* Evento disparado automaticamente quando selecionava texto dentro de inputs, então é feito a checagem se o selected não é um Event */
        if (selected && !(selected instanceof Event) && routeId?.length) {
            this.go.setModalResult(routeId, selected);
            this.close();
        }
    }
};
PageListBase = __decorate([
    Injectable()
], PageListBase);
export { PageListBase };
//# sourceMappingURL=page-list-base.js.map