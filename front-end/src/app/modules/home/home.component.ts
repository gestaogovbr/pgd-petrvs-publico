
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
   
    
  }

  ngOnInit(): void {
    if (this.gb.isEmbedded) {
      this.allPages.visibilidadeMenuSei(!this.auth.usuario!.config.ocultar_menu_sei);
    }

  }

  async ngAfterViewInit() {
   
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

  getLastDayOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0);
  }

}

