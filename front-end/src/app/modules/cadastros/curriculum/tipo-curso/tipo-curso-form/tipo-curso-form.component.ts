import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoCursoDaoService } from 'src/app/dao/tipo-curso-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoCurso } from 'src/app/models/tipo-curso.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NavigateResult } from 'src/app/services/navigate.service';

@Component({
  selector: 'tipo-curso-form',
  templateUrl: './tipo-curso-form.component.html',
  styleUrls: ['./tipo-curso-form.component.scss']
})
export class TipoCursoFormComponent extends PageFormBase<TipoCurso, TipoCursoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

 
  constructor(public injector: Injector) {
    super(injector, TipoCurso, TipoCursoDaoService);
    
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      labelnome: {default: ""},
      ativo: {default: true},
           
    }, this.cdRef, this.validate)
  }

  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['labelnome, ativo'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: TipoCurso, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new TipoCurso());
  }


  public saveData(form: IIndexable): Promise<TipoCurso> {
    return new Promise<TipoCurso>((resolve, reject) => {
      const curso = this.util.fill(new TipoCurso(), this.entity!);
      resolve(this.util.fillForm(curso, this.form!.value));
    });
  }


  public titleEdit = (entity: TipoCurso): string => {
    return "Editando " + (entity?.nome || "");
  }
}