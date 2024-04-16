import { Component, Injector } from "@angular/core";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { Tenant } from "src/app/models/tenant.model";
import { PageListBase } from "../../base/page-list-base";
import { SeederDaoService } from "src/app/dao/seeder-dao.service";

@Component({
  selector: 'app-panel-seeder',
  templateUrl: './panel-seeder.component.html',
  styleUrls: ['./panel-seeder.component.scss']
})
export class PanelSeederComponent extends PageListBase<Tenant, TenantDaoService> {

  public seeders: string[] = [];
  public selectedSeeder: string = '';
  public seederDao: SeederDaoService;
  public tenant_id!: string | null;
  public output: [] = [];

  constructor(public injector: Injector) {
    super(injector, Tenant, TenantDaoService);
    this.seederDao = injector.get<SeederDaoService>(SeederDaoService);
    /* Inicializações */
    this.title = "Executar Seeder em todos os Tenants";
    
  }
  ngOnInit() {
    super.ngOnInit();
    this.loadSeeders();
  }

  private async loadSeeders() {
    this.tenant_id = this.metadata?.tenant_id || null;    
    if(this.tenant_id)  this.title = "Executar Seeder no Tenant " + this.tenant_id ;
    const result = await this.seederDao.getAllSeeder()
    if(result){
      this.seeders = result
    }
  }
  onSeederChange(event: any) {
    this.selectedSeeder = event.target.value;
  }

  executeSeeder(seeder: string) {
    if (!this.selectedSeeder) {
      alert('Por favor, selecione um seeder para executar.');
      return;
    }
    
    this.seederDao.executeSeeder(this.selectedSeeder, this.tenant_id).then(
        (response: any) => {
          // Verificar se response é um objeto e tem a propriedade 'message'
          if (response && typeof response === 'object' && 'message' in response) {
            this.dialog.alert('Sucesso',String(response?.message));
            this.output = response?.output;
            console.log('Seeder executado com sucesso:', response);
          } else {
            console.error('Resposta inválida ou sem propriedade "message":', response);
          }
        },
        error => {
          console.error('Erro ao executar seeder:', error);
          let errorMessage = error.error && error.error.message ? error.error.message : 'Erro desconhecido';
          alert(errorMessage);
        }
    );
  }

}