import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeApiClient, PendenciasUsuario } from '../../infra/home-api.client';
import { HOME_ERRO_RECUPERAR_DADOS } from '../../home.constants';
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
export class PendenciasUsuarioComponent implements OnInit {
  private readonly homeApi = inject(HomeApiClient);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly filterStorage = inject(FilterStorageService);
  private readonly go = inject(NavigateService);

  readonly data = signal<PendenciasUsuario | null>(null);
  readonly loading = signal(false);
  readonly erro = signal<string | null>(null);

  ngOnInit(): void {
    this.loading.set(true);
    this.erro.set(null);
    this.homeApi.getPendenciasGlobal().subscribe({
      next: (r) => { this.data.set(r); this.loading.set(false); },
      error: () => { this.data.set(null); this.erro.set(HOME_ERRO_RECUPERAR_DADOS); this.loading.set(false); },
    });
  }

  irParaAssinaturasPE(): void {
    this.go.navigate({
      route: ['gestao', 'plano-entrega'],
      params: { filter: { status: 'HOMOLOGANDO', meus_planos: false } },
    });
  }

  irParaAssinaturasPT(): void {
    this.salvarFiltrosPT({ aguardando_minha_assinatura: true, meus_planos: false });
    this.router.navigate(['gestao', 'plano-trabalho-v2']);
  }

  irParaRegistrosExecucaoPE(): void {
    this.go.navigate({
      route: ['execucao', 'plano-entrega'],
      params: { execucao: true, filter: { meus_planos: false } },
    });
  }

  irParaRegistrosExecucaoPT(): void {
    this.salvarFiltrosPT({ meus_planos: true, vigentes: false, status: 'ATIVO' });
    this.router.navigate(['gestao', 'plano-trabalho-v2']);
  }

  irParaAvaliacoesPT(): void {
    this.salvarFiltrosPT({ aguardando_minha_avaliacao: true, meus_planos: false });
    this.router.navigate(['gestao', 'plano-trabalho-v2']);
  }

  irParaAvaliacoesPE(): void {
    this.go.navigate({
      route: ['gestao', 'plano-entrega'],
      params: { avaliacao: true, filter: { status: 'CONCLUIDO', meus_planos: false } },
    });
  }

  private salvarFiltrosPT(filtros: Record<string, unknown>): void {
    const userId = this.auth.usuario?.id;
    const key = userId ? `plano-trabalho-v2:filters:${userId}` : 'plano-trabalho-v2:filters';
    this.filterStorage.save(key, filtros);
  }
}
