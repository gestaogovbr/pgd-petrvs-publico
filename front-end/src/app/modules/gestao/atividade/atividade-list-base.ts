import { Injector, TemplateRef } from '@angular/core';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Atividade, AtividadeChecklist } from 'src/app/models/atividade.model';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { CalendarService, Efemerides, FeriadoList } from 'src/app/services/calendar.service';
import { Afastamento } from 'src/app/models/afastamento.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { BadgeButton } from 'src/app/components/badge/badge.component';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { AtividadeService, ExtraAtividade } from './atividade.service';

export abstract class AtividadeListBase extends PageListBase<Atividade, AtividadeDaoService> {
  public calendarEfemerides?: TemplateRef<any>;
  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public tipoAtividadeDao: TipoAtividadeDaoService;
  public tipoProcessoDao: TipoProcessoDaoService;
  public allPages: ListenerAllPagesService;
  public atividadeService: AtividadeService;
  public calendar: CalendarService;
  public comentario: ComentarioService;
  public extra: ExtraAtividade;
  public etiquetas: LookupItem[] = [];
  public checklist?: AtividadeChecklist[];
  public efemerides?: Efemerides;
  public addComentarioButton: ToolbarButton = {
    icon: "bi bi-plus-circle",
    hint: "Incluir comentário"
  }
  public DATAS_FILTRO: LookupItem[] = [
    { key: "DISTRIBUICAO", value: "Distribuição", icon: "bi bi-file-earmark-plus", color: "badge rounded-pill bg-warning text-dark" },
    { key: "PRAZO", value: "Prazo", icon: "bi bi-calendar-check", color: "badge rounded-pill bg-info text-dark" },
    { key: "CONCLUSAO", value: "Conclusão", icon: "bi bi-check-circle", color: "badge rounded-pill bg-info text-dark" }
  ];

  constructor(public injector: Injector) {
    super(injector, Atividade, AtividadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.tipoAtividadeDao = injector.get<TipoAtividadeDaoService>(TipoAtividadeDaoService);
    this.tipoProcessoDao = injector.get<TipoProcessoDaoService>(TipoProcessoDaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.atividadeService = injector.get<AtividadeService>(AtividadeService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.comentario = injector.get<ComentarioService>(ComentarioService);
    this.join = ["tipo_atividade", "demandante", "pausas", "usuario", "unidade", "comentarios.usuario", "tarefas.tarefa", "tarefas.comentarios.usuario"];
    /* Inicializações */
    this.extra = { planos_trabalho: {}, afastamentos: {} };
  }

  public onGridLoad(rows?: any[]) {
    /* Ordena os comentários */
    rows?.forEach((atividade: Atividade) => {
      atividade.comentarios = this.comentario.orderComentarios(atividade.comentarios);
    });
    /* Recebe informações extra da query para auxiliar em cálculos e melhorar performace da consulta */
    const extra = (this.grid?.query || this.query!).extra;
    if (extra) {
      //this.extra.avaliadores = Object.assign(this.extra.avaliadores, extra.avaliadores || {});
      this.extra.planos_trabalho = Object.assign(this.extra.planos_trabalho, extra.planos || {});
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

  public onDespendidoClick(row: Atividade) {
    if (row.metadados && !row.metadados.concluido) {
      const cargaHoraria = this.extra?.planos_trabalho[row.plano_trabalho_id!]?.carga_horaria || 0;
      const afastamentos = this.extra?.afastamentos[row.usuario_id!] || [];
      this.efemerides = this.calendar.calculaDataTempoUnidade(row.data_inicio!, this.auth.hora, cargaHoraria, row.unidade!, "ENTREGA", row.pausas, afastamentos);
      this.dialog.template({ title: "Cálculos do tempo despendido" }, this.calendarEfemerides!, []);
    }
  }

/*   public temposAtividade(row: Atividade): BadgeButton[] {
    // Atualiza somente a cada mudança de minuto da unidade atual
    if (row.metadados && row.metadados.extra?.lastUpdate != this.auth.unidadeHora) {
      let planoTrabalho = this.extra?.planos_trabalho[row.plano_trabalho_id!];
      let tempos: BadgeButton[] = [
        { color: "light", hint: this.lex.translate("Data de distribuição"), icon: "bi bi-file-earmark-plus", label: this.dao!.getDateTimeFormatted(row.data_distribuicao) },
        { color: "light", hint: this.lex.translate("Prazo de entrega"), icon: "bi bi-calendar-check", label: this.dao!.getDateTimeFormatted(row.data_estipulada_entrega) }
      ];
      if (planoTrabalho?.tipo_modalidade?.atividade_esforco) tempos.push({ color: "light", hint: this.lex.translate("Esforço"), icon: "bi bi-stopwatch", label: (row.esforco ? this.util.decimalToTimerFormated(row.esforco, true) + " " + this.lex.translate("esforço") : "Sem " + this.lex.translate("esforço"))});
      if (row.metadados.concluido) tempos.push({ color: "light", hint: "Data de entrega realizada", icon: "bi bi-check-circle", label: this.dao!.getDateTimeFormatted(row.data_entrega) });
      if (row.metadados.iniciado && !!planoTrabalho?.tipo_modalidade?.atividade_tempo_despendido) {
        const cargaHoraria = planoTrabalho?.carga_horaria || 0;
        const afastamentos = this.extra?.afastamentos[row.usuario_id!] || [];
        const despendido = row.metadados.concluido ? (row.tempo_despendido || 0) : this.calendar.horasUteis(row.data_inicio!, this.auth.hora, cargaHoraria, row.unidade!, "ENTREGA", row.pausas, afastamentos);
        tempos.push({ color: (despendido > row.esforco ? "warning" : "light"), hint: "Tempo despendido", icon: "bi bi-hourglass-split", label: this.util.decimalToTimerFormated(despendido, true) + " despendido", click: !row.metadados.concluido ? this.onDespendidoClick.bind(this) : undefined, data: row });
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
  } */

  public desarquivar(atividade: Atividade) {
    this.dao!.arquivar(atividade.id, false).then(() => {
      this.grid!.query!.refreshId(atividade.id);
    }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error));
  }

  public arquivar(atividade: Atividade) {
    this.dialog.confirm("Arquivar?", "Deseja realmente arquivar a atividade?").then(confirm => {
      if (confirm) {
        this.dao!.arquivar(atividade.id, true).then(() => {
          if (this.filter?.controls.arquivadas?.value) {
            this.grid!.query!.refreshId(atividade.id);
          } else {
            (this.grid?.query || this.query!).removeId(atividade.id);
          }
        }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error));
      }
    });
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let atividade: Atividade = row as Atividade;
    //const isAvaliador = isGestor || (this.extra.avaliadores[atividade.unidade_id] || []).includes(this.auth.usuario?.id || ""); //|| atividade.unidade
    const isGestor = this.auth.usuario?.id == atividade.unidade?.gestor?.id || this.auth.usuario?.id == atividade.unidade?.gestor_substituto?.id;
    const isDemandante = this.auth.usuario?.id == atividade.demandante_id;
    const isResponsavel = this.auth.usuario?.id == atividade.usuario_id;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'consult'] }, { modal: true }) };
    const BOTAO_COMENTARIOS = { label: "Comentários", icon: "bi bi-chat-left-quote", onClick: (atividade: Atividade) => this.go.navigate({ route: ['uteis', 'comentarios', 'ATIVIDADE', atividade.id, 'new'] }, this.modalRefreshId(atividade)) };
    const BOTAO_CLONAR = { label: "Clonar", icon: "bi bi-stickies", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'clonar'] }, this.modalRefresh()) };
    const BOTAO_ALTERAR = { label: "Alterar atividade", icon: "bi bi-pencil-square", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'edit'] }, this.modalRefreshId(atividade)) };
    const BOTAO_EXCLUIR = { label: "Excluir atividade", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    const BOTAO_PRORROGAR_PRAZO = { label: "Prorrogar prazo", icon: "bi bi-skip-end-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'prorrogar'] }, this.modalRefreshId(atividade))};
    const BOTAO_INICIAR = { label: "Iniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_CANCELAR_INICIO = { label: "Cancelar inicio", id: "NAOINICIADO", icon: "bi bi-backspace", onClick: this.cancelarInicio.bind(this) };
    const BOTAO_ALTERAR_INICIO = { label: "Alterar inicio", icon: "bi bi-play-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_PAUSAR = { label: "Pausar", id: "PAUSADO", icon: "bi bi-pause-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_REINICIAR = { label: "Reiniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(atividade)) };
    const BOTAO_CONCLUIR = { label: "Concluir", id: "CONCLUIDO", icon: "bi bi-check-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
    const BOTAO_ALTERAR_CONCLUSAO = { label: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
    const BOTAO_CANCELAR_CONCLUSAO = { label: "Cancelar conclusão", id: "INICIADO", icon: "bi bi-backspace", onClick: this.cancelarConclusao.bind(this) };
    //const BOTAO_AVALIAR = { label: "Avaliar", id: "AVALIADO", icon: "bi bi-star-half", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'avaliar'] }, this.modalRefreshId(atividade)) };
    //const BOTAO_ALTERAR_AVALIACAO = { label: "Alterar avaliação", hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'avaliar'] }, this.modalRefreshId(atividade)) };
    //const BOTAO_CANCELAR_AVALIACAO = { label: "Cancelar avaliação", id: "CONCLUIDO", icon: "bi bi-backspace", onClick: this.cancelarAvaliacao.bind(this) };
    const BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    const BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };

    result.push(BOTAO_INFORMACOES);
    if (isResponsavel || isGestor || isDemandante) result.push(BOTAO_COMENTARIOS);
    result.push(BOTAO_CLONAR);
    if (atividade.metadados?.arquivado) { /* Arquivado*/
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
      if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
        result.push(BOTAO_ALTERAR_CONCLUSAO);
      }
      if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_CONCL') ) {
        if (result.length) result.push({ divider: true });
        result.push(BOTAO_CANCELAR_CONCLUSAO);
      }
    } else if (atividade.metadados?.iniciado) { /* Iniciado */
      if (atividade.metadados?.pausado) {
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Iniciada e Pausada */
          result.push(BOTAO_REINICIAR);
        }
      } else { /* Iniciada e não Suspensa */
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) result.push(BOTAO_CONCLUIR);
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_PAUSA')) result.push(BOTAO_PAUSAR);
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_INICIAR')) result.push(BOTAO_CANCELAR_INICIO);
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) result.push(BOTAO_ALTERAR_INICIO);
      }
      if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_PPRZO')) {
        result.push(BOTAO_PRORROGAR_PRAZO);
      }
    }
    return result;
  }

  public cancelarInicio(atividade: Atividade) {
    const self = this;
    this.dialog.confirm("Cancelar inicio ?", "Deseja realmente cancelar a inicialização?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarInicio(atividade.id).then(function () {
          (self.grid?.query || self.query!).refreshId(atividade.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error);
        });
      }
    });
  }

  public cancelarConclusao(atividade: Atividade) {
    const self = this;
    this.dialog.confirm("Cancelar conclusão ?", "Deseja realmente cancelar a conclusão?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarConclusao(atividade.id).then(function () {
          (self.grid?.query || self.query!).refreshId(atividade.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar conclusão: " + error?.message ? error?.message : error);
        });
      }
    });
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let atividade: Atividade = row as Atividade;
    const isGestor = this.auth.usuario?.id == atividade.unidade?.gestor?.id || this.auth.usuario?.id == atividade.unidade?.gestor_substituto?.id;
    const isResponsavel = this.auth.usuario?.id == atividade.usuario_id;
    const BOTAO_ALTERAR_AVALIACAO = { hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'avaliar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'consult'] }, { modal: true }) };
    const BOTAO_INICIAR = { hint: "Iniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_REINICIAR = { hint: "Reiniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(atividade)) };
    const BOTAO_CONCLUIR = { hint: "Concluir", icon: "bi bi-check", color: "btn-outline-success", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
    const BOTAO_ARQUIVAR = { hint: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    const BOTAO_DESARQUIVAR = { hint: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
    const BOTAO_ALTERAR_CONCLUSAO = { hint: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };

    if (!atividade.metadados?.iniciado) { /* Não iniciado */
      if (isResponsavel || (atividade.usuario_id == null) || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Usuário da atividade é o mesmo logado */
        result.push(BOTAO_INICIAR);
      }
    } else if (atividade.metadados?.concluido) { /* Concluído */
      if (isGestor || isResponsavel) {
        result.push(atividade.metadados?.arquivado ? BOTAO_DESARQUIVAR : BOTAO_ARQUIVAR);
      } else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
        result.push(BOTAO_ALTERAR_CONCLUSAO);
      }
    } else if (atividade.metadados?.avaliado) { /* Avaliado */
      if (isGestor) { /* Usuário logado é gestor da Unidade ou substituto */
        result.push(BOTAO_ALTERAR_AVALIACAO);
      }
    } else if (atividade.metadados?.iniciado) { /* Iniciado */
      if (atividade.metadados?.pausado && isResponsavel) { /* Iniciada e Pausada */
        result.push(BOTAO_REINICIAR);
      } else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) { /* Iniciada e não Suspensa */
        result.push(BOTAO_CONCLUIR);
      }
    }
    if(!result.length) result.push(BOTAO_INFORMACOES);
    return result;
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
    this.go.navigate({ route: ['gestao', 'atividade', row.id, 'comentar'] }, { modal: true, modalClose: modalResult => { if (modalResult) (this.grid?.query || this.query!).refreshId(row.id); } });
  }

}

