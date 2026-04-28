import { __decorate } from "tslib";
import { Component, ViewChild, ViewChildren } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { Chart } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IndicadorGestao } from "src/app/models/indicador-gestao";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
import { IndicadorGestaoDaoService } from "src/app/dao/indicador-gestao-dao.service";
import { CHART_COLORS } from "src/app/services/chart";
Chart.register(ChartDataLabels);
let IndicadorGestaoComponent = class IndicadorGestaoComponent extends RelatorioBaseComponent {
    constructor(injector, dao) {
        super(injector, IndicadorGestao, IndicadorGestaoDaoService);
        this.injector = injector;
        this.permissao = 'MOD_IND_GESTAO';
        this.botoes = [];
        this.totalParticipantes = 0;
        this.pieChartData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: CHART_COLORS,
                },
            ],
        };
        this.pieChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 30
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
        this.pieChartUnidadesData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: CHART_COLORS,
                },
            ],
        };
        this.pieChartUnidadesOptions = {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 30
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
            }
            else {
                this.filter.markAllAsTouched();
            }
        };
        this.exportExcel = (form, queryOptions) => {
        };
        this.filter = this.fh.FormBuilder({
            unidade_id: { default: this.auth.unidade?.id },
            incluir_unidades_subordinadas: { default: false },
            exportar: { default: false },
            data_inicial: { default: "" },
            data_final: { default: "" },
            somente_vigentes: { default: "" }
        });
        this.filter.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
        this.filter.get('unidade_id')?.updateValueAndValidity();
        this.filter.get('data_fim')?.setValidators(this.periodoValidator.bind(this));
        this.filter.get('data_fim')?.updateValueAndValidity();
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
    }
    beforeQuery() {
        super.beforeQuery();
        this.loading = true;
    }
    afterQuery() {
        super.afterQuery();
        this.loading = false;
    }
    onQueryResolve(rows) {
        if (rows) {
            const data = rows[0];
            this.totalParticipantes = data.totalUsuarios;
            if (!data || !data.totalUsuarios) {
                this.pieChartData.labels = [];
                this.pieChartData.datasets[0].data = [];
            }
            else {
                this.pieChartData.labels = [
                    'Participantes (' + ((data.totalParticipantes / data.totalUsuarios) * 100)
                        .toFixed(2)
                        .replace(".", ",")
                        + '%)',
                    'Não Participantes (' + (((data.totalUsuarios - data.totalParticipantes) / data.totalUsuarios) * 100)
                        .toFixed(2)
                        .replace(".", ",")
                        + '%)'
                ];
                this.pieChartData.datasets[0].data = [
                    data.totalParticipantes,
                    data.totalUsuarios - data.totalParticipantes
                ];
                this.pieChartUnidadesData.labels = [
                    'Com PE cadastrado (' + ((data.totalUnidadesPE / data.totalUnidades) * 100)
                        .toFixed(2)
                        .replace(".", ",")
                        + '%)',
                    'Sem PE cadastrado (' + (((data.totalUnidades - data.totalUnidadesPE) / data.totalUnidades) * 100)
                        .toFixed(2)
                        .replace(".", ",")
                        + '%)'
                ];
            }
            this.pieChartUnidadesData.datasets[0].data = [
                data.totalUnidadesPE,
                data.totalUnidades - data.totalUnidadesPE
            ];
            this.charts.forEach(chart => chart.update());
        }
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loaded = true;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], IndicadorGestaoComponent.prototype, "grid", void 0);
__decorate([
    ViewChildren(BaseChartDirective)
], IndicadorGestaoComponent.prototype, "charts", void 0);
IndicadorGestaoComponent = __decorate([
    Component({
        selector: 'indicadores-gestao',
        templateUrl: './indicadores-gestao.component.html',
        styleUrls: ['./indicadores-gestao.component.scss'],
        standalone: false
    })
], IndicadorGestaoComponent);
export { IndicadorGestaoComponent };
//# sourceMappingURL=indicadores-gestao.component.js.map