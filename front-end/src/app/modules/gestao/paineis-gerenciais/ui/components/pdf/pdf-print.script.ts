import {
  A4_ALTURA_UTIL_PX,
  ALTURA_MINIMA_GRAFICO_PX,
  LARGURA_FALLBACK_PX,
  DELAY_IMPRESSAO_MS,
} from './pdf.constants';

/**
 * Script executado na nova aba de impressão.
 * Renderiza os charts via Chart.js acessado do window.opener.
 *
 * As constantes são injetadas no momento do build da string
 * para evitar duplicação com pdf.constants.ts.
 */
export const PRINT_SCRIPT = `
  (function() {
    var ALTURA_PAGINA_UTIL = ${A4_ALTURA_UTIL_PX};
    var ALTURA_MINIMA_GRAFICO = ${ALTURA_MINIMA_GRAFICO_PX};
    var LARGURA_FALLBACK = ${LARGURA_FALLBACK_PX};
    var DELAY_IMPRESSAO_MS = ${DELAY_IMPRESSAO_MS};

    var Chart = window.opener.__pdfChart;
    if (!Chart) {
      alert('Erro ao gerar PDF: Chart.js não disponível.');
      window.close();
      return;
    }

    var chartsConfig = window.opener.__pdfChartsConfig;
    if (!chartsConfig) {
      alert('Erro ao gerar PDF: configuração dos gráficos não encontrada.');
      window.close();
      return;
    }

    var thead = document.querySelector('thead td');
    var alturaCabecalho = thead ? thead.offsetHeight : 0;

    chartsConfig.forEach(function(cfg) {
      var container = document.getElementById(cfg.containerId);
      if (!container) return;
      var canvas = container.querySelector('canvas');
      if (!canvas) return;

      // Medir altura dos elementos fixos do indicador (título, info, legenda, origem)
      var indicador = container.closest('.pdf-indicador');
      var alturaElementosFixos = 0;
      if (indicador) {
        var indicadorStyle = getComputedStyle(indicador);
        var paddingVertical = parseInt(indicadorStyle.paddingTop) + parseInt(indicadorStyle.paddingBottom);
        var borderVertical = parseInt(indicadorStyle.borderTopWidth) + parseInt(indicadorStyle.borderBottomWidth);
        var marginTop = parseInt(indicadorStyle.marginTop);

        Array.from(indicador.children).forEach(function(child) {
          if (!child.classList.contains('pdf-indicador__grafico')) {
            var childStyle = getComputedStyle(child);
            alturaElementosFixos += child.offsetHeight + parseInt(childStyle.marginTop) + parseInt(childStyle.marginBottom);
          }
        });

        alturaElementosFixos += paddingVertical + borderVertical + marginTop;
      }

      var alturaDisponivel = ALTURA_PAGINA_UTIL - alturaCabecalho - alturaElementosFixos;
      alturaDisponivel = Math.max(alturaDisponivel, ALTURA_MINIMA_GRAFICO);

      // Altura ideal mantendo aspect ratio original do gráfico
      var larguraContainer = container.parentElement ? container.parentElement.offsetWidth : LARGURA_FALLBACK;
      var alturaIdeal = cfg.originalHeight * (larguraContainer / cfg.originalWidth);

      // Usar a menor entre a ideal (proporção) e a disponível (limite da página)
      var alturaFinal = Math.min(alturaIdeal, alturaDisponivel);

      container.style.height = alturaFinal + 'px';
      container.style.position = 'relative';

      canvas.style.width = '100%';
      canvas.style.height = '100%';

      var opts = Object.assign({}, cfg.options, {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: Object.assign({}, cfg.options ? cfg.options.plugins : {}, {
          tooltip: { enabled: false },
          datalabels: { display: false },
        }),
      });

      new Chart(canvas, {
        type: cfg.type,
        data: cfg.data,
        options: opts,
      });
    });

    delete window.opener.__pdfChartsConfig;
    delete window.opener.__pdfChart;

    setTimeout(function() {
      window.addEventListener('afterprint', function() {
        window.close();
      });
      window.print();
    }, DELAY_IMPRESSAO_MS);
  })();
`;
