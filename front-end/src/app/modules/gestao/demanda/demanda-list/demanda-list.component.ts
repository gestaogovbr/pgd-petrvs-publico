import { ChangeDetectorRef, Component, HostBinding, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { UnidadeDaoService, UnidadeDashboard } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { PageBase } from 'src/app/modules/base/page-base';
import { AuthService } from 'src/app/services/auth.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';
import { Programa } from './../../../../models/programa.model';

@Component({
  selector: 'app-demanda-list',
  templateUrl: './demanda-list.component.html',
  styleUrls: ['./demanda-list.component.scss']
})
export class DemandaListComponent extends PageBase implements OnInit {
  @HostBinding('style.height.px') height: Number = 200;
  @HostBinding('style.height.px') height_m: Number = 400;
  public activeTab: string = "TABELA";
  public programaSelecionado: Programa | null = null;
  public totalPlanosAtivos: number = 0;
  public totalServidores: number = 0;
  public totalUnidades: number | undefined = 0;
  public unidades: string[] | undefined;
  public cdRef: ChangeDetectorRef;

  // variáveis associadas ao filtro
  @ViewChild('programa', { static: false }) public programa?: InputSearchComponent;
  @ViewChild('unidadesSubordinadas', { static: false }) public unidadesSubordinadas?: InputSwitchComponent;
  public filter?: FormGroup;
  public filterWhere?: (filter: FormGroup) => any[];
  public fh: FormHelperService;

  // Variáveis associadas aos objetos gráficos
  public opcoesGraficoNrPlanos: ChartOptions = {};
  public opcoesGraficoServidores: ChartOptions = {};
  public opcoesGraficoModalidades: ChartOptions = {};
  public dadosGraficoNrPlanos: ChartDataSets[] = [];
  public dadosGraficoServidores: ChartDataSets[] = [];
  public dadosGraficoModalidades: ChartDataSets[] = [];
  public dashUnidades: UnidadeDashboard[] | null = [];
  public labelsGraficosAreasEServidores: string[] = [];
  public heightAreaGrafico: number = 300;

  constructor(
    public injector: Injector,
    public auth: AuthService,
    public utils: UtilService,
    public usuarioDao: UsuarioDaoService,
    public unidadeDao: UnidadeDaoService,
    public programaDao: ProgramaDaoService,
    public atividadeDao: AtividadeDaoService,
    public allPages: ListenerAllPagesService
    ) {
    super(injector);
    /* Inicializações */
    this.title = this.lex.noun("Demanda", true);
    this.code = "MOD_DMD";
    this.fh = this.injector.get<FormHelperService>(FormHelperService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.filter = this.fh.FormBuilder({
      programa_id: {default: ""},
      unidadesSubordinadas: {default: false}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == 'programa_id' && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.activeTab = this.usuarioConfig.active_tab || "TABELA";
    Chart.plugins.register(ChartDataLabels);
    if(this.gb.isEmbedded) {
      this.allPages.visibilidadeMenuSei(!this.auth.usuario!.config.ocultar_menu_sei);
    }
  }

  public async onChange(event: Event) {
    if (this.activeTab == 'DASHBOARD') {
      this.unidades = this.auth.unidades?.map(x => x.id);
      Promise.all([
        this.programaDao.getById(this.filter!.controls.programa_id.value),
        this.unidadeDao.dashboards(this.unidades!, this.filter!.controls.programa_id.value, this.filter!.controls.unidadesSubordinadas.value)
      ]).then(results => {
        this.programaSelecionado = results[0];
        this.dashUnidades = results[1];
        this.cdRef.detectChanges;
        if (this.dashUnidades) {
          this.construirGraficoAreas(this.dashUnidades);
          this.construirGraficoServidores(this.dashUnidades);
          this.construirGraficoModalidades(this.dashUnidades);
        }
      });
    }
  }

  public async onSelectTab(tab: LookupItem) {
    this.activeTab = tab.key;
    this.saveUsuarioConfig({active_tab: this.activeTab});
    if (tab.key == "DASHBOARD") {
      this.programaDao.query({where: [
        ["normativa", "!=", null],
        ["unidade_id", "==",this.auth.unidade!.id],
        ["data_fim", "==", null],
        //["data_fim_vigencia", ">=", Date.now()]
      ]}).asPromise().then((programas) => {
        this.programaSelecionado = programas.sort((a, b) => b.data_inicio_vigencia.getMilliseconds() - a.data_inicio_vigencia.getMilliseconds())[0];
        this.programa?.loadSearch(this.programaSelecionado);
      });
    }
  }

  public construirGraficoAreas(dashUnidades: UnidadeDashboard[]){
    let _dadosGraficoNrPlanos: number[] = [];
    this.totalPlanosAtivos = 0;
    this.labelsGraficosAreasEServidores = [];
    dashUnidades!.forEach(element => {
      this.labelsGraficosAreasEServidores.push(element.sigla);
      _dadosGraficoNrPlanos.push(element.qdePTAtivos);
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
            labels: this.labelsGraficosAreasEServidores,
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
            labels: this.labelsGraficosAreasEServidores,
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

}


