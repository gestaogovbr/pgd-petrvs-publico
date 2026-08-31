import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PaginationV2Component } from 'src/app/v2/components/pagination/pagination.component';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import { MessageService } from 'src/app/v2/services/message.service';
import { RelatorioPlanoEntregaLacunaListFacade } from '../application/list.facade';
import { RelatorioPlanoEntregaLacunaListFilters } from '../domain/types';
import { ExportarRelatorioPlanoEntregaLacuna } from '../application/listar-lacunas.usecase';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-relatorio-plano-entrega-lacuna-list-page',
  standalone: true,
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
export class RelatorioPlanoEntregaLacunaListPage implements OnInit {
  readonly facade = inject(RelatorioPlanoEntregaLacunaListFacade);
  private readonly fb = inject(FormBuilder);
  private readonly filterStorage = inject(FilterStorageService);
  private readonly exportar = inject(ExportarRelatorioPlanoEntregaLacuna);
  readonly lex = inject(LexicalService);
  readonly unidadeDao = inject(UnidadeDaoService);
  readonly auth = inject(AuthService);
  private readonly util = inject(UtilService);
  private readonly message = inject(MessageService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly permissao = 'MOD_RELATORIO_PE';
  readonly unidades = signal<string[]>([]);
  readonly exporting = signal(false);

  private readonly FILTER_KEY = 'relatorio-plano-entrega-lacuna:filters';
  private readonly LACUNA_TOOLTIP =
    'Período em que a unidade esteve sinalizada como Executora, mas não possui Plano de Entrega em execução ou concluído.';

  readonly filters: FormGroup<{
    unidade_id: FormControl<string | null>;
    incluir_unidades_subordinadas: FormControl<boolean>;
    periodo_inicio: FormControl<string | null>;
    periodo_fim: FormControl<string | null>;
    unidadeHierarquia: FormControl<string>;
    nome: FormControl<string>;
    codigo: FormControl<string>;
    lacuna: FormControl<string>;
    quantidade_dias: FormControl<string>;
  }> = this.fb.group({
    unidade_id: this.fb.control<string | null>(null, {
      validators: [this.lotacaoValidator.bind(this), this.requiredValidator.bind(this)],
    }),
    incluir_unidades_subordinadas: this.fb.nonNullable.control(false),
    periodo_inicio: this.fb.control<string | null>(null, { validators: [this.requiredValidator.bind(this)] }),
    periodo_fim: this.fb.control<string | null>(null, { validators: [this.requiredValidator.bind(this)] }),
    unidadeHierarquia: this.fb.nonNullable.control(''),
    nome: this.fb.nonNullable.control(''),
    codigo: this.fb.nonNullable.control(''),
    lacuna: this.fb.nonNullable.control(''),
    quantidade_dias: this.fb.nonNullable.control(''),
  });

  async ngOnInit(): Promise<void> {
    if (!this.auth.hasPermissionTo(this.permissao)) {
      return;
    }

    await this.carregarUnidadesPermitidas();
    this.restoreFilters();
    if (this.filters.valid) {
      this.applyFiltersAndLoad(true);
    }
  }

  get lacunaTooltip(): string {
    return this.LACUNA_TOOLTIP;
  }

  unidadeWhere(): unknown[] {
    if (this.auth.hasPermissionTo(this.permissao + '_TODAS_UNIDADES')) {
      return [];
    }
    return [['id', 'in', this.unidades()]];
  }

  onConsultar(): void {
    if (this.filters.invalid) {
      this.filters.markAllAsTouched();
      this.message.warning(this.mensagemValidacaoFiltros());
      this.cdr.markForCheck();
      return;
    }
    this.applyFiltersAndLoad(true);
  }

  lotacaoValidator(control: AbstractControl): ValidationErrors | null {
    return !this.auth.unidade ? { errorMessage: 'Usuário sem unidade de lotação' } : null;
  }

  requiredValidator(control: AbstractControl): ValidationErrors | null {
    return this.util.empty(control.value) ? { errorMessage: 'Obrigatório' } : null;
  }

  mensagemValidacaoFiltros(): string {
    const faltando: string[] = [];
    if (this.util.empty(this.filters.controls.unidade_id.value)) {
      faltando.push('unidade');
    }
    if (this.util.empty(this.filters.controls.periodo_inicio.value)) {
      faltando.push('período inicial');
    }
    if (this.util.empty(this.filters.controls.periodo_fim.value)) {
      faltando.push('período final');
    }
    return `Preencha os filtros obrigatórios: ${faltando.join(', ')}.`;
  }

  limparFiltros(): void {
    const periodoPadrao = this.periodoPadrao();
    this.filters.reset({
      unidade_id: this.auth.unidade?.id ?? null,
      incluir_unidades_subordinadas: false,
      periodo_inicio: periodoPadrao.inicio,
      periodo_fim: periodoPadrao.fim,
      unidadeHierarquia: '',
      nome: '',
      codigo: '',
      lacuna: '',
      quantidade_dias: '',
    });
    this.facade.items.set([]);
    this.facade.total.set(0);
    this.facade.lastPage.set(1);
    this.facade.page.set(1);
    this.saveFilters();
  }

  onPageChange(page: number): void {
    if (this.filters.invalid) {
      return;
    }
    this.facade.page.set(page);
    this.facade.filters.set(this.buildFilters());
    this.facade.load(() => this.cdr.markForCheck());
  }

  onColumnFilterBlur(): void {
    if (this.filters.invalid) {
      return;
    }
    this.applyFiltersAndLoad(true);
  }

  async exportarExcel(): Promise<void> {
    if (this.filters.invalid) {
      this.filters.markAllAsTouched();
      this.message.warning(this.mensagemValidacaoFiltros());
      this.cdr.markForCheck();
      return;
    }

    this.exporting.set(true);
    try {
      const blob = await firstValueFrom(
        this.exportar.execute({
          page: 1,
          filters: this.buildFilters(),
        }),
      );
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'relatorio-lacunas-planos-entrega.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    } finally {
      this.exporting.set(false);
    }
  }

  formatarLacuna(inicio: string, fim: string): string {
    return `${this.formatarData(inicio)} a ${this.formatarData(fim)}`;
  }

  private formatarData(valor: string): string {
    if (!valor) {
      return '-';
    }
    const partes = valor.slice(0, 10).split('-');
    if (partes.length !== 3) {
      return valor;
    }
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  private async carregarUnidadesPermitidas(): Promise<void> {
    if (this.auth.hasPermissionTo(this.permissao + '_TODAS_UNIDADES') || !this.auth.unidade) {
      this.unidades.set([]);
      return;
    }

    const ids: string[] = [];
    let unidades = [this.auth.unidade];
    if (this.auth.hasPermissionTo(this.permissao + '_UNIDADES_VINCULADAS') && this.auth.unidades) {
      unidades = this.auth.unidades;
    }

    for (const unidade of unidades) {
      ids.push(unidade.id);
      const subordinadas = (await this.unidadeDao.subordinadas(unidade.id)).map((item: { id: string }) => item.id);
      ids.push(...subordinadas);
    }

    this.unidades.set(ids);
  }

  private saveFilters(): void {
    this.filterStorage.save(this.FILTER_KEY, this.filters.getRawValue());
  }

  private restoreFilters(): void {
    const parsed = this.filterStorage.load<Partial<RelatorioPlanoEntregaLacunaListFilters & Record<string, unknown>>>(
      this.FILTER_KEY,
    );
    const periodoPadrao = this.periodoPadrao();

    this.filters.patchValue(
      {
        unidade_id: this.coerceUnidadeId(parsed?.unidade_id) ?? this.auth.unidade?.id ?? null,
        incluir_unidades_subordinadas: !!parsed?.incluir_unidades_subordinadas,
        periodo_inicio: (parsed?.periodo_inicio as string | null | undefined) ?? periodoPadrao.inicio,
        periodo_fim: (parsed?.periodo_fim as string | null | undefined) ?? periodoPadrao.fim,
        unidadeHierarquia: parsed?.unidadeHierarquia ? String(parsed.unidadeHierarquia) : '',
        nome: parsed?.nome ? String(parsed.nome) : '',
        codigo: parsed?.codigo ? String(parsed.codigo) : '',
        lacuna: parsed?.lacuna ? String(parsed.lacuna) : '',
        quantidade_dias: parsed?.quantidade_dias ? String(parsed.quantidade_dias) : '',
      },
      { emitEvent: false },
    );
  }

  private applyFiltersAndLoad(resetPage: boolean): void {
    if (resetPage) {
      this.facade.page.set(1);
    }
    this.saveFilters();
    this.facade.filters.set(this.buildFilters());
    this.facade.load(() => this.cdr.markForCheck());
  }

  private periodoPadrao(): { inicio: string; fim: string } {
    const hoje = new Date();
    const inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    return {
      inicio: this.formatIsoDate(inicio),
      fim: this.formatIsoDate(fim),
    };
  }

  private formatIsoDate(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  private buildFilters(): RelatorioPlanoEntregaLacunaListFilters {
    const raw = this.filters.getRawValue();
    const out: RelatorioPlanoEntregaLacunaListFilters = {};

    const unidadeId = this.coerceUnidadeId(raw.unidade_id);
    if (unidadeId) {
      out.unidade_id = unidadeId;
    }
    if (raw.incluir_unidades_subordinadas) {
      out.incluir_unidades_subordinadas = true;
    }
    if (raw.periodo_inicio) {
      out.periodo_inicio = raw.periodo_inicio;
    }
    if (raw.periodo_fim) {
      out.periodo_fim = raw.periodo_fim;
    }

    const unidadeHierarquia = String(raw.unidadeHierarquia ?? '').trim();
    if (unidadeHierarquia.length) {
      out.unidadeHierarquia = unidadeHierarquia;
    }
    const nome = String(raw.nome ?? '').trim();
    if (nome.length) {
      out.nome = nome;
    }
    const codigo = String(raw.codigo ?? '').trim();
    if (codigo.length) {
      out.codigo = codigo;
    }
    const lacuna = String(raw.lacuna ?? '').trim();
    if (lacuna.length) {
      out.lacuna = lacuna;
    }
    const quantidadeDias = String(raw.quantidade_dias ?? '').trim();
    if (quantidadeDias.length) {
      out.quantidade_dias = quantidadeDias;
    }

    return out;
  }

  private coerceUnidadeId(v: unknown): string | null {
    if (v == null) {
      return null;
    }
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
