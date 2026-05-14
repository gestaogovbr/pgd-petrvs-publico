import { Component, Injector } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-envio-consulta',
  templateUrl: './envio-consulta.component.html',
  styleUrls: ['./envio-consulta.component.scss'],
  standalone: false
})
export class EnvioConsultaComponent {
  readonly auth: AuthService;

  constructor(injector: Injector) {
    this.auth = injector.get(AuthService);
  }
}
