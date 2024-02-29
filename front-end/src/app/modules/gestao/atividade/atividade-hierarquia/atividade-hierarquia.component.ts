import { Component, Injector, Input, OnInit } from '@angular/core';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { AtividadeHierarquia } from 'src/app/models/atividade-hierarquia.model';

import { PageBase } from 'src/app/modules/base/page-base';
import { PlanoEntregaService } from '../../plano-entrega/plano-entrega.service';

@Component({
  selector: 'atividade-hierarquia',
  templateUrl: './atividade-hierarquia.component.html',
  styleUrls: ['./atividade-hierarquia.component.scss']
})
export class AtividadeHierarquiaComponent extends PageBase implements OnInit {
  public atividade!: AtividadeHierarquia;
  public atividadeDao: AtividadeDaoService;
  public planoEntregaService: PlanoEntregaService;


  constructor(public injector: Injector){
    super(injector);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if(this.urlParams!.get("id")) {
      this.loadAtividade(this.urlParams!.get("id")!)
    }
  }

  public async loadAtividade(atividade_id: string){
    const result = await this.atividadeDao.getHierarquia(atividade_id)
    if(result){
      this.atividade = result
    }
  }
}
