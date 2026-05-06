import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { PlanoEntregaEntregaDaoService } from "src/app/dao/plano-entrega-entrega-dao.service";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
let PlanoEntregaEntregasVinculadasComponent = class PlanoEntregaEntregasVinculadasComponent extends PageFrameBase {
    set entregaId(value) {
        if (this._entregaId != value) {
            this._entregaId = value;
        }
    }
    get entregaId() {
        return this._entregaId;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.loader = false;
        this.entregasVinculadas = [];
        this.planoEntregaEntregaDao = injector.get(PlanoEntregaEntregaDaoService);
        this.join = ["unidade"];
    }
    ngOnInit() {
        super.ngOnInit();
        this.loadData();
    }
    async loadData() {
        this.loader = true;
        try {
            this.entregasVinculadas = await this.planoEntregaEntregaDao.hierarquia(this._entregaId);
            this.cdRef.detectChanges();
            this.loader = false;
        }
        catch (e) {
            console.log("Erro");
        }
    }
    async showDetalhes(entrega) {
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', entrega.id, "detalhes"] }, {
            metadata: {
                entrega: entrega
            }
        });
    }
};
__decorate([
    Input()
], PlanoEntregaEntregasVinculadasComponent.prototype, "entregaId", null);
PlanoEntregaEntregasVinculadasComponent = __decorate([
    Component({
        selector: 'plano-entrega-entregas-vinculadas',
        templateUrl: './plano-entrega-entregas-vinculadas.component.html',
        styleUrls: ['./plano-entrega-entregas-vinculadas.component.scss'],
        standalone: false
    })
], PlanoEntregaEntregasVinculadasComponent);
export { PlanoEntregaEntregasVinculadasComponent };
//# sourceMappingURL=plano-entrega-entregas-vinculadas.component.js.map