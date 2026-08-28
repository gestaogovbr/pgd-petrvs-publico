import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AtalhoCardComponent } from './atalho-card.component';
import { HomeApiClient, MeusPlanosVigentesResponse } from '../../infra/home-api.client';
import { MessageService } from 'src/app/v2/services/message.service';

@Component({
  selector: 'home-acoes-gerenciais',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AtalhoCardComponent],
  styleUrls: ['../home.styles.scss'],
  templateUrl: './acoes-gerenciais.component.html',
})
export class AcoesGerenciaisComponent {
  private readonly router = inject(Router);
  private readonly homeApi = inject(HomeApiClient);
  private readonly message = inject(MessageService);

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
      this.message.info('Sem Plano de Trabalho vigente.');
      return;
    }
    this.router.navigate(['gestao', 'plano-trabalho-v2', 'consultar', id]);
  }

  private fetch(unidadeId: string): void {
    this.loading.set(true);
    this.homeApi.getMeusPlanosVigentes(unidadeId).subscribe({
      next: (response) => { this.data.set(response); this.loading.set(false); },
      error: () => { this.data.set(null); this.loading.set(false); },
    });
  }
}
