import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.scss']
})
export class ProjetoFormComponent extends PageFormBase<Projeto, ProjetoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, Projeto, ProjetoDaoService);
    this.join = [];
    this.form = this.fh.FormBuilder({
    }, this.cdRef, this.validate);
  }
  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome', 'pergunta'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: Projeto, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Projeto();
    this.loadData(this.entity, form);    
  }

  public saveData(form: IIndexable): Promise<Projeto> {
    return new Promise<Projeto>((resolve, reject) => {
      let projeto = this.util.fill(new Projeto(), this.entity!);
      projeto = this.util.fillForm(projeto, this.form!.value);
      resolve(projeto);
    });
  }

  public titleEdit = (entity: Projeto): string => {
    return "Editando " + (entity?.nome || "");
  }
}

