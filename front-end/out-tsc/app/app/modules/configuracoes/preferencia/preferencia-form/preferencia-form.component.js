import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageBase } from 'src/app/modules/base/page-base';
import { PreferenciaFormPetrvsComponent } from '../preferencia-form-petrvs/preferencia-form-petrvs.component';
import { PreferenciaFormUsuarioComponent } from '../preferencia-form-usuario/preferencia-form-usuario.component';
let PreferenciaFormComponent = class PreferenciaFormComponent extends PageBase {
    /*private _submitting: boolean = false;
    public set submitting(value: boolean) {
      if(!value) {
        this.dialog.closeSppinerOverlay();
      } else if(!this._submitting) {
        this.dialog.showSppinerOverlay("Salvando dados do formulário");
      }
      this._submitting = value;
    }
    public get submitting(): boolean {
      return this._submitting;
    }
    private _loading: boolean = false;
    public set loading(value: boolean) {
      if(!value) {
        this.dialog.closeSppinerOverlay();
      } else if(!this._loading) {
        this.dialog.showSppinerOverlay("Carregando dados do formulário");
      }
      this._loading = value;
    }
    public get loading(): boolean {
      return this._loading;
    }*/
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.mensagemCarregando = "Carregando dados do formulário...";
        this.mensagemSalvando = "Salvando dados do formulário...";
        this.form = this.fh.FormBuilder({});
    }
    get forceInvalid() {
        return !!this.petrvs?.form?.invalid || !!this.usuario?.form?.invalid;
    }
    async onSaveData() {
        if (!this.forceInvalid) {
            this.submitting = true;
            try {
                await Promise.all([
                    this.petrvs?.onSaveData(),
                    this.usuario?.onSaveData()
                ]);
                this.dialog.alert("Atenção", "Algumas modificações só surtirão efeito após atualizar a página.\nPor motivos de segurança esse procedimento, de atualizar a pagina, deverá ser executado pelo usuário.");
                this.go.back();
            }
            catch (error) {
                this.editableForm.error = error.message ? error.message : error;
            }
            finally {
                this.submitting = false;
            }
        }
        else {
            if (!this.petrvs?.form?.invalid)
                this.editableForm.error = "Form Petrvs com erro";
            if (!this.usuario?.form?.invalid)
                this.editableForm.error = "Form do usuário com erro";
        }
    }
    onCancel() {
        this.close();
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PreferenciaFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(PreferenciaFormPetrvsComponent, { static: false })
], PreferenciaFormComponent.prototype, "petrvs", void 0);
__decorate([
    ViewChild(PreferenciaFormUsuarioComponent, { static: false })
], PreferenciaFormComponent.prototype, "usuario", void 0);
PreferenciaFormComponent = __decorate([
    Component({
        selector: 'app-preferencia-form',
        templateUrl: './preferencia-form.component.html',
        styleUrls: ['./preferencia-form.component.scss'],
        standalone: false
    })
], PreferenciaFormComponent);
export { PreferenciaFormComponent };
//# sourceMappingURL=preferencia-form.component.js.map