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
  @ViewChild("usuario", { static: false }) public usuario?: InputSearchComponent;

  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public programaDao: ProgramaDaoService;
  public programaParticipanteService: ProgramaParticipanteDaoService;
  public programaId: string = "";
  public form: FormGroup;
  public multiselectAllFields: string[] = ["usuario_id", "habilitado"];
  public multiselectMenu: ToolbarButton[];
  public programa: Programa | null = null;

  constructor(public injector: Injector) {
    super(injector, ProgramaParticipante, ProgramaParticipanteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.programaParticipanteService = injector.get<ProgramaParticipanteDaoService>(ProgramaParticipanteDaoService);
    /* Inicializações */
    this.code = "MOD_PRGT_PART";
    this.filter = this.fh.FormBuilder({
      unidade_id: { default: undefined },
      nome: { default: "" },
      todos: { default: false },
    });
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
    this.join = ["usuario:id,nome,apelido,url_foto", "usuario.lotacao:id,nome,unidade_id","usuario.planos_trabalho"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    this.grid?.items.forEach( usuario => {
      if (usuario.usuario_id == this.usuario?.selectedValue) {
        result = "Usuário já é participante deste programa";
      }
    });
    return result;
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.programaId = this.urlParams?.get('id') || "";
    this.programaDao.getById(this.programaId).then(p => this.programa = p);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if (this.filter?.controls.todos.value) {
      result.push([["todos", '==', true]]);
    } else {
      result.push(["programa_id", "==", this.programaId]);
      if (form.nome?.length) result.push(["usuario.nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      if (form.unidade_id?.length) result.push(["usuario.lotacao.unidade.id", "==", form.unidade_id]);
    }
    return result;
  }

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
      item.programa_id = this.programaId;
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
          this.dao!.habilitar(Object.keys(this.grid!.multiselected), this.programaId, 1).then(function () {
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
}

