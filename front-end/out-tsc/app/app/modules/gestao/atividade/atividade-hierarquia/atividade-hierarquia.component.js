import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { PageBase } from 'src/app/modules/base/page-base';
import { PlanoEntregaService } from '../../plano-entrega/plano-entrega.service';
let AtividadeHierarquiaComponent = class AtividadeHierarquiaComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.atividadeDao = injector.get(AtividadeDaoService);
        this.planoEntregaService = injector.get(PlanoEntregaService);
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.urlParams.get("id")) {
            this.loadAtividade(this.urlParams.get("id"));
        }
    }
    async loadAtividade(atividade_id) {
        const result = await this.atividadeDao.getHierarquia(atividade_id);
        if (result) {
            this.atividade = result;
        }
    }
};
AtividadeHierarquiaComponent = __decorate([
    Component({
        selector: 'atividade-hierarquia',
        templateUrl: './atividade-hierarquia.component.html',
        styleUrls: ['./atividade-hierarquia.component.scss'],
        standalone: false
    })
], AtividadeHierarquiaComponent);
export { AtividadeHierarquiaComponent };
//# sourceMappingURL=atividade-hierarquia.component.js.map