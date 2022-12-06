import { Component, Injector } from '@angular/core';
import { Metadado, PageReportBase, PlanoExtendido } from 'src/app/modules/base/page-report-base';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Plano } from 'src/app/models/plano.model';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-produtividade-report',
  templateUrl: './produtividade-report.component.html',
  styleUrls: ['./produtividade-report.component.scss']
})

export class ProdutividadeReportComponent extends PageReportBase<Usuario, UsuarioDaoService> {
  public planoService: PlanoDaoService;
  public parametros?: any;
  public usuario?: Usuario | null;
  public unidade?: Unidade | null;
  public planos?: Plano[] | null;               // incluir as demandas iniciadas e não avaliadas
  public rows?: any[] = [];                     // alterar os textos explicativos sobre as demandas inclusas, no caso de relatório por periodo
  public unidadeDao?: UnidadeDaoService;        // incluir gráficos
  public planosRelatorio: PlanoExtendido[] = [];// calcular as horas das demandas concluidas, avaliadas, etc, considerando
                                                // o período do relatório
  public descricaoPeriodo: String = '';
  public descricaoPlano: String = '';
  public planosAnalisados?: Plano[] | null;
  public horaAtual: Date = new Date();

  public tipoGrafico: ChartType = 'horizontalBar';
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
  public opcoesGraficoRow: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
/*       datalabels: {
        anchor: 'end',
        align: 'end'
      } */
    },
    responsive: true
  };

  constructor(public injector: Injector) {
    //super(injector, Usuario, UsuarioDaoService);
    super(injector, UsuarioDaoService)
    //this.dao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.planoService = injector.get<PlanoDaoService>(PlanoDaoService);
  }

  public async report(filter: any) {
    this.parametros = Object.assign({}, this.queryParams);
    let pp = this.parametros.tipo_relatorio == "POR_PLANO";
    let result = await Promise.all([
      this.unidadeDao?.getById(this.parametros.unidade_id),
      this.dao?.getById(this.parametros.usuario_id, ['demandas', 'planos', 'planos.demandas', 'planos.unidade', 'planos.tipo_modalidade']),
      this.dao?.planosPorPeriodo(this.parametros.usuario_id, pp ? null : this.util.getDateTimeFormatted(this.parametros.inicio_periodo), pp ? null : this.util.getDateTimeFormatted(this.parametros.fim_periodo))
    ]);
    this.unidade = result[0];
    this.usuario = result[1];
    this.planos = result[2];
    if (pp) {
      let $p = this.planos?.find(x => x.id == this.parametros.plano_id);
      this.planosAnalisados = [$p!];
      this.descricaoPlano = ($p!.tipo_modalidade?.nome || "") + " - " + this.dao!.getDateFormatted($p!.data_inicio_vigencia) + " a " + this.dao!.getDateFormatted($p!.data_fim_vigencia);
    } else {
      this.planosAnalisados = this.planos?.filter(p => p.unidade_id == this.parametros.unidade_id);
      this.descricaoPeriodo = "De " + this.dao!.getDateFormatted(this.parametros.inicio_periodo) + " a " + this.dao!.getDateFormatted(this.parametros.fim_periodo);
    }
    if (this.planosAnalisados?.length){
      for (let $p of this.planosAnalisados!) {await this.adicionarAoRelatorio($p, pp ? null : this.util.getDateTimeFormatted(this.parametros.inicio_periodo), pp ? null : this.util.getDateTimeFormatted(this.parametros.fim_periodo));}
    }
    return this.planosRelatorio;
  }

  public async adicionarAoRelatorio(planoAnalisado: Plano, inicioPeriodo: string | null, fimPeriodo: string | null){
      let $metadados: Metadado = await this.planoService.metadados(planoAnalisado!, inicioPeriodo, fimPeriodo);
      if (!Array.isArray($metadados.demandasNaoIniciadas)) $metadados.demandasNaoIniciadas = [$metadados.demandasNaoIniciadas];
      if (!Array.isArray($metadados.demandasEmAndamento)) $metadados.demandasEmAndamento = [$metadados.demandasEmAndamento];
      $metadados.descricaoPlano = (planoAnalisado!.tipo_modalidade?.nome || "") + " - " + this.dao!.getDateFormatted(planoAnalisado!.data_inicio_vigencia)+ " a " + this.dao!.getDateFormatted(planoAnalisado!.data_fim_vigencia);
      $metadados.percentualEsperado = $metadados.horasTotais ? Math.round($metadados.horasDecorridas / $metadados.horasTotais * 10000)/100 : 0;
      if ($metadados.percentualEsperado > 100) $metadados.percentualEsperado = 100;
      $metadados.percentualCumprido = $metadados.horasUteisTotais ? Math.round($metadados.horasDemandasCumpridas / $metadados.horasUteisTotais * 10000)/100 : 0;
      $metadados.eficiencia = $metadados.percentualEsperado ? Math.round($metadados.percentualCumprido / $metadados.percentualEsperado * 10000)/100 : 0;
      $metadados.produtividadeMedia = Math.round($metadados.produtividadeMedia * 100) / 100;
      this.planosRelatorio.push(
        {
          'plano': planoAnalisado!,
          'extras': $metadados,
          'horasTotaisAlocadas': 0,
          'horasUteisDecorridas': 0,
          'dadosGraficoPlano': this.obterDadosGrafico($metadados, 'GERAL'),
          'dadosGraficoHoras': this.obterDadosGrafico($metadados, 'DETALHADO')
        });
  }

  public obterDadosGrafico(metadados: Metadado, tipo: 'GERAL' | 'DETALHADO') {
      let dadosGeral: ChartDataSets[] = [
        {
          label: 'Não Iniciadas',
          data: [metadados.demandasNaoIniciadas.length],
          backgroundColor: '#d63384'
        },
        {
          label: 'Em Andamento',
          data: [metadados.demandasEmAndamento.length],
          backgroundColor: '#0d6efd'
        },
        {
          label: 'Concluidas',
          data: [metadados.demandasConcluidas.length],
          backgroundColor: '#198754'
        },
        {
          label: 'Já Avaliadas',
          data: [metadados.demandasAvaliadas.length],
          backgroundColor: '#fd7e14'
        }
      ];
      let tempoDespendido = metadados.horasDemandasConcluidas - metadados.horasDemandasCumpridas;
      let tempoPactuado = metadados.horasDemandasNaoIniciadas + metadados.horasDemandasEmAndamento;
      let tempoHomologado = metadados.horasDemandasCumpridas;
      let dadosDetalhado: ChartDataSets[] = [
        {
          label: 'Tempo Despendido',
          data: [tempoDespendido],
          backgroundColor: '#0dcaf0'
        },
        {
          label: 'Tempo Pactuado',
          data: [tempoPactuado],
          backgroundColor: '#ffc107'
        },
        {
          label: 'Tempo Homologado',
          data: [tempoHomologado],
          backgroundColor: '#af4201'
        },
        {
          label: 'Tempo Plano',
          data: [metadados.horasUteisTotais - tempoPactuado - tempoDespendido - tempoHomologado ],
          backgroundColor: '#6c757d'
        }
      ];
    return tipo == 'GERAL' ? dadosGeral : dadosDetalhado ;
  }
}
