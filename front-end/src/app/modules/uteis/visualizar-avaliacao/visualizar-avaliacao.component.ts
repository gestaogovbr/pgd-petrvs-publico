import { Component, Injector, OnInit } from "@angular/core";
import { AvaliacaoDaoService } from "src/app/dao/avaliacao-dao.service";
import { Avaliacao } from "src/app/models/avaliacao.model";
import { PageFormBase } from "../../base/page-form-base";
import { PageBase } from "../../base/page-base";
import { PageFrameBase } from "../../base/page-frame-base";
import { PlanoTrabalhoConsolidacaoDaoService } from "src/app/dao/plano-trabalho-consolidacao-dao.service";
import { PlanoTrabalhoConsolidacao } from "src/app/models/plano-trabalho-consolidacao.model";
import { FormGroup } from "@angular/forms";
import { IIndexable } from "src/app/models/base.model";

@Component({
  selector: 'visualizar-avaliacao',
  templateUrl: './visualizar-avaliacao.component.html',
  styleUrls: ['./visualizar-avaliacao.component.scss']
})

export class VisualizarAvaliacaoComponent extends PageBase implements OnInit {

  public consolidacaoDao: PlanoTrabalhoConsolidacaoDaoService;
  public consolidacao?: PlanoTrabalhoConsolidacao | null;
  public joinConsolidacao: string[] = ['avaliacoes.tipo_avaliacao', 'avaliacoes.avaliador'];


  constructor(public injector: Injector) {
    super(injector);
    this.consolidacaoDao = injector.get<PlanoTrabalhoConsolidacaoDaoService>(PlanoTrabalhoConsolidacaoDaoService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.buscaConsolidacao();
  }

  public async buscaConsolidacao(){
    this.consolidacao = await this.consolidacaoDao.getById(this.urlParams!.get("consolidacaoId")!, this.joinConsolidacao);   
  }

}