import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, DestroyRef, inject, signal } from "@angular/core";
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from "src/app/v2/components/breadcrumb/breadcrumb.component";
import { ActivatedRoute } from "@angular/router";
import { filter, map, switchMap, take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigateService } from "src/app/services/navigate.service";
import { PlanoTrabalhoApiClient } from "../infra/api-client";
import { PlanoTrabalho, PlanoTrabalhoEntrega } from "../domain/types";
import { PlanoTrabalhoStatus } from "src/app/models/plano-trabalho.model";

@Component({
  selector: 'app-plano-trabalho-v2-show-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './show.page.html'
})
export class PlanoTrabalhoV2ShowPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PlanoTrabalhoApiClient);
  private readonly go = inject(NavigateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly planoTrabalho = signal<PlanoTrabalho | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id),
      take(1),
      switchMap(id => this.api.getById(id!)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (plano) => {
        this.planoTrabalho.set(plano);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar o plano de trabalho.');
        this.loading.set(false);
      }
    });
  }

  voltar() { this.go.back(); }

  editarPlano() {
    const id = this.planoTrabalho()?.id;
    if (id) this.go.navigate({ route: ['gestao', 'plano-trabalho-v2', 'editar', id] });
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
}
