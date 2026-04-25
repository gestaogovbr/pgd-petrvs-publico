import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { Perfil } from 'src/app/models/perfil.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let PerfilListComponent = class PerfilListComponent extends PageListBase {
    constructor(injector) {
        super(injector, Perfil, PerfilDaoService);
        this.injector = injector;
        this.options = [];
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            return result;
        };
        /* Inicializações */
        this.title = this.lex.translate("Perfis");
        this.code = "MOD_CFG_PERFS";
        this.orderBy = [['nome', 'asc']];
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], PerfilListComponent.prototype, "grid", void 0);
PerfilListComponent = __decorate([
    Component({
        selector: 'app-perfil-list',
        templateUrl: './perfil-list.component.html',
        styleUrls: ['./perfil-list.component.scss'],
        standalone: false
    })
], PerfilListComponent);
export { PerfilListComponent };
//# sourceMappingURL=perfil-list.component.js.map