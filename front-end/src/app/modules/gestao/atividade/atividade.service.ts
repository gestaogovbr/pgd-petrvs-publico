import { Injectable } from '@angular/core';
import { BadgeButton } from 'src/app/components/badge/badge.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Afastamento } from 'src/app/models/afastamento.model';
import { Atividade } from 'src/app/models/atividade.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { AuthService } from 'src/app/services/auth.service';
import { CalendarService, FeriadoList } from 'src/app/services/calendar.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { LookupService } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';

export type ExtraAtividade = {
  planos_trabalho: { [plano_id: string]: PlanoTrabalho },
  afastamentos: { [usuario_id: string]: Afastamento[] },
  feriados?: { [unidade_id: string]: FeriadoList }
}

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(
    public lookup: LookupService,
    public lex: LexicalService,
    public calendar: CalendarService,
    public auth: AuthService,
    public util: UtilService,
    public dao: AtividadeDaoService
  ) { }

  public getStatus(row: any): BadgeButton[] {
    const atividade: Atividade = row as Atividade;
    const status = this.lookup.ATIVIDADE_STATUS.find(x => x.key == atividade.status?.codigo) || { key: "DESCONHECIDO", value: "Desconhecido", icon: "bi bi-question-circle", color: "light" };
    let result: BadgeButton[] = [{ data: {status: status.key, filter: true}, label: status.value, icon: status.icon!, color: status.color! }];
    if (atividade.metadados?.atrasado) result.push({ data: {status: "ATRASADO", filter: false}, label: "Atrasado", icon: "bi bi-alarm", color: "danger" });
    if (atividade.metadados?.arquivado) result.push({ data: {status: "ARQUIVADO", filter: false}, label: "Arquivado", icon: "bi bi-inboxes", color: "danger" });
    if (atividade.metadados && JSON.stringify(atividade.metadados._status) != JSON.stringify(result)) atividade.metadados._status = result;
    return atividade.metadados?._status || result;
  }

  public temposAtividade(row: Atividade, extra?: ExtraAtividade, despendidoClick?: (atividade: Atividade) => void): BadgeButton[] {
    /* Atualiza somente a cada mudança de minuto da unidade atual */
    if (row.metadados && row.metadados.extra?.lastUpdate != this.auth.unidadeHora) {
      let planoTrabalho = extra?.planos_trabalho[row.plano_trabalho_id!];
      let tempos: BadgeButton[] = [
        { color: "light", hint: this.lex.translate("Data de distribuição"), icon: "bi bi-file-earmark-plus", label: this.dao.getDateTimeFormatted(row.data_distribuicao) },
        { color: "light", hint: this.lex.translate("Prazo de entrega"), icon: "bi bi-calendar-check", label: this.dao.getDateTimeFormatted(row.data_estipulada_entrega) }
      ];
      if (planoTrabalho?.tipo_modalidade?.atividade_esforco) tempos.push({ color: "light", hint: this.lex.translate("Esforço"), icon: "bi bi-stopwatch", label: (row.esforco ? this.util.decimalToTimerFormated(row.esforco, true) + " " + this.lex.translate("esforço") : "Sem " + this.lex.translate("esforço"))});
      if (row.metadados.concluido) tempos.push({ color: "light", hint: "Data de entrega realizada", icon: "bi bi-check-circle", label: this.dao.getDateTimeFormatted(row.data_entrega) });
      if (row.metadados.iniciado && !!planoTrabalho?.tipo_modalidade?.atividade_tempo_despendido) {
        const cargaHoraria = planoTrabalho?.carga_horaria || 0;
        const afastamentos = extra?.afastamentos[row.usuario_id!] || [];
        const despendido = row.metadados.concluido ? (row.tempo_despendido || 0) : this.calendar.horasUteis(row.data_inicio!, this.auth.hora, cargaHoraria, row.unidade!, "ENTREGA", row.pausas, afastamentos);
        tempos.push({ color: (despendido > row.esforco ? "warning" : "light"), hint: "Tempo despendido", icon: "bi bi-hourglass-split", label: this.util.decimalToTimerFormated(despendido, true) + " despendido", click: !row.metadados.concluido ? despendidoClick : undefined, data: row });
      }
      if (!row.metadados.concluido && row.data_estipulada_entrega.getTime() < this.auth.hora.getTime()) {
        const atrasado = this.calendar.horasAtraso(row.data_estipulada_entrega, row.unidade!);
        tempos.push({ color: "danger", hint: "Tempo de atraso", icon: "bi bi-alarm", label: this.util.decimalToTimerFormated(atrasado, true) + " atrasado" });
      }
      row.metadados.extra = row.metadados.extra || {};
      row.metadados.extra.lastUpdate = this.auth.unidadeHora;
      row.metadados.extra.tempos = tempos;
    }
    return row.metadados?.extra?.tempos || [];
  }

}
