import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeApiClient, EmFeriasItem } from '../../infra/home-api.client';

@Component({
  selector: 'home-em-ferias',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrls: ['../home.styles.scss'],
  template: `
    <div class="br-card home-card p-3">
      <h6 class="fw-bold text-center">De férias hoje</h6>
      <div class="home-card--scrollable">
        @if (loading()) {
          <div class="d-flex justify-content-center py-2">
            <span class="br-loading small" role="progressbar"></span>
          </div>
        } @else if (data().length === 0) {
          <p class="text-center text-muted small">Nenhum participante em férias hoje.</p>
        } @else {
          @for (item of data(); track item.nome) {
            <p class="text-center fw-semibold mb-1">{{ item.nome }}</p>
          }
        }
      </div>
    </div>
  `,
})
export class EmFeriasComponent {
  private readonly homeApi = inject(HomeApiClient);

  readonly unidadeId = input.required<string>();
  readonly subordinadas = input.required<boolean>();

  readonly data = signal<EmFeriasItem[]>([]);
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
    this.homeApi.getEmFerias(unidadeId, subordinadas).subscribe({
      next: (r) => { this.data.set(r.em_ferias); this.loading.set(false); },
      error: () => { this.data.set([]); this.loading.set(false); },
    });
  }
}
