import { Component , Injector, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-home-execucao',
  templateUrl: './home-execucao.component.html',
  styleUrls: ['./home-execucao.component.scss']
})
export class HomeExecucaoComponent implements OnInit {
  
  public lex: LexicalService;
  public gb: GlobalsService;
  public auth: AuthService;
  public consolidacaoDao: PlanoTrabalhoConsolidacaoDaoService;
  public go: NavigateService;
  public pendenciasConsolidacao: any[] = [];
  public inconsistenciasConsolidacao: any[] = [];
  public loadingPendencias: boolean = false;
  public loadingInconsistencias: boolean = false;

  constructor(injector: Injector) {
    this.lex = injector.get<LexicalService>(LexicalService);
    this.gb = injector.get<GlobalsService>(GlobalsService);
    this.auth = injector.get<AuthService>(AuthService);
    this.consolidacaoDao = injector.get<PlanoTrabalhoConsolidacaoDaoService>(PlanoTrabalhoConsolidacaoDaoService);
    this.go = injector.get<NavigateService>(NavigateService);
  }

  ngOnInit() {
    this.loadPendenciasConsolidacao();
    this.loadInconsistenciasConsolidacao();
  }

  public async loadPendenciasConsolidacao() {
    this.loadingPendencias = true;
    try {
      this.pendenciasConsolidacao = await this.consolidacaoDao.pendenciasUsuario();
    } catch (error) {
      console.error('Erro ao carregar pendências de consolidação:', error);
    } finally {
      this.loadingPendencias = false;
    }
  }

  public async loadInconsistenciasConsolidacao() {
    this.loadingInconsistencias = true;
    try {
      this.inconsistenciasConsolidacao = await this.consolidacaoDao.inconsistencias(this.auth.usuario?.id);
    } catch (error) {
      console.error('Erro ao carregar inconsistências de consolidação:', error);
    } finally {
      this.loadingInconsistencias = false;
    }
  }

  public abrirConsolidacao() {
    this.go.navigate({route: ['gestao', 'plano-trabalho', 'consolidacao']});
  }

  public abrirDetalhesInconsistencia(inconsistencia: any) {
    this.go.navigate({
      route: ['gestao', 'plano-trabalho', 'consolidacao', inconsistencia.consolidacao_id, 'consult']
    });
  }
}
