import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { TipoMotivoAfastamento } from 'src/app/models/tipo-motivo-afastamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let TipoMotivoAfastamentoListComponent = class TipoMotivoAfastamentoListComponent extends PageListBase {
    constructor(injector) {
        super(injector, TipoMotivoAfastamento, TipoMotivoAfastamentoDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            return result;
        };
        /* Inicializações */
        this.title = this.lex.translate("Motivos de Afastamento");
        this.code = "MOD_TIPO_MTV_AFT";
        this.filter = this.fh.FormBuilder({
            codigo: { default: null },
            nome: { default: "" },
            icone: { default: "" },
            cor: { default: "" },
            horas: { default: "" },
            integracao: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" },
        });
        // Testa se o usuário possui permissão para exibir dados do tipo de motivo de afastamento
        if (this.auth.hasPermissionTo("MOD_TIPO_MTV_AFT")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o tipo de motivo de afastamento
        if (this.auth.hasPermissionTo("MOD_TIPO_MTV_AFT_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        super.filterClear(filter);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], TipoMotivoAfastamentoListComponent.prototype, "grid", void 0);
TipoMotivoAfastamentoListComponent = __decorate([
    Component({
        selector: 'app-tipo-motivo-afastamento-list',
        templateUrl: './tipo-motivo-afastamento-list.component.html',
        styleUrls: ['./tipo-motivo-afastamento-list.component.scss'],
        standalone: false
    })
], TipoMotivoAfastamentoListComponent);
export { TipoMotivoAfastamentoListComponent };
//# sourceMappingURL=tipo-motivo-afastamento-list.component.js.map