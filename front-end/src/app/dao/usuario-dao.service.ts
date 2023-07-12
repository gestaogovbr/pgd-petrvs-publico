
import { Injectable, Injector } from '@angular/core';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { Afastamento } from '../models/afastamento.model';
import { DemandaPausa } from '../models/demanda-pausa.model';
import { Usuario } from '../models/usuario.model';
import { Efemerides, TipoContagem } from '../services/calendar.service';
import { LookupService } from '../services/lookup.service';
import { DaoBaseService } from './dao-base.service';
import { PlanoTrabalho } from '../models/plano-trabalho.model';

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
  atividades: {
    atrasadas: number,
    avaliadas: number,
    concluidas: number,
    media_avaliacoes: number,
    nao_concluidas: number,
    nao_iniciadas: number,
    total_demandas: number,
    horas_atrasadas: number,
    horas_avaliadas: number,
    horas_concluidas: number,
    horas_nao_concluidas: number,
    horas_nao_iniciadas: number,
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

  public lookup: LookupService;

  constructor(protected injector: Injector) {
    super("Usuario", injector);
    this.lookup = injector.get<LookupService>(LookupService);
    this.searchFields = ["matricula", "nome"];
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "nome", label: "Nome" },
      { field: "email", label: "E-mail" },
      { field: "cpf", label: "CPF" },
      { field: "matricula", label: "Matrícula" },
      { field: "apelido", label: "Apelido" },
      { field: "telefone", label: "Telefone" },
      { field: "sexo", label: "Sexo", lookup: this.lookup.SEXO },
      { field: "vinculacao", label: "Vinculo", lookup: this.lookup.USUARIO_VINCULACAO },
      { field: "texto_complementar_plano", label: "Mensagem do Plano de trabalho", type: "TEMPLATE"}
    ], deeps);
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
          console.log("Erro ao buscar o dashboard do Gestor!", error);
          resolve(null);
        });
      } else {
        console.log("Unidades em branco!");
        resolve(null);
      }
    });
  }

  public planosPorPeriodo(usuario_id: string, inicioPeriodo: string | null, fimPeriodo: string | null): Promise<PlanoTrabalho[] | null> {
    return new Promise<PlanoTrabalho[] | null>((resolve, reject) => {
      if (usuario_id?.length) {
        this.server.post('api/Relatorio/planosPorPeriodo', { usuario_id: usuario_id, inicioPeriodo: inicioPeriodo != null ? this.util.getTimeFormattedUSA(inicioPeriodo) : null, fimPeriodo: fimPeriodo != null ? this.util.getTimeFormattedUSA(fimPeriodo) : null })
          .subscribe(response => {
            resolve(response.data as PlanoTrabalho[]);
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
  
  public calculaDataTempoUnidade(inicio: string, fimOuTempo: string | number, cargaHoraria: number, unidade_id: string, tipo: TipoContagem, pausas?: DemandaPausa[], afastamentos?: Afastamento[]): Promise<Efemerides | undefined> {
    return new Promise<Efemerides | undefined>((resolve, reject) => {
      this.server.post('api/Teste/calculaDataTempoUnidade', { inicio: inicio, fimOuTempo: fimOuTempo, cargaHoraria: cargaHoraria, unidade_id: unidade_id, tipo: tipo, pausas: pausas, afastamentos: afastamentos })
        .subscribe(response => {
          resolve(response.data as Efemerides);
        }, error => {
          console.log("Erro no cálculo das Efemerides pelo servidor!", error);
          resolve(undefined);
        });
    });
  }
}
