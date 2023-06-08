import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TenantDaoService } from 'src/app/dao/tenant-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Tenant } from 'src/app/models/tenant.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-panel-form',
  templateUrl: './panel-form.component.html',
  styleUrls: ['./panel-form.component.scss']
})
export class PanelFormComponent extends PageFormBase<Tenant, TenantDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public encryption: LookupItem[] = [
    { key: "SSL", value: "SSL" },
    { key: "TLS", value: "TLS" }
  ];

  constructor(public injector: Injector) {
    super(injector, Tenant, TenantDaoService);
    this.form = this.fh.FormBuilder({
      id: {default: ""},
      tenancy_db_name: {default: ""},
      tenancy_db_host: {default: null},
      tenancy_db_port: {default: null},
      tenancy_db_username: {default: null},
      tenancy_db_password: {default: null},
      log_traffic: {default: false},
      log_changes: {default: false},
      log_errors: {default: false},
      log_host: {default: null},
      log_database: {default: null},
      log_port: {default: null},
      log_username: {default: null},
      log_password: {default: null},
      notification_petrvs: {default: true},
      notification_mail: {default: false},
      notification_mail_signature: {default: "assets/images/signature.png"},
      notification_mail_host: {default: ""},
      notification_mail_port: {default: 465},
      notification_mail_username: {default: ""},
      notification_mail_password: {default: ""},
      notification_mail_encryption: {default: "SSL"},
      notification_whatsapp: {default: false},
      notification_whatsapp_url: {default: ""},
      notification_whatsapp_token: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['id', 'tenancy_db_name'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if((this.form?.controls.log_traffic.value || this.form?.controls.log_changes.value || this.form?.controls.log_errors.value) && 
      ['log_host', 'log_database'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public async loadData(entity: Tenant, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup) {
    form.patchValue(new Tenant());
  }

  public async saveData(form: IIndexable): Promise<Tenant> {
    return new Promise<Tenant>((resolve, reject) => {
      const entrega = this.util.fill(new Tenant(), this.entity!);
      resolve(this.util.fillForm(entrega, this.form!.value));
    });
  }

}

