import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
import ChartjsPluginStacked100 from 'chartjs-plugin-stacked100';
import { Indicador } from '../../infra/painel-api.client';
import { CHART_COLORS } from 'src/app/services/chart';
import { NavigateService } from 'src/app/services/navigate.service';
import { IndicadorCardComponent } from './indicador-card.component';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Tooltip, ChartjsPluginStacked100);

@Component({
  selector: 'indicador-barra-horizontal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BaseChartDirective, IndicadorCardComponent],
  templateUrl: './indicador-barra-horizontal.component.html',
  styleUrls: ['./indicador-barra-horizontal.component.scss'],
})
export class IndicadorBarraHorizontalComponent {
  private readonly go = inject(NavigateService);

  @Input({ required: true }) set dados(value: Indicador | null) {
    this._dados.set(value);
  }

  @Input({ required: true }) titulo = '';
  @Input() informacaoAdicional = '';
  @Input() origemDados = '';
  @Input() carregando = false;
  @Input() cores: string[] = CHART_COLORS;
  @Input() saibaMaisRoute: string[] = [];
  @Input() saibaMaisQueryParams: Record<string, string> = {};

  readonly _dados = signal<Indicador | null>(null);

  readonly semDados = computed(() => {
    const dados = this._dados();
    if (!dados) return true;
    if (dados.distribuicoes.length === 0) return true;
    return dados.distribuicoes.every(d => d.total === 0);
  });

  readonly chartData = computed<ChartData<'bar'>>(() => {
    const dados = this._dados();
    if (!dados) return { labels: [], datasets: [] };

    const labels = dados.distribuicoes.map(d => d.unidade_sigla);

    const datasets = dados.segmentos.map((segmento, i) => ({
      label: segmento,
      data: dados.distribuicoes.map(d => d.valores[i] ?? 0),
      backgroundColor: this.cores[i] ?? '#ccc',
    }));

    return { labels, datasets };
  });

  readonly chartOptions = computed<ChartConfiguration<'bar'>['options']>(() => {
    const dados = this._dados();

    return {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: {
          grid: { display: false },
          ticks: {
            callback: (_: string | number, index: number) => {
              if (!dados) return '';
              const dist = dados.distribuicoes[index];
              return `${dist.unidade_sigla}`;
            },
          },
        },
      },
      plugins: {
        legend: { display: false },
        stacked100: { enable: true, replaceTooltipLabel: false },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              if (!dados) return '';
              const datasetLabel = context.dataset.label ?? '';
              const originalData = context.chart.data.originalData;
              const calculatedData = context.chart.data.calculatedData;
              const original = originalData?.[context.datasetIndex]?.[context.dataIndex] ?? 0;
              const percentage = calculatedData?.[context.datasetIndex]?.[context.dataIndex] ?? 0;
              return `${datasetLabel}: ${original} (${Math.round(percentage)}%)`;
            },
            title: (items: any[]) => {
              if (!dados || !items.length) return '';
              const dist = dados.distribuicoes[items[0].dataIndex];
              return `${dist.unidade_sigla} — Total: ${dist.total}`;
            },
          },
        },
        datalabels: { display: false },
      },
    } as any;
  });

  readonly totais = computed(() => {
    const dados = this._dados();
    return dados?.distribuicoes.map(d => d.total) ?? [];
  });

  readonly chartHeight = computed(() => {
    const dados = this._dados();
    const linhas = dados?.distribuicoes.length ?? 1;
    return Math.max(150, linhas * 40 + 40);
  });

  navegarSaibaMais(): void {
    if (this.saibaMaisRoute.length === 0) return;
    this.go.navigate(
      { route: this.saibaMaisRoute, params: { filter: this.saibaMaisQueryParams } },
      { root: true }
    );
  }
}
