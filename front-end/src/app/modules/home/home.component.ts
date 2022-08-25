import { ChangeDetectorRef, Component, HostBinding, Injector, OnInit, ViewChild } from '@angular/core';
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
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { UtilService } from 'src/app/services/util.service';
import { TipoAtividade } from './../../models/tipo-atividade.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @HostBinding('style.height.px') height: Number = 200;
  @HostBinding('style.height.px') height_m: Number = 400;
  public activeTab: string = "PGD";
  public unidades: string[] | undefined;
  public programaSelecionado: Programa | null = null;
  public totalPlanosAtivos: number = 0;
  public totalServidores: number = 0;
  public totalUnidades: number | undefined = 0;

  // variáveis associadas ao filtro
  @ViewChild('programa', { static: false }) public programa?: InputSearchComponent;
  @ViewChild('unidadesSubordinadas', { static: false }) public unidadesSubordinadas?: InputSwitchComponent;
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
  public dadosGraficoModalidades: ChartDataSets[] = [];
  public opcoesGraficoModalidades: ChartOptions = {};
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
  public dashUnidades: UnidadeDashboard[] | null = [];
  public labelsGraficoAreasServidores: string[] = [];
  public heightAreaGrafico: number = 300;

  constructor(
    public auth: AuthService,
    public utils: UtilService,
    public usuarioDao: UsuarioDaoService,
    public unidadeDao: UnidadeDaoService,
    public programaDao: ProgramaDaoService,
    public atividadeDao: AtividadeDaoService,
    public injector: Injector,
    public cdRef: ChangeDetectorRef,
    public lex: LexicalService,
    public go: NavigateService,
    public gb: GlobalsService,
    public allPages: ListenerAllPagesService
  ) {
    this.fh = this.injector.get<FormHelperService>(FormHelperService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.filter = this.fh.FormBuilder({
      programa_id: {default: ""},
      unidadesSubordinadas: {default: false}
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
      this.unidadeDao.dashboards(this.unidades!, this.filter!.controls.programa_id.value, this.filter!.controls.unidadesSubordinadas.value)
    ]).then(results => {
      this.programaSelecionado = results[0];
      this.dashUnidades = results[1];
      if (this.dashUnidades) {
        this.construirGraficoAreas(this.dashUnidades);
        this.construirGraficoServidores(this.dashUnidades);
        this.construirGraficoModalidades(this.dashUnidades);
      }
    });
  }

  public construirGraficoMinhasDemandas() {
    this.dadosMinhasDemandas = [
      {
        label: 'Demandas Não-iniciadas',
        data: [this.dashUsuario.demandas_totais_nao_iniciadas],
        backgroundColor: '#0dcaf0',
        stack: 'Demandas',
        barThickness: 30
      },
      {
        label: 'Demandas Iniciadas',
        data: [this.dashUsuario.demandas_totais_nao_concluidas],
        backgroundColor: '#ffc107',
        stack: 'Demandas',
        barThickness: 30
      },
      {
        label: 'Demandas Concluídas',
        data: [this.dashUsuario.demandas_totais_concluidas],
        backgroundColor: '#af4201',
        stack: 'Demandas',
        barThickness: 30
      },
      {
        label: 'Demandas Avaliadas',
        data: [this.dashUsuario.demandas_totais_avaliadas],
        backgroundColor: '#af4af0',
        stack: 'Demandas',
        barThickness: 30
      }
    ];
  }

  public construirGraficoAreas(dashUnidades: UnidadeDashboard[]){
    let _dadosGraficoNrPlanos: number[] = [];
    this.totalPlanosAtivos = 0;
    this.labelsGraficoAreasServidores = [];
    dashUnidades!.forEach(element => {
      this.labelsGraficoAreasServidores.push(element.sigla);
      _dadosGraficoNrPlanos.push(element.qdePTAtivos);
      //_dadosGraficoHorasPlanos.push(element.horasUteisTotaisPTAtivos);
      this.totalPlanosAtivos += element.qdePTAtivos;
      });
    this.totalUnidades = dashUnidades?.length;
    this.height = 40 * this.totalUnidades;
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
        barThickness: 'flex',
        maxBarThickness: 30,
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
            labels: this.labelsGraficoAreasServidores,
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
  }

  public construirGraficoServidores(dashUnidades: UnidadeDashboard[]){
    let _dadosGraficoServidores: number[] = [];
    this.totalServidores = 0;
    dashUnidades.forEach(element => {
      _dadosGraficoServidores.push(element.qdeServidores);
      this.totalServidores += element.qdeServidores;
      });
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
        barThickness: 'flex',
        maxBarThickness: 30,
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
            labels: this.labelsGraficoAreasServidores,
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

  public construirGraficoModalidades(dashUnidades: UnidadeDashboard[]) {
    let _labelsY: string[] = [];
    let _dadosGraficoModalidades: number[] = [];
    let modalidades: string[] = [];
    dashUnidades.map(x => x.modalidadesPlanos).forEach(element => {
      element.forEach(x => {modalidades.push(x)})
    });
    _labelsY = modalidades.filter(function(element, posicion){
      return modalidades.indexOf(element) == posicion;
    });
    //this.height_m = 40 * _labelsY.length;
    _labelsY.forEach(x => {
      _dadosGraficoModalidades.push(modalidades.filter(function(element){return element == x}).length);
    });
    this.dadosGraficoModalidades = [
      {
        label: 'Servidores por Modalidade',
        data: _dadosGraficoModalidades,
        backgroundColor: '#66BB6A',
        borderColor: '#00C853',
        hoverBackgroundColor: '#00C853',
        hoverBorderColor: '#66BB6A',
        borderWidth: 2,
        barThickness: 'flex',
        maxBarThickness: 30,
        datalabels: {
          display: 'auto',
          align: 'start',
          anchor: 'end',
          color: 'white',
          font: {
            weight: 'bold'
          }
        }
      }
    ];
    this.opcoesGraficoModalidades = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontColor: 'yelow',
          fontStyle: 'bold'
        }
      },
      scales: {
        xAxes: [{
          labels: _labelsY,
          offset: true,                 // se true, dimensiona o eixo X para caber dentro da área do gráfico
          type: 'category',
          display: true,
          stacked: false,
          //id: '',
          //position: '',
          gridLines: {                  // esse grupo de configurações altera o comportamento das linhas de grade perpendiculares ao eixo X
            display: true,
            offsetGridLines: false,     // se false, centraliza a linha de grade na barra do gráfico
            lineWidth: 1,               // largura das linhas de grade
            tickMarkLength: 10,      // define o comprimento das marcações sobre o eixo X
            //drawTicks: true           // se true, adiciona um espaçamento entre os labels e o eixo
            //borderDashOffset: 0.5,
            //borderDash: [5, 15]
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
            fontStyle: 'bold',
            //beginAtZero: true         // não tem efeito se o tipo do eixo for 'category'
          }
        }],
        yAxes: [{
            //labels: _labelsY,
            offset: true,             // se true, dimensiona o eixo Y para caber dentro da área do gráfico
            type: 'linear',
            display: true,
            stacked: false,
            //id: '',
            //position: '',
            gridLines: {              // esse grupo de configurações altera o comportamento das linhas de grade perpendiculares ao eixo Y
              display: true,          // se false, não exibe as linhas de grade perpendiculares ao eixo Y
              //color: 'blue',          // define a cor das linhas de grade
              offsetGridLines: false, // se false, centraliza a linha de grade na barra do gráfico
              lineWidth: 1,           // largura das linhas de grade
              tickMarkLength: 10,      // define o comprimento das marcações sobre o eixo Y
              //borderDash: [25, 10],   // torna as linhas de grade tracejadas: ['comprimento do traço', 'distância entre os traços']
              //drawTicks: true
              //borderDashOffset: 5,
              //zeroLineBorderDashOffset: 5,
              //zeroLineBorderDash: [50, 50],
              //zeroLineWidth: 20,
              //zeroLineColor: 'blue',
              //circular
              //drawBorder
              //drawOnChartArea
              //z
            },
            scaleLabel: {

              //lineHeight: "3em",
              //fontColor: 'black',
              //fontStyle: 'bold'
              //display: true,
              //labelString: 'EIXO Y'
            },
            ticks: {                  // esse grupo de informações refere-se às etiquetas (números ou strings)
              display: true,          // exibidas ao lado do eixo, correspondente às linhas de grade
              //suggestedMax: this.utils.max(_dadosGraficoModalidades),
              //suggestedMin          // valor sugerido como mínimo, para a escala do eixo Y
              //fontColor: 'red',     // cor da fonte utilizada nos labels do eixo Y
              //fontStyle: 'bold',    // estilo da fonte utilizada nos labels do eixo Y
              beginAtZero: true,      // define se a escala do eixo Y iniciará ou não a partir do zero
              stepSize: 0.5,
              //precision: 0,           // se a propriedade 'stepSize' não estiver definida, aqui se define o nr. de casas decimais do passo da escala do eixo Y
              //maxTicksLimit
              //min: 0                // valor mínimo do eixo Y. Entre essa propriedade e a 'suggestedMin', prevalecerá a menor.
              //max: 1                // valor máximo do eixo Y. Entre essa propriedade e a 'suggestedMax', prevalecerá a maior.
            }
        }],
        ticks: {
          //padding: 5,
/*           propriedade   Tipo            Default
          callback	    function
          display	      boolean	        true
          fontColor	    Color	          '#666'
          fontFamily	  string	        "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
          fontSize	    number	        12
          fontStyle	    string	        'normal'
          lineHeight	  number|string	  1.2
          reverse	      boolean	        false
          minor	        object	        {}
          major	        object	        {}
          padding	      number	        0
          z	            number	        0 */
        }
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

