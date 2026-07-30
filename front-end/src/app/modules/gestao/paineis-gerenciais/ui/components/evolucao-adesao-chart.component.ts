import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  ChartConfiguration,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { SerieAdesaoItem } from '../../infra/painel-api.client';
import { CHART_COLORS } from 'src/app/services/chart';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip, Legend);

const MESES_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

@Component({
  selector: 'evolucao-adesao-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div style="position: relative; height: 300px; width: 100%;">
      <canvas baseChart
        [data]="chartData()"
        [options]="chartOptions"
        type="line">
      </canvas>
    </div>
  `,
})
export class EvolucaoAdesaoChartComponent {
  @Input({ required: true }) set serie(value: SerieAdesaoItem[]) {
    this._serie.set(value);
  }
  @Input({ required: true }) labelPositivo = '';
  @Input({ required: true }) labelNegativo = '';
  @Input({ required: true }) campoPositivo = '';
  @Input({ required: true }) campoNegativo = '';

  private readonly _serie = signal<SerieAdesaoItem[]>([]);

  readonly chartData = computed(() => {
    const serie = this._serie();
    const serieMap = new Map(serie.map(item => [item.periodo, item]));

    // Determinar o ano a partir da série (primeiro item) ou ano atual
    const ano = serie.length > 0 ? serie[0].periodo.split('-')[0] : String(new Date().getFullYear());

    const labels = MESES_LABELS;
    const dadosPositivo: (number | null)[] = [];
    const dadosNegativo: (number | null)[] = [];

    for (let m = 1; m <= 12; m++) {
      const periodo = `${ano}-${String(m).padStart(2, '0')}`;
      const item = serieMap.get(periodo);

      if (item && this.temDados(item)) {
        dadosPositivo.push((item as any)[this.campoPositivo] ?? 0);
        dadosNegativo.push((item as any)[this.campoNegativo] ?? 0);
      } else {
        dadosPositivo.push(null);
        dadosNegativo.push(null);
      }
    }

    return {
      labels,
      datasets: [
        {
          label: this.labelPositivo,
          data: dadosPositivo,
          borderColor: CHART_COLORS[0],
          backgroundColor: CHART_COLORS[0] + '33',
          fill: false,
          tension: 0.3,
          spanGaps: false,
        },
        {
          label: this.labelNegativo,
          data: dadosNegativo,
          borderColor: CHART_COLORS[1],
          backgroundColor: CHART_COLORS[1] + '33',
          fill: false,
          tension: 0.3,
          spanGaps: false,
        },
      ],
    };
  });

  readonly chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.raw === null) {
              return 'Sem dados para este período';
            }
            return `${context.dataset.label}: ${context.formattedValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  private temDados(item: SerieAdesaoItem): boolean {
    const positivo = (item as any)[this.campoPositivo] ?? 0;
    const negativo = (item as any)[this.campoNegativo] ?? 0;
    return positivo > 0 || negativo > 0;
  }
}
