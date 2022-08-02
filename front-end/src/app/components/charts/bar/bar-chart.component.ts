import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartConfiguration, ChartData } from 'chart.js';
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
  @Input() barChartLegend = true;
  @Input() barChartLabels = [];

  constructor() { }

  ngOnInit() {
  }
}
