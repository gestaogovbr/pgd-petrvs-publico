import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { JobAgendadoDaoService } from "src/app/dao/job-agendado-dao.service";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { JobAgendado } from "src/app/models/job-agendado.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
let PanelJobAgendadosListComponent = class PanelJobAgendadosListComponent extends PageListBase {
    constructor(injector, dao) {
        super(injector, JobAgendado, JobAgendadoDaoService);
        this.injector = injector;
        this.botoes = [];
        this.jobTypes = [];
        this.tenants = [];
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.tenant_id?.length) {
                result.push(["tenant_id", "==", form.tenant_id]);
            }
            if (form.classe?.length) {
                result.push(["classe", "==", form.classe]);
            }
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim() + "%"]);
            }
            return result;
        };
        this.jobAgendadoDao = injector.get(JobAgendadoDaoService);
        this.tenantDaoService = injector.get(TenantDaoService);
        this.title = this.lex.translate("Agendamentos");
        this.filter = this.fh.FormBuilder({
            tenant_id: { default: null },
            nome: { default: "" },
            classe: { default: "" },
        });
        this.orderBy = [['created_at', 'desc']];
    }
    ngOnInit() {
        super.ngOnInit();
        this.loadTenants();
        this.LoadClassJobs();
    }
    async loadTenants() {
        try {
            await this.tenantDaoService.query().asPromise().then((tenants) => {
                this.tenants = tenants.map(tenant => ({
                    key: tenant.id,
                    value: tenant.id
                }));
                console.log(this.tenants);
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
                    key: key,
                    value: result.data[key]
                }));
            }
        }
        catch (error) {
            console.error("Erro ao carregar os tipos de jobs: ", error);
        }
    }
    dynamicOptions(row) {
        let result = [];
        return result;
    }
    dynamicButtons(row) {
        let result = [];
        result.push({ label: "Excluir", icon: "bi bi-trash", color: 'btn-outline-danger', onClick: this.delete.bind(this) });
        return result;
    }
    expressaoText(row) {
        if (row.periodicidade == 'custom') {
            return row.expressao_cron;
        }
        else {
            if (row.periodicidade == 'cada') {
                return 'A cada ' + row.intervalo_qtde + ' ' +
                    this.lookup.getValue(this.lookup.AGENDAMENTO_INTERVALO_TIPOS, row.intervalo_tipo);
            }
            else if (row.periodicidade == 'todos') {
                return 'Todos os dias às ' + row.horario + 'h';
            }
            else if (row.periodicidade == 'dia') {
                return 'Todo dia às ' + row.dia + ' às ' + row.horario + 'h';
            }
            else {
                return this.lookup.getValue(this.lookup.AGENDAMENTO_PERIODICIDADES, row.periodicidade) +
                    ' às ' + row.horario + 'h';
            }
        }
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], PanelJobAgendadosListComponent.prototype, "grid", void 0);
PanelJobAgendadosListComponent = __decorate([
    Component({
        selector: 'panel-jobs-agendados-list',
        templateUrl: './panel-jobs-agendados-list.component.html',
        styleUrls: ['./panel-jobs-agendados-list.component.scss'],
        standalone: false
    })
], PanelJobAgendadosListComponent);
export { PanelJobAgendadosListComponent };
//# sourceMappingURL=panel-jobs-agendados-list.component.js.map