import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { TipoProcesso } from 'src/app/models/tipo-processo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let TipoProcessoListComponent = class TipoProcessoListComponent extends PageListBase {
    constructor(injector) {
        super(injector, TipoProcesso, TipoProcessoDaoService);
        this.injector = injector;
        this.toolbarButtons = [];
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            return result;
        };
        /* Inicializações */
        this.title = this.lex.translate("Tipos de Processo");
        this.code = "MOD_TIPO_PROC";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_EXCLUIR, "MOD_TIPO_PROC_EXCL");
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], TipoProcessoListComponent.prototype, "grid", void 0);
TipoProcessoListComponent = __decorate([
    Component({
        selector: 'app-tipo-processo-list',
        templateUrl: './tipo-processo-list.component.html',
        styleUrls: ['./tipo-processo-list.component.scss'],
        standalone: false
    })
], TipoProcessoListComponent);
export { TipoProcessoListComponent };
//# sourceMappingURL=tipo-processo-list.component.js.map