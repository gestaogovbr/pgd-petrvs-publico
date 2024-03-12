import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { CapacidadeTecnica } from 'src/app/models/capacidade-tecnica.model';
import { CapacidadeTecnicaDaoService } from 'src/app/dao/capacidade-tecnica-dao.service';
import { AreaTematicaDaoService } from 'src/app/dao/area-tematica-dao.service';

@Component({
  selector: 'capacidade-tecnica-form',
  templateUrl: './capacidade-tecnica-form.component.html',
  styleUrls: ['./capacidade-tecnica-form.component.scss']
})
export class CapacidadeTecnicaFormComponent extends PageFormBase<CapacidadeTecnica, CapacidadeTecnicaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public areaTematicaDao?: AreaTematicaDaoService;

  constructor(public injector: Injector) {
    super(injector, CapacidadeTecnica, CapacidadeTecnicaDaoService);
    this.areaTematicaDao = injector.get<AreaTematicaDaoService>(AreaTematicaDaoService);
    this.form = this.fh.FormBuilder({
      area_tematica_id: { default: "" },
      nome: { default: "" },
      ativo: { default: true },
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome', 'area_tematica_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: CapacidadeTecnica, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new CapacidadeTecnica());
  }

  public saveData(form: IIndexable): Promise<CapacidadeTecnica> {
    return new Promise<CapacidadeTecnica>((resolve, reject) => {
      const capacidadeTecnica = this.util.fill(new CapacidadeTecnica(), this.entity!);
      resolve(this.util.fillForm(capacidadeTecnica, this.form!.value));
    });
  }

  public titleEdit = (entity: CapacidadeTecnica): string => {
    return "Editando " + (entity?.nome || "");
  }
}


