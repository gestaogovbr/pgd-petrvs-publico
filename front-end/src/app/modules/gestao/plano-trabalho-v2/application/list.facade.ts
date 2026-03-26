import { Injectable, computed, inject, signal } from '@angular/core';
import { ListarPlanos } from './listar-planos.usecase';
import { PlanoTrabalho, QueryParams } from '../domain/types';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoListFacade {
  private readonly listar = inject(ListarPlanos);

  readonly page = signal(1);
  readonly pageSize = signal(20);
  readonly sort = signal<string | undefined>(undefined);
  readonly filters = signal<Record<string, unknown>>({});

  readonly items = signal<PlanoTrabalho[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly lastPage = signal(1);

  readonly params = computed<QueryParams>(() => ({
    page: this.page(),
    pageSize: this.pageSize(),
    sort: this.sort(),
    filters: this.filters()
  }));

  load() {
    this.loading.set(true);
    this.listar
      .execute(this.params())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((result) => {
        this.items.set(result.items);
        this.total.set(result.total);
        this.page.set(result.page);
        this.pageSize.set(result.perPage);
        this.lastPage.set(result.lastPage);
      });
  }
}
