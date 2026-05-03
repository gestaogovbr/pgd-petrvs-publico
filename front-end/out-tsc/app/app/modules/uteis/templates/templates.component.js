import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { Template } from "src/app/models/template.model";
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from "src/app/modules/base/page-list-base";
import { TemplateService } from './template.service';
let TemplatesComponent = class TemplatesComponent extends PageListBase {
    constructor(injector) {
        super(injector, Template, TemplateDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            return [["especie", "==", this.especie]];
        };
        this.templateService = injector.get(TemplateService);
        this.code = "MOD_TEMP";
        this.modalWidth = 1200;
        this.filter = this.fh.FormBuilder({});
        this.form = this.fh.FormBuilder({
            codigo: { default: "" },
            titulo: { default: "" },
            conteudo: { default: "" }
        });
    }
    onGridLoad(rows) {
        if (this.selectId && rows?.find(x => x.id == this.selectId))
            this.grid.selectById(this.selectId);
    }
    async ngOnInit() {
        super.ngOnInit();
        this.especie = this.urlParams?.has("especie") ? this.urlParams.get("especie") : this.metadata?.especie || this.especie || "OUTRO";
        this.dataset = this.dataset || await this.templateService.dataset(this.especie);
        this.title = this.lookup.getValue(this.lookup.TEMPLATE_ESPECIE, this.especie);
        this.selectId = this.queryParams?.selectId;
    }
    onTemplateSelect(row) {
        const selected = row || undefined;
        this.form.patchValue({
            codigo: selected?.codigo || "",
            titulo: selected?.titulo || "",
            conteudo: selected?.conteudo || ""
        });
        this.cdRef.detectChanges();
    }
    async addTemplate() {
        return new Template({
            codigo: "",
            conteudo: "",
            especie: this.especie,
            dataset: this.dataset,
            titulo: this.templateService.titulo(this.especie)
        });
    }
    async loadTemplate(form, row) {
        form.controls.codigo.setValue(row.codigo);
        form.controls.titulo.setValue(row.titulo);
        form.controls.conteudo.setValue(row.conteudo);
        this.cdRef.detectChanges();
    }
    async removeTemplate(row) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
        if (confirm) {
            await this.dao.delete(row);
            return true;
        }
        else {
            return false;
        }
    }
    async saveTemplate(form, row) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (this.form.valid) {
            row.codigo = form.controls.codigo.value;
            row.titulo = form.controls.titulo.value;
            row.conteudo = form.controls.conteudo.value;
            row.dataset = this.templateService.prepareDatasetToSave(this.dataset || []);
            this.submitting = true;
            try {
                result = await this.dao.save(row, this.join);
            }
            catch (error) {
                this.error(error.message ? error.message : error);
            }
            finally {
                this.submitting = false;
            }
            this.cdRef.detectChanges();
        }
        return result;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], TemplatesComponent.prototype, "grid", void 0);
__decorate([
    Input()
], TemplatesComponent.prototype, "especie", void 0);
__decorate([
    Input()
], TemplatesComponent.prototype, "dataset", void 0);
TemplatesComponent = __decorate([
    Component({
        selector: 'app-templates',
        templateUrl: './templates.component.html',
        styleUrls: ['./templates.component.scss'],
        standalone: false
    })
], TemplatesComponent);
export { TemplatesComponent };
//# sourceMappingURL=templates.component.js.map