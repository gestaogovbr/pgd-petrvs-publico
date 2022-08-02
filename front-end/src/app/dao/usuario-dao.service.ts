import { Injectable, Injector } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Plano } from '../models/plano.model';
import { Usuario } from '../models/usuario.model';
import { DaoBaseService } from './dao-base.service';

export type UsuarioDashboard = {
  total_demandas: number,                           // total geral de demandas do usuário
  media_avaliacoes: number,
  produtividade: number,
  //demandas_totais_iniciadas: number,                // é o mesmo que demandas não concluídas
  demandas_totais_nao_iniciadas: number,            // total de demandas ainda nem iniciadas
  demandas_totais_concluidas: number,               // total de demandas concluidas, mas ainda não avaliadas
  demandas_totais_nao_concluidas: number,           // total de demandas iniciadas, mas ainda não concluidas
  demandas_totais_atrasadas: number,                // total de demandas iniciadas, não concluídas e com prazo de entrega ultrapassado
  demandas_totais_avaliadas: number,                // total de demandas com avaliação realizada
  tarefas_totais_nao_concluidas: number,            // total de tarefas sem data de entrega informada
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioDaoService extends DaoBaseService<Usuario> {

  constructor(protected injector: Injector) {
    super("Usuario", injector);
    this.searchFields = ["matricula", "nome"];
  }

  public dashboard(usuario_id: string): Promise<UsuarioDashboard | null> {
    return new Promise<UsuarioDashboard | null>((resolve, reject) => {
      if(usuario_id?.length){
        this.server.post('api/' + this.collection + '/dashboard', {usuario_id: usuario_id})
        .subscribe(response => {
          resolve(response.data as UsuarioDashboard);
        }, error => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  }

  public planosPorPeriodo(usuario_id: string, inicioPeriodo: string | null, fimPeriodo: string | null): Promise<Plano[] | null> {
    return new Promise<Plano[] | null>((resolve, reject) => {
      if(usuario_id?.length){
          this.server.post('api/Relatorio/planosPorPeriodo', {usuario_id: usuario_id, inicioPeriodo: inicioPeriodo != null ? this.util.getTimeFormattedUSA(inicioPeriodo) : null, fimPeriodo: fimPeriodo != null ? this.util.getTimeFormattedUSA(fimPeriodo) : null})
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
