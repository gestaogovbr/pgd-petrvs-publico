import { Component, Injector } from '@angular/core';
import * as moment from 'moment';
import { PageBase } from '../../base/page-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';

@Component({
    selector: 'app-home-gestao-pendencias',
    templateUrl: './home-gestao-pendencias.component.html',
    styleUrls: ['./home-gestao-pendencias.component.scss'],
    standalone: false
})
export class HomeGestaoPendenciasComponent extends PageBase {

  public usuarioDao: UsuarioDaoService;
  public registrosExecucao: any[] = [];
  public planosEntregaAvaliacao: any[] = [];
  public planosTrabalhoAssinatura: any[] = [];
  public entregasPlanoEntregaExecucao: any[] = [];

  public lex: LexicalService;
  public gb: GlobalsService;
  public auth: AuthService;
  public go: NavigateService;
  public lookup: LookupService;
  private filterStorage: FilterStorageService;

  constructor(injector: Injector) {
    super(injector);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.lookup = injector.get<LookupService>(LookupService);
    this.lex = injector.get<LexicalService>(LexicalService);
    this.gb = injector.get<GlobalsService>(GlobalsService);
    this.auth = injector.get<AuthService>(AuthService);
    this.go = injector.get<NavigateService>(NavigateService);
    this.filterStorage = injector.get<FilterStorageService>(FilterStorageService);
    this.title = 'Pendências da unidade';
    this.modalWidth = 900;
  }

  async ngOnInit() {
    super.ngOnInit();
    const pendenciasChefe = this.metadata?.pendenciasChefe;
    if (pendenciasChefe) {
      this.applyPendenciasChefe(pendenciasChefe);
      return;
    }
    await this.loadPendenciasChefe();
  }

  public async loadPendenciasChefe() {
    const res = await this.usuarioDao.getPendenciasChefe();
    const pendenciasChefe = (res as any)?.pendencias || {};
    this.applyPendenciasChefe(pendenciasChefe);
  }

  private applyPendenciasChefe(pendenciasChefe: any) {
    this.registrosExecucao = pendenciasChefe.registrosExecucao || [];
    this.planosTrabalhoAssinatura = pendenciasChefe.planosTrabalhoAssinatura || [];
    this.planosEntregaAvaliacao = pendenciasChefe.planosEntregaAvaliacao || [];
    this.entregasPlanoEntregaExecucao = pendenciasChefe.entregasPlanoEntregaExecucao || [];
  }

  public formatDate(date: string): string {
    return date ? moment(date).format('DD/MM/YYYY') : '';
  }

  public trackById(_: number, item: any) { return item?.id; }

  public abrirPlanosTrabalho(numero: string) {
    this.filterStorage.save('plano-trabalho-v2:filters', { numero, meus_planos: false, vigentes: false, advanced: true, subordinadas: true   });
    const rota = this.go.navigate({ route: ['gestao', 'plano-trabalho-v2'] });
    rota.then(success => {
      if (success) this.fecharModal();
    });
  }

  public abrirPlanosEntregas(nome: string) {
    let rota = this.go.navigate({
      route: ['execucao', 'plano-entrega'],
      params: {
        execucao: true,
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

  public abrirConsolidacoes(planoId: string) {
    let rota = this.go.navigate({
      route: ['gestao', 'plano-trabalho-v2', 'consultar', planoId]
    });
    rota.then(success => {
      if (success) this.fecharModal();
    });
  }

  private fecharModal() {
    this.dialog.close();
  }

}
