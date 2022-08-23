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
  @Input() barChartOptions: ChartOptions = {};
  @Input() barChartData: ChartDataSets[] = [];
  @Input() barChartType: ChartType = 'bar';
  @Input() barChartPlugins = [];
  @Input() barChartLegend = true;
  @Input() barChartLabels = [];

  constructor() {}

  ngOnInit() {}

  ngDoCheck() {
    //this.chart!.chart!.canvas!.parentNode!.parentElement!.style.height = '300px';
  }

}
