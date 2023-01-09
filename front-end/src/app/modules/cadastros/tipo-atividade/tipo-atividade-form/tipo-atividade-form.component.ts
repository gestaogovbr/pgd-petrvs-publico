import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-tipo-atividade-form',
  templateUrl: './tipo-atividade-form.component.html',
  styleUrls: ['./tipo-atividade-form.component.scss']
})

export class TipoAtividadeFormComponent extends PageFormBase<TipoAtividade, TipoAtividadeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;


  constructor(public injector: Injector) {
    super(injector, TipoAtividade, TipoAtividadeDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      icone: {default: ""},
      cor: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome', 'icone'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: TipoAtividade, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new TipoAtividade());
  }


  public saveData(form: IIndexable): Promise<TipoAtividade> {
    return new Promise<TipoAtividade>((resolve, reject) => {
      const tipoAtividade = this.util.fill(new TipoAtividade(), this.entity!);
      resolve(this.util.fillForm(tipoAtividade, this.form!.value));
    });
  }


  public titleEdit = (entity: TipoAtividade): string => {
    return "Editando " + (entity?.nome || "");
  }
}

