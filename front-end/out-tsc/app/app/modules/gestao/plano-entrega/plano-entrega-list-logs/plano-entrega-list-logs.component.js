import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { Change } from 'src/app/models/change.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let PlanoEntregaListLogsComponent = class PlanoEntregaListLogsComponent extends PageListBase {
    constructor(injector, dao) {
        super(injector, Change, ChangeDaoService);
        this.injector = injector;
        this.responsaveis = [];
        this.planoId = "";
        this.action = "";
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            result.push(["table_name", "==", "planos_entregas"]);
            result.push(["row_id", "==", this.planoId]);
            if (form.responsavel_id?.length) {
                result.push(["user_id", "==", form.responsavel_id == "null" ? null : form.responsavel_id]);
            }
            ;
            if (form.data_inicio) {
                result.push(["date_time", ">=", form.data_inicio]);
            }
            ;
            if (form.data_fim) {
                result.push(["date_time", "<=", form.data_fim]);
            }
            ;
            if (form.tipo?.length) {
                result.push(["type", "==", form.tipo]);
            }
            ;
            return result;
        };
        /* Inicializações */
        this.planoEntregaDao = injector.get(PlanoEntregaDaoService);
        this.title = "Logs de Planos de Entregas";
        this.filter = this.fh.FormBuilder({
            responsavel_id: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" },
            tipo: { default: "" }
        });
        this.orderBy = [['id', 'desc']];
    }
    ngOnInit() {
        super.ngOnInit();
        this.planoId = this.urlParams?.get("id") || "";
        this.planoEntregaDao.getById(this.planoId).then(plano => this.planoEntrega = plano);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        // this.selectResponsaveis!.loading = true;
        // this.dao?.showResponsaveis().then(responsaveis => {
        //   this.responsaveis = responsaveis || [];
        //   this.selectResponsaveis!.loading = false;
        // });
    }
    filterClear(filter) {
        filter.controls.responsavel_id.setValue("");
        filter.controls.data_inicio.setValue("");
        filter.controls.data_fim.setValue("");
        filter.controls.tipo.setValue("");
        super.filterClear(filter);
    }
    preparaDelta(row) {
        this.action = row.type;
        let novoDelta = row.delta instanceof Array ? row.delta : Object.entries(row.delta);
        novoDelta.forEach((element) => {
            if (element[1] instanceof Date)
                element[1] = new Date(element[1]).toUTCString();
            if (element.length > 2 && element[2] instanceof Date)
                element[2] = new Date(element[2]).toUTCString();
        });
        return novoDelta;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], PlanoEntregaListLogsComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('selectResponsaveis', { static: false })
], PlanoEntregaListLogsComponent.prototype, "selectResponsaveis", void 0);
PlanoEntregaListLogsComponent = __decorate([
    Component({
        selector: 'plano-entrega-list-logs',
        templateUrl: './plano-entrega-list-logs.component.html',
        styleUrls: ['./plano-entrega-list-logs.component.scss'],
        standalone: false
    })
], PlanoEntregaListLogsComponent);
export { PlanoEntregaListLogsComponent };
//# sourceMappingURL=plano-entrega-list-logs.component.js.map