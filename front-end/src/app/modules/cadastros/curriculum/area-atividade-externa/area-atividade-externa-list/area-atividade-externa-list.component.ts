import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { AreaAtividadeExterna } from 'src/app/models/area-atividade-externa.model';
import { AreaAtividadeExternaDaoService } from 'src/app/dao/area-atividade-externa-dao.service';

@Component({
  selector: 'area-atividade-externa-list',
  templateUrl: './area-atividade-externa-list.component.html',
  styleUrls: ['./area-atividade-externa-list.component.scss']
})
export class AreaAtividadeExternaListComponent extends PageListBase<AreaAtividadeExterna, AreaAtividadeExternaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;


  constructor(public injector: Injector) {
    super(injector, AreaAtividadeExterna, AreaAtividadeExternaDaoService);
    /* Inicializações */
  
    this.title = this.lex.translate("Áreas da Atividade Externa");
    this.code = "MOD_RX";
    this.orderBy = [['nome','asc']];

    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
     });
    // Testa se o usuário possui permissão para exibir dados de cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome_area?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }
}


