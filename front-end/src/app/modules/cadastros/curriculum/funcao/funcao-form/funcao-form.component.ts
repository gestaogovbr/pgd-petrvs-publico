import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { Funcao } from 'src/app/models/funcao.model';
import { FuncaoDaoService } from 'src/app/dao/funcao-dao.service';


@Component({
  selector: 'funcao-form',
  templateUrl: './funcao-form.component.html',
  styleUrls: ['./funcao-form.component.scss']
})
export class FuncaoFormComponent extends PageFormBase<Funcao, FuncaoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  
  public titulos: LookupItem[] = [];
  //public tipoCursoDao ?: TipoCursoDaoService;

  constructor(public injector: Injector) {
    super(injector, Funcao, FuncaoDaoService);
   
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      nivel: {default: ""},
      siape: {default: ""},
      cbo: {default: ""},
      descricao: {default: ""},
      ativo: {default: true},
           
    }, this.cdRef, this.validate);
  }

  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: Funcao, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Funcao());
  }


  public saveData(form: IIndexable): Promise<Funcao> {
    return new Promise<Funcao>((resolve, reject) => {
      const funcao = this.util.fill(new Funcao(), this.entity!);
      resolve(this.util.fillForm(funcao, this.form!.value));
    });
  }


  public titleEdit = (entity: Funcao): string => {
    return "Editando " + (entity?.nome || "");
  }
}


