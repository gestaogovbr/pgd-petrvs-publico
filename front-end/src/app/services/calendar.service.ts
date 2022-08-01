import { Injectable, Injector } from '@angular/core';
import * as moment from 'moment';
import { Afastamento } from '../models/afastamento.model';
import { DemandaPausa } from '../models/demanda-pausa.model';
import { DistribuicaoFormaContagemPrazos, EntregaFormaContagemPrazos, Unidade } from '../models/unidade.model';
import { AuthService } from './auth.service';
import { GlobalsService } from './globals.service';
import { ServerService } from './server.service';
import { TimeInterval, UtilService } from './util.service';

export type ResultadoCalculo = "DATA" | "TEMPO";
export type TipoContagem = "DISTRIBUICAO" | "ENTREGA";
export type FeriadoList = { [data: string]: string };
export type FeriadosCadastrados = { [unidade_id: string]: FeriadoList }
export type FeriadosReligiosos = { [ano: string]: FeriadoList }
export type Efemerides = {
  resultado: ResultadoCalculo, /* Se a função está calculando Data Fim ou Tempo (em Tempo Útil) */
  dias_corridos: number, /* Numero de dias que foram usados para os cálculos */
  inicio: Date, /* Data inicio */
  fim: Date, /* Data/hora fim (Será calculado ou informado) */
  tempoUtil: number, /* horas (Caso seja dia, os dias serão tempoUtil / cargaHoraria, será calculado ou informado) */
  tipo: TipoContagem, /* Tipo do cáculo, se será "DISTRIBUICAO" | "ENTREGA" */
  formaDistribuicao: DistribuicaoFormaContagemPrazos, /* Dias/Horas Corridos/Úteis */
  formaEntrega: EntregaFormaContagemPrazos, /* Horas Corridos/Úteis */
  horasAfastamentosPausas: number, /* Horas de Afastamento/Pausas */
  unidade_id: string, /* Unidade com parametrização para os cálculos */
  cargaHoraria: number, /* Cargo horária para os cálculos (Será utilizado inclusive para o cálculo em dias) */
  expediente:number, /* Expediente da unidade */
  afastamentos: Afastamento[], /* Afastamentos válidos no período */
  pausas: DemandaPausa[] /* Pausas */
  finsSemana: FeriadoList, /* Fins de semana no período */
  feriados: FeriadoList, /* Feriados cadastrados e religiosos no período */
  horario_trabalho_inicio: string, /* Horário do inicio do expediente na unidade */
  horario_trabalho_fim: string, /* Horário do fim do expediente na unidade */
  horario_trabalho_intervalo: string, /* Tempo de intervalo na unidade */
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public feriadosCadastrados: FeriadosCadastrados = {};
  public feriadosReligiosos: FeriadosReligiosos = {};

  private _gb?: GlobalsService;
  public get gb(): GlobalsService { this._gb = this._gb || this.injector.get<GlobalsService>(GlobalsService); return this._gb }
  private _server?: ServerService;
  public get server(): ServerService { this._server = this._server || this.injector.get<ServerService>(ServerService); return this._server }
  private _util?: UtilService;
  public get util(): UtilService { this._util = this._util || this.injector.get<UtilService>(UtilService); return this._util }
  private _auth?: AuthService;
  public get auth(): AuthService { this._auth = this._auth || this.injector.get<AuthService>(AuthService); return this._auth }

  constructor(protected injector: Injector) { }

  public easter(year: number | undefined = undefined): Date {
    year = year || (new Date()).getFullYear();
    const G = year % 19; /* Golden Number - 1 */
    const C = Math.floor(year / 100); /* Century */
    const H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30; /* Related to Epact */
    const I = H - Math.floor(H / 28) * (1 - Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11)); /* number of days from 21 March to the Paschal full moon */
    const J = (year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4)) % 7; /* weekday for the Paschal full moon */
    const L = I - J; /* number of days from 21 March to the Sunday on or before the Paschal full moon */
    const month = 3 + Math.floor((L + 40) / 44);
    const day = L + 28 - 31 * Math.floor(month / 4);
    return new Date(year, month, day, 0, 0, 0, 0);
  }

  public loadFeriadosReligiosos(ano: number) {
    const pascoa = this.easter(ano);
    const pascoaDia = pascoa.getDate();
    const pascoaMes = pascoa.getMonth() - 1; /* Indexar pelo 0 e não pelo 1 */
    const pascoaAno = pascoa.getFullYear();
    let result: FeriadoList = {};
    result[moment(new Date(pascoaAno, pascoaMes, pascoaDia - 48, 0, 0, 0, 0)).format("YYYY-MM-DD")] = "2º-feira Carnaval";
    result[moment(new Date(pascoaAno, pascoaMes, pascoaDia - 47, 0, 0, 0, 0)).format("YYYY-MM-DD")] = "3º-feira Carnaval";
    result[moment(new Date(pascoaAno, pascoaMes, pascoaDia - 2, 0, 0, 0, 0)).format("YYYY-MM-DD")] = "6º-feira Santa";
    result[moment(new Date(pascoaAno, pascoaMes, pascoaDia, 0, 0, 0, 0)).format("YYYY-MM-DD")] = "Pascoa";
    result[moment(new Date(pascoaAno, pascoaMes, pascoaDia + 60, 0, 0, 0, 0)).format("YYYY-MM-DD")] = "Corpus Christi";
    return result;
  }

  public loadFeriadosCadastrados(unidade_id: string): Promise<FeriadoList> {
    return new Promise<FeriadoList>((resolve, reject) => {
      if (this.feriadosCadastrados[unidade_id]) {
        resolve(this.feriadosCadastrados[unidade_id]);
      } else {
        this.server.post('api/Calendario/feriados-cadastrados', {
          unidade_id: unidade_id
        }).subscribe(response => {
          this.feriadosCadastrados[unidade_id] = response.feriados;
          resolve(this.feriadosCadastrados[unidade_id]);
        }, error => reject(error));
      }
    });
  }

  public produtividade(tempo_pactuado: number, tempo_despendido: number): number {
    return Math.round((tempo_pactuado / tempo_despendido) * 10000) / 100;
  }

  public isFeriadoCadastrado(data: Date, unidade: Unidade): string | undefined {
    let feriados: FeriadoList | undefined = this.feriadosCadastrados[unidade.id];
    if (feriados) {
      const isoData = moment(data).format("YYYY-MM-DD");
      return feriados[isoData] || feriados[isoData.substring(-6)];
    } else {
      throw new Error("Lista de feriados da unidade não carregado no sistema.");
    }
  }

  public isFeriadoReligioso(data: Date): string | undefined {
    const isoData = moment(data).format("YYYY-MM-DD");
    const year = data.getFullYear().toString();
    if (!this.feriadosReligiosos[year]) {
      this.feriadosReligiosos[year] = this.loadFeriadosReligiosos(data.getFullYear());
    }
    return this.feriadosReligiosos[year][isoData];
  }

  public isFinalSemana(data: Date): string | undefined {
    return data.getDay() == 6 ? "Sábado" : data.getDay() == 0 ? "Domingo" : undefined;
  }

  public isDiaUtil(data: Date, unidade: Unidade): boolean {
    return !this.isFeriadoCadastrado(data, unidade) && !this.isFeriadoReligioso(data) && !this.isFinalSemana(data);
  }

  public expediente(unidade: Unidade | undefined, inicio: Date | undefined = undefined): number {
    /* Retorna (horario_trabalho_fim - (inicio ou horario_trabalho_inicio) - horario_trabalho_intervalo) ou 24 caso não tenha unidade */
    return !unidade ? 24 : Math.max(this.util.getStrTimeHours(unidade.horario_trabalho_fim) -
      (inicio ? this.util.getTimeHours(inicio) : this.util.getStrTimeHours(unidade.horario_trabalho_inicio)) -
      this.util.getStrTimeHours(unidade.horario_trabalho_intervalo || "00:00"), 0);
  }

  public prazo(inicio: Date, horas: number, cargaHoraria: number, unidade: Unidade, tipo: TipoContagem) {
    return this.calculaDataTempo(inicio, horas, cargaHoraria, unidade, tipo).fim;
  }

  public horasUteis(inicio: Date, fim: Date, cargaHoraria: number, unidade: Unidade, tipo: TipoContagem, pausas?: DemandaPausa[], afastamentos?: Afastamento[]): number {
    return this.util.round(this.calculaDataTempo(inicio, fim, cargaHoraria, unidade, tipo, pausas, afastamentos).tempoUtil, 2);
  }

  public horasAtraso(prazo_entrega: Date, unidade: Unidade) {
    return this.util.round(this.calculaDataTempo(prazo_entrega, this.auth.hora, 0, unidade, "ENTREGA").tempoUtil, 2);
  }

  public horasAdiantado(data_entrega: Date, prazo_entrega: Date, cargaHoraria: number, unidade: Unidade) {
    return this.util.round(this.calculaDataTempo(data_entrega, prazo_entrega, cargaHoraria, unidade, "ENTREGA").tempoUtil, 2);
  }

  /*
  Função responsável por todos os cálculos de períodos no sistema.
  Obs.: As variáveis que armazenam tempo/data são iniciadas com as respectivas letras:
  - d: Data, do tipo Date do javascript
  - h: Tempo em formato de horas, de forma numérica, por exempo 01h30 será igual a 1.5
  - t: Tempo em formado de milesegundos (getTime() do javascript)
  - u: Unidade de dia, é um formato semelhante ao timestemp, porem contado em dias

  @param Date          inicio       Data e hora de inicio
  @param Date|number   fimOuTempo   Se a intenção for calcular a dataFim então será passado o tempo,
    caso passe uma dataFim será calculado o tempo. O tempo é calculado da seguinte form:
    1) Se forma for DIAS, então será sempre um mútiplo de cargaHoraria (dias = fimOuTempo / cargaHoraria)
    2) Se forma for HORAS, será as horas em forma decimal
  @param number        cargaHoraria Carga horária que sserá considerada para os cálculos
  @param Unidade       unidade      Unidade com as configurações necessárias
  @param TipoContagem  tipo         Se será utilizado a forma de cálculo da distribuição ou da entrega (pego na unidade)
  @param DemandaPausa? pausas       Lista das pausas, quando aplicável
  @param Afastamento?  afastamentos Lista dos afastamento a partir da data Inicio para o usuario, quando aplicável
  @return Efemerides Retorna todas as informações do cálculo com as horas ou a data fim calculados
  */
  public calculaDataTempo(inicio: Date, fimOuTempo: Date | number, cargaHoraria: number, unidade: Unidade, tipo: TipoContagem, pausas?: DemandaPausa[], afastamentos?: Afastamento[]): Efemerides {
    const formaDistribuicao = unidade.distribuicao_forma_contagem_prazos;
    const formaEntrega = unidade.entrega_forma_contagem_prazos;
    const forma = tipo == "DISTRIBUICAO" ? formaDistribuicao : formaEntrega;
    const useCorridos = forma == "DIAS_CORRIDOS" || forma == "HORAS_CORRIDAS";
    const useDias = forma == "DIAS_CORRIDOS" || forma == "DIAS_UTEIS";
    const useTempo = typeof fimOuTempo == "number"; /* Se o parametro fimOuTempo é DataFim ou Horas/Dias */
    const uDiasInicio = this.util.daystamp(inicio); /* Dia inicio (usado somente se !useTempo) */
    const uDiasFim = useTempo ? uDiasInicio : this.util.daystamp(fimOuTempo as Date); /* Dia fim (usado somente se !useTempo) */
    const hExpediente = this.expediente(unidade); /* em horas */

    /* Calcula as horas de afastamento */
    const horasAfastamento = (start: number, end: number): TimeInterval[] => {
      let periodos: TimeInterval[] = [];
      for(let afastamento of (afastamentos || [])) {
        /* calcula a intersecção entre start e end e o inicio e fim do afastamento */
        const intervalo = this.util.intersection([{start, end}, {start: afastamento.inicio_afastamento.getTime(), end: afastamento.fim_afastamento.getTime()}]) as TimeInterval;
        if(intervalo) {
          /* Caso tenha uma intersecção, adiciona o pedíodo para retorno e insere em result.afastamentos */
          periodos.push(intervalo);
          if(!result.afastamentos.includes(afastamento)) result.afastamentos.push(afastamento);
        }
      }
      return periodos;
    }

    /* Calcula as horas pausadas */
    const horasPausas = (start: number, end: number): TimeInterval[] => {
      let periodos: TimeInterval[] = [];
      for(let pausa of (pausas || [])) {
        const intervalo = this.util.intersection([{start, end}, {start: pausa.data_inicio.getTime(), end: pausa.data_fim?.getTime() || end}]) as TimeInterval;
        if(intervalo) {
          periodos.push(intervalo);
          if(!result.pausas.includes(pausa)) result.pausas.push(pausa);
        }
      }
      return periodos;
    }
    /* Calcula a união entre afastamentos e pausas */
    const horasAfastamentoPausa = (start: number, end: number): TimeInterval[] => {
      const hAfastamentos = horasAfastamento(start, end);
      const hPausas = horasPausas(start, end);
      return this.util.union([...hAfastamentos, ...hPausas]) as TimeInterval[];
    }
    let hTempo = useTempo ? fimOuTempo as number : 0; /* variável saldo de horas/dias (usado somente se useTempo) */
    let dDiaAtual = new Date(inicio.getTime()); /* Variável que irá percorrer todas as datas (do inicio ao fim ou a quantidade de horas) */
    let result: Efemerides = { /* Variável que irá retonar todas as informações calculadas */
      resultado: useTempo ? "DATA" : "TEMPO",
      dias_corridos: 0,
      inicio: inicio,
      fim: !useTempo ? fimOuTempo as Date: new Date(inicio.getTime()),
      tempoUtil: useTempo ? fimOuTempo as number : 0,
      tipo: tipo,
      formaDistribuicao: formaDistribuicao,
      formaEntrega: formaEntrega,
      horasAfastamentosPausas: 0,
      unidade_id: unidade.id,
      cargaHoraria: cargaHoraria || 24,
      expediente: hExpediente,
      afastamentos: [],
      pausas: [],
      finsSemana: {},
      feriados: {},
      horario_trabalho_inicio: unidade.horario_trabalho_inicio, /* Horário do inicio do expediente na unidade */
      horario_trabalho_fim: unidade.horario_trabalho_fim, /* Horário do fim do expediente na unidade */
      horario_trabalho_intervalo: unidade.horario_trabalho_intervalo, /* Tempo de intervalo na unidade */
    };

    cargaHoraria = result.cargaHoraria; /* Garante que se a carga horária vier zerado, será considerado 24hrs */
    while(useTempo ? this.util.round(hTempo, 2) > 0 : this.util.daystamp(dDiaAtual) <= uDiasFim) {
      const firstDay = this.util.daystamp(dDiaAtual) == uDiasInicio;
      const lastDay = this.util.daystamp(dDiaAtual) == uDiasFim;
      const strDiaAtual = moment(dDiaAtual).format("YYYY-MM-DD"); /* Usado somente para indexar os vetores com a data do feriado/fds */
      /* Se for dias corridos ou horas corridas não é necessário calcular Feriados e nem Fins de Semana */
      const feriadoCadastrado = useCorridos ? undefined : this.isFeriadoCadastrado(dDiaAtual, unidade);
      const feriadoReligioso = useCorridos ? undefined : this.isFeriadoReligioso(dDiaAtual);
      const fimSemana = useCorridos ? undefined : this.isFinalSemana(dDiaAtual);
      const diaUtil = !feriadoCadastrado && !feriadoReligioso && !fimSemana;
      if(!useCorridos) {
        if(feriadoCadastrado) result.feriados[strDiaAtual] = feriadoCadastrado; /* Se feriado cadastrado, adiciona ao resultado */
        if(feriadoReligioso) result.feriados[strDiaAtual] = feriadoReligioso; /* Se feriado religioso, adiciona ao resultado */
        if(fimSemana) result.finsSemana[strDiaAtual] = fimSemana; /* Se final de semana, adiciona ao resultado */
      }
      /* Calculo em dias */
      if (useDias) {
        const tInicioDia = this.util.setStrTime(dDiaAtual, unidade.horario_trabalho_inicio).getTime();
        const tFimDia = this.util.setStrTime(dDiaAtual, unidade.horario_trabalho_fim).getTime();
        const intersticio = horasAfastamentoPausa(tInicioDia, tFimDia); /* Calula perído de afastamento e/ou pausa no dia atual */
        result.horasAfastamentosPausas += intersticio.length ? cargaHoraria : 0; /* Se tiver afastamento e/ou pausa no dia atual, considera o tempo do dia inteiro */
        /* Se houver algum afastamento ou pausa durante o horário de expediente, o dia tambem não será contado */
        //(lastDay || !firstDay) para considerar o proximo dia util
        if (!intersticio.length && (useCorridos || diaUtil)) {
          if(useTempo) { /* se for pra calcular a data fim, como é dia, será sempre a data na hora final do expediente, mas não importa, porque o que contará é somente o data sem hora */
            hTempo -= cargaHoraria;
            result.fim = new Date(tFimDia);
          } else { /* se for pra calcular o tempoUtil (lembrando que a quantidade de dias é tempoUtil / cargaHoraria) */
            result.tempoUtil += cargaHoraria;
          }
        }
      } else { /* calcula em horas */
        if(useCorridos || diaUtil) {
          const hIntervalo = this.util.getStrTimeHours(unidade.horario_trabalho_intervalo || "00:00");
          const hUteisDia = useCorridos ? 24 : Math.min(cargaHoraria, hExpediente, useTempo ? hTempo : hExpediente); /* Horas úteis diárias, se for corrido é 24h, se não então será o menor entre eles */
          const dInicioDia = firstDay ? inicio : this.util.setStrTime(dDiaAtual, useCorridos ? "00:00" : unidade.horario_trabalho_inicio); /* Inicio do expediente */
          const dFimDia = lastDay && !useTempo ? fimOuTempo as Date : this.util.minDate(this.util.addTimeHours(dInicioDia, hUteisDia + hIntervalo), this.util.setStrTime(dInicioDia, useCorridos ? "24:00" : unidade.horario_trabalho_fim))!; /* fim do expediente */
          const intersticio = horasAfastamentoPausa(dInicioDia.getTime(), dFimDia.getTime()); /* Calula perído de afastamento e/ou pausa no dia atual */
          const hUteis = Math.min(hUteisDia, this.util.getHoursBetween(dInicioDia, dFimDia)); /* Horas úteis aproveitáveis para os cálculos (considerando o inicio e fim da atividade) */
          const hAfastamentoPausa = Math.min(hUteis, this.util.getTimeHours(intersticio.reduce((a, v) => a + (v.end - v.start), 0))); /* Afastamento e/ou pausas no dia, em horas */
          const hSaldo = hUteis - hAfastamentoPausa; /* Calcula quantas horas realmente podem ser aproveitadas (sem afastamentos ou pausas) */
          result.horasAfastamentosPausas += hAfastamentoPausa;
          if(hSaldo) {
            if(useTempo) { /* calcula a data fim */
              hTempo -= hSaldo;
              result.fim = dFimDia;
            } else { /* calcula o tempoUtil */
              result.tempoUtil += hSaldo;
            }
          }
        }
      }
      dDiaAtual.setDate(dDiaAtual.getDate() + 1);
      result.dias_corridos++;
    }
    return result;
  }

}
