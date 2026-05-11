import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { TipoJustificativa } from 'src/app/models/tipo-justificativa.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let TipoJustificativaListComponent = class TipoJustificativaListComponent extends PageListBase {
    constructor(injector) {
        super(injector, TipoJustificativa, TipoJustificativaDaoService);
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
        this.title = this.lex.translate("Tipos de Justificativa");
        this.code = "MOD_TIPO_JUST";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        // Testa se o usuário possui permissão para exibir dados do tipo de justificativa
        if (this.auth.hasPermissionTo("MOD_TIPO_JUST")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o tipo de justificativa
        if (this.auth.hasPermissionTo("MOD_TIPO_JUST_EXCL")) {
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
], TipoJustificativaListComponent.prototype, "grid", void 0);
TipoJustificativaListComponent = __decorate([
    Component({
        selector: 'app-tipo-justificativa-list',
        templateUrl: './tipo-justificativa-list.component.html',
        styleUrls: ['./tipo-justificativa-list.component.scss'],
        standalone: false
    })
], TipoJustificativaListComponent);
export { TipoJustificativaListComponent };
//# sourceMappingURL=tipo-justificativa-list.component.js.map