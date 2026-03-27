import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, finalize, map, of, Subscription, switchMap } from 'rxjs';
import { NavigateService } from 'src/app/services/navigate.service';
import { ProgramaService } from 'src/app/services/programa.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PlanoTrabalhoApiClient } from '../infra/api-client';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { GlobalsService } from 'src/app/services/globals.service';

type UsuarioSearchItem = {
  id: string;
  nome: string;
  matricula: string | null;
};

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
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);
  readonly usuarioDao = inject(UsuarioDaoService);
  private readonly programaDao = inject(ProgramaDaoService);
  private readonly tipoModalidadeDao = inject(TipoModalidadeDaoService);
  private readonly programaService = inject(ProgramaService);

  saving = false;
  carregandoRegramento = false;

  regramentoNome = '';
  private regramentoId = '';

  readonly agentePublicoQuery = this.fb.nonNullable.control('');
  sugestoesUsuarios: UsuarioSearchItem[] = [];
  private readonly subscriptions: Subscription[] = [];
  private selectedUsuario?: Usuario;
  unidades: Unidade[] = [];
  modalidades: TipoModalidade[] = [];

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

  ngOnInit(): void {
    this.subscriptions.push(
      this.agentePublicoQuery.valueChanges
        .pipe(
          debounceTime(250),
          distinctUntilChanged(),
          switchMap(term => this.buscarUsuarios(term))
        )
        .subscribe(items => (this.sugestoesUsuarios = items))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  voltar() {
    this.go.back();
  }

  selecionarUsuario(item: UsuarioSearchItem) {
    this.form.controls.usuario_id.setValue(item.id);
    this.agentePublicoQuery.setValue(item.nome, { emitEvent: false });
    this.sugestoesUsuarios = [];
    void this.carregarUsuarioDetalhado(item.id);
  }

  limparUsuarioSelecionado() {
    this.selectedUsuario = undefined;
    this.unidades = [];
    this.regramentoId = '';
    this.regramentoNome = '';
    this.form.controls.usuario_id.setValue('');
    this.form.controls.unidade_id.setValue('');
    this.form.controls.tipo_modalidade_id.setValue('');
  }

  onUnidadeChange() {
    const unidadeId = this.form.controls.unidade_id.value;
    if (unidadeId) {
      void this.carregarRegramento(unidadeId);
    }
  }

  salvar() {
    if (this.saving) return;
    if (this.form.invalid) return;
    if (!this.regramentoId) return;

    const payload = {
      usuario_id: this.form.controls.usuario_id.value,
      unidade_id: this.form.controls.unidade_id.value,
      programa_id: this.regramentoId,
      data_inicio: this.form.controls.data_inicio.value,
      data_fim: this.form.controls.data_fim.value,
      tipo_modalidade_id: this.form.controls.tipo_modalidade_id.value
    };

    this.saving = true;
    this.api
      .create(payload)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => this.go.back());
  }

  private async carregarRegramento(unidadeId: string) {
    if (this.carregandoRegramento) return;
    this.carregandoRegramento = true;
    try {
      const programas = await this.programaDao
        .query({
          where: [['todosUnidadeExecutora', '==', unidadeId]],
          join: this.joinPrograma,
          orderBy: [['unidade.path', 'desc']]
        })
        .asPromise();

      const programaVigente = this.programaService.selecionaProgramaVigente(programas);
      const programa = programaVigente ?? programas[0];
      this.regramentoId = programa?.id ?? '';
      this.regramentoNome = programa?.nome ?? '';
    } finally {
      this.carregandoRegramento = false;
    }
  }

  private buscarUsuarios(term: string) {
    const value = term.trim();
    if (value.length < 3) return of([] as UsuarioSearchItem[]);
    return this.http
      .get<any>(`${this.gb.servidorURL}/api/v2/usuario`, { params: { nome_matricula: value } })
      .pipe(
        map((response: any) => {
          const items = Array.isArray(response?.data) ? response.data : [];
          return items.map((u: any) => ({
            id: String(u?.id ?? ''),
            nome: String(u?.nome ?? ''),
            matricula: u?.matricula ? String(u.matricula) : null
          }));
        })
      );
  }

  private async carregarUsuarioDetalhado(usuarioId: string) {
    const usuario = await this.usuarioDao.getById(usuarioId, ['lotacao', 'unidades', 'areas_trabalho.atribuicoes']);
    if (!usuario) return;
    this.selectedUsuario = usuario;
    this.unidades = usuario.unidades ?? [];

    const unidadeId = usuario.lotacao?.unidade_id;
    if (typeof unidadeId === 'string' && unidadeId.length) {
      const isValid = this.unidades.some(u => u.id === unidadeId);
      if (isValid) {
        this.form.controls.unidade_id.setValue(unidadeId);
        await this.carregarRegramento(unidadeId);
      }
    }

    const where: [string, string, any][] = usuario.pedagio ? [['exige_pedagio', '==', 0]] : [];
    this.modalidades = await this.tipoModalidadeDao.query({ where, join: ['modalidadeSiape'] }).asPromise();

    const tipoModalidadeId = usuario.tipo_modalidade_id;
    if (typeof tipoModalidadeId === 'string' && tipoModalidadeId.length) {
      const isValid = this.modalidades.some(m => m.id === tipoModalidadeId);
      if (isValid) {
        this.form.controls.tipo_modalidade_id.setValue(tipoModalidadeId);
        return;
      }
    }

    if (this.modalidades.length > 0) {
      this.form.controls.tipo_modalidade_id.setValue(this.modalidades[0].id);
    }
  }

  get podeSalvar(): boolean {
    return !this.form.invalid && !!this.regramentoId && !this.saving;
  }
}
