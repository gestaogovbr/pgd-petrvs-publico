import { Injectable, Injector } from '@angular/core';
import * as moment from 'moment';
import { Afastamento } from '../models/afastamento.model';
import { DemandaPausa } from '../models/demanda-pausa.model';
import { Expediente, Turno } from '../models/expediente.model';
import { Unidade } from '../models/unidade.model';
import { AuthService } from './auth.service';
import { GlobalsService } from './globals.service';
import { LookupService } from './lookup.service';
import { ServerService } from './server.service';
import { Interval, TimeInterval, UtilService } from './util.service';

export type ResultadoCalculo = "DATA" | "TEMPO";
export type TipoContagem = "DISTRIBUICAO" | "ENTREGA";
export type FormaContagem = "HORAS_CORRIDAS" | "DIAS_CORRIDOS" | "HORAS_UTEIS" | "DIAS_UTEIS";
export type FeriadoList = { [data: string]: string };
export type FeriadosCadastrados = { [unidade_id: string]: FeriadoList }
export type FeriadosReligiosos = { [ano: string]: FeriadoList }
export type Efemerides = {
  resultado: ResultadoCalculo, /* Se a função está calculando Data Fim ou Tempo (em Tempo Útil) */
  dias_corridos: number, /* Numero de dias que foram usados para os cálculos */
  inicio: Date, /* Data inicio */
  fim: Date, /* Data/hora fim (Será calculado ou informado) */
  tempoUtil: number, /* horas (Caso seja dia, os dias serão tempoUtil / cargaHoraria, será calculado ou informado) */
  forma: FormaContagem, /* Forma de contagem */
  horasNaoUteis: number, /* Horas de Afastamento, Pausas e Intervalos do expediente */
  cargaHoraria: number, /* Carga horária para os cálculos (Será utilizado inclusive para o cálculo em dias) */
  expediente: Expediente, /* Expediente da unidade/entidade */
  afastamentos: Afastamento[], /* Afastamentos válidos no período */
  pausas: DemandaPausa[], /* Pausas */
  diasNaoUteis: FeriadoList, /* Dias sem expediente (ex.: Fins de semana) */
  feriados: FeriadoList, /* Feriados cadastrados e religiosos no período */
  diasDetalhes: ExpedienteDia[]
}

export type ExpedienteDia = {
  diaSemana: string;
  diaLiteral: string;
  tInicio: number;
  tFim: number;
  hExpediente: number,
  intervalos: Interval[];
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
  private _lookup?: LookupService;
  public get lookup(): LookupService { this._lookup = this._lookup || this.injector.get<LookupService>(LookupService); return this._lookup }

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
    result[moment(new Date(pascoaAno, pascoaMes, pascoaDia - 48, 0, 0, 0, 0)).format("YYYY-MM-DD")] = "2ª-feira Carnaval";
    result[moment(new Date(pascoaAno, pascoaMes, pascoaDia - 47, 0, 0, 0, 0)).format("YYYY-MM-DD")] = "3ª-feira Carnaval";
    result[moment(new Date(pascoaAno, pascoaMes, pascoaDia - 2, 0, 0, 0, 0)).format("YYYY-MM-DD")] = "6ª-feira Santa";
    result[moment(new Date(pascoaAno, pascoaMes, pascoaDia, 0, 0, 0, 0)).format("YYYY-MM-DD")] = "Páscoa";
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

  public isFeriadoCadastrado(data: Date, unidadeOuLista: Unidade | FeriadoList): string | undefined {
    let feriados: FeriadoList | undefined = unidadeOuLista.id ? this.feriadosCadastrados[unidadeOuLista.id] : unidadeOuLista as FeriadoList;
    if (feriados) {
      const isoData = moment(data).format("YYYY-MM-DD");
      return feriados[isoData] || feriados["0000" + isoData.substr(-6)];
    } else {
      throw new Error("Lista de feriados da unidade não carregada no sistema.");
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

  /* Refazer essa funcao usando expediente
  public isDiaUtil(data: Date, unidade: Unidade): boolean {
    return !this.isFeriadoCadastrado(data, unidade) && !this.isFeriadoReligioso(data) && !this.isFinalSemana(data);
  }*/

  public nestedExpediente(unidade: Unidade): Expediente {
    return unidade.expediente || unidade.entidade?.expediente || this.auth.entidade?.expediente || new Expediente();
    //expediente = expediente || (unidade.entidade_id == this.auth.unidade?.entidade_id ? this.auth.unidede.entidade!.expediente : new Expediente());
    //return expediente;
  }

  /* Retorna uma média entre os expedientes ou 24 h caso unidade seja undefined */
  public expedienteMedio(unidade: Unidade | undefined): number {
    if (unidade) {
      const soma = (total: number, next: Turno) => total + (this.util.getStrTimeHours(next.fim) - this.util.getStrTimeHours(next.inicio));
      let expediente = this.nestedExpediente(unidade);
      let diario = [
        expediente.domingo.reduce(soma, 0),
        expediente.segunda.reduce(soma, 0),
        expediente.terca.reduce(soma, 0),
        expediente.quarta.reduce(soma, 0),
        expediente.quinta.reduce(soma, 0),
        expediente.sexta.reduce(soma, 0),
        expediente.sabado.reduce(soma, 0),
        expediente.domingo.reduce(soma, 0)
      ].filter(x => x > 0);
      return diario.reduce((total: number, next: number) => total + next, 0) / diario.length;
    }
    return 24;
  }

  public prazo(inicio: Date, horas: number, cargaHoraria: number, unidade: Unidade, tipo: TipoContagem) {
    const feriados = this.feriadosCadastrados[unidade.id] || [];
    const forma = tipo == 'DISTRIBUICAO' ? unidade.distribuicao_forma_contagem_prazos : unidade.entrega_forma_contagem_prazos;
    const expediente = this.nestedExpediente(unidade);
    return this.calculaDataTempo(inicio, horas, forma, cargaHoraria, expediente, feriados).fim;
  }

  public horasUteis(inicio: Date, fim: Date, cargaHoraria: number, unidade: Unidade, tipo: TipoContagem, pausas?: DemandaPausa[], afastamentos?: Afastamento[]): number {
    const feriados = this.feriadosCadastrados[unidade.id] || [];
    const forma = tipo == 'DISTRIBUICAO' ? unidade.distribuicao_forma_contagem_prazos : unidade.entrega_forma_contagem_prazos;
    const expediente = this.nestedExpediente(unidade);
    return this.util.round(this.calculaDataTempo(inicio, fim, forma, cargaHoraria, expediente, feriados, pausas, afastamentos).tempoUtil, 2);
  }

  public horasAtraso(prazo_entrega: Date, unidade: Unidade) {
    return this.util.round(this.calculaDataTempo(prazo_entrega, this.auth.hora, "HORAS_CORRIDAS", 24).tempoUtil, 2);
  }

  public horasAdiantado(data_entrega: Date, prazo_entrega: Date, cargaHoraria: number, unidade: Unidade) {
    const expediente = this.nestedExpediente(unidade);
    return this.util.round(this.calculaDataTempo(data_entrega, prazo_entrega, unidade.entrega_forma_contagem_prazos, cargaHoraria, expediente).tempoUtil, 2);
  }

  public calculaDataTempoUnidade(inicio: Date, fimOuTempo: Date | number, cargaHoraria: number, unidade: Unidade, tipo: TipoContagem, pausas?: DemandaPausa[], afastamentos?: Afastamento[]) {
    let feriados = this.feriadosCadastrados[unidade.id] || [];
    if(!feriados.length) {
      this.loadFeriadosCadastrados(unidade.id);
      feriados = this.feriadosCadastrados[unidade.id] || [];
    }
    const forma = tipo == 'DISTRIBUICAO' ? unidade.distribuicao_forma_contagem_prazos : unidade.entrega_forma_contagem_prazos;
    const expediente = this.nestedExpediente(unidade);
    return this.calculaDataTempo(inicio, fimOuTempo, forma, cargaHoraria, expediente, feriados, pausas, afastamentos);
  }

  /*
  Função responsável por todos os cálculos de períodos no sistema.
  Obs.: As variáveis que armazenam tempo/data são iniciadas com as respectivas letras:
  - d: Data, do tipo Date do javascript
  - h: Tempo em formato de horas, de forma numérica, por exempo 01h30 será igual a 1.5
  - t: Tempo em formado de milissegundos (Date.getTime() do javascript)
  - u: Unidade de dia, é um formato semelhante ao timestamp, porem contado em dias
  - s: Hora em formato string (hh:mm(:ss)?)

  @param Date          inicio       Data e hora de inicio
  @param Date|number   fimOuTempo   Se a intenção for calcular a dataFim então será passado o tempo,
    caso passe uma dataFim será calculado o tempo. O tempo é calculado da seguinte form:
    1) Se forma for DIAS, então será sempre um mútiplo de cargaHoraria (dias = fimOuTempo / cargaHoraria)
    2) Se forma for HORAS, será as horas em forma decimal
  @param FormaContagem forma        Forma de contagem dos prazos (dias/horas úteis/corridos)
  @param number        cargaHoraria Carga horária que será considerada para os cálculos
  @param Expediente    expediente   Expediente que será utilizado para os cálculos. Não obrigatório caso seja dias/horas corridas.
  @param FeriadoList?  feriados
  @param DemandaPausa? pausas       Lista das pausas, quando aplicável
  @param Afastamento?  afastamentos Lista dos afastamento a partir da data Inicio para o usuario, quando aplicável
  @return Efemerides Retorna todas as informações do cálculo com as horas ou a data fim calculados
  */
  public calculaDataTempo(inicio: Date, fimOuTempo: Date | number, forma: FormaContagem, cargaHoraria?: number, expediente?: Expediente, feriados?: FeriadoList, pausas?: DemandaPausa[], afastamentos?: Afastamento[]): Efemerides {
    const useCorridos = forma == "DIAS_CORRIDOS" || forma == "HORAS_CORRIDAS";
    const useDias = forma == "DIAS_CORRIDOS" || forma == "DIAS_UTEIS";
    const useTempo = typeof fimOuTempo == "number"; /* Se o parametro fimOuTempo é DataFim ou Horas/Dias */
    const uDiasInicio = this.util.daystamp(inicio); /* Dia inicio (usado somente se !useTempo) */
    const uDiasFim = useTempo ? uDiasInicio : this.util.daystamp(fimOuTempo as Date); /* Dia fim (usado somente se !useTempo) */
    /* Verifica quando o expediente é obrigatório, e quando não for então expediente será undefined  */
    if (!expediente && !useCorridos) throw new Error("Expediente não informado");
    expediente = useCorridos ? undefined : expediente;
    /* Calcula as horas de afastamento */
    const horasAfastamento = (start: number, end: number): TimeInterval[] => {
      let periodos: TimeInterval[] = [];
      for (let afastamento of (afastamentos || [])) {
        /* calcula a intersecção entre start e end e o inicio e fim do afastamento */
        const intervalo = this.util.intersection([{ start, end }, { start: afastamento.inicio_afastamento.getTime(), end: afastamento.fim_afastamento.getTime() }]) as TimeInterval;
        if (intervalo && intervalo.start != intervalo.end) {
          /* Caso tenha uma intersecção, adiciona o período para retorno e insere em result.afastamentos */
          periodos.push(intervalo);
          if (!result.afastamentos.includes(afastamento)) result.afastamentos.push(afastamento);
        }
      }
      return periodos;
    }
    /* Calcula as horas pausadas */
    const horasPausas = (start: number, end: number): TimeInterval[] => {
      let periodos: TimeInterval[] = [];
      for (let pausa of (pausas || [])) {
        const intervalo = this.util.intersection([{ start, end }, { start: pausa.data_inicio.getTime(), end: pausa.data_fim?.getTime() || end }]) as TimeInterval;
        if (intervalo) {
          periodos.push(intervalo);
          if (!result.pausas.includes(pausa)) result.pausas.push(pausa);
        }
      }
      return periodos;
    }
    /* Calculo do expediente (inicio, fim, e intervalos. Considerando os especiais). Caso expediente seja undefined então será 24h, e caso não tenha expediente no dia será undefined */
    const expedienteDia = (sInicio?: string, sFim?: string): ExpedienteDia => {
      const diaSemana = this.lookup.getCode(this.lookup.DIA_SEMANA, dDiaAtual.getDay());
      const diaLiteral = this.lookup.getValue(this.lookup.DIA_SEMANA, dDiaAtual.getDay());
      const tLimiteInicio = this.util.setStrTime(dDiaAtual, sInicio || "00:00").getTime();
      const tLimiteFim = this.util.setStrTime(dDiaAtual, sFim || "24:00").getTime();
      let dia: ExpedienteDia = {
        diaSemana: diaSemana,
        diaLiteral: diaLiteral,
        tInicio: tLimiteInicio,
        tFim: tLimiteFim,
        hExpediente: this.util.getHoursBetween(tLimiteInicio, tLimiteFim),
        intervalos: []
      };
      if (expediente) {
        const diaIso = moment(dDiaAtual).format("YYYY-MM-DD");
        const especial = expediente.especial.filter(x => moment(x.data).format("YYYY-MM-DD") == diaIso)
        const turnos: Turno[] = [...expediente[diaSemana], ...especial.filter(x => !x.sem)].sort((a: Turno, b: Turno) => this.util.getStrTimeHours(a.inicio) - this.util.getStrTimeHours(b.inicio));
        /* Adiciona o expediente utilizado */
        result.expediente[diaSemana] = expediente[diaSemana];
        result.expediente.especial.push(...especial);
        if (turnos.length) {
          let tFimTurno: number | undefined = undefined;
          dia.tInicio = Math.max(tLimiteInicio, this.util.setStrTime(dDiaAtual, turnos[0].inicio).getTime());
          dia.tFim = Math.min(tLimiteFim, Math.max(this.util.setStrTime(dDiaAtual, turnos[0].fim).getTime(), dia.tInicio));
          /* Calcula o inicio e fim e adiciona intervalos, e soma os expedientes especiais COM expediente */
          for (let turno of turnos) {
            const tInicio = this.util.setStrTime(dDiaAtual, turno.inicio).getTime();
            const tFim = this.util.setStrTime(dDiaAtual, turno.fim).getTime();
            if (tLimiteInicio < tFim && tInicio < tLimiteFim) {
              if (tFimTurno && tFimTurno < tInicio) dia.intervalos.push({ start: tFimTurno, end: tInicio });
              dia.tInicio = Math.max(tLimiteInicio, Math.min(dia.tInicio, tInicio));
              dia.tFim = Math.min(tLimiteFim, Math.max(dia.tFim, tFim));
              tFimTurno = tFimTurno ? Math.max(tFimTurno, tFim) : tFim;
            }
          }
          dia.hExpediente = this.util.getHoursBetween(dia.tInicio, dia.tFim);
          /* Adiciona os expedientes especiais SEM expediente e faz a união com os intervalos já existentes do expediente */
          especial.filter(x => !!x.sem).forEach(x => dia.intervalos.push({ start: this.util.setStrTime(dDiaAtual, x.inicio).getTime(), end: this.util.setStrTime(dDiaAtual, x.fim).getTime() }));
          dia.intervalos = this.util.union(dia.intervalos);
          /* Filtra e ajusta os intervalos para caberem entre inicio e fim */
          dia.intervalos = dia.intervalos.filter(x => x.start <= dia.tFim && x.end >= dia.tInicio).map(x => Object.assign(x, { start: Math.max(x.start as number, dia.tInicio), end: Math.min(x.end as number, dia.tFim) }));
          /* Calcula as horas dos intervalos (os intervalos já estão unificados e ajustados para dentro do expediente)
          dia.hNaoUteis = dia.intervalos.reduce((a, v) => a + this.util.getHoursBetween(v.start, v.end), 0); */
        } else { /* Caso no dia não tenha nenhum turno ou horario especial com expediente */
          dia.tInicio = 0;
          dia.tFim = 0;
          dia.hExpediente = 0;
        }
      }
      return dia;
    }
    let hTempo = useTempo ? fimOuTempo as number : 0; /* variável saldo de horas/dias (usado somente se useTempo) */
    let dDiaAtual = new Date(inicio.getTime()); /* Variável que irá percorrer todas as datas (do inicio ao fim ou a quantidade de horas) */
    let result: Efemerides = { /* Variável que irá retonar todas as informações calculadas */
      resultado: useTempo ? "DATA" : "TEMPO",
      dias_corridos: 0,
      inicio: inicio,
      fim: !useTempo ? fimOuTempo as Date : new Date(inicio.getTime()),
      tempoUtil: useTempo ? fimOuTempo as number : 0,
      forma: forma,
      horasNaoUteis: 0,
      cargaHoraria: cargaHoraria || 24,
      expediente: new Expediente(),
      afastamentos: [],
      pausas: [],
      feriados: {},
      diasNaoUteis: {},
      diasDetalhes: []
    };
    cargaHoraria = forma == "HORAS_CORRIDAS" ? 24 : result.cargaHoraria; /* Garante que se a carga horária vier zerado, será considerado 24hrs */
    while (useTempo ? this.util.round(hTempo, 2) > 0 : this.util.daystamp(dDiaAtual) <= uDiasFim) {
      const firstDay = this.util.daystamp(dDiaAtual) == uDiasInicio;
      const lastDay = this.util.daystamp(dDiaAtual) == uDiasFim;
      const strDiaAtual = moment(dDiaAtual).format("YYYY-MM-DD"); /* Usado somente para indexar os vetores com a data do feriado/fds */
      const sInicio = useDias || !firstDay ? undefined : this.util.getTimeFormatted(inicio);
      const sFim = useDias || !lastDay || useTempo ? undefined : this.util.getTimeFormatted(fimOuTempo as Date);
      const diaAtual = expedienteDia(sInicio, sFim); /* Em caso de useTempo, sFim ainda não corresponde ao fim do expediente, será encontrado depois */
      /* Afastamentos e pausas baseados no inicio e fim do expediente */
      const afastamentos = horasAfastamento(diaAtual.tInicio, diaAtual.tFim);
      const pausas = horasPausas(diaAtual.tInicio, diaAtual.tFim);
      /* Se for dias corridos ou horas corridas não é necessário calcular Feriados */
      const feriadoCadastrado = useCorridos ? undefined : this.isFeriadoCadastrado(dDiaAtual, feriados || {});
      const feriadoReligioso = useCorridos ? undefined : this.isFeriadoReligioso(dDiaAtual);
      if (!useCorridos) {
        if (feriadoCadastrado) result.feriados[strDiaAtual] = feriadoCadastrado; /* Se feriado cadastrado, adiciona ao resultado */
        if (feriadoReligioso) result.feriados[strDiaAtual] = feriadoReligioso; /* Se feriado religioso, adiciona ao resultado */
      }
      /* Calcula se é dia útil ou não */
      const naoUteis = useCorridos ? [] : this.util.union([...afastamentos, ...pausas, ...diaAtual.intervalos]) as TimeInterval[];
      const hNaoUteis = naoUteis.reduce((a, v) => a + this.util.getHoursBetween(v.start, v.end), 0);
      const diaUtil = useCorridos || (!feriadoCadastrado && !feriadoReligioso && diaAtual.hExpediente > hNaoUteis);

      if (!diaUtil) result.diasNaoUteis[strDiaAtual] = [diaAtual.diaLiteral, feriadoCadastrado, feriadoReligioso, ].filter(x => x?.length).join(", ");
      /* Calculo em dias */
      if (useDias) {
        if (diaUtil && (useCorridos || (!afastamentos.length && !pausas.length))) {
          if (useTempo) { /* se for pra calcular a data fim, como é dia, será sempre a data na hora final do expediente, mas não importa, porque o que contará é somente o data sem hora */
            hTempo -= cargaHoraria;
            result.fim = new Date(diaAtual.tFim);
          } else { /* se for pra calcular o tempoUtil (lembrando que a quantidade de dias é tempoUtil / cargaHoraria) */
            result.tempoUtil += cargaHoraria;
          }
        } else {
          result.horasNaoUteis += cargaHoraria; /* Se o dia não for útil considera o tempo do dia inteiro */
        }
      } else { /* calcula em horas */
        if (diaUtil) {
          let hSaldo = Math.min(diaAtual.hExpediente - hNaoUteis, cargaHoraria, useTempo ? hTempo : 24);
          if (hSaldo) {
            if (useTempo) { /* calcula a data fim */
              hTempo -= hSaldo;
              const ultimoTurno = naoUteis.reduce((a, v) => {
                const hTurno = this.util.getHoursBetween(a, v.start);
                if (hTurno < hSaldo) {
                  hSaldo -= hTurno;
                  return v.end;
                }
                return a;
              }, diaAtual.tInicio);
              result.fim = this.util.addTimeHours(new Date(ultimoTurno), hSaldo);
              if(!hTempo){
                diaAtual.tFim = this.util.addTimeHours(new Date(ultimoTurno), hSaldo).getTime();
                diaAtual.hExpediente = hSaldo;
              }
            } else { /* calcula o tempoUtil */
              result.tempoUtil += hSaldo;
            }
          }
        } else {
          result.horasNaoUteis += Math.min(diaAtual.hExpediente, cargaHoraria);
        }
      }
      if(diaUtil) {
        result.diasDetalhes.push(diaAtual);
        result.diasDetalhes[result.diasDetalhes.length-1].intervalos = naoUteis;
      }
      dDiaAtual.setDate(dDiaAtual.getDate() + 1);
      result.dias_corridos++;
    }
    return result;
  }

}
/*
DIAS_CORRIDOS:
   * CargaHoraria = 24
   Calc. Horas:
      QtdDias = (DataFim - DataIni) (+1)
      horas = CargaHoraria * QtdDias
   Calc. DataFIm:
      QtdDias = Ceil(QtdHoras / CargaHoraria) (+1);
      DataFim = DataInicio + QtdDias

DIAS_UTEIS:
   * CargaHoraria = 24
   Calc. Horas:
      QtdDiasUteis = SOMA(DiaUtil = TemExpedienteNoDia && NaoTemAfastamento && NaoTemPausa)
      horas = CargaHoraria * QtdDiasUteis
   Calc. Data:
      QtdDias = Ceil(QtdHoras / CargaHoraria) (+1);
      diaAtual = DataInicio;
      while(QtdDias > 0)
         if(TemExpedienteNoDia && NaoTemAfastamento && NaoTemPausa) QtdDias--;
         diaAtual+1;
      DataTim = diaAtual;

HORAS_CORRIDAS:
    Calc. Horas:
        Horas = DataFim - DataInicio;
    Calc. DataFim:
        DataFim = DataInicio + QtdHoras;
        Obs.: o cálculo está considerando carga horária, quando deveria ser sempre 24h.

HORAS_UTEIS:
    Calc Horas:
        while(dataInicio ate DateFIm)
          horas += Min((Expediente) - (Afastamento) - (PausasDia), CargaHoraria)
    Calc DataFim
        SaldoQtdHoras = qtdHoras;
        Dia = DataInicio
        while(SaldoQtdHoras)
          hrsDia = Min((Expediente) - (Afastamento) - (PausasDia), CargaHoraria, SaldoQtdHoras);
          SaldoQtdHoras -= hrsDia
          Dia++
        DataFim = Dia + (Expediente.Fim - hrsDia);
*/
