import { Injectable, computed, inject, signal } from '@angular/core';
import { ListarEnvioPlanoTrabalho } from './listar-envio-plano-trabalho.usecase';
import { EnvioPlanoTrabalhoListFilters, EnvioPlanoTrabalhoQueryParams, EnvioPlanoTrabalhoRow } from '../domain/types';
import { finalize } from 'rxjs/operators';

@Injectable()
export class EnvioPlanoTrabalhoListFacade {
  private readonly listar = inject(ListarEnvioPlanoTrabalho);

  readonly page = signal(1);
  readonly filters = signal<EnvioPlanoTrabalhoListFilters>({});

  readonly items = signal<EnvioPlanoTrabalhoRow[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly lastPage = signal(1);
  readonly error = signal<string | null>(null);

  readonly params = computed<EnvioPlanoTrabalhoQueryParams>(() => ({
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
          this.error.set('Não foi possível carregar os envios de planos de trabalho. Tente novamente.');
        },
      });
  }
}
