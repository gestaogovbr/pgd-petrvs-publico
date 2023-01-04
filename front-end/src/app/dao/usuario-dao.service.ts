import { Injectable, Injector } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Afastamento } from '../models/afastamento.model';
import { DemandaPausa } from '../models/demanda-pausa.model';
import { Plano } from '../models/plano.model';
import { Unidade } from '../models/unidade.model';
import { Usuario } from '../models/usuario.model';
import { Efemerides, TipoContagem } from '../services/calendar.service';
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

  // total_demandas: number,                           // total geral de demandas do usuário
  // media_avaliacoes: number,
  // produtividade: number,
  // //demandas_totais_iniciadas: number,                // é o mesmo que demandas não concluídas
  // demandas_totais_nao_iniciadas: number,            // total de demandas ainda nem iniciadas
  // demandas_totais_concluidas: number,               // total de demandas concluidas, mas ainda não avaliadas
  // demandas_totais_nao_concluidas: number,           // total de demandas iniciadas, mas ainda não concluidas
  // demandas_totais_atrasadas: number,                // total de demandas iniciadas, não concluídas e com prazo de entrega ultrapassado
  // demandas_totais_avaliadas: number,                // total de demandas com avaliação realizada
  // tarefas_totais_nao_concluidas: number,            // total de tarefas sem data de entrega informada
};

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

  public calculaDataTempoUnidade(inicio: string, fimOuTempo: string | number, cargaHoraria: number, unidade_id: string, tipo: TipoContagem, pausas?: DemandaPausa[], afastamentos?: Afastamento[]): Promise<Efemerides | undefined>{
    return new Promise<Efemerides | undefined>((resolve,reject) => {
      this.server.post('api/Teste/calculaDataTempoUnidade', {inicio: inicio, fimOuTempo: fimOuTempo, cargaHoraria: cargaHoraria, unidade_id: unidade_id, tipo: tipo, pausas: pausas, afastamentos: afastamentos})
      .subscribe(response => {                        
        resolve(response.data as Efemerides);
      }, error => {
        console.log("Erro no cálculo das Efemerides pelo servidor!", error);
        resolve(undefined);
      });
    });
  }

}
