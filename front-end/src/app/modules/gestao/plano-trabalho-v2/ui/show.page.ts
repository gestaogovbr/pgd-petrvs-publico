import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, DestroyRef, inject, signal } from "@angular/core";
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from "src/app/v2/components/breadcrumb/breadcrumb.component";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PlanoApiClient } from "../infra/plano-api.client";
import { ArquivarPlanoUseCase } from "../application/arquivar-plano.usecase";
import { Consolidacao, PlanoTrabalho, PlanoTrabalhoEntrega } from "../domain/types";
import { PlanoTrabalhoStatus } from "src/app/models/plano-trabalho.model";
import { AuthService } from "src/app/services/auth.service";
import { UnidadeService } from "src/app/v2/services/unidade.service";
import { PlanoTrabalhoPolicy } from "../application/plano-trabalho.policy";
import { ConsolidacaoPolicy } from "../application/consolidacao.policy";
import { ConsolidacaoFacade } from "../application/consolidacao.facade";
import { AvaliacaoFormComponent } from "./components/avaliacao-form.component";
import { RecursoFormComponent } from "./components/recurso-form.component";

@Component({
  selector: 'app-plano-trabalho-v2-show-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent, AvaliacaoFormComponent, RecursoFormComponent],
  templateUrl: './show.page.html'
})
export class PlanoTrabalhoV2ShowPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PlanoApiClient);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);
  private readonly notaPalette = ['#c0392b', '#e67e22', '#27ae60', '#1589c0', '#1351b4'];
  private readonly notaIcones = ['fa-frown', 'fa-frown', 'fa-smile', 'fa-smile', 'fa-smile'];

  private readonly arquivarPlanoUC = inject(ArquivarPlanoUseCase);

  readonly policy = inject(PlanoTrabalhoPolicy);
  readonly consolidacaoPolicy = inject(ConsolidacaoPolicy);
  readonly facade = inject(ConsolidacaoFacade);

  readonly planoTrabalho = signal<PlanoTrabalho | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

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

      this.facade.init(id!);
    });
  }

  // --- Autorização ---

  podeRegistrar(consolidacao?: Consolidacao): boolean {
    const plano = this.planoTrabalho();
    if (!plano || plano.status !== 'ATIVO') return false;
    if (['CONCLUIDO', 'AVALIADO'].includes(consolidacao?.status ?? '')) return false;
    return plano.usuario_id === this.auth.usuario?.id
      || this.unidadeService.isGestorUnidade(plano.unidade_id);
  }

  podeVisualizarConsolidacoes(): boolean {
    const plano = this.planoTrabalho();
    if (!plano) return false;
    return ['ATIVO', 'CONCLUIDO', 'AVALIADO'].includes(plano.status);
  }

  todasEntregasComAtividade(consolidacao: Consolidacao): boolean {
    const entregas = this.planoTrabalho()?.entregas ?? [];
    if (!entregas.length) return false;
    return entregas.every(e => this.facade.getAtividade(consolidacao, e.id) !== null);
  }

  podeConcluirConsolidacao(consolidacao: Consolidacao): boolean {
    return this.podeRegistrar()
      && consolidacao.status === 'INCLUIDO'
      && this.todasEntregasComAtividade(consolidacao);
  }

  podeReabrirConsolidacao(consolidacao: Consolidacao): boolean {
    const plano = this.planoTrabalho();
    if (!plano || plano.status !== 'ATIVO') return false;
    return consolidacao.status === 'CONCLUIDO'
      && (plano.usuario_id === this.auth.usuario?.id
        || this.unidadeService.isGestorUnidade(plano.unidade_id));
  }

  // --- Labels / Display ---

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

  statusConsolidacaoDisplay(consolidacao: Consolidacao): string {
    if (consolidacao.status === 'INCLUIDO' && this.todasEntregasComAtividade(consolidacao)) {
      return 'Registro incluído';
    }
    return this.statusConsolidacaoLabel(consolidacao.status);
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

  // --- Display helpers de nota (usados no template) ---

  notaLabel(nota: string | number | null | undefined): string {
    return String(nota ?? '').replace(/^"|"$/g, '');
  }

  notaIndexPorId(notaId: string, notaTexto?: string | number | null): number {
    const notas = this.facade.notas();
    const byId = notas.findIndex(n => n.id === notaId);
    if (byId !== -1) return byId;
    if (notaTexto) {
      const clean = this.notaLabel(notaTexto);
      return notas.findIndex(n => n.nota === clean);
    }
    return -1;
  }

  notaColor(index: number, total: number): string {
    if (total <= 1) return this.notaPalette[2];
    const step = (this.notaPalette.length - 1) / (total - 1);
    return this.notaPalette[Math.round(index * step)];
  }

  notaIcone(index: number, total: number): string {
    if (total <= 1) return this.notaIcones[2];
    const step = (this.notaIcones.length - 1) / (total - 1);
    return this.notaIcones[Math.round(index * step)];
  }

  // --- Navegação ---

  voltar() {
    this.router.navigate(['gestao', 'plano-trabalho-v2']);
  }

  editarPlano() {
    const id = this.planoTrabalho()?.id;
    if (id) this.router.navigate(['gestao', 'plano-trabalho-v2', 'editar', id]);
  }

  irParaTcr() {
    const id = this.planoTrabalho()?.id;
    if (id) this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', id]);
  }

  arquivarPlano() {
    const plano = this.planoTrabalho();
    if (!plano) return;
    this.arquivarPlanoUC.execute(plano.id).subscribe({
      next: (atualizado) => {
        this.planoTrabalho.set(atualizado);
      }
    });
  }
}
