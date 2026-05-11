import { __decorate } from "tslib";
import { Component, ViewChild, Input, ChangeDetectorRef } from "@angular/core";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ClienteDaoService } from "src/app/dao/cliente-dao.service";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { ProdutoInsumoDaoService } from "src/app/dao/produto-insumo-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { ProdutoInsumo } from "src/app/models/produto-insumo.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
let ProdutoListInsumoComponent = class ProdutoListInsumoComponent extends PageFrameBase {
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
            this.gridControl.setValue(new ProdutoInsumo());
        if (!this.gridControl.value.produto_insumos)
            this.gridControl.value.produto_insumos = [];
        return this.gridControl.value.produto_insumos;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this._disabled = false;
        this.clientes = [];
        this.dao = injector.get(ProdutoInsumoDaoService);
        this.produtoDao = injector.get(ProdutoDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.clienteDao = injector.get(ClienteDaoService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.form = this.fh.FormBuilder({
            origem: { default: 'interna' },
            unidade_insumo_id: { default: null },
            produto_insumo_id: { default: null },
            cliente_id: { default: null },
            descricao: { default: "" },
        }, this.cdRef);
        this.join = [
            "produtoInsumos.produtoRelacionado",
            "produtoInsumos.unidade",
            "produtoInsumos.cliente",
            "produtoInsumos.cliente.tipoCliente"
        ];
    }
    async addInsumo() {
        return Object.assign(new ProdutoInsumo(), {
            _status: "ADD",
            id: this.dao.generateUuid(),
            origem: 'interna',
            unidade_insumo_id: '',
            produto_insumo_id: '',
            cliente_id: '',
            descricao: ''
        });
    }
    async loadInsumo(form, row) {
        let produto = row;
        if (produto._status != "ADD") {
            form.controls.origem.setValue(produto.origem);
            form.controls.unidade_insumo_id.setValue(produto.unidade_id);
            form.controls.produto_insumo_id.setValue(produto.produto_insumo_id);
            form.controls.cliente_id.setValue(produto.cliente_id);
            form.controls.descricao.setValue(produto.descricao);
        }
    }
    async removeInsumo(row) {
        let confirm = await this.dialog.confirm("Excluir?", "Deseja realmente excluir?");
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
    async saveInsumo(form, row) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (this.form.valid) {
            row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
            row.origem = this.form.controls.origem.value;
            if (row.origem == ProdutoInsumo.ORIGEM_INTERNA) {
                row.unidade_id = this.form.controls.unidade_insumo_id.value;
                row.unidade = this.unidade?.selectedEntity;
                row.produto_insumo_id = this.form.controls.produto_insumo_id.value;
                row.produto_relacionado = this.produtoRelacionado?.selectedEntity;
                row.cliente_id = null;
                row.cliente = null;
                row.descricao = null;
            }
            else {
                row.unidade_id = null;
                row.unidade = null;
                row.produto_insumo_id = null;
                row.produto_relacionado = null;
                row.cliente_id = this.form.controls.cliente_id.value;
                row.cliente = this.cliente?.selectedEntity;
                row.descricao = this.form.controls.descricao.value;
                const cliente = await this.clienteDao?.getById(row.cliente_id, ['tipoCliente']);
                row.cliente.tipo_cliente = cliente?.tipo_cliente;
            }
            result = row;
            this.cdRef.detectChanges();
        }
        return result;
    }
    dynamicButtons(row) {
        let result = [];
        if (this.isInterno(row.origem)) {
            result.push({
                label: "Detalhes",
                icon: "bi bi-eye",
                color: 'btn-outline-success',
                onClick: this.showInsumo.bind(this)
            });
        }
        return result;
    }
    async showInsumo(row) {
        this.go.navigate({ route: ['gestao', 'produto', row.produto_insumo_id, "show"] }, {});
    }
    isInterno(origem = null) {
        return (origem ?? this.form.controls.origem.value) === ProdutoInsumo.ORIGEM_INTERNA;
    }
    isExterno(origem = null) {
        return (origem ?? this.form.controls.origem.value) === ProdutoInsumo.ORIGEM_EXTERNA;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ProdutoListInsumoComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: false })
], ProdutoListInsumoComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('produtoRelacionado', { static: false })
], ProdutoListInsumoComponent.prototype, "produtoRelacionado", void 0);
__decorate([
    ViewChild('unidadeInsumo', { static: false })
], ProdutoListInsumoComponent.prototype, "unidade", void 0);
__decorate([
    ViewChild('cliente', { static: false })
], ProdutoListInsumoComponent.prototype, "cliente", void 0);
__decorate([
    Input()
], ProdutoListInsumoComponent.prototype, "control", null);
__decorate([
    Input()
], ProdutoListInsumoComponent.prototype, "entity", null);
__decorate([
    Input()
], ProdutoListInsumoComponent.prototype, "disabled", null);
__decorate([
    Input()
], ProdutoListInsumoComponent.prototype, "noPersist", null);
__decorate([
    Input()
], ProdutoListInsumoComponent.prototype, "cdRef", void 0);
ProdutoListInsumoComponent = __decorate([
    Component({
        selector: 'produto-list-insumo',
        templateUrl: './produto-list-insumo.component.html',
        styleUrls: ['./produto-list-insumo.component.scss'],
        standalone: false
    })
], ProdutoListInsumoComponent);
export { ProdutoListInsumoComponent };
//# sourceMappingURL=produto-list-insumo.component.js.map