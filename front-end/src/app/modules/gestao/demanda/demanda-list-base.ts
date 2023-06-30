import { Usuario } from './../../../models/usuario.model';
import { Injector, TemplateRef } from '@angular/core';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Demanda, DemandaChecklist } from 'src/app/models/demanda.model';
import { DemandaDaoService } from 'src/app/dao/demanda-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { CalendarService, Efemerides, FeriadoList } from 'src/app/services/calendar.service';
import { Comentario } from 'src/app/models/comentario';
import { Afastamento } from 'src/app/models/afastamento.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { RouteMetadata } from 'src/app/services/navigate.service';
import { Plano } from 'src/app/models/plano.model';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { identifierModuleUrl } from '@angular/compiler';
import { ComentarioService } from 'src/app/services/comentario.service';

export type StatusDemanda = {
  key?: string,
  text: string,
  title?: string,
  icon: string,
  class: string,
  extra?: any,
  filter?: boolean,
  click?: (...args: any[]) => void
}

export type ExtraDemanda = {
  avaliadores: { [unidade_id: string]: string[] },
  planos: { [plano_id: string]: Plano },
  afastamentos: { [usuario_id: string]: Afastamento[] },
  feriados?: { [unidade_id: string]: FeriadoList }
}

export abstract class DemandaListBase extends PageListBase<Demanda, DemandaDaoService> {
  public calendarEfemerides?: TemplateRef<any>;
  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public atividadeDao: AtividadeDaoService;
  public tipoProcessoDao: TipoProcessoDaoService;
  public allPages: ListenerAllPagesService;
  public calendar: CalendarService;
  public comentario: ComentarioService;
  public extra: ExtraDemanda;
  public etiquetas: LookupItem[] = [];
  public checklist?: DemandaChecklist[];
  public efemerides?: Efemerides;
  public addComentarioButton: ToolbarButton = {
    icon: "bi bi-plus-circle",
    hint: "Incluir comentário"
  }
  public DATAS_FILTRO: LookupItem[] = [
    { key: "DISTRIBUICAO", value: "Distribuição", icon: "bi bi-file-earmark-plus", color: "badge rounded-pill bg-warning text-dark" },
    { key: "PRAZO", value: "Prazo", icon: "bi bi-calendar-check", color: "badge rounded-pill bg-info text-dark" },
    { key: "CONCLUSAO", value: "Conclusão", icon: "bi bi-check-circle", color: "badge rounded-pill bg-info text-dark" }
    //{ key: "AVALIACAO", value: "Avaliação", icon: "bi bi-star-half", color: "badge rounded-pill bg-success" }
  ];

  constructor(public injector: Injector) {
    super(injector, Demanda, DemandaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.tipoProcessoDao = injector.get<TipoProcessoDaoService>(TipoProcessoDaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.comentario = injector.get<ComentarioService>(ComentarioService);
    this.join = ["atividade", "demandante", "pausas", "usuario", "unidade", "comentarios.usuario", "entregas.tarefa", "entregas.comentarios.usuario"];
    /* Inicializações */
    this.extra = { avaliadores: {}, planos: {}, afastamentos: {} };
  }

  /*public orderComentarios(comentarios?: Comentario[]) {
    let ordered = comentarios?.sort((a: Comentario, b: Comentario) => {
      if(a.path == b.path) { /* Situação 1: Paths iguais 
        return a.data_hora.getTime() < b.data_hora.getTime() ? -1 : 1;
      } else { /* Situação 2: Paths diferentes, deverá ser encontrado o menor nível comum entre eles para poder comparar 
        let pathA = a.path.split("/");
        let pathB = b.path.split("/");
        let common = this.util.commonBegin(pathA, pathB);
        let dataHoraA = (comentarios.find(x => x.id == (pathA[common.length] || a.id)) || a).data_hora.getTime();
        let dataHoraB = (comentarios.find(x => x.id == (pathB[common.length] || b.id)) || b).data_hora.getTime();
        return dataHoraA == dataHoraB ? 0 : (dataHoraA < dataHoraB ? -1 : 1);
      }
    }) || [];
    return ordered;
  }*/

  public onGridLoad(rows?: any[]) {
    /* Ordena os comentários */
    rows?.forEach((demanda: Demanda) => {
      demanda.comentarios = this.comentario.orderComentarios(demanda.comentarios);
    });
    /* Recebe informações extra da query para auxiliar em cálculos e melhorar performace da consulta */
    const extra = (this.grid?.query || this.query!).extra;
    if (extra) {
      this.extra.avaliadores = Object.assign(this.extra.avaliadores, extra.avaliadores || {});
      this.extra.planos = Object.assign(this.extra.planos, extra.planos || {});
      for (let [key, value] of Object.entries(extra.afastamentos || {})) {
        this.extra.afastamentos[key] = (value as Array<Afastamento>).reduce((a, v) => {
          if (!a.find(x => x.id == v.id)) a.push(v);
          return a;
        }, this.extra.afastamentos[key] || []);
      }
      Object.entries(extra.feriados || {}).forEach(([key, value]) => {
        if (!this.calendar.feriadosCadastrados[key]) this.calendar.feriadosCadastrados[key] = value as FeriadoList;
      });
      this.cdRef.detectChanges();
    }
  }

  public onAtribuidasParaMimChange(event: Event) {
    if (this.filter!.controls.atribuidas_para_mim.value) {
      this.filter!.controls.usuario_id.setValue(this.auth.usuario!.id);
    } else {
      this.filter!.controls.usuario_id.setValue(undefined);
    }
  }

  public onSomenteUnidadeAtualChange(event: Event) {
    if (this.filter!.controls.somente_unidade_atual.value) {
      this.filter!.controls.unidade_id.setValue(this.auth.unidade!.id);
    } else {
      this.filter!.controls.unidade_id.setValue(undefined);
    }
  }

  public onDespendidoClick(row: Demanda) {
    if (row.metadados && !row.metadados.concluido) {
      const cargaHoraria = this.extra?.planos[row.plano_id!]?.carga_horaria || 0;
      const afastamentos = this.extra?.afastamentos[row.usuario_id!] || [];
      this.efemerides = this.calendar.calculaDataTempoUnidade(row.data_inicio!, this.auth.hora, cargaHoraria, row.unidade!, "ENTREGA", row.pausas, afastamentos);
      this.dialog.template({ title: "Cálculos do tempo despendido" }, this.calendarEfemerides!, []);
    }
  }

  public onTempoClick(btn: StatusDemanda) {
    if (btn.click) btn.click(btn.extra);
  }

  public temposDemanda(row: Demanda): StatusDemanda[] {
    /* Atualiza somente a cada mudança de minuto da unidade atual */
    if (row.metadados && row.metadados.extra?.lastUpdate != this.auth.unidadeHora) {
      let tempos: StatusDemanda[] = [
        { class: "badge bg-light text-dark", title: this.lex.noun("Data de distribuição"), icon: "bi bi-file-earmark-plus", text: this.dao!.getDateTimeFormatted(row.data_distribuicao) },
        { class: "badge bg-light text-dark", title: this.lex.noun("Prazo de entrega"), icon: "bi bi-calendar-check", text: this.dao!.getDateTimeFormatted(row.prazo_entrega) },
        { class: "badge bg-light text-dark", title: this.lex.noun("Tempo pactuado"), icon: "bi bi-stopwatch", text: (row.tempo_pactuado ? this.util.decimalToTimerFormated(row.tempo_pactuado, true) + " " + this.lex.noun("tempo pactuado") : this.lex.noun("Tempo pactuado") + " vazio")}
      ];
      if (row.metadados.concluido) tempos.push({ class: "badge bg-light text-dark", title: "Data de entrega realizada", icon: "bi bi-check-circle", text: this.dao!.getDateTimeFormatted(row.data_entrega) });
      if (row.metadados.iniciado && !!this.extra?.planos[row.plano_id!]?.tipo_modalidade?.calcula_tempo_despendido) {
        const cargaHoraria = this.extra?.planos[row.plano_id!]?.carga_horaria || 0;
        const afastamentos = this.extra?.afastamentos[row.usuario_id!] || [];
        const despendido = row.metadados.concluido ? (row.tempo_despendido || 0) : this.calendar.horasUteis(row.data_inicio!, this.auth.hora, cargaHoraria, row.unidade!, "ENTREGA", row.pausas, afastamentos);
        tempos.push({ class: "badge " + (despendido > row.tempo_pactuado ? "bg-warning" : "bg-light") + " text-dark", title: "Tempo despendido", icon: "bi bi-hourglass-split", text: this.util.decimalToTimerFormated(despendido, true) + " despendido", click: !row.metadados.concluido ? this.onDespendidoClick.bind(this) : undefined, extra: row });
      }
      if (!row.metadados.concluido && row.prazo_entrega.getTime() < this.auth.hora.getTime()) {
        const atrasado = this.calendar.horasAtraso(row.prazo_entrega, row.unidade!);
        tempos.push({ class: "badge bg-danger", title: "Tempo de atraso", icon: "bi bi-alarm", text: this.util.decimalToTimerFormated(atrasado, true) + " atrasado" });
      }
      row.metadados.extra = row.metadados.extra || {};
      row.metadados.extra.lastUpdate = this.auth.unidadeHora;
      row.metadados.extra.tempos = tempos;
    }
    return row.metadados?.extra?.tempos || [];
  }

  public desarquivar(demanda: Demanda) {
    this.dao!.arquivar(demanda.id, false).then(() => {
      this.grid!.query!.refreshId(demanda.id);
    }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error));
  }

  public arquivar(demanda: Demanda) {
    this.dialog.confirm("Arquivar?", "Deseja realmente arquivar a demanda?").then(confirm => {
      if (confirm) {
        this.dao!.arquivar(demanda.id, true).then(() => {
          if (this.filter?.controls.arquivadas?.value) {
            this.grid!.query!.refreshId(demanda.id);
          } else {
            (this.grid?.query || this.query!).removeId(demanda.id);
          }
        }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error));
      }
    });
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let demanda: Demanda = row as Demanda;
    const isGestor = this.auth.usuario?.id == demanda.unidade?.gestor_id || this.auth.usuario?.id == demanda.unidade?.gestor_substituto_id;
    const isAvaliador = isGestor || (this.extra.avaliadores[demanda.unidade_id] || []).includes(this.auth.usuario?.id || ""); //|| demanda.unidade
    const isDemandante = this.auth.usuario?.id == demanda.demandante_id;
    const isResponsavel = this.auth.usuario?.id == demanda.usuario_id;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'consult'] }, { modal: true }) };
    const BOTAO_COMENTARIOS = { label: "Comentários", icon: "bi bi-chat-left-quote", onClick: (demanda: Demanda) => this.go.navigate({ route: ['uteis', 'comentarios', 'DEMANDA', demanda.id, 'new'] }, this.modalRefreshId(demanda)) };
    const BOTAO_CLONAR = { label: "Clonar", icon: "bi bi-stickies", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'clonar'] }, this.modalRefresh()) };
    const BOTAO_ALTERAR = { label: "Alterar demanda", icon: "bi bi-pencil-square", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'edit'] }, this.modalRefreshId(demanda)) };
    const BOTAO_EXCLUIR = { label: "Excluir demanda", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    const BOTAO_PRORROGAR_PRAZO = { label: "Prorrogar prazo", icon: "bi bi-skip-end-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'prorrogar'] }, this.modalRefreshId(demanda))};
    const BOTAO_INICIAR = { label: "Iniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'iniciar'] }, this.modalRefreshId(demanda)) };
    const BOTAO_CANCELAR_INICIO = { label: "Cancelar inicio", id: "NAOINICIADO", icon: "bi bi-backspace", onClick: this.cancelarInicio.bind(this) };
    const BOTAO_ALTERAR_INICIO = { label: "Alterar inicio", icon: "bi bi-play-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'iniciar'] }, this.modalRefreshId(demanda)) };
    const BOTAO_SUSPENDER = { label: "Suspender", id: "PAUSADO", icon: "bi bi-pause-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'pausar'] }, this.modalRefreshId(demanda)) };
    const BOTAO_REINICIAR = { label: "Reiniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(demanda)) };
    const BOTAO_CONCLUIR = { label: "Concluir", id: "CONCLUIDO", icon: "bi bi-check-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'concluir'] }, this.modalRefreshId(demanda)) };
    const BOTAO_ALTERAR_CONCLUSAO = { label: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'concluir'] }, this.modalRefreshId(demanda)) };
    const BOTAO_CANCELAR_CONCLUSAO = { label: "Cancelar conclusão", id: "INICIADO", icon: "bi bi-backspace", onClick: this.cancelarConclusao.bind(this) };
    const BOTAO_AVALIAR = { label: "Avaliar", id: "AVALIADO", icon: "bi bi-star-half", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'avaliar'] }, this.modalRefreshId(demanda)) };
    const BOTAO_ALTERAR_AVALIACAO = { label: "Alterar avaliação", hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'avaliar'] }, this.modalRefreshId(demanda)) };
    const BOTAO_CANCELAR_AVALIACAO = { label: "Cancelar avaliação", id: "CONCLUIDO", icon: "bi bi-backspace", onClick: this.cancelarAvaliacao.bind(this) };
    const BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    const BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };

    result.push(BOTAO_INFORMACOES);
    if (isResponsavel || isGestor || isDemandante) result.push(BOTAO_COMENTARIOS);
    result.push(BOTAO_CLONAR);
    if (demanda.metadados?.arquivado) { /* Arquivado*/
      if (isGestor || isResponsavel) result.push(BOTAO_DESARQUIVAR);
    } else if (!demanda.metadados?.iniciado) {
      if (isResponsavel || (demanda.usuario_id == null) || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Não iniciado */
        result.push(BOTAO_INICIAR);
      }
      if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT')) {
        result.push(BOTAO_ALTERAR);
      }
      if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_EXCL') || this.auth.hasPermissionTo('MOD_DMD_NI_EXCL')) {
        if (result.length) result.push({ divider: true });
        result.push(BOTAO_EXCLUIR);
      }
    } else if (demanda.metadados?.avaliado) { /* Avaliado */
      if (isAvaliador || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_AVAL')) { /* Avaliado: Gestor ou substituto pode alterar*/
        result.push(BOTAO_ALTERAR_AVALIACAO, { divider: true }, BOTAO_ARQUIVAR, BOTAO_CANCELAR_AVALIACAO);
      }
    } else if (demanda.metadados?.concluido) { /* Concluído -> Gestor ou substituto pode avaliar */
      /*if (isAvaliador || this.auth.hasPermissionTo('MOD_DMD_USERS_AVAL')) {
        result.push(BOTAO_AVALIAR);
      }*/
      if (isGestor || isResponsavel) result.push(BOTAO_ARQUIVAR);
      if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
        result.push(BOTAO_ALTERAR_CONCLUSAO);
      }
      if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_CONCL') ) {
        if (result.length) result.push({ divider: true });
        result.push(BOTAO_CANCELAR_CONCLUSAO);
      }
    } else if (demanda.metadados?.iniciado) { /* Iniciado */
      if (demanda.metadados?.suspenso) {
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Iniciada e Suspensa */
          result.push(BOTAO_REINICIAR);
        }
      } else { /* Iniciada e não Suspensa */
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) result.push(BOTAO_CONCLUIR);
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_PAUSA')) result.push(BOTAO_SUSPENDER);
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_INICIAR')) result.push(BOTAO_CANCELAR_INICIO);
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) result.push(BOTAO_ALTERAR_INICIO);
      }
      if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_PPRZO')) {
        result.push(BOTAO_PRORROGAR_PRAZO);
      }
    }
    return result;
  }

  public cancelarInicio(demanda: Demanda) {
    const self = this;
    this.dialog.confirm("Cancelar inicio ?", "Deseja realmente cancelar a inicialização?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarInicio(demanda.id).then(function () {
          (self.grid?.query || self.query!).refreshId(demanda.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error);
        });
      }
    });
  }

  public cancelarConclusao(demanda: Demanda) {
    const self = this;
    this.dialog.confirm("Cancelar conclusão ?", "Deseja realmente cancelar a conclusão?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarConclusao(demanda.id).then(function () {
          (self.grid?.query || self.query!).refreshId(demanda.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar conclusão: " + error?.message ? error?.message : error);
        });
      }
    });
  }

  public cancelarAvaliacao(demanda: Demanda) {
    const self = this;
    this.dialog.confirm("Cancelar avaliacao ?", "Deseja realmente cancelar a avaliacao?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarAvaliacao(demanda.id).then(function () {
          (self.grid?.query || self.query!).refreshId(demanda.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar avaliacao: " + error?.message ? error?.message : error);
        });
      }
    });
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let demanda: Demanda = row as Demanda;
    const isGestor = this.auth.usuario?.id == demanda.unidade?.gestor_id || this.auth.usuario?.id == demanda.unidade?.gestor_substituto_id;
    const isAvaliador = isGestor || (this.extra.avaliadores[demanda.unidade_id] || []).includes(this.auth.usuario?.id || ""); //|| demanda.unidade
    const isDemandante = this.auth.usuario?.id == demanda.demandante_id;
    const isResponsavel = this.auth.usuario?.id == demanda.usuario_id;
    const BOTAO_ALTERAR_AVALIACAO = { hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'avaliar'] }, this.modalRefreshId(demanda)) };
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'consult'] }, { modal: true }) };
    const BOTAO_INICIAR = { hint: "Iniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'iniciar'] }, this.modalRefreshId(demanda)) };
    const BOTAO_AVALIAR = { hint: "Avaliar", icon: "bi bi-star-half", color: "btn-outline-success", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'avaliar'] }, this.modalRefreshId(demanda)) };
    const BOTAO_REINICIAR = { hint: "Reiniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(demanda)) };
    const BOTAO_CONCLUIR = { hint: "Concluir", icon: "bi bi-check", color: "btn-outline-success", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'concluir'] }, this.modalRefreshId(demanda)) };
    const BOTAO_ARQUIVAR = { hint: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    const BOTAO_DESARQUIVAR = { hint: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
    const BOTAO_ALTERAR_CONCLUSAO = { hint: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (demanda: Demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'concluir'] }, this.modalRefreshId(demanda)) };

    if (demanda.metadados?.avaliado) { /* Arquivado */
      if (isAvaliador || this.auth.hasPermissionTo('MOD_DMD_USERS_AVAL')) { /* Usuário logado é gestor da Unidade ou substituto*/
        result.push(BOTAO_ALTERAR_AVALIACAO);
      } else if (demanda.metadados?.arquivado && (isGestor || isResponsavel)) { //Somente se gestor ou com capacidade para essa operação
        result.push(BOTAO_DESARQUIVAR);
      }
    } else if (!demanda.metadados?.iniciado) { /* Não iniciado */
      if (isResponsavel || (demanda.usuario_id == null) || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Usuário da demanda é o mesmo logado */
        result.push(BOTAO_INICIAR);
      }
    } else if (demanda.metadados?.concluido) { /* Concluído */
      /*if (isAvaliador || this.auth.hasPermissionTo('MOD_DMD_USERS_AVAL')) { /* Usuário logado é gestor da Unidade ou substituto * /
          result.push(BOTAO_AVALIAR);
      }*/
      if (isGestor || isResponsavel) {
        result.push(demanda.metadados?.arquivado ? BOTAO_DESARQUIVAR : BOTAO_ARQUIVAR);
      } else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
        result.push(BOTAO_ALTERAR_CONCLUSAO);
      }
    } else if (demanda.metadados?.avaliado) { /* Avaliado */
      if (isGestor) { /* Usuário logado é gestor da Unidade ou substituto */
        result.push(BOTAO_ALTERAR_AVALIACAO);
      }
    } else if (demanda.metadados?.iniciado) { /* Iniciado */
      if (demanda.metadados?.suspenso && isResponsavel) { /* Iniciada e Suspensa */
        result.push(BOTAO_REINICIAR);
      } else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) { /* Iniciada e não Suspensa */
        result.push(BOTAO_CONCLUIR);
      }
    }
    if(!result.length) result.push(BOTAO_INFORMACOES);
    return result;
  }

  public getStatus(row: any): StatusDemanda[] {
    const demanda: Demanda = row as Demanda;
    const status = this.lookup.DEMANDA_STATUS.find(x => x.key == demanda.metadados?.status) || { key: "DESCONHECIDO", value: "Desconhecido", icon: "bi bi-question-circle", color: "badge rounded-pill bg-light text-dark" };
    let result: StatusDemanda[] = [{ key: status.key, text: status.value, icon: status.icon!, class: status.color!, filter: true }];
    if (demanda.metadados?.atrasado) result.push({ key: "ATRASADO", text: "Atrasado", icon: "bi bi-alarm", class: "badge rounded-pill bg-danger", filter: false });
    if (demanda.metadados?.suspenso) result.push({ key: "SUSPENSO", text: "Suspenso", icon: "bi bi-pause-circle", class: "badge rounded-pill bg-danger", filter: false });
    if (demanda.metadados?.arquivado) result.push({ key: "ARQUIVADO", text: "Arquivado", icon: "bi bi-inboxes", class: "badge rounded-pill bg-danger", filter: false });
    if (demanda.metadados && JSON.stringify(demanda.metadados._status) != JSON.stringify(result)) demanda.metadados._status = result;
    return demanda.metadados?._status || result;
  }

  /*public getEtiquetaStyle(etiqueta: any) {
    const bgColor = etiqueta.color || "#000000";
    const txtColor = this.util.contrastColor(bgColor);
    return `background-color: ${bgColor}; color: ${txtColor};`;
  }*/

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.id_processo, row.id_requisicao);
  }

  public onEtiquetaConfigClick() {
    this.go.navigate({ route: ["configuracoes", "preferencia", "usuario", this.auth.usuario!.id], params: { etiquetas: true } }, {
      modal: true, modalClose: (modalResult) => {
        this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario!.config?.etiquetas, (a, b) => a.key == b.key);
        this.cdRef.detectChanges();
      }
    });
  }

  public comentarioClick(element: HTMLSpanElement) {
    const value = element.getAttribute("data-expanded");
    element.setAttribute("data-expanded", value == "true" ? "false" : "true");
  }

  public addComentarioClick(row: any) {
    this.go.navigate({ route: ['gestao', 'demanda', row.id, 'comentar'] }, { modal: true, modalClose: modalResult => { if (modalResult) (this.grid?.query || this.query!).refreshId(row.id); } });
  }

}

