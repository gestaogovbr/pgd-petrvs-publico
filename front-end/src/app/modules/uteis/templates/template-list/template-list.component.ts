import {Component, Injector, ViewChild} from '@angular/core';
import {Template} from "src/app/models/template.model";
import {TemplateDaoService} from "src/app/dao/template-dao.service";
import { GridComponent } from 'src/app/components/grid/grid.component';
import {FormGroup} from "@angular/forms";
import {PageListBase} from "src/app/modules/base/page-list-base";
import {Adesao} from "../../../../models/adesao.model";
import { Base, IIndexable } from 'src/app/models/base.model';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent extends PageListBase<Template, TemplateDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public selected?: Template; 
  public form: FormGroup;
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

  constructor(public injector: Injector) {
    super(injector, Template, TemplateDaoService);
    this.title = this.lex.noun("TCR", true);
    this.code = "MOD_TEMP";
    this.modalWidth = 1200;
    this.filter = this.fh.FormBuilder({
      titulo: {default: ""},
      especie: {default: "OUTRO"}
    });
    this.form = this.fh.FormBuilder({
      titulo: {default: ""},
      conteudo: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados da tarefa
    if (this.auth.hasPermissionTo("MOD_TEMP_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    if (this.auth.hasPermissionTo("MOD_TEMP_EDT")) {
      this.options.push({
        icon: "bi bi-check-all",
        label: "Associar TCR",
        onClick: ((row: Adesao) => this.go.navigate({route: ['cadastros', 'template', row.id, 'termos']}, {modalClose: (modalResult) => console.log(modalResult?.conteudo)})).bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a tarefa
    if (this.auth.hasPermissionTo("MOD_TEMP_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.addParams = { especie: this.filter?.controls.especie.value };
  }

  public filterClear(filter: FormGroup) {
    filter.controls.titulo.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    result.push(["especie", "==", form.especie]);
    if(form.titulo?.length) {
      result.push(["titulo", "like", "%" + form.titulo + "%"]);
    }

    return result;
  }

  public onTemplateSelect(selected: Base | IIndexable | null) {
    this.selected = selected as Template || undefined;
    this.form.patchValue({
      titulo: this.selected?.titulo || "",
      conteudo: this.selected?.conteudo || ""
    });
    this.cdRef.detectChanges();
  }

}
