import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioDaoService, UsuarioDashboard } from 'src/app/dao/usuario-dao.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { LookupItem } from 'src/app/services/lookup.service';
import { UnidadeDaoService, UnidadeDashboard } from 'src/app/dao/unidade-dao.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public activeTab: string = "PGD";
  public demandaFilter: any[];
  public unidades: string[] = ['1230c458-9018-4d12-8929-0ea92f2506dd', '1230c458-9018-4d12-8929-0ea92f2506dd'];
  public programa_id: string = '8eaaffa0-ba88-445e-85f1-0700ae2518bd';

  public dashUsuario: UsuarioDashboard = {
    total_demandas: 0,
    media_avaliacoes: 0,
    produtividade: 0,
    demandas_totais_nao_iniciadas: 0,
    demandas_totais_concluidas: 0,
    demandas_totais_nao_concluidas: 0,
    demandas_totais_atrasadas: 0,
    demandas_totais_avaliadas: 0,
    tarefas_totais_nao_concluidas: 0,
  };
  public dashUnidades: UnidadeDashboard[] = [];

  // Variáveis associados aos objetos gráficos
  public dadosMinhasDemandas: ChartDataSets[] = [];
  public dadosGraficoNrPlanos: ChartDataSets[] = [];
  public dadosGraficoHorasPlanos: ChartDataSets[] = [];
  public dadosGraficoServidores: ChartDataSets[] = [];
  public opcoesMinhasDemandas: ChartOptions = {
    legend: {
      display: true,
      position: 'top',
      align: 'start'
    },
    scales: {
      xAxes: [{
        display: false,
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
    responsive: true,
    plugins: {
      datalabels: {
        display: 'auto',
        align: 'start',
        anchor: 'end',
        color: 'white',
        font: {
          weight: 'bold'
        },
        clamp: true,
        clip: false
      }
    }
  };
  public opcoesGraficoAreas: ChartOptions = {};
  public opcoesGraficoServidores: ChartOptions = {};

  constructor(
    public auth: AuthService,
    public usuarioDao: UsuarioDaoService,
    public unidadeDao: UnidadeDaoService,
    public atividadeDao: AtividadeDaoService,
    public lex: LexicalService,
    public go: NavigateService,
    public gb: GlobalsService,
    public allPages: ListenerAllPagesService
  ) {
    this.demandaFilter = [
      ["unidade_id", "==", this.auth.unidade?.id],
      ["unidades_subordinadas", "==", true]
    ];
  }

  ngOnInit(): void {
    Chart.plugins.register(ChartDataLabels);
    Chart.defaults.bar = {
      categoryPercentage: 0.5
    }
    Promise.all([
      this.usuarioDao.dashboard(this.auth.usuario!.id),
      this.unidadeDao.dashboards(this.unidades, this.programa_id)
    ]).then(results => {
      const data = results[0];
      const dashboards = results[1];
      if (data) this.dashUsuario = data;
      this.idExclamacao();
      if(dashboards) this.dashUnidades = dashboards;
      this.construirGraficoMinhasDemandas();
      this.construirGraficosAreas(this.dashUnidades);
    });
    if(this.gb.isExtension) {
      this.allPages.visibilidadeMenuSei(!this.auth.usuario!.config.ocultar_menu_sei);
    }
  }

  public construirGraficoMinhasDemandas() {
    this.dadosMinhasDemandas = [
      {
        label: 'Demandas Não-iniciadas',
        data: [this.dashUsuario.demandas_totais_nao_iniciadas],
        backgroundColor: '#0dcaf0',
        stack: 'Demandas'
      },
      {
        label: 'Demandas Iniciadas',
        data: [this.dashUsuario.demandas_totais_nao_concluidas],
        backgroundColor: '#ffc107',
        stack: 'Demandas'
      },
      {
        label: 'Demandas Concluídas',
        data: [this.dashUsuario.demandas_totais_concluidas],
        backgroundColor: '#af4201',
        stack: 'Demandas'
      },
      {
        label: 'Demandas Avaliadas',
        data: [this.dashUsuario.demandas_totais_avaliadas],
        backgroundColor: '#af4af0',
        stack: 'Demandas'
      }
    ];
  }

  public construirGraficosAreas(dashUnidades: UnidadeDashboard[]){
    let _labelsY: string[] = [];
    let _dadosGraficoNrPlanos: number[] = [];
    let _dadosGraficoHorasPlanos: number[] = [];
    let _dadosGraficoServidores: number[] = [];
    dashUnidades.forEach(element => {
      _labelsY.push(element.sigla);
      _dadosGraficoNrPlanos.push(element.qdePTAtivos);
      _dadosGraficoHorasPlanos.push(element.horasUteisTotaisPTAtivos);
      _dadosGraficoServidores.push(element.qdeServidores);
    });
    this.dadosGraficoNrPlanos = [
      {
        label: 'Nr. de PT ativos',
        data: _dadosGraficoNrPlanos,
        backgroundColor: '#0000CD',
        borderColor: '#212121',
        hoverBackgroundColor: '#212121',
        hoverBorderColor: '#0000CD',
        borderWidth: 2,
        //barPercentage: 1,
        //categoryPercentage: 1,
        //barThickness: 30,
        datalabels: {
          display: 'auto',
          align: 'start',
          anchor: 'end',
          color: 'white',
          font: {
            weight: 'bold'
          },
          clamp: true,
          clip: false
        }
      }
    ];
    this.dadosGraficoServidores = [
      {
        label: 'Nr. de Servidores',
        data: _dadosGraficoServidores,
/*         backgroundColor: '#0000CD',
        borderColor: '#212121',
        hoverBackgroundColor: '#212121',
        hoverBorderColor: '#0000CD',
        borderWidth: 2 */
      }
    ];
    this.opcoesGraficoAreas = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontColor: 'black',
          fontStyle: 'bold'
        }
      },
      scales: {
        xAxes: [{
          display: false,
          gridLines: {
            //offsetGridLines: true
          },
          //stacked: false,
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
            labels: _labelsY,
            //stacked: false,
            display: true,
            //id: '',
            type: 'category',
            //position: '',
            gridLines: {
              display: true,
              lineWidth: 1,

            },
            scaleLabel: {
              //fontColor: 'black',
              //fontStyle: 'bold'
              //display: true,
              //labelString: 'EIXO Y'
            },
            ticks: {
              fontColor: 'black',
              fontStyle: 'bold'
              //beginAtZero: true,
              //min: ''
            }
        }],
        ticks: {
        }
      },
      responsive: true
    };
    this.opcoesGraficoServidores = {
      legend: {
        display: true,
        position: 'top'
      },
      scales: {
        xAxes: [{
            display: false,
            stacked: false,
            ticks: {
              beginAtZero: true
            }
        }],
        yAxes: [{
            labels: _labelsY,
            display: true,
            type: 'category',
            gridLines: {
              display: true,
            },
            scaleLabel: {
            },
            ticks: {
              beginAtZero: true,
            }

        }]
      },
      responsive: true
    };
  }

  public mensagemSaudacao() {
    const hora = parseInt(this.auth.unidadeHora.replace(":", ""));
    const apelido = this.auth.usuario?.apelido;
    const mail = this.auth.usuario?.email;
    return hora < 1200 ? "Bom dia, " + apelido : hora < 1800 ? "Boa tarde, " + apelido : "Boa noite, " + apelido;
  }

  public emailUsuario() {
    const mail = this.auth.usuario?.email;
    return mail;
  }

  public tokenGAPI() {
    const sei = this.auth.googleApi.tokenId || "";
  }

  public execucaoPlanos(){
      this.dashUsuario.produtividade;
  }

  public produtividadeMedia(){
  }

  public idExclamacao(){
    return this.dashUsuario.produtividade == 0 ? "icon-demandas-natraso" : "icon-demandas-atraso";
  }

  public totalAtividades(){
    return 0;
  }

  public onSelectTab(tab: LookupItem) {
    this.activeTab = tab.key;
  }


}

