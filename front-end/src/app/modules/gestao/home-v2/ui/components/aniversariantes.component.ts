import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeApiClient, AniversarianteItem } from '../../infra/home-api.client';

@Component({
  selector: 'home-aniversariantes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrls: ['../home.styles.scss'],
  template: `
    <div class="br-card home-card p-3">
      <h6 class="fw-bold text-center">Aniversariantes do dia</h6>
      <div class="home-card--scrollable">
        @if (loading()) {
          <div class="d-flex justify-content-center py-2">
            <span class="br-loading small" role="progressbar"></span>
          </div>
        } @else if (data().length === 0) {
          <p class="text-center text-muted small">Nenhum aniversariante hoje.</p>
        } @else {
          @for (item of data(); track item.nome) {
            <p class="text-center fw-semibold mb-1">{{ item.nome }}</p>
          }
        }
      </div>
    </div>
  `,
})
export class AniversariantesComponent {
  private readonly homeApi = inject(HomeApiClient);

  readonly unidadeId = input.required<string>();
  readonly subordinadas = input.required<boolean>();

  readonly data = signal<AniversarianteItem[]>([]);
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
    this.homeApi.getAniversariantes(unidadeId, subordinadas).subscribe({
      next: (r) => { this.data.set(r.aniversariantes); this.loading.set(false); },
      error: () => { this.data.set([]); this.loading.set(false); },
    });
  }
}
