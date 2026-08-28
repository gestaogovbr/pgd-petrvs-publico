import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AtalhoCardComponent } from './atalho-card.component';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { HomeApiClient, MeusPlanosVigentesResponse } from '../../infra/home-api.client';
import { MessageService } from 'src/app/v2/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';

@Component({
  selector: 'home-acoes-gerenciais',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AtalhoCardComponent, CommonModule, WebcomponentsAngularModule],
  styleUrls: ['../home.styles.scss'],
  templateUrl: './acoes-gerenciais.component.html',
})
export class AcoesGerenciaisComponent {
  private readonly router = inject(Router);
  private readonly homeApi = inject(HomeApiClient);
  private readonly message = inject(MessageService);
  private readonly auth = inject(AuthService);
  private readonly filterStorage = inject(FilterStorageService);

  readonly unidadeId = input.required<string>();

  readonly data = signal<MeusPlanosVigentesResponse | null>(null);
  readonly loading = signal(false);

  constructor() {
    effect(() => {
      const unidadeId = this.unidadeId();
      if (unidadeId) this.fetch(unidadeId);
    });
  }

  irParaPainelGerencial(): void {
    this.router.navigate(['gestao', 'paineis-gerenciais']);
  }

  irParaPlanoEntregas(): void {
    const id = this.data()?.plano_entregas_id;
    if (!id) {
      this.message.info('Sem Plano de Entregas vigente.');
      return;
    }
    const filter = {
      unidade_id: this.unidadeId(),
      meus_planos: true,
      principais: false,
      data_filtro: 'VIGENTE',
      data_filtro_inicio: new Date().toISOString(),
      data_filtro_fim: new Date().toISOString(),
    };
    this.router.navigate(['gestao', 'plano-entrega'], {
      queryParams: {
        planejamento: true,
        filter: '[object Object]',
        '_$filter$_': JSON.stringify(filter),
      },
    });
  }

  irParaPlanoTrabalho(): void {
    const id = this.data()?.plano_trabalho_id;
    if (!id) {
      this.salvarFiltrosPT({ vigentes: true, meus_planos: true, incluir_subordinadas: false });
      this.router.navigate(['gestao', 'plano-trabalho-v2']);
      return;
    }
    this.router.navigate(['gestao', 'plano-trabalho-v2', 'consultar', id]);
  }

  private fetch(unidadeId: string): void {
    this.loading.set(true);
    this.homeApi.getMeusPlanosVigentes(unidadeId).subscribe({
      next: (r) => { this.data.set(r); this.loading.set(false); },
      error: () => { this.data.set(null); this.loading.set(false); },
    });
  }

  private salvarFiltrosPT(filtros: Record<string, unknown>): void {
    const userId = this.auth.usuario?.id;
    const key = userId ? `plano-trabalho-v2:filters:${userId}` : 'plano-trabalho-v2:filters';
    this.filterStorage.save(key, filtros);
  }
}
