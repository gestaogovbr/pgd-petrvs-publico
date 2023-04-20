import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Change } from 'src/app/models/change.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-change-form',
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.scss']
})
export class ChangeFormComponent extends PageFormBase<Change, ChangeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  
  public objeto?: {'label': string, 'value': string};
  public delta: any = {};
  public resultado: any[] = [];
  public valoresAtuais?: any[];
  public valoresAnteriores?: any[];
  public valoresAlterados: any[] = [];
 
  constructor(public injector: Injector) {
    super(injector, Change, ChangeDaoService);
    this.form = this.fh.FormBuilder({
      responsavel: {default: ""},
      user_id: {default: ""},
      date_time: {default: null},
      table_name: {default: ""},
      type: {default: ""},
      row_id: {default: ""}
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
    this.preparaFormulario(entity);
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

  public preparaFormulario(entity: Change){
    this.form!.controls.row_id.setValue(this.objeto!.value);
    this.delta = this.util.friendlyJson(entity.delta);
    if(this.delta.versao == '2.0'){
      this.valoresAtuais = this.util.endentarArray(this.util.objectToArray(this.delta['Valores atuais']));
      this.valoresAnteriores = this.util.endentarArray(this.util.objectToArray(this.delta['Valores anteriores']));
      (this.delta['Valores alterados'] as Array<any>).forEach(element => {
        let path = (element[0] as string).split('*');
        if(path.length > 1){
          for (let index = 0; index < path.length - 1; index++) {
            const atrib = path[index];
            if(!(this.valoresAlterados.find(x => JSON.stringify(x) === JSON.stringify([index*15,atrib,'','','grupo'])))) this.valoresAlterados.push([index*15,atrib,'','','grupo']);
          }
          this.valoresAlterados.push([(path.length - 1)*15,path.pop(),element[1],element[2],'']);
        }else{ this.valoresAlterados.push([0,...element,'']); }
      }); 
    }else{this.resultado = this.util.endentarArray(this.util.objectToArray(this.delta));}
    this.cdRef.detectChanges();
  }

}