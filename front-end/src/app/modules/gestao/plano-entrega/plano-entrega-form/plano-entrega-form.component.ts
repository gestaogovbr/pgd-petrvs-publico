import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';


@Component({
  selector: 'app-plano-entrega-form',
  templateUrl: './plano-entrega-form.component.html',
  styleUrls: ['./plano-entrega-form.component.scss']
})

export class PlanoEntregaFormComponent extends PageFormBase<PlanoEntrega, PlanoEntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public form: FormGroup;

  constructor(public injector: Injector) {
    super(injector, PlanoEntrega, PlanoEntregaDaoService);
    this.join = [];
    this.form = this.fh.FormBuilder({
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

/*     if(['usuario_id', 'unidade_id', 'programa_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }  */
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    return undefined;
  };

  public async loadData(entity: PlanoEntrega, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.cdRef.detectChanges();
  }

  public async initializeData(form: FormGroup) {
    this.loadData(this.entity!, this.form!);
  }

  public async saveData(form: IIndexable): Promise<PlanoEntrega | boolean> {

    return true;
  }

  public titleEdit = (entity: PlanoEntrega): string => {
    return "Editando " ;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    return result;
  }

}

