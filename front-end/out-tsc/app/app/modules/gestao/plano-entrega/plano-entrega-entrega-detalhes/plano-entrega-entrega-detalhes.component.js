import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { PlanoEntregaEntregaDaoService } from "src/app/dao/plano-entrega-entrega-dao.service";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
import { PlanoEntregaService } from "../plano-entrega.service";
let PlanoEntregaEntregaDetalhesComponent = class PlanoEntregaEntregaDetalhesComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.planoEntregaEntregaDao = injector.get(PlanoEntregaEntregaDaoService);
        this.planoEntregaService = injector.get(PlanoEntregaService);
    }
    ngOnInit() {
        super.ngOnInit();
        this.entrega = this.metadata?.entrega;
    }
    async showPlanejamento(objetivo_id) {
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo_id] }, { modal: true });
    }
    async showCadeiaValor(processo_id) {
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', 'processos', processo_id] }, { modal: true });
    }
};
PlanoEntregaEntregaDetalhesComponent = __decorate([
    Component({
        selector: 'plano-entrega-entrega-detalhes',
        templateUrl: './plano-entrega-entrega-detalhes.component.html',
        styleUrls: ['./plano-entrega-entrega-detalhes.component.scss'],
        standalone: false
    })
], PlanoEntregaEntregaDetalhesComponent);
export { PlanoEntregaEntregaDetalhesComponent };
//# sourceMappingURL=plano-entrega-entrega-detalhes.component.js.map