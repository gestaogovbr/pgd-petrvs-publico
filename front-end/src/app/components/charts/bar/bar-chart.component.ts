import { Component, Input, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ],
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
/*   @Input() barChartOptions: ChartOptions = {};
  @Input() barChartData: ChartDataSets[] = [];
  @Input() barChartType: ChartType = 'bar';
  @Input() barChartPlugins = [];
  @Input() barChartLegend = true;
  @Input() barChartLabels = [];
  @Input() heightAreaChart: number = 150; */
  @Input() opcoesGrafico: ChartOptions = {};
  //@Input() dadosGrafico: ChartDataSets[] = [];
  @Input() dadosGrafico: ChartData = {};
  @Input() tipoGrafico: ChartType = 'bar';
  @Input() pluginsGrafico: Array<any> = [];
  @Input() labelsX: string[] = [];
  //@Input() legendaGrafico = true;
  //@Input() labelsGrafico = [];
  @Input() alturaAreaGrafico: string = '150px';

  constructor() {
    //this.chart!.chart!.canvas!.parentNode!.parentElement!.style.height = this.alturaAreaGrafico;
  }

 /*  ngOnInit() {} */

/*   ngDoCheck() {
    //this.chart!.chart!.canvas!.parentNode!.parentElement!.style.height = '300px';
  } */

}
