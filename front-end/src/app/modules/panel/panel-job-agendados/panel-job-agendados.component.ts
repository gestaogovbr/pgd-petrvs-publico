import { Component, Injector } from "@angular/core";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { Tenant } from "src/app/models/tenant.model";
import { PageListBase } from "../../base/page-list-base";
import { JobAgendado } from '../../../models/job-agendado.model';
import { JobAgendadoDaoService } from 'src/app/dao/job-agendado-dao.service';

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
  public jobTypes: string[] = ['LogJob', 'SincronizarSiapeJob', 'SincronizarPGDJob'];
  public isRecurring: boolean = false;
  public scheduleTime: string = '';
  public expressionCron: string = '';

  constructor(public injector: Injector) {
    super(injector, Tenant, TenantDaoService);
    this.jobAgendadoDao = injector.get<JobAgendadoDaoService>(JobAgendadoDaoService);    
    this.title = "Gerenciar Jobs agendados";
    this.newJob.diario = true;
  }
  ngOnInit() {
    super.ngOnInit();
    this.loadJobs();
  }

  private async loadJobs() {
    this.tenant_id = this.metadata?.tenant_id || null;
    if(this.tenant_id)  this.title = "Gerenciar Jobs agendados do Tenant " + this.tenant_id ;
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
    if (this.newJob.diario) {
      this.newJob.expressao_cron = ''; 
    } else {
      this.newJob.horario = '';
    }

    this.jobAgendadoDao.createJob(this.newJob,this.tenant_id).then((job: any) => {
      console.log('Job created:', job);
      this.loadJobs();
      this.newJob = new JobAgendado();
      this.newJob.diario = true;
    }).catch((error: any) => {
      console.error('Error creating job:', error);
    });
  }

  deleteJob(jobId: string): void {
    this.jobAgendadoDao.deleteJob(jobId,this.tenant_id).then(() => {
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
}