import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AfastamentoDaoService } from 'src/app/dao/afastamento-dao.service';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { Change } from 'src/app/models/change.model';
import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-change-form',
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.scss']
})
export class ChangeFormComponent extends PageFormBase<Change, ChangeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  
  public objeto?: {'label': string, 'value': string};
 
  constructor(public injector: Injector) {
    super(injector, Change, ChangeDaoService);
    this.form = this.fh.FormBuilder({
      responsavel: {default: ""},
      user_id: {default: ""},
      date_time: {default: null},
      table_name: {default: ""},
      type: {default: ""},
      row_id: {default: ""},
      delta: {default: ""}
    }, this.cdRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    let entity = this.metadata?.entity;
    let entity_id = this.metadata?.entity_id;
    let campo = entity ? entity.campo : '';
    this.objeto = {
      label: 'ID do registro alterado',
      value: entity_id
    };
    if(entity && campo) {
      let dao = entity.dao;
      dao.getById(entity_id).then((c: any) => {
        this.objeto = {
          label: entity.label + ': ' + campo,
          value: c[campo] ? c[campo] : entity_id
        };
      });
      this.cdRef.detectChanges();
    }
  }

  public loadData(entity: Change, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.form!.controls.row_id.setValue(this.objeto!.value);
    this.cdRef.detectChanges();
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Change());
  }

  public saveData(form: IIndexable): Promise<Change> {
    return new Promise<Change>((resolve, reject) => {
      const change = this.util.fill(new Change(), this.entity!);
      resolve(this.util.fillForm(change, this.form!.value));
    });
  }

}
