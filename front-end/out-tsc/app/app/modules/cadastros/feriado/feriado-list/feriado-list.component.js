import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { FeriadoDaoService } from 'src/app/dao/feriado-dao.service';
import { Feriado } from 'src/app/models/feriado.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let FeriadoListComponent = class FeriadoListComponent extends PageListBase {
    constructor(injector, dao) {
        super(injector, Feriado, FeriadoDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            return result;
        };
        this.dao = dao;
        /* Inicializações */
        this.title = this.lex.translate("Feriados");
        this.code = "MOD_FER";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
        });
        // Testa se o usuário possui permissão para exibir dados do feriado
        if (this.auth.hasPermissionTo("MOD_FER")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o feriado
        if (this.auth.hasPermissionTo("MOD_FER_EXCL")) {
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
], FeriadoListComponent.prototype, "grid", void 0);
FeriadoListComponent = __decorate([
    Component({
        selector: 'app-feriado-list',
        templateUrl: './feriado-list.component.html',
        styleUrls: ['./feriado-list.component.scss'],
        standalone: false
    })
], FeriadoListComponent);
export { FeriadoListComponent };
//# sourceMappingURL=feriado-list.component.js.map