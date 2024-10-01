import { Component, Injector } from "@angular/core";
import { UsersPanelDaoService } from "src/app/dao/users-panel-dao.service";
import { UserPanel } from "src/app/models/user-panel.model";
import { PageFormBase } from "../../base/page-form-base";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { IIndexable } from "src/app/models/base.model";
import { NavigateResult } from "src/app/services/navigate.service";
import { AuthPanelService } from "src/app/services/auth-panel.service";
import { Modal } from "bootstrap";

@Component({
  selector: 'panel-change-password',
  templateUrl: './panel-change-password.component.html',
  styleUrls: ['./panel-change-password.component.scss']
})
export class PanelChangePasswordComponent extends PageFormBase<UserPanel, UsersPanelDaoService> {
  public editableForm?: EditableFormComponent | undefined;
  public usersPanelDao?: UsersPanelDaoService;

  constructor(public injector: Injector, private authService: AuthPanelService){
    super(injector, UserPanel, UsersPanelDaoService);
    this.usersPanelDao = injector.get<UsersPanelDaoService>(UsersPanelDaoService);

    this.form = this.fh.FormBuilder({
      id: {default: ""},
      nome: {default: ""},
      email: {default: ''},
      password: {default: ''},
    }, this.cdRef, this.validate);
  } 

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public initializeData(form: FormGroup): void {
    this.entity = new UserPanel();
    this.authService.detailUser().then((user) => {
      this.loadData(user, form);
    })
  }

  public async loadData(entity: UserPanel, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async saveData(form: IIndexable): Promise<UserPanel> {
    let usuario = this.util.fill(new UserPanel(), this.entity!);
    return this.util.fillForm(usuario, this.form!.value) as UserPanel;
  }

  public async alteraSenha() {
    try {
      let usuario = this.util.fill(new UserPanel(), this.entity!);
      this.util.fillForm(usuario, this.form!.value) as UserPanel;
      
      let response = await this.authService.updatePassword(usuario.password!);
  
      if (response.success) {
        await this.authService.logout();
        this.dialog.closeAll();
        this.router.navigate(["/panel-login"]);
      } else {
        this.dialog.alert("Error", response.error);
      }
    } catch (error) {
      this.dialog.alert("Error", String(error));
    }
  }
}