import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { AreaConhecimento } from 'src/app/models/area-conhecimento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { AreaAtividadeExterna } from 'src/app/models/area-atividade-externa.model';
import { AreaAtividadeExternaDaoService } from 'src/app/dao/area-atividade-externa-dao.service';

@Component({
  selector: 'area-atividade-externa-form',
  templateUrl: './area-atividade-externa-form.component.html',
  styleUrls: ['./area-atividade-externa-form.component.scss']
})
export class AreaAtividadeExternaFormComponent extends PageFormBase<AreaAtividadeExterna, AreaAtividadeExternaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;


  constructor(public injector: Injector) {
    super(injector, AreaAtividadeExterna, AreaAtividadeExternaDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      ativo:{default: true},
      
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: AreaAtividadeExterna, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new AreaAtividadeExterna());
  }


  public saveData(form: IIndexable): Promise<AreaAtividadeExterna> {
    return new Promise<AreaAtividadeExterna>((resolve, reject) => {
      const areaAtividadeExterna = this.util.fill(new AreaAtividadeExterna(), this.entity!);
      resolve(this.util.fillForm(areaAtividadeExterna, this.form!.value));
    });
  }


  public titleEdit = (entity: AreaConhecimento): string => {
    return "Editando " + (entity?.nome || "");
  }
}

