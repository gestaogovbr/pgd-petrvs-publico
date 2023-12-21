import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { GrupoEspecializado } from 'src/app/models/grupo-especializado.model';
import { GrupoEspecializadoDaoService } from 'src/app/dao/grupo-especializado-dao.service';


@Component({
  selector: 'grupo-especializado-form',
  templateUrl: './grupo-especializado-form.component.html',
  styleUrls: ['./grupo-especializado-form.component.scss']
})
export class GrupoEspecializadoFormComponent extends PageFormBase<GrupoEspecializado, GrupoEspecializadoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  
  public titulos: LookupItem[] = [];
  //public tipoCursoDao ?: TipoCursoDaoService;

  constructor(public injector: Injector) {
    super(injector, GrupoEspecializado, GrupoEspecializadoDaoService);
   
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
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

  public loadData(entity: GrupoEspecializado, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new GrupoEspecializado());
  }


  public saveData(form: IIndexable): Promise<GrupoEspecializado> {
    return new Promise<GrupoEspecializado>((resolve, reject) => {
      const grupo = this.util.fill(new GrupoEspecializado(), this.entity!);
      resolve(this.util.fillForm(grupo, this.form!.value));
    });
  }


  public titleEdit = (entity: GrupoEspecializado): string => {
    return "Editando " + (entity?.nome || "");
  }
}


