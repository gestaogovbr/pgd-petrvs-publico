import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EnvioItemDaoService } from 'src/app/dao/envio-item-dao.service';
import { EnvioItem } from 'src/app/models/envio-item.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let EnvioItemEntregaListComponent = class EnvioItemEntregaListComponent extends PageListBase {
    constructor(injector, dao) {
        super(injector, EnvioItem, EnvioItemDaoService);
        this.injector = injector;
        this.envio_id = null;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            result.push(["tipo", '=', 'entrega']);
            result.push(["envio_id", '=', form.envio_id]);
            result.push(["sucesso", '=', form.sucesso]);
            if (form.uid) {
                result.push(["uid", '=', form.uid]);
            }
            if (form.id) {
                result.push(["planoEntrega.numero", '=', form.id]);
            }
            return result;
        };
        this.consult = async (doc) => {
            this.go.navigate({ route: ['logs', 'envio-items', doc.id, "consult"] });
        };
        /* Inicializações */
        this.envioItemDaoService = dao;
        this.title = this.lex.translate("Histórico de Planos de Entrega Enviados");
        this.filter = this.fh.FormBuilder({
            envio_id: { default: this.envio_id },
            tipo: { default: 'entrega' },
            id: { default: null },
            uid: { default: null },
            sucesso: { default: "" },
        });
        this.join = [
            "planoEntrega:id,numero,data_inicio,data_fim,programa_id,unidade_id",
            "planoEntrega.programa:id,nome",
            "planoEntrega.unidade:id,sigla",
        ];
        this.orderBy = [['created_at', 'asc']];
    }
    async ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cdRef.detectChanges();
    }
    ;
    filterClear(filter) {
        filter.controls.tipo.setValue("");
        filter.controls.uid.setValue("");
        filter.controls.sucesso.setValue("");
    }
    dynamicButtons(row) {
        let result = [];
        if (this.auth.hasPermissionTo("MOD_PENT"))
            result.push({ icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this) });
        return result;
    }
    ngOnInit() {
        super.ngOnInit();
        this.filter?.controls.envio_id.setValue(this.urlParams.get("id"));
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], EnvioItemEntregaListComponent.prototype, "grid", void 0);
EnvioItemEntregaListComponent = __decorate([
    Component({
        selector: 'envio-item-entrega-list',
        templateUrl: './envio-item-entrega-list.component.html',
        styleUrls: ['./envio-item-entrega-list.component.scss'],
        standalone: false
    })
], EnvioItemEntregaListComponent);
export { EnvioItemEntregaListComponent };
//# sourceMappingURL=envio-item-entrega-list.component.js.map