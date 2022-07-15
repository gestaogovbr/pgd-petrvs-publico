import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ],
})
export class BarChartComponent {
  @Input() barChartLabels: Label[] = [];
  @Input() barChartOptions: ChartOptions = {};
  @Input() barChartData: ChartDataSets[] = [];
  @Input() barChartType: ChartType = 'bar';

  public barChartLegend = true;
  public barChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }
}
