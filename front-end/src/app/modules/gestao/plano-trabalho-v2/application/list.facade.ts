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
  readonly filter = signal<Record<string, unknown>>({});

  readonly items = signal<PlanoTrabalho[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);

  readonly params = computed<QueryParams>(() => ({
    page: this.page(),
    pageSize: this.pageSize(),
    sort: this.sort(),
    filter: this.filter()
  }));

  load() {
    this.loading.set(true);
    this.listar
      .execute(this.params())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((page) => {
        this.items.set(page.items);
        this.total.set(page.total);
      });
  }
}
