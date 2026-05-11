import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { PageBase } from './page-base';
import { NavigateResult } from 'src/app/services/navigate.service';
//@Component({ template: '' })
let PageFormBase = class PageFormBase extends PageBase {
    constructor(injector, mType, dType) {
        super(injector);
        this.injector = injector;
        this.action = "";
        /* Configurações */
        this.join = [];
        this.mensagemSalvarSucesso = "Registro salvo com sucesso!";
        this.mensagemCarregando = "Carregando dados do formulário...";
        this.mensagemSalvando = "Salvando dados do formulário...";
        this.error = (error, prependMessage) => {
            if (this.editableForm) {
                if (typeof error === 'object' && error !== null && 'validationErrors' in error && error.validationErrors) {
                    this.editableForm.error = "";
                    Object.entries(error.validationErrors).forEach(([field, messages]) => {
                        const control = this.form.get(field);
                        if (control) {
                            control.setErrors({ errorMessage: messages });
                        }
                    });
                }
                else {
                    let errorMessage = 'Ocorreu um erro desconhecido';
                    if (typeof error === 'string') {
                        errorMessage = error;
                    }
                    else {
                        errorMessage = error?.error?.error || error?.error?.message || error?.message || errorMessage;
                    }
                    if (prependMessage) {
                        errorMessage = prependMessage + ':' + errorMessage;
                    }
                    this.editableForm.error = errorMessage;
                    console.error(error);
                }
            }
        };
        this.clearErros = () => {
            if (this.editableForm)
                this.editableForm.error = "";
        };
        this.dao = injector.get(dType);
    }
    ngOnInit() {
        super.ngOnInit();
        const segment = (this.url ? this.url[this.url.length - 1]?.path : "") || "";
        this.action = ["edit", "consult", "clone"].includes(segment) ? segment : "new";
        this.id = this.action != "new" ? this.urlParams.get("id") : undefined;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.onInitializeData();
        this.cdRef.detectChanges();
    }
    get isNew() {
        return this.action == "new";
    }
    get formDisabled() {
        return this.action == "consult";
    }
    checkFilled(controls) {
        return !controls.find(x => !this.form.controls[x].value?.length);
    }
    onInitializeData() {
        (async () => {
            this.loading = true;
            try {
                if (["edit", "consult", "clone"].includes(this.action)) {
                    const entity = await this.dao.getById(this.id, this.join).catch(error => {
                        this.error("Erro ao carregar os dados: " + (error.error?.error || error.error?.message || error.message || error));
                    });
                    this.entity = entity;
                    await this.loadData(this.entity, this.form, this.action);
                }
                else { /* if (this.action == "new") */
                    await this.initializeData(this.form);
                }
            }
            catch (error) {
                this.error("Erro ao carregar dados: " + (error?.error?.error || error?.error?.message || error?.message || error));
            }
            finally {
                this.loading = false;
            }
            if (this.action == "edit" && this.titleEdit)
                this.title = this.titleEdit(this.entity);
        })();
    }
    onAfterSave(entity) { }
    async onSaveData() {
        const self = this;
        let error = undefined;
        if (this.formValidation) {
            try {
                error = await this.formValidation(this.form);
            }
            catch (e) {
                error = e;
            }
        }
        if (this.form.valid && !error) {
            this.submitting = true;
            try {
                let entity = await this.saveData(this.form.value);
                if (entity) {
                    const modalResult = typeof entity == "boolean" ? this.entity?.id : entity instanceof NavigateResult ? entity.modalResult : (await this.dao.save(entity, this.join)).id;
                    this.onAfterSave(entity);
                    if (self.modalRoute?.queryParams?.idroute?.length)
                        self.go.setModalResult(self.modalRoute?.queryParams?.idroute, modalResult);
                    //self.dialog.alert("Sucesso", this.mensagemSalvarSucesso).then(() => self.go.back());
                    self.close();
                }
            }
            catch (error) {
                self.error(error?.error?.error || error?.error?.message || error?.message || error);
            }
            finally {
                self.submitting = false;
            }
        }
        else {
            this.form.markAllAsTouched();
            if (error) {
                this.error(error);
            }
            Object.entries(this.form.controls).forEach(([key, value]) => {
                if (value.invalid)
                    console.log("Validate => " + key, value.value, value.errors);
            });
        }
    }
    onCancel() {
        this.close();
    }
    getControlByName(controlName) {
        return this.form.controls[controlName];
    }
    resetForm(form) {
        if (form) {
            Object.keys(form.controls).forEach(key => {
                const control = this.form?.get(key);
                console.log(typeof control);
                if (control instanceof FormGroup) {
                    this.resetForm(control);
                }
                else if (control instanceof FormArray) {
                    while (control.length !== 0) {
                        control.removeAt(0);
                    }
                }
                else {
                    control?.reset();
                }
            });
        }
    }
};
PageFormBase = __decorate([
    Injectable()
], PageFormBase);
export { PageFormBase };
//# sourceMappingURL=page-form-base.js.map