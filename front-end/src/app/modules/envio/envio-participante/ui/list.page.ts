import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnvioParticipanteListFacade } from '../application/list.facade';
import { EnvioParticipanteListFilters, EnvioParticipanteRow } from '../domain/types';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PaginationV2Component } from 'src/app/v2/components/pagination/pagination.component';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';
import { LookupService } from 'src/app/services/lookup.service';
import { LexicalService } from 'src/app/services/lexical.service';

interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'app-envio-participante-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent, PaginationV2Component],
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class EnvioParticipanteListPage implements OnInit {
  readonly facade = inject(EnvioParticipanteListFacade);
  private readonly fb = inject(FormBuilder);
  private readonly filterStorage = inject(FilterStorageService);
  private readonly lookup = inject(LookupService);
  readonly lex = inject(LexicalService);

  private readonly FILTER_KEY = 'envio-participante:filters';

  /** Valor do select “sem filtro por status”; não deve ir em `filters[status]` (alinhado ao back-end). */
  private readonly statusTodos = 'Todos';

  readonly statusOptions = signal<SelectOption[]>([{ value: this.statusTodos, label: '- Todos -', selected: true }]);

  readonly filters: FormGroup<{
    cpf: FormControl<string>;
    nome: FormControl<string>;
    status: FormControl<string>;
    alteracao_inicio: FormControl<string | null>;
    alteracao_fim: FormControl<string | null>;
    conclusao_inicio: FormControl<string | null>;
    conclusao_fim: FormControl<string | null>;
    envio_inicio: FormControl<string | null>;
    envio_fim: FormControl<string | null>;
  }> = this.fb.group({
    cpf: this.fb.nonNullable.control(''),
    nome: this.fb.nonNullable.control(''),
    status: this.fb.nonNullable.control(this.statusTodos),
    alteracao_inicio: this.fb.control<string | null>(null),
    alteracao_fim: this.fb.control<string | null>(null),
    conclusao_inicio: this.fb.control<string | null>(null),
    conclusao_fim: this.fb.control<string | null>(null),
    envio_inicio: this.fb.control<string | null>(null),
    envio_fim: this.fb.control<string | null>(null)
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

  /** Indica se há algum critério de filtro preenchido (para consulta à API). */
  hasAnyFilter(): boolean {
    return Object.keys(this.buildFilters()).length > 0;
  }

  onConsultar(): void {
    this.applyFiltersAndLoad(true);
  }

  limparFiltros(): void {
    this.filters.reset({
      cpf: '',
      nome: '',
      status: this.statusTodos,
      alteracao_inicio: null,
      alteracao_fim: null,
      conclusao_inicio: null,
      conclusao_fim: null,
      envio_inicio: null,
      envio_fim: null
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
    const parsed = this.filterStorage.load<Partial<EnvioParticipanteListFilters>>(this.FILTER_KEY);
    if (!parsed) return;
    const status = parsed.status;
    const normalized: Partial<EnvioParticipanteListFilters> = {
      ...parsed,
      ...(status === undefined || status === null || String(status).trim() === ''
        ? { status: this.statusTodos }
        : {})
    };
    this.filters.patchValue(normalized, { emitEvent: false });
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

  private buildFilters(): EnvioParticipanteListFilters {
    const raw = this.filters.getRawValue();
    const out: EnvioParticipanteListFilters = {};
    const cpf = String(raw.cpf ?? '').trim();
    if (cpf.length) out.cpf = cpf;
    const nome = String(raw.nome ?? '').trim();
    if (nome.length) out.nome = nome;
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

  hasTentativaBeforeAgendamento(row: EnvioParticipanteRow): boolean {
    const a = row.data_agendamento_envio;
    const t = row.data_tentativa_envio;
    return !!a && !!t && a > t;
  }

  hasConclusaoBeforeAgendamento(row: EnvioParticipanteRow): boolean {
    const a = row.data_agendamento_envio;
    const c = row.data_conclusao_envio;
    return !!a && !!c && a > c;
  }

  hasEnvioBeforeAgendamento(row: EnvioParticipanteRow): boolean {
    const a = row.data_agendamento_envio;
    const e = row.data_envio_api_pgd;
    return !!a && !!e && a > e;
  }
}
