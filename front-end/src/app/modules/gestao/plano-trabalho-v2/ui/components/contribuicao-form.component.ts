import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnInit, Output, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Unidade } from 'src/app/models/unidade.model';
import { PlanoEntregaApiService, PlanoEntregaItem } from 'src/app/v2/services/plano-entrega-api.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { PlanoApiClient } from '../../infra/plano-api.client';
import { PlanoTrabalho, PlanoTrabalhoEntrega } from '../../domain/types';

export interface SelectOption { value: string; label: string; selected?: boolean; }

@Component({
  selector: 'app-contribuicao-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule],
  templateUrl: './contribuicao-form.component.html',
  styleUrl: './contribuicao-form.component.scss',
})
export class ContribuicaoFormComponent implements OnInit {
  @Input({ required: true }) plano!: PlanoTrabalho;
  @Input({ required: true }) consolidacaoId!: string;
  @Output() readonly saved = new EventEmitter<PlanoTrabalhoEntrega>();
  @Output() readonly cancelled = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  private readonly api = inject(PlanoApiClient);
  private readonly planoEntregaApi = inject(PlanoEntregaApiService);
  private readonly unidadeService = inject(UnidadeService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly selectedOrigem = signal('PROPRIA_UNIDADE');
  private readonly selectedPlanoEntregaId = signal('');
  private readonly selectedOutraUnidadePlanoId = signal('');
  private readonly selectedEntregaEntregaId = signal('');

  readonly salvando = signal(false);
  readonly planosUnidade = signal<PlanoEntregaItem[]>([]);
  readonly planosOutraUnidade = signal<PlanoEntregaItem[]>([]);
  readonly entregasDoPlano = signal<SelectOption[]>([]);
  readonly entregasDoPlanoOutraUnidade = signal<SelectOption[]>([]);
  readonly sugestoesOutrasUnidades = signal<{ id: string; codigo: string; sigla: string; nome: string }[]>([]);
  readonly outraUnidadeSelecionada = signal<{ id: string; codigo: string; sigla: string; nome: string } | null>(null);
  readonly outraUnidadeQuery = this.fb.control('');

  readonly entregaForm = this.fb.group({
    origem: this.fb.control('PROPRIA_UNIDADE', Validators.required),
    orgao: this.fb.control(''),
    outra_unidade_id: this.fb.control(''),
    outra_unidade_plano_id: this.fb.control(''),
    plano_entrega_id: this.fb.control(''),
    plano_entrega_entrega_id: this.fb.control('', Validators.required),
    descricao: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    forca_trabalho: this.fb.control<number>(100, [Validators.required, Validators.min(1)]),
  });

  readonly origemSelectOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedOrigem();
    return [
      { value: 'PROPRIA_UNIDADE', label: 'Entrega da própria unidade' },
      { value: 'OUTRA_UNIDADE', label: 'Entrega de outra unidade' },
      { value: 'OUTRO_ORGAO', label: 'Entrega de outro órgão/entidade' },
      { value: 'SEM_ENTREGA', label: 'Não vinculada a entrega' },
    ].map(o => ({ ...o, selected: o.value === sel }));
  });

  readonly planosUnidadeOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedPlanoEntregaId();
    return this.planosUnidade().map(p => ({ value: p.id, label: `${p.numero} - ${p.nome}`, selected: p.id === sel }));
  });

  readonly planosOutraUnidadeOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedOutraUnidadePlanoId();
    return this.planosOutraUnidade().map(p => ({ value: p.id, label: `${p.numero} - ${p.nome}`, selected: p.id === sel }));
  });

  readonly entregasDoPlanoOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedEntregaEntregaId();
    return this.entregasDoPlano().map(o => ({ ...o, selected: o.value === sel }));
  });

  readonly entregasDoPlanoOutraUnidadeOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedEntregaEntregaId();
    return this.entregasDoPlanoOutraUnidade().map(o => ({ ...o, selected: o.value === sel }));
  });

  ngOnInit(): void {
    if (this.plano.unidade_id) {
      this.carregarPlanosUnidade(this.plano.unidade_id);
    }

    this.entregaForm.controls.origem.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(origem => this.onOrigemChange(origem ?? 'PROPRIA_UNIDADE'));

    this.entregaForm.controls.outra_unidade_id.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(unidadeId => {
      if (unidadeId && this.entregaForm.controls.origem.value === 'OUTRA_UNIDADE') {
        this.carregarPlanosOutraUnidade(unidadeId);
      }
    });

    this.entregaForm.controls.plano_entrega_id.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(planoId => {
      this.selectedPlanoEntregaId.set(planoId ?? '');
      this.selectedEntregaEntregaId.set('');
      this.entregaForm.controls.plano_entrega_entrega_id.setValue('', { emitEvent: false });
      this.entregasDoPlano.set([]);
      if (planoId) this.carregarEntregasDoPlano(planoId, 'PROPRIA_UNIDADE');
    });

    this.entregaForm.controls.outra_unidade_plano_id.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(planoId => {
      this.selectedOutraUnidadePlanoId.set(planoId ?? '');
      this.selectedEntregaEntregaId.set('');
      this.entregaForm.controls.plano_entrega_entrega_id.setValue('', { emitEvent: false });
      this.entregasDoPlanoOutraUnidade.set([]);
      if (planoId) this.carregarEntregasDoPlano(planoId, 'OUTRA_UNIDADE');
    });

    this.entregaForm.controls.plano_entrega_entrega_id.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(id => this.selectedEntregaEntregaId.set(id ?? ''));

    this.outraUnidadeQuery.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(term => {
      if (term && typeof term === 'string') this.buscarOutrasUnidades(term);
    });
  }

  cancelar(): void {
    this.cancelled.emit();
  }

  salvar(): void {
    if (this.entregaForm.invalid || this.salvando()) return;
    const { plano_entrega_id: _planoEntregaId, outra_unidade_plano_id: _outraUnidadePlanoId, ...payload } = this.entregaForm.value;
    this.salvando.set(true);
    this.api.createEntrega(this.plano.id, { ...payload, consolidacao_id: this.consolidacaoId })
      .pipe(finalize(() => this.salvando.set(false)))
      .subscribe(entrega => this.saved.emit(entrega));
  }

  selecionarOutraUnidade(u: { id: string; codigo: string; sigla: string; nome: string }): void {
    this.outraUnidadeSelecionada.set(u);
    this.outraUnidadeQuery.setValue(`${u.codigo} - ${u.sigla} - ${u.nome}`, { emitEvent: false });
    this.sugestoesOutrasUnidades.set([]);
    this.entregaForm.controls.outra_unidade_id.setValue(u.id);
  }

  limparOutraUnidade(): void {
    this.outraUnidadeSelecionada.set(null);
    this.outraUnidadeQuery.setValue('', { emitEvent: false });
    this.sugestoesOutrasUnidades.set([]);
    this.entregaForm.controls.outra_unidade_id.setValue('');
    this.entregaForm.controls.outra_unidade_plano_id.setValue('');
    this.selectedOutraUnidadePlanoId.set('');
    this.planosOutraUnidade.set([]);
    this.entregasDoPlanoOutraUnidade.set([]);
  }

  private onOrigemChange(origem: string): void {
    this.selectedOrigem.set(origem);
    const pIdControl = this.entregaForm.controls.plano_entrega_entrega_id;
    const orgaoControl = this.entregaForm.controls.orgao;
    const forcaControl = this.entregaForm.controls.forca_trabalho;

    pIdControl.setValue('');
    this.selectedEntregaEntregaId.set('');

    if (origem === 'OUTRO_ORGAO') {
      pIdControl.clearValidators();
      orgaoControl.setValidators(Validators.required);
      forcaControl.clearValidators();
      forcaControl.setValue(0);
    } else if (origem === 'SEM_ENTREGA') {
      pIdControl.clearValidators();
      orgaoControl.clearValidators();
      orgaoControl.setValue('');
      forcaControl.setValidators([Validators.required, Validators.min(1)]);
    } else {
      pIdControl.setValidators(Validators.required);
      orgaoControl.clearValidators();
      orgaoControl.setValue('');
      forcaControl.setValidators([Validators.required, Validators.min(1)]);
    }

    if (origem !== 'OUTRA_UNIDADE') {
      this.limparOutraUnidade();
    }

    if (origem !== 'PROPRIA_UNIDADE') {
      this.entregaForm.controls.plano_entrega_id.setValue('');
      this.selectedPlanoEntregaId.set('');
      this.entregasDoPlano.set([]);
    }

    pIdControl.updateValueAndValidity();
    orgaoControl.updateValueAndValidity();
    forcaControl.updateValueAndValidity();
  }

  private buscarOutrasUnidades(term: string): void {
    if (!term || term.length < 3) {
      this.sugestoesOutrasUnidades.set([]);
      return;
    }
    this.unidadeService.searchByNomeOuCodigo(term).subscribe((unidades: Unidade[]) => {
      this.sugestoesOutrasUnidades.set(unidades || []);
    });
  }

  private carregarPlanosUnidade(unidadeId: string): void {
    this.planoEntregaApi.buscarPorUnidade(unidadeId, this.plano.data_inicio, this.plano.data_fim).subscribe(planos => {
      this.planosUnidade.set(planos);
    });
  }

  private carregarPlanosOutraUnidade(unidadeId: string): void {
    this.planoEntregaApi.buscarPorUnidade(unidadeId, this.plano.data_inicio, this.plano.data_fim).subscribe(planos => {
      this.planosOutraUnidade.set(planos);
      this.entregaForm.controls.outra_unidade_plano_id.setValue('', { emitEvent: false });
      this.entregasDoPlanoOutraUnidade.set([]);
    });
  }

  private carregarEntregasDoPlano(planoId: string, origem: 'PROPRIA_UNIDADE' | 'OUTRA_UNIDADE'): void {
    this.planoEntregaApi.queryEntregasPorPlano(planoId).subscribe(rows => {
      const options = rows.map(x => ({
        value: x.id,
        label: x.descricao || `Entrega ${x.id}`,
      }));
      if (origem === 'PROPRIA_UNIDADE') {
        this.entregasDoPlano.set(options);
      } else {
        this.entregasDoPlanoOutraUnidade.set(options);
      }
    });
  }
}
