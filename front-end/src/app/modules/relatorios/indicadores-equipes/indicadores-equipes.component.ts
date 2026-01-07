import { Component, Injector, QueryList, ViewChild, ViewChildren } from "@angular/core";
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
import { CHART_COLORS } from "src/app/services/chart";

Chart.register(ChartDataLabels);

@Component({
  selector: 'indicadores-equipes',
  templateUrl: './indicadores-equipes.component.html',
  styleUrls: ['./indicadores-equipes.component.scss']
})
export class IndicadorEquipeComponent extends RelatorioBaseComponent<IndicadorEquipe, IndicadorEquipeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

  public permissao: string = 'MOD_IND_EQUIPES';
  public botoes: ToolbarButton[] = [];
  public loadingHoras: boolean = false;
  public totalAvaliacoes: number = 0;
  public totalHoras: number = 0;
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: CHART_COLORS,
      },
    ],
  }
  
  public pieChartType: ChartType = 'pie';

  public pieChartOptions: ChartConfiguration['options'] = {
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

      let queryOptions = this.grid?.queryOptions || this.queryOptions || {};

      this.loadingHoras = true;
      this.dao!.queryHoras({
        where: queryOptions.where
      }).subscribe(result => {
        this.graficoHoras(result.rows);
      });
  }

  public onQueryResolve(rows: any[] | null) {
    if (rows) {
      this.totalAvaliacoes = rows.reduce((sum, row) => sum + row.qtde, 0);
      this.pieChartData.labels = rows.map(row => row.nota +
          ' (' + ((row.qtde / this.totalAvaliacoes) * 100)
          .toFixed(2)
          .replace(".", ",")
          + '%)'
        );
      this.pieChartData.datasets[0].data = rows.map(row => Number(row.qtde));
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
  }

  protected beforeQuery(): void {
    super.beforeQuery();
    this.loading = true;
  }

  protected afterQuery(): void {
    super.afterQuery();
    this.loading = false;
  }

  public onButtonFilterClick = (filter: FormGroup) => {
    let form: any = filter.value;
    let queryOptions = this.grid?.queryOptions || this.queryOptions || {};

    if (this.filter!.valid) {
      this.query?.reload(queryOptions)

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
    this.totalHoras = tipos.reduce((sum, row) => sum + row.horas, 0);

    this.pieChartHorasData.datasets[0].data = tipos.map(row => row.horas);

    this.pieChartHorasData.labels = tipos.map(row => row.categoria +
        ' (' + (((this.totalHoras? (Number(row.horas) / this.totalHoras) : 0) * 100))
        .toFixed(2)
        .replace(".", ",")
        + '%)'
      );

     this.loadingHoras = false;

    this.charts.forEach(chart => chart.update());
  }
}