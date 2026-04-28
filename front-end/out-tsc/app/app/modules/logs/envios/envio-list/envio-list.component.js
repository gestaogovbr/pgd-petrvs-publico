import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EnvioDaoService } from 'src/app/dao/envio-dao.service';
import { Envio } from 'src/app/models/envio.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let EnvioListComponent = class EnvioListComponent extends PageListBase {
    constructor(injector, dao) {
        super(injector, Envio, EnvioDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.data_inicio) {
                result.push(["created_at", ">=", form.data_inicio]);
            }
            ;
            if (form.data_fim) {
                result.push(["created_at", "<=", form.data_fim]);
            }
            ;
            return result;
        };
        this.participantes = async (doc) => {
            this.go.navigate({ route: ['envios', doc.id, "participantes"] });
        };
        this.trabalhos = async (doc) => {
            this.go.navigate({ route: ['envios', doc.id, "trabalhos"] });
        };
        this.entregas = async (doc) => {
            this.go.navigate({ route: ['envios', doc.id, "entregas"] });
        };
        /* Inicializações */
        this.title = this.lex.translate("Logs dos Envios à API PGD");
        this.filter = this.fh.FormBuilder({
            data_inicio: { default: null },
            data_fim: { default: null }
        });
        this.orderBy = [['created_at', 'desc']];
        this.BOTAO_PARTICIPANTES = {
            label: "Participantes",
            icon: "bi bi-users",
            color: "btn-outline-info",
            onClick: this.participantes.bind(this),
        };
        this.BOTAO_TRABALHOS = {
            label: "Planos de Trabalho",
            icon: "bi bi-users",
            color: "btn-outline-info",
            onClick: this.trabalhos.bind(this),
        };
        this.BOTAO_ENTREGAS = {
            label: "Planos de Entrega",
            icon: "bi bi-users",
            color: "btn-outline-info",
            onClick: this.entregas.bind(this),
        };
    }
    async ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cdRef.detectChanges();
    }
    ;
    filterClear(filter) {
        filter.controls.data_inicio.setValue("");
        filter.controls.data_fim.setValue("");
    }
    dynamicButtons(row) {
        let result = [];
        if (this.auth.hasPermissionTo("MOD_PENT"))
            result.push({ icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this) });
        return result;
    }
    dynamicOptions(row) {
        let result = [];
        result.push(this.BOTAO_PARTICIPANTES);
        result.push(this.BOTAO_ENTREGAS);
        result.push(this.BOTAO_TRABALHOS);
        return result;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], EnvioListComponent.prototype, "grid", void 0);
EnvioListComponent = __decorate([
    Component({
        selector: 'envio-list',
        templateUrl: './envio-list.component.html',
        styleUrls: ['./envio-list.component.scss'],
        standalone: false
    })
], EnvioListComponent);
export { EnvioListComponent };
//# sourceMappingURL=envio-list.component.js.map