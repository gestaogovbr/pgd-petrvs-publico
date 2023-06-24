import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { Template, TemplateEspecie } from "src/app/models/template.model";
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AbstractControl, FormGroup } from "@angular/forms";
import { Base, IIndexable } from 'src/app/models/base.model';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { TemplateService } from '../../templates/template.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { HasNotificacao } from 'src/app/models/notificacao.model';

@Component({
  selector: 'notificacoes-template',
  templateUrl: './notificacoes-template.component.html',
  styleUrls: ['./notificacoes-template.component.scss']
})
export class NotificacoesTemplateComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  //@Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: HasNotificacao) { super.entity = value; } get entity(): HasNotificacao { return super.entity; }
  //@Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() entidadeId?: string;
  @Input() unidadeId?: string;
  @Input() set source(value: Template[]) {
    if(this._source != value) {
      this._source = value;
      this.items = this.templateService.buildItems(this.source, this.entity?.notificacoes_templates || [], this.entity?.notificacoes?.nao_notificar);
      this.cdRef.detectChanges();
    }
  }
  get source(): Template[] {
    return this._source;
  }

  public dataset?: TemplateDataset[];
  public form: FormGroup;
  public templateService: TemplateService;
  public items: Template[] = [];

  private _source: Template[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<TemplateDaoService>(TemplateDaoService);
    this.templateService = injector.get<TemplateService>(TemplateService);
    this.code = "MOD_NOTF_TEMP";
    this.form = this.fh.FormBuilder({
      codigo: { default: "" },
      titulo: { default: "" },
      conteudo: { default: "" }
    });
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let canDelete = (this.unidadeId?.length && this.unidadeId == row.unidade_id) || (this.entidadeId?.length && this.entidadeId == row.entidade_id);
    if(this.unidadeId?.length || this.entidadeId?.length) result.push({ hint: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: this.grid?.onEditItem.bind(this.grid) });
    if(canDelete) result.push({ hint: "Limpar", icon: "bi bi-x-circle", color: "btn-outline-danger", onClick: this.grid?.onDeleteItem.bind(this.grid) });
    console.log(this.grid);
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

  public async loadTemplate(form: FormGroup, row: any) {
    this.dataset = this.templateService.dataset("NOTIFICACAO", row.codigo);
    form.controls.codigo.setValue(row.codigo);
    form.controls.titulo.setValue(row.titulo);
    form.controls.conteudo.setValue(row.conteudo);
    this.cdRef.detectChanges();
  }

  public async removeTemplate(row: any) {
    let notificacao = this.entity!.notificacoes_templates?.find(x => x.id == row.id);
    if(notificacao) {
      notificacao._status = "DELETE";
      this.items = this.templateService.buildItems(this.source, this.entity!.notificacoes_templates || [], this.entity?.notificacoes?.nao_notificar);
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

  public onNotificarChange(row: Template) {
    if(!row._metadata?.notificar && !this.entity?.notificacoes?.nao_notificar?.includes(row.codigo!)) {
      this.entity?.notificacoes?.nao_notificar?.push(row.codigo!);
    } else if(row._metadata?.notificar && this.entity?.notificacoes?.nao_notificar?.includes(row.codigo!)) {
      this.entity?.notificacoes?.nao_notificar?.splice(this.entity?.notificacoes?.nao_notificar?.indexOf(row.codigo!), 1);
    }    
  }

  public async saveTemplate(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      let already = (this.unidadeId?.length && this.unidadeId == row.unidade_id) || (this.entidadeId?.length && this.entidadeId == row.entidade_id);
      if(already) {
        row.codigo = form.controls.codigo.value;
        row.titulo = form.controls.titulo.value;
        row.conteudo = form.controls.conteudo.value;
        row.dataset = this.dataset;
        row._status = row._status == "ADD" ? "ADD" : "EDIT";
      } else {
        let template = new Template({
          id: this.dao!.generateUuid(),
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
        this.entity!.notificacoes_templates = this.entity!.notificacoes_templates || [];
        this.entity!.notificacoes_templates!.push(template);
        if(this.entity!.notificacoes?.nao_notificar?.includes(template.codigo!)) this.entity!.notificacoes?.nao_notificar?.splice(this.entity!.notificacoes?.nao_notificar?.indexOf(template.codigo!), 1);
        this.items = this.templateService.buildItems(this.source, this.entity!.notificacoes_templates || [], this.entity?.notificacoes?.nao_notificar);
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

}
