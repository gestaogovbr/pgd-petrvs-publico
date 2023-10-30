import { Component, Injector, Input, ViewChild } from '@angular/core';
import { Template, TemplateEspecie } from "src/app/models/template.model";
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { GridComponent } from 'src/app/components/grid/grid.component';
import { FormGroup } from "@angular/forms";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { Base, IIndexable } from 'src/app/models/base.model';
import { TemplateDataset, TemplateService } from './template.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent extends PageListBase<Template, TemplateDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() public especie?: TemplateEspecie;
  @Input() public dataset?: TemplateDataset[];

  public form: FormGroup;
  public selectId?: string;
  public templateService: TemplateService;

  constructor(public injector: Injector) {
    super(injector, Template, TemplateDaoService);
    this.templateService = injector.get<TemplateService>(TemplateService);
    this.code = "MOD_TEMP";
    this.modalWidth = 1200;
    this.filter = this.fh.FormBuilder({});
    this.form = this.fh.FormBuilder({
      codigo: { default: "" },
      titulo: { default: "" },
      conteudo: { default: "" }
    });
  }

  public onGridLoad(rows?: Base[]) {
    if(this.selectId && rows?.find(x => x.id == this.selectId)) this.grid!.selectById(this.selectId);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.especie = this.urlParams?.has("especie") ? this.urlParams!.get("especie") : this.metadata?.especie || this.especie || "OUTRO";
    this.dataset = this.dataset || this.templateService.dataset(this.especie!);
    this.title = this.lookup.getValue(this.lookup.TEMPLATE_ESPECIE, this.especie);
    this.selectId = this.queryParams?.selectId;
  }

  public filterWhere = (filter: FormGroup) => {
    return [["especie", "==", this.especie]];
  }

  public onTemplateSelect(row: Base | IIndexable | null) {
    const selected = row as Template || undefined;
    this.form.patchValue({
      codigo: selected?.codigo || "",
      titulo: selected?.titulo || "",
      conteudo: selected?.conteudo || ""
    });
    this.cdRef.detectChanges();
  }

  public async addTemplate() {
    return new Template({
      codigo: "",
      conteudo: "",
      especie: this.especie, 
      dataset: this.dataset,
      titulo: this.templateService.titulo(this.especie!)
    });
  }

  public async loadTemplate(form: FormGroup, row: any) {
    form.controls.codigo.setValue(row.codigo);
    form.controls.titulo.setValue(row.titulo);
    form.controls.conteudo.setValue(row.conteudo);
    this.cdRef.detectChanges();
  }

  public async removeTemplate(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if(confirm) {
      await this.dao!.delete(row);
      return true;
    } else {
      return false;
    }
  }

  public async saveTemplate(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      row.codigo = form.controls.codigo.value;
      row.titulo = form.controls.titulo.value;
      row.conteudo = form.controls.conteudo.value;
      row.dataset = this.templateService.prepareDatasetToSave(this.dataset || []);
      this.submitting = true;
      try {
        result = await this.dao!.save(row, this.join);
      } catch (error: any) {
        this.error(error.message ? error.message : error);
      } finally {
        this.submitting = false;
      }
      this.cdRef.detectChanges();
    }
    return result;
  }

}
