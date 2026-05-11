import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { ClienteDaoService } from "src/app/dao/cliente-dao.service";
import { TipoClienteDaoService } from "src/app/dao/tipo-cliente-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { Cliente } from "src/app/models/cliente.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
let ClienteFormComponent = class ClienteFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Cliente, ClienteDaoService);
        this.injector = injector;
        this.tiposCliente = [];
        this.tipoClienteDao = injector.get(TipoClienteDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            tipo_cliente_id: { default: "" },
            unidade_id: { default: null }
        });
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        let cliente = (this.util.fillForm(formValue, entity));
        form.patchValue(cliente);
    }
    initializeData(form) {
        this.loadData(new Cliente(), form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const cliente = this.util.fill(new Cliente(), this.entity);
            resolve(this.util.fillForm(cliente, this.form.value));
        });
    }
    alteraTipo() {
        let tipo = this.tipoCliente?.selectedItem?.value;
        if (tipo == "c28122f5-708d-11ef-8e76-0242ac1c0002") {
            // exibir unidade e esconder nome
            this.unidade?.selfElement?.nativeElement.classList.remove("d-none");
            this.nome?.selfElement?.nativeElement.classList.add("d-none");
        }
        else {
            // exibir nome e esconder unidade
            this.form?.controls.unidade_id.setValue(null);
            this.unidade?.selfElement?.nativeElement.classList.add("d-none");
            this.nome?.selfElement?.nativeElement.classList.remove("d-none");
        }
    }
    selecionaUnidade(event) {
        this.form?.controls.nome.setValue(event.entity?.nome);
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ClienteFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('tipoCliente', { static: false })
], ClienteFormComponent.prototype, "tipoCliente", void 0);
__decorate([
    ViewChild('unidade', { static: false })
], ClienteFormComponent.prototype, "unidade", void 0);
__decorate([
    ViewChild('nome', { static: false })
], ClienteFormComponent.prototype, "nome", void 0);
ClienteFormComponent = __decorate([
    Component({
        selector: 'app-cliente-form',
        templateUrl: './cliente-form.component.html',
        styleUrls: ['./cliente-form.component.scss'],
        standalone: false
    })
], ClienteFormComponent);
export { ClienteFormComponent };
//# sourceMappingURL=cliente-form.component.js.map