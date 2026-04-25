import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
let PlanejamentoListComponent = class PlanejamentoListComponent extends PageListBase {
    constructor(injector) {
        super(injector, Planejamento, PlanejamentoDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.so_entidade) {
                filter.controls.unidade_id.setValue(null);
                result.push(["unidade_id", "==", null]);
            }
            else {
                if (form.unidade_id)
                    result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            if (form.data_inicio) {
                result.push(["data_inicio", ">=", form.data_inicio]);
            }
            if (form.data_fim) {
                result.push(["data_fim", "<=", form.data_fim]);
            }
            return result;
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        /* Inicializações */
        this.code = "MOD_PLAN_INST";
        this.title = this.lex.translate('Planejamentos Institucionais');
        this.filter = this.fh.FormBuilder({
            data_inicio: { default: null },
            data_fim: { default: null },
            nome: { default: "" },
            unidade_id: { default: null },
            so_entidade: { default: false },
            agrupar: { default: true },
        });
        this.join = [
            'unidade:id,nome,sigla',
            'objetivos',
            'objetivos.eixo_tematico:id,nome,cor,icone',
            'objetivos.objetivo_superior:id,nome',
            'planejamento_superior:id,nome',
            'planejamento_superior.objetivos'
        ];
        // Testa se o usuário possui permissão para exibir planejamentos institucionais
        if (this.auth.hasPermissionTo("MOD_PLAN_INST")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir planejamentos institucionais
        if (this.auth.hasPermissionTo("MOD_PLAN_INST_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.tabs.active = ["TABELA", "MAPA", "OKR"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
    }
    /* override */
    onLoad() { }
    initGrid(grid) {
        grid.queryInit();
    }
    async onSelectTab(tab) {
        //if(tab.key == "TABELA") this.onLoad();
        if (this.viewInit)
            this.saveUsuarioConfig({ active_tab: tab.key });
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        filter.controls.data_inicio.setValue(null);
        filter.controls.data_fim.setValue(null);
        filter.controls.unidade_id.setValue(null);
        filter.controls.so_entidade.setValue(false);
        super.filterClear(filter);
    }
    onSoEntidadeChange(event) {
        if (this.filter.controls.so_entidade.value) {
            this.filter.controls.unidade_id.setValue(null);
            this.unidade_disabled = 'disabled';
        }
        else {
            this.filter.controls.unidade_id.setValue(undefined);
            this.unidade_disabled = undefined;
        }
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], PlanejamentoListComponent.prototype, "grid", void 0);
__decorate([
    ViewChild(TabsComponent, { static: false })
], PlanejamentoListComponent.prototype, "tabs", void 0);
__decorate([
    ViewChild('unidade', { static: false })
], PlanejamentoListComponent.prototype, "unidade", void 0);
PlanejamentoListComponent = __decorate([
    Component({
        selector: 'app-planejamento-list',
        templateUrl: './planejamento-list.component.html',
        styleUrls: ['./planejamento-list.component.scss'],
        standalone: false
    })
], PlanejamentoListComponent);
export { PlanejamentoListComponent };
//# sourceMappingURL=planejamento-list.component.js.map