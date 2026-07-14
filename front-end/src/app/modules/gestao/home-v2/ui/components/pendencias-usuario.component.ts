import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeApiClient, PendenciasUsuario } from '../../infra/home-api.client';
import { AuthService } from 'src/app/services/auth.service';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';
import { NavigateService } from 'src/app/services/navigate.service';

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
              <a class="fw-bold text-decoration-none" role="link" tabindex="0"
                (click)="irParaAssinaturasPE()" (keydown.enter)="irParaAssinaturasPE()">
                {{ data()!.assinaturas_pe_pendentes }}
              </a>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Assinaturas de PT pendentes</span>
              <a class="fw-bold text-decoration-none" role="link" tabindex="0"
                (click)="irParaAssinaturasPT()" (keydown.enter)="irParaAssinaturasPT()">
                {{ data()!.assinaturas_pt_pendentes }}
              </a>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Registros de execução de PE em atraso</span>
              <a class="fw-bold text-decoration-none" role="link" tabindex="0"
                (click)="irParaRegistrosExecucaoPE()" (keydown.enter)="irParaRegistrosExecucaoPE()">
                {{ data()!.registros_execucao_pe_atraso }}
              </a>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Registros de execução de PT em atraso</span>
              <a class="fw-bold text-decoration-none" role="link" tabindex="0"
                (click)="irParaRegistrosExecucaoPT()" (keydown.enter)="irParaRegistrosExecucaoPT()">
                {{ data()!.registros_execucao_pt_atraso }}
              </a>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Avaliações de PT pendentes</span>
              <a class="fw-bold text-decoration-none" role="link" tabindex="0"
                (click)="irParaAvaliacoesPT()" (keydown.enter)="irParaAvaliacoesPT()">
                {{ data()!.avaliacoes_pt_pendentes }}
              </a>
            </li>
            <li class="d-flex justify-content-between py-1">
              <span>Avaliações de PE pendentes</span>
              <a class="fw-bold text-decoration-none" role="link" tabindex="0"
                (click)="irParaAvaliacoesPE()" (keydown.enter)="irParaAvaliacoesPE()">
                {{ data()!.avaliacoes_pe_pendentes }}
              </a>
            </li>
          </ul>
        }
      </div>
    </div>
  `,
})
export class PendenciasUsuarioComponent {
  private readonly homeApi = inject(HomeApiClient);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly filterStorage = inject(FilterStorageService);
  private readonly go = inject(NavigateService);

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

  irParaAssinaturasPE(): void {
    this.go.navigate({
      route: ['gestao', 'plano-entrega'],
      params: { filter: { status: 'HOMOLOGANDO', unidades_filhas: true, meus_planos: false } },
    });
  }

  irParaAssinaturasPT(): void {
    this.salvarFiltrosPT({ aguardando_minha_assinatura: true, incluir_subordinadas: this.subordinadas(), meus_planos: false, unidade_id: this.unidadeId() });
    this.router.navigate(['gestao', 'plano-trabalho-v2']);
  }

  irParaRegistrosExecucaoPE(): void {
    this.go.navigate({
      route: ['execucao', 'plano-entrega'],
      params: { execucao: true, filter: { meus_planos: false } },
    });
  }

  irParaRegistrosExecucaoPT(): void {
    this.salvarFiltrosPT({ meus_planos: true, vigentes: false, status: 'ATIVO', unidade_id: this.unidadeId() });
    this.router.navigate(['gestao', 'plano-trabalho-v2']);
  }

  irParaAvaliacoesPT(): void {
    this.salvarFiltrosPT({
      aguardando_minha_avaliacao: true,
      incluir_subordinadas: this.subordinadas(),
      meus_planos: false,
      unidade_id: this.unidadeId(),
    });
    this.router.navigate(['gestao', 'plano-trabalho-v2']);
  }

  irParaAvaliacoesPE(): void {
    this.go.navigate({
      route: ['gestao', 'plano-entrega'],
      params: { avaliacao: true, filter: { meus_planos: false } },
    });
  }

  private fetch(unidadeId: string, subordinadas: boolean): void {
    this.loading.set(true);
    this.homeApi.getPendencias(unidadeId, subordinadas).subscribe({
      next: (r) => { this.data.set(r); this.loading.set(false); },
      error: () => { this.data.set(null); this.loading.set(false); },
    });
  }

  private salvarFiltrosPT(filtros: Record<string, unknown>): void {
    const userId = this.auth.usuario?.id;
    const key = userId ? `plano-trabalho-v2:filters:${userId}` : 'plano-trabalho-v2:filters';
    this.filterStorage.save(key, filtros);
  }
}
