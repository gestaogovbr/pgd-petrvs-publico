import { Component, Injector, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
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
  public loadingHoras: boolean = false;
  public totalAvaliacoes: number = 0;
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: CHART_COLORS,
      },
    ],
  }

  public pieChartOptions: ChartConfiguration['options'] = {
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
  }

  public pieChartAvaliacoesData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: CHART_COLORS,
      },
    ],
  }

  public pieChartHorasData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: CHART_COLORS,
      },
    ],
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 20, 
      },
    },
    scales: {
      x: {
      },
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
        formatter: (value) => 
          Number(value).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          }),
      },
    },
  }

  public barChartData: ChartData<'bar'> = {
    labels: [''],
    datasets: [
      { data: [], label: 'Média das Avaliações dos PEs',  backgroundColor: '#4CAF50', },
      { data: [], label: 'Média das Avaliações dos PTs',  backgroundColor: '#FFC107' },
    ],
  }

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

      let queryOptions = this.grid?.queryOptions || this.queryOptions || {};

      this.loadingHoras = true;
      this.dao!.queryHoras({
        where: queryOptions.where
      }).subscribe(result => {
        this.graficoHoras(result.rows);
      });
  }

  public onQueryResolve(rows: IndicadorEntrega[] | null) {
    this.loading = false;
    
    if (rows && rows.length) {
      const itens = rows[0].entregas;

      const total = itens.reduce((sum, row) => sum + row.total, 0);
      this.pieChartData.labels = itens.map(row => row.categoria);
      this.pieChartData.datasets[0].data = itens.map(row => Number(row.total));
      this.pieChartData.labels = itens.map(row => row.categoria +
          ' (' + ((total ? ((Number(row.total) / total)) : 0) * 100)
          .toFixed(2)
          .replace(".", ",")
          + '%)'
        );

      const avaliacoes = rows[0].avaliacoes;
      this.totalAvaliacoes = avaliacoes.reduce((sum, row) => sum + row.total, 0);
      this.pieChartAvaliacoesData.labels = avaliacoes.map(row => row.categoria);
      this.pieChartAvaliacoesData.datasets[0].data = avaliacoes.map(row => Number(row.total));
      this.pieChartAvaliacoesData.labels = avaliacoes.map(row => row.categoria +
          ' (' + ((this.totalAvaliacoes ? (Number(row.total) / this.totalAvaliacoes) : 0) * 100)
          .toFixed(2)
          .replace(".", ",")
          + '%)'
        );

      this.barChartData.datasets[0].data = [rows[0].desempenho.entregas ?? 0];
      this.barChartData.datasets[1].data = [rows[0].desempenho.trabalhos ?? 0];
      if (this.barChartOptions?.plugins?.title) {
        this.barChartOptions.plugins.title.text = 'Diferença: ' +
          (Number(rows[0].desempenho.trabalhos) - Number(rows[0].desempenho.entregas))
          .toFixed(2).replace('.', ',')
      }

      this.barChartOptions = { ...this.barChartOptions };

      this.charts.forEach(chart => chart.update());
    }
  }

  public ngAfterViewInit(): void {
      super.ngAfterViewInit();
  }

  protected beforeQuery(): void {
    super.beforeQuery();
    this.loading = true;
  }

  protected afterQuery(): void {
    super.afterQuery();
    this.loading = false;
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
  }

  public onButtonFilterClick = (filter: FormGroup) => {
    let form: any = filter.value;
    let queryOptions = this.grid?.queryOptions || this.queryOptions || {};

    if (this.filter!.valid) {

      this.query?.reload(queryOptions);

      if (!this.loadingHoras) {
        this.loadingHoras = true;
        this.dao!.queryHoras({
            where: queryOptions.where
        }).subscribe(result => {
            this.graficoHoras(result.rows);
        });
      }
    } else {
      this.filter!.markAllAsTouched(); 
    }
  }

  public graficoHoras(rows: any[]) {
    const tipos = rows; //.filter(row => row.horas > 0);
    const total = tipos.reduce((sum, row) => sum + row.horas, 0);

    this.pieChartHorasData.datasets[0].data = tipos.map(row => row.horas);

    this.pieChartHorasData.labels = tipos.map(row => row.categoria +
        ' (' + ((total? (Number(row.horas) / total) : 0 * 100))
        .toFixed(2)
        .replace(".", ",")
        + '%)'
      );

     this.loadingHoras = false;

    this.charts.forEach(chart => chart.update());
  }

}