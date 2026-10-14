import { inject, Injectable, signal } from '@angular/core';
import { ConsolidacaoApiClient } from '../infra/consolidacao-api.client';
import { ConcluirConsolidacaoUseCase } from './concluir-consolidacao.usecase';
import { AvaliarConsolidacaoUseCase } from './avaliar-consolidacao.usecase';
import { SolicitarRecursoUseCase } from './solicitar-recurso.usecase';
import { Consolidacao, ContribuicaoExecucao, NotaAvaliacao, Ocorrencia, OcorrenciaFormValue, TipoMotivoAfastamento } from '../domain/types';
import { TipoMotivoAfastamentoService } from 'src/app/v2/services/tipo-motivo-afastamento.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/v2/services/message.service';
import { finalize } from 'rxjs';

@Injectable()
export class ConsolidacaoFacade {
  private readonly api = inject(ConsolidacaoApiClient);
  private readonly concluirUC = inject(ConcluirConsolidacaoUseCase);
  private readonly avaliarUC = inject(AvaliarConsolidacaoUseCase);
  private readonly solicitarRecursoUC = inject(SolicitarRecursoUseCase);
  private readonly tipoMotivoApi = inject(TipoMotivoAfastamentoService);
  private readonly auth = inject(AuthService);
  private readonly message = inject(MessageService);

  private planoId = '';
  private onAfterMudancaStatusPlano?: () => void;

  // --- Estado principal ---
  readonly consolidacoes = signal<Consolidacao[]>([]);
  readonly notas = signal<NotaAvaliacao[]>([]);
  readonly dispensadas = signal<Set<string>>(new Set());

  // --- Confirmação genérica ---
  readonly confirmacaoPendente = signal<{ titulo: string; mensagem: string; onConfirmar: () => void } | null>(null);

  // --- Estado de atividades ---
  readonly textos = signal<Record<string, string>>({});
  readonly esforcosExecutados = signal<Record<string, number>>({});
  readonly editando = signal<Set<string>>(new Set());
  readonly salvando = signal<Set<string>>(new Set());

  // --- Estado de reabertura ---
  readonly reabrindoId = signal<string | null>(null);
  readonly justificativaReabrir = signal<string>('');
  readonly processandoAcaoId = signal<string | null>(null);

  // --- Estado de justificativa de carga horária (conclusão com divergência) ---
  readonly justificativaCargaHorariaPendente = signal<{ consolidacao: Consolidacao; total: number } | null>(null);
  readonly justificativaCargaHoraria = signal<string>('');
  // --- Estado de avaliação ---
  readonly notasSelecionadas = signal<Record<string, string>>({});
  readonly justificativasAvaliacao = signal<Record<string, string>>({});
  readonly avaliandoIds = signal<Set<string>>(new Set());
  readonly cancelandoAvaliacaoIds = signal<Set<string>>(new Set());

  // --- Estado de recurso ---
  readonly solicitandoRecursoAvaliacaoId = signal<string | null>(null);
  readonly justificativaRecurso = signal<string>('');
  readonly enviandoRecursoIds = signal<Set<string>>(new Set());

  // --- Estado de ocorrências ---
  readonly tiposMotivo = signal<TipoMotivoAfastamento[]>([]);
  readonly ocorrenciaEmEdicao = signal<{
    consolidacaoId: string;
    ocorrenciaId?: string;
    form: OcorrenciaFormValue;
  } | null>(null);
  readonly salvandoOcorrencia = signal(false);

  // --- Inicialização ---

  init(planoId: string, onAfterMudancaStatusPlano?: () => void): void {
    this.planoId = planoId;
    this.onAfterMudancaStatusPlano = onAfterMudancaStatusPlano;
    this.loadConsolidacoes();
    this.loadNotas();
    this.loadTiposMotivo();
    this.loadDispensas();
  }

  loadConsolidacoes(): void {
    this.api.getConsolidacoes(this.planoId).subscribe(consolidacoes => {
      this.consolidacoes.set(consolidacoes);
      this.inicializarTextos(consolidacoes);
    });
  }

  loadDispensas(): void {
    this.api.getDispensas(this.planoId).subscribe(ids => {
      this.dispensadas.set(new Set(ids));
    });
  }

  isDispensada(consolidacaoId: string): boolean {
    return this.dispensadas().has(consolidacaoId);
  }

  loadNotas(): void {
    this.api.getNotasConsolidacao(this.planoId).subscribe(notas => {
      notas.sort((a: NotaAvaliacao, b: NotaAvaliacao) => b.sequencia - a.sequencia);
      this.notas.set(notas);
    });
  }

  loadTiposMotivo(): void {
    this.tipoMotivoApi.listar().subscribe(tipos => {
      this.tiposMotivo.set(tipos);
    });
  }

  // --- Ocorrências ---

  getOcorrenciasConsolidacao(consolidacao: Consolidacao): Ocorrencia[] {
    return consolidacao.ocorrencias ?? [];
  }

  iniciarNovaOcorrencia(consolidacao: Consolidacao): void {
    this.ocorrenciaEmEdicao.set({
      consolidacaoId: consolidacao.id,
      form: {
        observacoes: '',
        data_inicio: consolidacao.data_inicio.substring(0, 10),
        data_fim: consolidacao.data_fim.substring(0, 10),
        tipo_motivo_afastamento_id: '',
        horas: '',
      },
    });
  }

  iniciarEdicaoOcorrencia(consolidacao: Consolidacao, ocorrencia: Ocorrencia): void {
    this.ocorrenciaEmEdicao.set({
      consolidacaoId: consolidacao.id,
      ocorrenciaId: ocorrencia.id,
      form: {
        observacoes: ocorrencia.observacoes ?? '',
        data_inicio: ocorrencia.data_inicio.substring(0, 10),
        data_fim: ocorrencia.data_fim.substring(0, 10),
        tipo_motivo_afastamento_id: ocorrencia.tipo_motivo_afastamento_id,
        horas: ocorrencia.horas != null ? String(ocorrencia.horas) : '',
      },
    });
  }

  cancelarOcorrencia(): void {
    this.ocorrenciaEmEdicao.set(null);
  }

  setOcorrenciaForm(partial: Partial<OcorrenciaFormValue>): void {
    this.ocorrenciaEmEdicao.update(e => e ? { ...e, form: { ...e.form, ...partial } } : null);
  }

  confirmarOcorrencia(): void {
    const edicao = this.ocorrenciaEmEdicao();
    if (!edicao) return;

    this.salvandoOcorrencia.set(true);
    const { form, ocorrenciaId } = edicao;
    const horas = form.horas ? Number(form.horas) : null;

    const obs = ocorrenciaId
      ? this.api.updateOcorrencia(this.planoId, ocorrenciaId, {
        observacoes: form.observacoes,
        tipo_motivo_afastamento_id: form.tipo_motivo_afastamento_id,
        horas: horas ?? undefined,
        data_inicio: form.data_inicio,
        data_fim: form.data_fim
      })
      : this.api.createOcorrencia(this.planoId, {
        observacoes: form.observacoes,
        data_inicio: form.data_inicio,
        data_fim: form.data_fim,
        tipo_motivo_afastamento_id: form.tipo_motivo_afastamento_id,
        ...(horas ? { horas } : {}),
      });

    obs.subscribe({
      next: (salva) => {
        this.consolidacoes.update(lista => lista.map(c => {
          if (c.id !== edicao.consolidacaoId) return c;
          const ocorrencias = ocorrenciaId
            ? (c.ocorrencias ?? []).map((o: Ocorrencia) => o.id === salva.id ? salva : o)
            : [...(c.ocorrencias ?? []), salva];
          return { ...c, ocorrencias };
        }));
        this.ocorrenciaEmEdicao.set(null);
        this.salvandoOcorrencia.set(false);
      },
      error: () => this.salvandoOcorrencia.set(false),
    });
  }

  excluirOcorrencia(consolidacaoId: string, ocorrencia: Ocorrencia): void {
    this.confirmacaoPendente.set({
      titulo: 'Excluir Ocorrência',
      mensagem: 'Deseja excluir esta ocorrência?',
      onConfirmar: () => {
        this.api.deleteOcorrencia(this.planoId, ocorrencia.id).subscribe(() => {
          this.consolidacoes.update(lista => lista.map(c => {
            if (c.id !== consolidacaoId) return c;
            return { ...c, ocorrencias: (c.ocorrencias ?? []).filter((o: Ocorrencia) => o.id !== ocorrencia.id) };
          }));
        });
      }
    });
  }

  // --- Contribuições de execução (por período) ---

  getContribuicoes(consolidacao: Consolidacao): ContribuicaoExecucao[] {
    return consolidacao.contribuicoes ?? [];
  }

  estaEditando(consolidacaoId: string, contribuicaoId: string): boolean {
    return this.editando().has(`${consolidacaoId}-${contribuicaoId}`);
  }

  getTexto(consolidacaoId: string, contribuicao: ContribuicaoExecucao): string {
    const key = `${consolidacaoId}-${contribuicao.id}`;
    return this.textos()[key] ?? contribuicao.descricao ?? '';
  }

  setTexto(consolidacaoId: string, contribuicaoId: string, valor: string): void {
    this.textos.update(t => ({ ...t, [`${consolidacaoId}-${contribuicaoId}`]: valor }));
  }

  getEsforcoExecutado(consolidacaoId: string, contribuicao: ContribuicaoExecucao): number {
    const key = `${consolidacaoId}-${contribuicao.id}`;
    const custom = this.esforcosExecutados()[key];
    if (custom !== undefined) {
      return custom;
    }
    return Number(contribuicao.esforco_executado ?? 0);
  }

  setEsforcoExecutado(consolidacaoId: string, contribuicaoId: string, valor: string): void {
    const parsed = Number(valor);
    this.esforcosExecutados.update(mapa => ({
      ...mapa,
      [`${consolidacaoId}-${contribuicaoId}`]: Number.isFinite(parsed) ? parsed : 0,
    }));
  }

  esforcoExecutadoValido(consolidacaoId: string, contribuicao: ContribuicaoExecucao): boolean {
    const value = this.getEsforcoExecutado(consolidacaoId, contribuicao);
    return value >= 0 && value <= 999.99;
  }

  estaRegistrada(contribuicao: ContribuicaoExecucao): boolean {
    return contribuicao.registrado_at !== null;
  }

  temAlteracao(consolidacao: Consolidacao, contribuicao: ContribuicaoExecucao): boolean {
    const textoAtual = this.getTexto(consolidacao.id, contribuicao).trim();
    const textoBase = (contribuicao.descricao ?? '').trim();
    const esforcoAtual = this.getEsforcoExecutado(consolidacao.id, contribuicao);
    const esforcoBase = Number(contribuicao.esforco_executado ?? 0);
    return textoAtual !== textoBase || esforcoAtual !== esforcoBase;
  }

  podeConfirmar(consolidacao: Consolidacao, contribuicao: ContribuicaoExecucao): boolean {
    const key = `${consolidacao.id}-${contribuicao.id}`;
    return !!this.getTexto(consolidacao.id, contribuicao).trim()
      && this.esforcoExecutadoValido(consolidacao.id, contribuicao)
      && !this.salvando().has(key);
  }

  iniciarEdicao(consolidacaoId: string, contribuicao: ContribuicaoExecucao): void {
    const key = `${consolidacaoId}-${contribuicao.id}`;
    this.textos.update(t => ({ ...t, [key]: contribuicao.descricao ?? '' }));
    this.esforcosExecutados.update(m => ({ ...m, [key]: Number(contribuicao.esforco_executado ?? 0) }));
    this.editando.update(s => new Set([...s, key]));
  }

  cancelarEdicao(consolidacaoId: string, contribuicao: ContribuicaoExecucao): void {
    const key = `${consolidacaoId}-${contribuicao.id}`;
    this.textos.update(t => ({ ...t, [key]: contribuicao.descricao ?? '' }));
    this.esforcosExecutados.update(m => ({ ...m, [key]: Number(contribuicao.esforco_executado ?? 0) }));
    this.editando.update(s => { const n = new Set(s); n.delete(key); return n; });
  }

  confirmarContribuicao(consolidacao: Consolidacao, contribuicao: ContribuicaoExecucao): void {
    const key = `${consolidacao.id}-${contribuicao.id}`;
    const descricao = this.getTexto(consolidacao.id, contribuicao).trim();
    const esforcoExecutado = this.getEsforcoExecutado(consolidacao.id, contribuicao);
    if (!descricao || !this.esforcoExecutadoValido(consolidacao.id, contribuicao)) return;

    this.salvando.update(s => new Set([...s, key]));

    this.api.updateContribuicao(this.planoId, consolidacao.id, contribuicao.id, {
      origem: this.resolverOrigem(contribuicao),
      plano_entrega_entrega_id: contribuicao.plano_entrega_entrega_id,
      orgao: contribuicao.orgao,
      descricao,
      esforco_executado: esforcoExecutado,
    }).subscribe({
      next: (salva) => {
        this.atualizarContribuicaoNaConsolidacao(consolidacao.id, salva);
        this.editando.update(s => { const n = new Set(s); n.delete(key); return n; });
        this.salvando.update(s => { const n = new Set(s); n.delete(key); return n; });
      },
      error: () => {
        this.salvando.update(s => { const n = new Set(s); n.delete(key); return n; });
      }
    });
  }

  excluirContribuicao(consolidacao: Consolidacao, contribuicao: ContribuicaoExecucao): void {
    this.confirmacaoPendente.set({
      titulo: 'Excluir Contribuição',
      mensagem: 'Deseja realmente excluir esta contribuição?',
      onConfirmar: () => {
        this.api.deleteContribuicao(this.planoId, consolidacao.id, contribuicao.id).subscribe(() => {
          this.consolidacoes.update(lista => lista.map(c => {
            if (c.id !== consolidacao.id) return c;
            return { ...c, contribuicoes: (c.contribuicoes ?? []).filter(x => x.id !== contribuicao.id) };
          }));
          this.message.success('Contribuição excluída com sucesso.');
        });
      }
    });
  }

  private resolverOrigem(contribuicao: ContribuicaoExecucao): string {
    if (contribuicao.plano_entrega_entrega_id) return 'PROPRIA_UNIDADE';
    if (contribuicao.orgao) return 'OUTRO_ORGAO';
    return 'SEM_ENTREGA';
  }

  private atualizarContribuicaoNaConsolidacao(consolidacaoId: string, contribuicao: ContribuicaoExecucao): void {
    this.consolidacoes.update(lista => lista.map(c => {
      if (c.id !== consolidacaoId) return c;
      const contribuicoes = (c.contribuicoes ?? []).map(x => x.id === contribuicao.id ? contribuicao : x);
      return { ...c, contribuicoes };
    }));
  }

  // --- Consolidação ---

  concluirConsolidacao(consolidacao: Consolidacao, justificativaCargaHoraria?: string | null): void {
    this.confirmacaoPendente.set({
      titulo: 'Finalizar Registro',
      mensagem: 'Ao finalizar este registro, a execução do Plano de Trabalho referente a este período será encaminhada para avaliação da chefia. Deseja confirmar?',
      onConfirmar: () => this.executarConclusao(consolidacao, justificativaCargaHoraria),
    });
  }

  /**
   * Abre o modal de justificativa quando a carga horária executada do período
   * diverge da planejada. `total` é o percentual executado exibido ao usuário.
   */
  iniciarJustificativaCargaHoraria(consolidacao: Consolidacao, total: number): void {
    this.justificativaCargaHoraria.set('');
    this.justificativaCargaHorariaPendente.set({ consolidacao, total });
  }

  cancelarJustificativaCargaHoraria(): void {
    this.justificativaCargaHorariaPendente.set(null);
    this.justificativaCargaHoraria.set('');
  }

  confirmarJustificativaCargaHoraria(): void {
    const pendente = this.justificativaCargaHorariaPendente();
    const justificativa = this.justificativaCargaHoraria().trim();
    if (!pendente || !justificativa) return;
    const consolidacao = pendente.consolidacao;
    this.cancelarJustificativaCargaHoraria();
    this.executarConclusao(consolidacao, justificativa);
  }

  private executarConclusao(consolidacao: Consolidacao, justificativaCargaHoraria?: string | null): void {
    this.processandoAcaoId.set(consolidacao.id);
    this.concluirUC.execute(this.planoId, consolidacao.id, justificativaCargaHoraria)
      .pipe(finalize(() => this.processandoAcaoId.set(null)))
      .subscribe((atualizado) => {
        this.consolidacoes.update(lista =>
          lista.map(c => c.id === consolidacao.id ? { ...c, ...atualizado } : c)
        );
        this.message.success('Registro concluído com sucesso.');
      });
  }

  iniciarReabertura(consolidacao: Consolidacao): void {
    this.reabrindoId.set(consolidacao.id);
    this.justificativaReabrir.set('');
  }

  cancelarReabertura(): void {
    this.reabrindoId.set(null);
    this.justificativaReabrir.set('');
  }

  confirmarReabertura(consolidacao: Consolidacao): void {
    const justificativa = this.justificativaReabrir().trim();
    if (!justificativa) return;

    this.confirmacaoPendente.set({
      titulo: 'Reabrir Registro',
      mensagem: 'Ao reabrir este registro, a execução do Plano de Trabalho referente a este período retornará para edição e ficará indisponível para avaliação até nova finalização. Deseja confirmar?',
      onConfirmar: () => {
        this.processandoAcaoId.set(consolidacao.id);
        this.api.reabrirConsolidacao(this.planoId, consolidacao.id, justificativa)
          .pipe(finalize(() => this.processandoAcaoId.set(null)))
          .subscribe((atualizado) => {
            this.consolidacoes.update(lista =>
              lista.map(c => c.id === consolidacao.id ? { ...c, ...atualizado } : c)
            );
            this.reabrindoId.set(null);
            this.justificativaReabrir.set('');
            this.message.success('Registro reaberto com sucesso.');
          });
      }
    });
  }

  // --- Avaliação ---

  getNotaSelecionada(consolidacaoId: string): string {
    return this.notasSelecionadas()[consolidacaoId] ?? '';
  }

  selecionarNota(consolidacaoId: string, notaId: string): void {
    this.notasSelecionadas.update(m => ({ ...m, [consolidacaoId]: notaId }));
  }

  getJustificativaAvaliacao(consolidacaoId: string): string {
    return this.justificativasAvaliacao()[consolidacaoId] ?? '';
  }

  setJustificativaAvaliacao(consolidacaoId: string, valor: string): void {
    this.justificativasAvaliacao.update(m => ({ ...m, [consolidacaoId]: valor }));
  }

  notaSelecionadaJustificaObrigatoria(consolidacaoId: string): boolean {
    const notaId = this.getNotaSelecionada(consolidacaoId);
    const nota = this.notas().find(n => n.id === notaId);
    return nota?.justifica === 1;
  }

  podeSubmeterAvaliacao(consolidacaoId: string): boolean {
    if (!this.getNotaSelecionada(consolidacaoId)) return false;
    if (this.notaSelecionadaJustificaObrigatoria(consolidacaoId)) {
      return !!this.getJustificativaAvaliacao(consolidacaoId).trim();
    }
    return true;
  }

  avaliarConsolidacao(consolidacao: Consolidacao): void {
    const notaId = this.getNotaSelecionada(consolidacao.id);
    if (!notaId) return;

    const justificativa = this.getJustificativaAvaliacao(consolidacao.id).trim() || undefined;

    const nota = this.notas().find(n => n.id === notaId);
    const isReavaliacao = consolidacao.avaliacoes?.length === 1 && !!consolidacao.avaliacoes[0].recurso;

    const mensagem = isReavaliacao ?
      `Você está atribuindo a nota ${nota?.nota ?? ''} para a reavaliação deste Plano de Trabalho, encerrando a instância recursal. Deseja confirmar?` :
      `Você está atribuindo a nota ${nota?.nota ?? ''} à execução deste período do Plano de Trabalho. Deseja confirmar?`;

    this.confirmacaoPendente.set({
      titulo: isReavaliacao ? 'Reavaliar Período' : 'Avaliar Período',
      mensagem: mensagem,
      onConfirmar: () => {
        this.avaliandoIds.update(s => new Set([...s, consolidacao.id]));

        this.avaliarUC.execute(this.planoId, consolidacao.id, { tipo_avaliacao_nota_id: notaId, justificativa }).subscribe({
          next: (avaliacao) => {
            this.consolidacoes.update(list => list.map(c => c.id === consolidacao.id
              ? { ...c, status: 'AVALIADO', avaliacoes: [...c.avaliacoes, { ...avaliacao, avaliador: { id: this.auth.usuario!.id, nome_exibicao: this.auth.usuario!.nome_exibicao } }] }
              : c
            ));
            this.avaliandoIds.update(s => { const n = new Set(s); n.delete(consolidacao.id); return n; });
            this.notasSelecionadas.update(m => { const n = { ...m }; delete n[consolidacao.id]; return n; });
            this.justificativasAvaliacao.update(m => { const n = { ...m }; delete n[consolidacao.id]; return n; });
            this.onAfterMudancaStatusPlano?.();
            this.message.success(isReavaliacao ? 'Reavaliação realizada com sucesso.' : 'Avaliação realizada com sucesso.');
          },
          error: () => {
            this.avaliandoIds.update(s => { const n = new Set(s); n.delete(consolidacao.id); return n; });
          }
        });
      }
    });
  }

  cancelarAvaliacao(consolidacao: Consolidacao, avaliacaoId: string): void {
    this.confirmacaoPendente.set({
      titulo: 'Cancelar Avaliação',
      mensagem: 'Deseja cancelar esta avaliação?',
      onConfirmar: () => {
        this.cancelandoAvaliacaoIds.update(s => new Set([...s, avaliacaoId]));
        this.api.cancelarAvaliacao(this.planoId, consolidacao.id, avaliacaoId).subscribe({
          next: () => {
            this.loadConsolidacoes();
            this.onAfterMudancaStatusPlano?.();
            this.cancelandoAvaliacaoIds.update(s => { const n = new Set(s); n.delete(avaliacaoId); return n; });
            this.message.success('Avaliação cancelada com sucesso.');
          },
          error: () => {
            this.cancelandoAvaliacaoIds.update(s => { const n = new Set(s); n.delete(avaliacaoId); return n; });
          },
        });
      }
    });
  }

  // --- Recurso ---

  iniciarSolicitacaoRecurso(avaliacaoId: string): void {
    this.solicitandoRecursoAvaliacaoId.set(avaliacaoId);
    this.justificativaRecurso.set('');
  }

  cancelarSolicitacaoRecurso(): void {
    this.solicitandoRecursoAvaliacaoId.set(null);
    this.justificativaRecurso.set('');
  }

  confirmarSolicitacaoRecurso(consolidacao: Consolidacao, avaliacaoId: string): void {
    const justificativa = this.justificativaRecurso().trim();
    if (!justificativa) return;

    this.confirmacaoPendente.set({
      titulo: 'Solicitar Recurso',
      mensagem: 'Ao recorrer desta avaliação, o período avaliativo seguirá para reavaliação. Deseja confirmar?',
      onConfirmar: () => {
        this.enviandoRecursoIds.update(s => new Set([...s, avaliacaoId]));
        this.solicitarRecursoUC.execute(this.planoId, consolidacao.id, justificativa).subscribe({
          next: () => {
            this.loadConsolidacoes();
            this.enviandoRecursoIds.update(s => { const n = new Set(s); n.delete(avaliacaoId); return n; });
            this.cancelarSolicitacaoRecurso();
            this.message.success('Recurso solicitado com sucesso.');
          },
          error: () => {
            this.enviandoRecursoIds.update(s => { const n = new Set(s); n.delete(avaliacaoId); return n; });
          }
        });
      }
    });
  }

  // --- Helpers privados ---

  private inicializarTextos(consolidacoes: Consolidacao[]): void {
    const mapa: Record<string, string> = {};
    for (const c of consolidacoes) {
      for (const contribuicao of (c.contribuicoes ?? [])) {
        mapa[`${c.id}-${contribuicao.id}`] = contribuicao.descricao ?? '';
      }
    }
    this.textos.set(mapa);
  }
}
