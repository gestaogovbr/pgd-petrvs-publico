import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  computed,
  ViewChild,
  ElementRef,
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
import './bar-totals.plugin';

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
  private readonly elRef = inject(ElementRef);

  @ViewChild(BaseChartDirective) chartDirective?: BaseChartDirective;

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
  @Input() siglaPai = '';
  @Input() set drillAtivo(value: boolean) { this._drillAtivo.set(value); }

  @Output() unidadeClick = new EventEmitter<{ unidade_id: string; unidade_sigla: string }>();
  @Output() voltarClick = new EventEmitter<void>();

  readonly _dados = signal<Indicador | null>(null);
  readonly _drillAtivo = signal(false);

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
    const totals = dados?.distribuicoes.map(d => d.total) ?? [];

    return {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { right: 40 },
      },
      scales: {
        x: {
          display: true,
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (value: string | number) => `${value}%`,
          },
          grid: { display: false },
          border: { display: false },
        },
        y: {
          grid: { display: false },
          ticks: {
            color: '#1351b4',
            font: { weight: 'bold' },
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
        barTotals: { totals },
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

  readonly chartHeight = computed(() => {
    const dados = this._dados();
    const linhas = dados?.distribuicoes.length ?? 1;
    return Math.max(150, linhas * 40 + 40);
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

  onChartAreaClick(e: MouseEvent): void {
    const index = this.getLabelIndex(e);
    if (index <= 0) return;

    const dados = this._dados();
    if (!dados || index >= dados.distribuicoes.length) return;

    const dist = dados.distribuicoes[index];
    this.unidadeClick.emit({ unidade_id: dist.unidade_id, unidade_sigla: dist.unidade_sigla });
  }

  navegarSaibaMais(): void {
    if (this.saibaMaisRoute.length === 0) return;
    this.go.navigate(
      { route: this.saibaMaisRoute, params: { filter: this.saibaMaisQueryParams } },
      { root: true }
    );
  }

  onVoltar(): void {
    this.voltarClick.emit();
  }

  private getLabelIndex(e: MouseEvent): number {
    const chart = this.chartDirective?.chart;
    if (!chart) return -1;

    const dados = this._dados();
    if (!dados || dados.distribuicoes.length === 0) return -1;

    const canvas = chart.canvas;
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;

    const yScale = chart.scales['y'];
    if (!yScale) return -1;

    // Aceita cliques em qualquer lugar na altura do gráfico
    if (y < yScale.top || y > yScale.bottom) return -1;

    const value = yScale.getValueForPixel(y);
    if (value == null || value < 0) return -1;

    const index = Math.round(value);
    if (index >= dados.distribuicoes.length) return -1;

    return index;
  }
}
