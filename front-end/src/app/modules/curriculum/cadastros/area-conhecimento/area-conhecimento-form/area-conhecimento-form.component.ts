import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { AreaConhecimento } from 'src/app/models/area-conhecimento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'area-conhecimento-form',
  templateUrl: './area-conhecimento-form.component.html',
  styleUrls: ['./area-conhecimento-form.component.scss']
})
export class AreaConhecimentoFormComponent extends PageFormBase<AreaConhecimento, AreaConhecimentoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, AreaConhecimento, AreaConhecimentoDaoService);
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      ativo: { default: true },
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: AreaConhecimento, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new AreaConhecimento());
  }

  public saveData(form: IIndexable): Promise<AreaConhecimento> {
    return new Promise<AreaConhecimento>((resolve, reject) => {
      const areaConhecimento = this.util.fill(new AreaConhecimento(), this.entity!);
      resolve(this.util.fillForm(areaConhecimento, this.form!.value));
    });
  }

  public titleEdit = (entity: AreaConhecimento): string => {
    return "Editando " + (entity?.nome || "");
  }
}

