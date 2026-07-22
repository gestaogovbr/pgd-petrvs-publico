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
  templateUrl: './pendencias-usuario.component.html',
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
      params: { filter: { status: 'HOMOLOGANDO', subordinadas: this.subordinadas(), meus_planos: false, unidade_id: this.unidadeId() } },
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
      params: { avaliacao: true, filter: { status: 'CONCLUIDO', meus_planos: false, unidade_id: this.unidadeId(), subordinadas: this.subordinadas() } },
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
