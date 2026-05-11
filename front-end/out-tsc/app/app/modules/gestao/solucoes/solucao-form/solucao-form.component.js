import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { Solucao } from "src/app/models/solucao.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
let SolucaoFormComponent = class SolucaoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Solucao, SolucaoDaoService);
        this.injector = injector;
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.modalWidth = 1300;
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            sigla: { default: "" },
            unidade_id: { default: "" },
            descricao: { default: "" },
            url: { default: "" },
        });
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    async initializeData(form) {
        form.patchValue(new Solucao());
        this.entity = new Solucao();
        await this.loadData(this.entity, this.form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const catalogo = this.util.fill(new Solucao(), this.entity);
            resolve(this.util.fillForm(catalogo, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], SolucaoFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], SolucaoFormComponent.prototype, "usuario", void 0);
SolucaoFormComponent = __decorate([
    Component({
        selector: 'app-solucao-form',
        templateUrl: './solucao-form.component.html',
        styleUrls: ['./solucao-form.component.scss'],
        standalone: false
    })
], SolucaoFormComponent);
export { SolucaoFormComponent };
//# sourceMappingURL=solucao-form.component.js.map