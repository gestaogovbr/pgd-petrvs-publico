import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { PageFormBase } from "../../../base/page-form-base";
import { Template } from "../../../../models/template.model";
import { TemplateDaoService } from "../../../../dao/template-dao.service";
import { EditableFormComponent } from "../../../../components/editable-form/editable-form.component";
import { TemplateService } from '../template.service';
let TemplateFormComponent = class TemplateFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Template, TemplateDaoService);
        this.injector = injector;
        this.dataset = [];
        this.validate = (control, controlName) => {
            let result = null;
            // if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
            //   result = "Obrigatório";
            // }
            return result;
        };
        this.templateService = injector.get(TemplateService);
        this.modalWidth = 1200;
        this.form = this.fh.FormBuilder({
            titulo: { default: "" },
            especie: { default: "OUTRO" },
            conteudo: { default: "" }
        }, this.cdRef, this.validate);
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.dataset = await this.templateService.dataset(form.controls.especie.value);
    }
    initializeData(form) {
        this.loadData(new Template({ especie: this.queryParams?.especie || "OUTRO" }), form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const template = this.util.fill(new Template(), this.entity);
            template.dataset = this.templateService.prepareDatasetToSave(this.dataset);
            resolve(this.util.fillForm(template, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], TemplateFormComponent.prototype, "editableForm", void 0);
TemplateFormComponent = __decorate([
    Component({
        selector: 'app-template-form',
        templateUrl: './template-form.component.html',
        styleUrls: ['./template-form.component.scss'],
        standalone: false
    })
], TemplateFormComponent);
export { TemplateFormComponent };
//# sourceMappingURL=template-form.component.js.map