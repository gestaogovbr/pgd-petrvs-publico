import { Component, Injector, ViewChild } from '@angular/core';
import { Template } from "src/app/models/template.model";
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { GridComponent } from 'src/app/components/grid/grid.component';
import { FormGroup } from "@angular/forms";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { Base, IIndexable } from 'src/app/models/base.model';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { TemplateDataset, TemplateService } from '../template.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent extends PageListBase<Template, TemplateDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public selected?: Template;
  public form: FormGroup;
  public templateService: TemplateService;
  public listagem: boolean = false;
  public selectButtons: ToolbarButton[] = [
    {
      color: "btn-outline-success",
      label: "Selecionar",
      icon: "bi-check-circle",
      disabled: () => !this.selected,
      onClick: () => this.onSelect(this.selected!)
    },
    {
      color: "btn-outline-danger",
      label: "Cancelar",
      icon: "bi bi-dash-circle",
      onClick: () => this.close()
    }
  ];

  private _dataset: TemplateDataset[] = [];

  constructor(public injector: Injector) {
    super(injector, Template, TemplateDaoService);
    this.templateService = injector.get<TemplateService>(TemplateService);

    


    this.title = this.lex.translate("Termos de Ciência e Responsabilidade");
    this.code = "MOD_TEMP";
    this.modalWidth = 1200;
    this.filter = this.fh.FormBuilder({
      titulo: { default: "" },
      especie: { default: "OUTRO" }
    });
    this.form = this.fh.FormBuilder({
      titulo: { default: "" },
      conteudo: { default: "" }
    });
    this.addOption(this.OPTION_INFORMACOES)
    this.addOption(this.OPTION_EXCLUIR, "MOD_TEMP_EXCL")
   
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.addParams = { especie: this.filter?.controls.especie.value };
    if(this.queryParams.modo == "listagem"){
      this.title = this.lex.translate("Templates") + " - OUTRO";
      this.listagem = true;
      this.options = this.options.filter(option => option.label !== 'Associar TCR');
    }else { 
      this.filter?.controls['especie'].disable;
      if (this.auth.hasPermissionTo("MOD_TEMP_EDT")) {
        this.options.push({
          icon: "bi bi-check-all",
          label: "Associar TCR",
          onClick: ((row: Template) => this.go.navigate({ route: ['cadastros', 'template', row.id, 'termos'] }, { modalClose: (modalResult) => console.log(modalResult?.conteudo) })).bind(this)
        });
      }
    }
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if(this.listagem){
     this.addParams = { especie: form.especie };
     const especie = this.lookup.TEMPLATE_ESPECIE.find(item => item.key === form.especie)
     this.title  = this.lex.translate("Templates") + " - " + especie?.value;
    }
    result.push(["especie", "==", form.especie]);
    if (form.titulo?.length) {
      result.push(["titulo", "like", "%" + form.titulo.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }

 

  // public get dataset(): TemplateDataset[] {
  //   const dataset = this.templateService.dataset(this.filter!.controls.especie.value);
  //   if(JSON.stringify(this._dataset) != JSON.stringify(dataset)) {
  //     this._dataset = dataset;
  //   }
  //   return this._dataset;
  // }

  // public async addTemplate() {
  //   const template = new Template();
  //   template.id = this.dao!.generateUuid();
  //   template.especie = this.filter!.controls.especie.value;
  //   template.dataset = this.dataset;
  //   template.unidade_id = this.auth.unidade!.id;
  //   template._status = "ADD";
  //   this.onSelect(template);
  //   return template;
  // }

  /*

  public async saveDocumento(form: FormGroup, item: Template) {
    const entity = form.value;
    item.titulo = form.controls.titulo.value;
    item.conteudo = form.controls.conteudo.value;
    const template = await this.dao!.save(item);
    form.controls.id.setValue(template.id);
    item.id = template.id;
    return template;
  }*/

  public onTemplateSelect(selected: Base | IIndexable | null) {
    this.selected = selected as Template || undefined;
    this.form.patchValue({
      titulo: this.selected?.titulo || "",
      conteudo: this.selected?.conteudo || ""
    });
    this.cdRef.detectChanges();
  }

}
