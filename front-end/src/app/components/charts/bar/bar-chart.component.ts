import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ],
})
export class BarChartComponent {
  @Input() barChartOptions: ChartOptions = {};
  @Input() barChartData: ChartDataSets[] = [];
  @Input() barChartType: ChartType = 'bar';
  @Input() barChartPlugins = [];

  public barChartLegend = true;
  public barChartLabels = [];

  constructor() { }

  ngOnInit() {
  }
}
