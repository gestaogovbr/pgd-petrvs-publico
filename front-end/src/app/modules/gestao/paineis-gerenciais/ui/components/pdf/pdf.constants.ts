/** Dimensões da página A4 */
export const A4_ALTURA_MM = 297;
export const A4_LARGURA_MM = 210;

/** Margem da página para impressão */
export const A4_MARGEM_MM = 10;

/** Largura útil (A4 - margens laterais) */
export const A4_LARGURA_UTIL_MM = A4_LARGURA_MM - A4_MARGEM_MM * 2; // 190mm

/** Conversão de mm para px (96dpi) */
export const PX_POR_MM = 3.7795;

/** Altura útil da página em px */
export const A4_ALTURA_UTIL_PX = (A4_ALTURA_MM - A4_MARGEM_MM * 2) * PX_POR_MM;

/** Altura mínima para um gráfico no PDF */
export const ALTURA_MINIMA_GRAFICO_PX = 150;

/** Largura fallback caso o container não tenha parent */
export const LARGURA_FALLBACK_PX = 600;

/** Delay antes de chamar window.print() (ms) */
export const DELAY_IMPRESSAO_MS = 200;
