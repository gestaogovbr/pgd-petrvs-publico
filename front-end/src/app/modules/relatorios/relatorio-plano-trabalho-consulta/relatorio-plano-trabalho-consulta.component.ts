import { Component, Injector } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-relatorio-plano-trabalho-consulta',
  templateUrl: './relatorio-plano-trabalho-consulta.component.html',
  styleUrls: ['./relatorio-plano-trabalho-consulta.component.scss'],
  standalone: false
})
export class RelatorioPlanoTrabalhoConsultaComponent {
  readonly auth: AuthService;
  readonly permissao = 'MOD_RELATORIO_PT';

  constructor(injector: Injector) {
    this.auth = injector.get(AuthService);
  }
}
