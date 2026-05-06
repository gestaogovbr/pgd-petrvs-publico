import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let PlanejamentoListObjetivosEntregasComponent = class PlanejamentoListObjetivosEntregasComponent extends PageListBase {
    constructor(injector) {
        super(injector, PlanejamentoObjetivo, PlanejamentoObjetivoDaoService);
        this.injector = injector;
        this.buttons = [];
        this.allRows = [];
        this.onGridLoad = async (rows) => {
            if (rows) {
                if (rows !== this.allRows) {
                    this.allRows = [...rows];
                }
                const nullKey = '__null__';
                const groups = new Map();
                for (const row of this.allRows) {
                    const key = row.eixo_tematico_id || nullKey;
                    if (!groups.has(key))
                        groups.set(key, []);
                    groups.get(key).push(row);
                }
                const sortedGroups = Array.from(groups.entries())
                    .map(([key, objetivos]) => ({
                    id: key,
                    objetivos
                }))
                    .sort((a, b) => {
                    if (a.id === nullKey)
                        return 1;
                    if (b.id === nullKey)
                        return -1;
                    const eixoA = a.objetivos[0]?.eixo_tematico?.nome || "";
                    const eixoB = b.objetivos[0]?.eixo_tematico?.nome || "";
                    return eixoA.localeCompare(eixoB);
                });
                const sorted = sortedGroups.flatMap(g => this.sortObjetivos(g.objetivos));
                if (rows && rows !== this.allRows) {
                    rows.splice(0, rows.length, ...sorted);
                }
                else if (this.grid) {
                    this.grid.items = sorted;
                    this.grid.cdRef.detectChanges();
                }
            }
        };
        this.filterWhere = (filter) => {
            let form = filter.value;
            let result = [];
            if (form.planejamento_id?.length) {
                result.push(["planejamento_id", "==", form.planejamento_id]);
            }
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            return result;
        };
        this.join = ['eixo_tematico:id,nome,cor,icone', 'objetivo_superior:id,nome'];
        this.groupBy = [{ field: 'eixo_tematico_id', label: 'Eixo Temático' }];
        this.planejamentoDao = injector.get(PlanejamentoDaoService);
        this.planejamentoObjetivoDao = injector.get(PlanejamentoObjetivoDaoService);
        this.title = this.lex.translate("Objetivos") + ' ' + this.lex.translate("do Planejamento Institucional");
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            planejamento_id: { default: null }
        });
        this.OPTION_INFORMACOES.onClick = (objetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true });
        this.addOption(this.OPTION_INFORMACOES);
        this.rowsLimit = 10000;
    }
    sortObjetivos(objetivos) {
        const ids = new Set(objetivos.map(o => o.id));
        const buildTree = (paiId = null) => {
            const children = objetivos
                .filter(p => {
                if (paiId === null) {
                    return !p.objetivo_pai_id || !ids.has(p.objetivo_pai_id);
                }
                return p.objetivo_pai_id === paiId;
            })
                .sort((a, b) => (a.sequencia || 0) - (b.sequencia || 0));
            return children.flatMap(p => [p, ...buildTree(p.id)]);
        };
        return buildTree(null);
    }
    getEixoTematicoById(eixoId) {
        if (!eixoId?.length)
            return null;
        return this.allRows.find(x => x.eixo_tematico_id === eixoId)?.eixo_tematico || null;
    }
    getEixoHeaderTextColor(bgColor) {
        return this.util.contrastColor(bgColor || '#e0e0e0');
    }
    filterClear(filter) {
        super.filterClear(filter);
        this.filter?.controls.nome.setValue("");
    }
    getNome(row) {
        return row.nome;
    }
    getNivel(row) {
        let paiId = row.objetivo_pai_id;
        let niveis = 0;
        while (paiId) {
            let atual = this.allRows.find(x => x.id == paiId);
            if (!atual)
                break;
            niveis++;
            paiId = atual?.objetivo_pai_id || null;
        }
        return niveis;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], PlanejamentoListObjetivosEntregasComponent.prototype, "grid", void 0);
PlanejamentoListObjetivosEntregasComponent = __decorate([
    Component({
        selector: 'planejamento-list-objetivos-entregas',
        templateUrl: './planejamento-list-objetivos-entregas.component.html',
        styleUrls: ['./planejamento-list-objetivos-entregas.component.scss'],
        standalone: false
    })
], PlanejamentoListObjetivosEntregasComponent);
export { PlanejamentoListObjetivosEntregasComponent };
//# sourceMappingURL=planejamento-list-objetivos-entregas.component.js.map