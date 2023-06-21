import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { Cidade } from 'src/app/models/cidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { ProgramaParticipante } from 'src/app/models/programa-participante.model';
import { ProgramaParticipanteDaoService } from 'src/app/dao/programa-participante-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { Usuario } from 'src/app/models/usuario.model';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { IIndexable } from 'src/app/models/base.model';

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
  public programaParticipanteService: ProgramaParticipanteDaoService;
  public programaId: string = "";
  public form: FormGroup;
  public multiselectAllFields: string[] = ["usuario_id", "habilitado"];
  public multiselectMenu: ToolbarButton[];

  constructor(public injector: Injector) {
    super(injector, ProgramaParticipante, ProgramaParticipanteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.programaParticipanteService = injector.get<ProgramaParticipanteDaoService>(ProgramaParticipanteDaoService);
    /* Inicializações */
    this.code = "MOD_PRGT_PART";
    this.filter = this.fh.FormBuilder({
      unidade_id: { default: undefined },
      nome: { default: "" },
    });
    this.form = this.fh.FormBuilder({
      usuario_id: { default: undefined },
      habilitado: { default: true },
      todos: { default: false },
    });
    this.multiselectMenu = !this.auth.hasPermissionTo('MOD_PRGT_PART_INCL') ? [] : [
      {
        icon: "bi bi-check",
        label: "Habilitar",
        onClick: this.habilitarParticipantes.bind(this)
      }
    ];
    this.join = ["usuario:id,nome,apelido,url_foto", "usuario.lotacao:id,nome,unidade_id", ];
    this.groupBy = [{field: "usuario.lotacao.unidade.sigla", label: "Unidade"}];
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.programaId = this.urlParams?.get('id') || "";
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.unidade_id.setValue(undefined);
    filter.controls.todos.setValue(false);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    result.push(["programa_id", "==", this.programaId]);
    if (form.nome?.length) result.push(["usuario.nome", "like", "%" + form.nome + "%"]);
    if (form.unidade_id?.length) result.push(["usuario.lotacao.unidade.id", "==", form.unidade_id]);

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
      item.usuario = this.usuario?.searchObj as Usuario;
      item.programa_id = this.programaId;
      this.submitting = true;
      try {
        result = await this.dao!.save(item);
        item.id = result.id;
      } catch (error: any) {
        this.error(error.message ? error.message : error);
      } finally {
        this.submitting = false;
      }
      this.cdRef.detectChanges();
    }
    return result;
  }

  public async habilitarParticipantes() {
    if (!this.grid!.multiselectedCount) {
      this.dialog.alert("Selecione", "Nenhum participante selecionado para a habilitção");
    } else {
      if (this.form!.valid) {
        this.submitting = true;
        try {
          let result = await this.dao?.habilitar(Object.keys(this.grid!.multiselected), this.programaId, 1);
          if (result.error) throw new Error(result.error);
          this.dialog.alert("Sucesso", "Foram habilitados " + result.data + " " + this.lex.noun("participantes", true));
          this.grid!.enableMultiselect(false);
          this.refresh();
        } catch (error: any) {
          this.error(error.message ? error.message : error);
        } finally {
          this.submitting = false;
        }
      }
    }
  }

    public onTodosChange(event: Event) {
      // const todos = this.form!.controls.todos.value;
      // if((todos && !this.result?.length) || (!todos && this.result?.length)) {
      //   this.result = todos ? ["todos", '==', true] : [];
      //   this.grid!.reloadFilter();
      // }
    }

}

