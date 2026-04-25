import { __decorate } from "tslib";
import { Component, ViewChild, ViewChildren } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { IndicadorEquipeDaoService } from "src/app/dao/indicador-equipe-dao.service";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
import { IndicadorEquipe } from "src/app/models/indicador-equipe";
import { Chart } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CHART_COLORS } from "src/app/services/chart";
Chart.register(ChartDataLabels);
let IndicadorEquipeComponent = class IndicadorEquipeComponent extends RelatorioBaseComponent {
    constructor(injector, dao) {
        super(injector, IndicadorEquipe, IndicadorEquipeDaoService);
        this.injector = injector;
        this.permissao = 'MOD_IND_EQUIPES';
        this.botoes = [];
        this.loadingHoras = false;
        this.totalAvaliacoes = 0;
        this.totalHoras = 0;
        this.pieChartData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: CHART_COLORS,
                },
            ],
        };
        this.pieChartType = 'pie';
        this.pieChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 50
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    align: 'start',
                    labels: {
                        boxWidth: 50,
                        textAlign: 'left',
                    }
                },
                title: {
                    display: false
                },
                datalabels: {
                    display: false
                },
            },
        };
        this.pieChartHorasData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: CHART_COLORS,
                },
            ],
        };
        this.pieChartLegend = true;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.unidade_id?.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.incluir_unidades_subordinadas) {
                result.push(["incluir_unidades_subordinadas", "==", 1]);
            }
            if (form.data_inicial) {
                result.push(["data_inicial", ">=", form.data_inicial.toISOString().slice(0, 10)]);
            }
            if (form.data_final) {
                result.push(["data_final", "==", form.data_final.toISOString().slice(0, 10)]);
            }
            if (form.somente_vigentes) {
                result.push(["somente_vigentes", "==", 1]);
            }
            return result;
        };
        this.onButtonFilterClick = (filter) => {
            let form = filter.value;
            let queryOptions = this.grid?.queryOptions || this.queryOptions || {};
            if (this.filter.valid) {
                this.query?.reload(queryOptions);
                if (!this.loadingHoras) {
                    this.loadingHoras = true;
                    this.dao.queryHoras({
                        where: queryOptions.where
                    }).subscribe(result => {
                        this.graficoHoras(result.rows);
                    });
                }
            }
            else {
                this.filter.markAllAsTouched();
            }
        };
        this.filter = this.fh.FormBuilder({
            unidade_id: { default: this.auth.unidade?.id },
            incluir_unidades_subordinadas: { default: false },
            exportar: { default: false },
            nota: { default: "" },
            qtde: { default: "" },
            data_inicial: { default: "" },
            data_final: { default: "" },
            somente_vigentes: { default: "" }
        });
        this.filter.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
        this.filter.get('unidade_id')?.updateValueAndValidity();
        this.filter.get('data_fim')?.setValidators(this.periodoValidator.bind(this));
        this.filter.get('data_fim')?.updateValueAndValidity();
        this.orderBy = [['nota', 'asc']];
        this.rowsLimit = 10;
    }
    periodoValidator(control) {
        const dataInicio = this.filter?.get('data_inicial')?.value;
        const dataFim = new Date(control.value);
        return dataFim < dataInicio ? { errorMessage: "deve ser maior que a data inicial" } : null;
    }
    async ngOnInit() {
        super.ngOnInit();
        if (this.metadata?.unidade_id) {
            this.filter?.controls.unidade_id.setValue(this.metadata?.unidade_id);
            this.saveUsuarioConfig();
        }
        let queryOptions = this.grid?.queryOptions || this.queryOptions || {};
        this.loadingHoras = true;
        this.dao.queryHoras({
            where: queryOptions.where
        }).subscribe(result => {
            this.graficoHoras(result.rows);
        });
    }
    onQueryResolve(rows) {
        if (rows) {
            this.totalAvaliacoes = rows.reduce((sum, row) => sum + row.qtde, 0);
            this.pieChartData.labels = rows.map(row => row.nota +
                ' (' + ((row.qtde / this.totalAvaliacoes) * 100)
                .toFixed(2)
                .replace(".", ",")
                + '%)');
            this.pieChartData.datasets[0].data = rows.map(row => Number(row.qtde));
            this.charts.forEach(chart => chart.update());
        }
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loaded = true;
    }
    beforeQuery() {
        super.beforeQuery();
        this.loading = true;
    }
    afterQuery() {
        super.afterQuery();
        this.loading = false;
    }
    graficoHoras(rows) {
        const tipos = rows; //.filter(row => row.horas > 0);
        this.totalHoras = tipos.reduce((sum, row) => sum + row.horas, 0);
        this.pieChartHorasData.datasets[0].data = tipos.map(row => row.horas);
        this.pieChartHorasData.labels = tipos.map(row => row.categoria +
            ' (' + (((this.totalHoras ? (Number(row.horas) / this.totalHoras) : 0) * 100))
            .toFixed(2)
            .replace(".", ",")
            + '%)');
        this.loadingHoras = false;
        this.charts.forEach(chart => chart.update());
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], IndicadorEquipeComponent.prototype, "grid", void 0);
__decorate([
    ViewChildren(BaseChartDirective)
], IndicadorEquipeComponent.prototype, "charts", void 0);
IndicadorEquipeComponent = __decorate([
    Component({
        selector: 'indicadores-equipes',
        templateUrl: './indicadores-equipes.component.html',
        styleUrls: ['./indicadores-equipes.component.scss'],
        standalone: false
    })
], IndicadorEquipeComponent);
export { IndicadorEquipeComponent };
//# sourceMappingURL=indicadores-equipes.component.js.map