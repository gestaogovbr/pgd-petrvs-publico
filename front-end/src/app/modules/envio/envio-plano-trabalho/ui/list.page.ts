import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnvioPlanoTrabalhoListFacade } from '../application/list.facade';
import { EnvioPlanoTrabalhoListFilters, EnvioPlanoTrabalhoRow } from '../domain/types';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PaginationV2Component } from 'src/app/v2/components/pagination/pagination.component';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';
import { LookupService } from 'src/app/services/lookup.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'app-envio-plano-trabalho-list-page',
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
export class EnvioPlanoTrabalhoListPage implements OnInit {
  readonly facade = inject(EnvioPlanoTrabalhoListFacade);
  private readonly fb = inject(FormBuilder);
  private readonly filterStorage = inject(FilterStorageService);
  private readonly lookup = inject(LookupService);
  readonly lex = inject(LexicalService);
  readonly unidadeDao = inject(UnidadeDaoService);

  private readonly FILTER_KEY = 'envio-plano-trabalho:filters';

  private readonly statusTodos = 'Todos';

  readonly statusOptions = signal<SelectOption[]>([{ value: this.statusTodos, label: '- Todos -', selected: true }]);

  readonly filters: FormGroup<{
    numero: FormControl<string>;
    unidade_id: FormControl<string | null>;
    status: FormControl<string>;
    alteracao_inicio: FormControl<string | null>;
    alteracao_fim: FormControl<string | null>;
    conclusao_inicio: FormControl<string | null>;
    conclusao_fim: FormControl<string | null>;
    envio_inicio: FormControl<string | null>;
    envio_fim: FormControl<string | null>;
  }> = this.fb.group({
    numero: this.fb.nonNullable.control(''),
    unidade_id: this.fb.control<string | null>(null),
    status: this.fb.nonNullable.control(this.statusTodos),
    alteracao_inicio: this.fb.control<string | null>(null),
    alteracao_fim: this.fb.control<string | null>(null),
    conclusao_inicio: this.fb.control<string | null>(null),
    conclusao_fim: this.fb.control<string | null>(null),
    envio_inicio: this.fb.control<string | null>(null),
    envio_fim: this.fb.control<string | null>(null),
  });

  ngOnInit(): void {
    const opts: SelectOption[] = [{ value: this.statusTodos, label: '- Todos -', selected: true }];
    for (const it of this.lookup.ENVIO_USUARIO_STATUS) {
      if (it.key === 'Todos') continue;
      opts.push({ value: it.value, label: it.key });
    }
    this.statusOptions.set(opts);

    this.restoreFilters();
    this.applyFiltersAndLoad(true);
  }

  hasAnyFilter(): boolean {
    return Object.keys(this.buildFilters()).length > 0;
  }

  onConsultar(): void {
    this.applyFiltersAndLoad(true);
  }

  limparFiltros(): void {
    this.filters.reset({
      numero: '',
      unidade_id: null,
      status: this.statusTodos,
      alteracao_inicio: null,
      alteracao_fim: null,
      conclusao_inicio: null,
      conclusao_fim: null,
      envio_inicio: null,
      envio_fim: null,
    });
    this.applyFiltersAndLoad(true);
  }

  onPageChange(page: number): void {
    if (!this.hasAnyFilter()) {
      return;
    }
    this.facade.page.set(page);
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  private saveFilters(): void {
    this.filterStorage.save(this.FILTER_KEY, this.filters.getRawValue());
  }

  private restoreFilters(): void {
    const parsed = this.filterStorage.load<Partial<EnvioPlanoTrabalhoListFilters & { unidade_id?: unknown }>>(
      this.FILTER_KEY,
    );
    if (!parsed) return;
    const status =
      parsed.status === undefined || parsed.status === null || String(parsed.status).trim() === ''
        ? this.statusTodos
        : parsed.status;
    this.filters.patchValue(
      {
        numero: parsed.numero !== undefined && parsed.numero !== null ? String(parsed.numero) : '',
        unidade_id: this.coerceUnidadeId(parsed.unidade_id),
        status: String(status),
        alteracao_inicio: parsed.alteracao_inicio ?? null,
        alteracao_fim: parsed.alteracao_fim ?? null,
        conclusao_inicio: parsed.conclusao_inicio ?? null,
        conclusao_fim: parsed.conclusao_fim ?? null,
        envio_inicio: parsed.envio_inicio ?? null,
        envio_fim: parsed.envio_fim ?? null,
      },
      { emitEvent: false },
    );
  }

  private applyFiltersAndLoad(resetPage: boolean): void {
    if (resetPage) {
      this.facade.page.set(1);
    }
    this.saveFilters();
    const filters = this.buildFilters();
    this.facade.filters.set(filters);
    if (Object.keys(filters).length === 0) {
      this.facade.items.set([]);
      this.facade.total.set(0);
      this.facade.lastPage.set(1);
      this.facade.page.set(1);
      this.facade.error.set(null);
      return;
    }
    this.facade.load();
  }

  private buildFilters(): EnvioPlanoTrabalhoListFilters {
    const raw = this.filters.getRawValue();
    const out: EnvioPlanoTrabalhoListFilters = {};
    const numero = String(raw.numero ?? '').trim();
    if (numero.length) out.numero = numero;
    const unidadeId = this.coerceUnidadeId(raw.unidade_id);
    if (unidadeId) out.unidade_id = unidadeId;
    const status = String(raw.status ?? '').trim();
    if (status.length && status !== this.statusTodos) out.status = status;
    if (raw.alteracao_inicio) out.alteracao_inicio = raw.alteracao_inicio;
    if (raw.alteracao_fim) out.alteracao_fim = raw.alteracao_fim;
    if (raw.conclusao_inicio) out.conclusao_inicio = raw.conclusao_inicio;
    if (raw.conclusao_fim) out.conclusao_fim = raw.conclusao_fim;
    if (raw.envio_inicio) out.envio_inicio = raw.envio_inicio;
    if (raw.envio_fim) out.envio_fim = raw.envio_fim;
    return out;
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

  hasTentativaBeforeAgendamento(row: EnvioPlanoTrabalhoRow): boolean {
    const a = row.data_agendamento_envio;
    const t = row.data_tentativa_envio;
    return !!a && !!t && a > t;
  }

  hasConclusaoBeforeAgendamento(row: EnvioPlanoTrabalhoRow): boolean {
    const a = row.data_agendamento_envio;
    const c = row.data_conclusao_envio;
    return !!a && !!c && a > c;
  }

  hasEnvioBeforeAgendamento(row: EnvioPlanoTrabalhoRow): boolean {
    const a = row.data_agendamento_envio;
    const e = row.data_envio_api_pgd;
    return !!a && !!e && a > e;
  }
}
