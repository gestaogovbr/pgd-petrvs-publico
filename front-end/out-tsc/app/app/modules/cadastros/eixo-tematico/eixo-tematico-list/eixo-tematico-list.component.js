import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let EixoTematicoListComponent = class EixoTematicoListComponent extends PageListBase {
    constructor(injector) {
        super(injector, EixoTematico, EixoTematicoDaoService);
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
        this.title = this.lex.translate('Eixos Temáticos');
        this.orderBy = [['nome', 'asc']];
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        // Testa se o usuário possui permissão para consultar eixos temáticos
        if (this.auth.hasPermissionTo("MOD_EXTM")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir eixos temáticos
        if (this.auth.hasPermissionTo("MOD_EXTM_EXCL")) {
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
], EixoTematicoListComponent.prototype, "grid", void 0);
EixoTematicoListComponent = __decorate([
    Component({
        selector: 'app-eixo-tematico-list',
        templateUrl: './eixo-tematico-list.component.html',
        styleUrls: ['./eixo-tematico-list.component.scss'],
        standalone: false
    })
], EixoTematicoListComponent);
export { EixoTematicoListComponent };
//# sourceMappingURL=eixo-tematico-list.component.js.map