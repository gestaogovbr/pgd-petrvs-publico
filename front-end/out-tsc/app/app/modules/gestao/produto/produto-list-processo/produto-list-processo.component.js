import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { CadeiaValorDaoService } from "src/app/dao/cadeia-valor-dao.service";
import { CadeiaValorProcessoDaoService } from "src/app/dao/cadeia-valor-processo-dao.service";
import { ProdutoProcessoDaoService } from "src/app/dao/produto-processo-dao.service";
import { ProdutoProcesso } from "src/app/models/produto-processo.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
let ProdutoListProcessoComponent = class ProdutoListProcessoComponent extends PageFrameBase {
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
            this.gridControl.setValue(new ProdutoProcesso());
        if (!this.gridControl.value.produto_processo_cadeia_valor)
            this.gridControl.value.produto_processo_cadeia_valor = [];
        return this.gridControl.value.produto_processo_cadeia_valor;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.processos = [];
        this._disabled = false;
        this.dao = injector.get(ProdutoProcessoDaoService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.cadeiaValorDao = injector.get(CadeiaValorDaoService);
        this.processosDao = injector.get(CadeiaValorProcessoDaoService);
        this.form = this.fh.FormBuilder({
            cadeia_valor_processo_id: { default: null },
            cadeia_valor_id: { default: null }
        }, this.cdRef);
        this.join = ["cadeiaValorProcesso.cadeiaValor"];
    }
    async ngOnInit() {
        super.ngOnInit();
        this.entity = this.metadata?.entity || this.entity;
    }
    async addProcesso() {
        return Object.assign(new ProdutoProcesso(), {
            _status: "ADD",
            id: this.dao.generateUuid(),
            cadeia_valor_processo_id: '',
        });
    }
    async loadProcesso(form, row) {
        let processo = row;
        if (processo._status != "ADD") {
            form.controls.cadeia_valor_id.setValue(row.cadeia_valor_processo.cadeia_valor.id);
            form.controls.cadeia_valor_processo_id.setValue(row.cadeia_valor_processo.id);
        }
    }
    async removeProcesso(row) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
        if (confirm) {
            this.loading = true;
            try {
                this.isNoPersist ? Object.assign(row, { _status: "DELETE" }) : await this.dao?.delete(row.id);
            }
            finally {
                this.loading = false;
                //this.atualizaPlanoTrabalhoEvent.emit(this.entity!.id);
            }
            return this.isNoPersist ? false : true; // (*3)
        }
        else {
            return false;
        }
    }
    async saveProcesso(form, row) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (this.form.valid) {
            row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
            row.cadeia_valor_processo = this.cadeiaProcesso.selectedItem?.data;
            row.cadeia_valor_processo.cadeia_valor = this.cadeiaValor.selectedEntity;
            row.cadeia_valor_processo_id = this.form.controls.cadeia_valor_processo_id.value;
            result = row;
            this.cdRef.detectChanges();
        }
        return result;
    }
    saveEndProcesso(row) {
    }
    async onCadeiaChange(row) {
        this.cdRef.detectChanges();
        this.loadProcessoCadeiaValor();
    }
    loadProcessoCadeiaValor() {
        try {
            let cadeia_valor_id = this.form.controls.cadeia_valor_id.value;
            this.processosDao?.query({ where: [["cadeia_valor_id", "=", cadeia_valor_id]] }).asPromise().then((data) => {
                this.processos = data.map((item) => {
                    return { key: item.id, value: item.nome, data: item };
                });
            });
        }
        catch (error) {
            console.error('Error loading processo cadeia valor:', error);
            this.processos = [];
        }
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ProdutoListProcessoComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: false })
], ProdutoListProcessoComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('cadeiaValor', { static: false })
], ProdutoListProcessoComponent.prototype, "cadeiaValor", void 0);
__decorate([
    ViewChild('cadeiaProcesso', { static: false })
], ProdutoListProcessoComponent.prototype, "cadeiaProcesso", void 0);
__decorate([
    Input()
], ProdutoListProcessoComponent.prototype, "control", null);
__decorate([
    Input()
], ProdutoListProcessoComponent.prototype, "entity", null);
__decorate([
    Input()
], ProdutoListProcessoComponent.prototype, "disabled", null);
__decorate([
    Input()
], ProdutoListProcessoComponent.prototype, "noPersist", null);
__decorate([
    Input()
], ProdutoListProcessoComponent.prototype, "cdRef", void 0);
ProdutoListProcessoComponent = __decorate([
    Component({
        selector: 'produto-list-processo',
        templateUrl: './produto-list-processo.component.html',
        styleUrls: ['./produto-list-processo.component.scss'],
        standalone: false
    })
], ProdutoListProcessoComponent);
export { ProdutoListProcessoComponent };
//# sourceMappingURL=produto-list-processo.component.js.map