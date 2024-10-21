import { Component, Injector } from "@angular/core";
import { EnvDaoService } from "src/app/dao/env-dao.service";
import { Env } from '../../../models/env.model';
import { PageListBase } from "../../base/page-list-base";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-panel-env',
  templateUrl: './panel-env.component.html',
  styleUrls: ['./panel-env.component.scss']
})
export class PanelEnvComponent extends PageListBase<Env, EnvDaoService> {
  envs: Env[] = [];
  public tenant_id!: string | null;
  public envDao: EnvDaoService;
  public formGroup: FormGroup;
  isDisabled: boolean = true;

  constructor(public injector: Injector) {
    super(injector, Env, EnvDaoService);
    this.envDao = injector.get<EnvDaoService>(EnvDaoService);
    this.title = "Gerenciar Env";
    this.formGroup = this.fb.group({
      CENTRAL_DOMAINS: ['']
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadEnvs();
  }

  private async loadEnvs() {
    try {
      const result = await this.envDao.getEnvs();
      if (result) {
        this.envs = result.data;

        const centralDomainsEnv = this.envs.find(env => env.name === 'CENTRAL_DOMAINS');
        if (centralDomainsEnv) {
          this.formGroup.patchValue({
            CENTRAL_DOMAINS: centralDomainsEnv.value
          });
        }
      }
    } catch (error) {
      console.error("Erro ao carregar os envs: ", error);
    }
  }

  updateEnv(): void {
    const updatedEnv = {
      name: 'CENTRAL_DOMAINS',
      value: this.formGroup.value.CENTRAL_DOMAINS
    };

    this.envDao.updateEnv(updatedEnv).then((env: any) => {
      console.log('Env updated:', env);
      this.dialog.closeAll();
      this.loadEnvs();
    }).catch((error: any) => {
      console.error('Error updating env:', error);
    });
  }
}