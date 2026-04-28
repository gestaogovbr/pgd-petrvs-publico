import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoClienteDaoService } from 'src/app/dao/tipo-cliente-dao.service';
import { TipoCliente } from 'src/app/models/tipo-cliente.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let TipoClienteListComponent = class TipoClienteListComponent extends PageListBase {
    constructor(injector) {
        super(injector, TipoCliente, TipoClienteDaoService);
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
        this.title = this.lex.translate("Tipos de Clientes");
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        if (this.auth.hasPermissionTo("MOD_TIPO_CLI_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        super.filterClear(filter);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], TipoClienteListComponent.prototype, "grid", void 0);
TipoClienteListComponent = __decorate([
    Component({
        selector: 'app-tipo-cliente-list',
        templateUrl: './tipo-cliente-list.component.html',
        styleUrls: ['./tipo-cliente-list.component.scss'],
        standalone: false
    })
], TipoClienteListComponent);
export { TipoClienteListComponent };
//# sourceMappingURL=tipo-cliente-list.component.js.map