import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { Tenant } from "src/app/models/tenant.model";
import { PageListBase } from "../../base/page-list-base";
import { JobAgendado } from '../../../models/job-agendado.model';
import { JobAgendadoDaoService } from 'src/app/dao/job-agendado-dao.service';
import { isValidCron } from 'cron-validator';
let JobAgendadoComponent = class JobAgendadoComponent extends PageListBase {
    constructor(injector) {
        super(injector, Tenant, TenantDaoService);
        this.injector = injector;
        this.jobs = [];
        this.newJob = new JobAgendado();
        this.showCronInput = false;
        this.jobTypes = [];
        this.tenants = [];
        this.isRecurring = false;
        this.scheduleTime = "";
        this.expressionCron = "";
        this.parameters = {};
        this.isDisabled = true;
        this.radioItems = [
            { key: true, value: 'Sim' },
            { key: false, value: 'Não' }
        ];
        this.jobAgendadoDao = injector.get(JobAgendadoDaoService);
        this.tenantDaoService = injector.get(TenantDaoService);
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
    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }
    async loadTenants() {
        try {
            await this.tenantDaoService.query().asPromise().then((tenants) => {
                console.log(tenants);
                this.tenants = tenants.map(tenant => ({
                    value: tenant.id,
                    text: tenant.id
                }));
            });
        }
        catch (error) {
            console.error("Erro ao carregar os tenants: ", error);
        }
    }
    async LoadClassJobs() {
        try {
            const result = await this.jobAgendadoDao.getClassJobs();
            if (result) {
                this.jobTypes = Object.keys(result.data).map(key => ({
                    value: key,
                    text: result.data[key]
                }));
            }
        }
        catch (error) {
            console.error("Erro ao carregar os tipos de jobs: ", error);
        }
    }
    async loadJobs() {
        this.tenant_id = this.metadata?.tenant_id || null;
        if (this.tenant_id)
            this.title = "Gerenciar Jobs agendados do Tenant " + this.tenant_id;
        console.log(this.tenant_id);
        try {
            const result = await this.jobAgendadoDao.getAllJobs(this.tenant_id);
            if (result) {
                this.jobs = result.data;
            }
        }
        catch (error) {
            console.error("Erro ao carregar os jobs: ", error);
        }
    }
    createJob() {
        if (this.newJob.nome === '') {
            this.dialog.alert('alerta', 'O campo nome é obrigatório.');
            return;
        }
        if (this.newJob.classe === '') {
            this.dialog.alert('alerta', 'A seleção do Job é obrigatório.');
            return;
        }
        if (this.newJob.tenant_id === 0) {
            this.dialog.alert('alerta', 'A seleção do Tenant é obrigatório.');
            return;
        }
        this.newJob.ativo = this.formGroup.get('ativo')?.value;
        if (!this.isCronValid) {
            this.dialog.alert('alerta', 'Expressão Cron inválida');
            return;
        }
        this.jobAgendadoDao.createJob(this.newJob, this.tenant_id).then((job) => {
            console.log('Job created:', job);
            if (job.success == false) {
                this.dialog.alert('alerta', job.message);
            }
            this.loadJobs();
            this.newJob = new JobAgendado();
            this.newJob.diario = true;
            this.newJob.expressao_cron = "* * * * *";
            this.newJob.parameters = '';
        }).catch((error) => {
            console.error('Error creating job:', error);
            this.dialog.alert('erro', 'Falha ao salvar o Job');
        });
    }
    deleteJob(jobId) {
        this.jobAgendadoDao.deleteJob(jobId).then(() => {
            console.log('Job deleted successfully');
            this.jobs = this.jobs.filter(job => job.id !== jobId);
        }).catch((error) => {
            console.error('Error deleting job:', error);
        });
    }
    toggleCronInput() {
        this.showCronInput = !this.showCronInput;
        // Reset relevant fields when toggling
        if (this.showCronInput) {
            this.newJob.diario = false;
            this.newJob.horario = '';
        }
        else {
            this.newJob.expressao_cron = '';
        }
    }
    get isCronValid() {
        return isValidCron(this.newJob.expressao_cron, { alias: true, seconds: true });
    }
};
JobAgendadoComponent = __decorate([
    Component({
        selector: 'app-panel-job-agendados',
        templateUrl: './panel-job-agendados.component.html',
        styleUrls: ['./panel-job-agendados.component.scss'],
        standalone: false
    })
], JobAgendadoComponent);
export { JobAgendadoComponent };
//# sourceMappingURL=panel-job-agendados.component.js.map