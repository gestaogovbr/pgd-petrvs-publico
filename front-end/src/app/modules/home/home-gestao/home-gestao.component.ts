import { Component , Injector } from '@angular/core';
import * as moment from 'moment';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-home-gestao',
  templateUrl: './home-gestao.component.html',
  styleUrls: ['./home-gestao.component.scss']
})
export class HomeGestaoComponent {

  public usuarioDao: UsuarioDaoService;
  public registrosExecucao: any[] = [];
  public planosTrabalhos: any[] = [];
  public planosEntregaEntregas: any[] = [];
  public planosEntregas: any[] = [];

  public lex: LexicalService;
  public gb: GlobalsService;
  public auth: AuthService;
  public go: NavigateService;

  constructor(injector: Injector) {
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.lex = injector.get<LexicalService>(LexicalService);
    this.gb = injector.get<GlobalsService>(GlobalsService);
    this.auth = injector.get<AuthService>(AuthService);
    this.go = injector.get<NavigateService>(NavigateService);
  }

   ngOnInit() {
    this.loadPendenciasChefe();
  }
  
  public async loadPendenciasChefe() {
    const res = await this.usuarioDao.getPendenciasChefe();
    console.log('res', res);
    let pendenciasChefe = (res as any)?.pendencias || [];
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
    this.go.navigate({
      route: ['gestao', 'plano-trabalho'], 
      params: {
        filter: {
          numero: numero, 
          meus_planos: false
        }
      }
    });
  }

  public abrirPlanosEntregas(nome: string) {
    this.go.navigate({
      route: ['execucao', 'plano-entrega'],
      params: {
        filter: {
          nome: nome,
        }
      }
    });
  }
  public abrirConsolidacoes() {
    this.go.navigate({route: ['avaliacao', 'plano-trabalho', 'consolidacao', 'avaliacao']});
  }

}