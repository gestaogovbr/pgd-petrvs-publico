import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, firstValueFrom, map, of, switchMap, take, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NavigateService } from 'src/app/services/navigate.service';
import { ProgramaService } from 'src/app/services/programa.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PlanoTrabalhoApiClient } from '../infra/api-client';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { UsuarioService, UsuarioSearchItem } from 'src/app/v2/services/usuario.service';
import { ProgramaApiService } from 'src/app/v2/services/programa-api.service';
import { TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { GovBrAssetsService } from 'src/app/v2/services/govbr-assets.service';
import { BrButton, BrCard, BrInput, BrSelect, BrSelectOption, BrTextarea, SelectValueAccessor, TextValueAccessor } from '@govbr-ds/webcomponents-angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-plano-trabalho-v2-edit-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, BrButton, BrCard, BrInput, BrSelect, BrSelectOption, BrTextarea, TextValueAccessor, SelectValueAccessor],
  templateUrl: './edit.page.html'
})
export class PlanoTrabalhoV2EditPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly go = inject(NavigateService);
  private readonly api = inject(PlanoTrabalhoApiClient);
  private readonly usuarioService = inject(UsuarioService);
  private readonly programaApi = inject(ProgramaApiService);
  private readonly tipoModalidadeApi = inject(TipoModalidadeService);
  private readonly programaService = inject(ProgramaService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly govbr = inject(GovBrAssetsService);
  private readonly route = inject(ActivatedRoute);

  planoId = signal<string | null>(null);
  loading = signal(true);

  saving = signal(false);
  carregandoRegramento = signal(false);

  programaNome = signal('');
  private programaId = signal('');

  readonly agentePublicoQuery = this.fb.nonNullable.control('');
  sugestoesUsuarios = signal<UsuarioSearchItem[]>([]);
  private selectedUsuario = signal<Usuario | undefined>(undefined);
  unidades = signal<Unidade[]>([]);
  modalidades = signal<TipoModalidade[]>([]);

  entregas = signal<any[]>([]);
  entregasUnidade = signal<{id: string, label: string, planoNome: string, entregaNome: string}[]>([]);
  mostrandoFormEntrega = signal(false);
  salvandoEntrega = signal(false);

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

  readonly entregaForm = this.fb.group({
    id: this.fb.control<string | null>(null),
    plano_entrega_entrega_id: this.fb.control('', Validators.required),
    descricao: this.fb.control('', Validators.required),
    forca_trabalho: this.fb.control<number>(100, [Validators.required, Validators.min(1), Validators.max(100)])
  });

  readonly formStatus = signal(this.form.status);

  readonly podeSalvar = computed(() => {
    return this.formStatus() === 'VALID' && !!this.programaId() && !this.saving();
  });

  ngOnInit(): void {
    this.govbr.load();
    
    this.form.statusChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(status => this.formStatus.set(status));

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
      this.entregas.set(plano.entregas || []);
      this.form.controls.data_inicio.setValue(plano.data_inicio ? new Date(plano.data_inicio).toISOString().split('T')[0] : '');
      this.form.controls.data_fim.setValue(plano.data_fim ? new Date(plano.data_fim).toISOString().split('T')[0] : '');
      
      if (plano.usuario_id) {
        const usuario = await firstValueFrom(this.usuarioService.getById(plano.usuario_id));
        this.selectedUsuario.set(usuario);
        this.form.controls.usuario_id.setValue(usuario.id);
        this.agentePublicoQuery.setValue(usuario.nome, { emitEvent: false });
        await this.carregarUnidades(usuario);
        this.form.controls.unidade_id.setValue(plano.unidade_id);
        this.form.controls.tipo_modalidade_id.setValue(plano.tipo_modalidade_id);
        this.carregarEntregasUnidade(plano.unidade_id);
      }
      this.loading.set(false);
    });

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
        this.carregarEntregasUnidade(unidadeId);
      });
  }

  voltar() {
    this.go.back();
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
    if (!this.planoId()) return;

    const payload: Partial<any> = {
      usuario_id: this.form.controls.usuario_id.value,
      unidade_id: this.form.controls.unidade_id.value,
      programa_id: this.programaId(),
      data_inicio: this.form.controls.data_inicio.value,
      data_fim: this.form.controls.data_fim.value,
      tipo_modalidade_id: this.form.controls.tipo_modalidade_id.value
    };

    this.saving.set(true);
    this.api
      .update(this.planoId()!, payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe(() => {
        this.go.navigate({ route: ['gestao', 'plano-trabalho-v2'] }); // go to list on save? Or just stay? The image shows "Editar" and "Assinar" buttons, so maybe we stay.
      });
  }

  private carregarEntregasUnidade(unidadeId: string) {
    this.api.queryEntregasUnidade(unidadeId).subscribe(rows => {
      this.entregasUnidade.set(rows.map(x => ({
        id: x.id,
        label: x.descricao || x.entrega?.nome || 'Entrega sem descrição',
        planoNome: x.plano_entrega?.nome || 'Plano da Unidade',
        entregaNome: x.entrega?.nome || x.descricao || 'Entrega'
      })));
    });
  }

  adicionarEntrega() {
    this.entregaForm.reset({ id: null, plano_entrega_entrega_id: '', descricao: '', forca_trabalho: 100 });
    this.mostrandoFormEntrega.set(true);
  }

  cancelarEntrega() {
    this.mostrandoFormEntrega.set(false);
  }

  salvarEntrega() {
    if (this.entregaForm.invalid || this.salvandoEntrega() || !this.planoId()) return;
    const payload = this.entregaForm.value;
    this.salvandoEntrega.set(true);
    
    if (payload.id) {
      this.api.updateEntrega(this.planoId()!, payload.id, payload).pipe(finalize(() => this.salvandoEntrega.set(false))).subscribe(res => {
         this.entregas.update(list => list.map(e => e.id === res.id ? res : e));
         this.mostrandoFormEntrega.set(false);
      });
    } else {
      this.api.createEntrega(this.planoId()!, payload).pipe(finalize(() => this.salvandoEntrega.set(false))).subscribe(res => {
         this.entregas.update(list => [...list, res]);
         this.mostrandoFormEntrega.set(false);
      });
    }
  }

  editarEntrega(entrega: any) {
    this.entregaForm.setValue({
      id: entrega.id || null,
      plano_entrega_entrega_id: entrega.plano_entrega_entrega_id || '',
      descricao: entrega.descricao || '',
      forca_trabalho: entrega.forca_trabalho || 100
    });
    this.mostrandoFormEntrega.set(true);
  }

  removerEntrega(entrega: any) {
    if (!this.planoId() || !entrega.id) return;
    if (!confirm('Deseja realmente excluir esta entrega?')) return;
    
    this.api.deleteEntrega(this.planoId()!, entrega.id).subscribe(() => {
      this.entregas.update(list => list.filter(e => e.id !== entrega.id));
    });
  }

  getPlanoEntregaInfo(id: string | null | undefined): { plano: string, entrega: string } {
    if (!id) return { plano: '', entrega: '' };
    const found = this.entregasUnidade().find(x => x.id === id);
    if (found) {
      return { plano: found.planoNome, entrega: found.entregaNome };
    }
    // Caso não encontre na lista (ex: entrega de outra unidade já vinculada)
    return { plano: 'Plano vinculado', entrega: 'Entrega vinculada' };
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
