import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PaginationV2Component } from 'src/app/v2/components/pagination/pagination.component';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';
import { LookupService } from 'src/app/services/lookup.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { RelatorioEntregaListFacade } from '../application/list.facade';
import { RelatorioEntregaUnidadesService } from '../application/relatorio-entrega-unidades.service';
import { ObterUnidadePadraoRelatorioEntrega } from '../application/relatorio-entrega.usecases';
import {
  RelatorioEntregaListFilters,
  RelatorioEntregaRow,
  RelatorioEntregaSortColumn,
} from '../domain/types';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-relatorio-entrega-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WebcomponentsAngularModule,
    BreadcrumbComponent,
    PaginationV2Component,
    SharedModule,
  ],
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class RelatorioEntregaListPage implements OnInit {
  readonly facade = inject(RelatorioEntregaListFacade);
  readonly unidadesService = inject(RelatorioEntregaUnidadesService);
  readonly unidadeDao = inject(UnidadeDaoService);
  readonly lookup = inject(LookupService);
  readonly lex = inject(LexicalService);
  readonly go = inject(NavigateService);

  private readonly fb = inject(FormBuilder);
  private readonly filterStorage = inject(FilterStorageService);
  private readonly obterUnidadePadrao = inject(ObterUnidadePadraoRelatorioEntrega);

  private readonly FILTER_KEY = 'relatorio-entrega:filters';

  readonly initialized = signal(false);

  private readonly PERIODO_INCOMPLETO_MSG =
    'Para realizar a consulta por período, informe as datas de início e fim.';

  readonly filters: FormGroup<{
    unidade_id: FormControl<string | null>;
    periodo_inicio: FormControl<string | null>;
    periodo_fim: FormControl<string | null>;
    incluir_unidades_subordinadas: FormControl<boolean>;
  }> = this.fb.group({
    unidade_id: this.fb.control<string | null>(null, Validators.required),
    periodo_inicio: this.fb.control<string | null>(null),
    periodo_fim: this.fb.control<string | null>(null),
    incluir_unidades_subordinadas: this.fb.nonNullable.control(false),
  });

  async ngOnInit(): Promise<void> {
    try {
      await this.unidadesService.init();
      this.restoreFilters();
      const atual = this.coerceUnidadeId(this.filters.controls.unidade_id.value);
      const sanitizado = this.unidadesService.normalizarUnidadeSelecionada(atual);
      if (sanitizado !== atual) {
        this.filters.controls.unidade_id.setValue(sanitizado, { emitEvent: false });
      }
      if (!sanitizado) {
        const padrao = await this.resolveUnidadePadrao();
        if (padrao) {
          this.filters.controls.unidade_id.setValue(padrao, { emitEvent: false });
        }
      }
    } finally {
      this.initialized.set(true);
      this.onConsultar();
    }
  }

  onConsultar(): void {
    if (!this.podeExecutarConsulta()) {
      return;
    }
    this.facade.page.set(1);
    this.saveFilters();
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  limparFiltros(): void {
    this.filters.reset({
      unidade_id: null,
      periodo_inicio: null,
      periodo_fim: null,
      incluir_unidades_subordinadas: false,
    });
    this.resolveUnidadePadrao().then((padrao) => {
      if (padrao) {
        this.filters.controls.unidade_id.setValue(padrao);
      }
      this.onConsultar();
    });
  }

  onPageChange(page: number): void {
    if (!this.podeExecutarConsulta()) {
      return;
    }
    this.facade.page.set(page);
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  onExportExcel(): void {
    if (!this.podeExecutarConsulta()) {
      return;
    }
    this.facade.filters.set(this.buildFilters());
    this.facade.exportExcel();
  }

  sortIcon(column: RelatorioEntregaSortColumn): string {
    if (this.facade.orderBy() !== column) {
      return 'bi bi-arrow-down-up text-muted';
    }
    return this.facade.orderDir() === 'asc' ? 'bi bi-sort-down' : 'bi bi-sort-up';
  }

  onSort(column: RelatorioEntregaSortColumn): void {
    if (!this.podeExecutarConsulta()) {
      return;
    }
    this.facade.filters.set(this.buildFilters());
    this.facade.toggleSort(column);
  }

  private podeExecutarConsulta(): boolean {
    if (this.filters.invalid) {
      this.filters.markAllAsTouched();
      return false;
    }
    if (this.hasPeriodoParcial()) {
      this.facade.error.set(this.PERIODO_INCOMPLETO_MSG);
      return false;
    }
    this.facade.error.set(null);
    return true;
  }

  private hasPeriodoParcial(): boolean {
    const { periodo_inicio, periodo_fim } = this.filters.getRawValue();
    const hasInicio = !!periodo_inicio;
    const hasFim = !!periodo_fim;
    return hasInicio !== hasFim;
  }

  statusLabel(status: string): string {
    return this.lookup.getValue(this.lookup.PLANO_ENTREGA_STATUS, status) || status || '-';
  }

  abrirEntrega(row: RelatorioEntregaRow): void {
    this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', row.id, 'consult'] }, { modal: true });
  }

  abrirPlano(row: RelatorioEntregaRow): void {
    this.go.navigate({ route: ['gestao', 'plano-entrega', row.plano_id, 'consult'] }, { modal: true });
  }

  abrirParticipantes(row: RelatorioEntregaRow): void {
    this.go.navigate(
      { route: ['relatorios', 'agentes'] },
      {
        metadata: {
          unidade_id: row.unidade_id,
          plano_entrega_entrega_id: row.id,
        },
      },
    );
  }

  abrirPlanosTrabalho(row: RelatorioEntregaRow): void {
    this.go.navigate(
      { route: ['relatorios', 'planos-trabalho'] },
      {
        metadata: {
          unidade_id: row.unidade_id,
          plano_entrega_entrega_id: row.id,
        },
      },
    );
  }

  private async resolveUnidadePadrao(): Promise<string | null> {
    try {
      await firstValueFrom(this.obterUnidadePadrao.execute());
    } catch {
      /* usa cálculo local */
    }
    return this.unidadesService.resolverUnidadePadrao();
  }

  private buildFilters(): RelatorioEntregaListFilters {
    const raw = this.filters.getRawValue();
    const out: RelatorioEntregaListFilters = {};
    const unidadeId = this.coerceUnidadeId(raw.unidade_id);
    if (unidadeId) out.unidade_id = unidadeId;
    if (raw.incluir_unidades_subordinadas === true) {
      out.incluir_unidades_subordinadas = true;
    }
    if (raw.periodo_inicio && raw.periodo_fim) {
      out.periodo_inicio = raw.periodo_inicio;
      out.periodo_fim = raw.periodo_fim;
    }
    return out;
  }

  private saveFilters(): void {
    this.filterStorage.save(this.FILTER_KEY, this.filters.getRawValue());
  }

  private restoreFilters(): void {
    const parsed = this.filterStorage.load<Partial<RelatorioEntregaListFilters & { unidade_id?: unknown }>>(
      this.FILTER_KEY,
    );
    if (!parsed) return;
    this.filters.patchValue(
      {
        unidade_id: this.coerceUnidadeId(parsed.unidade_id),
        periodo_inicio: parsed.periodo_inicio ?? null,
        periodo_fim: parsed.periodo_fim ?? null,
        incluir_unidades_subordinadas: !!parsed.incluir_unidades_subordinadas,
      },
      { emitEvent: false },
    );
  }

  private coerceUnidadeId(v: unknown): string | null {
    if (v == null) return null;
    if (typeof v === 'string') {
      const t = v.trim();
      return t === '' ? null : t;
    }
    if (typeof v === 'object' && v !== null && 'id' in v) {
      const id = String((v as { id: unknown }).id).trim();
      return id === '' ? null : id;
    }
    return null;
  }
}
