import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PlanoTrabalhoListFacade } from '../application/list.facade';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { Subscription } from 'rxjs';
import { PlanoTrabalho } from '../domain/types';
import { PlanoTrabalhoApiClient } from '../infra/api-client';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-plano-trabalho-v2-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './list.page.html'
})
export class PlanoTrabalhoV2ListPage implements OnInit, OnDestroy {
  readonly facade = inject(PlanoTrabalhoListFacade);
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly go = inject(NavigateService);
  private readonly api = inject(PlanoTrabalhoApiClient);

  advanced = false;
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
    modalidade: FormControl<string>;
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
    modalidade: this.fb.nonNullable.control(''),
    status: this.fb.nonNullable.control('')
  });

  private filterTimer?: ReturnType<typeof setTimeout>;

  get isParticipante(): boolean {
    return this.auth.isUsuarioParticipante();
  }

  ngOnInit(): void {
    this.setupToggleRules();

    if (this.isParticipante) {
      this.filters.controls.incluir_subordinadas.setValue(false);
      this.filters.controls.incluir_subordinadas.disable({ emitEvent: false });
      this.filters.controls.usuario.setValue('');
      this.filters.controls.usuario.disable({ emitEvent: false });
      this.filters.controls.meus_planos.setValue(true);
      this.filters.controls.meus_planos.disable({ emitEvent: false });
    }

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
      vigentes.valueChanges.subscribe(value => this.onVigentesToggle(value))
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

  private applyFiltersAndLoad(resetPage: boolean) {
    if (resetPage) this.facade.page.set(1);
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

    return result;
  }

  prev() {
    const p = this.facade.page();
    if (p > 1) {
      this.facade.page.set(p - 1);
      this.facade.filters.set(this.buildFilters());
      this.facade.load();
    }
  }
  next() {
    const p = this.facade.page();
    const last = this.facade.lastPage();
    if (p < last) {
      this.facade.page.set(p + 1);
      this.facade.filters.set(this.buildFilters());
      this.facade.load();
    }
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
    if (value === 'INCLUIDO') return 'Incluído';
    if (value === 'AGUARDANDO_ASSINATURA') return 'Aguardando assinatura';
    if (value === 'SUSPENSO') return 'Suspenso';
    if (value === 'CANCELADO') return 'Cancelado';
    if (value == 'CONCLUIDO') return 'Concluído'
    return value || '-';
  }

  novoPlano() {
    this.go.navigate({ route: ['gestao', 'plano-trabalho-v2', 'novo'] });
  }

  detalhesDoPlano(p: PlanoTrabalho) {
    this.go.navigate({ route: ['gestao', 'plano-trabalho-v2', 'consultar', p.id] });
  }

  editarPlano(p: PlanoTrabalho) {
    this.go.navigate({ route: ['gestao', 'plano-trabalho-v2', 'editar', p.id] });
  }

  assinarPlano(p: PlanoTrabalho) {
    this.go.navigate({ route: ['gestao', 'plano-trabalho-v2', 'tcr', p.id] });
  }

  /* TODO: Mover para facade e usar action específica */
  cancelarPlano(p: PlanoTrabalho) {
    if (!confirm('Deseja realmente cancelar este plano de trabalho?')) return;
    this.api.update(p.id, { status: 'CANCELADO' }).subscribe(() => {
      this.applyFiltersAndLoad(false);
    });
  }
}
