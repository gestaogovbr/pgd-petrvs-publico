import { Component , Injector } from '@angular/core';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-home-gestao',
  templateUrl: './home-gestao.component.html',
  styleUrls: ['./home-gestao.component.scss']
})
export class HomeGestaoComponent {

  public usuarioDao: UsuarioDaoService;
  public totalPendenciasChefe: number = 0;
  public pendenciasLoaded: boolean = false;


  public lex: LexicalService;
  public gb: GlobalsService;
  public auth: AuthService;
  public go: NavigateService;
  public lookup: LookupService;

  constructor(injector: Injector) {
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.lookup = injector.get<LookupService>(LookupService);
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
    const pendenciasChefe = (res as any)?.pendencias || {};
    this.totalPendenciasChefe = ((pendenciasChefe.planosEntregaEntregas || []).length)
      + ((pendenciasChefe.planosEntregas || []).length)
      + ((pendenciasChefe.registrosExecucao || []).length)
      + ((pendenciasChefe.planosTrabalhos || []).length);
    this.pendenciasLoaded = true;

  }

  public formatDate(date: string): string {
    return date ? moment(date).format('DD/MM/YYYY') : '';
  }

  public abrirPendenciasModal() {
    this.go.navigate({ route: ['home','gestao','pendencias'] }, { modal: true });
  }

}