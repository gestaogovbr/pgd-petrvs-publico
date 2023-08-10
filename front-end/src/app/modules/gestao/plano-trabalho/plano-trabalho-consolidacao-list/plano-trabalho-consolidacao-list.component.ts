import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-plano-trabalho-consolidacao-list',
  templateUrl: './plano-trabalho-consolidacao-list.component.html',
  styleUrls: ['./plano-trabalho-consolidacao-list.component.scss']
})
export class PlanoTrabalhoConsolidacaoListComponent extends PageListBase<PlanoTrabalhoConsolidacao, PlanoTrabalhoConsolidacaoDaoService> {

  constructor(public injector: Injector) {
    super(injector, PlanoTrabalhoConsolidacao, PlanoTrabalhoConsolidacaoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Planos de Trabalho");
    this.code = "MOD_PTR";
    this.filter = this.fh.FormBuilder({}, this.cdRef, this.filterValidate);
    this.join = [];
  }

  public filterValidate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }
}
