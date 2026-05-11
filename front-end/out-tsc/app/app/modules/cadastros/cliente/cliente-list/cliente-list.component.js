import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ClienteDaoService } from 'src/app/dao/cliente-dao.service';
import { TipoClienteDaoService } from 'src/app/dao/tipo-cliente-dao.service';
import { Cliente } from 'src/app/models/cliente.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let ClienteListComponent = class ClienteListComponent extends PageListBase {
    constructor(injector, dao) {
        super(injector, Cliente, ClienteDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            if (filter?.controls.tipo_cliente_id?.value?.length) {
                result.push(["tipo_cliente_id", "==", filter?.controls.tipo_cliente_id?.value]);
            }
            return result;
        };
        this.tipoClienteDao = injector.get(TipoClienteDaoService);
        this.dao = dao;
        /* Inicializações */
        this.title = this.lex.translate("Clientes");
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            tipo_cliente_id: { default: null }
        });
        this.options.push({
            icon: "bi bi-trash",
            label: "Excluir",
            onClick: this.delete.bind(this)
        });
        this.join = ["tipoCliente"];
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        super.filterClear(filter);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], ClienteListComponent.prototype, "grid", void 0);
ClienteListComponent = __decorate([
    Component({
        selector: 'app-cliente-list',
        templateUrl: './cliente-list.component.html',
        styleUrls: ['./cliente-list.component.scss'],
        standalone: false
    })
], ClienteListComponent);
export { ClienteListComponent };
//# sourceMappingURL=cliente-list.component.js.map