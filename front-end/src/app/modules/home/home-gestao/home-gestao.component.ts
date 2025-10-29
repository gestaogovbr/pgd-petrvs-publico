import { Component , Injector } from '@angular/core';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';

@Component({
  selector: 'app-home-gestao',
  templateUrl: './home-gestao.component.html',
  styleUrls: ['./home-gestao.component.scss']
})
export class HomeGestaoComponent {

  public pendenciasChefe: any[] = [];
  public usuarioDao: UsuarioDaoService;

  public lex: LexicalService;
  public gb: GlobalsService;
  public auth: AuthService;

  constructor(injector: Injector) {
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.lex = injector.get<LexicalService>(LexicalService);
    this.gb = injector.get<GlobalsService>(GlobalsService);
    this.auth = injector.get<AuthService>(AuthService);
  }

   ngOnInit() {
    this.loadPendenciasChefe();
  }
  
  public async loadPendenciasChefe() {
    this.pendenciasChefe = await this.usuarioDao.getPendenciasChefe();
  }

}