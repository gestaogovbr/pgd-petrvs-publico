import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
import { TemplateService } from "../../templates/template.service";
import { Template } from "src/app/models/template.model";
let RelatoriosTemplateComponent = class RelatoriosTemplateComponent extends PageFrameBase {
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.loadingRelatorios = false;
        this.loadingDataset = false;
        this.cdRef = injector.get(ChangeDetectorRef);
        this.dao = injector.get(TemplateDaoService);
        this.templateService = injector.get(TemplateService);
        this.code = "MOD_REL_TEMP";
        this.form = this.fh.FormBuilder({
            codigo: { default: "" },
            titulo: { default: "" },
            conteudo: { default: "" }
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.entidadeId = this.entidadeId || this.queryParams?.entidadeId;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loadRelatorios(this.entity);
    }
    loadRelatorios(entity) {
        (async () => {
            this.loadingRelatorios = true;
            this.cdRef.detectChanges();
            try {
                this.items = await this.templateService.loadRelatorios(this.entidadeId);
            }
            finally {
                this.loadingRelatorios = false;
                this.cdRef.detectChanges();
            }
        })();
    }
    dynamicButtons(row) {
        let result = [];
        if (this.entidadeId?.length)
            result.push({ hint: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: this.grid?.onEditItem.bind(this.grid) });
        return result;
    }
    async loadTemplate(form, row) {
        this.loadingDataset = true;
        this.dataset = await this.templateService.dataset("RELATORIO", row.codigo);
        form.controls.codigo.setValue(row.codigo);
        form.controls.titulo.setValue(row.titulo);
        form.controls.conteudo.setValue(row.conteudo);
        this.loadingDataset = false;
        this.cdRef.detectChanges();
    }
    async saveTemplate(form, row) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (this.form.valid) {
            let already = (this.entidadeId?.length && this.entidadeId == row.entidade_id);
            if (already) {
                row.codigo = form.controls.codigo.value;
                row.titulo = form.controls.titulo.value;
                row.conteudo = form.controls.conteudo.value;
                row.dataset = this.dataset;
                row._status = row._status == "ADD" ? "ADD" : "EDIT";
                await this.dao.save(row, this.join);
            }
            else {
                let template = new Template({
                    id: this.dao.generateUuid(),
                    codigo: form.controls.codigo.value,
                    titulo: form.controls.titulo.value,
                    conteudo: form.controls.conteudo.value,
                    dataset: this.dataset,
                    especie: "RELATORIO",
                    entidade_id: this.entidadeId || null,
                    _status: "ADD",
                });
                this.entity.relatorios_templates = this.entity.relatorios_templates || [];
                this.entity.relatorios_templates.push(template);
                this.cdRef.detectChanges();
            }
        }
        return result;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], RelatoriosTemplateComponent.prototype, "grid", void 0);
__decorate([
    Input()
], RelatoriosTemplateComponent.prototype, "cdRef", void 0);
__decorate([
    Input()
], RelatoriosTemplateComponent.prototype, "entidadeId", void 0);
__decorate([
    Input()
], RelatoriosTemplateComponent.prototype, "entity", null);
RelatoriosTemplateComponent = __decorate([
    Component({
        selector: 'relatorios-template',
        templateUrl: './relatorios-template.component.html',
        styleUrls: ['./relatorios-template.component.scss'],
        standalone: false
    })
], RelatoriosTemplateComponent);
export { RelatoriosTemplateComponent };
//# sourceMappingURL=relatorios-template.component.js.map