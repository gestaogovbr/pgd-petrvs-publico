import {Component, Injector, ViewChild} from '@angular/core';
import {PageFormBase} from "../../../base/page-form-base";
import {Template} from "../../../../models/template.model";
import {TemplateDaoService} from "../../../../dao/template-dao.service";
import {EditableFormComponent} from "../../../../components/editable-form/editable-form.component";
import {AbstractControl, FormGroup} from "@angular/forms";
import {IIndexable} from "../../../../models/base.model";
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent extends PageFormBase<Template, TemplateDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  //public Editor = ClassicEditor;

  constructor(public injector: Injector) {
    super(injector, Template, TemplateDaoService);
    this.modalWidth = 1100;
    this.form = this.fh.FormBuilder({
      titulo: {default: ""},
      tipo: {default: "TCR"},
      numero: {default: ""},
      conteudo: {default: ""},
      data_inicio: {default: ""},
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    // if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
    //   result = "Obrigatório";
    // }
    return result;
  }
  public loadData(entity: Template, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Template());
  }

  public saveData(form: IIndexable): Promise<Template> {
    return new Promise<Template>((resolve, reject) => {
      const template = this.util.fill(new Template(), this.entity!);
      resolve(this.util.fillForm(template, this.form!.value));
    });
  }
}
