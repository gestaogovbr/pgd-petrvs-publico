import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { ProgramaParticipanteDaoService } from 'src/app/dao/programa-participante-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ProgramaParticipante } from 'src/app/models/programa-participante.model';
import { Programa } from 'src/app/models/programa.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-programa-participantes',
  templateUrl: './programa-participantes.component.html',
  styleUrls: ['./programa-participantes.component.scss']
})
export class ProgramaParticipantesComponent extends PageListBase<ProgramaParticipante, ProgramaParticipanteDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild("programaSearch", { static: false }) public programaSearch?: InputSearchComponent;
  @ViewChild("usuario", { static: false }) public usuario?: InputSearchComponent;

  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public programaDao: ProgramaDaoService;
  public form: FormGroup;
  public multiselectMenu: ToolbarButton[] = [];
  public programa: Programa | null = null;
  public BOTAO_HABILITAR: ToolbarButton = { label: "Habilitar", icon: "bi bi-person-check-fill", color: "btn-outline-success", onClick: this.habilitaParticipante.bind(this) };
  public BOTAO_DESABILITAR: ToolbarButton = { label: "Desabilitar", icon: "bi bi-person-x-fill", color: "btn-outline-danger", onClick: this.desabilitaParticipante.bind(this) };

  constructor(public injector: Injector) {
    super(injector, ProgramaParticipante, ProgramaParticipanteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    /* Inicializações */
    this.code = "MOD_PRGT_PART";
    this.filter = this.fh.FormBuilder({
      programa_id: { default: this.programa?.id },
      unidade_id: { default: undefined },
      nome_usuario: { default: "" },
      todos: { default: false },
    }, this.cdRef, this.validate);
    this.form = this.fh.FormBuilder({
      usuario_id: { default: undefined },
      habilitado: { default: true },
    }, this.cdRef, this.validate);
    if(this.auth.hasPermissionTo('MOD_PRGT_PART_HAB')) this.multiselectMenu.push({
      icon: "bi bi-person-check-fill",
      label: "Habilitar",
      color: "btn-outline-success",
      onClick: this.habilitarParticipantes.bind(this)
    });
    if(this.auth.hasPermissionTo('MOD_PRGT_PART_DESAB')) this.multiselectMenu.push({
      icon: "bi bi-person-x-fill",
      label: "Desabilitar",
      color: "btn-outline-danger",
      onClick: this.desabilitarParticipantes.bind(this)
    });
    this.join = ["usuario.lotacao.unidade:id,sigla","usuario.planos_trabalho:id,status"];
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if(this.auth.hasPermissionTo('MOD_PRGT_PART_HAB') && !row.habilitado) result.push(this.BOTAO_HABILITAR);
    if(this.auth.hasPermissionTo('MOD_PRGT_PART_DESAB') && row.habilitado) result.push(this.BOTAO_DESABILITAR);
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['programa_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
    (async () => {
      this.loading = true;
      try {
        this.programa = this.metadata?.programa;
        if(!this.programa) await this.programaDao.query({where: [['vigentesUnidadeExecutora', "==", this.auth.unidade!.id]]}).asPromise().then(programas => {
          this.programa = programas[0];
        });
        await this.programaSearch?.loadSearch(this.programa);
        if(this.programa) this.grid!.reloadFilter();
      } finally {
        this.loading = false;
      }
      //this.programaSearch?.loadSearch(this.programa);
    })();
  }

  public filterClear(filter: FormGroup<any>): void {
    filter.controls.unidade_id.setValue(undefined);
    filter.controls.nome_usuario.setValue('');
    filter.controls.todos.setValue(false);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    result.push(["todos", '==', this.filter?.controls.todos.value]);
    result.push(["programa_id", "==", this.programa?.id]);
    if (form.nome_usuario?.length) result.push(["usuario.nome", "like", "%" + form.nome_usuario.trim().replace(" ", "%") + "%"]);
    if (form.unidade_id?.length) result.push(["usuario.lotacao.unidade.id", "==", form.unidade_id]);
    return result;
  }
  // todos = true => retorna todos os usuários vinculados ao programa selecionado, habilitados ou desabilitados.
  // todos = false => retorna apenas os usuários habilitados no programa selecionado

  // SE TODOS = FALSE
  // unidade_id = null => retorna os usuários vinculados ao programa selecionado, independentemente da sua unidade de lotação, e de acordo com a opção TODOS (só os habilitados, ou também os desabilitados)
  // unidade_id = alguma unidade => retorna apenas os usuários vinculados ao programa selecionado, lotados na unidade selecionada, e de acordo com a opção TODOS (só os habilitados, ou também os desabilitados)

  // SE TODOS = TRUE
  // unidade_id = null => retorna todos os usuários vinculados ao programa selecionado, habilitados ou desabilitados.
  // unidade_id = alguma unidade => retorna todos os usuários vinculados ao programa selecionado, habilitados ou desabilitados, e mais os usuários lotados na unidade selecionada e não habilitados

  public async addParticipante() {
    return new ProgramaParticipante({
      id: this.dao!.generateUuid(),
      usuario_id: "",
      _status: "ADD"
    });
  }

  public async loadParticipante(form: FormGroup, row: any) {
    const selected: ProgramaParticipante = row;
    this.form!.patchValue({
      usuario_id: selected?.usuario_id,
      habilitado: !!selected?.habilitado,
    });
    this.cdRef.detectChanges();
  }

  public async habilitaParticipante(row: any) {
    await this.dao!.habilitar([row.usuario.id], this.programa!.id, 1, false).then(resposta => {
      (this.grid?.query || this.query!).refreshId(row.id);
      this.cdRef.detectChanges();
    });
    return false;
  }

  public async desabilitaParticipante(row: any) {
    let desabilitar = await this.dialog.confirm("Desabilitar ?", "Deseja DESABILITAR " + this.lex.translate("o servidor") + " - " + (row.usuario.nome as string).toUpperCase() + " - " + this.lex.translate("do programa") + " - " + (this.programa?.nome as string).toUpperCase() + " ?");
    if (desabilitar) {
      let plano_trabalho_ativo: boolean = !!row.usuario.planos_trabalho.length;
      let suspender: boolean = false;
      if(plano_trabalho_ativo) {
        suspender = await this.dialog.confirm("ATENÇÃO", this.lex.translate("O usuário") + " possui " + this.lex.translate("Plano de Trabalho") + " ativo vinculado a " + this.lex.translate("este Programa") + "!" + " Deseja continuar com a desabilitação, suspendendo o seu " + this.lex.translate("Plano de Trabalho" + " ?"));
      }
      if (!plano_trabalho_ativo || suspender) {
        await this.dao!.habilitar([row.usuario.id], this.programa!.id, 0, true).then(resposta => {
          (this.grid?.query || this.query!).refreshId(row.id);
          this.cdRef.detectChanges();
        });
      }
    }
  }

  public async habilitarParticipantes() {
    if (!this.grid!.multiselectedCount) {
      this.dialog.alert("Selecione", "Nenhum participante selecionado para a habilitação");
    } else {
      const self = this;
      this.dialog.confirm("Habilitar Participantes ?", "Confirma a habilitação de todos esses participantes?").then(habilitar_todos => {
        if (habilitar_todos) {
          const idsUsuarios = Object.values(this.grid!.multiselected).map(x => x.usuario_id);
          this.dao!.habilitar(idsUsuarios, this.programa!.id, 1, false).then(function () {
            self.dialog.topAlert("Participantes habilitados com sucesso!", 5000);
            (self.grid?.query || self.query!).refresh();
            self.cdRef.detectChanges();
          }).catch(function (error) {
            self.dialog.alert("Erro", "Erro ao habilitar os participantes: " + error?.message ? error?.message : error);
          });
        }
      });
    }
  }

  public async desabilitarParticipantes() {
    let desabilitar = await this.dialog.confirm("Desabilitar ?", "Deseja DESABILITAR, " + this.lex.translate("do programa") + " - " + (this.programa?.nome as string).toUpperCase() + " - todos " + this.lex.translate("os usuários") + " selecionados ?");
    let idsProgramasParticipantes = Object.keys(this.grid!.multiselected);
    if (desabilitar) {
      let qde_usuarios_com_plano_trabalho_ativo: number = await this.dao!.quantidadesPlanosTrabalhosAtivo(idsProgramasParticipantes);//(this.grid!.multiselected as ProgramaParticipante[]).filter(pp => pp.usuario?.planos_trabalho?.length).length;
      let suspender: boolean = false;
      if(!!qde_usuarios_com_plano_trabalho_ativo) {
        suspender = await this.dialog.confirm("ATENÇÃO", "Há " + qde_usuarios_com_plano_trabalho_ativo + this.lex.translate(qde_usuarios_com_plano_trabalho_ativo == 1 ? " usuário" : " usuários") + " com " + this.lex.translate("Plano de Trabalho") + " ativo vinculado a " + this.lex.translate("este Programa") + "!" + " Deseja continuar com a desabilitação, suspendendo " + (qde_usuarios_com_plano_trabalho_ativo == 1 ? "o seu " : "todos ") + this.lex.translate(qde_usuarios_com_plano_trabalho_ativo == 1 ? "Plano de Trabalho" : "os Planos de Trabalho") + " ?");
      }
      if (!qde_usuarios_com_plano_trabalho_ativo || suspender) {
        const idsUsuarios = Object.values(this.grid!.multiselected).map(x => x.usuario_id);
        await this.dao!.habilitar(idsUsuarios, this.programa!.id, 0, true).then(resposta => {
          (this.grid?.query || this.query!).refresh();
          this.cdRef.detectChanges();
        });
      }
    }
  }

  public async saveParticipante(form: FormGroup, item: ProgramaParticipante) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if (this.form!.valid) {
      item.usuario_id = form.controls.usuario_id.value;
      item.habilitado = !!form.controls.habilitado.value;
      item.usuario = this.usuario?.selectedEntity as Usuario;
      item.programa_id = this.programa!.id;
      this.submitting = true;
      try {
        result = await this.dao!.save(item);
        item.id = result.id;
        await this.dao!.notificar(item);
      } catch (error: any) {
        this.error(error.message ? error.message : error);
      } finally {
        this.submitting = false;
      }
      this.cdRef.detectChanges();
    }
    return result;
  }

  public onProgramaChange(){
    this.programa = this.programaSearch?.selectedItem?.entity;
    if(this.programa) this.grid?.reloadFilter();
  }
}

