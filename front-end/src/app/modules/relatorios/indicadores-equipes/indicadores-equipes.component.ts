import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { IndicadorEquipeDaoService } from "src/app/dao/indicador-equipe-dao.service";
import { QueryOptions } from "src/app/dao/query-options";
import { of } from "rxjs";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
import { IndicadorEquipe } from "src/app/models/indicador-equipe";
import { Chart, ChartConfiguration, ChartData, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

@Component({
  selector: 'indicadores-equipes',
  templateUrl: './indicadores-equipes.component.html',
  styleUrls: ['./indicadores-equipes.component.scss']
})
export class IndicadorEquipeComponent extends RelatorioBaseComponent<IndicadorEquipe, IndicadorEquipeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public permissao: string = 'MOD_IND_EQUIPES';
  public botoes: ToolbarButton[] = [];
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // permite ajustar o tamanho real do gráfico
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 40
      }
    },
    plugins: {
      legend: {
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
        offset: 2,          // distância do centro da fatia
        font: {
          weight: 'bold',
          size: 14
        }
      },
    },
  };
  public pieChartLegend = true;

  constructor(public injector: Injector, dao: IndicadorEquipeDaoService) {
      super(injector, IndicadorEquipe, IndicadorEquipeDaoService);

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

      this.filter!.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
      this.filter.get('unidade_id')?.updateValueAndValidity();

      this.filter!.get('data_fim')?.setValidators(this.periodoValidator.bind(this));
      this.filter.get('data_fim')?.updateValueAndValidity();

      this.orderBy = [['nota', 'asc']];
      this.rowsLimit = 10;
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

  public onQueryResolve(rows: any[] | null) {
    if (rows) {
      const total = rows.reduce((sum, row) => sum + row.qtde, 0);
      this.pieChartData.labels = rows.map(row => row.nota +
          ' (' + ((row.qtde / total) * 100)
          .toFixed(2)
          .replace(".", ",")
          + '%)'
        );
      this.pieChartData.datasets[0].data = rows.map(row => Number(row.qtde));
      this.chart?.update();
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
    this.loading = true;
    try{
      return this.dao!.exportarXls({
        where: queryOptions.where,
        orderBy: queryOptions.orderBy
      });
    } catch (error: any) {
      this.error(error);
    } finally {
      this.loading = false;
    }

    return of(null);
  }
}