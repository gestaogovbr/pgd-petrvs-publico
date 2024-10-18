import { Injectable, Injector } from '@angular/core';
import { EixoTematico } from '../models/eixo-tematico.model';
import { DaoBaseService } from './dao-base.service';
import { Relato } from '../models/relato.model';

@Injectable({
  providedIn: 'root'
})
export class RelatoDaoService extends DaoBaseService<Relato> {

  constructor(protected injector: Injector) { 
    super("Relato", injector);
  }

  public enviar(opcao: string, usuario_id: string, unidade_id: string, nome: string, cpf: string, matricula: string, descricao: string) {
    return this.server.post('api/Relato/store', { opcao, usuario_id, unidade_id, nome, cpf, matricula, descricao });
  }
}

