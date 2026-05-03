import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let CadeiaValorListProcessosEntregasComponent = class CadeiaValorListProcessosEntregasComponent extends PageListBase {
    constructor(injector) {
        super(injector, CadeiaValorProcesso, CadeiaValorProcessoDaoService);
        this.injector = injector;
        this.buttons = [];
        this.filterWhere = (filter) => {
            let form = filter.value;
            let result = [];
            if (form.cadeia_valor_id?.length) {
                result.push(["cadeia_valor_id", "==", form.cadeia_valor_id]);
            }
            if (form.nome?.length) {
                result.push(["or", ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
            }
            return result;
        };
        this.allRows = [];
        this.onGridLoad = async (rows) => {
            if (rows) {
                if (rows !== this.allRows) {
                    this.allRows = [...rows];
                }
                const sorted = this.sortProcessos(this.allRows);
                if (rows && rows !== this.allRows) {
                    rows.splice(0, rows.length, ...sorted);
                }
                else if (this.grid) {
                    this.grid.items = sorted;
                    this.grid.cdRef.detectChanges();
                }
            }
        };
        this.cadeiaValorDao = injector.get(CadeiaValorDaoService);
        this.cadeiaValorProcessoDao = injector.get(CadeiaValorProcessoDaoService);
        this.title = this.lex.translate("Processos");
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            cadeia_valor_id: { default: null },
        });
        this.OPTION_INFORMACOES.onClick = (processo) => this.go.navigate({ route: ['gestao', 'cadeia-valor', 'processo', processo.id, 'consult'] }, { modal: true });
        this.addOption(this.OPTION_INFORMACOES);
        this.rowsLimit = 10000;
    }
    filterClear(filter) {
        super.filterClear(filter);
    }
    sortProcessos(processos) {
        const ids = new Set(processos.map(o => o.id));
        const buildTree = (paiId = null, nivel = 0, prefixo = "") => {
            const children = processos
                .filter(p => {
                if (paiId === null) {
                    return !p.processo_pai_id || !ids.has(p.processo_pai_id);
                }
                return p.processo_pai_id === paiId;
            })
                .sort((a, b) => {
                const seqA = a.sequencia || 0;
                const seqB = b.sequencia || 0;
                if (seqA !== seqB)
                    return seqA - seqB;
                return (a.nome || "").localeCompare(b.nome || "");
            });
            return children.flatMap(p => {
                const numero = prefixo + (prefixo ? "." : "") + (p.sequencia || "");
                p._nivel = nivel;
                p._numero = numero;
                return [p, ...buildTree(p.id, nivel + 1, numero)];
            });
        };
        return buildTree(null);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], CadeiaValorListProcessosEntregasComponent.prototype, "grid", void 0);
CadeiaValorListProcessosEntregasComponent = __decorate([
    Component({
        selector: 'cadeia-valor-list-processos-entregas',
        templateUrl: './cadeia-valor-list-processos-entregas.component.html',
        styleUrls: ['./cadeia-valor-list-processos-entregas.component.scss'],
        standalone: false
    })
], CadeiaValorListProcessosEntregasComponent);
export { CadeiaValorListProcessosEntregasComponent };
//# sourceMappingURL=cadeia-valor-list-processos-entregas.component.js.map