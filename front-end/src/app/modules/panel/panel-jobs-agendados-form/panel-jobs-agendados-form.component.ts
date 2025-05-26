import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { IIndexable } from "src/app/models/base.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { JobAgendado } from "src/app/models/job-agendado.model";
import { JobAgendadoDaoService } from "src/app/dao/job-agendado-dao.service";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { Tenant } from "src/app/models/tenant.model";

@Component({
  selector: 'panel-jobs-agendados-form',
  templateUrl: './panel-jobs-agendados-form.component.html',
  styleUrls: ['./panel-jobs-agendados-form.component.scss']
})

export class PanelJobsAgendadosFormComponent extends PageFormBase<JobAgendado, JobAgendadoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public tenantDaoService: TenantDaoService;
  public jobTypes: any[] = [];
  public tenants: any[] = [];

  constructor(public injector: Injector) {
    super(injector, JobAgendado, JobAgendadoDaoService);
    this.dao = injector.get<JobAgendadoDaoService>(JobAgendadoDaoService);
    this.tenantDaoService = injector.get<TenantDaoService>(TenantDaoService);
    this.modalWidth = 1300;
    this.form = this.fh.FormBuilder({
      tenant_id: { default: null },
      nome: { default: "" },
      classe: { default: "" },
      expressao_cron: { default: "* * * * *" }
    });
  }

  public async loadData(entity: JobAgendado, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    form.patchValue(new JobAgendado());
    this.entity = new JobAgendado();
    await this.loadData(this.entity, this.form!);
  }

  public saveData(form: IIndexable): Promise<JobAgendado> {
    return new Promise<JobAgendado>((resolve, reject) => {
      const catalogo = this.util.fill(new JobAgendado(), this.entity!);
      resolve(this.util.fillForm(catalogo, this.form!.value));
    });
  }

  ngOnInit() {
      super.ngOnInit();
      this.loadTenants();
      this.LoadClassJobs();
    }
  
    private async loadTenants() {
      try {
        await this.tenantDaoService.query().asPromise().then(
          (tenants: Tenant[]) => {
            this.tenants = tenants.map(tenant => ({
              key: tenant.id,
              value: tenant.id
            }));
            console.log(this.tenants);
          }
        );
      } catch (error) {
        console.error("Erro ao carregar os tenants: ", error);
      }
    }
   
    private async LoadClassJobs() {
       try {
         const result = await this.dao?.getClassJobs();
   
         if (result) {
           this.jobTypes = Object.keys(result.data).map(key => ({
             key: key,
             value: result.data[key]
           }));
         }
       } catch (error) {
         console.error("Erro ao carregar os tipos de jobs: ", error);
       }
    }
}