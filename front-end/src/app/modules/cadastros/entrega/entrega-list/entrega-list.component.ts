import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Entrega } from 'src/app/models/entrega.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-entrega-list',
  templateUrl: './entrega-list.component.html',
  styleUrls: ['./entrega-list.component.scss']
})
export class EntregaListComponent extends PageListBase<Entrega, EntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public unidadeDao?: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Entrega, EntregaDaoService);
    /* Inicializações */
    this.join = ["unidade:id,sigla,nome"];
    this.title = this.lex.translate('Modelos de Entregas');
    this.code = "MOD_ENTRG";
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      tipo_indicador: {default: null}
     });
     this.addOption(this.OPTION_INFORMACOES);
     this.addOption(this.OPTION_EXCLUIR, "MOD_ENTRG_EXCL");
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if(form.nome?.length) result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    if(form.tipo_indicador?.length) result.push(["tipo_indicador", "==", form.tipo_indicador]);
    return result;
  }
}

