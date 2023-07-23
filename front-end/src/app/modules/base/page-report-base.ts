import { OnInit, Injector, Injectable, Type } from '@angular/core';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { Base } from 'src/app/models/base.model';
import { PageBase } from './page-base';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { Atividade } from 'src/app/models/atividade.model';

export type MetadadosPlano = {    
  concluido: Boolean,                       // define se o Plano é concluído, ou seja, se todas as suas atividades foram cumpridas.
  atividadesNaoIniciadas: Atividade[],          // todas as atividades ainda não iniciadas pelo servidor
  atividadesEmAndamento: Atividade[],           // totas as atividades já iniciadas (data_inicio diferente de nulo), mas ainda não concluídas (data_entrega nula)
  atividadesConcluidas: Atividade[],            // todas as atividades que possuem uma data de entrega não nula
  atividadesAvaliadas: Atividade[],             // todas as atividades cujo campo avaliacao_id não é nulo
  horasAfastamentoDecorridas: number,       // total das horas úteis dos afastamentos do servidor já ocorridos
  horasAtividadesNaoIniciadas: number,        // soma do tempo pactuado de todas as atividades ainda não iniciadas
  horasAtividadesEmAndamento: number,         // soma do tempo pactuado de todas as atividades já iniciadas, mas ainda não concluidas
  horasAtividadesConcluidas: number,          // soma do tempo pactuado de todas as atividades concluídas
  horasAtividadesAvaliadas: number,           // soma do tempo pactuado de todas as atividades avaliadas
  horasTotaisAlocadas: number,              // soma total do tempo pactuado de todas as atividades
  horasUteisAfastamento: number,            // total das horas úteis de afastamento do servidor
  horasUteisDecorridas: number              // Horas úteis de trabalho decorridas do Plano, considerando carga_horaria, feriados, fins de semana
  horasUteisTotais: number,                 // Horas úteis de trabalho no período de vigência do Plano, considerando carga_horaria, feriados, fins de semana
  mediaAvaliacoes: number,                  // média das avaliações das atividades
  modalidade: string,                       // tipo de modalidade do plano
  percentualHorasNaoIniciadas: number,  
  usuario_id: string
  noPeriodo: any;
};    

export type MetadadosUnidade = {    
  qdePlanos: number,
  horasUteisTotais: number,
  horasUteisTotaisDecorridas: number,
  qdeAtividadesAvaliadas: number,
  horasAtividadesNaoIniciadas: number,
  horasAtividadesEmAndamento: number,
  horasAtividadesConcluidas: number,
  horasAtividadesAvaliadas: number,
  horasTotaisAlocadas: number,
  mediaAvaliacoes: number,
  percentualHorasNaoIniciadas: number,
  percentualHorasEmAndamento: number,
  percentualHorasConcluidas: number,
  percentualHorasAvaliadas: number,
  percentualHorasTotaisAlocadas: number,
  percentualPlanoDecorrido: number
};

export type AreaRelatorio = {
  descricaoArea: string,
  nomePrograma: string,
  dadosArea: MetadadosUnidade,
  dadosUnidade: MetadadosUnidade,
  unidades: [
    {
      nome: string,
      sigla: string,
      mediaAvaliacoes: number
    }
  ],
  graficoAreaGeral: any,
  graficoAreaDetalhado: any,
  graficoUnidadeGeral: any,
  graficoUnidadeDetalhado: any
};

export type PlanoExtendido = {
  plano: PlanoTrabalho,
  descricaoPlano: string,
  statusPlano: string,
  extras: MetadadosPlano,
  horasDisponiveisPlano: number,                    // total das horas úteis líquidas do Plano que ainda falta ser executado pelo servidor
  horasAfastamentoTranscorrer: number,              // total de horas úteis dos afastamentos do servidor, ainda a transcorrerem
  horasUteisLiquidasPlano: number,                  // total de horas úteis do plano subtraídas as horas úteis dos afastamentos do servidor
  percentualDecorridoAfastamentos: number,          // razão entre as horas úteis dos afastamentos já ocorridos, em relação às horas úteis totais dos afastamentos
  percentualDecorridoPlano: number,                 // razão entre as horas úteis decorridas e as horas úteis totais do Plano
  percentualHorasDisponiveis: number,               // razão entre as horas líquidas ainda disponíveis do plano e as horas líquidas totais do Plano
  percentualHorasAfastamentoTranscorrer: number,    // razão entre as horas de afastamento a transcorrer e as horas úteis totais de afastamento do servidor
  percentualHorasNaoIniciadas: number,              // razão entre as horas pactuadas das atividades não-iniciadas, em relação às horas úteis totais do Plano
  percentualHorasUteisLiquidasPlano: number,        // razão entre as horas pactuadas das atividades não-iniciadas, em relação às horas úteis totais do Plano
  percentualHorasEmAndamento: number,               // razão entre as horas pactuadas das atividades iniciadas mas ainda não concluidas, em relação às horas úteis totais do Plano
  percentualHorasConcluidas: number,                // razão entre as horas pactuadas das atividades concluidas, em relação às horas úteis totais do Plano
  percentualHorasAvaliadas: number,                 // razão entre as horas pactuadas das atividades avaliadas, em relação às horas úteis totais do Plano
  percentualHorasTotaisAlocadas: number,            // razão entre as horas totais alocadas e as horas úteis totais do Plano
  percentualAfastamento: number,                    // razão entre as horas de afastamento do servidor e as horas úteis totais do Plano
  dadosGraficoPlano: any,
  dadosGraficoAtividades: any,
  dadosGraficoPeriodoComparativo: any,
  dadosGraficoPeriodoPizza: any,
  dadosGraficoPeriodoDetalhado: any
}

@Injectable()
export abstract class PageReportBase<M extends Base, D extends DaoBaseService<M>> extends PageBase implements OnInit {

  public buttons: ToolbarButton[] = [{
    label: "Gerar PDF",
    icon: "bi bi-clipboard-data",
    //onClick: this.onReport.bind(this) Conhecer o método writeToFile (util.service)
  }];
  public error: string = "";
  public mensagemCarregando = "Carregando dados do formulário...";
  public dao?: D;
  public calendar: CalendarService;
  public rows?: any[] = [];
  public join: string[] = [];
  //public pluginsGrafico?: Array<any>;

  constructor(public injector: Injector, dType: Type<D>) {
    super(injector);
    this.dao = injector.get<D>(dType);
    this.calendar = injector.get<CalendarService>(CalendarService);
    //Chart.plugins.register(ChartDataLabels);
  }

  ngAfterViewInit() {
    (async () => {
      this.loading = true;
      try {
        this.rows = await this.report(this.queryParams);
      } catch (erro) {
        this.error = "Erro ao carregar relatório: " + erro;
      } finally {
        this.loading = false;
        this.cdRef.detectChanges();
      }
    })();
  }

  public onCancel() {
    this.close();
  }

  public abstract report(filter: any): Promise<any[] | undefined>;

}
