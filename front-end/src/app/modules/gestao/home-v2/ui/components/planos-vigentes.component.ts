import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeApiClient, PlanosVigentes } from '../../infra/home-api.client';
import { HOME_ERRO_RECUPERAR_DADOS } from '../../home.constants';
import { AtalhoCardComponent } from './atalho-card.component';

@Component({
  selector: 'home-planos-vigentes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AtalhoCardComponent],
  styleUrls: ['../home.styles.scss'],
  templateUrl: './planos-vigentes.component.html',
})
export class PlanosVigentesComponent {
  private readonly homeApi = inject(HomeApiClient);

  readonly unidadeId = input.required<string>();
  readonly subordinadas = input.required<boolean>();

  readonly planoEntregasVigenteClick = output<void>();
  readonly unidadesSemPEClick = output<void>();
  readonly participantesSemPTClick = output<void>();

  readonly data = signal<PlanosVigentes | null>(null);
  readonly loading = signal(false);
  readonly erro = signal<string | null>(null);

  readonly unidadesSemPE = computed(() => {
    const d = this.data();
    if (!d) return 0;
    return Math.max(0, d.unidades_com_plano_entregas.total - d.unidades_com_plano_entregas.quantidade);
  });

  readonly percentualUnidadesSemPE = computed(() => {
    const d = this.data();
    if (!d || d.unidades_com_plano_entregas.total === 0) return 0;
    return Math.round((this.unidadesSemPE() / d.unidades_com_plano_entregas.total) * 100);
  });

  readonly participantesSemPT = computed(() => {
    const d = this.data();
    if (!d) return 0;
    return Math.max(0, d.participantes_com_plano_trabalho.total - d.participantes_com_plano_trabalho.quantidade);
  });

  readonly percentualParticipantesSemPT = computed(() => {
    const d = this.data();
    if (!d || d.participantes_com_plano_trabalho.total === 0) return 0;
    return Math.round((this.participantesSemPT() / d.participantes_com_plano_trabalho.total) * 100);
  });

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
