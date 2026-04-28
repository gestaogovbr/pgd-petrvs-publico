import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { Template } from "src/app/models/template.model";
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { TemplateService } from '../../templates/template.service';
let NotificacoesTemplateComponent = class NotificacoesTemplateComponent extends PageFrameBase {
    //@Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    set source(value) {
        if (this._source != value) {
            this._source = value;
            this.items = this.templateService.buildItems(this.source, this.entity?.notificacoes_templates || [], this.entity?.notificacoes?.nao_notificar);
            this.cdRef.detectChanges();
        }
    }
    get source() {
        return this._source;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this._source = [];
        this.cdRef = injector.get(ChangeDetectorRef);
        this.dao = injector.get(TemplateDaoService);
        this.templateService = injector.get(TemplateService);
        this.code = "MOD_NOTF_TEMP";
        this.form = this.fh.FormBuilder({
            codigo: { default: "" },
            titulo: { default: "" },
            conteudo: { default: "" }
        });
    }
    dynamicButtons(row) {
        let result = [];
        let canDelete = (this.unidadeId?.length && this.unidadeId == row.unidade_id) || (this.entidadeId?.length && this.entidadeId == row.entidade_id);
        if (this.unidadeId?.length || this.entidadeId?.length)
            result.push({ hint: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: this.grid?.onEditItem.bind(this.grid) });
        if (canDelete)
            result.push({ hint: "Limpar", icon: "bi bi-x-circle", color: "btn-outline-danger", onClick: this.grid?.onDeleteItem.bind(this.grid) });
        return result;
    }
    /*public onTemplateSelect(row: Base | IIndexable | null) {
      const selected = row as Template || undefined;
      this.form.patchValue({
        codigo: selected?.codigo || "",
        titulo: selected?.titulo || "",
        conteudo: selected?.conteudo || ""
      });
      this.cdRef.detectChanges();
    }*/
    async loadTemplate(form, row) {
        this.dataset = await this.templateService.dataset("NOTIFICACAO", row.codigo);
        form.controls.codigo.setValue(row.codigo);
        form.controls.titulo.setValue(row.titulo);
        form.controls.conteudo.setValue(row.conteudo);
        this.cdRef.detectChanges();
    }
    async removeTemplate(row) {
        let notificacao = this.entity.notificacoes_templates?.find(x => x.id == row.id);
        if (notificacao) {
            notificacao._status = "DELETE";
            this.items = this.templateService.buildItems(this.source, this.entity.notificacoes_templates || [], this.entity?.notificacoes?.nao_notificar);
            this.cdRef.detectChanges();
        }
        return false;
        /*let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
        if(confirm) {
          await this.dao!.delete(row);
          return true;
        } else {
          return false;
        }*/
    }
    onNotificarChange(row) {
        if (!row._metadata?.notificar && !this.entity?.notificacoes?.nao_notificar?.includes(row.codigo)) {
            this.entity?.notificacoes?.nao_notificar?.push(row.codigo);
        }
        else if (row._metadata?.notificar && this.entity?.notificacoes?.nao_notificar?.includes(row.codigo)) {
            this.entity?.notificacoes?.nao_notificar?.splice(this.entity?.notificacoes?.nao_notificar?.indexOf(row.codigo), 1);
        }
    }
    async saveTemplate(form, row) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (this.form.valid) {
            let already = (this.unidadeId?.length && this.unidadeId == row.unidade_id) || (this.entidadeId?.length && this.entidadeId == row.entidade_id);
            if (already) {
                row.codigo = form.controls.codigo.value;
                row.titulo = form.controls.titulo.value;
                row.conteudo = form.controls.conteudo.value;
                row.dataset = this.dataset;
                row._status = row._status == "ADD" ? "ADD" : "EDIT";
            }
            else {
                let template = new Template({
                    id: this.dao.generateUuid(),
                    codigo: form.controls.codigo.value,
                    titulo: form.controls.titulo.value,
                    conteudo: form.controls.conteudo.value,
                    dataset: this.dataset,
                    especie: "NOTIFICACAO",
                    entidade_id: this.entidadeId || null,
                    unidade_id: this.unidadeId || null,
                    _status: "ADD",
                    _metadata: { notificar: true }
                });
                this.entity.notificacoes_templates = this.entity.notificacoes_templates || [];
                this.entity.notificacoes_templates.push(template);
                if (this.entity.notificacoes?.nao_notificar?.includes(template.codigo))
                    this.entity.notificacoes?.nao_notificar?.splice(this.entity.notificacoes?.nao_notificar?.indexOf(template.codigo), 1);
                this.items = this.templateService.buildItems(this.source, this.entity.notificacoes_templates || [], this.entity?.notificacoes?.nao_notificar);
                this.cdRef.detectChanges();
            }
            /*this.submitting = true;
            try {
              result = await this.dao!.save(row, this.join);
            } catch (error: any) {
              this.error(error.message ? error.message : error);
            } finally {
              this.submitting = false;
            }
            this.cdRef.detectChanges();
            */
        }
        return result;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], NotificacoesTemplateComponent.prototype, "grid", void 0);
__decorate([
    Input()
], NotificacoesTemplateComponent.prototype, "cdRef", void 0);
__decorate([
    Input()
], NotificacoesTemplateComponent.prototype, "entity", null);
__decorate([
    Input()
], NotificacoesTemplateComponent.prototype, "entidadeId", void 0);
__decorate([
    Input()
], NotificacoesTemplateComponent.prototype, "unidadeId", void 0);
__decorate([
    Input()
], NotificacoesTemplateComponent.prototype, "source", null);
NotificacoesTemplateComponent = __decorate([
    Component({
        selector: 'notificacoes-template',
        templateUrl: './notificacoes-template.component.html',
        styleUrls: ['./notificacoes-template.component.scss'],
        standalone: false
    })
], NotificacoesTemplateComponent);
export { NotificacoesTemplateComponent };
//# sourceMappingURL=notificacoes-template.component.js.map