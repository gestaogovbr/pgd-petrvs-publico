import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ClienteDaoService } from "src/app/dao/cliente-dao.service";
import { ProdutoClienteDaoService } from "src/app/dao/produto-cliente-dao.service";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { TipoClienteDaoService } from "src/app/dao/tipo-cliente-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { ProdutoCliente } from "src/app/models/produto-cliente.model";
import { Cliente } from "src/app/models/cliente.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
let ProdutoListClienteComponent = class ProdutoListClienteComponent extends PageFrameBase {
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
            this.gridControl.setValue(new ProdutoCliente());
        if (!this.gridControl.value.produto_cliente)
            this.gridControl.value.produto_cliente = [];
        return this.gridControl.value.produto_cliente;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this._disabled = false;
        this.dao = injector.get(ProdutoClienteDaoService);
        this.produtoDao = injector.get(ProdutoDaoService);
        this.clienteDao = injector.get(ClienteDaoService);
        this.tipoClienteDao = injector.get(TipoClienteDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.form = this.fh.FormBuilder({
            cliente_relacionado_id: { default: "" },
            tipo_cliente_id: { default: "" },
            unidade_relacionada_id: { default: "" },
        }, this.cdRef, undefined);
        this.join = ["produtoCliente.cliente.tipoCliente"];
    }
    async addCliente() {
        return Object.assign(new ProdutoCliente(), {
            _status: "ADD",
            id: this.dao.generateUuid(),
            cliente_relacionado_id: '',
        });
    }
    async loadCliente(form, row) {
        let produtoCliente = row;
        if (produtoCliente._status != "ADD") {
            form.controls.cliente_relacionado_id.setValue(produtoCliente.cliente_id);
            form.controls.tipo_cliente_id.setValue(produtoCliente.cliente?.tipo_cliente_id);
            form.controls.unidade_relacionada_id.setValue(produtoCliente.cliente?.unidade_id);
        }
    }
    async removeCliente(row) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
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
    async saveCliente(form, row) {
        this.entity._metadata = this.entity._metadata || {};
        this.entity._metadata.produtoCliente = row;
        if (this.form.valid) {
            row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
            // se o tipo cliente for diferente de Administração Pública e Público externo
            if (this.tipoCliente?.selectedItem?.value != 'Unidade de órgão/entidade') {
                row.cliente_id = this.form.controls.cliente_relacionado_id.value;
                row.cliente = {
                    ...this.cliente.selectedItem,
                    tipo_cliente_id: this.tipoCliente.selectedItem.key,
                    nome: this.cliente.selectedItem.value,
                    tipo_cliente: {
                        nome: this.tipoCliente.selectedItem.value
                    }
                };
            }
            else if (this.tipoCliente?.selectedItem?.value == 'Unidade de órgão/entidade') {
                const queryResult = await this.clienteDao?.query({ where: [['unidade_id', '==', this.form.controls.unidade_relacionada_id.value]], join: ['tipoCliente'] }).asPromise();
                const cliente = queryResult ? queryResult : [];
                if (cliente && cliente.length > 0) {
                    row.cliente_id = cliente[0].id;
                    row.cliente = cliente[0];
                }
                else {
                    const novoCliente = new Cliente();
                    novoCliente.id = this.clienteDao.generateUuid();
                    novoCliente.unidade_id = this.form.controls.unidade_relacionada_id.value;
                    novoCliente.nome = this.unidade_relacionada?.selectedEntity?.nome;
                    novoCliente.tipo_cliente_id = this.tipoCliente?.selectedItem?.key;
                    const cliente = await this.clienteDao?.save(novoCliente, ['tipoCliente']);
                    if (cliente) {
                        row.cliente_id = cliente.id;
                        row.unidade_id = cliente.unidade_id;
                        row.cliente = cliente;
                    }
                }
            }
            this.entity._metadata.produtoCliente.cliente = row.cliente;
            this.cdRef.detectChanges();
        }
        return this.entity._metadata.produtoCliente;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ProdutoListClienteComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: false })
], ProdutoListClienteComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('tipoCliente', { static: false })
], ProdutoListClienteComponent.prototype, "tipoCliente", void 0);
__decorate([
    ViewChild('cliente', { static: false })
], ProdutoListClienteComponent.prototype, "cliente", void 0);
__decorate([
    ViewChild('unidade_relacionada', { static: false })
], ProdutoListClienteComponent.prototype, "unidade_relacionada", void 0);
__decorate([
    Input()
], ProdutoListClienteComponent.prototype, "control", null);
__decorate([
    Input()
], ProdutoListClienteComponent.prototype, "entity", null);
__decorate([
    Input()
], ProdutoListClienteComponent.prototype, "disabled", null);
__decorate([
    Input()
], ProdutoListClienteComponent.prototype, "noPersist", null);
__decorate([
    Input()
], ProdutoListClienteComponent.prototype, "cdRef", void 0);
ProdutoListClienteComponent = __decorate([
    Component({
        selector: 'produto-list-cliente',
        templateUrl: './produto-list-cliente.component.html',
        styleUrls: ['./produto-list-cliente.component.scss'],
        standalone: false,
    })
], ProdutoListClienteComponent);
export { ProdutoListClienteComponent };
//# sourceMappingURL=produto-list-cliente.component.js.map