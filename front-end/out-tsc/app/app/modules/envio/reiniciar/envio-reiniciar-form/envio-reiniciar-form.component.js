import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EnvioDaoService } from 'src/app/dao/envio-dao.service';
;
import { PageBase } from 'src/app/modules/base/page-base';
let EnvioReiniciarFormComponent = class EnvioReiniciarFormComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.envioDao = injector.get(EnvioDaoService);
        this.form = this.fh.FormBuilder({});
    }
    async onSaveData() {
        this.envioDao.reiniciar().subscribe({
            next: async (result) => {
                await this.dialog.alert('Reenvio reiniciado', 'Aguarde o próximo agendamento para o reenvio completo surtir efeito');
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
], EnvioReiniciarFormComponent.prototype, "editableForm", void 0);
EnvioReiniciarFormComponent = __decorate([
    Component({
        selector: 'envio-reiniciar-form',
        templateUrl: './envio-reiniciar-form.component.html',
        styleUrls: ['./envio-reiniciar-form.component.scss'],
        standalone: false
    })
], EnvioReiniciarFormComponent);
export { EnvioReiniciarFormComponent };
//# sourceMappingURL=envio-reiniciar-form.component.js.map