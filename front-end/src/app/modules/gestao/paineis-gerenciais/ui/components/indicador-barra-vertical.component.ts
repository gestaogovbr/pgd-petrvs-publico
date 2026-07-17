import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
  template: `
    <indicador-card
      [titulo]="titulo"
      [informacaoAdicional]="informacaoAdicional"
      [origemDados]="origemDados"
      [carregando]="carregando"
      [semDados]="semDados()">

      @if (_dados(); as dados) {
        <div style="height: 200px; position: relative;">
          <canvas
            baseChart
            type="bar"
            [data]="chartData()"
            [options]="chartOptions()">
          </canvas>
        </div>

        <div class="indicador-vertical__legenda">
          <span class="indicador-vertical__legenda-item">
            <span class="indicador-vertical__legenda-cor" [style.background-color]="CORES[0]"></span>
            Taxa de participação
          </span>
          <span class="indicador-vertical__legenda-item">
            <span class="indicador-vertical__legenda-cor" [style.background-color]="CORES[1]"></span>
            Limite legal
          </span>
        </div>

        @if (saibaMaisRoute.length > 0) {
          <p class="indicador-vertical__saiba-mais">
            <a (click)="navegarSaibaMais()" style="cursor: pointer;">Saiba mais</a>
          </p>
        }
      }

    </indicador-card>
  `,
  styles: [`
    .indicador-vertical__legenda {
      display: flex;
      gap: var(--spacing-scale-2x);
      margin-top: var(--spacing-scale-2x);
    }
    .indicador-vertical__legenda-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-scale-half);
      font-size: var(--font-size-scale-down-01);
    }
    .indicador-vertical__legenda-cor {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
    }
    .indicador-vertical__saiba-mais {
      margin-top: var(--spacing-scale-base);
      font-size: var(--font-size-scale-down-01);
    }
  `],
})
export class IndicadorBarraVerticalComponent {
  private readonly go = inject(NavigateService);

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

  navegarSaibaMais(): void {
    this.go.navigate(
      { route: this.saibaMaisRoute, params: { filter: this.saibaMaisQueryParams } },
      { root: true }
    );
  }
}
