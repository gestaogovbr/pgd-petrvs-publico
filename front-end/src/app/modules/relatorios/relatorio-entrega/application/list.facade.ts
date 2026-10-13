import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
  ExportarRelatorioEntrega,
  ListarRelatorioEntrega,
} from './relatorio-entrega.usecases';
import {
  RelatorioEntregaListFilters,
  RelatorioEntregaQueryParams,
  RelatorioEntregaRow,
  RelatorioEntregaSortColumn,
} from '../domain/types';
import { MessageService } from 'src/app/v2/services/message.service';

@Injectable()
export class RelatorioEntregaListFacade {
  private readonly listar = inject(ListarRelatorioEntrega);
  private readonly exportar = inject(ExportarRelatorioEntrega);
  private readonly message = inject(MessageService);

  readonly page = signal(1);
  readonly filters = signal<RelatorioEntregaListFilters>({});
  readonly orderBy = signal<RelatorioEntregaSortColumn>('unidadeHierarquia');
  readonly orderDir = signal<'asc' | 'desc'>('asc');

  readonly items = signal<RelatorioEntregaRow[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly exporting = signal(false);
  readonly lastPage = signal(1);
  readonly error = signal<string | null>(null);

  readonly params = computed<RelatorioEntregaQueryParams>(() => ({
    page: this.page(),
    filters: this.filters(),
    orderBy: this.orderBy(),
    orderDir: this.orderDir(),
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
        error: (err) => {
          const msg =
            err?.error?.error ??
            'Não foi possível carregar o relatório de entregas. Tente novamente.';
          this.error.set(typeof msg === 'string' ? msg : String(msg));
          this.items.set([]);
          this.total.set(0);
          this.lastPage.set(1);
        },
      });
  }

  exportExcel(): void {
    this.exporting.set(true);
    this.error.set(null);
    this.exportar
      .execute({
        filters: this.filters(),
        orderBy: this.orderBy(),
        orderDir: this.orderDir(),
      })
      .pipe(finalize(() => this.exporting.set(false)))
      .subscribe({
        next: (res) => {
          if (res) {
            this.message.success(
              'Seu relatório está sendo gerado! Acompanhe o progresso e faça o <a href="/relatorios/exportacao" target="_blank" rel="noopener noreferrer">download</a> na tela Exportação de Relatórios. O arquivo ficará disponível por 24 horas.',
              'Sucesso!',
              { html: true },
            );
          }
        },
        error: (err) => {
          const msg = err?.error?.error ?? 'Não foi possível solicitar a geração do relatório.';
          this.error.set(typeof msg === 'string' ? msg : String(msg));
        },
      });
  }

  toggleSort(column: RelatorioEntregaSortColumn): void {
    if (this.orderBy() === column) {
      this.orderDir.set(this.orderDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.orderBy.set(column);
      this.orderDir.set('asc');
    }
    this.page.set(1);
    this.load();
  }
}
