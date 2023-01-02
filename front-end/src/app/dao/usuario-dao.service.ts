import { Injectable, Injector } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Plano } from '../models/plano.model';
import { Unidade } from '../models/unidade.model';
import { Usuario } from '../models/usuario.model';
import { DaoBaseService } from './dao-base.service';

export type UsuarioDashboard = {
  planos: [
    {
      data_inicio_vigencia: Date,
      data_fim_vigencia: Date,
      horas_alocadas: number,
      horas_consolidadas: number,
      progresso: number,
      total_horas: number
    }
  ],
  demandas: {
    atrasadas: number,
    avaliadas: number,
    concluidas: number,
    media_avaliacoes: number,
    nao_concluidas: number,
    nao_iniciadas: number,
    total_demandas: number,
  },
  horas_afastamentos: number
};

export type GestorDashboard = {
  usuarios: [
    {
      nome: string,
      foto: string,
      planos: [
        {
          data_inicio_vigencia: Date,
          data_fim_vigencia: Date,
          horas_alocadas: number,
          horas_consolidadas: number,
          progresso: number,
          total_horas: number
        }
      ]
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioDaoService extends DaoBaseService<Usuario> {

  constructor(protected injector: Injector) {
    super("Usuario", injector);
    this.searchFields = ["matricula", "nome"];
  }

  public dashboard(data_inicial: Date, data_final: Date, usuario_id: string): Promise<UsuarioDashboard | null> {
    return new Promise<UsuarioDashboard | null>((resolve, reject) => {
      if (usuario_id?.length) {
        this.server.post('api/' + this.collection + '/dashboard', { data_inicial, data_final, usuario_id }).subscribe(response => {
          resolve(response.data);
        }, error => {
          console.log("Erro ao buscar o dashboard do Usuário!", error);
          resolve(null);
        });
      } else {
        console.log("ID de usuário em branco!");
        resolve(null);
      }
    });
  }

  public dashboard_gestor(data_inicial: Date, data_final: Date, unidades: string[]): Promise<GestorDashboard | null> {
    return new Promise<GestorDashboard | null>((resolve, reject) => {
      if (unidades.length) {
        this.server.post('api/' + this.collection + '/dashboard_gestor', { data_inicial, data_final, unidades }).subscribe(response => {
          resolve(response.data);
        }, error => {
          console.log("Erro ao buscar o dashboard do Usuário!", error);
          resolve(null);
        });
      } else {
        console.log("Unidades em branco!");
        resolve(null);
      }
    });
  }

  public planosPorPeriodo(usuario_id: string, inicioPeriodo: string | null, fimPeriodo: string | null): Promise<Plano[] | null> {
    return new Promise<Plano[] | null>((resolve, reject) => {
      if (usuario_id?.length) {
        this.server.post('api/Relatorio/planosPorPeriodo', { usuario_id: usuario_id, inicioPeriodo: inicioPeriodo != null ? this.util.getTimeFormattedUSA(inicioPeriodo) : null, fimPeriodo: fimPeriodo != null ? this.util.getTimeFormattedUSA(fimPeriodo) : null })
          .subscribe(response => {
            resolve(response.data as Plano[]);
          }, error => {
            console.log("Erro nas datas de início/fim do período, ou ao buscar no servidor os planos do usuário!", error);
            resolve(null);
          });
      } else {
        console.log("ID de usuário em branco!");
        resolve(null);
      }
    });
  }

}
