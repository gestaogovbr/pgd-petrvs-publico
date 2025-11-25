import { Component, Injector } from '@angular/core';
import * as moment from 'moment';
import { PageBase } from '../../base/page-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-home-gestao-pendencias',
  templateUrl: './home-gestao-pendencias.component.html',
  styleUrls: ['./home-gestao-pendencias.component.scss']
})
export class HomeGestaoPendenciasComponent extends PageBase {

  public usuarioDao: UsuarioDaoService;
  public registrosExecucao: any[] = [];
  public planosTrabalhos: any[] = [];
  public planosEntregaEntregas: any[] = [];
  public planosEntregas: any[] = [];

  public lex: LexicalService;
  public gb: GlobalsService;
  public auth: AuthService;
  public go: NavigateService;
  public lookup: LookupService;

  constructor(injector: Injector) {
    super(injector);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.lookup = injector.get<LookupService>(LookupService);
    this.lex = injector.get<LexicalService>(LexicalService);
    this.gb = injector.get<GlobalsService>(GlobalsService);
    this.auth = injector.get<AuthService>(AuthService);
    this.go = injector.get<NavigateService>(NavigateService);
    this.title = 'Pendências da unidade';
    this.modalWidth = 900;
  }

  async ngOnInit() {
    super.ngOnInit();
    await this.loadPendenciasChefe();
  }

  public async loadPendenciasChefe() {
    const res = await this.usuarioDao.getPendenciasChefe();
    const pendenciasChefe = (res as any)?.pendencias || {};
    this.registrosExecucao = pendenciasChefe.registrosExecucao || [];
    this.planosTrabalhos = pendenciasChefe.planosTrabalhos || [];
    this.planosEntregaEntregas = pendenciasChefe.planosEntregaEntregas || [];
    this.planosEntregas = pendenciasChefe.planosEntregas || [];
  }

  public formatDate(date: string): string {
    return date ? moment(date).format('DD/MM/YYYY') : '';
  }

  public trackById(_: number, item: any) { return item?.id; }

  public abrirPlanosTrabalho(numero: string) {
    let rota = this.go.navigate({
      route: ['gestao', 'plano-trabalho'], 
      params: {
        filter: {
          numero: numero, 
          meus_planos: false
        }
      }
    });
    rota.then(success => {
      if (success) this.fecharModal();
    });
  }

  public abrirPlanosEntregas(nome: string) {
    let rota = this.go.navigate({
      route: ['execucao', 'plano-entrega'],
      params: {
        filter: {
          nome: nome,
          unidade_id: null,
          meus_planos: false
        }
      }
    });
    rota.then(success => {
      if (success) this.fecharModal();
    });
  }

  public abrirAvaliacaoPlanoEntrega(planoEntrega: any) {
    let rota = this.go.navigate({
      route: ['gestao', 'plano-entrega'],
      params: {
        avaliacao: true,
        filter: {
          meus_planos: false,
          nome: planoEntrega.nome,
          unidade_id: null
        }
      }
    });
    rota.then(success => {
      if (success) this.fecharModal();
    });
  }

  public abrirConsolidacoes(usuario_id: string, unidade_id: string, numero: string) {
    let rota = this.go.navigate({
      route: ['avaliacao', 'plano-trabalho', 'consolidacao', 'avaliacao'], 
      params: {
        filter: {
          usuario_id: usuario_id,
          unidade_id: unidade_id,
          incluir_arquivados: true,
          numero: numero
        }
      }
    });
    rota.then(success => {
      if (success) this.fecharModal();
    });
  }

  private fecharModal() {
    this.dialog.close();
  }

}