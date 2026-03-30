import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, firstValueFrom, fromEvent, map, of, switchMap, take, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigateService } from 'src/app/services/navigate.service';
import { ProgramaService } from 'src/app/services/programa.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PlanoTrabalhoApiClient } from '../infra/api-client';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { UsuarioService, UsuarioSearchItem } from 'src/app/v2/services/usuario.service';
import { ProgramaApiService } from 'src/app/v2/services/programa-api.service';
import { TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-plano-trabalho-v2-new-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.page.html'
})
export class PlanoTrabalhoV2NewPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly go = inject(NavigateService);
  private readonly api = inject(PlanoTrabalhoApiClient);
  private readonly usuarioService = inject(UsuarioService);
  private readonly programaApi = inject(ProgramaApiService);
  private readonly tipoModalidadeApi = inject(TipoModalidadeService);
  private readonly programaService = inject(ProgramaService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);

  saving = signal(false);
  carregandoRegramento = signal(false);

  programaNome = signal('');
  private programaId = signal('');

  readonly agentePublicoQuery = this.fb.nonNullable.control('');
  sugestoesUsuarios = signal<UsuarioSearchItem[]>([]);
  private selectedUsuario = signal<Usuario | undefined>(undefined);
  unidades = signal<Unidade[]>([]);
  modalidades = signal<TipoModalidade[]>([]);

  selectAberto = signal<string | null>(null);

  readonly joinPrograma = ['template_tcr'];

  readonly form: FormGroup<{
    usuario_id: FormControl<string>;
    unidade_id: FormControl<string>;
    data_inicio: FormControl<string>;
    data_fim: FormControl<string>;
    tipo_modalidade_id: FormControl<string>;
  }> = this.fb.group({
    usuario_id: this.fb.nonNullable.control('', Validators.required),
    unidade_id: this.fb.nonNullable.control('', Validators.required),
    data_inicio: this.fb.nonNullable.control('', Validators.required),
    data_fim: this.fb.nonNullable.control('', Validators.required),
    tipo_modalidade_id: this.fb.nonNullable.control('', Validators.required)
  });

  readonly formStatus = signal(this.form.status);

  readonly podeSalvar = computed(() => {
    return this.formStatus() === 'VALID' && !!this.programaId() && !this.saving();
  });

  readonly unidadeSelecionadaLabel = computed(() => {
    const unidadeId = this.form.controls.unidade_id.value;
    if (!unidadeId) return '';
    return this.unidades().find(u => `${u.id}` === unidadeId)?.sigla ?? '';
  });

  readonly modalidadeSelecionadaLabel = computed(() => {
    const modalidadeId = this.form.controls.tipo_modalidade_id.value;
    if (!modalidadeId) return '';
    return this.modalidades().find(m => `${m.id}` === modalidadeId)?.nome ?? '';
  });

  ngOnInit(): void {
    this.form.statusChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(status => this.formStatus.set(status));
    fromEvent(this.document, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.selectAberto.set(null));
    timer(0, 250)
      .pipe(
        map(() => this.auth.usuario),
        filter((usuario): usuario is Usuario => !!usuario?.id),
        take(1),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(usuario => this.preselectUsuario(usuario));

    this.agentePublicoQuery.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(term => this.buscarUsuarios(term)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(items => {
        this.sugestoesUsuarios.set(items);
      });

    this.form.controls.unidade_id.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(unidadeId => {
        if (!unidadeId) return;
        void this.carregarRegramento(unidadeId);
      });
  }

  voltar() {
    this.go.back();
  }

  toggleSelect(key: string) {
    if (this.selectAberto() === key) {
      this.selectAberto.set(null);
      return;
    }
    this.selectAberto.set(key);
  }

  selecionarUnidade(unidade: Unidade) {
    this.form.controls.unidade_id.setValue(`${unidade.id}`);
    this.selectAberto.set(null);
  }

  selecionarModalidade(modalidade: TipoModalidade) {
    this.form.controls.tipo_modalidade_id.setValue(`${modalidade.id}`);
    this.selectAberto.set(null);
  }

  selecionarUsuario(item: UsuarioSearchItem) {
    this.form.controls.usuario_id.setValue(item.id);
    this.agentePublicoQuery.setValue(item.nome, { emitEvent: false });
    this.sugestoesUsuarios.set([]);
    this.carregarUnidades(item as Usuario);
  }

  limparUsuarioSelecionado() {
    this.selectedUsuario.set(undefined);
    this.unidades.set([]);
    this.programaId.set('');
    this.programaNome.set('');
    this.agentePublicoQuery.setValue('');
    this.form.controls.usuario_id.setValue('');
    this.form.controls.unidade_id.setValue('');
    this.form.controls.tipo_modalidade_id.setValue('');
  }

  salvar() {
    if (this.saving()) return;
    if (this.form.invalid) return;
    if (!this.programaId()) return;

    const payload = {
      usuario_id: this.form.controls.usuario_id.value,
      unidade_id: this.form.controls.unidade_id.value,
      programa_id: this.programaId(),
      data_inicio: this.form.controls.data_inicio.value,
      data_fim: this.form.controls.data_fim.value,
      tipo_modalidade_id: this.form.controls.tipo_modalidade_id.value
    };

    this.saving.set(true);
    this.api
      .create(payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe((res) => {
        this.go.navigate({ route: ['gestao', 'plano-trabalho-v2', 'editar', res.id] });
      });
  }

  private async carregarRegramento(unidadeId: string) {
    if (this.carregandoRegramento()) return;
    this.carregandoRegramento.set(true);
    try {
      /* TODO: refatorar para API v2 */ 
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
    const usuarioId = usuario.id;
    const usuarioNome = usuario.nome;
    if (!usuarioId || !usuarioNome) return;
    this.form.controls.usuario_id.setValue(usuarioId);
    this.agentePublicoQuery.setValue(usuarioNome, { emitEvent: false });
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
        this.form.controls.tipo_modalidade_id.setValue(tipoModalidadeValue);
        return;
      }
    }

    if (this.modalidades().length > 0) {
      const firstValue = `${this.modalidades()[0].id}`;
      this.form.controls.tipo_modalidade_id.setValue(firstValue);
    }
  }
}
