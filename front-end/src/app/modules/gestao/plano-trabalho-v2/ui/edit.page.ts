import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, firstValueFrom, map, of, switchMap, take } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramaService } from 'src/app/services/programa.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PlanoApiClient } from '../infra/plano-api.client';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { UsuarioService, UsuarioSearchItem } from 'src/app/v2/services/usuario.service';
import { ProgramaApiService } from 'src/app/v2/services/programa-api.service';
import { TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { PlanoEntregaApiService, PlanoEntregaItem } from 'src/app/v2/services/plano-entrega-api.service';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { MessageService } from 'src/app/v2/services/message.service';
import { PlanoTrabalhoPolicy } from '../application/plano-trabalho.policy';
import { PlanoTrabalho, getPlanoEntregaInfo } from '../domain/types';

export interface SelectOption { value: string; label: string; selected?: boolean; }

@Component({
  selector: 'app-plano-trabalho-v2-edit-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './edit.page.html'
})
export class PlanoTrabalhoV2EditPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly api = inject(PlanoApiClient);
  private readonly usuarioService = inject(UsuarioService);
  private readonly programaApi = inject(ProgramaApiService);
  private readonly tipoModalidadeApi = inject(TipoModalidadeService);
  private readonly planoEntregaApi = inject(PlanoEntregaApiService);
  private readonly unidadeService = inject(UnidadeService);
  private readonly programaService = inject(ProgramaService);
  private readonly message = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);
  readonly policy = inject(PlanoTrabalhoPolicy);

  planoId = signal<string | null>(null);
  plano = signal<PlanoTrabalho | null>(null);
  loading = signal(true);
  saving = signal(false);
  carregandoRegramento = signal(false);

  programaNome = signal('');
  private programaId = signal('');

  readonly agentePublicoQuery = this.fb.nonNullable.control('');
  sugestoesUsuarios = signal<UsuarioSearchItem[]>([]);
  unidades = signal<Unidade[]>([]);
  modalidades = signal<TipoModalidade[]>([]);

  // Valores selecionados como sinais para que os computed de options incluam `selected: true`
  // (necessário porque o br-select/Stencil processa options antes de writeValue)
  private readonly selectedUnidadeId = signal('');
  private readonly selectedModalidadeId = signal('');
  private readonly usuarioTipoModalidadeId = signal('');

  // Sinais de seleção do entregaForm
  private readonly selectedOrigem = signal('PROPRIA_UNIDADE');
  private readonly selectedPlanoEntregaId = signal('');
  private readonly selectedOutraUnidadeId = signal('');
  private readonly selectedOutraUnidadePlanoId = signal('');
  private readonly selectedEntregaEntregaId = signal('');

  entregas = signal<any[]>([]);

  // Planos de entrega (nível plano)
  planosUnidade = signal<PlanoEntregaItem[]>([]);
  planosOutraUnidade = signal<PlanoEntregaItem[]>([]);

  // Entregas dentro do plano selecionado
  entregasDoPlano = signal<SelectOption[]>([]);
  entregasDoPlanoOutraUnidade = signal<SelectOption[]>([]);

  sugestoesOutrasUnidades = signal<{id: string, sigla: string, nome: string}[]>([]);
  outraUnidadeSelecionada = signal<{id: string, sigla: string, nome: string} | null>(null);
  readonly outraUnidadeQuery = this.fb.control('');

  mostrandoFormEntrega = signal(false);
  salvandoEntrega = signal(false);

  readonly totalForcaTrabalho = computed(() =>
    this.entregas().reduce((sum: number, e: any) => sum + (Number(e.forca_trabalho) || 0), 0)
  );

  readonly joinPrograma = ['template_tcr'];

  readonly form: FormGroup<{
    usuario_id: FormControl<string>;
    unidade_id: FormControl<string>;
    data_inicio: FormControl<string>;
    data_fim: FormControl<string>;
    tipo_modalidade_id: FormControl<string>;
    justificativa: FormControl<string>;
    justificativa_modalidade: FormControl<string>;
  }> = this.fb.group({
    usuario_id: this.fb.nonNullable.control('', Validators.required),
    unidade_id: this.fb.nonNullable.control('', Validators.required),
    data_inicio: this.fb.nonNullable.control('', Validators.required),
    data_fim: this.fb.nonNullable.control('', Validators.required),
    tipo_modalidade_id: this.fb.nonNullable.control('', Validators.required),
    justificativa: this.fb.nonNullable.control(''),
    justificativa_modalidade: this.fb.nonNullable.control('')
  });

  readonly entregaForm = this.fb.group({
    id: this.fb.control<string | null>(null),
    origem: this.fb.control('PROPRIA_UNIDADE', Validators.required),
    orgao: this.fb.control(''),
    outra_unidade_id: this.fb.control(''),
    outra_unidade_plano_id: this.fb.control(''),
    plano_entrega_id: this.fb.control(''),
    plano_entrega_entrega_id: this.fb.control(''),
    descricao: this.fb.control('', Validators.required),
    forca_trabalho: this.fb.control<number>(100, [Validators.required, Validators.min(1)])
  });

  readonly formStatus = signal(this.form.status);

  readonly podeSalvar = computed(() =>
    this.formStatus() === 'VALID' && !!this.programaId() && !this.saving()
  );

  readonly podeAssinar = computed(() =>
    this.podeSalvar()
  );

  readonly modalidadeDivergente = computed(() => {
    const selecionada = this.selectedModalidadeId();
    const doUsuario = this.usuarioTipoModalidadeId();
    return !!selecionada && !!doUsuario && selecionada !== doUsuario;
  });

  // Options para BrSelectComponent — inclui `selected: true` para o item atual,
  // pois o br-select/Stencil processa options antes que writeValue tenha efeito.
  readonly unidadesOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedUnidadeId();
    return this.unidades().map(u => ({ value: `${u.id}`, label: u.sigla, selected: `${u.id}` === sel }));
  });

  readonly modalidadesOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedModalidadeId();
    return this.modalidades().map(m => ({ value: `${m.id}`, label: m.nome, selected: `${m.id}` === sel }));
  });

  readonly origemSelectOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedOrigem();
    return [
      { value: 'PROPRIA_UNIDADE', label: 'Própria Unidade', selected: sel === 'PROPRIA_UNIDADE' },
      { value: 'OUTRA_UNIDADE', label: 'Outra Unidade', selected: sel === 'OUTRA_UNIDADE' },
      { value: 'OUTRO_ORGAO', label: 'Outro Órgão/Entidade', selected: sel === 'OUTRO_ORGAO' },
      { value: 'SEM_ENTREGA', label: 'Não vinculada a entrega', selected: sel === 'SEM_ENTREGA' }
    ];
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
    this.form.statusChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(status => this.formStatus.set(status));

    // Justificativa obrigatória quando carga < 100%
    effect(() => {
      const total = this.totalForcaTrabalho();
      const ctrl = this.form.controls.justificativa;
      if (total < 100) {
        ctrl.setValidators(Validators.required);
      } else {
        ctrl.clearValidators();
        ctrl.setValue('');
      }
      ctrl.updateValueAndValidity();
    }, { injector: this.injector });

    // Justificativa de modalidade obrigatória quando diverge do tipo_modalidade_id do usuário
    effect(() => {
      const ctrl = this.form.controls.justificativa_modalidade;
      if (this.modalidadeDivergente()) {
        ctrl.setValidators(Validators.required);
      } else {
        ctrl.clearValidators();
        ctrl.setValue('');
      }
      ctrl.updateValueAndValidity();
    }, { injector: this.injector });

    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id),
      take(1),
      switchMap(id => {
        this.planoId.set(id);
        return this.api.getById(id!);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(async plano => {
      this.plano.set(plano);
      this.entregas.set(plano.entregas || []);
      this.form.controls.data_inicio.setValue(plano.data_inicio ? new Date(plano.data_inicio).toISOString().split('T')[0] : '');
      this.form.controls.data_fim.setValue(plano.data_fim ? new Date(plano.data_fim).toISOString().split('T')[0] : '');
      this.form.controls.justificativa.setValue(plano.justificativa || '');
      this.form.controls.justificativa_modalidade.setValue(plano.justificativa_modalidade || '');

      if (plano.usuario_id) {
        const usuario = await firstValueFrom(this.usuarioService.getById(plano.usuario_id));
        this.form.controls.usuario_id.setValue(usuario.id);
        this.agentePublicoQuery.setValue(usuario.nome, { emitEvent: false });
        await this.carregarUnidades(usuario);
        this.selectedUnidadeId.set(plano.unidade_id ?? '');
        this.form.controls.unidade_id.setValue(plano.unidade_id);
        this.selectedModalidadeId.set(plano.tipo_modalidade_id ?? '');
        this.form.controls.tipo_modalidade_id.setValue(plano.tipo_modalidade_id);
        this.carregarPlanosUnidade(plano.unidade_id);
      }
      this.loading.set(false);
    });

    this.agentePublicoQuery.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(term => this.buscarUsuarios(term)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(items => this.sugestoesUsuarios.set(items));

    this.form.controls.unidade_id.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(unidadeId => {
      if (!unidadeId) return;
      this.selectedUnidadeId.set(unidadeId);
      void this.carregarRegramento(unidadeId);
      this.carregarPlanosUnidade(unidadeId);
    });

    this.form.controls.tipo_modalidade_id.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(id => this.selectedModalidadeId.set(id ?? ''));

    this.entregaForm.controls.origem.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(origem => {
      this.selectedOrigem.set(origem ?? 'PROPRIA_UNIDADE');
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
        this.entregaForm.controls.outra_unidade_id.setValue('');
        this.entregaForm.controls.outra_unidade_plano_id.setValue('');
        this.selectedOutraUnidadeId.set('');
        this.selectedOutraUnidadePlanoId.set('');
        this.planosOutraUnidade.set([]);
        this.entregasDoPlanoOutraUnidade.set([]);
        this.outraUnidadeSelecionada.set(null);
        this.outraUnidadeQuery.setValue('', { emitEvent: false });
        this.sugestoesOutrasUnidades.set([]);
      }

      if (origem !== 'PROPRIA_UNIDADE') {
        this.entregaForm.controls.plano_entrega_id.setValue('');
        this.selectedPlanoEntregaId.set('');
        this.entregasDoPlano.set([]);
      }

      pIdControl.updateValueAndValidity();
      orgaoControl.updateValueAndValidity();
      forcaControl.updateValueAndValidity();
    });

    this.entregaForm.controls.outra_unidade_id.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(unidadeId => {
      this.selectedOutraUnidadeId.set(unidadeId ?? '');
      if (unidadeId && this.entregaForm.controls.origem.value === 'OUTRA_UNIDADE') {
        this.carregarPlanosOutraUnidade(unidadeId);
      }
    });

    // Ao selecionar um plano de entrega da própria unidade, carrega suas entregas
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

    // Ao selecionar um plano de entrega de outra unidade, carrega suas entregas
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

  voltar() { this.router.navigate(['gestao', 'plano-trabalho-v2']); }

  excluir() {
    if (!this.planoId() || !confirm('Deseja realmente excluir este plano de trabalho?')) return;
    this.api.delete(this.planoId()!).subscribe(() => {
      this.message.success('Plano de trabalho excluído com sucesso.');
      this.router.navigate(['gestao', 'plano-trabalho-v2']);
    });
  }

  selecionarUsuario(item: UsuarioSearchItem) {
    this.form.controls.usuario_id.setValue(item.id);
    this.agentePublicoQuery.setValue(item.nome, { emitEvent: false });
    this.sugestoesUsuarios.set([]);
    this.carregarUnidades(item as Usuario);
  }

  limparUsuarioSelecionado() {
    this.unidades.set([]);
    this.programaId.set('');
    this.programaNome.set('');
    this.agentePublicoQuery.setValue('');
    this.form.controls.usuario_id.setValue('');
    this.form.controls.unidade_id.setValue('');
    this.form.controls.tipo_modalidade_id.setValue('');
  }

  salvar() {
    this.salvarPlano(() => this.message.success('Plano de trabalho salvo com sucesso.'));
  }

  assinar() {
    this.salvarPlano(() => this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', this.planoId()]));
  }

  private salvarPlano(onSuccess: () => void) {
    if (this.saving() || this.form.invalid || !this.programaId() || !this.planoId()) return;

    const payload: Partial<any> = {
      usuario_id: this.form.controls.usuario_id.value,
      unidade_id: this.form.controls.unidade_id.value,
      programa_id: this.programaId(),
      data_inicio: this.form.controls.data_inicio.value,
      data_fim: this.form.controls.data_fim.value,
      tipo_modalidade_id: this.form.controls.tipo_modalidade_id.value,
      justificativa: this.form.controls.justificativa.value || null,
      justificativa_modalidade: this.form.controls.justificativa_modalidade.value || null
    };

    this.saving.set(true);
    this.api.update(this.planoId()!, payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe(() => onSuccess());
  }

  adicionarEntrega() {
    this.entregaForm.reset({
      id: null, origem: 'PROPRIA_UNIDADE', orgao: '', outra_unidade_id: '',
      outra_unidade_plano_id: '', plano_entrega_id: '',
      plano_entrega_entrega_id: '', descricao: '', forca_trabalho: 100
    });
    this.selectedOrigem.set('PROPRIA_UNIDADE');
    this.selectedPlanoEntregaId.set('');
    this.selectedOutraUnidadeId.set('');
    this.selectedOutraUnidadePlanoId.set('');
    this.selectedEntregaEntregaId.set('');
    this.entregasDoPlano.set([]);
    this.entregasDoPlanoOutraUnidade.set([]);
    this.outraUnidadeSelecionada.set(null);
    this.outraUnidadeQuery.setValue('', { emitEvent: false });
    this.sugestoesOutrasUnidades.set([]);
    this.mostrandoFormEntrega.set(true);
  }

  cancelarEntrega() {
    this.entregasDoPlano.set([]);
    this.entregasDoPlanoOutraUnidade.set([]);
    this.mostrandoFormEntrega.set(false);
  }

  salvarEntrega() {
    if (this.entregaForm.invalid || this.salvandoEntrega() || !this.planoId()) return;
    const { plano_entrega_id, outra_unidade_plano_id, ...payload } = this.entregaForm.value;
    this.salvandoEntrega.set(true);

    if (payload.id) {
      this.api.updateEntrega(this.planoId()!, payload.id, payload)
        .pipe(finalize(() => this.salvandoEntrega.set(false)))
        .subscribe(res => {
          this.entregas.update(list => list.map(e => e.id === res.id ? res : e));
          this.cancelarEntrega();
        });
    } else {
      this.api.createEntrega(this.planoId()!, payload)
        .pipe(finalize(() => this.salvandoEntrega.set(false)))
        .subscribe(res => {
          this.entregas.update(list => [...list, res]);
          this.cancelarEntrega();
        });
    }
  }

  editarEntrega(entrega: any) {
    let origem = 'PROPRIA_UNIDADE';
    if (entrega.orgao) {
      origem = 'OUTRO_ORGAO';
    } else if (!entrega.plano_entrega_entrega_id) {
      origem = 'SEM_ENTREGA';
    } else if (entrega.plano_entrega_entrega?.plano_entrega?.unidade_id !== this.form.controls.unidade_id.value) {
      origem = 'OUTRA_UNIDADE';
    }

    const planoId = entrega.plano_entrega_entrega?.plano_entrega_id
      || entrega.plano_entrega_entrega?.plano_entrega?.id
      || '';
    const outraUnidadeId = origem === 'OUTRA_UNIDADE'
      ? (entrega.plano_entrega_entrega?.plano_entrega?.unidade_id || '')
      : '';

    const planoEntregaId = origem === 'PROPRIA_UNIDADE' ? planoId : '';
    const outraUnidadePlanoId = origem === 'OUTRA_UNIDADE' ? planoId : '';

    this.selectedOrigem.set(origem);
    this.selectedPlanoEntregaId.set(planoEntregaId);
    this.selectedOutraUnidadeId.set(outraUnidadeId);
    this.selectedOutraUnidadePlanoId.set(outraUnidadePlanoId);

    this.entregaForm.setValue({
      id: entrega.id || null,
      origem,
      orgao: entrega.orgao || '',
      outra_unidade_id: outraUnidadeId,
      outra_unidade_plano_id: outraUnidadePlanoId,
      plano_entrega_id: planoEntregaId,
      plano_entrega_entrega_id: '',
      descricao: entrega.descricao || '',
      forca_trabalho: entrega.forca_trabalho || 100
    }, { emitEvent: false });

    if (planoId && (origem === 'PROPRIA_UNIDADE' || origem === 'OUTRA_UNIDADE')) {
      this.planoEntregaApi.queryEntregasPorPlano(planoId).subscribe(rows => {
        const entregaEntregaId = entrega.plano_entrega_entrega_id || '';
        const options = this.mapEntregasToOptions(rows);
        this.selectedEntregaEntregaId.set(entregaEntregaId);
        if (origem === 'PROPRIA_UNIDADE') {
          this.entregasDoPlano.set(options);
        } else {
          this.entregasDoPlanoOutraUnidade.set(options);
        }
        this.entregaForm.controls.plano_entrega_entrega_id.setValue(entregaEntregaId);
      });
    } else {
      this.selectedEntregaEntregaId.set('');
      this.entregaForm.controls.plano_entrega_entrega_id.setValue(entrega.plano_entrega_entrega_id || '');
    }

    if (outraUnidadeId) {
      this.sugestoesOutrasUnidades.set([]);
      this.carregarPlanosOutraUnidade(outraUnidadeId, outraUnidadePlanoId);
      this.unidadeService.getById(outraUnidadeId).subscribe(unidade => {
        this.outraUnidadeSelecionada.set({ id: unidade.id, sigla: unidade.sigla, nome: unidade.nome });
        this.outraUnidadeQuery.setValue(`${unidade.sigla} - ${unidade.nome}`, { emitEvent: false });
      });
    } else {
      this.outraUnidadeSelecionada.set(null);
      this.outraUnidadeQuery.setValue('', { emitEvent: false });
      this.sugestoesOutrasUnidades.set([]);
    }

    this.mostrandoFormEntrega.set(true);
  }

  removerEntrega(entrega: any) {
    if (!this.planoId() || !entrega.id) return;
    if (!confirm('Deseja realmente excluir esta entrega?')) return;
    this.api.deleteEntrega(this.planoId()!, entrega.id).subscribe(() => {
      this.entregas.update(list => list.filter(e => e.id !== entrega.id));
    });
  }

  getPlanoEntregaInfo(e: any): { plano: string; entrega: string } {
    return getPlanoEntregaInfo(e);
  }

  buscarOutrasUnidades(term: string) {
    if (!term || term.length < 3) {
      this.sugestoesOutrasUnidades.set([]);
      return;
    }
    this.unidadeService.searchByNomeOuCodigo(term).subscribe((unidades: Unidade[]) => {
      this.sugestoesOutrasUnidades.set(unidades || []);
    });
  }

  selecionarOutraUnidade(u: {id: string, sigla: string, nome: string}) {
    this.outraUnidadeSelecionada.set(u);
    this.outraUnidadeQuery.setValue(`${u.sigla} - ${u.nome}`, { emitEvent: false });
    this.sugestoesOutrasUnidades.set([]);
    this.entregaForm.controls.outra_unidade_id.setValue(u.id);
  }

  limparOutraUnidade() {
    this.outraUnidadeSelecionada.set(null);
    this.outraUnidadeQuery.setValue('', { emitEvent: false });
    this.sugestoesOutrasUnidades.set([]);
    this.entregaForm.controls.outra_unidade_id.setValue('');
    this.entregaForm.controls.outra_unidade_plano_id.setValue('');
    this.selectedOutraUnidadeId.set('');
    this.selectedOutraUnidadePlanoId.set('');
    this.planosOutraUnidade.set([]);
    this.entregasDoPlanoOutraUnidade.set([]);
  }

  private carregarPlanosUnidade(unidadeId: string) {
    this.planoEntregaApi.buscarPorUnidade(unidadeId, this.plano()!.data_inicio, this.plano()!.data_fim).subscribe(planos => {
      this.planosUnidade.set(planos);
      this.entregaForm.controls.plano_entrega_id.setValue('', { emitEvent: false });
      this.entregasDoPlano.set([]);
    });
  }

  private carregarPlanosOutraUnidade(unidadeId: string, planoSelecionadoId?: string) {
    this.planoEntregaApi.buscarPorUnidade(unidadeId, this.plano()!.data_inicio, this.plano()!.data_fim).subscribe(planos => {
      this.planosOutraUnidade.set(planos);
      if (!planoSelecionadoId) {
        this.entregaForm.controls.outra_unidade_plano_id.setValue('', { emitEvent: false });
        this.entregasDoPlanoOutraUnidade.set([]);
      } else {
        this.selectedOutraUnidadePlanoId.set(planoSelecionadoId);
      }
    });
  }

  private carregarEntregasDoPlano(planoId: string, origem: 'PROPRIA_UNIDADE' | 'OUTRA_UNIDADE') {
    this.planoEntregaApi.queryEntregasPorPlano(planoId).subscribe(rows => {
      const options = this.mapEntregasToOptions(rows);
      if (origem === 'PROPRIA_UNIDADE') {
        this.entregasDoPlano.set(options);
      } else {
        this.entregasDoPlanoOutraUnidade.set(options);
      }
    });
  }

  private mapEntregasToOptions(rows: any[]): SelectOption[] {
    return rows.map(x => ({
      value: x.id,
      label: x.descricao || `Entrega ${x.id}`
    }));
  }

  private async carregarRegramento(unidadeId: string) {
    if (this.carregandoRegramento()) return;
    this.carregandoRegramento.set(true);
    try {
      const programas = await this.programaApi.buscarPorUnidadeExecutora(unidadeId, this.joinPrograma);
      const programaVigente = this.programaService.selecionaProgramaVigente(programas);
      const programa = programaVigente ?? programas[0];
      this.programaId.set(programa?.id ?? '');
      this.programaNome.set(programa?.nome ?? '');
    } finally {
      this.carregandoRegramento.set(false);
    }
  }

  private buscarUsuarios(term: string) {
    const value = term.trim();
    if (value.length < 3) return of([] as UsuarioSearchItem[]);
    return this.usuarioService.searchByNomeMatricula(value);
  }

  private async carregarUnidades(usuario: Usuario) {
    const unidades = await firstValueFrom(this.usuarioService.getUnidadesVinculadas(usuario.cpf));
    this.unidades.set(unidades ?? []);

    const unidadeId = usuario.lotacao?.unidade_id;
    if (unidadeId) {
      const unidadeIdValue = unidadeId.trim();
      const isValid = this.unidades().some(u => `${u.id}` === unidadeIdValue);
      if (isValid) {
        this.selectedUnidadeId.set(unidadeIdValue);
        this.form.controls.unidade_id.setValue(unidadeIdValue, { emitEvent: false });
        await this.carregarRegramento(unidadeIdValue);
      }
    }

    this.modalidades.set(await this.tipoModalidadeApi.listar(!!usuario.pedagio));

    const tipoModalidadeId = usuario.tipo_modalidade_id;
    if (typeof tipoModalidadeId === 'string' && tipoModalidadeId.length) {
      const tipoModalidadeValue = tipoModalidadeId.trim();
      const isValid = this.modalidades().some(m => `${m.id}` === tipoModalidadeValue);
      if (isValid) {
        this.usuarioTipoModalidadeId.set(tipoModalidadeValue);
        this.form.controls.tipo_modalidade_id.setValue(tipoModalidadeValue);
        return;
      }
    }

    if (this.modalidades().length > 0) {
      this.form.controls.tipo_modalidade_id.setValue(`${this.modalidades()[0].id}`);
    }
  }
}
