import { OnInit, Injector, Injectable, Type } from '@angular/core';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { Base } from 'src/app/models/base.model';
import { Demanda } from 'src/app/models/demanda.model';
import { PageBase } from './page-base';
import { ChartData, ChartDataSets } from 'chart.js';
import { Plano } from 'src/app/models/plano.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export type Metadado = {
  descricaoPlano: string,
  concluido: Boolean,                   // define se o Plano é concluído, ou seja, se todas as suas demandas foram cumpridas.
  demandasNaoIniciadas: Demanda[],      // todas as demandas ainda não iniciadas pelo servidor
  demandasEmAndamento: Demanda[],       // totas as demandas já iniciadas (data_inicio diferente de nulo), mas ainda não concluídas (data_entrega nula)
  demandasConcluidas: Demanda[],        // todas as demandas que possuem uma data de entrega não nula
  demandasAvaliadas: Demanda[],         // todas as demandas cujo campo avaliacao_id não é nulo
  demandasCumpridas: Demanda[],         // todas as demandas que possuem um tempo homologado não nulo
  horasDemandasNaoIniciadas: number,    // soma do tempo pactuado de todas as demandas ainda não iniciadas
  horasDemandasEmAndamento: number,     // soma do tempo pactuado de todas as demandas já iniciadas, mas ainda não concluidas
  horasDemandasConcluidas: number,      // soma do tempo pactuado de todas as demandas concluídas
  horasDemandasAvaliadas: number,       // soma do tempo pactuado de todas as demandas avaliadas
  horasDemandasCumpridas: number,       // soma do tempo pactuado de todas as demandas cumpridas
  horasDecorridas: number,              // total de horas que se passaram desde a data/hora de início de vigência do plano até a data/hora atual
  percentualDecorridoPlano: number,     // razão entre as horas úteis decorridas e as horas úteis totais do Plano
  horasUteisTotais: number,             // Horas úteis de trabalho no período de vigência do Plano, considerando carga_horaria, feriados, fins de semana
  horasTotais: number,                  // total de horas compreendidas entre a data final de vigência do plano e a data inicial de vigência do plano
  percentualEsperado: number,           // razão entre as horas já decorridas do plano e as suas horas totais (cálculo simples)
  percentualCumprido: number,           // razão entre as horas das demandas já cumpridas e o tempoTotal do plano
  percentualHorasNaoIniciadas: number,  // razão entre as horas pactuadas das demandas não-iniciadas, em relação às horas úteis totais do Plano
  percentualHorasEmAndamento: number,   // razão entre as horas pactuadas das demandas iniciadas mas ainda não concluidas, em relação às horas úteis totais do Plano
  percentualHorasConcluidas: number,    // razão entre as horas pactuadas das demandas concluidas, em relação às horas úteis totais do Plano
  percentualHorasAvaliadas: number,     // razão entre as horas pactuadas das demandas avaliadas, em relação às horas úteis totais do Plano
  percentualHorasTotaisAlocadas: number,// razão entre as horas totais alocadas e as horas úteis totais do Plano
  mediaAvaliacoes: number,              // média aritmética das notas de todas as demandas avaliadas
  produtividadeMedia: number,           // só existe quando o plano já foi concluído. Representa a média de produtividade de todas as demandas do plano+
  eficiencia: number                    // divisão do percentual cumprido do plano pelo seu percentual estimado
};

export type MetadadosPlano = {
  concluido: Boolean,                   // define se o Plano é concluído, ou seja, se todas as suas demandas foram cumpridas.
  demandasNaoIniciadas: Demanda[],      // todas as demandas ainda não iniciadas pelo servidor
  demandasEmAndamento: Demanda[],       // totas as demandas já iniciadas (data_inicio diferente de nulo), mas ainda não concluídas (data_entrega nula)
  demandasConcluidas: Demanda[],        // todas as demandas que possuem uma data de entrega não nula
  demandasAvaliadas: Demanda[],         // todas as demandas cujo campo avaliacao_id não é nulo
  horasDemandasNaoIniciadas: number,    // soma do tempo pactuado de todas as demandas ainda não iniciadas
  horasDemandasEmAndamento: number,     // soma do tempo pactuado de todas as demandas já iniciadas, mas ainda não concluidas
  horasDemandasConcluidas: number,      // soma do tempo pactuado de todas as demandas concluídas
  horasDemandasAvaliadas: number,       // soma do tempo pactuado de todas as demandas avaliadas
  horasUteisTotais: number,             // Horas úteis de trabalho no período de vigência do Plano, considerando carga_horaria, feriados, fins de semana
};

export type MetadadosUnidade = {
  qdePlanos: number,
  horasUteisTotais: number,
  horasUteisTotaisDecorridas: number,
  qdeDemandasAvaliadas: number,
  horasDemandasNaoIniciadas: number,
  horasDemandasEmAndamento: number,
  horasDemandasConcluidas: number,
  horasDemandasAvaliadas: number,
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
  plano: Plano,
  extras: Metadado,
  horasTotaisAlocadas: number,          // soma dos tempos pactuados de todas as demandas, independente do status
  horasUteisDecorridas: number,         // total de horas decorridas, levando-se em consideração carga horária, feriados e finais de semana
  dadosGraficoPlano: any,
  dadosGraficoHoras: any
}

export type PlanoExtendido2 = {
  plano: Plano,
  descricaoPlano: string,
  statusPlano: string,
  extras: MetadadosPlano,
  horasTotaisAlocadas: number,          // soma dos tempos pactuados de todas as demandas, independente do status
  horasUteisDecorridas: number,         // total de horas decorridas, levando-se em consideração carga horária, feriados e finais de semana
  percentualDecorridoPlano: number,     // razão entre as horas úteis decorridas e as horas úteis totais do Plano
  percentualHorasNaoIniciadas: number,  // razão entre as horas pactuadas das demandas não-iniciadas, em relação às horas úteis totais do Plano
  percentualHorasEmAndamento: number,   // razão entre as horas pactuadas das demandas iniciadas mas ainda não concluidas, em relação às horas úteis totais do Plano
  percentualHorasConcluidas: number,    // razão entre as horas pactuadas das demandas concluidas, em relação às horas úteis totais do Plano
  percentualHorasAvaliadas: number,     // razão entre as horas pactuadas das demandas avaliadas, em relação às horas úteis totais do Plano
  percentualHorasTotaisAlocadas: number,// razão entre as horas totais alocadas e as horas úteis totais do Plano
  mediaAvaliacoes: number,              // média aritmética das notas de todas as demandas avaliadas
  dadosGraficoPlano: any,
  dadosGraficoDemandas: any
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

  constructor(public injector: Injector, dType: Type<D>) {
    super(injector);
    this.dao = injector.get<D>(dType);
    this.calendar = injector.get<CalendarService>(CalendarService);
    Chart.plugins.register(ChartDataLabels);
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
    this.go.back(undefined, this.backRoute);
  }

  public abstract report(filter: any): Promise<any[] | undefined>;

  //public abstract obterDadosGrafico(metadados: Metadado | MetadadosPlano | MetadadosUnidade, tipo: 'GERAL' | 'DETALHADO'): ChartDataSets[];

}
