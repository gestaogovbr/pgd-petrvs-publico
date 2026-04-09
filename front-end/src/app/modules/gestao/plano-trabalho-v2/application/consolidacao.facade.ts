import { inject, Injectable, signal } from '@angular/core';
import { ConsolidacaoApiClient } from '../infra/consolidacao-api.client';
import { ConcluirConsolidacaoUseCase } from './concluir-consolidacao.usecase';
import { AvaliarConsolidacaoUseCase } from './avaliar-consolidacao.usecase';
import { SolicitarRecursoUseCase } from './solicitar-recurso.usecase';
import { AtividadeConsolidacao, Consolidacao, NotaAvaliacao, PlanoTrabalhoEntrega } from '../domain/types';

@Injectable()
export class ConsolidacaoFacade {
  private readonly api = inject(ConsolidacaoApiClient);
  private readonly concluirUC = inject(ConcluirConsolidacaoUseCase);
  private readonly avaliarUC = inject(AvaliarConsolidacaoUseCase);
  private readonly solicitarRecursoUC = inject(SolicitarRecursoUseCase);

  private planoId = '';

  // --- Estado principal ---
  readonly consolidacoes = signal<Consolidacao[]>([]);
  readonly notas = signal<NotaAvaliacao[]>([]);

  // --- Estado de atividades ---
  readonly textos = signal<Record<string, string>>({});
  readonly editando = signal<Set<string>>(new Set());
  readonly salvando = signal<Set<string>>(new Set());

  // --- Estado de reabertura ---
  readonly reabrindoId = signal<string | null>(null);
  readonly justificativaReabrir = signal<string>('');

  // --- Estado de avaliação ---
  readonly notasSelecionadas = signal<Record<string, string>>({});
  readonly justificativasAvaliacao = signal<Record<string, string>>({});
  readonly avaliandoIds = signal<Set<string>>(new Set());

  // --- Estado de recurso ---
  readonly solicitandoRecursoAvaliacaoId = signal<string | null>(null);
  readonly justificativaRecurso = signal<string>('');
  readonly enviandoRecursoIds = signal<Set<string>>(new Set());

  // --- Inicialização ---

  init(planoId: string): void {
    this.planoId = planoId;
    this.loadConsolidacoes();
    this.loadNotas();
  }

  loadConsolidacoes(): void {
    this.api.getConsolidacoes(this.planoId).subscribe(consolidacoes => {
      this.consolidacoes.set(consolidacoes);
      this.inicializarTextos(consolidacoes);
    });
  }

  loadNotas(): void {
    this.api.getNotasConsolidacao(this.planoId).subscribe(notas => {
      notas.sort((a: NotaAvaliacao, b: NotaAvaliacao) => b.sequencia - a.sequencia);
      this.notas.set(notas);
    });
  }

  // --- Atividades ---

  getAtividade(consolidacao: Consolidacao, entregaId: string): AtividadeConsolidacao | null {
    return (consolidacao.atividades ?? []).find(a => a.plano_trabalho_entrega_id === entregaId) ?? null;
  }

  estaEditando(consolidacaoId: string, entregaId: string): boolean {
    return this.editando().has(`${consolidacaoId}-${entregaId}`);
  }

  getTexto(consolidacaoId: string, entregaId: string): string {
    return this.textos()[`${consolidacaoId}-${entregaId}`] ?? '';
  }

  setTexto(consolidacaoId: string, entregaId: string, valor: string): void {
    this.textos.update(t => ({ ...t, [`${consolidacaoId}-${entregaId}`]: valor }));
  }

  iniciarEdicao(consolidacaoId: string, entregaId: string, textoAtual: string): void {
    this.textos.update(t => ({ ...t, [`${consolidacaoId}-${entregaId}`]: textoAtual }));
    this.editando.update(s => new Set([...s, `${consolidacaoId}-${entregaId}`]));
  }

  cancelarEdicao(consolidacaoId: string, entregaId: string, atividade: AtividadeConsolidacao | null): void {
    const key = `${consolidacaoId}-${entregaId}`;
    this.textos.update(t => ({ ...t, [key]: atividade?.descricao ?? '' }));
    this.editando.update(s => { const n = new Set(s); n.delete(key); return n; });
  }

  confirmarAtividade(consolidacao: Consolidacao, entrega: PlanoTrabalhoEntrega): void {
    const key = `${consolidacao.id}-${entrega.id}`;
    const descricao = this.textos()[key]?.trim();
    if (!descricao) return;

    const atividade = this.getAtividade(consolidacao, entrega.id);
    this.salvando.update(s => new Set([...s, key]));

    const obs = atividade
      ? this.api.updateAtividade(this.planoId, consolidacao.id, atividade.id, { descricao })
      : this.api.createAtividade(this.planoId, consolidacao.id, { plano_trabalho_entrega_id: entrega.id, descricao });

    obs.subscribe({
      next: (atividadeSalva) => {
        this.atualizarAtividadeNaConsolidacao(consolidacao.id, entrega.id, atividadeSalva);
        this.editando.update(s => { const n = new Set(s); n.delete(key); return n; });
        this.salvando.update(s => { const n = new Set(s); n.delete(key); return n; });
      },
      error: () => {
        this.salvando.update(s => { const n = new Set(s); n.delete(key); return n; });
      }
    });
  }

  excluirAtividade(consolidacao: Consolidacao, entrega: PlanoTrabalhoEntrega): void {
    const atividade = this.getAtividade(consolidacao, entrega.id);
    if (!atividade || !confirm('Deseja realmente excluir este registro de execução?')) return;

    this.api.deleteAtividade(this.planoId, consolidacao.id, atividade.id).subscribe(() => {
      this.atualizarAtividadeNaConsolidacao(consolidacao.id, entrega.id, null);
      const key = `${consolidacao.id}-${entrega.id}`;
      this.textos.update(t => ({ ...t, [key]: '' }));
      this.editando.update(s => { const n = new Set(s); n.delete(key); return n; });
    });
  }

  // --- Consolidação ---

  concluirConsolidacao(consolidacao: Consolidacao): void {
    this.concluirUC.execute(this.planoId, consolidacao.id).subscribe({
      next: (atualizado) => {
        this.consolidacoes.update(lista =>
          lista.map(c => c.id === consolidacao.id ? { ...c, ...atualizado } : c)
        );
      }
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

    this.api.reabrirConsolidacao(this.planoId, consolidacao.id, justificativa).subscribe({
      next: (atualizado) => {
        this.consolidacoes.update(lista =>
          lista.map(c => c.id === consolidacao.id ? { ...c, ...atualizado } : c)
        );
        this.reabrindoId.set(null);
        this.justificativaReabrir.set('');
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
    this.avaliandoIds.update(s => new Set([...s, consolidacao.id]));

    this.avaliarUC.execute(this.planoId, consolidacao.id, { tipo_avaliacao_nota_id: notaId, justificativa }).subscribe({
      next: () => {
        this.loadConsolidacoes();
        this.avaliandoIds.update(s => { const n = new Set(s); n.delete(consolidacao.id); return n; });
        this.notasSelecionadas.update(m => { const n = { ...m }; delete n[consolidacao.id]; return n; });
        this.justificativasAvaliacao.update(m => { const n = { ...m }; delete n[consolidacao.id]; return n; });
      },
      error: () => {
        this.avaliandoIds.update(s => { const n = new Set(s); n.delete(consolidacao.id); return n; });
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

    if (!confirm('Ao recorrer desta avaliação, o período avaliativo seguirá para reavaliação. Deseja confirmar?')) return;

    this.enviandoRecursoIds.update(s => new Set([...s, avaliacaoId]));

    this.solicitarRecursoUC.execute(this.planoId, consolidacao.id, justificativa).subscribe({
      next: () => {
        this.loadConsolidacoes();
        this.enviandoRecursoIds.update(s => { const n = new Set(s); n.delete(avaliacaoId); return n; });
        this.cancelarSolicitacaoRecurso();
      },
      error: () => {
        this.enviandoRecursoIds.update(s => { const n = new Set(s); n.delete(avaliacaoId); return n; });
      }
    });
  }

  // --- Helpers privados ---

  private inicializarTextos(consolidacoes: Consolidacao[]): void {
    const mapa: Record<string, string> = {};
    for (const c of consolidacoes) {
      for (const a of (c.atividades ?? [])) {
        mapa[`${c.id}-${a.plano_trabalho_entrega_id}`] = a.descricao ?? '';
      }
    }
    this.textos.set(mapa);
  }

  private atualizarAtividadeNaConsolidacao(consolidacaoId: string, entregaId: string, atividade: AtividadeConsolidacao | null): void {
    this.consolidacoes.update(lista => lista.map(c => {
      if (c.id !== consolidacaoId) return c;
      const atividades = (c.atividades ?? []).filter(a => a.plano_trabalho_entrega_id !== entregaId);
      if (atividade) atividades.push(atividade);
      return { ...c, atividades };
    }));
  }
}
