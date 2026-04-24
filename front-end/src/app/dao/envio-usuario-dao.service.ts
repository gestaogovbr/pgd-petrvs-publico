import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class EnvioUsuarioDaoService extends DaoBaseService<Usuario> {
  constructor(protected injector: Injector) {
    super('EnvioUsuario', injector);
  }
}
