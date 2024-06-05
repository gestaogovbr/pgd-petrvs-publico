import { Component, Injector } from "@angular/core";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { Tenant } from "src/app/models/tenant.model";
import { PageListBase } from "../../base/page-list-base";
import { JobAgendado } from '../../../models/job-agendado.model';
import { JobAgendadoDaoService } from 'src/app/dao/job-agendado-dao.service';
import { FormGroup } from "@angular/forms";

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
    this.title = "Gerenciar Jobs agendados";
    this.formGroup = this.fb.group({
      ativo: [true]  
    });

    this.updateCronExpression();
  }
  ngOnInit() {
    super.ngOnInit();
    this.loadTenants();
    this.LoadClassJobs();
    this.loadJobs();
  }
  onInputChange() {
    this.validateMinutes();
    this.validateHours();
    this.validateDays();
    this.validateMonths();
    this.validateWeeks();
    this.updateCronExpression();

  }
  
  formGroup: FormGroup;
  radioItems = [
    { key: true, value: 'Sim' },
    { key: false, value: 'Não' }
  ];


  validateMinutes(){
    if(this.newJob.minutos === null || this.newJob.minutos === undefined) this.newJob.minutos = 0;

    if (this.newJob.minutos < 0) {
      this.newJob.minutos = 0;
    } else if (this.newJob.minutos > 59) {
      this.newJob.minutos = 59;
    }
  }

  validateHours(){
    if(this.newJob.horas === null || this.newJob.horas === undefined) this.newJob.horas = 0;

    if (this.newJob.horas < 0) {
      this.newJob.horas = 0;
    } else if (this.newJob.horas > 23) {
      this.newJob.horas = 23;
    }
  }

  validateDays(){
    if(this.newJob.dias === null || this.newJob.dias === undefined) this.newJob.dias = 0;

    if (this.newJob.dias < 0) {
      this.newJob.dias = 0;
    } else if (this.newJob.dias > 31) {
      this.newJob.dias = 31;
    }
  }

  validateMonths(){
    if(this.newJob.meses === null || this.newJob.meses === undefined) this.newJob.meses = 0;

    if (this.newJob.meses < 0) {
      this.newJob.meses = 0;
    } else if (this.newJob.meses > 12) {
      this.newJob.meses = 12;
    }
  }

  validateWeeks(){
    if(this.newJob.semanas === null || this.newJob.semanas === undefined) this.newJob.semanas = 0;

    if (this.newJob.semanas < 0) {
      this.newJob.semanas = 0;
    } else if (this.newJob.semanas > 7) {
      this.newJob.semanas = 7;
    }
  }

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
      console.log(result);
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

    if (typeof this.newJob.parameters === 'string' && this.newJob.parameters.trim() === '') {
      this.newJob.parameters = {};
    } else if (typeof this.newJob.parameters === 'string') {
      try {
        this.newJob.parameters = JSON.parse(this.newJob.parameters);
      } catch (e) {
        console.error('Erro ao converter JSON:', e);
        alert('JSON inválido. Por favor, corrija os dados.');
        return;
      }
    } else if (!this.newJob.parameters || Object.keys(this.newJob.parameters).length === 0) {
      this.newJob.parameters = {};
    }

    this.jobAgendadoDao.createJob(this.newJob, this.tenant_id).then((job: any) => {
      console.log('Job created:', job);
      this.loadJobs();
      this.newJob = new JobAgendado();
      this.newJob.diario = true;
      this.newJob.parameters = '';
      this.updateCronExpression();
    }).catch((error: any) => {
      console.error('Error creating job:', error);
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

  updateCronExpression() {
    const minutos = this.newJob.minutos === 0 || this.newJob.minutos === null ? '*' : this.newJob.minutos;
    const horas = this.newJob.horas === 0 || this.newJob.horas === null ? '*' : this.newJob.horas;
    const dias = this.newJob.dias === 0 || this.newJob.dias === null ? '*' : this.newJob.dias;
    const meses = this.newJob.meses === 0 || this.newJob.meses === null ? '*' : this.newJob.meses;
    const semanas = this.newJob.semanas === 0 || this.newJob.semanas === null? '*' : this.newJob.semanas;

    this.newJob.expressao_cron = `${minutos} ${horas} ${dias} ${meses} ${semanas}`;
  }
}