import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { RelatorioUnidadeDaoService } from "src/app/dao/relatorio-unidade-dao.service";
import { RelatorioUnidade } from "src/app/models/relatorio-unidade.model";
import { of } from "rxjs";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
let RelatorioUnidadeComponent = class RelatorioUnidadeComponent extends RelatorioBaseComponent {
    constructor(injector) {
        super(injector, RelatorioUnidade, RelatorioUnidadeDaoService);
        this.injector = injector;
        this.permissao = 'MOD_RELATORIO_UNIDADE';
        this.botoes = [];
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            result.push(["unidade_id", "==", form.unidade_id]);
            if (form.incluir_unidades_subordinadas) {
                result.push(["incluir_unidades_subordinadas", "==", 1]);
            }
            if (form.nome) {
                result.push(["nome", "like", "%" + form.nome + "%"]);
            }
            if (form.unidadeNome) {
                result.push(["unidadeHierarquia", "like", "%" + form.unidadeNome + "%"]);
            }
            if (form.uorg?.length) {
                result.push(["codigo", "like", "%" + form.uorg + "%"]);
            }
            if (form.tipo?.length) {
                result.push(["tipo", "==", form.tipo]);
            }
            if (form.chefiaNome?.length) {
                result.push(["chefiaNome", "like", "%" + form.chefiaNome + "%"]);
            }
            if (form.totalVinculados?.length) {
                result.push(["totalVinculados", "==", form.totalVinculados]);
            }
            if (form.totalSubstitutos?.length) {
                result.push(["totalSubstitutos", "==", form.totalSubstitutos]);
            }
            if (form.totalDelegados?.length) {
                result.push(["totalDelegados", "==", form.totalDelegados]);
            }
            return result;
        };
        this.onButtonFilterClick = (filter) => {
            let form = filter.value;
            let queryOptions = this.grid?.queryOptions || this.queryOptions || {};
            if (this.filter.valid) {
                if (this.grid && this.grid.query) {
                    this.loaded = true;
                }
                this.grid?.query?.reload(queryOptions);
            }
            else {
                this.filter.markAllAsTouched();
            }
        };
        this.exportExcel = (form, queryOptions) => {
            this.loading = true;
            try {
                return this.dao.exportarXls({
                    where: queryOptions.where,
                    orderBy: queryOptions.orderBy
                });
            }
            catch (error) {
                this.error(error);
            }
            finally {
                this.loading = false;
            }
            return of(null);
        };
        this.filter = this.fh.FormBuilder({
            unidade_id: { default: this.auth.unidade?.id },
            incluir_unidades_subordinadas: { default: false },
            exportar: { default: false },
            id: { default: "" },
            unidadeNome: { default: "" },
            nome: { default: "" },
            uorg: { default: "" },
            tipo: { default: "" },
            chefiaNome: { default: "" },
            totalVinculados: { default: "" },
            totalSubstitutos: { default: "" },
            totalDelegados: { default: "" }
        });
        this.filter.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
        this.filter.get('unidade_id')?.updateValueAndValidity();
        this.orderBy = [['unidadeHierarquia', 'asc'], ['sigla', 'asc']];
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loaded = true;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], RelatorioUnidadeComponent.prototype, "grid", void 0);
RelatorioUnidadeComponent = __decorate([
    Component({
        selector: 'relatorio-unidade',
        templateUrl: './relatorio-unidade.component.html',
        styleUrls: ['./relatorio-unidade.component.scss'],
        standalone: false
    })
], RelatorioUnidadeComponent);
export { RelatorioUnidadeComponent };
//# sourceMappingURL=relatorio-unidade.component.js.map