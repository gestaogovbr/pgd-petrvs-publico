import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeApiClient, ResumoEquipe } from '../../infra/home-api.client';

@Component({
  selector: 'home-resumo-equipe',
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
      <div class="row">
        <div class="col-md-4">
          <div class="br-card home-card h-100">
            <div class="card-content text-center">
              <h6 class="fw-bold">Participantes do PGD</h6>
              <p class="display-6 mb-0">{{ data()!.participantes_pgd.quantidade }}</p>
              <small>{{ data()!.participantes_pgd.percentual }}% da equipe</small>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="br-card home-card h-100">
            <div class="card-content text-center">
              <h6 class="fw-bold">Capacidade da equipe no PGD</h6>
              <p class="display-6 mb-0">{{ data()!.capacidade_equipe_horas_mensais }}</p>
              <small>horas mensais</small>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="br-card home-card h-100">
            <div class="card-content">
              <h6 class="fw-bold text-center">Contribuições dos Participantes</h6>
              <ul class="list-unstyled py-2 small">
                <li>Entregas da própria unidade - {{ data()!.contribuicoes.entregas_propria_unidade_percentual }}%</li>
                <li>Entregas de outras unidades - {{ data()!.contribuicoes.entregas_outras_unidades_percentual }}%</li>
                <li>Não vinculada a entregas - {{ data()!.contribuicoes.nao_vinculada_entregas_percentual }}%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class ResumoEquipeComponent {
  private readonly homeApi = inject(HomeApiClient);

  readonly unidadeId = input.required<string>();
  readonly subordinadas = input.required<boolean>();

  readonly data = signal<ResumoEquipe | null>(null);
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
    this.homeApi.getResumoEquipe(unidadeId, subordinadas).subscribe({
      next: (r) => { this.data.set(r); this.loading.set(false); },
      error: () => { this.data.set(null); this.loading.set(false); },
    });
  }
}
