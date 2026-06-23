import { Injectable, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { TipoObjetivoApiClient } from '../infra/tipo-objetivo-api.client';
import { TipoObjetivo, TipoObjetivoPayload } from '../domain/types';

@Injectable()
export class TipoObjetivoFacade {
  private readonly api = inject(TipoObjetivoApiClient);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly items = signal<TipoObjetivo[]>([]);

  load() {
    this.loading.set(true);
    this.api
      .list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(items => this.items.set(items));
  }

  create(payload: TipoObjetivoPayload, onSuccess: (item: TipoObjetivo) => void) {
    this.saving.set(true);
    this.api
      .create(payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe(item => {
        this.items.update(list => [...list, item].sort((a, b) => a.nome.localeCompare(b.nome)));
        onSuccess(item);
      });
  }

  update(id: string, payload: TipoObjetivoPayload, onSuccess: (item: TipoObjetivo) => void) {
    this.saving.set(true);
    this.api
      .update(id, payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe(item => {
        this.items.update(list =>
          list
            .map(current => (current.id === item.id ? item : current))
            .sort((a, b) => a.nome.localeCompare(b.nome))
        );
        onSuccess(item);
      });
  }

  remove(id: string, onSuccess: () => void) {
    this.saving.set(true);
    this.api
      .delete(id)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe(() => {
        this.items.update(list => list.filter(item => item.id !== id));
        onSuccess();
      });
  }
}
