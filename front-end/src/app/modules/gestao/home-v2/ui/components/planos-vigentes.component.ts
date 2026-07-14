import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeApiClient, PlanosVigentes } from '../../infra/home-api.client';

@Component({
  selector: 'home-planos-vigentes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrls: ['../home.styles.scss'],
  template: `
    @if (loading()) {
      <div class="d-flex justify-content-center py-3">
        <span class="br-loading small" role="progressbar"></span>
      </div>
    } @else if (data()) {
      <div class="br-card home-card--pill mb-3">
        <div class="card-content p-3 d-flex justify-content-between align-items-center">
          <span>
            Unidades Executoras com Plano de Entregas vigente hoje
            <i class="fas fa-info-circle text-muted ml-1"
               title="Quando a opção Unidades Subordinadas estiver habilitada, também serão considerados os dados das respectivas unidades subordinadas."
               aria-label="Informação sobre o indicador de unidades executoras"></i>
          </span>
          <strong>{{ data()!.unidades_com_plano_entregas.quantidade }}/{{ data()!.unidades_com_plano_entregas.total }} ({{ data()!.unidades_com_plano_entregas.percentual }}%)</strong>
        </div>
      </div>
      <div class="br-card home-card--pill">
        <div class="card-content p-3 d-flex justify-content-between align-items-center">
          <span>
            Participantes com Plano de Trabalho vigente hoje
            <i class="fas fa-info-circle text-muted ml-1"
               title="Quando a opção Unidades Subordinadas estiver habilitada, também serão considerados os dados das respectivas unidades subordinadas."
               aria-label="Informação sobre o indicador de participantes"></i>
          </span>
          <strong>{{ data()!.participantes_com_plano_trabalho.quantidade }}/{{ data()!.participantes_com_plano_trabalho.total }} ({{ data()!.participantes_com_plano_trabalho.percentual }}%)</strong>
        </div>
      </div>
    }
  `,
})
export class PlanosVigentesComponent {
  private readonly homeApi = inject(HomeApiClient);

  readonly unidadeId = input.required<string>();
  readonly subordinadas = input.required<boolean>();

  readonly data = signal<PlanosVigentes | null>(null);
  readonly loading = signal(false);

  constructor() {
    effect(() => {
      const unidadeId = this.unidadeId();
      const subordinadas = this.subordinadas();
      if (unidadeId) this.fetch(unidadeId, subordinadas);
    });
  }

  private fetch(unidadeId: string, subordinadas: boolean): void {
    this.loading.set(true);
    this.homeApi.getPlanosVigentes(unidadeId, subordinadas).subscribe({
      next: (r) => { this.data.set(r); this.loading.set(false); },
      error: () => { this.data.set(null); this.loading.set(false); },
    });
  }
}
