import { Component, Injector, ViewChild } from "@angular/core";
import { UsersPanelDaoService } from "src/app/dao/users-panel-dao.service";
import { UserPanel } from "src/app/models/user-panel.model";
import { PageFormBase } from "../../base/page-form-base";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { AbstractControl, FormGroup } from "@angular/forms";
import { IIndexable } from "src/app/models/base.model";

@Component({
  selector: 'panel-admins-form',
  templateUrl: './panel-admins-form.component.html',
  styleUrls: ['./panel-admins-form.component.scss']
})
export class PanelAdminsFormComponent extends PageFormBase<UserPanel, UsersPanelDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public form: FormGroup;
  public usersPanelDao?: UsersPanelDaoService;
  
  constructor(public injector: Injector){
    super(injector, UserPanel, UsersPanelDaoService);
    this.usersPanelDao = injector.get<UsersPanelDaoService>(UsersPanelDaoService);

    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      email: {default: ''}
    }, this.cdRef, this.validate);

  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public initializeData(form: FormGroup): void {
    this.entity = new UserPanel();
    this.loadData(this.entity, form);
  }

  public async loadData(entity: UserPanel, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async saveData(form: IIndexable) {
    let userPanel = this.util.fill(new UserPanel(), this.entity!);
    return this.util.fillForm(userPanel, this.form!.value) as UserPanel;
  }
  
}