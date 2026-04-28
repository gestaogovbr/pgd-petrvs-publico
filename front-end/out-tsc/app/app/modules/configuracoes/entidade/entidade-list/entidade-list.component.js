import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { Entidade } from 'src/app/models/entidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let EntidadeListComponent = class EntidadeListComponent extends PageListBase {
    constructor(injector) {
        super(injector, Entidade, EntidadeDaoService);
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
        this.title = this.lex.translate("Entidades");
        this.code = "MOD_ENTD";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        this.addOption(this.OPTION_INFORMACOES);
        //this.addOption(this.OPTION_EXCLUIR, "MOD_ENTD_EXCL");
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
        // Testa se o usuário possui permissão para configurar a entidade
        if (this.auth.hasPermissionTo("MOD_CFG_ENTD")) {
            this.options.push({
                icon: "bi bi-tools",
                label: "Configurações",
                onClick: (entidade) => {
                    this.go.navigate({ route: ['configuracoes', 'entidade', entidade.id, 'conf'] }, { modal: true });
                }
            });
        }
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], EntidadeListComponent.prototype, "grid", void 0);
EntidadeListComponent = __decorate([
    Component({
        selector: 'app-entidade-list',
        templateUrl: './entidade-list.component.html',
        styleUrls: ['./entidade-list.component.scss'],
        standalone: false
    })
], EntidadeListComponent);
export { EntidadeListComponent };
//# sourceMappingURL=entidade-list.component.js.map