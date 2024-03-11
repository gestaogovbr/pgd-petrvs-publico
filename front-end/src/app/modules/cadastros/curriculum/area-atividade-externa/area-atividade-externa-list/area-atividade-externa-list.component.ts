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
     
     this.addOption(this.OPTION_EXCLUIR, "MOD_RX_OUT_EXCL");
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


