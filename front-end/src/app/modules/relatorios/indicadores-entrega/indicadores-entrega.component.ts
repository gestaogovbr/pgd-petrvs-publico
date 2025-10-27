import { Component, Injector, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { QueryOptions } from "src/app/dao/query-options";
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IndicadorEntrega } from "src/app/models/indicador-entrega";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
import { IndicadorEntregaDaoService } from "src/app/dao/indicador-entrega-dao.service";
import { CHART_COLORS } from "src/app/services/chart";

Chart.register(ChartDataLabels);

@Component({
  selector: 'indicadores-entrega',
  templateUrl: './indicadores-entrega.component.html',
  styleUrls: ['./indicadores-entrega.component.scss']
})
export class IndicadorEntregaComponent extends RelatorioBaseComponent<IndicadorEntrega, IndicadorEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

  public permissao: string = 'MOD_IND_EQUIPES';
  public botoes: ToolbarButton[] = [];
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: CHART_COLORS,
      },
    ],
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // permite ajustar o tamanho real do gráfico
    layout: {
      padding: {
        top: 0,
        bottom: 30,
        left: 20,
        right: 40
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
          return '';
        },
        anchor: 'end',      // coloca o label na borda da fatia
        align: 'end',       // alinha fora da fatia
        offset: 8,          // distância do centro da fatia
        font: {
          weight: 'bold',
          size: 14
        }
      },
    },
  };

  public pieChartAvaliacoesData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: CHART_COLORS,
      },
    ],
  };


  constructor(public injector: Injector, dao: IndicadorEntregaDaoService) {
      super(injector, IndicadorEntrega, IndicadorEntregaDaoService);

      this.filter = this.fh.FormBuilder({
        unidade_id: { default: this.auth.unidade?.id },
        incluir_unidades_subordinadas: { default: false },
        exportar: { default: false },
        data_inicial: { default: "" },
        data_final: { default: "" },
        somente_vigentes: { default: "" }
      });

      this.filter!.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
      this.filter.get('unidade_id')?.updateValueAndValidity();

      this.filter!.get('data_fim')?.setValidators(this.periodoValidator.bind(this));
      this.filter.get('data_fim')?.updateValueAndValidity();
  }

  public periodoValidator(control: AbstractControl): ValidationErrors | null
  {
    const dataInicio = this.filter?.get('data_inicial')?.value;
    const dataFim = new Date(control.value);

    return dataFim < dataInicio ? { errorMessage: "deve ser maior que a data inicial" } : null;
  }

  public async ngOnInit() {
      super.ngOnInit();

      if(this.metadata?.unidade_id) {
        this.filter?.controls.unidade_id.setValue(this.metadata?.unidade_id);
        this.saveUsuarioConfig();
      }
  }

  public onQueryResolve(rows: IndicadorEntrega[] | null) {
    if (rows && rows.length) {
      const itens = rows[0].entregas.filter(row => row.total > 0);

      const total = itens.reduce((sum, row) => sum + row.total, 0);
      this.pieChartData.labels = itens.map(row => row.categoria +
          ' (' + ((row.total / total) * 100)
          .toFixed(2)
          .replace(".", ",")
          + '%)'
        );
      this.pieChartData.datasets[0].data = itens.map(row => Number(row.total));

      const avaliacoes = rows[0].avaliacoes.filter(row => row.total > 0);
      const totalAvaliacoes = avaliacoes.reduce((sum, row) => sum + row.total, 0);
      this.pieChartAvaliacoesData.labels = avaliacoes.map(row => row.categoria +
          ' (' + ((row.total / totalAvaliacoes) * 100)
          .toFixed(2)
          .replace(".", ",")
          + '%)'
        );
      this.pieChartAvaliacoesData.datasets[0].data = avaliacoes.map(row => Number(row.total));

      this.charts.forEach(chart => chart.update());
    }
  }

  public ngAfterViewInit(): void {
      super.ngAfterViewInit();
      this.loaded = true;
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }

    if (form.incluir_unidades_subordinadas) {
      result.push(["incluir_unidades_subordinadas", "==", 1]);
    }

    if (form.data_inicial) {
      result.push(["data_inicial", ">=",  form.data_inicial.toISOString().slice(0,10)]);
    }

    if (form.data_final) {
      result.push(["data_final", "==", form.data_final.toISOString().slice(0,10)]);
    }

    if (form.somente_vigentes) {
      result.push(["somente_vigentes", "==", 1]);
    }


    return result;
  };

}