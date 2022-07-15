import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Cidade } from 'src/app/models/cidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.scss']
})
export class CidadeFormComponent extends PageFormBase<Cidade, CidadeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  

  constructor(public injector: Injector) {
    super(injector, Cidade, CidadeDaoService);

    this.form = this.fh.FormBuilder({
      codigo_ibge: {default: ""},
      nome: {default: ""},
      tipo: {default: ""},
      uf: {default: ""},
      timezone: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['codigo_ibge', 'nome', 'uf'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }  else if(['timezone'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    }
    return result;
  }

  public loadData(entity: Cidade, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Cidade());
  }

  public saveData(form: IIndexable): Promise<Cidade> {
    return new Promise<Cidade>((resolve, reject) => {
      const cidade = this.util.fill(new Cidade(), this.entity!);
      resolve(this.util.fillForm(cidade, this.form!.value));
    });
  }

  public titleEdit = (entity: Cidade): string => {
    return "Editando "+ (entity?.nome || "");
  }
}

