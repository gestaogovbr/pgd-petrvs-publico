import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioDaoService, UsuarioDashboard } from 'src/app/dao/usuario-dao.service';
import { AtividadeDaoService,  AtividadeDashboard } from 'src/app/dao/atividade-dao.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public demandaFilter: any[];

  public dashboard: UsuarioDashboard = {
    total_demanda: 0,
    total_atrasadas: 0,
    total_iniciadas: 0,
    total_concluidas: 0,
    produtividade: 0,
    demandas_totais_concluidas: 0,
    demandas_totais_nao_concluidas: 0,
    demandas_totais_atrasadas: 0,
    tarefas_totais_nao_concluidas: 0
  };

  public ativdashboard: AtividadeDashboard = {
    total_atividades: 0,
  };

  constructor(
    public auth: AuthService,
    public usuarioDao: UsuarioDaoService,
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
      if (dados) this.dashboard = dados;
      this.idExclamacao();
    });
    if(this.gb.isExtension) {
      this.allPages.visibilidadeMenuSei(!this.auth.usuario!.config.ocutar_menu_sei);
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

}

