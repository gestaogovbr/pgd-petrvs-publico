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
import { PlanoTrabalhoService } from "../../gestao/plano-trabalho/plano-trabalho.service";
import { ProgramaDaoService } from "src/app/dao/programa-dao.service";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";

@Component({
  selector: 'visualizar-avaliacao',
  templateUrl: './visualizar-avaliacao.component.html',
  styleUrls: ['./visualizar-avaliacao.component.scss']
})

export class VisualizarAvaliacaoComponent extends PageBase implements OnInit {

  public consolidacaoDao: PlanoTrabalhoConsolidacaoDaoService;
  public programaDao: ProgramaDaoService;
  public planoTrabalhoService: PlanoTrabalhoService;
  public consolidacao?: PlanoTrabalhoConsolidacao | null;
  public joinConsolidacao: string[] = ['avaliacoes.tipo_avaliacao', 'avaliacoes.avaliador'];
  public joinPrograma: string[] = ["tipo_avaliacao_plano_trabalho.notas.justificativas", "tipo_avaliacao_plano_entrega.notas.justificativas"];


  constructor(public injector: Injector) {
    super(injector);
    this.consolidacaoDao = injector.get<PlanoTrabalhoConsolidacaoDaoService>(PlanoTrabalhoConsolidacaoDaoService);
    this.planoTrabalhoService = injector.get<PlanoTrabalhoService>(PlanoTrabalhoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.buscaConsolidacao();
  }

  public async buscaConsolidacao(){
    this.consolidacao = await this.consolidacaoDao.getById(this.urlParams!.get("consolidacaoId")!, this.joinConsolidacao);   
  }

  public async fazerRecurso(avaliacao: Avaliacao) {
    console.log(avaliacao.nota);
    
    this.go.navigate({route: ['gestao', 'plano-trabalho', 'avaliacao', avaliacao.id, 'recurso']}, {
      modal: true, 
      metadata: {
        avaliacao: avaliacao,
      },
      modalClose: (modalResult?: Avaliacao) => {
        if(modalResult) {
          avaliacao = modalResult;
        }
      }
    });
  }

  public podeFazerRecurso(avaliacao: Avaliacao) {
    const nota = avaliacao.nota.replace(/["]/g, '');
    return ['Inadequado', 'Não executado'].includes(nota) && !avaliacao.recurso;
  }

}