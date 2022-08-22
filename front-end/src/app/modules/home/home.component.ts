import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioDaoService, UsuarioDashboard } from 'src/app/dao/usuario-dao.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { LookupItem } from 'src/app/services/lookup.service';
import { UnidadeDaoService, UnidadeDashboard } from 'src/app/dao/unidade-dao.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormGroup } from '@angular/forms';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { Programa } from 'src/app/models/programa.model';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public activeTab: string = "PGD";
  public unidades: string[] | undefined;
  public programaSelecionado: Programa | null = null;
  public teste: string = 'position: relative; width:400px; heigth:300px';
  public totalPlanosAtivos: number = 0;
  public totalServidores: number = 0;
  public totalUnidades: number | undefined = 0;

  // variáveis associadas ao filtro
  @ViewChild('programa', { static: false }) public programa?: InputSearchComponent;
  public filter?: FormGroup;
  public filterWhere?: (filter: FormGroup) => any[];
  public fh: FormHelperService;

  // Variáveis associadas aos objetos gráficos
  public opcoesGraficoNrPlanos: ChartOptions = {};
  public opcoesGraficoServidores: ChartOptions = {};
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
        labels: ['Minhas Demandas'],
        display: false,
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

  constructor(
    public auth: AuthService,
    public usuarioDao: UsuarioDaoService,
    public unidadeDao: UnidadeDaoService,
    public programaDao: ProgramaDaoService,
    public atividadeDao: AtividadeDaoService,
    public injector: Injector,
    public lex: LexicalService,
    public go: NavigateService,
    public gb: GlobalsService,
    public allPages: ListenerAllPagesService
  ) {
    this.fh = this.injector.get<FormHelperService>(FormHelperService);
    this.filter = this.fh.FormBuilder({
      programa_id: {default: ""}
    });
  }

  ngOnInit(): void {
    Chart.plugins.register(ChartDataLabels);
    this.unidades = this.auth.unidades?.map(x => x.id);
    if(this.gb.isExtension) {
      this.allPages.visibilidadeMenuSei(!this.auth.usuario!.config.ocultar_menu_sei);
    }
  }

  ngAfterViewInit() {
    Promise.all([
      this.usuarioDao.dashboard(this.auth.usuario!.id),
      this.programaDao.query({where: [
        ["normativa", "!=", null],
        ["unidade_id", "==",this.auth.unidade!.id],
        ["data_fim", "==", null],
        //["data_fim_vigencia", ">=", Date.now()]
      ]}).asPromise()
    ]).then(results => {
      const dadosUsuario = results[0];
      const programas = results[1] as Programa[];
      if (dadosUsuario) this.dashUsuario = dadosUsuario;
      this.programaSelecionado = programas.sort((a, b) => b.data_inicio_vigencia.getMilliseconds() - a.data_inicio_vigencia.getMilliseconds())[0];
      this.programa?.loadSearch(this.programaSelecionado);
      this.idExclamacao();
      this.construirGraficoMinhasDemandas();
    });
  }

  public async onChange(event: Event) {
    Promise.all([
      this.programaDao.getById(this.filter!.controls.programa_id.value),
      this.unidadeDao.dashboards(this.unidades!, this.filter!.controls.programa_id.value)
    ]).then(results => {
      this.programaSelecionado = results[0];
      this.construirGraficosAreas(results[1]);
    });
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

  public construirGraficosAreas(dashUnidades: UnidadeDashboard[] | null){
    let _labelsY: string[] = [];
    let _dadosGraficoNrPlanos: number[] = [];
    //let _dadosGraficoHorasPlanos: number[] = [];
    let _dadosGraficoServidores: number[] = [];
    this.totalPlanosAtivos = 0;
    this.totalServidores = 0;
    if (dashUnidades != null) {
      dashUnidades.forEach(element => {
        _labelsY.push(element.sigla);
        _dadosGraficoNrPlanos.push(element.qdePTAtivos);
        //_dadosGraficoHorasPlanos.push(element.horasUteisTotaisPTAtivos);
        _dadosGraficoServidores.push(element.qdeServidores);
        this.totalPlanosAtivos += element.qdePTAtivos;
        this.totalServidores += element.qdeServidores;
      });
    }
    this.totalUnidades = dashUnidades?.length;
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
/*           clamp: true,
          clip: true */
        }
      }
    ];
    this.opcoesGraficoNrPlanos = {
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
          //offset: false,
          display: false,
          gridLines: {
            //borderDashOffset: 0.5,
            //borderDash: [5, 15]
            //offsetGridLines: false
          },
          stacked: false,
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
            labels: _labelsY,
            display: true,
            offset: true,             // se true, dimensiona o eixo para caber dentro da área do gráfico
            type: 'category',
            //stacked: false,
            //id: '',
            //position: '',
            gridLines: {
              display: true,
              offsetGridLines: false, // se false, centraliza a linha de grade na barra do gráfico
              lineWidth: 1,           // largura das linhas de grade
              drawTicks: true         // se true, adiciona um espaçamento entre os labels e o eixo
            },
            scaleLabel: {
              //lineHeight: "3em",
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
      responsive: true,
      maintainAspectRatio: false,
      //aspectRatio: 0.5
    };
    this.dadosGraficoServidores = [
      {
        label: 'Nr. de Servidores',
        data: _dadosGraficoServidores,
        backgroundColor: '#FF5722',
        borderColor: '#DD2C00',
        hoverBackgroundColor: '#DD2C00',
        hoverBorderColor: '#FF5722',
        borderWidth: 2,
        //barPercentage: 1,
        //categoryPercentage: 1,
        //barThickness: 30,
        datalabels: {
          display: 'auto',
          align: 'start',
          anchor: 'end',
          color: 'black',
          font: {
            weight: 'bold'
          }
        }
      }
    ];
    this.opcoesGraficoServidores = {
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
              //borderDashOffset: 0.5,
              //borderDash: [5, 15]
              //offsetGridLines: false
            },
            stacked: false,
            ticks: {
              beginAtZero: true
            }
        }],
        yAxes: [{
            labels: _labelsY,
            display: true,
            offset: true,             // se true, dimensiona o eixo para caber dentro da área do gráfico
            type: 'category',
            //stacked: false,
            //id: '',
            //position: '',
            gridLines: {
              display: true,
              offsetGridLines: false, // se false, centraliza a linha de grade na barra do gráfico
              lineWidth: 1,           // largura das linhas de grade
              drawTicks: true         // se true, adiciona um espaçamento entre os labels e o eixo
            },
            scaleLabel: {
            },
            ticks: {
              fontColor: 'black',
              fontStyle: 'bold',
              beginAtZero: true,
            }

        }]
      },
      responsive: true,
      maintainAspectRatio: false,
      //aspectRatio: 0.5
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

