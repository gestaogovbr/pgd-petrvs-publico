import { Component, Injector } from "@angular/core";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { Tenant } from "src/app/models/tenant.model";
import { PageListBase } from "../../base/page-list-base";
import { JobAgendado } from '../../../models/job-agendado.model';
import { JobAgendadoDaoService } from 'src/app/dao/job-agendado-dao.service';
import { FormGroup } from "@angular/forms";
import { isValidCron } from 'cron-validator';

@Component({
  selector: 'app-panel-job-agendados',
  templateUrl: './panel-job-agendados.component.html',
  styleUrls: ['./panel-job-agendados.component.scss']
})
export class JobAgendadoComponent extends PageListBase<Tenant, TenantDaoService> {
  jobs: JobAgendado[] = [];
  newJob: JobAgendado = new JobAgendado();
  showCronInput: boolean = false;
  public tenant_id!: string | null;
  public jobAgendadoDao: JobAgendadoDaoService;
  public tenantDaoService: TenantDaoService;
  public jobTypes: any[] = [];
  public tenants: any[] = [];
  public isRecurring: boolean = false;
  public scheduleTime: string = "";
  public expressionCron: string = "";
  public parameters = {};
  isDisabled: boolean = true;

  constructor(public injector: Injector) {
    super(injector, Tenant, TenantDaoService);
    this.jobAgendadoDao = injector.get<JobAgendadoDaoService>(JobAgendadoDaoService);
    this.tenantDaoService = injector.get<TenantDaoService>(TenantDaoService);
    this.newJob.expressao_cron = "* * * * *"; 
    this.title = "Gerenciar Jobs agendados";
    this.formGroup = this.fb.group({
      ativo: [true]  
    });

  }
  ngOnInit() {
    super.ngOnInit();
    this.loadTenants();
    this.LoadClassJobs();
    this.loadJobs();
  }
  onInputChange() {

  }
  
  formGroup: FormGroup;
  radioItems = [
    { key: true, value: 'Sim' },
    { key: false, value: 'Não' }
  ];

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
  private async loadTenants() {
    try {
       await this.tenantDaoService.query().asPromise().then(
        (tenants: Tenant[]) => {
          console.log(tenants);
          this.tenants = tenants.map(tenant => ({
            value: tenant.id,
            text: tenant.id
          }));
        }
      );
    } catch (error) {
      console.error("Erro ao carregar os tenants: ", error);
    }
  }

  private async LoadClassJobs() {
    try {
      const result = await this.jobAgendadoDao.getClassJobs();

      if (result) {
        this.jobTypes = Object.keys(result.data).map(key => ({
          value: key,
          text: result.data[key]
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar os tipos de jobs: ", error);
    }
  }
  
  private async loadJobs() {
    this.tenant_id = this.metadata?.tenant_id || null;
    if (this.tenant_id) this.title = "Gerenciar Jobs agendados do Tenant " + this.tenant_id;
    console.log(this.tenant_id);
    try {
      const result = await this.jobAgendadoDao.getAllJobs(this.tenant_id);
      if (result) {
        this.jobs = result.data;
      }
    } catch (error) {
      console.error("Erro ao carregar os jobs: ", error);
    }
  }

  createJob(): void {
    
    if(this.newJob.nome === '') {
      this.dialog.alert('alerta','O campo nome é obrigatório.');
      return;
    }
    if(this.newJob.classe === '' ) {
      this.dialog.alert('alerta','A seleção do Job é obrigatório.');
      return;
    }
    if(this.newJob.tenant_id === 0 ) {
      this.dialog.alert('alerta','A seleção do Tenant é obrigatório.');
      return;
    }
    this.newJob.ativo = this.formGroup.get('ativo')?.value;

    if (!this.isCronValid) {
      this.dialog.alert('alerta','Expressão Cron inválida');
      return;
    }

    this.jobAgendadoDao.createJob(this.newJob, this.tenant_id).then((job: any) => {
      console.log('Job created:', job);
      if(job.success == false){
        this.dialog.alert('alerta',job.message);
      }
      this.loadJobs();
      this.newJob = new JobAgendado();
      this.newJob.diario = true;
      this.newJob.expressao_cron = "* * * * *"; 
      this.newJob.parameters = '';
    }).catch((error: any) => {
      console.error('Error creating job:', error);
      this.dialog.alert('erro','Falha ao salvar o Job');
    });
  }

  deleteJob(jobId: string): void {
    this.jobAgendadoDao.deleteJob(jobId).then(() => {
      console.log('Job deleted successfully');
      this.jobs = this.jobs.filter(job => job.id !== jobId);
    }).catch((error: any) => {
      console.error('Error deleting job:', error);
    });
  }

  toggleCronInput(): void {
    this.showCronInput = !this.showCronInput;
    // Reset relevant fields when toggling
    if (this.showCronInput) {
      this.newJob.diario = false;
      this.newJob.horario = '';
    } else {
      this.newJob.expressao_cron = '';
    }
  }

  get isCronValid(): boolean {
    return isValidCron(this.newJob.expressao_cron, { alias: true, seconds: true }); 
  }

}