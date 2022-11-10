import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { ProjetoFase } from 'src/app/models/projeto-fase.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'projeto-form-fases',
  templateUrl: './projeto-form-fases.component.html',
  styleUrls: ['./projeto-form-fases.component.scss']
})
export class ProjetoFormFasesComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Projeto | undefined) { super.entity = value; } get entity(): Projeto | undefined { return super.entity; }

  public get items(): ProjetoFase[] {
    if(!this.gridControl.value) this.gridControl.setValue(new Projeto());
    if(!this.gridControl.value.fases) this.gridControl.value.fases = [];
    return this.gridControl.value.fases;
  }

  constructor(public injector: Injector) {
    super(injector);
    this.form = this.fh.FormBuilder({
      Nome: {default: ""},
      descricao: {default: ""},
      cor: {default: ""},
      inicio: {default: null},
      termino: {default: null}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(["nome", "cor"].includes(controlName) && !control.value?.length) {
      return "Obrigatorio";
    } else if(controlName == "termino" && this.util.isDataValid(control.value) && this.util.isDataValid(this.form?.controls.inicio.value) && (this.form!.controls.inicio.value.getTime() > control.value.getTime())) {
      return "Início mario que o termino";
    }

    return result;
  }

  public loadData(entity: IIndexable, form?: FormGroup) {
    super.loadData(entity, form);
  }

  public initializeData(form?: FormGroup) {
    this.entity = new Projeto();
    this.loadData(this.entity, this.form);
  }

  public async saveData(form?: IIndexable) {
    return new Promise<Projeto>((resolve, reject) => {
      resolve(this.entity!);
    });
  }

  public async addFase() {
    return {
      id: this.dao!.generateUuid(),
      inicio: null,
      termino: null,
      cor: "",
      nome: "",
      descricao: "",
      _status: "ADD"
    } as IIndexable;
  }

  public async loadFase(form: FormGroup, row: any) {
    form.controls.nome.setValue(row.nome);
    form.controls.descricao.setValue(row.descricao);
    form.controls.cor.setValue(row.cor);
    form.controls.inicio.setValue(row.inicio);
    form.controls.termino.setValue(row.termino);
  }

  public async removeFase(row: any) {
    return true;
  }

  public async saveFase(form: FormGroup, row: any) {
    let result = undefined;
    if(this.form?.valid) {
      row.nome = form.controls.nome.value;
      row.descricao = form.controls.descricao.value;
      row.cor = form.controls.cor.value;
      row.inicio = form.controls.inicio.value;
      row.inicio = form.controls.termino.value;
      result = row;
    }
    return result;
  }

}

