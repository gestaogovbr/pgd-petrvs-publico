import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let CadeiaValorListGridComponent = class CadeiaValorListGridComponent extends PageListBase {
    constructor(injector) {
        super(injector, CadeiaValor, CadeiaValorDaoService);
        this.injector = injector;
        this.selectable = false;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            /*if(form.nome?.length) {
              result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }*/
            if (form.unidade_id?.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.data_inicio) {
                result.push(["data_fim", ">=", form.data_inicio]);
            }
            if (form.data_fim) {
                result.push(["data_inicio", "<=", form.data_fim]);
            }
            return result;
        };
        this.entidadeDao = injector.get(EntidadeDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.join = ['processos'];
        this.code = "MOD_CADV";
        /* Inicializações */
        this.filter = this.fh.FormBuilder({
            data_inicio: { default: null },
            data_fim: { default: null },
            //nome: {default: ""},
            unidade_id: { default: "" },
            entidade_id: { default: null }
        });
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_EXCLUIR, "MOD_CADV_EXCL");
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
    onChangeData() {
        const di = new Date(this.filter.controls.data_inicio.value).getTime();
        const df = new Date(this.filter.controls.data_fim.value).getTime();
        if (df < di) {
            let diaI = new Date(di);
            diaI.setDate(diaI.getDate() + 1);
            this.filter.controls.data_fim.setValue(diaI);
        }
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], CadeiaValorListGridComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('unidade', { static: true })
], CadeiaValorListGridComponent.prototype, "unidade", void 0);
__decorate([
    Input()
], CadeiaValorListGridComponent.prototype, "snapshot", void 0);
__decorate([
    Input()
], CadeiaValorListGridComponent.prototype, "fixedFilter", void 0);
__decorate([
    Input()
], CadeiaValorListGridComponent.prototype, "selectable", void 0);
CadeiaValorListGridComponent = __decorate([
    Component({
        selector: 'cadeia-valor-list-grid',
        templateUrl: './cadeia-valor-list-grid.component.html',
        styleUrls: ['./cadeia-valor-list-grid.component.scss'],
        standalone: false
    })
], CadeiaValorListGridComponent);
export { CadeiaValorListGridComponent };
//# sourceMappingURL=cadeia-valor-list-grid.component.js.map