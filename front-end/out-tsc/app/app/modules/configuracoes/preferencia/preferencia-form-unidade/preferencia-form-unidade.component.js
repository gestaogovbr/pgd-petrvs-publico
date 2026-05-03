import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { UsuarioConfig } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let PreferenciaFormUnidadeComponent = class PreferenciaFormUnidadeComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Unidade, UnidadeDaoService);
        this.injector = injector;
        this.etiquetas = false;
        this.carregando = false;
        this.toolbarButtons = [
            {
                label: "Resetar",
                icon: "bi bi-backspace",
                onClick: () => {
                    this.loading = true;
                    this.dao.update(this.usuarioId, { config: new UsuarioConfig() }).then(usuario => {
                        this.initializeData(this.form);
                    }).finally(() => {
                        this.loading = false;
                    });
                }
            }
        ];
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.form = this.fh.FormBuilder({
            etiquetas: { default: [] },
            etiqueta_texto: { default: "" },
            etiqueta_icone: { default: null },
            etiqueta_cor: { default: null },
            theme: { default: null },
            ocultar_menu_sei: { default: true },
            ocultar_container_petrvs: { default: false },
        }, this.cdRef, this.validate);
    }
    get isPanel() {
        return this.panel != undefined;
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.urlParams.get("id")) {
            this.usuarioId = this.urlParams.get("id");
        }
        this.etiquetas = !!this.queryParams.etiquetas;
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        //formValue = this.util.fillForm(formValue, entity.config || {});
        //formValue = this.util.fillForm(formValue, entity.notificacoes || {});
        form.patchValue(formValue);
    }
    async initializeData(form) {
        this.carregando = true;
        try {
            this.entity = (await this.dao.getById(this.usuarioId));
            await this.loadData(this.entity, form);
        }
        finally {
            this.carregando = false;
        }
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let config = this.util.fill(new UsuarioConfig(), this.form.value);
            Promise.all([
                this.auth.updateUsuarioConfig(this.usuarioId, config),
                this.auth.updateUsuarioNotificacoes(this.usuarioId, this.entity.notificacoes)
            ]).then(results => {
                if (this.usuarioId == this.auth.usuario.id) {
                    this.auth.authSession().then(result => resolve(!this.isPanel)).catch(reject);
                }
                else {
                    resolve(!this.isPanel);
                }
            }).catch(reject);
        });
    }
    addItemHandleEtiquetas() {
        let result = undefined;
        const value = this.form.controls.etiqueta_texto.value;
        const key = this.util.textHash(value);
        if (value?.length && this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
            result = {
                key: key,
                value: this.form.controls.etiqueta_texto.value,
                color: this.form.controls.etiqueta_cor.value,
                icon: this.form.controls.etiqueta_icone.value
            };
            this.form.controls.etiqueta_texto.setValue("");
            this.form.controls.etiqueta_icone.setValue(null);
            this.form.controls.etiqueta_cor.setValue(null);
        }
        return result;
    }
    ;
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PreferenciaFormUnidadeComponent.prototype, "editableForm", void 0);
__decorate([
    Input()
], PreferenciaFormUnidadeComponent.prototype, "panel", void 0);
__decorate([
    Input()
], PreferenciaFormUnidadeComponent.prototype, "usuarioId", void 0);
PreferenciaFormUnidadeComponent = __decorate([
    Component({
        selector: 'app-preferencia-form-unidade',
        templateUrl: './preferencia-form-unidade.component.html',
        styleUrls: ['./preferencia-form-unidade.component.scss'],
        standalone: false
    })
], PreferenciaFormUnidadeComponent);
export { PreferenciaFormUnidadeComponent };
//# sourceMappingURL=preferencia-form-unidade.component.js.map