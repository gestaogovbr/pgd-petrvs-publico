import { Component, Injector, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioDaoService, UsuarioDashboard } from 'src/app/dao/usuario-dao.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Variáveis associadas aos objetos gráficos
  public : ChartDataSets[] = [];
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
  public dadosMinhasDemandas: ChartDataSets[] = [];
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
    public utils: UtilService,
    public usuarioDao: UsuarioDaoService,
    public unidadeDao: UnidadeDaoService,
    public atividadeDao: AtividadeDaoService,
    public injector: Injector,
    public lex: LexicalService,
    public go: NavigateService,
    public gb: GlobalsService,
    public allPages: ListenerAllPagesService
  ) {}

  ngOnInit(): void {
    Chart.plugins.register(ChartDataLabels);
    if(this.gb.isExtension) {
      this.allPages.visibilidadeMenuSei(!this.auth.usuario!.config.ocultar_menu_sei);
    }
  }

  async ngAfterViewInit(){
    const dadosUsuario = await this.usuarioDao.dashboard(this.auth.usuario!.id)
    if (dadosUsuario) this.dashUsuario = dadosUsuario;
    this.idExclamacao();
    this.construirGraficoMinhasDemandas();
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
    this.auth.googleApi.getAccessToken().then(res => {
      const sei = res || ''
    });
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

}

