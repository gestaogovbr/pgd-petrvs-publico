import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { TipoAvaliacaoNota } from 'src/app/models/tipo-avaliacao-nota';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-avaliacao-list',
  templateUrl: './tipo-avaliacao-list.component.html',
  styleUrls: ['./tipo-avaliacao-list.component.scss']
})
export class TipoAvaliacaoListComponent extends PageListBase<TipoAvaliacao, TipoAvaliacaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoAvaliacao, TipoAvaliacaoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Avaliação");
    this.code="MOD_TIPO_AVAL";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_TIPO_AVAL_EXCL");
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }

    return result;
  }

  public getNotasText(notas: TipoAvaliacaoNota[]) {
    return notas.map(x => x.nota).join(", ");
  }
}


