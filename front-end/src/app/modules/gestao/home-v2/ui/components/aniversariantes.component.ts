import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeApiClient, AniversarianteItem } from '../../infra/home-api.client';

@Component({
  selector: 'home-aniversariantes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrls: ['../home.styles.scss'],
  templateUrl: './aniversariantes.component.html',
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
