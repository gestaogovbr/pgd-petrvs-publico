import { __decorate } from "tslib";
import { Component, Input, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
let SolucaoListProdutoComponent = class SolucaoListProdutoComponent extends PageFrameBase {
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.unidades = [];
        this.items = [];
        this.filter = this.fh.FormBuilder({
            unidade_id: { default: this.auth.unidade?.id }
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.loadItens();
        this.loadUnidades();
    }
    loadItens() {
        this.items = this.entity?.produtos_solucoes || [];
        if (this.unidade?.selectedItem) {
            this.items = this.items.filter(item => item.produto?.unidade_id == this.unidade?.selectedItem?.key);
        }
    }
    loadUnidades() {
        if (!this.entity || !this.entity?.solucoes_unidades) {
            this.unidades = [];
            return;
        }
        const unidadesUnicas = new Map();
        this.entity.solucoes_unidades.forEach(solucao_unidade => {
            const unidade = solucao_unidade?.unidade;
            if (unidade && !unidadesUnicas.has(unidade.id)) {
                unidadesUnicas.set(unidade.id, unidade);
            }
        });
        this.unidades = Array.from(unidadesUnicas.values())
            .sort((a, b) => a.sigla.localeCompare(b.sigla))
            .map(unidade => ({ key: unidade.id, value: unidade.sigla }));
    }
    dynamicButtons(row) {
        let result = [];
        result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showProduto.bind(this) });
        return result;
    }
    async showProduto(row) {
        this.go.navigate({ route: ['gestao', 'produto', row.produto_id, "show"] }, {});
    }
    isAtivo(row) {
        return (row.data_ativado && !row.data_desativado) || false;
    }
    getStatusColor(row) {
        return this.isAtivo(row) ? 'success' : 'danger';
    }
    getStatusText(row) {
        return this.isAtivo(row) ? 'Ativo' : 'Inativo';
    }
    onUnidadeChange(event) {
        this.loadItens();
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], SolucaoListProdutoComponent.prototype, "grid", void 0);
__decorate([
    Input()
], SolucaoListProdutoComponent.prototype, "entity", null);
__decorate([
    ViewChild('unidade', { static: false })
], SolucaoListProdutoComponent.prototype, "unidade", void 0);
SolucaoListProdutoComponent = __decorate([
    Component({
        selector: 'solucao-list-produto',
        templateUrl: './solucao-list-produto.component.html',
        styleUrls: ['./solucao-list-produto.component.scss'],
        standalone: false
    })
], SolucaoListProdutoComponent);
export { SolucaoListProdutoComponent };
//# sourceMappingURL=solucao-list-produto.component.js.map