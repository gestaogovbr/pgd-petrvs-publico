import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { PlanoTrabalhoListFacade } from '../application/list.facade';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PlanoTrabalhoPolicy } from '../application/plano-trabalho.policy';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { PlanoTrabalho, planoTrabalhoStatusLabel } from '../domain/types';
import { PlanoTrabalhoStatus } from 'src/app/models/plano-trabalho.model';
import { CancelarPlanoUseCase } from '../application/cancelar-plano.usecase';
import { ClonarPlanoUseCase } from '../application/clonar-plano.usecase';
import { ExcluirPlanoUseCase } from '../application/excluir-plano.usecase';
import { EncerrarPlanoUseCase } from '../application/encerrar-plano.usecase';
import { ArquivarPlanoUseCase } from '../application/arquivar-plano.usecase';
import { AssinarPlanoUseCase } from '../application/assinar-plano.usecase';
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
  private readonly encerrarPlanoUC = inject(EncerrarPlanoUseCase);
  private readonly clonarPlanoUC = inject(ClonarPlanoUseCase);
  private readonly excluirPlanoUC = inject(ExcluirPlanoUseCase);
  private readonly arquivarPlanoUC = inject(ArquivarPlanoUseCase);
  readonly assinatura = inject(AssinarPlanoUseCase);
  private readonly filterStorage = inject(FilterStorageService);
  private readonly tipoModalidadeApi = inject(TipoModalidadeService);

  private readonly FILTER_KEY_PREFIX = 'plano-trabalho-v2:filters';

  private get filterStorageKey(): string {
    const userId = this.auth.usuario?.id;
    return userId ? `${this.FILTER_KEY_PREFIX}:${userId}` : this.FILTER_KEY_PREFIX;
  }

  readonly advanced = signal(false);

  /** Plano aguardando justificativa de cancelamento */
  readonly cancelandoPlano = signal<PlanoTrabalho | null>(null);
  readonly justificativaCancelamento = signal('');
  readonly encerrando = signal<PlanoTrabalho | null>(null);
  readonly justificativaEncerramento = signal('');

  /** Confirmação genérica (clonar / excluir) */
  readonly confirmacaoPendente = signal<{ titulo: string; mensagem: string; onConfirm: () => void } | null>(null);

  readonly modalidadeOptions = signal<SelectOption[]>([{ value: '', label: 'Todas', selected: true }]);

  get statusOptions(): SelectOption[] {
    const current = this.filters.controls.status.value;
    return [
      { value: '', label: 'Todos' },
      { value: PlanoTrabalhoStatus.INCLUIDO, label: 'Rascunho' },
      { value: PlanoTrabalhoStatus.AGUARDANDO_ASSINATURA, label: 'Aguardando assinatura' },
      { value: PlanoTrabalhoStatus.ATIVO, label: 'Em execução' },
      { value: PlanoTrabalhoStatus.SUSPENSO, label: 'Suspenso' },
      { value: PlanoTrabalhoStatus.CONCLUIDO, label: 'Concluído' },
      { value: PlanoTrabalhoStatus.CANCELADO, label: 'Cancelado' },
    ].map(o => ({ ...o, selected: o.value === current }));
  }
  private readonly subscriptions: Subscription[] = [];
  private readonly filterChange$ = new Subject<void>();

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
    vigentes: this.fb.nonNullable.control(false),
    incluir_arquivados: this.fb.nonNullable.control(false),
    meus_planos: this.fb.nonNullable.control(false),
    numero: this.fb.nonNullable.control(''),
    usuario: this.fb.nonNullable.control(''),
    unidade_regramento: this.fb.nonNullable.control(''),
    tipo_modalidade_id: this.fb.nonNullable.control(''),
    status: this.fb.nonNullable.control('')
  });


  get isParticipante(): boolean {
    return this.auth.isUsuarioParticipante();
  }

  ngOnInit(): void {
    if (this.isParticipante) {
      this.filters.controls.incluir_subordinadas.setValue(false);
      this.filters.controls.incluir_subordinadas.disable({ emitEvent: false });
      this.filters.controls.usuario.setValue('');
      this.filters.controls.usuario.disable({ emitEvent: false });
      this.filters.controls.meus_planos.setValue(true);
      this.filters.controls.meus_planos.disable({ emitEvent: false });
    }

    this.restoreFilters();
    this.applyFiltersAndLoad(true);
    this.setupSubscriptions();

    this.tipoModalidadeApi.listar().then(modalidades => {
      const current = this.filters.controls.tipo_modalidade_id.value;
      this.modalidadeOptions.set([
        { value: '', label: 'Todas', selected: current === '' },
        ...modalidades.map(m => ({ value: m.key, label: m.value, selected: m.key === current }))
      ]);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.filterChange$.complete();
  }

  toggleAdvanced() {
    this.advanced.set(!this.advanced());
    this.saveFilters();
  }

  onConsultar() {
    this.applyFiltersAndLoad(true);
  }

  limparFiltros() {
    this.advanced.set(false);
    this.filters.reset({
      periodo_inicio: null,
      periodo_fim: null,
      incluir_subordinadas: !this.isParticipante,
      vigentes: false,
      incluir_arquivados: false,
      meus_planos: this.isParticipante,
      numero: '',
      usuario: '',
      unidade_regramento: '',
      tipo_modalidade_id: '',
      status: ''
    }, { emitEvent: false });
    this.applyFiltersAndLoad(true);
  }

  onFilterChange() {
    this.filterChange$.next();
  }

  private setupSubscriptions() {
    const arquivados = this.filters.controls.incluir_arquivados;
    const vigentes = this.filters.controls.vigentes;

    this.subscriptions.push(
      this.filterChange$.pipe(debounceTime(400)).subscribe(() => this.applyFiltersAndLoad(true)),
      arquivados.valueChanges.subscribe(checked => {
        if (checked) vigentes.setValue(false, { emitEvent: false });
        this.onFilterChange();
      }),
      vigentes.valueChanges.subscribe(checked => {
        if (checked) arquivados.setValue(false, { emitEvent: false });
        this.onFilterChange();
      }),
      this.filters.controls.tipo_modalidade_id.valueChanges.subscribe(() => this.onFilterChange()),
      this.filters.controls.status.valueChanges.subscribe(() => this.onFilterChange()),
    );
  }

  private saveFilters() {
    const raw = this.filters.getRawValue();
    this.filterStorage.save(this.filterStorageKey, { ...raw, advanced: this.advanced() });
  }

  private restoreFilters() {
    const parsed = this.filterStorage.load<Record<string, unknown>>(this.filterStorageKey);
    if (!parsed) return;
    this.filters.patchValue(parsed, { emitEvent: false });
    if (parsed['advanced']) this.advanced.set(true);
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

    const numero = String(raw.numero ?? '').trim();
    if (numero.length) result['numero'] = numero;
    if (raw.tipo_modalidade_id.length) result['modalidade_pgd'] = raw.tipo_modalidade_id;
    if (raw.status.length) result['status'] = raw.status;
    const usuario = String(raw.usuario ?? '').trim();
    if (usuario.length) result['usuario_nome'] = usuario;
    const unidadeRegramento = String(raw.unidade_regramento ?? '').trim();
    if (unidadeRegramento.length) result['unidade_regramento'] = unidadeRegramento;

    //result['unidade_id'] = this.auth.unidade?.id;

    return result;
  }

  onSort(field: string) {
    if (this.facade.orderBy() === field) {
      this.facade.orderDir.set(this.facade.orderDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.facade.orderBy.set(field);
      this.facade.orderDir.set('asc');
    }
    this.facade.page.set(1);
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  onPageChange(page: number) {
    this.facade.page.set(page);
    this.facade.filters.set(this.buildFilters());
    this.facade.load();
  }

  statusClass(value: PlanoTrabalhoStatus | undefined): string {
    const cores: Partial<Record<PlanoTrabalhoStatus, string>> = {
      ATIVO: '#2a9c2a',
      INCLUIDO: '#686868',
      AGUARDANDO_ASSINATURA: '#cac704',
      SUSPENSO: '#df8e32',
      CANCELADO: '#c92c2c',
      CONCLUIDO: '#28128a',
    };
    return value ? (cores[value] ?? 'secondary') : 'secondary';
  }

  statusLabel(value: PlanoTrabalhoStatus | undefined, plano?: PlanoTrabalho): string {
    return planoTrabalhoStatusLabel(value, plano);
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
    const chd = Number((p as any).carga_trabalho_total) || 0;
    this.assinatura.init(p, [{ forca_trabalho: chd }]);
    this.assinatura.onAfterAssinar = () => this.facade.load();
    this.assinatura.onAfterCancelar = () => this.facade.load();
    if (p.documento_id) {
      this.assinatura.abrirConfirmacaoAssinatura();
    } else {
      this.router.navigate(['gestao', 'plano-trabalho-v2', 'consultar', p.id]);
    }
  }

  cancelarAssinaturaPlano(p: PlanoTrabalho) {
    const chd = Number((p as any).carga_trabalho_total) || 0;
    this.assinatura.init(p, [{ forca_trabalho: chd }]);
    this.assinatura.onAfterCancelar = () => this.facade.load();
    this.assinatura.abrirConfirmacaoCancelamento();
  }

  verTcrDoPlanoAssinatura() {
    const id = this.assinatura.plano()?.id;
    if (id) {
      this.assinatura.confirmandoAssinatura.set(false);
      this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', id]);
    }
  }

  confirmarAssinaturaEAtualizar() {
    this.assinatura.confirmarAssinatura();
  }

  confirmarCancelamentoEAtualizar() {
    this.assinatura.confirmarCancelamentoAssinatura();
  }

  arquivarPlano(p: PlanoTrabalho) {
    this.confirmacaoPendente.set({
      titulo: 'Arquivar Plano de Trabalho',
      mensagem: 'Ao arquivar este Plano de Trabalho, ele será removido da tela, ficando disponível apenas quando consultado. Deseja confirmar?',
      onConfirm: () => this.arquivarPlanoUC.execute(p.id).subscribe(() => this.applyFiltersAndLoad(false))
    });
  }

  clonarPlano(p: PlanoTrabalho) {
    this.confirmacaoPendente.set({
      titulo: 'Clonar Plano de Trabalho',
      mensagem: 'Um novo Plano de Trabalho será criado com base neste, preservando suas informações, exceto as datas de início e fim, os percentuais de contribuição e os vínculos com entregas que não estejam mais disponíveis.',
      onConfirm: () => this.clonarPlanoUC.execute(p.id).subscribe(novo =>
        this.router.navigate(['gestao', 'plano-trabalho-v2', 'editar', novo.id])
      )
    });
  }

  excluirPlano(p: PlanoTrabalho) {
    this.confirmacaoPendente.set({
      titulo: 'Excluir Plano de Trabalho',
      mensagem: 'Ao excluir este Plano de Trabalho, ele será removido definitivamente do sistema. Essa ação é irreversível. Deseja confirmar?',
      onConfirm: () => this.excluirPlanoUC.execute(p.id).subscribe(() => this.applyFiltersAndLoad(false))
    });
  }

  cancelarConfirmacao() {
    this.confirmacaoPendente.set(null);
  }

  confirmarAcao() {
    const acao = this.confirmacaoPendente();
    if (!acao) return;
    this.confirmacaoPendente.set(null);
    acao.onConfirm();
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

  iniciarEncerramento(p: PlanoTrabalho) {
    this.encerrando.set(p);
    this.justificativaEncerramento.set('');
  }

  cancelarEncerramento() {
    this.encerrando.set(null);
    this.justificativaEncerramento.set('');
  }

  confirmarEncerramento() {
    const plano = this.encerrando();
    const justificativa = this.justificativaEncerramento().trim();
    if (!plano || !justificativa) return;

    this.encerrarPlanoUC.execute(plano.id, justificativa).subscribe(() => {
      this.encerrando.set(null);
      this.justificativaEncerramento.set('');
      this.applyFiltersAndLoad(false);
    });
  }
}
