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
        <div class="col-md-6">
          <div class="br-card home-card h-100">
            <div class="card-content text-center">
              <h6 class="fw-bold">
                Participantes do PGD
                <i class="fas fa-info-circle text-muted ml-1"
                   title="Representa a quantidade de participantes do PGD lotados ou vinculados à unidade selecionada, conforme informações registradas pela chefia no SouGov Líder. Quando a opção Unidades Subordinadas estiver habilitada, também serão considerados os dados das respectivas unidades subordinadas."
                   aria-label="Informação sobre participantes do PGD"></i>
              </h6>
              <p class="display-6 mb-0">{{ data()!.participantes_pgd.quantidade }}</p>
              <small>{{ data()!.participantes_pgd.percentual }}% da equipe</small>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="br-card home-card h-100">
            <div class="card-content text-center">
              <h6 class="fw-bold">
                Capacidade da equipe no PGD
                <i class="fas fa-info-circle text-muted ml-1"
                   title="Representa a soma da carga horária disponível dos participantes do PGD lotados ou vinculados à unidade selecionada, considerando suas respectivas jornadas de trabalho. Quando a opção Unidades Subordinadas estiver habilitada, também serão considerados os dados das respectivas unidades subordinadas."
                   aria-label="Informação sobre capacidade da equipe"></i>
              </h6>
              <p class="display-6 mb-0">{{ data()!.capacidade_equipe_horas_mensais }}</p>
              <small>horas mensais</small>
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
