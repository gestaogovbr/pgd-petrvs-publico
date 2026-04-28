import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EnvioDaoService } from 'src/app/dao/envio-dao.service';
;
import { PageBase } from 'src/app/modules/base/page-base';
let EnvioForcarComponent = class EnvioForcarComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.envioDao = injector.get(EnvioDaoService);
        this.form = this.fh.FormBuilder({});
    }
    async onSaveData() {
        this.envioDao.forcar(this.auth.entidade?.sigla).subscribe({
            next: async (result) => {
                await this.dialog.alert('Envio forçado', 'Envio forçado com sucesso');
                this.close();
            },
            error: error => {
                this.editableForm.error = error.error.message ? error.error.message : error;
                console.error('Erro:', error.error);
            }
        });
    }
    onCancel() {
        this.close();
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], EnvioForcarComponent.prototype, "editableForm", void 0);
EnvioForcarComponent = __decorate([
    Component({
        selector: 'envio-forcar',
        templateUrl: './envio-forcar.component.html',
        styleUrls: ['./envio-forcar.component.scss'],
        standalone: false
    })
], EnvioForcarComponent);
export { EnvioForcarComponent };
//# sourceMappingURL=envio-forcar.component.js.map