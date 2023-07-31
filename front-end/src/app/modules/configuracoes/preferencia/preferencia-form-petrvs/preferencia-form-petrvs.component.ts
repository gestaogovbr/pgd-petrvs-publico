import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { Entidade } from 'src/app/models/entidade.model';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';

@Component({
  selector: 'preferencia-form-petrvs',
  templateUrl: './preferencia-form-petrvs.component.html',
  styleUrls: ['./preferencia-form-petrvs.component.scss']
})
export class PreferenciaFormPetrvsComponent extends PageFormBase<Entidade, EntidadeDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @Input() panel?: string;

  public form: FormGroup;
  public carregando: boolean = false;

  constructor(public injector: Injector) {
    super(injector, Entidade, EntidadeDaoService);
    this.form = this.fh.FormBuilder({
    }, this.cdRef, this.validate);
  }

  public get isPanel(): boolean {
    return this.panel != undefined;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public async loadData(entity: Entidade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    this.carregando = true;
    try {
      this.entity = new Entidade();
      await this.loadData(this.entity, form);
    } finally {
      this.carregando = false;
    }
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(!this.isPanel);
    });
  }

  public titleEdit = (entity: Entidade): string => {
    return "Editando " + this.lex.translate("Preferência") + ' ' + this.lex.translate("da Entidade") + ': ' + (entity?.nome || "");
  }
}
