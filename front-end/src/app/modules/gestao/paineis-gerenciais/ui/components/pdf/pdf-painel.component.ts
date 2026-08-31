import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { PRINT_SCRIPT } from './pdf-print.script';
import { A4_MARGEM_MM, A4_LARGURA_UTIL_MM } from './pdf.constants';

export interface GraficoExportavel {
  getChartExportData(): { type: string; data: ChartData; options: ChartConfiguration['options']; width: number; height: number } | null;
}

export interface PdfIndicadorConfig {
  titulo: string;
  informacaoAdicional: string;
  origemDados: string;
  chartComponent: GraficoExportavel | null;
  segmentos: { nome: string; cor: string }[];
  distribuicoes: { sigla: string; total: number }[];
}

export interface PdfCabecalho {
  painel: string;
  tipoConsulta?: string;
  unidade: string;
  periodo?: string;
}

interface IndicadorRender {
  titulo: string;
  informacaoAdicional: string;
  origemDados: string;
  temGrafico: boolean;
  segmentos: { nome: string; cor: string }[];
}

interface ChartRenderInfo {
  containerId: string;
  type: string;
  data: any;
  options: any;
  originalWidth: number;
  originalHeight: number;
}

@Component({
  selector: 'pdf-painel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: './pdf-painel.component.html',
  styleUrls: ['./pdf-painel.component.scss'],
})
export class PdfPainelComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('conteudo', { read: ElementRef }) private conteudoRef!: ElementRef;

  readonly visivel = signal(false);
  readonly cabecalho = signal<PdfCabecalho | null>(null);
  readonly indicadoresRender = signal<IndicadorRender[]>([]);

  get dataGeracao(): string {
    return new Date().toLocaleString('pt-BR');
  }

  readonly larguraUtil = `${A4_LARGURA_UTIL_MM}mm`;

  imprimir(cabecalho: PdfCabecalho, configs: PdfIndicadorConfig[]): void {
    const charts: ChartRenderInfo[] = [];

    const renderData: IndicadorRender[] = configs.map((config, i) => {
      const chartExport = config.chartComponent?.getChartExportData() ?? null;

      if (chartExport) {
        charts.push({
          containerId: `chart-${i}`,
          type: chartExport.type,
          data: chartExport.data,
          options: chartExport.options,
          originalWidth: chartExport.width,
          originalHeight: chartExport.height,
        });
      }

      return {
        titulo: config.titulo,
        informacaoAdicional: config.informacaoAdicional,
        origemDados: config.origemDados,
        temGrafico: !!chartExport,
        segmentos: config.segmentos,
      };
    });

    // Renderizar template Angular para capturar HTML
    this.cabecalho.set(cabecalho);
    this.indicadoresRender.set(renderData);
    this.visivel.set(true);
    this.cdr.detectChanges();

    const conteudoHtml = this.conteudoRef.nativeElement.innerHTML;

    this.visivel.set(false);
    this.cdr.detectChanges();

    // Abrir nova aba com o HTML capturado + script de charts
    this.abrirAba(conteudoHtml, cabecalho.painel, charts);
  }

  private abrirAba(conteudo: string, titulo: string, charts: ChartRenderInfo[]): void {
    const css = this.extrairEstilos();

    (window as any).__pdfChart = Chart;
    (window as any).__pdfChartsConfig = charts;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Painel Gerencial - ${titulo}</title>
  <style>
    body { margin: 0 auto; padding: ${A4_MARGEM_MM}mm; max-width: ${A4_LARGURA_UTIL_MM}mm; }
    @page { size: A4 portrait; margin: ${A4_MARGEM_MM}mm; }
    ${css}
  </style>
</head>
<body>
  ${conteudo}
  <script>${PRINT_SCRIPT}</script>
</body>
</html>`;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(html);
    printWindow.document.close();
  }

  private extrairEstilos(): string {
    const estilos: string[] = [];

    document.querySelectorAll('style').forEach(style => {
      if (style.textContent?.includes('.pdf-painel') || style.textContent?.includes('.pdf-indicador')) {
        estilos.push(style.textContent);
      }
    });

    return estilos.join('\n');
  }
}
