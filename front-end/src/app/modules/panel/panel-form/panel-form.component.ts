
import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
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
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild(TabsComponent, { static: false }) public tabs?: TabsComponent;

  public formLogin: FormGroup;

  public encryption: LookupItem[] = [
    { key: "SSL", value: "SSL" },
    { key: "TLS", value: "TLS" }
  ];

  tiposLogin = [
    { Tipo: 'Usuário/Senha', Web: '', API: '', Habilitado: true },
    { Tipo: 'Firebase', Web: '', API: '', Habilitado: true },
    { Tipo: 'Google (GIS)', Web: '', API: '', Habilitado: true },
    { Tipo: 'Microsoft (Azure)', Web: '', API: '', Habilitado: true },
    { Tipo: 'Login único', Web: '', API: '', Habilitado: true },
    { Tipo: 'Institucional', Web: '', API: '', Habilitado: true }
  ];

  constructor(public injector: Injector) {
    super(injector, Tenant, TenantDaoService);
    this.form = this.fh.FormBuilder({
      id: { default: "" },
      tenancy_db_name: { default: "" },
      tenancy_db_host: { default: null },
      tenancy_db_port: { default: 3308 },
      tenancy_db_username: { default: null },
      tenancy_db_password: { default: null },
      log_traffic: { default: false },
      log_changes: { default: false },
      log_errors: { default: false },
      log_host: { default: null },
      log_database: { default: null },
      log_port: { default: 3308 },
      log_username: { default: null },
      log_password: { default: null },
      notification_petrvs: { default: true },
      notification_mail: { default: false },
      notification_mail_signature: { default: "assets/images/signature.png" },
      notification_mail_host: { default: "" },
      notification_mail_port: { default: 465 },
      notification_mail_username: { default: "" },
      notification_mail_password: { default: "" },
      notification_mail_encryption: { default: "SSL" },
      notification_whatsapp: { default: false },
      notification_whatsapp_url: { default: "" },
      notification_whatsapp_token: { default: "" },
      email: { default: "" },
      nome_usuario: { default: "" },
      cpf: { default: "" },
      apelido: { default: "" },
      nome_entidade: { default: "" },
      abrangencia: { default: "" },
      codigo_cidade: { default: 5300108 },
      login: { default: [] },
      dominio_url: { default: window.location.hostname },
      // LOGIN
      login_google: { default: false },
      login_azure: { default: false },
      login_login_unico: { default: false },
      login_select_entidade: { default: false },
      login_google_client_id: { default: "" },
      login_firebase_client_id: { default: "" },
      login_azure_client_id: { default: "" },
      login_azure_secret: { default: "" },
      login_azure_redirect_uri: { default: "" },
      login_login_unico_client_id: { default: "" },
      login_login_unico_secret: { default: "" },
      // INTEGRACAO
      tipo_integracao: { default: null },
      integracao_auto_incluir: { default: true },
      integracao_cod_unidade_raiz: { default: "" },
      integracao_siape_url: { default: "" },
      integracao_siape_upag: { default: "" },
      integracao_siape_sigla: { default: "" },
      integracao_siape_nome: { default: "" },
      integracao_siape_cpf: { default: "" },
      integracao_siape_senha: { default: "" },
      integracao_siape_codorgao: { default: "" },
      integracao_siape_uorg: { default: "" },
      integracao_siape_existepag: { default: "" },
      integracao_siape_tipovinculo: { default: "" },
      integracao_wso2_url: { default: "" },
      integracao_wso2_unidades: { default: "" },
      integracao_wso2_pessoas: { default: "" },
      integracao_wso2_token_url: { default: "" },
      integracao_wso2_token_authorization: { default: "" },
      integracao_wso2_token_acesso: { default: "" },
      integracao_wso2_token_user: { default: "" },
      integracao_wso2_token_password: { default: "" },

    }, this.cdRef, this.validate);
    this.formLogin = this.fh.FormBuilder({
      Tipo: { default: "" },
      Web: { default: "" },
      API: { default: "" },
      Habilitado: { default: false }
    });
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['id', 'tenancy_db_name', 'nome_entidade', 'abrangencia', 'email', 'cpf', 'nome_usuario', 'apelido'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if (controlName == "codigo_cidade" && !control.value) {
      result = "Obrigatório";
    } else if (controlName == "cpf" && !this.util.validarCPF(control.value)) {
      result = "Inválido";
    }
    if ((this.form?.controls.log_traffic.value || this.form?.controls.log_changes.value || this.form?.controls.log_errors.value) &&
      ['log_host', 'log_database'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public async onSelectTab(tab: LookupItem) {
    if(this.viewInit) this.saveUsuarioConfig({ active_tab: tab.key });
  }

  public async loadData(entity: Tenant, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    let login = this.tiposLogin || [];
    formValue.login = login;
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    this.entity = (await this.dao!.getById(this.urlParams!.get("id")!, this.join))!;
    await this.loadData(this.entity, form);

  }

  public async saveData(form: IIndexable): Promise<Tenant> {
    return new Promise<Tenant>((resolve, reject) => {
      const entrega = this.util.fill(new Tenant(), this.entity!);
      resolve(this.util.fillForm(entrega, this.form!.value));
    });
  }

}
