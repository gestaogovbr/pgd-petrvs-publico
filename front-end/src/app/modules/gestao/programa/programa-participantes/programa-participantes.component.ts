import { Component, Injector, ViewChild } from '@angular/core';
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
  public programaId: string = "";
  public form: FormGroup;

  constructor(public injector: Injector) {
    super(injector, ProgramaParticipante, ProgramaParticipanteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    /* Inicializações */
    this.code = "MOD_PRGT_PART";
    this.filter = this.fh.FormBuilder({
      unidade_id: { default: undefined },
      nome: { default: "" }
    });
    this.form = this.fh.FormBuilder({
      usuario_id: { default: undefined },
      habilitado: { default: true }
    });
    this.join = ["usuario:id,nome,apelido,url_foto"]
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.programaId = this.urlParams?.get('id') || "";
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.unidade_id.setValue(undefined);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    result.push(["programa_id", "==", this.programaId]);
    if (form.nome?.length) result.push(["usuario.nome", "like", "%" + form.nome + "%"]);
    if (form.unidade_id?.length) result.push(["usuario.lotacoes.unidade.id", "==", form.unidade_id]);

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
      usuario_id: selected?.usuario_id || "",
      habilitado: !!selected?.habilitado
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

}

