import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, DestroyRef, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from "src/app/v2/components/breadcrumb/breadcrumb.component";
import { ActivatedRoute } from "@angular/router";
import { filter, map, take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PlanoTrabalhoApiClient } from "../infra/api-client";
import { PlanoTrabalho, PlanoTrabalhoEntrega } from "../domain/types";
import { PlanoTrabalhoStatus } from "src/app/models/plano-trabalho.model";
import { AuthService } from "src/app/services/auth.service";
import { UnidadeService } from "src/app/v2/services/unidade.service";
import { PlanoTrabalhoPolicy } from "../application/plano-trabalho.policy";
import { Router } from "@angular/router";

@Component({
  selector: 'app-plano-trabalho-v2-show-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './show.page.html'
})
export class PlanoTrabalhoV2ShowPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PlanoTrabalhoApiClient);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);
  readonly policy = inject(PlanoTrabalhoPolicy);

  readonly planoTrabalho = signal<PlanoTrabalho | null>(null);
  readonly consolidacoes = signal<any[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  /** Chave: `${consolidacaoId}-${entregaId}` → texto digitado no textarea */
  readonly textos = signal<Record<string, string>>({});

  /** Conjunto de chaves `${consolidacaoId}-${entregaId}` atualmente em modo edição */
  readonly editando = signal<Set<string>>(new Set());

  /** Salva/atualiza em andamento por chave */
  readonly salvando = signal<Set<string>>(new Set());

  /** ID da consolidação em processo de reabertura (exibe o form de justificativa) */
  readonly reabrindoId = signal<string | null>(null);

  /** Texto da justificativa de reabertura */
  readonly justificativaReabrir = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id),
      take(1),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(id => {
      this.api.getById(id!).subscribe({
        next: (plano) => {
          this.planoTrabalho.set(plano);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Erro ao carregar o plano de trabalho.');
          this.loading.set(false);
        }
      });

      this.api.getConsolidacoes(id!).subscribe(consolidacoes => {
        this.consolidacoes.set(consolidacoes);
        this.inicializarTextos(consolidacoes);
      });
    });
  }

  podeRegistrar(consolidacao?: any): boolean {
    const plano = this.planoTrabalho();
    if (!plano || plano.status !== 'ATIVO') return false;
    if (consolidacao?.status === 'CONCLUIDO') return false;
    return plano.usuario_id === this.auth.usuario?.id
      || this.unidadeService.isGestorUnidade(plano.unidade_id);
  }


  getAtividade(consolidacao: any, entregaId: string): any | null {
    return (consolidacao.atividades ?? []).find((a: any) => a.plano_trabalho_entrega_id === entregaId) ?? null;
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

  cancelarEdicao(consolidacaoId: string, entregaId: string, atividade: any | null): void {
    const key = `${consolidacaoId}-${entregaId}`;
    this.textos.update(t => ({ ...t, [key]: atividade?.descricao ?? '' }));
    this.editando.update(s => { const n = new Set(s); n.delete(key); return n; });
  }

  confirmar(consolidacao: any, entrega: PlanoTrabalhoEntrega): void {
    const planoId = this.planoTrabalho()?.id;
    if (!planoId) return;

    const key = `${consolidacao.id}-${entrega.id}`;
    const descricao = this.textos()[key]?.trim();
    if (!descricao) return;

    const atividade = this.getAtividade(consolidacao, entrega.id);

    this.salvando.update(s => new Set([...s, key]));

    const obs = atividade
      ? this.api.updateAtividade(planoId, consolidacao.id, atividade.id, { descricao })
      : this.api.createAtividade(planoId, consolidacao.id, { plano_trabalho_entrega_id: entrega.id, descricao });

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

  excluir(consolidacao: any, entrega: PlanoTrabalhoEntrega): void {
    const planoId = this.planoTrabalho()?.id;
    const atividade = this.getAtividade(consolidacao, entrega.id);
    if (!planoId || !atividade || !confirm('Deseja realmente excluir este registro de execução?')) return;

    this.api.deleteAtividade(planoId, consolidacao.id, atividade.id).subscribe(() => {
      this.atualizarAtividadeNaConsolidacao(consolidacao.id, entrega.id, null);
      this.textos.update(t => ({ ...t, [`${consolidacao.id}-${entrega.id}`]: '' }));
      this.editando.update(s => { const n = new Set(s); n.delete(`${consolidacao.id}-${entrega.id}`); return n; });
    });
  }

  voltar() { 
    this.router.navigate(['gestao', 'plano-trabalho-v2']);
  }

  editarPlano() {
    const id = this.planoTrabalho()?.id;
    if (id) this.router.navigate(['gestao', 'plano-trabalho-v2', 'editar', id]);
  }

  statusLabel(value: PlanoTrabalhoStatus | undefined): string {
    const labels: Record<PlanoTrabalhoStatus, string> = {
      ATIVO: 'Ativo',
      INCLUIDO: 'Incluído',
      AGUARDANDO_ASSINATURA: 'Aguardando assinatura',
      SUSPENSO: 'Suspenso',
      CANCELADO: 'Cancelado',
      CONCLUIDO: 'Concluído',
      AVALIADO: 'Avaliado'
    };
    return value ? (labels[value] ?? value) : '-';
  }

  statusConsolidacaoLabel(value: string | undefined): string {
    const labels: Record<string, string> = {
      INCLUIDO: 'Aguardando Registro',
      CONCLUIDO: 'Aguardando Avaliação',
      AVALIADO: 'Avaliado',
    };
    return value ? (labels[value] ?? value) : '-';
  }

  statusConsolidacaoDisplay(consolidacao: any): string {
    if (consolidacao.status === 'INCLUIDO' && this.todasEntregasComAtividade(consolidacao)) {
      return 'Registro incluído';
    }
    return this.statusConsolidacaoLabel(consolidacao.status);
  }

  todasEntregasComAtividade(consolidacao: any): boolean {
    const entregas = this.planoTrabalho()?.entregas ?? [];
    if (!entregas.length) return false;
    return entregas.every(e => this.getAtividade(consolidacao, e.id) !== null);
  }

  podeConcluirConsolidacao(consolidacao: any): boolean {
    return this.podeRegistrar()
      && consolidacao.status === 'INCLUIDO'
      && this.todasEntregasComAtividade(consolidacao);
  }

  concluirConsolidacao(consolidacao: any): void {
    const planoId = this.planoTrabalho()?.id;
    if (!planoId) return;
    this.api.concluirConsolidacao(planoId, consolidacao.id).subscribe({
      next: (consolidacaoAtualizada) => {
        this.consolidacoes.update(lista =>
          lista.map(c => c.id === consolidacao.id ? { ...c, ...consolidacaoAtualizada } : c)
        );
      }
    });
  }

  podeVisualizarConsolidacoes(): boolean {
    const plano = this.planoTrabalho();
    if (!plano) return false;
    return ['ATIVO', 'CONCLUIDO', 'AVALIADO'].includes(plano.status)
  }

  podeReabrirConsolidacao(consolidacao: any): boolean {
    const plano = this.planoTrabalho();
    if (!plano || plano.status !== 'ATIVO') return false;
    return consolidacao.status === 'CONCLUIDO'
      && (plano.usuario_id === this.auth.usuario?.id
        || this.unidadeService.isGestorUnidade(plano.unidade_id));
  }

  iniciarReabertura(consolidacao: any): void {
    this.reabrindoId.set(consolidacao.id);
    this.justificativaReabrir.set('');
  }

  cancelarReabertura(): void {
    this.reabrindoId.set(null);
    this.justificativaReabrir.set('');
  }

  confirmarReabertura(consolidacao: any): void {
    const planoId = this.planoTrabalho()?.id;
    const justificativa = this.justificativaReabrir().trim();
    if (!planoId || !justificativa) return;

    this.api.reabrirConsolidacao(planoId, consolidacao.id, justificativa).subscribe({
      next: (consolidacaoAtualizada) => {
        this.consolidacoes.update(lista =>
          lista.map(c => c.id === consolidacao.id ? { ...c, ...consolidacaoAtualizada } : c)
        );
        this.reabrindoId.set(null);
        this.justificativaReabrir.set('');
      }
    });
  }

  


  getPlanoEntregaInfo(e: PlanoTrabalhoEntrega): { plano: string; entrega: string } {
    if (e.orgao) return { plano: 'Outro Órgão/Entidade', entrega: e.orgao };
    if (!e.plano_entrega_entrega_id) return { plano: 'Não vinculada', entrega: '-' };

    if (e.plano_entrega_entrega) {
      return {
        plano: (e.plano_entrega_entrega as any).plano_entrega?.nome || 'Plano vinculado',
        entrega: (e.plano_entrega_entrega as any).descricao || 'Entrega vinculada'
      };
    }

    return { plano: 'Plano vinculado', entrega: 'Entrega vinculada' };
  }

  private inicializarTextos(consolidacoes: any[]): void {
    const mapa: Record<string, string> = {};
    for (const c of consolidacoes) {
      for (const a of (c.atividades ?? [])) {
        mapa[`${c.id}-${a.plano_trabalho_entrega_id}`] = a.descricao ?? '';
      }
    }
    this.textos.set(mapa);
  }

  private atualizarAtividadeNaConsolidacao(consolidacaoId: string, entregaId: string, atividade: any | null): void {
    this.consolidacoes.update(lista => lista.map(c => {
      if (c.id !== consolidacaoId) return c;
      const atividades = (c.atividades ?? []).filter((a: any) => a.plano_trabalho_entrega_id !== entregaId);
      if (atividade) atividades.push(atividade);
      return { ...c, atividades };
    }));
  }
}
