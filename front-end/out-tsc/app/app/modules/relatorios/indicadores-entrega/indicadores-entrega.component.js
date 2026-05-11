import { __decorate } from "tslib";
import { Component, ViewChild, ViewChildren } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { Chart } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IndicadorEntrega } from "src/app/models/indicador-entrega";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
import { IndicadorEntregaDaoService } from "src/app/dao/indicador-entrega-dao.service";
import { CHART_COLORS } from "src/app/services/chart";
Chart.register(ChartDataLabels);
let IndicadorEntregaComponent = class IndicadorEntregaComponent extends RelatorioBaseComponent {
    constructor(injector, dao) {
        super(injector, IndicadorEntrega, IndicadorEntregaDaoService);
        this.injector = injector;
        this.permissao = 'MOD_IND_EQUIPES';
        this.botoes = [];
        this.totalAvaliacoes = 0;
        this.totalVinculacoes = 0;
        this.totalDesempenho = 0;
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
        this.pieChartAvaliacoesData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: CHART_COLORS,
                },
            ],
        };
        this.barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 20,
                },
            },
            scales: {
                x: {},
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 5,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1,
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: '',
                    padding: {
                        bottom: 40,
                    },
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    align: 'center',
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    clamp: true,
                    formatter: (value) => Number(value).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }),
                },
            },
        };
        this.barChartData = {
            labels: [''],
            datasets: [
                { data: [], label: 'Média das Avaliações dos PEs', backgroundColor: '#4CAF50', },
                { data: [], label: 'Média das Avaliações dos PTs', backgroundColor: '#FFC107' },
            ],
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
    onQueryResolve(rows) {
        this.loading = false;
        if (rows && rows.length) {
            const itens = rows[0].entregas;
            this.totalVinculacoes = itens.reduce((sum, row) => sum + row.total, 0);
            this.pieChartData.labels = itens.map(row => row.categoria);
            this.pieChartData.datasets[0].data = itens.map(row => Number(row.total));
            this.pieChartData.labels = itens.map(row => row.categoria +
                ' (' + ((this.totalVinculacoes ? ((Number(row.total) / this.totalVinculacoes)) : 0) * 100)
                .toFixed(2)
                .replace(".", ",")
                + '%)');
            const avaliacoes = rows[0].avaliacoes;
            this.totalAvaliacoes = avaliacoes.reduce((sum, row) => sum + row.total, 0);
            this.pieChartAvaliacoesData.labels = avaliacoes.map(row => row.categoria);
            this.pieChartAvaliacoesData.datasets[0].data = avaliacoes.map(row => Number(row.total));
            this.pieChartAvaliacoesData.labels = avaliacoes.map(row => row.categoria +
                ' (' + ((this.totalAvaliacoes ? (Number(row.total) / this.totalAvaliacoes) : 0) * 100)
                .toFixed(2)
                .replace(".", ",")
                + '%)');
            this.barChartData.datasets[0].data = [rows[0].desempenho.entregas ?? 0];
            this.barChartData.datasets[1].data = [rows[0].desempenho.trabalhos ?? 0];
            this.totalDesempenho = rows[0].desempenho.entregas + rows[0].desempenho.trabalhos;
            if (this.barChartOptions?.plugins?.title) {
                this.barChartOptions.plugins.title.text = 'Diferença: ' +
                    (Number(rows[0].desempenho.trabalhos) - Number(rows[0].desempenho.entregas))
                        .toFixed(2).replace('.', ',');
            }
            this.barChartOptions = { ...this.barChartOptions };
            this.charts.forEach(chart => chart.update());
        }
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
    }
    beforeQuery() {
        super.beforeQuery();
        this.loading = true;
    }
    afterQuery() {
        super.afterQuery();
        this.loading = false;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], IndicadorEntregaComponent.prototype, "grid", void 0);
__decorate([
    ViewChildren(BaseChartDirective)
], IndicadorEntregaComponent.prototype, "charts", void 0);
IndicadorEntregaComponent = __decorate([
    Component({
        selector: 'indicadores-entrega',
        templateUrl: './indicadores-entrega.component.html',
        styleUrls: ['./indicadores-entrega.component.scss'],
        standalone: false
    })
], IndicadorEntregaComponent);
export { IndicadorEntregaComponent };
//# sourceMappingURL=indicadores-entrega.component.js.map