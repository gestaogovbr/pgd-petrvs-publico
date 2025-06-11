import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { IIndexable } from "src/app/models/base.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
import { JobAgendado } from "src/app/models/job-agendado.model";
import { JobAgendadoDaoService } from "src/app/dao/job-agendado-dao.service";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { Tenant } from "src/app/models/tenant.model";
import { LookupItem } from "src/app/services/lookup.service";

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
      expressao_cron: { default: "* * * * *" },
      periodicidade: { default: null },
      intervalo_qtde: { default: 0 },
      intervalo_tipo: { default: null },
      dia: { default: null },
      horario: { default: null }
    }, this.cdRef, this.validate);
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

    public validate = (control: AbstractControl, controlName: string) => {
        let result = null;

        if(controlName == 'nome' && control.value == null){
          result = "Inválido";
        }

        if(controlName == 'tenant_id' && control.value == null){
          result = "Inválido";
        }

        if(controlName == 'classe' && control.value == null){
          result = "Inválido";
        }

        if(controlName == 'periodicidade' && control.value == null){
          result = "Inválido";
        }

        if(controlName == 'intervalo_qtde' && control.value == null && this.form?.get('periodicidade')?.value == 'cada'){
          result = "Inválido";
        }

        if(controlName == 'intervalo_tipo' && control.value == null && this.form?.get('periodicidade')?.value == 'cada'){
          result = "Inválido";
        }

        if(controlName == 'dia' && this.form?.get('periodicidade')?.value == 'dia' && (
          control.value == null || control.value < 0
        )){
          result = "Inválido";
        }

        if(controlName == 'horario' &&
          (control.value == null || control.value == "") && (
          (this.form?.get('periodicidade')?.value == 'dia') ||
          (this.form?.get('periodicidade')?.value == 'todos') ||
          (this.form?.get('periodicidade')?.value == 'domingo') ||
          (this.form?.get('periodicidade')?.value == 'segunda') ||
          (this.form?.get('periodicidade')?.value == 'terca') ||
          (this.form?.get('periodicidade')?.value == 'quarta') ||
          (this.form?.get('periodicidade')?.value == 'quinta') ||
          (this.form?.get('periodicidade')?.value == 'sexta') ||
          (this.form?.get('periodicidade')?.value == 'sabado')
        )) {
          result = "Inválido";
        }

        return result;
      }
}