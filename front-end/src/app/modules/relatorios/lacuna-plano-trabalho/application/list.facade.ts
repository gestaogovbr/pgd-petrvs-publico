import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ListarLacunaPlanoTrabalho } from './listar-lacuna-plano-trabalho.usecase';
import { LacunaPlanoTrabalhoListFilters, LacunaPlanoTrabalhoQueryParams, LacunaPlanoTrabalhoRow } from '../domain/types';

@Injectable()
export class LacunaPlanoTrabalhoListFacade {
  private readonly listar = inject(ListarLacunaPlanoTrabalho);

  readonly page = signal(1);
  readonly filters = signal<LacunaPlanoTrabalhoListFilters | null>(null);

  readonly items = signal<LacunaPlanoTrabalhoRow[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly lastPage = signal(1);
  readonly error = signal<string | null>(null);

  readonly params = computed<LacunaPlanoTrabalhoQueryParams | null>(() => {
    const filters = this.filters();
    if (!filters) {
      return null;
    }
    return { page: this.page(), filters };
  });

  load(): void {
    const params = this.params();
    if (!params) {
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.listar
      .execute(params)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (result) => {
          this.items.set(result.items);
          this.total.set(result.total);
          this.page.set(result.page);
          this.lastPage.set(result.lastPage);
        },
        error: () => {
          this.error.set('Não foi possível carregar as lacunas de Planos de Trabalho. Tente novamente.');
        },
      });
  }
}
