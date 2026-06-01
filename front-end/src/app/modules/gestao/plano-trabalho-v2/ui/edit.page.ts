import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, firstValueFrom, map, of, switchMap, take } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProgramaService } from 'src/app/services/programa.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PlanoApiClient } from '../infra/plano-api.client';
import { ModalidadePgdOption } from 'src/app/v2/services/tipo-modalidade.service';
import { UsuarioService, UsuarioSearchItem } from 'src/app/v2/services/usuario.service';
import { ProgramaApiService } from 'src/app/v2/services/programa-api.service';
import { TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { PlanoEntregaApiService, PlanoEntregaItem } from 'src/app/v2/services/plano-entrega-api.service';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { MessageService } from 'src/app/v2/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { PlanoTrabalhoPolicy } from '../application/plano-trabalho.policy';
import { AssinarPlanoUseCase } from '../application/assinar-plano.usecase';
import { PlanoTrabalho, getPlanoEntregaInfo, planoTrabalhoStatusLabel } from '../domain/types';

export interface SelectOption { value: string; label: string; selected?: boolean; }

@Component({
  selector: 'app-plano-trabalho-v2-edit-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent, RouterLink],
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
  readonly assinatura = inject(AssinarPlanoUseCase);
  private readonly auth = inject(AuthService);

  readonly agentePublicoSomenteLeitura = computed(() => this.auth.isUsuarioParticipante());

  planoId = signal<string | null>(null);
  plano = signal<PlanoTrabalho | null>(null);
  loading = signal(true);
  saving = signal(false);
  carregandoRegramento = signal(false);

  readonly confirmacao = signal<{ titulo: string; mensagem: string; onConfirmar: () => void } | null>(null);

  programaNome = signal('');
  private programaId = signal('');

  readonly agentePublicoQuery = this.fb.nonNullable.control('');
  sugestoesUsuarios = signal<UsuarioSearchItem[]>([]);
  erroAgentePublico = signal('');
  unidades = signal<Unidade[]>([]);
  modalidades = signal<ModalidadePgdOption[]>([]);

  // Valores selecionados como sinais para que os computed de options incluam `selected: true`
  // (necessário porque o br-select/Stencil processa options antes de writeValue)
  private readonly selectedUnidadeId = signal('');
  private readonly selectedModalidadeId = signal('');
  private readonly usuarioModalidadePgd = signal('');

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

  sugestoesOutrasUnidades = signal<{ id: string, codigo: string, sigla: string, nome: string }[]>([]);
  outraUnidadeSelecionada = signal<{ id: string, codigo: string, sigla: string, nome: string } | null>(null);
  readonly outraUnidadeQuery = this.fb.control('');

  mostrandoFormEntrega = signal(false);
  salvandoEntrega = signal(false);
  editandoInformacoesGerais = signal(false);

  readonly totalForcaTrabalho = computed(() =>
    this.entregas().reduce((sum: number, e: any) => sum + (Number(e.forca_trabalho) || 0), 0)
  );

  readonly joinPrograma = ['template_tcr'];

  readonly form: FormGroup<{
    usuario_id: FormControl<string>;
    unidade_id: FormControl<string>;
    data_inicio: FormControl<string>;
    data_fim: FormControl<string>;
    modalidade_pgd: FormControl<string>;
    justificativa_modalidade: FormControl<string>;
    justificativa: FormControl<string>;
  }> = this.fb.group({
    usuario_id: this.fb.nonNullable.control('', Validators.required),
    unidade_id: this.fb.nonNullable.control('', Validators.required),
    data_inicio: this.fb.nonNullable.control('', Validators.required),
    data_fim: this.fb.nonNullable.control('', Validators.required),
    modalidade_pgd: this.fb.nonNullable.control('', Validators.required),
    justificativa_modalidade: this.fb.nonNullable.control(''),
    justificativa: this.fb.nonNullable.control('')
  });

  readonly entregaForm = this.fb.group({
    id: this.fb.control<string | null>(null),
    origem: this.fb.control('PROPRIA_UNIDADE', Validators.required),
    orgao: this.fb.control(''),
    outra_unidade_id: this.fb.control(''),
    outra_unidade_plano_id: this.fb.control(''),
    plano_entrega_id: this.fb.control(''),
    plano_entrega_entrega_id: this.fb.control(''),
    descricao: this.fb.control('', [Validators.required, Validators.maxLength(1000)]),
    forca_trabalho: this.fb.control<number>(100, [Validators.required, Validators.min(1)])
  });

  readonly formStatus = signal(this.form.status);

  readonly podeSalvar = computed(() =>
    this.formStatus() === 'VALID' && !!this.programaId() && !this.saving()
  );

  readonly podeAssinar = computed(() =>
    this.podeSalvar()
  );

  // TODO: definir comportamento quando usuario.modalidade_pgd é null (sem registro no SIAPE).
  // Atualmente trata como divergente, exigindo justificativa.
  readonly agenteExibicao = computed(() =>
    this.agentePublicoQuery.value || this.plano()?.usuario?.nome || '-'
  );

  readonly unidadeExibicao = computed(() => {
    const plano = this.plano();
    if (plano?.unidade?.sigla) return plano.unidade.sigla;
    const id = this.selectedUnidadeId();
    return this.unidades().find(u => `${u.id}` === id)?.sigla ?? '-';
  });

  readonly modalidadeExibicao = computed(() => {
    const plano = this.plano();
    if (plano?.modalidade_pgd_label) {
      return plano.modalidade_pgd_label;
    }
    const key = this.selectedModalidadeId() || this.form.controls.modalidade_pgd.value;
    return this.modalidades().find(m => m.key === key)?.value ?? '-';
  });

  readonly statusLabel = computed(() => {
    const plano = this.plano();
    return planoTrabalhoStatusLabel(plano?.status, plano!);
  });

  readonly modalidadeDivergente = computed(() => {
    const selecionada = this.selectedModalidadeId();
    const doUsuario = this.usuarioModalidadePgd();
    if (!selecionada || !doUsuario) return false;
    return selecionada !== doUsuario;
  });

  // Options para BrSelectComponent — inclui `selected: true` para o item atual,
  // pois o br-select/Stencil processa options antes que writeValue tenha efeito.
  readonly unidadesOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedUnidadeId();
    return this.unidades().map(u => ({ value: `${u.id}`, label: u.sigla, selected: `${u.id}` === sel }));
  });

  readonly modalidadesOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedModalidadeId();
    return this.modalidades().map(m => ({ value: m.key, label: m.value, selected: m.key === sel }));
  });

  readonly origemSelectOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedOrigem();
    return [
      { value: 'PROPRIA_UNIDADE', label: 'Entrega da própria unidade' },
      { value: 'OUTRA_UNIDADE', label: 'Entrega de outra unidade' },
      { value: 'OUTRO_ORGAO', label: 'Entrega de outro órgão/entidade' },
      { value: 'SEM_ENTREGA', label: 'Não vinculada a entrega' }
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
    this.form.statusChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(status => this.formStatus.set(status));

    // Justificativa de modalidade obrigatória quando diverge do modalidade_pgd do usuário
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

    // Justificativa de carga horária obrigatória quando CHD != 100%
    effect(() => {
      const ctrl = this.form.controls.justificativa;
      if (this.totalForcaTrabalho() !== 100) {
        ctrl.setValidators(Validators.required);
      } else {
        ctrl.clearValidators();
        if (ctrl.value) {
          ctrl.setValue('');
          if (this.planoId()) {
            this.api.update(this.planoId()!, { justificativa: null } as any).subscribe();
          }
        }
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
      if (!this.policy.podeEditar(plano)) {
        this.message.error('Você não tem permissão para editar este plano de trabalho.');
        this.router.navigate(['gestao', 'plano-trabalho-v2', 'consultar', plano.id]);
        return;
      }
      this.assinatura.init(plano, plano.entregas || []);
      this.entregas.set(plano.entregas || []);
      await this.aplicarInformacoesGeraisDoPlano(plano);
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

    this.form.controls.modalidade_pgd.valueChanges.pipe(
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

  irParaAssinar() {
    this.router.navigate(['gestao', 'plano-trabalho-v2', 'consultar', this.planoId()], { fragment: 'assinaturas' });
  }

  excluir() {
    if (!this.planoId()) return;
    this.confirmacao.set({
      titulo: 'Excluir Plano de Trabalho',
      mensagem: 'Ao excluir este Plano de Trabalho, ele será removido definitivamente do sistema. Essa ação é irreversível. Deseja confirmar?',
      onConfirmar: () => {
        this.api.delete(this.planoId()!).subscribe(() => {
          this.message.success('Plano de trabalho excluído com sucesso.');
          this.router.navigate(['gestao', 'plano-trabalho-v2']);
        });
      }
    });
  }

  selecionarUsuario(item: UsuarioSearchItem) {
    this.erroAgentePublico.set('');
    this.form.controls.usuario_id.setValue(item.id);
    this.agentePublicoQuery.setValue(item.nome, { emitEvent: false });
    this.sugestoesUsuarios.set([]);
    this.carregarUnidades(item as Usuario);
  }

  limparUsuarioSelecionado() {
    if (this.agentePublicoSomenteLeitura()) return;
    this.unidades.set([]);
    this.programaId.set('');
    this.programaNome.set('');
    this.erroAgentePublico.set('');
    this.agentePublicoQuery.setValue('');
    this.form.controls.usuario_id.setValue('');
    this.form.controls.unidade_id.setValue('');
    this.form.controls.modalidade_pgd.setValue('');
  }

  abrirEdicaoInformacoesGerais(): void {
    this.editandoInformacoesGerais.set(true);
  }

  cancelarEdicaoInformacoesGerais(): void {
    const plano = this.plano();
    if (plano) {
      void this.aplicarInformacoesGeraisDoPlano(plano);
    }
    this.sugestoesUsuarios.set([]);
    this.editandoInformacoesGerais.set(false);
  }

  salvarInformacoesGerais(): void {
    this.salvarPlano(() => {
      this.message.success('Informações gerais salvas com sucesso.');
      this.editandoInformacoesGerais.set(false);
    });
  }

  salvar() {
    this.salvarPlano(() => this.message.success('Plano de trabalho salvo com sucesso.'));
  }

  assinar() {
    const id = this.planoId();
    if (!id) return;
    this.assinatura.gerarDocumento(() => {
      this.plano.update(p => p ? { ...p, documento_id: 'generated' } as any : p);
      this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', id]);
    });
  }

  irParaTCR() {
    const id = this.planoId();
    if (!id) return;
    if (this.plano()?.documento_id) {
      this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', id]);
    } else {
      this.assinatura.gerarDocumento(() => {
        this.plano.update(p => p ? { ...p, documento_id: 'generated' } as any : p);
        this.router.navigate(['gestao', 'plano-trabalho-v2', 'tcr', id]);
      });
    }
  }

  private salvarPlano(onSuccess: () => void) {
    if (this.saving() || this.form.invalid || !this.programaId() || !this.planoId()) return;

    const plano = this.plano();
    if (plano?.documento_id) {
      const msg = plano.status === 'AGUARDANDO_ASSINATURA'
        ? 'Ao prosseguir com a edição, a assinatura será automaticamente desfeita e as informações preenchidas no bloco Planejamento serão excluídas. Deseja continuar?'
        : 'Ao prosseguir com a edição, as informações preenchidas no bloco Planejamento serão excluídas. Deseja continuar?';
      this.confirmacao.set({
        titulo: 'Confirmar Edição',
        mensagem: msg,
        onConfirmar: () => this.executarSalvarPlano(onSuccess)
      });
      return;
    }

    this.executarSalvarPlano(onSuccess);
  }

  private executarSalvarPlano(onSuccess: () => void) {

    const payload: Partial<any> = {
      usuario_id: this.form.controls.usuario_id.value,
      unidade_id: this.form.controls.unidade_id.value,
      programa_id: this.programaId(),
      data_inicio: this.form.controls.data_inicio.value,
      data_fim: this.form.controls.data_fim.value,
      modalidade_pgd: this.form.controls.modalidade_pgd.value,
      justificativa_modalidade: this.form.controls.justificativa_modalidade.value || null,
      justificativa: this.form.controls.justificativa.value || null
    };

    this.saving.set(true);
    this.api.update(this.planoId()!, payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe(async (updated) => {
        if (updated) {
          const planoAtualizado = { ...updated, entregas: this.entregas() } as any;
          this.plano.set(planoAtualizado);
          this.assinatura.init(planoAtualizado, this.entregas());
          await this.aplicarInformacoesGeraisDoPlano(updated);
        }
        onSuccess();
      });
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
          this.plano.update(p => p ? { ...p, documento_id: null, entregas: this.entregas() } as any : p);
          this.assinatura.jaAssinou.set(false);
          this.cancelarEntrega();
        });
    } else {
      this.api.createEntrega(this.planoId()!, payload)
        .pipe(finalize(() => this.salvandoEntrega.set(false)))
        .subscribe(res => {
          this.entregas.update(list => [...list, res]);
          this.plano.update(p => p ? { ...p, documento_id: null, entregas: this.entregas() } as any : p);
          this.assinatura.jaAssinou.set(false);
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
      forca_trabalho: entrega.forca_trabalho || 1
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
        this.outraUnidadeSelecionada.set({ id: unidade.id, codigo: unidade.codigo, sigla: unidade.sigla, nome: unidade.nome });
        this.outraUnidadeQuery.setValue(`${unidade.codigo} - ${unidade.sigla} - ${unidade.nome}`, { emitEvent: false });
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
    this.confirmacao.set({
      titulo: 'Excluir Contribuição',
      mensagem: 'Deseja realmente excluir esta entrega?',
      onConfirmar: () => {
        this.api.deleteEntrega(this.planoId()!, entrega.id).subscribe(() => {
          this.entregas.update(list => list.filter(e => e.id !== entrega.id));
          this.plano.update(p => p ? { ...p, documento_id: null, entregas: this.entregas() } as any : p);
          this.assinatura.jaAssinou.set(false);
        });
      }
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

  selecionarOutraUnidade(u: { id: string, codigo: string, sigla: string, nome: string }) {
    this.outraUnidadeSelecionada.set(u);
    this.outraUnidadeQuery.setValue(`${u.codigo} - ${u.sigla} - ${u.nome}`, { emitEvent: false });
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

  private async aplicarInformacoesGeraisDoPlano(plano: PlanoTrabalho): Promise<void> {
    this.form.controls.data_inicio.setValue(
      plano.data_inicio ? new Date(plano.data_inicio).toISOString().split('T')[0] : '',
      { emitEvent: false }
    );
    this.form.controls.data_fim.setValue(
      plano.data_fim ? new Date(plano.data_fim).toISOString().split('T')[0] : '',
      { emitEvent: false }
    );
    this.form.controls.justificativa_modalidade.setValue(plano.justificativa_modalidade || '', { emitEvent: false });
    this.form.controls.justificativa.setValue(plano.justificativa || '', { emitEvent: false });

    if (plano.usuario_id) {
      const usuario = await firstValueFrom(this.usuarioService.getById(plano.usuario_id));
      this.form.controls.usuario_id.setValue(usuario.id, { emitEvent: false });
      this.agentePublicoQuery.setValue(usuario.nome, { emitEvent: false });
      await this.carregarUnidades(usuario);
      this.selectedUnidadeId.set(plano.unidade_id ?? '');
      this.form.controls.unidade_id.setValue(plano.unidade_id ?? '', { emitEvent: false });
      this.selectedModalidadeId.set(plano.modalidade_pgd ?? '');
      this.form.controls.modalidade_pgd.setValue(plano.modalidade_pgd ?? '', { emitEvent: false });
      if (plano.unidade_id) {
        this.carregarPlanosUnidade(plano.unidade_id);
      }
    }

    if (plano.programa?.nome) {
      this.programaNome.set(plano.programa.nome);
      this.programaId.set(plano.programa_id ?? plano.programa.id ?? '');
    } else if (plano.unidade_id) {
      await this.carregarRegramento(plano.unidade_id);
    }

    if (this.auth.isUsuarioParticipante()) {
      this.agentePublicoQuery.disable({ emitEvent: false });
    } else {
      this.agentePublicoQuery.enable({ emitEvent: false });
    }
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
    if (value.length < 3 || this.agentePublicoSomenteLeitura()) {
      return of([] as UsuarioSearchItem[]);
    }
    return this.usuarioService.searchByNomeMatricula(value);
  }

  private async carregarUnidades(usuario: Usuario) {
    const unidades = await firstValueFrom(this.usuarioService.getUnidadesVinculadas(usuario.cpf));
    this.unidades.set(unidades ?? []);
    this.erroAgentePublico.set('');

    if (!unidades || unidades.length === 0 || (usuario as any).participa_pgd === 'não'
        || (!(usuario as any).participa_pgd && !usuario.modalidade_pgd)) {
      this.erroAgentePublico.set('Usuário não participante do PGD ou não habilitado para pactuar Plano de Trabalho nesta unidade.');
    }

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

    this.modalidades.set(await this.tipoModalidadeApi.listar());

    const tipoModalidadeId = usuario.modalidade_pgd;
    if (typeof tipoModalidadeId === 'string' && tipoModalidadeId.length) {
      const tipoModalidadeValue = tipoModalidadeId.trim();
      const isValid = this.modalidades().some(m => m.key === tipoModalidadeValue);
      if (isValid) {
        this.usuarioModalidadePgd.set(tipoModalidadeValue);
        this.form.controls.modalidade_pgd.setValue(tipoModalidadeValue);
        return;
      }
    }

    if (this.modalidades().length > 0) {
      this.form.controls.modalidade_pgd.setValue(this.modalidades()[0].key);
    }
  }
}
