import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { ProjetoAlocacao } from 'src/app/models/projeto-alocacao.model';
import { ProjetoTarefa } from 'src/app/models/projeto-tarefa.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'projeto-form-alocacoes',
  templateUrl: './projeto-form-alocacoes.component.html',
  styleUrls: ['./projeto-form-alocacoes.component.scss']
})
export class ProjetoFormAlocacoesComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Projeto | undefined) { super.entity = value; } get entity(): Projeto | undefined { return super.entity; }

  constructor(public injector: Injector) {
    super(injector);
    this.form = this.fh.FormBuilder({
      nome_recurso: {default: ""},
      regra: {default: ""},
      decricao_recurso: {default: ""},
      qtd_recurso: {default: 0}
    }, this.cdRef, this.validate);
  }

  public get items(): ProjetoAlocacao[] {
    if(!this.gridControl.value) this.gridControl.setValue(new Projeto());
    if(!this.gridControl.value.alocacoes) this.gridControl.value.alocacoes = [];
    return this.gridControl.value.alocacoes;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
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

}
