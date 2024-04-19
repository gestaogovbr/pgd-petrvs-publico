import { Component, Injector, ViewChild } from "@angular/core";
import { UsersPanelDaoService } from "src/app/dao/users-panel-dao.service";
import { UserPanel } from "src/app/models/user-panel.model";
import { PageFormBase } from "../../base/page-form-base";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { AbstractControl, FormGroup } from "@angular/forms";
import { IIndexable } from "src/app/models/base.model";
import { Tenant } from "src/app/models/tenant.model";
import { LookupItem } from "src/app/services/lookup.service";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { InputSelectComponent } from "src/app/components/input/input-select/input-select.component";

@Component({
  selector: 'panel-admins-form',
  templateUrl: './panel-admins-form.component.html',
  styleUrls: ['./panel-admins-form.component.scss']
})
export class PanelAdminsFormComponent extends PageFormBase<UserPanel, UsersPanelDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('tenant', { static: false }) public tenant?: InputSelectComponent;


  public items: LookupItem[] = [];
  public itemsSelecionados: LookupItem[] = [];
  public tenants: Tenant[] = [];
  public tenantsDao: TenantDaoService;

  public form: FormGroup;
  public usersPanelDao?: UsersPanelDaoService;
  
  constructor(public injector: Injector){
    super(injector, UserPanel, UsersPanelDaoService);
    this.usersPanelDao = injector.get<UsersPanelDaoService>(UsersPanelDaoService);
    this.tenantsDao = injector.get<TenantDaoService>(TenantDaoService); 
    
    this.join = ['tenants']

    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      email: {default: ''},
      password: {default: ''},
      tenants: {default: []},
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
    if (entity.tenants) {
      this.itemsSelecionados = entity.tenants.map((t: any) => ({ key: t.id, value: t.nome_entidade }));
    }
    this.loading = true;
    try {
      this.tenants = await this.tenantsDao.query().asPromise();
      this.tenants.forEach(t => {
        this.items.push({key: t.id, value: t.nome_entidade})
      });      
    } finally {
      this.loading = false;
    }
    
    
  }

  public async saveData(form: IIndexable): Promise<UserPanel> {
    
    return new Promise<UserPanel>((resolve, reject) => {
      let userPanel: UserPanel = this.util.fill(new UserPanel(), this.entity!);
      userPanel = this.util.fillForm(userPanel, this.form!.value);
      userPanel.tenants = this.tenants.filter(t => this.form.controls.tenants.value?.map((i: LookupItem) => i.key).includes(t.id))
      resolve(userPanel);
    });
  }


  public addItemHandleTenant(): LookupItem | undefined {
    let result = undefined;
    if(this.tenant && this.tenant.selectedItem) {
      const item = this.tenant.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if(this.util.validateLookupItem(this.form.controls.tenants.value, key)) {
        result = {
          key: key,
          value: item.value,
          color: item.color,
          icon: item.icon
        };
        this.form.controls.tenant.setValue("");
      }
    }
    return result;
  };

  
}