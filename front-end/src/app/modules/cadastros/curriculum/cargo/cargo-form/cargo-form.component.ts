import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { Cargo } from 'src/app/models/cargo.model';
import { CargoDaoService } from 'src/app/dao/cargo-dao.service';

@Component({
  selector: 'cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.scss']
})
export class CargoFormComponent extends PageFormBase<Cargo, CargoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  
  public titulos: LookupItem[] = [];
  //public tipoCursoDao ?: TipoCursoDaoService;

  constructor(public injector: Injector) {
    super(injector, Cargo, CargoDaoService);
   
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      nivel: {default: ""},
      cbo: {default: ""},
      siape: {default: ""},
      descricao: {default: ""},
      ativo: {default: true},
      efetivo: {default: true},
           
    }, this.cdRef, this.validate);
  }

  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: Cargo, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Cargo());
  }


  public saveData(form: IIndexable): Promise<Cargo> {
    return new Promise<Cargo>((resolve, reject) => {
      const cargo = this.util.fill(new Cargo(), this.entity!);
      resolve(this.util.fillForm(cargo, this.form!.value));
    });
  }


  public titleEdit = (entity: Cargo): string => {
    return "Editando " + (entity?.nome || "");
  }
}


