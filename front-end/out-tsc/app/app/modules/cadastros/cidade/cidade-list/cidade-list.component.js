import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { Cidade } from 'src/app/models/cidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let CidadeListComponent = class CidadeListComponent extends PageListBase {
    constructor(injector) {
        super(injector, Cidade, CidadeDaoService);
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
        this.title = this.lex.translate("Cidades");
        this.code = "MOD_CID";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_EXCLUIR, "MOD_CID_EXCL");
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], CidadeListComponent.prototype, "grid", void 0);
CidadeListComponent = __decorate([
    Component({
        selector: 'app-cidade-list',
        templateUrl: './cidade-list.component.html',
        styleUrls: ['./cidade-list.component.scss'],
        standalone: false
    })
], CidadeListComponent);
export { CidadeListComponent };
//# sourceMappingURL=cidade-list.component.js.map