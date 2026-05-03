import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Entrega } from 'src/app/models/entrega.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let EntregaListComponent = class EntregaListComponent extends PageListBase {
    constructor(injector) {
        super(injector, Entrega, EntregaDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.nome?.length)
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            if (form.tipo_indicador?.length)
                result.push(["tipo_indicador", "==", form.tipo_indicador]);
            return result;
        };
        /* Inicializações */
        this.join = ["unidade:id,sigla,nome"];
        this.title = this.lex.translate('Modelos de Entregas');
        this.code = "MOD_ENTRG";
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            tipo_indicador: { default: null }
        });
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_EXCLUIR, "MOD_ENTRG_EXCL");
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], EntregaListComponent.prototype, "grid", void 0);
EntregaListComponent = __decorate([
    Component({
        selector: 'app-entrega-list',
        templateUrl: './entrega-list.component.html',
        styleUrls: ['./entrega-list.component.scss'],
        standalone: false
    })
], EntregaListComponent);
export { EntregaListComponent };
//# sourceMappingURL=entrega-list.component.js.map