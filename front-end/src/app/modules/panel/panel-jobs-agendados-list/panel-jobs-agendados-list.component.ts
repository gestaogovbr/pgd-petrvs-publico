import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { JobAgendadoDaoService } from "src/app/dao/job-agendado-dao.service";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { JobAgendado } from "src/app/models/job-agendado.model";
import { Tenant } from "src/app/models/tenant.model";
import { PageListBase } from "src/app/modules/base/page-list-base";

@Component({
  selector: 'panel-jobs-agendados-list',
  templateUrl: './panel-jobs-agendados-list.component.html',
  styleUrls: ['./panel-jobs-agendados-list.component.scss']
})
export class PanelJobAgendadosListComponent extends PageListBase<JobAgendado, JobAgendadoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public jobAgendadoDao: JobAgendadoDaoService;
  public tenantDaoService: TenantDaoService;
  public botoes: ToolbarButton[] = [];
  public jobTypes: any[] = [];
  public tenants: any[] = [];

  constructor(public injector: Injector, dao: JobAgendadoDaoService) {
    super(injector, JobAgendado, JobAgendadoDaoService);
    this.jobAgendadoDao = injector.get<JobAgendadoDaoService>(JobAgendadoDaoService);
    this.tenantDaoService = injector.get<TenantDaoService>(TenantDaoService);
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
       const result = await this.jobAgendadoDao.getClassJobs();
 
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

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

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
  }

  public dynamicButtons(row: JobAgendado): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if(!row._status) result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.consult.bind(this) });  
  
    result.push({ label: "Excluir", icon: "bi bi-trash", color: 'btn-outline-danger', onClick: this.delete.bind(this) });   
    
    return result;
  }
}