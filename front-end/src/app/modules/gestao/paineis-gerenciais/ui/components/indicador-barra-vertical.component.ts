import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigateService } from 'src/app/services/navigate.service';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
} from 'chart.js';
import { IndicadorTeletrabalho } from '../../infra/painel-api.client';
import { IndicadorCardComponent } from './indicador-card.component';
import { CHART_COLORS } from 'src/app/services/chart';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Tooltip);

@Component({
  selector: 'indicador-barra-vertical',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BaseChartDirective, IndicadorCardComponent],
  templateUrl: './indicador-barra-vertical.component.html',
  styleUrls: ['./indicador-barra-vertical.component.scss'],
})
export class IndicadorBarraVerticalComponent {
  private readonly go = inject(NavigateService);

  @ViewChild(BaseChartDirective) chartDirective?: BaseChartDirective;

  @Input({ required: true }) set dados(value: IndicadorTeletrabalho | null) {
    this._dados.set(value);
  }

  @Input({ required: true }) titulo = '';
  @Input() informacaoAdicional = '';
  @Input() origemDados = '';
  @Input() carregando = false;
  @Input() saibaMaisRoute: string[] = [];
  @Input() saibaMaisQueryParams: Record<string, string> = {};

  readonly CORES = [CHART_COLORS[3], CHART_COLORS[2]]; // azul para taxa, amarelo para limite
  readonly _dados = signal<IndicadorTeletrabalho | null>(null);

  readonly semDados = computed(() => {
    const dados = this._dados();
    return !dados || dados.total_participantes === 0;
  });

  readonly chartData = computed<ChartData<'bar'>>(() => {
    const dados = this._dados();
    if (!dados) return { labels: [], datasets: [] };

    return {
      labels: ['Taxa de participação', 'Limite legal'],
      datasets: [{
        data: [dados.taxa, dados.limite],
        backgroundColor: this.CORES,
        barThickness: 60,
        maxBarThickness: 80,
      }],
    };
  });

  readonly chartOptions = computed<ChartConfiguration<'bar'>['options']>(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: string | number) => `${value}%`,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const dados = this._dados();
              if (!dados) return '';
              const valor = context.raw as number;
              if (context.dataIndex === 0) {
                return `${valor}% (${dados.participantes_modalidade} de ${dados.total_participantes})`;
              }
              return `${valor}%`;
            },
          },
        },
        datalabels: { display: false },
      },
    } as any;
  });

  getChartExportData(): { type: string; data: any; options: any; width: number; height: number } | null {
    const chart = this.chartDirective?.chart;
    if (!chart) return null;

    return {
      type: (chart.config as any).type as string,
      data: chart.config.data,
      options: chart.config.options,
      width: chart.width,
      height: chart.height,
    };
  }

  navegarSaibaMais(): void {
    this.go.navigate(
      { route: this.saibaMaisRoute, params: { filter: this.saibaMaisQueryParams } },
      { root: true }
    );
  }
}
