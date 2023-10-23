import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { BadgeButton } from 'src/app/components/badge/badge.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Afastamento } from 'src/app/models/afastamento.model';
import { Atividade, Checklist } from 'src/app/models/atividade.model';
import { Base } from 'src/app/models/base.model';
import { Comentario } from 'src/app/models/comentario';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { Unidade } from 'src/app/models/unidade.model';
import { AuthService } from 'src/app/services/auth.service';
import { CalendarService, FeriadoList } from 'src/app/services/calendar.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService, RouteMetadata } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';

export type ExtraAtividade = {
  planos_trabalho: { [plano_id: string]: PlanoTrabalho },
  afastamentos: { [usuario_id: string]: Afastamento[] },
  feriados?: { [unidade_id: string]: FeriadoList }
}

export type AtividadeOptionsMetadata = {
  disabled?: boolean,
  refreshId: (id: string) => Promise<any> | void;
  removeId: (id: string) => Promise<any> | void;
  refresh: () => Promise<any> | void;
}

export type AtividadeConsolidacoesMetadata = {
  id: string,
  status: string,
  data_conclusao: Date
}

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(
    public lookup: LookupService,
    public lex: LexicalService,
    public calendar: CalendarService,
    public comentario: ComentarioService,
    public auth: AuthService,
    public util: UtilService,
    public go: NavigateService,
    public dialog: DialogService,
    public dao: AtividadeDaoService
  ) { }

  public getStatus(row: any, consolidacao?: PlanoTrabalhoConsolidacao): BadgeButton[] {
    const atividade: Atividade = row as Atividade;
    const status = this.lookup.ATIVIDADE_STATUS.find(x => x.key == atividade.status) || { key: "DESCONHECIDO", value: "Desconhecido", icon: "bi bi-question-circle", color: "light" };
    let result: BadgeButton[] = [{ data: {status: status.key, filter: true}, label: status.value, icon: status.icon!, color: status.color! }];
    if (atividade.metadados?.atrasado) result.push({ data: {status: "ATRASADO", filter: false}, label: "Atrasado", icon: "bi bi-alarm", color: "danger" });
    if (consolidacao && ((atividade.data_inicio && this.util.asTimestamp(atividade.data_inicio) < this.util.asTimestamp(consolidacao.data_inicio)) ||
      (atividade.data_entrega && this.util.asTimestamp(atividade.data_entrega) > this.util.asTimestamp(consolidacao!.data_fim)))) {
      result.push({ data: {status: "EXTRAPOLADO", filter: false}, label: "Extrapolado", icon: "bi bi-arrow-left-right", color: "danger", hint: "Data de início ou conclusão " + this.lex.translate("da Atividade") + " extrapola os da consolidação" });
    }
    if (atividade.metadados?.arquivado) result.push({ data: {status: "ARQUIVADO", filter: false}, label: "Arquivado", icon: "bi bi-inboxes", color: "danger" });
    if (atividade.metadados && JSON.stringify(atividade.metadados._status) != JSON.stringify(result)) atividade.metadados._status = result;
    return atividade.metadados?._status || result;
  }

  public temposAtividade(row: Atividade, extra?: ExtraAtividade, despendidoClick?: (atividade: Atividade) => void): BadgeButton[] {
    /* Atualiza somente a cada mudança de minuto da unidade atual */
    if (row.metadados && row.metadados.extra?.lastUpdate != this.auth.unidadeHora) {
      let planoTrabalho = extra?.planos_trabalho[row.plano_trabalho_id!] || row.plano_trabalho;
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
      if (!row.metadados.concluido && this.util.asTimestamp(row.data_estipulada_entrega) < this.auth.hora.getTime()) {
        const atrasado = this.calendar.horasAtraso(row.data_estipulada_entrega, row.unidade!);
        tempos.push({ color: "danger", hint: "Tempo de atraso", icon: "bi bi-alarm", label: this.util.decimalToTimerFormated(atrasado, true) + " atrasado" });
      }
      row.metadados.extra = row.metadados.extra || {};
      row.metadados.extra.lastUpdate = this.auth.unidadeHora;
      row.metadados.extra.tempos = tempos;
    }
    return row.metadados?.extra?.tempos || [];
  }

  public onIdClick(numero: number) {
    this.util.copyToClipboard(numero.toString());
  }

  public buildEtiquetas(unidade?: Unidade, tipoAtividade?: TipoAtividade) {
    return this.util.merge(tipoAtividade?.etiquetas, unidade?.etiquetas, (a, b) => a.key == b.key);
  }

  public buildChecklist(tipoAtividade?: TipoAtividade, checklistControl?: AbstractControl) {
    let checks: Checklist[] = this.util.merge((tipoAtividade?.checklist || []).map(a => {
      return {
        id: a.key,
        texto: a.value,
        checked: false
      } as Checklist;
    }), (checklistControl?.value || []).filter((b: Checklist) => b.checked), (a: Checklist, b: Checklist) => {
      if(a.id == b.id) {
        a.checked = b.checked;
        return true;
      } else {
        return false;
      }
    });
    if(checklistControl) checklistControl.setValue(checks);
    return checks;
  }

  public comentarioAtividade(tipoAtividade?: TipoAtividade, comentariosControl?: AbstractControl) {
    let comentarios: Comentario[] = comentariosControl?.value || [];
    const index = comentarios.findIndex(x => x.tipo == "TIPO_ATIVIDADE");
    if(index >= 0) {
      if(comentarios[index]._status == "ADD") {
        comentarios.splice(index, 1);
      } else {
        comentarios[index]._status == "DELETE";
      }
    }
    if(tipoAtividade?.comentario?.length) {
      const comentario = new Comentario();
      comentario.id = this.dao!.generateUuid();
      comentario.path = "";
      comentario.texto = tipoAtividade.comentario;
      comentario.data_comentario = this.auth.hora;
      comentario.usuario_id = this.auth.usuario!.id;
      comentario.comentario_id = null;
      comentario.tipo = "TIPO_ATIVIDADE";
      comentario.usuario = this.auth.usuario;
      comentario._status = "ADD";
      comentarios.push(comentario);
      comentarios = this.comentario.orderComentarios(comentarios);
      if(comentariosControl) comentariosControl.setValue(comentarios);
    }
  }

  public modalRefreshId(metadata: AtividadeOptionsMetadata, entity: Base): RouteMetadata {
    return { modal: true, modalClose: async (modalResult?: string) => metadata.refreshId(entity.id) };
  }

  public modalRefresh(metadata: AtividadeOptionsMetadata) {
    return { modal: true, modalClose: metadata.refresh };
  }

  public delete = (metadata: AtividadeOptionsMetadata, atividade: Atividade) => {
    this.dialog.confirm("Exclui ?", "Deseja realmente excluir?").then(confirm => {
      if(confirm) {
        this.dao!.delete(atividade).then(() => {
          metadata.removeId(atividade.id);
          this.dialog.topAlert("Registro excluído com sucesso!", 5000);
        }).catch((error) => this.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error)));
      }
    });
  }

  public cancelarInicio = (metadata: AtividadeOptionsMetadata, atividade: Atividade) => {
    this.dialog.confirm("Cancelar inicio ?", "Deseja realmente cancelar a inicialização?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarInicio(atividade.id).then(() => {
          metadata.refreshId(atividade.id);
          this.dialog.topAlert("Cancelado a inicialização com sucesso!", 5000);
        }).catch((error) => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error));
      }
    });
  }

  public cancelarConclusao = (metadata: AtividadeOptionsMetadata, atividade: Atividade) => {
    this.dialog.confirm("Cancelar conclusão ?", "Deseja realmente cancelar a conclusão?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarConclusao(atividade.id).then(() => {
          metadata.refreshId(atividade.id);
          this.dialog.topAlert("Cancelado a conclusão com sucesso!", 5000);
        }).catch((error) => this.dialog.alert("Erro", "Erro ao cancelar conclusão: " + error?.message ? error?.message : error));
      }
    });
  }

  public desarquivar = (metadata: AtividadeOptionsMetadata, atividade: Atividade) => {
    this.dao!.arquivar(atividade.id, false).then(() => {
      metadata.refreshId(atividade.id);
    }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error));
  }

  public arquivar = (metadata: AtividadeOptionsMetadata, atividade: Atividade) => {
    this.dialog.confirm("Arquivar?", "Deseja realmente arquivar a atividade?").then(confirm => {
      if (confirm) {
        this.dao!.arquivar(atividade.id, true).then(() => {
          metadata.refreshId(atividade.id);
        }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error));
      }
    });
  }

  public lastConsolidacao(consolidacoes: AtividadeConsolidacoesMetadata[]): AtividadeConsolidacoesMetadata | undefined {
    return consolidacoes?.reduce((a: AtividadeConsolidacoesMetadata | undefined, v) => a = !a || this.util.asTimestamp(v.data_conclusao) > this.util.asTimestamp(a.data_conclusao) ? v : a, undefined);
  }

  public dynamicOptions = (row: any, metadata?: any): ToolbarButton[] => {
    let result: ToolbarButton[] = [];
    let atividade: Atividade = row as Atividade;
    const isGestor = this.auth.usuario?.id == atividade.unidade?.gestor?.id || this.auth.usuario?.id == atividade.unidade?.gestor_substituto?.id;
    const isDemandante = this.auth.usuario?.id == atividade.demandante_id;
    const isResponsavel = this.auth.usuario?.id == atividade.usuario_id;
    const lastConsolidacao = this.lastConsolidacao(row.metadados?.consolidacoes);
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'consult'] }, { modal: true }) };
    const BOTAO_COMENTARIOS = { label: "Comentários", icon: "bi bi-chat-left-quote", onClick: (atividade: Atividade) => this.go.navigate({ route: ['uteis', 'comentarios', 'ATIVIDADE', atividade.id, 'new'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_CLONAR = { label: "Clonar", icon: "bi bi-stickies", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'clonar'] }, this.modalRefresh(metadata)) };
    const BOTAO_ALTERAR = { label: "Alterar atividade", icon: "bi bi-pencil-square", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'edit'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_EXCLUIR = { label: "Excluir atividade", icon: "bi bi-trash", onClick: this.delete.bind(this, metadata) };
    const BOTAO_PRORROGAR_PRAZO = { label: "Prorrogar prazo", icon: "bi bi-skip-end-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'prorrogar'] }, this.modalRefreshId(metadata, atividade))};
    const BOTAO_INICIAR = { label: "Iniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_CANCELAR_INICIO = { label: "Cancelar inicio", id: "NAOINICIADO", icon: "bi bi-backspace", onClick: this.cancelarInicio.bind(this, metadata) };
    const BOTAO_ALTERAR_INICIO = { label: "Alterar inicio", icon: "bi bi-play-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_PAUSAR = { label: "Pausar", id: "PAUSADO", icon: "bi bi-pause-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_REINICIAR = { label: "Reiniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_CONCLUIR = { label: "Concluir", id: "CONCLUIDO", icon: "bi bi-check-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_ALTERAR_CONCLUSAO = { label: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_CANCELAR_CONCLUSAO = { label: "Cancelar conclusão", id: "INICIADO", icon: "bi bi-backspace", onClick: this.cancelarConclusao.bind(this, metadata) };
    const BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this, metadata) };
    const BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this, metadata) };

    if(!metadata?.disabled) {
      result.push(BOTAO_INFORMACOES);
      if (isResponsavel || isGestor || isDemandante) result.push(BOTAO_COMENTARIOS);
      result.push(BOTAO_CLONAR);
      if (atividade.metadados?.arquivado) { /* Arquivado */
        if (isGestor || isResponsavel) result.push(BOTAO_DESARQUIVAR);
      } else if (!atividade.metadados?.iniciado) {
        if (isResponsavel || (atividade.usuario_id == null) || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Não iniciado */
          result.push(BOTAO_INICIAR);
        }
        if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT')) {
          result.push(BOTAO_ALTERAR);
        }
        if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_EXCL') || this.auth.hasPermissionTo('MOD_DMD_NI_EXCL')) {
          if (result.length) result.push({ divider: true });
          result.push(BOTAO_EXCLUIR);
        }
      } else if (atividade.metadados?.concluido) { /* Concluído -> Gestor ou substituto pode avaliar */
        if (isGestor || isResponsavel) result.push(BOTAO_ARQUIVAR);
        if(lastConsolidacao?.status != "CONCLUIDO") { /* (RN_CSLD_9) */
          if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
            result.push(BOTAO_ALTERAR_CONCLUSAO);
          }
          if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_CONCL') ) {
            if (result.length) result.push({ divider: true });
            result.push(BOTAO_CANCELAR_CONCLUSAO);
          }
        }
      } else if (atividade.metadados?.iniciado) { /* Iniciado */
        if (atividade.metadados?.pausado) {
          if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Iniciada e Pausada */
            result.push(BOTAO_REINICIAR);
          }
        } else { /* Iniciada e não Suspensa */
          if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) result.push(BOTAO_CONCLUIR);
          if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_PAUSA')) result.push(BOTAO_PAUSAR);
          if (!lastConsolidacao || lastConsolidacao?.status == "INCLUIDO") { /* (RN_CSLD_9) */
            if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_INICIAR')) result.push(BOTAO_CANCELAR_INICIO);
            if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) result.push(BOTAO_ALTERAR_INICIO);
          }
        }
        if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_PPRZO')) {
          result.push(BOTAO_PRORROGAR_PRAZO);
        }
      }
    }
    return result;
  }

  public dynamicButtons = (row: any, metadata?: any): ToolbarButton[] => {
    let result: ToolbarButton[] = [];
    let atividade: Atividade = row as Atividade;
    const isGestor = this.auth.usuario?.id == atividade.unidade?.gestor?.id || this.auth.usuario?.id == atividade.unidade?.gestor_substituto?.id;
    const isResponsavel = this.auth.usuario?.id == atividade.usuario_id;
    const lastConsolidacao = this.lastConsolidacao(row.metadados?.consolidacoes);
    const BOTAO_ALTERAR_AVALIACAO = { hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'avaliar'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'consult'] }, { modal: true }) };
    const BOTAO_INICIAR = { hint: "Iniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_REINICIAR = { hint: "Reiniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_CONCLUIR = { hint: "Concluir", icon: "bi bi-check", color: "btn-outline-success", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(metadata, atividade)) };
    const BOTAO_ARQUIVAR = { hint: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this, metadata) };
    const BOTAO_DESARQUIVAR = { hint: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this, metadata) };
    const BOTAO_ALTERAR_CONCLUSAO = { hint: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(metadata, atividade)) };

    if(!metadata?.disabled) {
      if (!atividade.metadados?.iniciado) { /* Não iniciado */
        if (isResponsavel || (atividade.usuario_id == null) || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Usuário da atividade é o mesmo logado */
          result.push(BOTAO_INICIAR);
        }
      } else if (atividade.metadados?.concluido) { /* Concluído */
        if (isGestor || isResponsavel) {
          result.push(atividade.metadados?.arquivado ? BOTAO_DESARQUIVAR : BOTAO_ARQUIVAR);
        } else if (lastConsolidacao?.status != "CONCLUIDO" && (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL'))) { /* (RN_CSLD_9) */
          result.push(BOTAO_ALTERAR_CONCLUSAO);
        }
      } else if (atividade.metadados?.iniciado) { /* Iniciado */
        if (atividade.metadados?.pausado && isResponsavel) { /* Iniciada e Pausada */
          result.push(BOTAO_REINICIAR);
        } else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) { /* Iniciada e não Suspensa */
          result.push(BOTAO_CONCLUIR);
        }
      }
    }
    if(!result.length) result.push(BOTAO_INFORMACOES);
    return result;
  }
}
