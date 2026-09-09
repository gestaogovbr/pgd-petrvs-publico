import { Chart, Plugin } from 'chart.js';

/**
 * Plugin que desenha os totais à direita de cada barra em gráficos horizontais.
 * Requer `options.plugins.barTotals.totals` com o array de totais.
 */
export const barTotalsPlugin: Plugin = {
  id: 'barTotals',

  afterDraw(chart: Chart) {
    const totals = (chart.options.plugins as any)?.barTotals?.totals as number[] | undefined;
    if (!totals?.length) return;

    const ctx = chart.ctx;
    const yScale = chart.scales['y'];
    const chartArea = chart.chartArea;
    if (!yScale || !chartArea) return;

    ctx.save();
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const x = chartArea.right + 8;

    totals.forEach((total, index) => {
      const y = yScale.getPixelForValue(index);
      ctx.fillText(String(total), x, y);
    });

    ctx.restore();
  },
};

Chart.register(barTotalsPlugin);
