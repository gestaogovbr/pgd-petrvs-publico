
import { Component, Injector, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GestorDashboard, UsuarioDaoService, UsuarioDashboard } from 'src/app/dao/usuario-dao.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UtilService } from 'src/app/services/util.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public formSearch: FormGroup;
  public dashUsuario: UsuarioDashboard = {
    planos: [{
      data_inicio_vigencia: new Date,
      data_fim_vigencia: new Date,
      horas_alocadas: 0,
      horas_consolidadas: 0,
      progresso: 0,
      total_horas: 0
    }],
    atividades: {
      atrasadas: 0,
      avaliadas: 0,
      concluidas: 0,
      media_avaliacoes: 0,
      nao_concluidas: 0,
      nao_iniciadas: 0,
      total_atividades: 0,
      horas_atrasadas: 0,
      horas_avaliadas: 0,
      horas_concluidas: 0,
      horas_nao_concluidas: 0,
      horas_nao_iniciadas: 0,
    },
    horas_afastamentos: 0
  };

  public dashGestor: GestorDashboard = {
    usuarios: [
      {
        nome: '',
        foto: '',
        planos: [{
          data_inicio_vigencia: new Date,
          data_fim_vigencia: new Date,
          horas_alocadas: 0,
          horas_consolidadas: 0,
          progresso: 0,
          total_horas: 0
        }]
      }
    ]
  }

  public data_inicial: Date;
  public data_final: Date;

  public: ChartData[] = [];
  public opcoesGraficoPlano: ChartOptions = {
    plugins: {
      datalabels: {
        display: false,
        align: 'start',
        anchor: 'end',
        color: 'black',
        font: {
          weight: 'bold'
        },
        clamp: true,
        clip: false
      }
    },
    //events: ['click'],
    responsive: true
  };

  public opcoesGraficoAtividades: ChartOptions = {
    plugins: {
      datalabels: {
        display: false,
        align: 'start',
        anchor: 'end',
        color: 'black',
        font: {
          weight: 'bold'
        },
        clamp: true,
        clip: false
      }
    },
    //events: ['click'],
    responsive: true
  };

  public dadosPlanos: ChartData = {
    datasets: []
  };
  public dadosAtividades: ChartData = {
    datasets: []
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
  ) {
    const hoje = new Date()
    const lastDayCurrentMonth = this.getLastDayOfMonth(
      hoje.getFullYear(),
      hoje.getMonth(),
    );

    this.data_inicial = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    this.data_final = new Date(lastDayCurrentMonth)

    this.formSearch = new FormGroup({
      data_inicial: new FormControl(this.data_inicial),
      data_final: new FormControl(this.data_final)
    })
  }

  ngOnInit(): void {
    if (this.gb.isEmbedded) {
      this.allPages.visibilidadeMenuSei(!this.auth.usuario!.config.ocultar_menu_sei);
    }

  }

  async ngAfterViewInit() {
    const unidades_gerenciadas = this.auth.usuario?.gerencia_titular ? [this.auth.usuario?.gerencia_titular!.id] : [];

    if (unidades_gerenciadas?.length) {
      this.filtrarAtividadesGerenciadas(unidades_gerenciadas);
    }

    this.filtrarAtividades();
  }

  async filtrarAtividadesGerenciadas(unidades_gerenciadas: string[]) {
    this.data_inicial = this.formSearch.controls['data_inicial'].value;
    this.data_final = this.formSearch.controls['data_final'].value;

    const dadosGestor = await this.usuarioDao.dashboard_gestor(this.data_inicial, this.data_final, unidades_gerenciadas)
    if (dadosGestor) this.dashGestor = dadosGestor;
  }

  async filtrarAtividades() {
    this.data_inicial = this.formSearch.controls['data_inicial'].value;
    this.data_final = this.formSearch.controls['data_final'].value;

    const dadosUsuario = await this.usuarioDao.dashboard(this.data_inicial, this.data_final, this.auth.usuario!.id)
    if (dadosUsuario) {
      this.dashUsuario = dadosUsuario;
      this.construirGraficoPlanos();
      this.construirGraficoAtividades();
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

  public construirGraficoPlanos() {
    let somaTotal = 0
    let somaAlocadas = 0
    this.dashUsuario.planos?.map(p => somaTotal += p.total_horas)
    this.dashUsuario.planos?.map(p => somaAlocadas += p.horas_alocadas)

    this.dadosPlanos.datasets = [
      {
        label: 'Total de horas',
        data: [somaTotal],
        backgroundColor: '#0dcaf0',
        stack: 'Horas',
        barThickness: 30
      },
      {
        label: 'Total de horas alocadas',
        data: [somaAlocadas],
        backgroundColor: '#ffc107',
        stack: 'Horas',
        barThickness: 30
      }
    ];
  }

  public construirGraficoAtividades() {
    this.dadosAtividades.datasets = [
      {
        label: this.lex.translate("Atividades") + ' Não Iniciadas',
        data: [this.dashUsuario.atividades.horas_nao_iniciadas],
        backgroundColor: '#0dcaf0',
        stack: this.lex.translate("Atividades")
      },
      {
        label: this.lex.translate("Atividades") + ' Não Concluídas',
        data: [this.dashUsuario.atividades.horas_nao_concluidas],
        backgroundColor: '#ffc107',
        stack: this.lex.translate("Atividades")
      },
      {
        label: this.lex.translate("Atividades") + ' Concluídas',
        data: [this.dashUsuario.atividades.horas_concluidas],
        backgroundColor: '#239c24',
        stack: this.lex.translate("Atividades")
      },
      {
        label: this.lex.translate("Atividades") + ' Atrasadas',
        data: [this.dashUsuario.atividades.horas_atrasadas],
        backgroundColor: '#af4201',
        stack: this.lex.translate("Atividades")
      },

    ];
  }


  public tokenGAPI() {
    this.auth.googleApi.getAccessToken().then(res => {
      const sei = res || ''
    });
  }

  getLastDayOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0);
  }

}

