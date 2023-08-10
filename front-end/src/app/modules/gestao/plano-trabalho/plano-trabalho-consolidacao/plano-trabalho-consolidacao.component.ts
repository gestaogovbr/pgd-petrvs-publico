import { Component, Injector, OnInit } from '@angular/core';
import { PageBase } from 'src/app/modules/base/page-base';

@Component({
  selector: 'app-plano-trabalho-consolidacao',
  templateUrl: './plano-trabalho-consolidacao.component.html',
  styleUrls: ['./plano-trabalho-consolidacao.component.scss']
})
export class PlanoTrabalhoConsolidacaoComponent extends PageBase implements OnInit {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
