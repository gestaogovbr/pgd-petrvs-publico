import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: [ './pie-chart.component.scss' ],
})
export class PieChartComponent {
  @Input() pieChartOptions: ChartOptions = {};
  @Input() pieChartData: ChartDataSets[] = [];
  @Input() pieChartType: ChartType = 'doughnut';
  @Input() pieChartPlugins = [ ChartDataLabels ];

  public pieChartLegend = true;
  public pieChartLabels = [];

  constructor() { }

  ngOnInit() {
  }
}
