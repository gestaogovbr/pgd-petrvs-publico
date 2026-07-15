import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeApiClient, Contribuicoes } from '../../infra/home-api.client';

@Component({
  selector: 'home-contribuicoes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrls: ['../home.styles.scss'],
  template: `
    <div class="br-card home-card h-100">
      <div class="card-content p-3">
        <h6 class="fw-bold text-center">Contribuições dos Participantes</h6>
        @if (loading()) {
          <div class="d-flex justify-content-center py-2">
            <span class="br-loading small" role="progressbar"></span>
          </div>
        } @else if (data()) {
          <ul class="list-unstyled py-2 small">
            <li>Entregas da própria unidade - {{ data()!.entregas_propria_unidade_percentual }}%</li>
            <li>Entregas de outras unidades - {{ data()!.entregas_outras_unidades_percentual }}%</li>
            <li>Não vinculada a entregas - {{ data()!.nao_vinculada_entregas_percentual }}%</li>
          </ul>
        }
      </div>
    </div>
  `,
})
export class ContribuicoesComponent {
  private readonly homeApi = inject(HomeApiClient);

  readonly unidadeId = input.required<string>();
  readonly subordinadas = input.required<boolean>();

  readonly data = signal<Contribuicoes | null>(null);
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
    this.homeApi.getContribuicoes(unidadeId, subordinadas).subscribe({
      next: (r) => { this.data.set(r); this.loading.set(false); },
      error: () => { this.data.set(null); this.loading.set(false); },
    });
  }
}
