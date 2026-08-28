import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AtalhoCardComponent } from './atalho-card.component';
import { AuthService } from 'src/app/services/auth.service';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';

@Component({
  selector: 'home-acoes-gerenciais',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AtalhoCardComponent],
  styleUrls: ['../home.styles.scss'],
  templateUrl: './acoes-gerenciais.component.html',
})
export class AcoesGerenciaisComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly filterStorage = inject(FilterStorageService);

  irParaPainelGerencial(): void {
    this.router.navigate(['gestao', 'paineis-gerenciais']);
  }

  irParaPlanoEntregas(): void {
    this.router.navigate(['gestao', 'plano-entrega'], {
      queryParams: { planejamento: true, vigentes: true },
    });
  }

  irParaPlanoTrabalho(): void {
    this.salvarFiltrosPT({ vigentes: true, meus_planos: true, incluir_subordinadas: false });
    this.router.navigate(['gestao', 'plano-trabalho-v2']);
  }

  private salvarFiltrosPT(filtros: Record<string, unknown>): void {
    const userId = this.auth.usuario?.id;
    const key = userId ? `plano-trabalho-v2:filters:${userId}` : 'plano-trabalho-v2:filters';
    this.filterStorage.save(key, filtros);
  }
}
