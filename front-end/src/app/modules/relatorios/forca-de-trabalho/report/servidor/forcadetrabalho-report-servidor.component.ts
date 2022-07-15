import { Component, Injector } from '@angular/core';
import { MetadadosPlano, PageReportBase, PlanoExtendido2 } from 'src/app/modules/base/page-report-base';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Plano } from 'src/app/models/plano.model';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-forcadetrabalho-report-servidor',
  templateUrl: './forcadetrabalho-report-servidor.component.html',
  styleUrls: ['./forcadetrabalho-report-servidor.component.scss']
})

export class ForcaDeTrabalhoReportServidorComponent extends PageReportBase<Usuario, UsuarioDaoService> {
  public planoDao: PlanoDaoService;
  public parametros?: any;
  public usuario?: Usuario | null;
  public plano?: Plano | null;
  public row?: any;
  public planoRelatorio?: PlanoExtendido2;

  public descricaoPlano: string = '';
  public statusPlano: string = '';
  public horaAtual: Date = new Date();

  public tipoGrafico: ChartType = 'bar';
  public labelsX: Array<string> = [];
  public opcoesGraficoPlano: ChartOptions = {
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      legend: {
        display: true,
      },
/*       datalabels: {
        anchor: 'end',
        align: 'end'
      } */
    },
    events: ['click'],
    responsive: true
  };
  public opcoesGraficoHoras: ChartOptions = {
    scales: {
      xAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
      }],
      yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
      }]
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    },
    responsive: true
  };
  public opcoesGraficoAvaliacao: ChartOptions = {
    scales: {
      xAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
      }],
      yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
      }]
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true
  };

  constructor(public injector: Injector) {
    super(injector, UsuarioDaoService);
    this.planoDao = injector.get<PlanoDaoService>(PlanoDaoService);
  }

  public async report(filter: any) {
    this.parametros = Object.assign({}, this.queryParams);
    let result = await Promise.all([
      this.dao?.getById(this.parametros.usuario_id),
      this.planoDao?.getById(this.parametros.plano_id, ["demandas", "demandas.avaliacao", "unidade", "tipoModalidade"])
    ]);
    this.usuario = result[0];
    this.plano = result[1];
    await this.prepararParaRelatorio(this.plano!);
    return [this.planoRelatorio];
  }

  public async prepararParaRelatorio(plano: Plano){
      let $metadados: MetadadosPlano = await this.planoDao.metadadosPlano(plano!.id);
      if (!Array.isArray($metadados.demandasNaoIniciadas)) $metadados.demandasNaoIniciadas = [$metadados.demandasNaoIniciadas];
      if (!Array.isArray($metadados.demandasEmAndamento)) $metadados.demandasEmAndamento = [$metadados.demandasEmAndamento];

      // trecho que usa a função calculaDataTempo para obter as horasUteisDecorridas do Plano
      await this.calendar.loadFeriadosCadastrados(plano.unidade_id);
      let $marco_inicial = this.horaAtual < plano.data_inicio_vigencia ? null : plano.data_inicio_vigencia;
      let $marco_final = this.horaAtual > plano.data_fim_vigencia ? plano.data_fim_vigencia : this.horaAtual;
      let $horasUteisDecorridas = null;
      if ($marco_inicial == null) {
        $horasUteisDecorridas = -1;
      } else if ($marco_final == plano.data_fim_vigencia) {
        $horasUteisDecorridas = -2;
      } else {
        $horasUteisDecorridas = this.calendar.calculaDataTempo($marco_inicial!, $marco_final, plano.carga_horaria, plano.unidade!, "ENTREGA", [], []).tempoUtil
      }
      let $horasTotaisAlocadas = $metadados.horasDemandasNaoIniciadas + $metadados.horasDemandasEmAndamento + $metadados.horasDemandasConcluidas + $metadados.horasDemandasAvaliadas;
      //$metadados.percentualDecorridoPlano = $metadados.horasUteisTotais ? Math.round($metadados.horasUteisDecorridas / $metadados.horasUteisTotais * 10000)/100 : 0;
      //$metadados.percentualHorasTotaisAlocadas = $metadados.horasUteisTotais ? Math.round($metadados.horasTotaisAlocadas / $metadados.horasUteisTotais * 10000)/100 : 0;
/*       $metadados.percentualHorasNaoIniciadas = $metadados.horasUteisTotais ? Math.round($metadados.horasDemandasNaoIniciadas / $metadados.horasUteisTotais * 10000)/100 : 0;
      $metadados.percentualHorasEmAndamento = $metadados.horasUteisTotais ? Math.round($metadados.horasDemandasEmAndamento / $metadados.horasUteisTotais * 10000)/100 : 0;
      $metadados.percentualHorasConcluidas = $metadados.horasUteisTotais ? Math.round($metadados.horasDemandasConcluidas / $metadados.horasUteisTotais * 10000)/100 : 0;
      $metadados.percentualHorasAvaliadas = $metadados.horasUteisTotais ? Math.round($metadados.horasDemandasAvaliadas / $metadados.horasUteisTotais * 10000)/100 : 0;
      $metadados.mediaAvaliacoes = this.util.avg($metadados.demandasAvaliadas.map(d => d.avaliacao!.nota_atribuida)); */
      this.planoRelatorio = {
          'plano': plano!,
          'extras': $metadados,
          'descricaoPlano': (plano!.tipo_modalidade!.nome || "") + " - " + this.dao!.getDateFormatted(plano!.data_inicio_vigencia) + " a " + this.dao!.getDateFormatted(plano!.data_fim_vigencia) + " (" + plano!.unidade!.sigla + ")",
          'statusPlano': $metadados.concluido ? (plano.demandas.length ? 'CONCLUÍDO - estatísticas CONCLUSIVAS' : 'VAZIO - nenhuma demanda foi cadastrada neste Plano') : 'EM ANDAMENTO - estatísticas sujeitas a alterações',
          'horasUteisDecorridas': $horasUteisDecorridas,
          'percentualDecorridoPlano': $metadados.horasUteisTotais ? Math.round($horasUteisDecorridas / $metadados.horasUteisTotais * 10000)/100 : 0,
          'horasTotaisAlocadas': $horasTotaisAlocadas,
          'percentualHorasTotaisAlocadas': $metadados.horasUteisTotais ? Math.round($horasTotaisAlocadas / $metadados.horasUteisTotais * 10000)/100 : 0,
          'percentualHorasNaoIniciadas': $metadados.horasUteisTotais ? Math.round($metadados.horasDemandasNaoIniciadas / $metadados.horasUteisTotais * 10000)/100 : 0,
          'percentualHorasEmAndamento': $metadados.horasUteisTotais ? Math.round($metadados.horasDemandasEmAndamento / $metadados.horasUteisTotais * 10000)/100 : 0,
          'percentualHorasConcluidas': $metadados.horasUteisTotais ? Math.round($metadados.horasDemandasConcluidas / $metadados.horasUteisTotais * 10000)/100 : 0,
          'percentualHorasAvaliadas': $metadados.horasUteisTotais ? Math.round($metadados.horasDemandasAvaliadas / $metadados.horasUteisTotais * 10000)/100 : 0,
          'mediaAvaliacoes': this.util.avg($metadados.demandasAvaliadas.map(d => d.avaliacao!.nota_atribuida)),
          'dadosGraficoPlano': this.obterDadosGrafico($metadados, 'GERAL'),
          'dadosGraficoHoras': this.obterDadosGrafico($metadados, 'DETALHADO')
      };
  }

  public obterDadosGrafico(metadados: MetadadosPlano, tipo: 'GERAL' | 'DETALHADO') {
      let result: any = null;
      let dadosGeral: ChartDataSets[] = [
        {
          label: 'Horas Totais',
          data: [metadados.horasUteisTotais],
          backgroundColor: '#6c757d'
        },
        {
          label: 'Horas Alocadas',
          data: [metadados.horasDemandasNaoIniciadas + metadados.horasDemandasEmAndamento + metadados.horasDemandasConcluidas + metadados.horasDemandasAvaliadas],
          backgroundColor: '#FF7043'
        }
      ];
      let dadosDetalhado: ChartDataSets[] = [
        {
          label: 'Demandas Não-iniciadas',
          data: [metadados.horasDemandasNaoIniciadas],
          backgroundColor: '#0dcaf0'
        },
        {
          label: 'Demandas Iniciadas',
          data: [metadados.horasDemandasEmAndamento],
          backgroundColor: '#ffc107'
        },
        {
          label: 'Demandas Concluídas',
          data: [metadados.horasDemandasConcluidas],
          backgroundColor: '#af4201'
        },
        {
          label: 'Demandas Avaliadas',
          data: [metadados.horasDemandasAvaliadas],
          backgroundColor: '#af4af0'
        },
        {
          label: 'Disponível no Plano',
          data: [metadados.horasUteisTotais - metadados.horasDemandasNaoIniciadas - metadados.horasDemandasEmAndamento - metadados.horasDemandasConcluidas - metadados.horasDemandasAvaliadas],
          backgroundColor: '#6c757d'
        }
      ];
      let dadosAvaliacao: ChartDataSets[] = [
        {
          label: '',
          data: [10],
          backgroundColor: '#F5F5F5'
        },
        {
          label: '',
          data: [metadados.horasUteisTotais],
          backgroundColor: '#6c757d' // #EF5350 (vermelha) ou #283593 (azul)
        }
      ];
      switch (tipo) {
        case 'GERAL':
          result = dadosGeral;
          this.tipoGrafico = 'bar';
          break;

        case 'DETALHADO':
          result = dadosDetalhado;
          this.tipoGrafico = 'bar';
          break;
/*         case 'AVALIACAO':
          result = dadosAvaliacao;
          this.tipoGrafico = 'horizontalBar';
          break; */
      }
    return result;
  }
}
