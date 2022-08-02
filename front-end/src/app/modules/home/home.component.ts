import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioDaoService, UsuarioDashboard } from 'src/app/dao/usuario-dao.service';
import { AtividadeDaoService,  AtividadeDashboard } from 'src/app/dao/atividade-dao.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { LookupItem } from 'src/app/services/lookup.service';
import { UnidadeDaoService, UnidadeDashboard } from 'src/app/dao/unidade-dao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public activeTab: string = "PGD";
  public demandaFilter: any[];
  public unidades: string[] = [];
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
  public ativdashboard: AtividadeDashboard = {
    total_atividades: 0,
  };

  public dadosMinhasDemandas: ChartDataSets[] = [];
  public opcoesMinhasDemandas: ChartOptions = {
    legend: {
      display: true,
      position: 'top',
      align: 'end'
    },
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
    responsive: true
    }
  };
  public dadosGraficoAreas: ChartDataSets[] = [];
  public opcoesGraficoAreas: ChartOptions = {
    legend: {
      display: true,
      position: 'left'
    },
    scales: {
      xAxes: [{
          stacked: false,
          ticks: {
            beginAtZero: true
          }
      }],
      yAxes: [{
          stacked: false,
      }]
    },
    plugins: {
    },
    responsive: true
  };
  public dadosGraficoServidores: ChartDataSets[] = [];
  public opcoesGraficoServidores: ChartOptions = this.opcoesGraficoAreas;

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
    this.usuarioDao.dashboard(this.auth.usuario!.id).then(dados => {
      if (dados) this.dashUsuario = dados;
      this.idExclamacao();
    });
    this.unidadeDao.dashboards(this.unidades).then(dados => {
      if(dados) this.dashUnidades = dados;
    });
    if(this.gb.isExtension) {
      this.allPages.visibilidadeMenuSei(!this.auth.usuario!.config.ocutar_menu_sei);
    }
    this.construirGraficoMinhasDemandas();
    this.construirGraficosAreas(this.dashUnidades);
  }

  public construirGraficoMinhasDemandas() {
    this.dadosMinhasDemandas = [
      {
        label: 'Demandas Não-iniciadas',
        data: [this.dashboard.demandas_totais_nao_iniciadas],
        backgroundColor: '#0dcaf0',
        stack: 'Demandas'
      },
      {
        label: 'Demandas Iniciadas',
        data: [this.dashboard.demandas_totais_nao_concluidas],
        backgroundColor: '#ffc107',
        stack: 'Demandas'
      },
      {
        label: 'Demandas Concluídas',
        data: [this.dashboard.demandas_totais_concluidas],
        backgroundColor: '#af4201',
        stack: 'Demandas'
      },
      {
        label: 'Demandas Avaliadas',
        data: [this.dashboard.demandas_totais_avaliadas],
        backgroundColor: '#af4af0',
        stack: 'Demandas'
      }
    ];
  }

  public construirGraficosAreas(dashUnidades: UnidadeDashboard[]){
    for(let dash of dashUnidades){
      this.dadosGraficoAreas.push(
        {
          label: dash.nome,
          data: dash.qdePTAtivos,
        }
      );
    }
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
      this.dashboard.produtividade;
  }

  public produtividadeMedia(){
  }

  public idExclamacao(){
    return this.dashboard.produtividade == 0 ? "icon-demandas-natraso" : "icon-demandas-atraso";
  }

  public totalAtividades(){
    return 0;
  }

  public onSelectTab(tab: LookupItem) {
    this.activeTab = tab.key;
  }


}

