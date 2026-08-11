import { Injectable } from '@angular/core';

export interface PdfCabecalho {
  painel: string;
  tipoConsulta?: string;
  unidade: string;
  periodo?: string;
}

export interface PdfIndicador {
  titulo: string;
  informacaoAdicional: string;
  origemDados: string;
  canvasEl: HTMLCanvasElement | null;
  segmentos: { nome: string; cor: string }[];
  distribuicoes: { sigla: string; total: number }[];
}

@Injectable()
export class PainelPdfService {

  exportar(cabecalho: PdfCabecalho, indicadores: PdfIndicador[]): void {
    const html = this.montarHtml(cabecalho, indicadores);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.src = url;

    iframe.onload = () => {
      iframe.contentWindow?.print();
      // Remove iframe após impressão/cancelamento
      iframe.contentWindow?.addEventListener('afterprint', () => {
        iframe.remove();
        URL.revokeObjectURL(url);
      });
      // Fallback: remove após timeout caso afterprint não dispare
      setTimeout(() => {
        if (iframe.parentNode) {
          iframe.remove();
          URL.revokeObjectURL(url);
        }
      }, 60000);
    };

    document.body.appendChild(iframe);
  }

  private montarHtml(cabecalho: PdfCabecalho, indicadores: PdfIndicador[]): string {
    const indicadoresHtml = indicadores.map(ind => {
      const grafico = ind.canvasEl
        ? `<div style="display: flex; align-items: flex-start; gap: 8px;">
            <img src="${ind.canvasEl.toDataURL('image/png')}" style="max-height: 80vh; width: auto; height: auto; flex: 1; object-fit: contain;" />
            <div style="display: flex; flex-direction: column; justify-content: space-around; padding: 4px 0;">
              ${ind.distribuicoes.map(d => `<span style="font-size: 11px; font-weight: 600; white-space: nowrap;">${d.total}</span>`).join('')}
            </div>
          </div>`
        : '<p style="color: #999; font-style: italic;">Sem dados para exibir.</p>';

      const legendaHtml = ind.segmentos.map(s =>
        `<span style="display: inline-flex; align-items: center; margin-right: 16px;">
          <span style="width: 12px; height: 12px; border-radius: 2px; background-color: ${s.cor}; display: inline-block; margin-right: 4px; -webkit-print-color-adjust: exact; print-color-adjust: exact;"></span>
          <span style="font-size: 11px;">${s.nome}</span>
        </span>`
      ).join('');

      return `
        <tr><td style="padding-top: 16px;">
          <div style="border: 1px solid #ddd; padding: 16px; page-break-inside: avoid;">
            <h3 style="margin: 0 0 4px 0; font-size: 14px;">${ind.titulo}</h3>
            <p style="margin: 0 0 12px 0; font-size: 10px; color: #666; font-style: italic;">${ind.informacaoAdicional}</p>
            ${grafico}
            ${ind.canvasEl ? `<div style="margin-top: 8px;">${legendaHtml}</div>` : ''}
            <p style="margin: 8px 0 0 0; font-size: 9px; color: #999; font-style: italic;">${ind.origemDados}</p>
          </div>
        </td></tr>
      `;
    }).join('');

    const tipoConsultaHtml = cabecalho.tipoConsulta
      ? `<p style="margin: 2px 0; font-size: 12px;"><strong>Tipo de Consulta:</strong> ${cabecalho.tipoConsulta}</p>`
      : '';

    const periodoHtml = cabecalho.periodo
      ? `<p style="margin: 2px 0; font-size: 12px;"><strong>Período:</strong> ${cabecalho.periodo}</p>`
      : '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Painel Gerencial - ${cabecalho.painel}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; color: #333; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: portrait; margin: 10mm; }
          table { width: 100%; border-collapse: collapse; }
          thead { display: table-header-group; }
          thead td { padding-bottom: 8px; border-bottom: 1px solid #ccc; }
          tbody td { vertical-align: top; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr><td>
              <h2 style="margin: 0 0 8px 0; font-size: 16px;">Painel Gerencial: ${cabecalho.painel}</h2>
              ${tipoConsultaHtml}
              <p style="margin: 2px 0; font-size: 12px;"><strong>Unidade:</strong> ${cabecalho.unidade}</p>
              ${periodoHtml}
              <p style="margin: 2px 0 0 0; font-size: 12px;"><strong>Data/hora de geração:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            </td></tr>
          </thead>
          <tbody>
            ${indicadoresHtml}
          </tbody>
        </table>
      </body>
      </html>
    `;
  }
}
