import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Atividade } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-atividade-form-prorrogar',
  templateUrl: './atividade-form-prorrogar.component.html',
  styleUrls: ['./atividade-form-prorrogar.component.scss']
})
export class AtividadeFormProrrogarComponent extends PageFormBase<Atividade, AtividadeDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  
  public form: FormGroup;
  public modalWidth: number = 400;

  constructor(public injector: Injector) {
    super(injector, Atividade, AtividadeDaoService);
    this.form = this.fh.FormBuilder({
      data_distribuicao: {default: new Date()},
      data_estipulada_entrega: {default: new Date()}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(controlName == "data_estipulada_entrega") {
      if(!this.util.isDataValid(control.value)) {
        result = "Obrigatório";
      } else if(this.entity?.data_distribuicao && (control.value as Date).getTime() < this.entity!.data_distribuicao!.getTime()) {
        result = "Menor que distribuição!";
      } 
    }

    return result;
  }

  public async loadData(entity: Atividade, form: FormGroup) {
    let formValue = {
      data_distribuicao: entity.data_distribuicao, 
      data_estipulada_entrega: entity.data_estipulada_entrega 
    };
    if(entity.unidade_id != this.auth.unidade!.id) {
      await this.auth.selecionaUnidade(entity.unidade_id);
    }
    form.patchValue(formValue);
  }

  public async initializeData(form: FormGroup) {
    this.entity = (await this.dao!.getAtividade(this.urlParams!.get("id")!))!;
    await this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let prorrogar = {
        id: this.entity!.id,
        data_estipulada_entrega: this.form.controls.data_estipulada_entrega.value 
      };
      this.dao!.prorrogar(prorrogar).then(saved => resolve(saved)).catch(reject);
    });
  }

}