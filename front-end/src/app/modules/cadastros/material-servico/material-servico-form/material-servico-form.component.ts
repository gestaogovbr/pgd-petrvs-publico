import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { MaterialServicoDaoService } from 'src/app/dao/material-servico-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { MaterialServico } from 'src/app/models/material-servico.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-material-servico-form',
  templateUrl: './material-servico-form.component.html',
  styleUrls: ['./material-servico-form.component.scss']
})

export class MaterialServicoFormComponent extends PageFormBase<MaterialServico, MaterialServicoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, MaterialServico, MaterialServicoDaoService);
    this.form = this.fh.FormBuilder({
      'tipo': {default: "MATERIAL"},
      'codigo': {default: null},
      'referencia': {default: null},
      'descricao': {default: ""},
      'unidade': {default: "UNIDADE"}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string): string | null => {
    let result = null;

    if(['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: MaterialServico, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new MaterialServico();
    this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<MaterialServico> {
    return new Promise<MaterialServico>((resolve, reject) => {
      const materialServico = this.util.fill(new MaterialServico(), this.entity!);
      resolve(this.util.fillForm(materialServico, this.form!.value));
    });
  }

  public titleEdit = (entity: MaterialServico): string => {
    return "Editando " + (entity?.descricao || "");
  }
}

