import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PaginationV2Component } from 'src/app/v2/components/pagination/pagination.component';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';
import { RelatorioGeracaoListFacade } from '../application/list.facade';
import {
  RelatorioGeracaoListFilters,
  RelatorioGeracaoRow,
  RelatorioGeracaoSortColumn,
  RelatorioGeracaoStatus,
  RELATORIO_GERACAO_GRUPO,
  RELATORIO_GERACAO_GRUPO_LABEL,
  RELATORIO_GERACAO_STATUS_LABEL,
  grupoRelatorio,
  nomeRelatorioExibicao,
  normalizarStatusRelatorio,
  relatorioEstaConcluido,
  relatorioEstaProcessando,
  progressoPercentual as calcularProgressoPercentual,
} from '../domain/types';

interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'app-relatorio-geracao-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WebcomponentsAngularModule,
    BreadcrumbComponent,
    PaginationV2Component,
  ],
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class RelatorioGeracaoListPage implements OnInit {
  readonly facade = inject(RelatorioGeracaoListFacade);

  private readonly fb = inject(FormBuilder);
  private readonly filterStorage = inject(FilterStorageService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly FILTER_KEY = 'relatorio-exportacao:filters';
  private readonly filtroTodos = 'Todos';

  readonly tipoOptions = signal<SelectOption[]>(this.buildTipoOptions());
  readonly statusOptions = signal<SelectOption[]>(this.buildStatusOptions());

  readonly filters: FormGroup<{
    tipo: FormControl<string>;
    status: FormControl<string>;
  }> = this.fb.group({
    tipo: this.fb.nonNullable.control(this.filtroTodos),
    status: this.fb.nonNullable.control(this.filtroTodos),
  });

  ngOnInit(): void {
    this.restoreFilters();
    this.onConsultar();
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.facade.syncStatuses();
      }
    }, RelatorioGeracaoListFacade.POLL_INTERVAL_MS);
    const onVisible = (): void => {
      if (document.visibilityState === 'visible') {
        this.facade.syncStatuses();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    this.destroyRef.onDestroy(() => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    });
  }

  onConsultar(): void {
    this.facade.error.set(null);
    this.facade.page.set(1);
    this.saveFilters();
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  limparFiltros(): void {
    this.filters.reset({
      tipo: this.filtroTodos,
      status: this.filtroTodos,
    });
    this.onConsultar();
  }

  onPageChange(page: number): void {
    this.facade.page.set(page);
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  onSort(column: RelatorioGeracaoSortColumn): void {
    this.facade.filters.set(this.buildFilters());
    this.facade.toggleSort(column);
  }

  sortAria(column: RelatorioGeracaoSortColumn): 'ascending' | 'descending' | 'none' {
    if (this.facade.orderBy() !== column) {
      return 'none';
    }
    return this.facade.orderDir() === 'asc' ? 'ascending' : 'descending';
  }

  sortMark(column: RelatorioGeracaoSortColumn): string {
    if (this.facade.orderBy() !== column) {
      return '⇅';
    }
    return this.facade.orderDir() === 'asc' ? '▲' : '▼';
  }

  statusColor(row: RelatorioGeracaoRow): string {
    if (this.estaProcessando(row)) {
      return '#df8e32';
    }
    if (this.estaConcluido(row)) {
      return '#2a9c2a';
    }
    if (this.ehErro(row)) {
      return '#c92c2c';
    }
    return '#686868';
  }

  estaConcluido(row: RelatorioGeracaoRow): boolean {
    return relatorioEstaConcluido(row);
  }

  estaProcessando(row: RelatorioGeracaoRow): boolean {
    return relatorioEstaProcessando(row);
  }

  progressoPercentual(row: RelatorioGeracaoRow): number {
    return calcularProgressoPercentual(row);
  }

  progressoTitulo(row: RelatorioGeracaoRow): string {
    const processadas = row.progresso_pagina ?? 0;
    const total = row.progresso_total ?? 0;
    if (total > 0) {
      return `Em processamento: ${processadas} de ${total} registros (${this.progressoPercentual(row)}%)`;
    }
    if (processadas > 0) {
      return `Em processamento: ${processadas} registros`;
    }
    return 'Em processamento';
  }

  ehErro(row: RelatorioGeracaoRow): boolean {
    return normalizarStatusRelatorio(row.status) === RelatorioGeracaoStatus.ERRO;
  }

  download(row: RelatorioGeracaoRow): void {
    this.facade.download(row);
  }

  private buildFilters(): RelatorioGeracaoListFilters {
    const raw = this.filters.getRawValue();
    const out: RelatorioGeracaoListFilters = {};
    const tipo = String(raw.tipo ?? '').trim();
    if (tipo.length && tipo !== this.filtroTodos) {
      out.tipo = grupoRelatorio(tipo) ?? tipo;
    }
    const status = String(raw.status ?? '').trim();
    if (status.length && status !== this.filtroTodos) {
      out.status = status;
    }
    return out;
  }

  private saveFilters(): void {
    this.filterStorage.save(this.FILTER_KEY, this.filters.getRawValue());
  }

  private restoreFilters(): void {
    const parsed = this.filterStorage.load<Partial<{
      tipo?: string;
      status?: string;
    }>>(this.FILTER_KEY);
    if (!parsed) {
      return;
    }
    this.filters.patchValue(
      {
        tipo: grupoRelatorio(parsed.tipo) ?? this.filtroTodos,
        status: parsed.status?.trim() || this.filtroTodos,
      },
      { emitEvent: false },
    );
  }

  nomeRelatorio(row: RelatorioGeracaoRow): string {
    return nomeRelatorioExibicao(row);
  }

  private buildTipoOptions(): SelectOption[] {
    return [
      { value: this.filtroTodos, label: '- Todos -', selected: true },
      ...Object.values(RELATORIO_GERACAO_GRUPO).map((value) => ({
        value,
        label: RELATORIO_GERACAO_GRUPO_LABEL[value],
      })),
    ];
  }

  private buildStatusOptions(): SelectOption[] {
    return [
      { value: this.filtroTodos, label: '- Todos -', selected: true },
      ...Object.values(RelatorioGeracaoStatus).map((value) => ({
        value,
        label: RELATORIO_GERACAO_STATUS_LABEL[value],
      })),
    ];
  }
}
