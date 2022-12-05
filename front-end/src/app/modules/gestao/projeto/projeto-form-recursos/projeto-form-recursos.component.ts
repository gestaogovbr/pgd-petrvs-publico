import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { MaterialServicoDaoService } from 'src/app/dao/material-servico-dao.service';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { ProjetoFase } from 'src/app/models/projeto-fase.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { ProjetoService } from '../projeto.service';

@Component({
  selector: 'projeto-form-recursos',
  templateUrl: './projeto-form-recursos.component.html',
  styleUrls: ['./projeto-form-recursos.component.scss']
})
export class ProjetoFormRecursosComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild("usuario", { static: false }) public usuario?: InputSearchComponent;
  @ViewChild("unidade", { static: false }) public unidade?: InputSearchComponent;
  @ViewChild("materialServico", { static: false }) public materialServico?: InputSearchComponent;
  @ViewChild("tipoRecurso", { static: false }) public tipoRecurso?: InputSelectComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Projeto | undefined) { super.entity = value; } get entity(): Projeto | undefined { return super.entity; }

  public get items(): ProjetoFase[] {
    if(!this.gridControl.value) this.gridControl.setValue(new Projeto());
    if(!this.gridControl.value.recursos) this.gridControl.value.recursos = [];
    return this.gridControl.value.recursos;
  }

  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public materialServicoDao: MaterialServicoDaoService;
  public projetoService: ProjetoService;

  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<ProjetoDaoService>(ProjetoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.materialServicoDao = injector.get<MaterialServicoDaoService>(MaterialServicoDaoService);
    this.projetoService = injector.get<ProjetoService>(ProjetoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      tipo: {default: "MATERIAL"},
      unidade_medida: {default: "UNIDADE"},
      material_servico_id: {default: null},
      usuario_id: {default: null},
      unidade_id: {default: null},
      valor: {default: 0}
    }, this.cdRef, this.validate);
    this.groupBy = [{field: "tipo", label: "Tipo"}];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    const tipo = this.form?.controls.tipo.value;
    if(tipo == "HUMANO" && controlName == "usuario_id" && !control.value?.length) return "Obrigatório";
    if(tipo == "DEPARTAMENTO" && controlName == "unidade_id" && !control.value?.length) return "Obrigatório";
    if(controlName == "material_servico_id" && this.materialServico?.selectedItem && this.materialServico?.selectedItem!.entity.tipo != tipo) return "Tipo diferente";
    return null;
  }

  public loadData(entity: IIndexable, form?: FormGroup) {
    super.loadData(entity, form);
  }

  public initializeData(form?: FormGroup) {
    this.entity = new Projeto();
    this.loadData(this.entity, this.form);
  }

  public async saveData(form?: IIndexable) {
    await this.grid?.confirm();
    return this.entity!;
  }

  public onTipoRecursoChange() {
    this.cdRef.detectChanges();
  }

  public isHumanoDepartamento(tipo: string | undefined, tipos: string[] = ['HUMANO', 'DEPARTAMENTO']): boolean {
    return tipos.includes(tipo || '');
  }

  public isMaterialServico(tipo: string | undefined, tipos: string[] = ['MATERIAL', 'SERVICO']): boolean {
    return tipos.includes(tipo || '');
  }

  public async addRecurso() {
    return {
      id: "NEW",
      nome: "",
      tipo: "MATERIAL",
      unidade_medida: "UNIDADE",
      material_servico_id: null,
      usuario_id: null,
      unidade_id: null,
      valor: 0
    } as IIndexable;
  }

  public async loadRecurso(form: FormGroup, row: any) {
    form.controls.nome.setValue(row.nome);
    form.controls.tipo.setValue(row.tipo);
    form.controls.unidade_medida.setValue(row.unidade_medida);
    form.controls.material_servico_id.setValue(row.material_servico_id);
    form.controls.usuario_id.setValue(row.usuario_id);
    form.controls.unidade_id.setValue(row.unidade_id);
    form.controls.valor.setValue(row.valor);
    this.cdRef.detectChanges();
  }

  public async removeRecurso(row: any) {
    return true;
  }

  public async saveRecurso(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.nome = form.controls.nome.value;
      row.tipo = form.controls.tipo.value;
      row.unidade_medida = form.controls.unidade_medida.value;
      row.material_servico_id = ["MATERIAL", "SERVICO"].includes(form.controls.tipo.value) ? form.controls.material_servico_id.value : null;
      row.usuario_id = form.controls.tipo.value == "HUMANO" ? form.controls.usuario_id.value : null;
      row.unidade_id = form.controls.tipo.value == "DEPARTAMENTO" ? form.controls.unidade_id.value : null;
      row.valor = form.controls.valor.value;
      row.usuario = this.usuario?.selectedItem?.entity;
      row.unidade = this.unidade?.selectedItem?.entity;
      row.material_servico = this.materialServico?.selectedItem?.entity;
      result = row;
      this.cdRef.detectChanges();
    }
    return result;
  }

}

