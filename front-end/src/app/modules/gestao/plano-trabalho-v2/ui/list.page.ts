import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { PlanoTrabalhoListFacade } from '../application/list.facade';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PlanoTrabalhoPolicy } from '../application/plano-trabalho.policy';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlanoTrabalho } from '../domain/types';
import { CancelarPlanoUseCase } from '../application/cancelar-plano.usecase';
import { ClonarPlanoUseCase } from '../application/clonar-plano.usecase';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PaginationV2Component } from 'src/app/v2/components/pagination/pagination.component';
import { TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { SelectOption } from './edit.page';

@Component({
  selector: 'app-plano-trabalho-v2-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent, PaginationV2Component],
  templateUrl: './list.page.html'
})
export class PlanoTrabalhoV2ListPage implements OnInit, OnDestroy {
  readonly facade = inject(PlanoTrabalhoListFacade);
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  readonly policy = inject(PlanoTrabalhoPolicy);
  private readonly router = inject(Router);
  private readonly cancelarPlanoUC = inject(CancelarPlanoUseCase);
  private readonly clonarPlanoUC = inject(ClonarPlanoUseCase);
  private readonly filterStorage = inject(FilterStorageService);
  private readonly tipoModalidadeApi = inject(TipoModalidadeService);

  private readonly FILTER_KEY = 'plano-trabalho-v2:filters';

  advanced = false;

  /** Plano aguardando justificativa de cancelamento */
  readonly cancelandoPlano = signal<PlanoTrabalho | null>(null);
  readonly justificativaCancelamento = signal('');

  readonly modalidadeOptions = signal<SelectOption[]>([{ value: '', label: 'Todas', selected: true }]);

  readonly statusOptions: SelectOption[] = [
    { value: '', label: 'Todos', selected: true },
    { value: 'INCLUIDO', label: 'Incluído' },
    { value: 'AGUARDANDO_ASSINATURA', label: 'Aguardando assinatura' },
    { value: 'ATIVO', label: 'Ativo' },
    { value: 'SUSPENSO', label: 'Suspenso' },
    { value: 'CONCLUIDO', label: 'Concluído' },
    { value: 'CANCELADO', label: 'Cancelado' },
  ];
  private readonly subscriptions: Subscription[] = [];

readonly filters: FormGroup<{
    periodo_inicio: FormControl<string | null>;
    periodo_fim: FormControl<string | null>;
    incluir_subordinadas: FormControl<boolean>;
    vigentes: FormControl<boolean>;
    incluir_arquivados: FormControl<boolean>;
    meus_planos: FormControl<boolean>;
    numero: FormControl<string>;
    usuario: FormControl<string>;
    unidade_regramento: FormControl<string>;
    tipo_modalidade_id: FormControl<string>;
    status: FormControl<string>;
  }> = this.fb.group({
    periodo_inicio: this.fb.control<string | null>(null),
    periodo_fim: this.fb.control<string | null>(null),
    incluir_subordinadas: this.fb.nonNullable.control(true),
    vigentes: this.fb.nonNullable.control(true),
    incluir_arquivados: this.fb.nonNullable.control(false),
    meus_planos: this.fb.nonNullable.control(false),
    numero: this.fb.nonNullable.control(''),
    usuario: this.fb.nonNullable.control(''),
    unidade_regramento: this.fb.nonNullable.control(''),
    tipo_modalidade_id: this.fb.nonNullable.control(''),
    status: this.fb.nonNullable.control('')
  });

  private filterTimer?: ReturnType<typeof setTimeout>;

  get isParticipante(): boolean {
    return this.auth.isUsuarioParticipante();
  }

  ngOnInit(): void {
    this.tipoModalidadeApi.listar(false).then(modalidades => {
      this.modalidadeOptions.set([
        { value: '', label: 'Todas', selected: true },
        ...modalidades.map(m => ({ value: m.id, label: m.nome }))
      ]);
    });

    this.setupToggleRules();

    if (this.isParticipante) {
      this.filters.controls.incluir_subordinadas.setValue(false);
      this.filters.controls.incluir_subordinadas.disable({ emitEvent: false });
      this.filters.controls.usuario.setValue('');
      this.filters.controls.usuario.disable({ emitEvent: false });
      this.filters.controls.meus_planos.setValue(true);
      this.filters.controls.meus_planos.disable({ emitEvent: false });
    }

    this.restoreFilters();
    this.applyToggleRules();
    this.applyFiltersAndLoad(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  toggleAdvanced() {
    this.advanced = !this.advanced;
  }

  onConsultar() {
    this.applyFiltersAndLoad(true);
  }

  onFilterChange() {
    if (this.filterTimer) clearTimeout(this.filterTimer);
    this.filterTimer = setTimeout(() => this.applyFiltersAndLoad(true), 400);
  }

  private setupToggleRules() {
    const arquivados = this.filters.controls.incluir_arquivados;
    const vigentes = this.filters.controls.vigentes;

    this.subscriptions.push(
      arquivados.valueChanges.subscribe(value => this.onArquivadosToggle(value)),
      vigentes.valueChanges.subscribe(value => this.onVigentesToggle(value)),
      this.filters.controls.tipo_modalidade_id.valueChanges.subscribe(() => this.onFilterChange()),
      this.filters.controls.status.valueChanges.subscribe(() => this.onFilterChange()),
    );
  }

  private applyToggleRules() {
    this.onArquivadosToggle(this.filters.controls.incluir_arquivados.value);
    this.onVigentesToggle(this.filters.controls.vigentes.value);
  }

  private onArquivadosToggle(checked: boolean) {
    const arquivados = this.filters.controls.incluir_arquivados;
    const vigentes = this.filters.controls.vigentes;

    if (checked) {
      this.setControlValueSilently(vigentes, false);
      this.setControlEnabled(vigentes, false);
      this.setControlEnabled(arquivados, true);
      return;
    }

    if (!vigentes.value) {
      this.setControlEnabled(vigentes, true);
    }
  }

  private onVigentesToggle(checked: boolean) {
    const arquivados = this.filters.controls.incluir_arquivados;
    const vigentes = this.filters.controls.vigentes;

    if (checked) {
      this.setControlValueSilently(arquivados, false);
      this.setControlEnabled(arquivados, false);
      this.setControlEnabled(vigentes, true);
      return;
    }

    if (!arquivados.value) {
      this.setControlEnabled(arquivados, true);
    }
  }

  private setControlEnabled(control: AbstractControl, enabled: boolean) {
    if (enabled && control.disabled) {
      control.enable({ emitEvent: false });
    }
    if (!enabled && control.enabled) {
      control.disable({ emitEvent: false });
    }
  }

  private setControlValueSilently<T>(control: FormControl<T>, value: T) {
    if (control.value !== value) {
      control.setValue(value, { emitEvent: false });
    }
  }

  private saveFilters() {
    const raw = this.filters.getRawValue();
    this.filterStorage.save(this.FILTER_KEY, { ...raw, advanced: this.advanced });
  }

  private restoreFilters() {
    const parsed = this.filterStorage.load<Record<string, unknown>>(this.FILTER_KEY);
    if (!parsed) return;
    this.filters.patchValue(parsed, { emitEvent: false });
    if (parsed['advanced']) this.advanced = true;
  }

  private applyFiltersAndLoad(resetPage: boolean) {
    if (resetPage) this.facade.page.set(1);
    this.saveFilters();
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  private buildFilters(): Record<string, unknown> {
    const raw = this.filters.getRawValue();
    const result: Record<string, unknown> = {};

    if (raw.periodo_inicio?.length) result['data_inicio'] = raw.periodo_inicio;
    if (raw.periodo_fim?.length) result['data_fim'] = raw.periodo_fim;
    if (raw.vigentes) result['vigentes'] = true;
    if (raw.incluir_arquivados) result['arquivados'] = true;
    if (raw.meus_planos) result['usuario_id'] = this.auth.usuario?.id;
    if (raw.incluir_subordinadas) result['incluir_subordinadas'] = true;

    if (raw.numero.trim().length) result['numero'] = raw.numero.trim();
    if (raw.tipo_modalidade_id.length) result['tipo_modalidade_id'] = raw.tipo_modalidade_id;
    if (raw.status.length) result['status'] = raw.status;
    if (raw.usuario.trim().length) result['usuario_nome'] = raw.usuario.trim();
    if (raw.unidade_regramento.trim().length) result['unidade_regramento'] = raw.unidade_regramento.trim();

    result['unidade_id'] = this.auth.unidade?.id;

    return result;
  }

  onPageChange(page: number) {
    this.facade.page.set(page);
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  statusClass(value: string | undefined): string {
    if (value === 'ATIVO') return '#2a9c2a';
    if (value === 'INCLUIDO') return '#686868';
    if (value === 'AGUARDANDO_ASSINATURA') return '#cac704';
    if (value === 'SUSPENSO') return '#df8e32';
    if (value === 'CANCELADO') return '#c92c2c';
    if (value == 'CONCLUIDO') return '#28128a';
    return 'secondary';
  }

  statusLabel(value: string | undefined): string {
    if (value === 'ATIVO') return 'Ativo';
    if (value === 'INCLUIDO') return 'Rascunho';
    if (value === 'AGUARDANDO_ASSINATURA') return 'Aguardando assinatura';
    if (value === 'SUSPENSO') return 'Suspenso';
    if (value === 'CANCELADO') return 'Cancelado';
    if (value == 'CONCLUIDO') return 'Concluído'
    return value || '-';
  }

  novoPlano() {
    this.router.navigate(['gestao', 'plano-trabalho-v2', 'novo']);
  }

  detalhesDoPlano(p: PlanoTrabalho) {
    this.router.navigate(['gestao', 'plano-trabalho-v2', 'consultar', p.id]);
  }

  editarPlano(p: PlanoTrabalho) {
    this.router.navigate(['gestao', 'plano-trabalho-v2', 'editar', p.id]);
  }

  assinarPlano(p: PlanoTrabalho) {
    this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', p.id]);
  }

  clonarPlano(p: PlanoTrabalho) {
    if (!confirm('Um novo Plano de Trabalho será criado com base neste, preservando suas informações, exceto as datas de início e fim, os percentuais de contribuição e os vínculos com entregas que não estejam mais disponíveis. Deseja confirmar?')) return;
    this.clonarPlanoUC.execute(p.id).subscribe((novo) => {
      this.router.navigate(['gestao', 'plano-trabalho-v2', 'editar', novo.id]);
    });
  }

  iniciarCancelamento(p: PlanoTrabalho) {
    this.cancelandoPlano.set(p);
    this.justificativaCancelamento.set('');
  }

  cancelarCancelamento() {
    this.cancelandoPlano.set(null);
    this.justificativaCancelamento.set('');
  }

  confirmarCancelamento() {
    const plano = this.cancelandoPlano();
    const justificativa = this.justificativaCancelamento().trim();
    if (!plano || !justificativa) return;

    this.cancelarPlanoUC.execute(plano.id, justificativa).subscribe(() => {
      this.cancelandoPlano.set(null);
      this.justificativaCancelamento.set('');
      this.applyFiltersAndLoad(false);
    });
  }
}
