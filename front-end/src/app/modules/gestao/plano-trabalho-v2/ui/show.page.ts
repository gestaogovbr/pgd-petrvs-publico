import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, DestroyRef, inject, signal } from "@angular/core";
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from "src/app/v2/components/breadcrumb/breadcrumb.component";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PlanoApiClient } from "../infra/plano-api.client";
import { ArquivarPlanoUseCase } from "../application/arquivar-plano.usecase";
import { EncerrarPlanoUseCase } from "../application/encerrar-plano.usecase";
import { Consolidacao, ConsolidacaoStatus, ConsolidacaoStatusGroups, PlanoTrabalho, PlanoTrabalhoEntrega, getPlanoEntregaInfo, planoTrabalhoStatusLabel } from "../domain/types";
import { PlanoTrabalhoStatus, PlanoTrabalhoStatusGroups } from "src/app/models/plano-trabalho.model";
import { AuthService } from "src/app/services/auth.service";
import { UnidadeService } from "src/app/v2/services/unidade.service";
import { PlanoTrabalhoPolicy } from "../application/plano-trabalho.policy";
import { ConsolidacaoPolicy } from "../application/consolidacao.policy";
import { ConsolidacaoFacade } from "../application/consolidacao.facade";
import { BreadcrumbService } from "src/app/v2/components/breadcrumb/breadcrumb.service";
import { MessageService } from "src/app/v2/services/message.service";
import { AssinarPlanoUseCase } from "../application/assinar-plano.usecase";
import { ConsolidacaoAvaliacoesComponent } from "./components/consolidacao-avaliacoes.component";
import { ConsolidacaoOcorrenciasComponent } from "./components/consolidacao-ocorrencias.component";

@Component({
  selector: 'app-plano-trabalho-v2-show-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent, ConsolidacaoAvaliacoesComponent, ConsolidacaoOcorrenciasComponent],
  templateUrl: './show.page.html'
})
export class PlanoTrabalhoV2ShowPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PlanoApiClient);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);

  private readonly arquivarPlanoUC = inject(ArquivarPlanoUseCase);
  private readonly encerrarPlanoUC = inject(EncerrarPlanoUseCase);

  private readonly breadcrumb = inject(BreadcrumbService);
  private readonly message = inject(MessageService);

  readonly policy = inject(PlanoTrabalhoPolicy);
  readonly consolidacaoPolicy = inject(ConsolidacaoPolicy);
  readonly facade = inject(ConsolidacaoFacade);
  readonly assinatura = inject(AssinarPlanoUseCase);

  readonly planoTrabalho = signal<PlanoTrabalho | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly encerrando = signal(false);
  readonly justificativaEncerramento = signal('');

  readonly PlanoStatus = PlanoTrabalhoStatus;
  readonly ConsolidacaoStatus = ConsolidacaoStatus;
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
          this.breadcrumb.setLastLabel(`Plano nº ${plano.numero}`);
          this.loading.set(false);
          this.assinatura.init(plano, plano.entregas || []);
          this.assinatura.onAfterAssinar = () => {
            this.api.getById(plano.id).subscribe(updated => {
              this.planoTrabalho.set(updated);
              this.assinatura.init(updated, updated.entregas || []);
            });
            this.facade.loadConsolidacoes();
          };
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

  podeVisualizarConsolidacoes(): boolean {
    const plano = this.planoTrabalho();
    if (!plano) return false;
    const status = this.assinatura.plano()?.status || plano.status;
    return PlanoTrabalhoStatusGroups.comExecucaoVisivel.includes(status);
  }

  todasEntregasComAtividade(consolidacao: Consolidacao): boolean {
    const entregas = this.planoTrabalho()?.entregas ?? [];
    if (!entregas.length) return false;
    return entregas.every(e => this.facade.getAtividade(consolidacao, e.id) !== null);
  }

  podeConcluirConsolidacao(consolidacao: Consolidacao): boolean {
    const plano = this.planoTrabalho();
    if (!plano) return false;
    return this.consolidacaoPolicy.podeRegistrar(plano, consolidacao)
      && consolidacao.status === ConsolidacaoStatus.INCLUIDO
      && this.todasEntregasComAtividade(consolidacao);
  }

  podeReabrirConsolidacao(consolidacao: Consolidacao): boolean {
    const plano = this.planoTrabalho();
    if (!plano || plano.status !== PlanoTrabalhoStatus.ATIVO) return false;
    return ConsolidacaoStatusGroups.reabrivel.includes(consolidacao.status)
      && !consolidacao.avaliacoes?.length
      && (plano.usuario_id === this.auth.usuario?.id
        || this.unidadeService.isGestorUnidade(plano.unidade_id));
  }

  // --- Labels / Display ---

  statusLabel(value: PlanoTrabalhoStatus | undefined): string {
    return planoTrabalhoStatusLabel(value, this.planoTrabalho()!);
  }

  statusConsolidacaoLabel(value: ConsolidacaoStatus | undefined): string {
    const labels: Record<ConsolidacaoStatus, string> = {
      INCLUIDO: 'Aguardando Registro',
      CONCLUIDO: 'Aguardando Avaliação',
      AVALIADO: 'Avaliado',
    };
    return value ? (labels[value] ?? value) : '-';
  }

  statusConsolidacaoDisplay(consolidacao: Consolidacao): string {
    const plano = this.planoTrabalho();
    if (plano?.encerrado_at && consolidacao.data_inicio > plano.encerrado_at) {
      return 'Encerrado antecipadamente';
    }
    if (consolidacao.status === ConsolidacaoStatus.INCLUIDO && this.todasEntregasComAtividade(consolidacao)) {
      return 'Registro incluído';
    }
    if (consolidacao.status === ConsolidacaoStatus.CONCLUIDO && consolidacao.avaliacoes?.length === 1 && consolidacao.avaliacoes[0].recurso) {
      return 'Aguardando Reavaliação';
    }
    if (consolidacao.status === ConsolidacaoStatus.AVALIADO && consolidacao.avaliacoes?.length > 1) {
      return 'Reavaliado';
    }
    return this.statusConsolidacaoLabel(consolidacao.status);
  }

  getPlanoEntregaInfo(e: PlanoTrabalhoEntrega): { plano: string; entrega: string } {
    return getPlanoEntregaInfo(e);
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
    if (!id) return;
    if (this.planoTrabalho()?.documento_id || this.assinatura.documento()) {
      this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', id]);
    } else {
      this.assinatura.gerarDocumento(() =>
        this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', id])
      );
    }
  }

  verTcr() {
    const id = this.planoTrabalho()?.id;
    if (id) this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', id]);
  }

  arquivarPlano() {
    const plano = this.planoTrabalho();
    if (!plano) return;
    this.facade.confirmacaoPendente.set({
      titulo: 'Arquivar Plano de Trabalho',
      mensagem: 'Ao arquivar este Plano de Trabalho, ele será removido da tela, ficando disponível apenas quando consultado. Deseja confirmar?',
      onConfirmar: () => {
        this.arquivarPlanoUC.execute(plano.id).subscribe({
          next: (atualizado) => {
            this.planoTrabalho.set(atualizado);
            this.message.success('Plano de trabalho arquivado com sucesso.');
          }
        });
      }
    });
  }

  encerrarPlano() {
    this.encerrando.set(true);
    this.justificativaEncerramento.set('');
  }

  cancelarEncerramento() {
    this.encerrando.set(false);
    this.justificativaEncerramento.set('');
  }

  confirmarEncerramento() {
    const plano = this.planoTrabalho();
    const justificativa = this.justificativaEncerramento().trim();
    if (!plano || !justificativa) return;
    this.encerrarPlanoUC.execute(plano.id, justificativa).subscribe({
      next: (atualizado) => {
        this.planoTrabalho.set(atualizado);
        if (atualizado.consolidacoes) this.facade.consolidacoes.set(atualizado.consolidacoes as any);
        this.encerrando.set(false);
        this.justificativaEncerramento.set('');
      }
    });
  }
}
