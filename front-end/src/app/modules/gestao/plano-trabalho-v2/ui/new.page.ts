import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, firstValueFrom, map, of, switchMap, take, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ProgramaService } from 'src/app/services/programa.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PlanoTrabalhoApiClient } from '../infra/api-client';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { UsuarioService, UsuarioSearchItem } from 'src/app/v2/services/usuario.service';
import { ProgramaApiService } from 'src/app/v2/services/programa-api.service';
import { TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { AuthService } from 'src/app/services/auth.service';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { SelectOption } from './edit.page';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-plano-trabalho-v2-new-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './new.page.html'
})
export class PlanoTrabalhoV2NewPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
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

  programaNome = signal('');
  private programaId = signal('');

  readonly agentePublicoQuery = this.fb.nonNullable.control('');
  sugestoesUsuarios = signal<UsuarioSearchItem[]>([]);
  unidades = signal<Unidade[]>([]);
  modalidades = signal<TipoModalidade[]>([]);

  private readonly selectedUnidadeId = signal('');
  private readonly selectedModalidadeId = signal('');
  private readonly usuarioTipoModalidadeId = signal('');

  readonly joinPrograma = ['template_tcr'];

  readonly form: FormGroup<{
    usuario_id: FormControl<string>;
    unidade_id: FormControl<string>;
    data_inicio: FormControl<string>;
    data_fim: FormControl<string>;
    tipo_modalidade_id: FormControl<string>;
    justificativa_modalidade: FormControl<string>;
  }> = this.fb.group({
    usuario_id: this.fb.nonNullable.control('', Validators.required),
    unidade_id: this.fb.nonNullable.control('', Validators.required),
    data_inicio: this.fb.nonNullable.control('', Validators.required),
    data_fim: this.fb.nonNullable.control('', Validators.required),
    tipo_modalidade_id: this.fb.nonNullable.control('', Validators.required),
    justificativa_modalidade: this.fb.nonNullable.control('')
  });

  readonly formStatus = signal(this.form.status);

  readonly podeSalvar = computed(() =>
    this.formStatus() === 'VALID' && !!this.programaId() && !this.saving()
  );

  readonly modalidadeDivergente = computed(() => {
    const selecionada = this.selectedModalidadeId();
    const doUsuario = this.usuarioTipoModalidadeId();
    return !!selecionada && !!doUsuario && selecionada !== doUsuario;
  });

  readonly unidadesOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedUnidadeId();
    return this.unidades().map(u => ({ value: `${u.id}`, label: u.sigla, selected: `${u.id}` === sel }));
  });

  readonly modalidadesOptions = computed<SelectOption[]>(() => {
    const sel = this.selectedModalidadeId();
    return this.modalidades().map(m => ({ value: `${m.id}`, label: m.nome, selected: `${m.id}` === sel }));
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

    timer(0, 250)
      .pipe(
        map(() => this.auth.usuario),
        filter((usuario): usuario is Usuario => !!usuario?.id),
        take(1),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(usuario => this.preselectUsuario(usuario));

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

    this.form.controls.tipo_modalidade_id.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(id => this.selectedModalidadeId.set(id ?? ''));
  }

  voltar() { this.router.navigate(['gestao', 'plano-trabalho-v2']); }

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
    this.usuarioTipoModalidadeId.set('');
    this.agentePublicoQuery.setValue('');
    this.form.controls.usuario_id.setValue('');
    this.form.controls.unidade_id.setValue('');
    this.form.controls.tipo_modalidade_id.setValue('');
  }

  salvar() {
    if (this.saving() || this.form.invalid || !this.programaId()) return;

    const payload = {
      usuario_id: this.form.controls.usuario_id.value,
      unidade_id: this.form.controls.unidade_id.value,
      programa_id: this.programaId(),
      data_inicio: this.form.controls.data_inicio.value,
      data_fim: this.form.controls.data_fim.value,
      tipo_modalidade_id: this.form.controls.tipo_modalidade_id.value,
      justificativa_modalidade: this.form.controls.justificativa_modalidade.value || null
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

  private preselectUsuario(usuario: Usuario) {
    if (!usuario.id || !usuario.nome) return;
    this.form.controls.usuario_id.setValue(usuario.id);
    this.agentePublicoQuery.setValue(usuario.nome, { emitEvent: false });
    void this.carregarUnidades(usuario);
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
        this.selectedModalidadeId.set(tipoModalidadeValue);
        this.form.controls.tipo_modalidade_id.setValue(tipoModalidadeValue);
        return;
      }
    }

    if (this.modalidades().length > 0) {
      const firstValue = `${this.modalidades()[0].id}`;
      this.selectedModalidadeId.set(firstValue);
      this.form.controls.tipo_modalidade_id.setValue(firstValue);
    }
  }
}
