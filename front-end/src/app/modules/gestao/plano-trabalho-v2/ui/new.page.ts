import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, firstValueFrom, map, merge, of, switchMap, take, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Programa } from 'src/app/models/programa.model';
import { ProgramaService } from 'src/app/services/programa.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Perfil } from 'src/app/models/perfil.model';
import { PlanoTrabalhoApiClient } from '../infra/api-client';
import { ModalidadePgdOption, TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { UsuarioService, UsuarioSearchItem } from 'src/app/v2/services/usuario.service';
import { ProgramaApiService } from 'src/app/v2/services/programa-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { SelectOption } from './edit.page';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-plano-trabalho-v2-new-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './new.page.html'
})
export class PlanoTrabalhoV2NewPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PlanoTrabalhoApiClient);
  private readonly usuarioService = inject(UsuarioService);
  private readonly programaApi = inject(ProgramaApiService);
  private readonly tipoModalidadeApi = inject(TipoModalidadeService);
  private readonly programaService = inject(ProgramaService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  saving = signal(false);
  carregandoRegramento = signal(false);
  readonly confirmacao = signal<{ titulo: string; mensagem: string; onConfirmar: () => void } | null>(null);
  erroPeriodo = signal(false);
  readonly cloneDe = signal<string | null>(null);
  readonly cloneDeNumero = signal<number | null>(null);
  erroRegramento = signal('');

  private programas = signal<Programa[]>([]);
  programaId = signal('');
  programasVisiveis = signal<Programa[]>([]);

  readonly agentePublicoQuery = this.fb.nonNullable.control('');
  sugestoesUsuarios = signal<UsuarioSearchItem[]>([]);
  erroAgentePublico = signal('');
  unidades = signal<Unidade[]>([]);
  modalidades = signal<ModalidadePgdOption[]>([]);

  private readonly selectedUnidadeId = signal('');
  private readonly selectedModalidade = signal('');
  private readonly usuarioModalidadePgd = signal('');

  readonly joinPrograma = ['template_tcr'];

  readonly form: FormGroup<{
    usuario_id: FormControl<string>;
    unidade_id: FormControl<string>;
    data_inicio: FormControl<string>;
    data_fim: FormControl<string>;
    modalidade_pgd: FormControl<string>;
    justificativa_modalidade: FormControl<string>;
  }> = this.fb.group({
    usuario_id: this.fb.nonNullable.control('', Validators.required),
    unidade_id: this.fb.nonNullable.control('', Validators.required),
    data_inicio: this.fb.nonNullable.control('', Validators.required),
    data_fim: this.fb.nonNullable.control('', Validators.required),
    modalidade_pgd: this.fb.nonNullable.control('', Validators.required),
    justificativa_modalidade: this.fb.nonNullable.control('')
  });

  readonly formStatus = signal(this.form.status);

  readonly podeSalvar = computed(() =>
    this.formStatus() === 'VALID' && !!this.programaId() && !this.saving() && !this.erroRegramento()
  );

  readonly agentePublicoSomenteLeitura = computed(() => this.auth.isUsuarioParticipante());

  // TODO: definir comportamento quando usuario.modalidade_pgd é null (sem registro no SIAPE).
  // Atualmente trata como divergente, exigindo justificativa.
  readonly modalidadeDivergente = computed(() => {
    const selecionada = this.selectedModalidade();
    const doUsuario = this.usuarioModalidadePgd();
    if (!selecionada || !doUsuario) return false;
    return selecionada !== doUsuario;
  });

  readonly unidadesOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedUnidadeId();
    return this.unidades().map(u => ({ value: `${u.id}`, label: u.sigla, selected: `${u.id}` === sel }));
  });

  readonly modalidadesOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedModalidade();
    return this.modalidades().map(m => ({ value: m.key, label: m.value, selected: m.key === sel }));
  });

  readonly programaNome = computed(() => {
    const id = this.programaId();
    return this.programas().find(p => p.id === id)?.nome ?? '';
  });

  readonly programasOptions = computed<SelectOption[]>(() => {
    const sel = this.programaId();
    return this.programasVisiveis().map(p => ({ value: p.id, label: p.nome, selected: p.id === sel }));
  });

  ngOnInit(): void {
    this.form.statusChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(status => this.formStatus.set(status));

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

    const fonteId = this.route.snapshot.queryParamMap.get('clone_de');
    if (fonteId) {
      this.cloneDe.set(fonteId);
    }

    timer(0, 250)
      .pipe(
        map(() => this.auth.usuario),
        filter((usuario): usuario is Usuario => !!usuario?.id),
        take(1),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(usuario => {
        if (!this.cloneDe()) {
          this.preselectUsuario(usuario);
        }
        if (this.auth.isUsuarioParticipante()) {
          this.agentePublicoQuery.disable({ emitEvent: false });
        }
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
    });

    this.form.controls.modalidade_pgd.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(key => this.selectedModalidade.set(key ?? ''));

    merge(
      this.form.controls.data_inicio.valueChanges,
      this.form.controls.data_fim.valueChanges
    ).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.erroPeriodo.set(false);
      this.selecionarProgramaPorPeriodo();
    });

    if (this.cloneDe()) {
      this.carregarDadosFonte(this.cloneDe()!);
    }
  }

  voltar() {
    if (this.form.dirty) {
      this.confirmacao.set({
        titulo: 'Voltar',
        mensagem: 'Ao voltar, todos os dados serão descartados. Deseja confirmar?',
        onConfirmar: () => this.router.navigate(['gestao', 'plano-trabalho-v2'])
      });
    } else {
      this.router.navigate(['gestao', 'plano-trabalho-v2']);
    }
  }

  selecionarUsuario(item: UsuarioSearchItem) {
    this.erroAgentePublico.set('');
    this.form.controls.usuario_id.setValue(item.id);
    this.agentePublicoQuery.setValue(item.nome_exibicao, { emitEvent: false });
    this.sugestoesUsuarios.set([]);
    this.carregarUnidades(item as Usuario);
  }

  onModalidadeChange(event: any) {
    const value = event?.detail ?? event?.target?.value ?? '';
    this.selectedModalidade.set(value);
  }

  limparUsuarioSelecionado() {
    if (this.agentePublicoSomenteLeitura()) return;
    this.unidades.set([]);
    this.modalidades.set([]);
    this.programaId.set('');
    this.programas.set([]);
    this.erroAgentePublico.set('');
    this.usuarioModalidadePgd.set('');
    this.selectedModalidade.set('');
    this.agentePublicoQuery.setValue('');
    this.form.controls.usuario_id.setValue('');
    this.form.controls.unidade_id.setValue('');
    this.form.controls.modalidade_pgd.setValue('');
  }

  salvar() {
    if (this.saving() || this.form.invalid || !this.programaId() || this.erroRegramento()) return;
    const { data_inicio, data_fim } = this.form.controls;
    if (data_inicio.value && data_fim.value && data_fim.value < data_inicio.value) {
      this.erroPeriodo.set(true);
      return;
    }

    const payload = {
      usuario_id: this.form.controls.usuario_id.value,
      unidade_id: this.form.controls.unidade_id.value,
      programa_id: this.programaId(),
      data_inicio: this.form.controls.data_inicio.value,
      data_fim: this.form.controls.data_fim.value,
      modalidade_pgd: this.form.controls.modalidade_pgd.value,
      justificativa_modalidade: this.form.controls.justificativa_modalidade.value || null,
      clone_de: this.cloneDe() || null
    };

    this.saving.set(true);
    this.api.create(payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe(res => {
        this.router.navigate(['gestao', 'plano-trabalho-v2', 'editar', res.id]);
      });
  }

  private async carregarRegramento(unidadeId: string) {
    if (this.carregandoRegramento()) return;
    this.carregandoRegramento.set(true);
    try {
      const programas = await this.programaApi.buscarPorUnidadeExecutora(unidadeId, this.joinPrograma);
      this.programas.set(programas);
      this.selecionarProgramaPorPeriodo();
    } finally {
      this.carregandoRegramento.set(false);
    }
  }

  private selecionarProgramaPorPeriodo() {
    const programas = this.programas();
    if (programas.length === 0) {
      this.programasVisiveis.set([]);
      return;
    }
    const dataInicio = this.form.controls.data_inicio.value;
    const dataFim = this.form.controls.data_fim.value;
    if (!dataInicio || !dataFim) {
      this.programaId.set('');
      this.programasVisiveis.set([]);
      this.erroRegramento.set('');
      return;
    }
    const visiveis = programas.filter(p =>
      String(p.data_inicio).substring(0, 10) <= dataFim && String(p.data_fim).substring(0, 10) >= dataInicio
    );
    this.programasVisiveis.set(visiveis);
    if (visiveis.length === 0) {
      this.programaId.set('');
      this.erroRegramento.set('O período selecionado para o plano não possui Regramento ativo. Selecione outro período.');
      return;
    }
    if (visiveis.length === 1) {
      this.programaId.set(visiveis[0].id);
    } else if (!visiveis.find(p => p.id === this.programaId())) {
      this.programaId.set('');
    }
    this.validarCoberturaProgramaSelecionado(dataInicio, dataFim);
  }

  selecionarPrograma(event: any) {
    const id = event?.detail ?? event?.target?.value ?? event ?? '';
    this.programaId.set(id);
    const dataInicio = this.form.controls.data_inicio.value;
    const dataFim = this.form.controls.data_fim.value;
    if (dataInicio && dataFim) {
      this.validarCoberturaProgramaSelecionado(dataInicio, dataFim);
    }
  }

  private validarCoberturaProgramaSelecionado(dataInicio: string, dataFim: string) {
    const programa = this.programasVisiveis().find(p => p.id === this.programaId());
    if (!programa) {
      this.erroRegramento.set('');
      return;
    }
    if (!this.programaService.programaCobrePeriodo(programa, dataInicio, dataFim)) {
      const inicio = String(programa.data_inicio).substring(0, 10).split('-').reverse().join('/');
      const fim = String(programa.data_fim).substring(0, 10).split('-').reverse().join('/');
      this.erroRegramento.set(`O período do plano de trabalho deve coincidir integralmente com o período do Regramento: ${inicio} a ${fim}`);
      return;
    }
    this.erroRegramento.set('');
  }

  private buscarUsuarios(term: string) {
    const value = term.trim();
    if (value.length < 3 || this.agentePublicoSomenteLeitura()) {
      return of([] as UsuarioSearchItem[]);
    }
    return this.usuarioService.searchByNomeMatricula(value);
  }

  private preselectUsuario(usuario: Usuario) {
    if (!usuario.id || !usuario.nome) return;
    if (!this.auth.isUsuarioParticipante() && usuario.perfil?.nivel === Perfil.NIVEL.COLABORADOR) {
      return;
    }
    this.form.controls.usuario_id.setValue(usuario.id);
    this.agentePublicoQuery.setValue(usuario.nome_exibicao, { emitEvent: false });
    void this.carregarUnidades(usuario);
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

    const modalidadePgd = usuario.modalidade_pgd;
    if (typeof modalidadePgd === 'string' && modalidadePgd.length) {
      this.selectedModalidade.set(modalidadePgd);
      this.usuarioModalidadePgd.set(modalidadePgd);
    }

    this.modalidades.set(await this.tipoModalidadeApi.listar());

    if (typeof modalidadePgd === 'string' && modalidadePgd.length) {
      const isValid = this.modalidades().some(m => m.key === modalidadePgd);
      if (isValid) {
        this.form.controls.modalidade_pgd.setValue(modalidadePgd);
        return;
      }
    }

    if (this.modalidades().length > 0) {
      const firstKey = this.modalidades()[0].key;
      this.selectedModalidade.set(firstKey);
      this.form.controls.modalidade_pgd.setValue(firstKey);
    }
  }

  private carregarDadosFonte(fonteId: string) {
    this.api.getById(fonteId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: plano => {
        this.cloneDeNumero.set(plano.numero ?? null);
        this.usuarioService.getById(plano.usuario_id).pipe(
          take(1)
        ).subscribe(usuario => {
          this.form.controls.usuario_id.setValue(usuario.id);
          this.agentePublicoQuery.setValue(usuario.nome, { emitEvent: false });
          void this.carregarUnidadesComPreselecao(usuario, plano.unidade_id, plano.modalidade_pgd);
        });
      },
      error: () => {
        this.cloneDe.set(null);
        if (this.auth.usuario) {
          this.preselectUsuario(this.auth.usuario);
        }
      }
    });
  }

  private async carregarUnidadesComPreselecao(usuario: Usuario, unidadeId: string, modalidade: string | null) {
    const unidades = await firstValueFrom(this.usuarioService.getUnidadesVinculadas(usuario.cpf));
    this.unidades.set(unidades ?? []);

    if (unidadeId) {
      this.selectedUnidadeId.set(unidadeId);
      this.form.controls.unidade_id.setValue(unidadeId, { emitEvent: false });
      await this.carregarRegramento(unidadeId);
    }

    if (typeof usuario.modalidade_pgd === 'string' && usuario.modalidade_pgd.length) {
      this.usuarioModalidadePgd.set(usuario.modalidade_pgd);
    }

    this.modalidades.set(await this.tipoModalidadeApi.listar());

    if (modalidade) {
      this.selectedModalidade.set(modalidade);
      this.form.controls.modalidade_pgd.setValue(modalidade);
    }
  }
}
