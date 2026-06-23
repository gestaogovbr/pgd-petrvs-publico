import { Injectable, computed, inject, signal } from '@angular/core';
import { ListarEnvioPlanoEntrega } from './listar-envio-plano-entrega.usecase';
import { EnvioPlanoEntregaListFilters, EnvioPlanoEntregaQueryParams, EnvioPlanoEntregaRow } from '../domain/types';
import { finalize } from 'rxjs/operators';

@Injectable()
export class EnvioPlanoEntregaListFacade {
  private readonly listar = inject(ListarEnvioPlanoEntrega);

  readonly page = signal(1);
  readonly filters = signal<EnvioPlanoEntregaListFilters>({});

  readonly items = signal<EnvioPlanoEntregaRow[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly lastPage = signal(1);
  readonly error = signal<string | null>(null);

  readonly params = computed<EnvioPlanoEntregaQueryParams>(() => ({
    page: this.page(),
    filters: this.filters(),
  }));

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.listar
      .execute(this.params())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (result) => {
          this.items.set(result.items);
          this.total.set(result.total);
          this.page.set(result.page);
          this.lastPage.set(result.lastPage);
        },
        error: () => {
          this.error.set('Não foi possível carregar os envios de planos de entrega. Tente novamente.');
        },
      });
  }
}
