import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CentroTreinamentoDaoService } from 'src/app/dao/centro-treinamento-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { CentroTreinamento } from 'src/app/models/centro-treinamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { TipoCursoDaoService } from 'src/app/dao/tipo-curso-dao.service';



@Component({
  selector: 'centro-treinamento-form',
  templateUrl: './centro-treinamento-form.component.html',
  styleUrls: ['./centro-treinamento-form.component.scss']
})
export class CentroTreinamentoFormComponent extends PageFormBase<CentroTreinamento, CentroTreinamentoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  
  public titulos: LookupItem[] = [];
  //public tipoCursoDao ?: TipoCursoDaoService;

  constructor(public injector: Injector) {
    super(injector, CentroTreinamento, CentroTreinamentoDaoService);
   
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      ativo: {default: true},
           
    }, this.cdRef, this.validate);
  }

  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: CentroTreinamento, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new CentroTreinamento());
  }


  public saveData(form: IIndexable): Promise<CentroTreinamento> {
    return new Promise<CentroTreinamento>((resolve, reject) => {
      const centro = this.util.fill(new CentroTreinamento(), this.entity!);
      resolve(this.util.fillForm(centro, this.form!.value));
    });
  }


  public titleEdit = (entity: CentroTreinamento): string => {
    return "Editando " + (entity?.nome || "");
  }
}

