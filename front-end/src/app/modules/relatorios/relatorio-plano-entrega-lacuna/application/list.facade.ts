import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ListarRelatorioPlanoEntregaLacuna } from './listar-lacunas.usecase';
import { RelatorioPlanoEntregaLacunaListFilters, RelatorioPlanoEntregaLacunaQueryParams, RelatorioPlanoEntregaLacunaRow } from '../domain/types';

@Injectable()
export class RelatorioPlanoEntregaLacunaListFacade {
  private readonly listar = inject(ListarRelatorioPlanoEntregaLacuna);

  readonly page = signal(1);
  readonly filters = signal<RelatorioPlanoEntregaLacunaListFilters>({});

  readonly items = signal<RelatorioPlanoEntregaLacunaRow[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly lastPage = signal(1);
  readonly error = signal<string | null>(null);

  readonly params = computed<RelatorioPlanoEntregaLacunaQueryParams>(() => ({
    page: this.page(),
    filters: this.filters(),
  }));

  load(onComplete?: () => void): void {
    this.loading.set(true);
    this.error.set(null);
    onComplete?.();
    this.listar
      .execute(this.params())
      .pipe(finalize(() => {
        this.loading.set(false);
        onComplete?.();
      }))
      .subscribe({
        next: (result) => {
          this.items.set(result.items);
          this.total.set(result.total);
          this.page.set(result.page);
          this.lastPage.set(result.lastPage);
          onComplete?.();
        },
        error: () => {
          this.error.set('Não foi possível carregar as lacunas de planos de entrega. Tente novamente.');
          onComplete?.();
        },
      });
  }
}
