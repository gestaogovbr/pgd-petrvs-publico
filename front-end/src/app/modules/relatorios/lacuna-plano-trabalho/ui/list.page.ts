import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize, take } from 'rxjs';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PaginationV2Component } from 'src/app/v2/components/pagination/pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/v2/services/message.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { LacunaPlanoTrabalhoListFacade } from '../application/list.facade';
import { ExportarLacunaPlanoTrabalho } from '../application/exportar-lacuna-plano-trabalho.usecase';
import { LacunaPlanoTrabalhoListFilters, LacunaPlanoTrabalhoRow } from '../domain/types';

@Component({
  selector: 'app-lacuna-plano-trabalho-list-page',
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
export class LacunaPlanoTrabalhoListPage {
  readonly facade = inject(LacunaPlanoTrabalhoListFacade);
  private readonly exportar = inject(ExportarLacunaPlanoTrabalho);
  private readonly message = inject(MessageService);
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  readonly unidadeDao = inject(UnidadeDaoService);
  readonly go = inject(NavigateService);

  readonly exporting = signal(false);
  readonly lacunaHint =
    'Período em que o agente público, esteve selecionado como Participante do PGD no Siape, mas não possui Plano de Trabalho em execução ou concluído.';

  readonly filters: FormGroup<{
    unidade_id: FormControl<string | null>;
    periodo_inicio: FormControl<string | null>;
    periodo_fim: FormControl<string | null>;
    incluir_unidades_subordinadas: FormControl<boolean>;
    nome: FormControl<string>;
    matricula: FormControl<string>;
    unidadeHierarquia: FormControl<string>;
    lacuna: FormControl<string>;
    quantidade_dias: FormControl<string>;
    ocorrencias_texto: FormControl<string>;
  }> = this.fb.group({
    unidade_id: this.fb.control<string | null>(this.auth.unidade?.id ?? null, {
      validators: [Validators.required],
    }),
    periodo_inicio: this.fb.control<string | null>(null, { validators: [Validators.required] }),
    periodo_fim: this.fb.control<string | null>(null, { validators: [Validators.required] }),
    incluir_unidades_subordinadas: this.fb.nonNullable.control(false),
    nome: this.fb.nonNullable.control(''),
    matricula: this.fb.nonNullable.control(''),
    unidadeHierarquia: this.fb.nonNullable.control(''),
    lacuna: this.fb.nonNullable.control(''),
    quantidade_dias: this.fb.nonNullable.control(''),
    ocorrencias_texto: this.fb.nonNullable.control(''),
  });

  hasConsulta(): boolean {
    return this.facade.filters() !== null;
  }

  onConsultar(): void {
    const erro = this.validarConsulta();
    if (erro) {
      this.filters.markAllAsTouched();
      this.message.error(erro);
      return;
    }
    this.facade.page.set(1);
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  limparFiltros(): void {
    this.filters.reset({
      unidade_id: this.auth.unidade?.id ?? null,
      periodo_inicio: null,
      periodo_fim: null,
      incluir_unidades_subordinadas: false,
      nome: '',
      matricula: '',
      unidadeHierarquia: '',
      lacuna: '',
      quantidade_dias: '',
      ocorrencias_texto: '',
    });
    this.facade.filters.set(null);
    this.facade.items.set([]);
    this.facade.total.set(0);
    this.facade.page.set(1);
    this.facade.lastPage.set(1);
    this.facade.error.set(null);
  }

  onPageChange(page: number): void {
    this.facade.page.set(page);
    this.facade.load();
  }

  onExportar(): void {
    const erro = this.validarConsulta();
    if (erro) {
      this.filters.markAllAsTouched();
      this.message.error(erro);
      return;
    }
    this.exporting.set(true);
    this.exportar
      .execute({ filters: this.buildFilters() })
      .pipe(
        take(1),
        finalize(() => this.exporting.set(false)),
      )
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'relatorio-lacunas-plano-trabalho.xlsx';
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: () => this.message.error('Não foi possível exportar o relatório.'),
      });
  }

  abrirUsuario(row: LacunaPlanoTrabalhoRow): void {
    this.go.navigate({ route: ['configuracoes', 'usuario', row.usuario_id, 'edit'] });
  }

  private validarConsulta(): string | null {
    const unidadeId = this.coerceUnidadeId(this.filters.controls.unidade_id.value);
    const periodoInicio = this.normalizeDate(this.filters.controls.periodo_inicio.value);
    const periodoFim = this.normalizeDate(this.filters.controls.periodo_fim.value);

    if (!unidadeId && (!periodoInicio || !periodoFim)) {
      return 'Informe a unidade e o período da consulta.';
    }
    if (!unidadeId) {
      return 'Informe a unidade de consulta.';
    }
    if (!periodoInicio || !periodoFim) {
      return 'Informe o período da consulta (início e fim).';
    }
    if (periodoInicio > periodoFim) {
      return 'A data início do período não pode ser posterior à data fim.';
    }
    return null;
  }

  private buildFilters(): LacunaPlanoTrabalhoListFilters {
    const v = this.filters.getRawValue();
    const filters: LacunaPlanoTrabalhoListFilters = {
      unidade_id: this.coerceUnidadeId(v.unidade_id)!,
      periodo_inicio: this.normalizeDate(v.periodo_inicio)!,
      periodo_fim: this.normalizeDate(v.periodo_fim)!,
    };
    if (v.incluir_unidades_subordinadas) {
      filters.incluir_unidades_subordinadas = true;
    }
    if (v.nome.trim()) filters.nome = v.nome.trim();
    if (v.matricula.trim()) filters.matricula = v.matricula.trim();
    if (v.unidadeHierarquia.trim()) filters.unidadeHierarquia = v.unidadeHierarquia.trim();
    if (v.lacuna.trim()) filters.lacuna = v.lacuna.trim();
    if (v.quantidade_dias.trim() !== '') filters.quantidade_dias = v.quantidade_dias.trim();
    if (v.ocorrencias_texto.trim()) filters.ocorrencias_texto = v.ocorrencias_texto.trim();
    return filters;
  }

  private coerceUnidadeId(value: unknown): string | null {
    if (value == null) return null;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed === '' ? null : trimmed;
    }
    if (typeof value === 'object' && 'id' in value) {
      const id = String((value as { id: unknown }).id).trim();
      return id === '' ? null : id;
    }
    return null;
  }

  private normalizeDate(value: unknown): string | null {
    if (value == null) return null;
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value.toISOString().slice(0, 10);
    }
    const text = String(value).trim();
    if (!text) return null;
    return text.slice(0, 10);
  }
}
