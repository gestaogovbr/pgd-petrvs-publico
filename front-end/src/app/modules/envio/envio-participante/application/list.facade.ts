import { Injectable, computed, inject, signal } from '@angular/core';
import { ListarEnvioParticipantes } from './listar-envio-participantes.usecase';
import { EnvioParticipanteListFilters, EnvioParticipanteQueryParams, EnvioParticipanteRow } from '../domain/types';
import { finalize } from 'rxjs/operators';

@Injectable()
export class EnvioParticipanteListFacade {
  private readonly listar = inject(ListarEnvioParticipantes);

  readonly page = signal(1);
  readonly filters = signal<EnvioParticipanteListFilters>({});

  readonly items = signal<EnvioParticipanteRow[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly lastPage = signal(1);
  readonly error = signal<string | null>(null);

  readonly params = computed<EnvioParticipanteQueryParams>(() => ({
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
          this.error.set('Não foi possível carregar os envios de participantes. Tente novamente.');
        }
      });
  }
}
