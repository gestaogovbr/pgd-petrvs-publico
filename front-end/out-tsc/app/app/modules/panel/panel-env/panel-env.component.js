import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { EnvDaoService } from "src/app/dao/env-dao.service";
import { Env } from '../../../models/env.model';
import { PageListBase } from "../../base/page-list-base";
let PanelEnvComponent = class PanelEnvComponent extends PageListBase {
    constructor(injector) {
        super(injector, Env, EnvDaoService);
        this.injector = injector;
        this.envs = [];
        this.isDisabled = true;
        this.envDao = injector.get(EnvDaoService);
        this.title = "Gerenciar Env";
        this.formGroup = this.fb.group({
            CENTRAL_DOMAINS: ['']
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.loadEnvs();
    }
    async loadEnvs() {
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
        }
        catch (error) {
            console.error("Erro ao carregar os envs: ", error);
        }
    }
    updateEnv() {
        const updatedEnv = {
            name: 'CENTRAL_DOMAINS',
            value: this.formGroup.value.CENTRAL_DOMAINS
        };
        this.envDao.updateEnv(updatedEnv).then((env) => {
            console.log('Env updated:', env);
            this.dialog.closeAll();
            this.loadEnvs();
        }).catch((error) => {
            console.error('Error updating env:', error);
        });
    }
};
PanelEnvComponent = __decorate([
    Component({
        selector: 'app-panel-env',
        templateUrl: './panel-env.component.html',
        styleUrls: ['./panel-env.component.scss'],
        standalone: false
    })
], PanelEnvComponent);
export { PanelEnvComponent };
//# sourceMappingURL=panel-env.component.js.map