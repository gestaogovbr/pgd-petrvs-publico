import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { AreaTematica } from 'src/app/models/area-tematica.model';
import { AreaTematicaDaoService } from 'src/app/dao/area-tematica-dao.service';

@Component({
  selector: 'app-area-tematica-form',
  templateUrl: './area-tematica-form.component.html',
  styleUrls: ['./area-tematica-form.component.scss']
})
export class AreaTematicaFormComponent extends PageFormBase<AreaTematica, AreaTematicaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;


  constructor(public injector: Injector) {
    super(injector, AreaTematica, AreaTematicaDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      ativo:{default: true},
      
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: AreaTematica, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new AreaTematica());
  }


  public saveData(form: IIndexable): Promise<AreaTematica> {
    return new Promise<AreaTematica>((resolve, reject) => {
      const areaTematica = this.util.fill(new AreaTematica(), this.entity!);
      resolve(this.util.fillForm(areaTematica, this.form!.value));
    });
  }


  public titleEdit = (entity: AreaTematica): string => {
    return "Editando " + (entity?.nome || "");
  }
}


