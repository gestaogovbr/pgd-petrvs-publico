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
  //public programaParticipanteService: ProgramaParticipanteDaoService;
  public form: FormGroup;
  public multiselectAllFields: string[] = ["usuario_id", "habilitado"];
  public multiselectMenu: ToolbarButton[];
  public programa: Programa | null = null;

  constructor(public injector: Injector) {
    super(injector, ProgramaParticipante, ProgramaParticipanteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    //this.programaParticipanteService = injector.get<ProgramaParticipanteDaoService>(ProgramaParticipanteDaoService);
    /* Inicializações */
    this.code = "MOD_PRGT_PART";
    this.filter = this.fh.FormBuilder({
      programa_id: { default: undefined },
      unidade_id: { default: undefined },
      nome_usuario: { default: "" },
      todos: { default: false },
    }, this.cdRef, this.validate);
    this.form = this.fh.FormBuilder({
      usuario_id: { default: undefined },
      habilitado: { default: true },
    }, this.cdRef, this.validate);
    this.multiselectMenu = !this.auth.hasPermissionTo('MOD_PRGT_PART_INCL') ? [] : [
      {
        icon: "bi bi-check",
        label: "Habilitar",
        onClick: this.habilitarParticipantes.bind(this)
      }
    ];
    //this.join = ["usuario:id,nome,apelido,url_foto", "usuario.lotacao:id,nome,unidade_id","usuario.planos_trabalho"];
    this.join = ["usuario:id"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['programa_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    this.grid?.items.forEach( usuario => {
      if (usuario.usuario_id == this.usuario?.selectedValue) {
        result = "Usuário já é participante deste programa";
      }
    });
    return result;
  }

  public async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.programa = this.metadata?.programa;
    if(!this.programa) await this.programaDao.query({where: [['vigentesUnidadeExecutora', "==", this.auth.unidade!.id]]}).asPromise().then( programas => {
      this.programa = programas[0];
    });
    await this.programaSearch?.loadSearch(this.programa);
    this.grid!.reloadFilter();
  }

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.programaSearch?.loadSearch(this.programa);
    this.grid!.reloadFilter();
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
  // unidade_id = null => retorna os usuários habilitados no programa selecionado, independentemente da sua unidade de lotação
  // unidade_id = alguma unidade => retorna apenas os usuários habilitados no programa selecionado, e lotados na unidade selecionada

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

  public async removeParticipante(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja remover o participante?");
    if (confirm) {
      await this.dao!.delete(row);
      return true;
    } else {
      return false;
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

  public habilitarParticipantes() {
    if (!this.grid!.multiselectedCount) {
      this.dialog.alert("Selecione", "Nenhum participante selecionado para a habilitção");
    } else {
      const self = this;
      this.dialog.confirm("Habilitar Participantes ?", "Deseja realmente habilitar os participantes?").then(confirm => {
        if (confirm) {
          this.dao!.habilitar(Object.keys(this.grid!.multiselected), this.programa!.id, 1).then(function () {
            self.dialog.alert("Sucesso", "Habilitado com sucesso!");
          }).catch(function (error) {
            self.dialog.alert("Erro", "Erro ao habilitar os participantes: " + error?.message ? error?.message : error);
          });
        }
      });
    }
  }

  public onHabilitadoChange(row: ProgramaParticipante, habilitado: boolean) {
    console.log(habilitado);
    if (!habilitado && row.usuario?.planos_trabalho?.length){
      this.dialog.alert("Atenção", "Usuário com " + row.usuario?.planos_trabalho?.length + " plano(s) de trabalho ativo.");
    }
  }

  public onProgramaChange(){
    this.programa = this.programaSearch?.selectedItem?.entity;
    if(this.programa && this.grid?.items && this.programa.id != this.grid?.items[0]?.programa_id) this.grid?.reloadFilter();
  }
}

