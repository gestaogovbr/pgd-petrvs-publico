import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { Cidade } from 'src/app/models/cidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-cidade-list',
  templateUrl: './cidade-list.component.html',
  styleUrls: ['./cidade-list.component.scss']
})
export class CidadeListComponent extends PageListBase<Cidade, CidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, Cidade, CidadeDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Cidades");
    this.code = "MOD_CID";
    this.filter = this.fh.FormBuilder({
      nome: { default: "" }
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_CID_EXCL");
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if (form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }
    return result;
  }
}

