import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeApiClient, PlanosVigentes } from '../../infra/home-api.client';
import { HOME_ERRO_RECUPERAR_DADOS } from '../../home.constants';

@Component({
  selector: 'home-planos-vigentes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrls: ['../home.styles.scss'],
  templateUrl: './planos-vigentes.component.html',
})
export class PlanosVigentesComponent {
  private readonly homeApi = inject(HomeApiClient);

  readonly unidadeId = input.required<string>();
  readonly subordinadas = input.required<boolean>();

  readonly data = signal<PlanosVigentes | null>(null);
  readonly loading = signal(false);
  readonly erro = signal<string | null>(null);

  constructor() {
    effect(() => {
      const unidadeId = this.unidadeId();
      const subordinadas = this.subordinadas();
      if (unidadeId) this.fetch(unidadeId, subordinadas);
    });
  }

  private fetch(unidadeId: string, subordinadas: boolean): void {
    this.loading.set(true);
    this.erro.set(null);
    this.homeApi.getPlanosVigentes(unidadeId, subordinadas).subscribe({
      next: (r) => { this.data.set(r); this.loading.set(false); },
      error: () => { this.data.set(null); this.erro.set(HOME_ERRO_RECUPERAR_DADOS); this.loading.set(false); },
    });
  }
}
