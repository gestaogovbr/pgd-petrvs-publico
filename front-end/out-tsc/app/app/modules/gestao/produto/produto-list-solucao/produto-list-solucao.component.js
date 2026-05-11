import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { ProdutoSolucaoDaoService } from "src/app/dao/produto-solucao-dao.service";
import { QueryOptions } from "src/app/dao/query-options";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { SolucaoUnidadeDaoService } from "src/app/dao/solucao-unidade-dao.service";
import { ProdutoSolucao } from "src/app/models/produto-solucao.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
let ProdutoListSolucaoComponent = class ProdutoListSolucaoComponent extends PageFrameBase {
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    set disabled(value) { if (this._disabled != value)
        this._disabled = value; }
    get disabled() { return this._disabled; }
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue(new ProdutoSolucao());
        if (!this.gridControl.value.produto_solucoes)
            this.gridControl.value.produto_solucoes = [];
        return this.gridControl.value.produto_solucoes;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this._disabled = false;
        this.asyncValidate = async (control, controlName) => {
            let result = null;
            if (['solucao_id'].indexOf(controlName) >= 0) {
                if (!control.value?.length) {
                    result = "Obrigatório";
                }
                else {
                    const isDuplicate = this.items.some(item => item.solucao_id === control.value);
                    if (isDuplicate) {
                        result = 'Solução já inserida neste Produto';
                    }
                    else {
                        try {
                            const solucao = await this.solucaoDao?.getById(control.value);
                            var queryOptions = new QueryOptions({
                                where: [
                                    ["id_solucao", "==", control.value],
                                    ["id_unidade", "==", this.auth?.unidade?.id]
                                ]
                            });
                            const solucaoUnidade = await this.solucaoUnidadeDao?.query(queryOptions).asPromise();
                            if (!solucaoUnidade || !solucaoUnidade[0] || !solucaoUnidade[0].status) {
                                result = 'Solução inativa não pode ser usada';
                            }
                        }
                        catch (error) {
                            result = 'Erro ao verificar a Solução';
                        }
                    }
                }
            }
            return result;
        };
        this.dao = injector.get(ProdutoSolucaoDaoService);
        this.produtoDao = injector.get(ProdutoDaoService);
        this.solucaoDao = injector.get(SolucaoDaoService);
        this.solucaoUnidadeDao = injector.get(SolucaoUnidadeDaoService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.form = this.fh.FormBuilder({
            solucao_id: {
                default: "",
                async: true
            },
        }, this.cdRef, undefined, this.asyncValidate);
        this.join = ["produtoSolucao.solucao"];
    }
    async addSolucao() {
        return Object.assign(new ProdutoSolucao(), {
            _status: "ADD",
            id: this.dao.generateUuid(),
            solucao_id: '',
        });
    }
    async loadSolucao(form, row) {
        let solucao = row;
        if (solucao._status != "ADD") {
            form.controls.solucao_id.setValue(row.solucao_id);
        }
    }
    async removeSolucao(row) {
        let confirm = await this.dialog.confirm("Excluir?", "Deseja realmente excluir a Solução?");
        if (confirm) {
            this.loading = true;
            try {
                this.isNoPersist ? Object.assign(row, { _status: "DELETE" }) : await this.dao?.delete(row.id);
            }
            finally {
                this.loading = false;
            }
            return this.isNoPersist ? false : true; // (*3)
        }
        else {
            return false;
        }
    }
    async saveSolucao(form, row) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (this.form.valid) {
            row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
            row.solucao_id = this.form.controls.solucao_id.value;
            row.solucao = this.solucao.selectedEntity;
            result = row;
            this.cdRef.detectChanges();
        }
        return result;
    }
    dynamicButtons(row) {
        let result = [];
        result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showSolucao.bind(this) });
        return result;
    }
    async showSolucao(row) {
        this.go.navigate({ route: ['gestao', 'solucao', row.solucao_id, "consult"] }, {});
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ProdutoListSolucaoComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: false })
], ProdutoListSolucaoComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('solucao', { static: false })
], ProdutoListSolucaoComponent.prototype, "solucao", void 0);
__decorate([
    Input()
], ProdutoListSolucaoComponent.prototype, "control", null);
__decorate([
    Input()
], ProdutoListSolucaoComponent.prototype, "entity", null);
__decorate([
    Input()
], ProdutoListSolucaoComponent.prototype, "disabled", null);
__decorate([
    Input()
], ProdutoListSolucaoComponent.prototype, "noPersist", null);
__decorate([
    Input()
], ProdutoListSolucaoComponent.prototype, "cdRef", void 0);
ProdutoListSolucaoComponent = __decorate([
    Component({
        selector: 'produto-list-solucao',
        templateUrl: './produto-list-solucao.component.html',
        styleUrls: ['./produto-list-solucao.component.scss'],
        standalone: false
    })
], ProdutoListSolucaoComponent);
export { ProdutoListSolucaoComponent };
//# sourceMappingURL=produto-list-solucao.component.js.map