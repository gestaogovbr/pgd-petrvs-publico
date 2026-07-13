import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeApiClient, PendenciasUsuario } from '../../infra/home-api.client';

@Component({
  selector: 'home-pendencias-usuario',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrls: ['../home.styles.scss'],
  template: `
    <div class="br-card home-card">
      <div class="card-content p-3">
        <h5 class="text-center fw-bold mb-3">Pendências do usuário</h5>
        @if (loading()) {
          <div class="d-flex justify-content-center py-3">
            <span class="br-loading small" role="progressbar"></span>
          </div>
        } @else if (data()) {
          <ul class="list-unstyled mb-0">
            <li class="d-flex justify-content-between py-1">
              <span>Assinaturas de PE pendentes</span>
              <strong>{{ data()!.assinaturas_pe_pendentes }}</strong>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Assinaturas de PT pendentes</span>
              <strong>{{ data()!.assinaturas_pt_pendentes }}</strong>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Registros de execução de PE em atraso</span>
              <strong>{{ data()!.registros_execucao_pe_atraso }}</strong>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Registros de execução de PT em atraso</span>
              <strong>{{ data()!.registros_execucao_pt_atraso }}</strong>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Avaliações de PT pendentes</span>
              <strong>{{ data()!.avaliacoes_pt_pendentes }}</strong>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Avaliações de PE pendentes</span>
              <strong>{{ data()!.avaliacoes_pe_pendentes }}</strong>
            </li>
          </ul>
        }
      </div>
    </div>
  `,
})
export class PendenciasUsuarioComponent {
  private readonly homeApi = inject(HomeApiClient);

  readonly unidadeId = input.required<string>();
  readonly subordinadas = input.required<boolean>();

  readonly data = signal<PendenciasUsuario | null>(null);
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
    this.homeApi.getPendencias(unidadeId, subordinadas).subscribe({
      next: (r) => { this.data.set(r); this.loading.set(false); },
      error: () => { this.data.set(null); this.loading.set(false); },
    });
  }
}
