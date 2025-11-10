import { Component, Injector, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { QueryOptions } from "src/app/dao/query-options";
import { of } from "rxjs";
import { Chart, ChartConfiguration, ChartData, ChartType, ChartOptions, Plugin } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IndicadorGestao } from "src/app/models/indicador-gestao";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
import { IndicadorGestaoDaoService } from "src/app/dao/indicador-gestao-dao.service";

Chart.register(ChartDataLabels);

@Component({
  selector: 'indicadores-gestao',
  templateUrl: './indicadores-gestao.component.html',
  styleUrls: ['./indicadores-gestao.component.scss']
})
export class IndicadorGestaoComponent extends RelatorioBaseComponent<IndicadorGestao, IndicadorGestaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

  public permissao: string = 'MOD_IND_GESTAO';
  public botoes: ToolbarButton[] = [];
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
    },
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 12,
          padding: 10,
          textAlign: 'left',
        }
      },
      title: {
        display: false
      },
      datalabels: {
        display: false
      }
    },
  }

  public pieChartUnidadesData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartUnidadesOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
    },
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center',
        fullSize: true,
        labels: {
          boxWidth: 12,
          padding: 20,
          textAlign: 'left',
        }
      },
      title: {
        display: false
      },
      datalabels: {
        display: false
      }
    },
  };

  constructor(public injector: Injector, dao: IndicadorGestaoDaoService) {
      super(injector, IndicadorGestao, IndicadorGestaoDaoService);

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

  protected beforeQuery(): void {
    super.beforeQuery();
    this.loading = true;
  }

  protected afterQuery(): void {
    super.afterQuery();
    this.loading = false;
  }

  public onQueryResolve(rows: any | null) {
    if (rows) {
      const data = rows[0];
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
        'Com PGD em vigor (' + ((data.totalUnidadesPE / data.totalUnidades) * 100)
          .toFixed(2)
          .replace(".", ",")
          + '%)',
        'Sem PGD em vigor (' + (((data.totalUnidades - data.totalUnidadesPE) / data.totalUnidades) * 100)
          .toFixed(2)
          .replace(".", ",")
          + '%)'
      ];
      this.pieChartUnidadesData.datasets[0].data = [
        data.totalUnidadesPE,
        data.totalUnidades - data.totalUnidadesPE
      ];

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

  public onButtonFilterClick = (filter: FormGroup) => {
    let form: any = filter.value;
    let queryOptions = this.grid?.queryOptions || this.queryOptions || {};

    if (this.filter!.valid) {
      if (this.grid && this.grid.query) {
        this.loaded = true;
      }
      this.grid?.query?.reload(queryOptions);
    } else {
      this.filter!.markAllAsTouched(); 
    }
  }

  public exportExcel = (form: any, queryOptions: QueryOptions) => {
  }
}