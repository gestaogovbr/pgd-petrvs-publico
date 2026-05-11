import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { PlanoEntregaEntregaProgressoDaoService } from "src/app/dao/plano-entrega-entrega-progresso-dao.service";
import { PlanoEntregaEntregaProgresso } from "src/app/models/plano-entrega-entrega-progresso.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { PlanoEntregaService } from "../plano-entrega.service";
let PlanoEntregaListProgressoComponent = class PlanoEntregaListProgressoComponent extends PageListBase {
    constructor(injector) {
        super(injector, PlanoEntregaEntregaProgresso, PlanoEntregaEntregaProgressoDaoService);
        this.injector = injector;
        this.planoEntregaEntregaId = "";
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.data_inicial_progresso)
                result.push(["data_progresso", ">=", form.data_inicial_progresso]);
            if (form.data_final_progresso)
                result.push(["data_progresso", "<=", form.data_final_progresso]);
            result.push(["plano_entrega_entrega_id", "==", this.planoEntregaEntregaId]);
            return result;
        };
        this.planoEntregaService = injector.get(PlanoEntregaService);
        this.title = this.lex.translate("Histórico de Execução");
        this.orderBy = [['data_progresso', 'desc']];
        this.join = ['plano_entrega_entrega.entrega'];
        this.filter = this.fh.FormBuilder({
            data_inicial_progresso: { default: null },
            data_final_progresso: { default: null },
        });
        this.addOption(Object.assign({ onClick: this.delete.bind(this) }, this.OPTION_EXCLUIR), "MOD_PENT_ENTR_PRO_EXCL");
    }
    onGridLoad(rows) {
        rows?.forEach(x => x.entrega = x.plano_entrega_entrega?.entrega);
    }
    ngOnInit() {
        super.ngOnInit();
        this.planoEntregaEntregaId = this.urlParams.get("entrega_id") || "";
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], PlanoEntregaListProgressoComponent.prototype, "grid", void 0);
PlanoEntregaListProgressoComponent = __decorate([
    Component({
        selector: 'app-plano-entrega-list-progresso',
        templateUrl: './plano-entrega-list-progresso.component.html',
        styleUrls: ['./plano-entrega-list-progresso.component.scss'],
        standalone: false
    })
], PlanoEntregaListProgressoComponent);
export { PlanoEntregaListProgressoComponent };
//# sourceMappingURL=plano-entrega-list-progresso.component.js.map