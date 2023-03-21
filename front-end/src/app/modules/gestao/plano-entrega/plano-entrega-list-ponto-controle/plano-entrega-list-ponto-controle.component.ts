import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanoEntregaPontoControleDaoService } from 'src/app/dao/plano-entrega-ponto-controle-dao.service';
import { PlanoEntregaPontoControle } from 'src/app/models/plano-entrega-ponto-controle.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-plano-entrega-list-ponto-controle',
  templateUrl: './plano-entrega-list-ponto-controle.component.html',
  styleUrls: ['./plano-entrega-list-ponto-controle.component.scss']
})
export class PlanoEntregaListPontoControleComponent extends PageListBase<PlanoEntregaPontoControle, PlanoEntregaPontoControleDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public form: FormGroup;

  constructor(public injector: Injector) { 
    super(injector, PlanoEntregaPontoControle, PlanoEntregaPontoControleDaoService);
    this.form = this.fh.FormBuilder({

    });
  }

}
