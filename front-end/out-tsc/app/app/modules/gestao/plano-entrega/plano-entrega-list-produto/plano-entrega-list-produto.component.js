import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { PlanoEntregaEntregaProdutoDaoService } from "src/app/dao/plano-entrega-entrega-produto-dao.service";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { PlanoEntregaEntregaProduto } from "src/app/models/plano-entrega-entrega-produto.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
let PlanoEntregaListProdutoComponent = class PlanoEntregaListProdutoComponent extends PageFrameBase {
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
            this.gridControl.setValue(new PlanoEntregaEntregaProduto());
        if (!this.gridControl.value.produtos)
            this.gridControl.value.produtos = [];
        return this.gridControl.value.produtos;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.edit = false;
        this._disabled = false;
        this.asyncValidate = async (control, controlName) => {
            let result = null;
            if (['produto_id'].indexOf(controlName) >= 0) {
                if (!control.value?.length) {
                    result = "Obrigatório";
                }
                else {
                    const isDuplicate = this.items.some(item => item.produto_id === control.value);
                    if (isDuplicate) {
                        result = 'Produto já inserido nesta entrega';
                    }
                    else {
                        try {
                            const produto = await this.produtoDao?.getById(control.value);
                            if (!produto?.data_ativado && produto?.data_desativado) {
                                result = 'Produto inativo não pode ser usado';
                            }
                        }
                        catch (error) {
                            result = 'Erro ao verificar o produto';
                        }
                    }
                }
            }
            return result;
        };
        this.dao = injector.get(PlanoEntregaEntregaProdutoDaoService);
        this.produtoDao = injector.get(ProdutoDaoService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.form = this.fh.FormBuilder({
            produto_id: {
                default: "",
                async: true
            },
        }, this.cdRef, undefined, this.asyncValidate);
        this.join = ["produto"];
    }
    async addProduto() {
        return {
            id: this.dao.generateUuid(),
            _status: "ADD"
        };
    }
    async loadProduto(form, row) {
        let produto = row;
        if (produto._status != "ADD") {
            form.controls.entrega_id.setValue(row.entrega_id);
        }
    }
    async removeProduto(row) {
        let confirm = await this.dialog.confirm("Excluir?", "Deseja realmente excluir o Produto?");
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
    async saveProduto(form, row) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (this.form.valid) {
            row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
            row.produto_id = this.form.controls.produto_id.value;
            row.produto = this.produto.selectedEntity;
            result = row;
            console.log(row);
            this.cdRef.detectChanges();
        }
        return result;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanoEntregaListProdutoComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: false })
], PlanoEntregaListProdutoComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('produto', { static: false })
], PlanoEntregaListProdutoComponent.prototype, "produto", void 0);
__decorate([
    Input()
], PlanoEntregaListProdutoComponent.prototype, "control", null);
__decorate([
    Input()
], PlanoEntregaListProdutoComponent.prototype, "entity", null);
__decorate([
    Input()
], PlanoEntregaListProdutoComponent.prototype, "disabled", null);
__decorate([
    Input()
], PlanoEntregaListProdutoComponent.prototype, "noPersist", null);
__decorate([
    Input()
], PlanoEntregaListProdutoComponent.prototype, "cdRef", void 0);
__decorate([
    Input()
], PlanoEntregaListProdutoComponent.prototype, "edit", void 0);
PlanoEntregaListProdutoComponent = __decorate([
    Component({
        selector: 'plano-entrega-list-produto',
        templateUrl: './plano-entrega-list-produto.component.html',
        styleUrls: ['./plano-entrega-list-produto.component.scss'],
        standalone: false
    })
], PlanoEntregaListProdutoComponent);
export { PlanoEntregaListProdutoComponent };
//# sourceMappingURL=plano-entrega-list-produto.component.js.map