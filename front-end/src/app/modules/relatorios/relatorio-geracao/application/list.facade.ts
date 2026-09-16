import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { Subject, EMPTY, Subscription } from 'rxjs';
import { catchError, exhaustMap, finalize, tap } from 'rxjs/operators';
import {
  BaixarRelatorioGeracao,
  ConsultarStatusRelatorioGeracao,
  ListarRelatorioGeracao,
} from './relatorio-geracao.usecases';
import {
  RelatorioGeracaoListFilters,
  RelatorioGeracaoQueryParams,
  RelatorioGeracaoRow,
  RelatorioGeracaoSortColumn,
  relatorioEstaConcluido,
  relatorioEstaProcessando,
} from '../domain/types';

@Injectable()
export class RelatorioGeracaoListFacade implements OnDestroy {
  static readonly POLL_INTERVAL_MS = 5000;

  private readonly listar = inject(ListarRelatorioGeracao);
  private readonly consultarStatus = inject(ConsultarStatusRelatorioGeracao);
  private readonly baixar = inject(BaixarRelatorioGeracao);

  readonly page = signal(1);
  readonly filters = signal<RelatorioGeracaoListFilters>({});
  readonly orderBy = signal<RelatorioGeracaoSortColumn>('iniciado_em');
  readonly orderDir = signal<'asc' | 'desc'>('desc');

  readonly items = signal<RelatorioGeracaoRow[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly downloadingId = signal<string | null>(null);
  readonly lastPage = signal(1);
  readonly error = signal<string | null>(null);

  private loadingList = false;
  private readonly statusTick = new Subject<void>();
  private readonly statusSub: Subscription;

  readonly params = computed<RelatorioGeracaoQueryParams>(() => ({
    page: this.page(),
    filters: this.filters(),
    orderBy: this.orderBy(),
    orderDir: this.orderDir(),
  }));

  readonly processingIds = computed(() =>
    this.items()
      .filter((row) => relatorioEstaProcessando(row) && !!row.id)
      .map((row) => row.id),
  );

  constructor() {
    this.statusSub = this.statusTick
      .pipe(
        exhaustMap(() => {
          const ids = this.processingIds();
          if (ids.length === 0 || this.loadingList || document.visibilityState !== 'visible') {
            return EMPTY;
          }
          return this.consultarStatus.execute(ids).pipe(
            tap((rows) => this.mergeStatuses(rows)),
            catchError(() => EMPTY),
          );
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.statusSub.unsubscribe();
    this.statusTick.complete();
  }

  load(): void {
    this.loadingList = true;
    this.loading.set(true);
    this.error.set(null);
    this.listar
      .execute(this.params())
      .pipe(
        finalize(() => {
          this.loadingList = false;
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: (result) => {
          this.items.set(result.items);
          this.total.set(result.total);
          this.page.set(result.page);
          this.lastPage.set(result.lastPage);
        },
        error: (err) => {
          const msg =
            err?.error?.error ??
            'Não foi possível carregar as exportações de relatório. Tente novamente.';
          this.error.set(typeof msg === 'string' ? msg : String(msg));
          this.items.set([]);
          this.total.set(0);
          this.lastPage.set(1);
        },
      });
  }

  syncStatuses(): void {
    this.statusTick.next();
  }

  download(row: RelatorioGeracaoRow): void {
    if (!relatorioEstaConcluido(row) || !row.id) {
      return;
    }
    this.downloadingId.set(row.id);
    this.error.set(null);
    this.baixar
      .execute(row.id)
      .pipe(finalize(() => this.downloadingId.set(null)))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = row.arquivo_nome || 'relatorio.xlsx';
          anchor.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          const msg = err?.error?.error ?? 'Não foi possível baixar o relatório.';
          this.error.set(typeof msg === 'string' ? msg : String(msg));
        },
      });
  }

  toggleSort(column: RelatorioGeracaoSortColumn): void {
    if (this.orderBy() === column) {
      this.orderDir.set(this.orderDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.orderBy.set(column);
      this.orderDir.set('asc');
    }
    this.page.set(1);
    this.load();
  }

  private mergeStatuses(updates: RelatorioGeracaoRow[]): void {
    if (updates.length === 0) {
      return;
    }
    const byId = new Map(updates.map((row) => [row.id, row]));
    this.items.update((items) => items.map((item) => byId.get(item.id) ?? item));
  }
}
