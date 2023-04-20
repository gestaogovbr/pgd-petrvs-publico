import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {EditableFormComponent} from "../../../../components/editable-form/editable-form.component";
import {PageFormBase} from "../../../base/page-form-base";
import {Macroprocesso} from "../../../../models/macroprocesso.model";
import {MacroprocessoDaoService} from "../../../../dao/macroprocesso-dao.service";
import {AbstractControl, FormGroup} from "@angular/forms";
import {IIndexable} from "../../../../models/base.model";

@Component({
  selector: 'app-macroprocesso-form',
  templateUrl: './macroprocesso-form.component.html',
  styleUrls: ['./macroprocesso-form.component.scss']
})
export class MacroprocessoFormComponent extends PageFormBase<Macroprocesso, MacroprocessoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, Macroprocesso, MacroprocessoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: Macroprocesso, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup) {
    form.patchValue(new Macroprocesso());
  }

  public async saveData(form: IIndexable): Promise<Macroprocesso> {
    return new Promise<Macroprocesso>((resolve, reject) => {
      const macroprocesso = this.util.fill(new Macroprocesso(), this.entity!);
      resolve(this.util.fillForm(macroprocesso, this.form!.value));
    });
  }
}
