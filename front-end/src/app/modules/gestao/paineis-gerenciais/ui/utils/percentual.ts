/**
 * Calcula percentuais inteiros garantindo que a soma seja exatamente 100%.
 * Usa o algoritmo Largest Remainder para distribuir o resíduo do arredondamento.
 *
 * @param valores Array de valores absolutos
 * @param total Denominador (se omitido, usa a soma dos valores)
 * @returns Array de percentuais inteiros que somam 100% (ou 0 se total for 0)
 */
export function calcularPercentuais(valores: number[], total?: number): number[] {
  const denominador = total ?? valores.reduce((a, b) => a + b, 0);

  if (denominador === 0) {
    return valores.map(() => 0);
  }

  const exatos = valores.map(v => (v / denominador) * 100);
  const truncados = exatos.map(v => Math.floor(v));
  let residuo = 100 - truncados.reduce((a, b) => a + b, 0);

  // Distribui o resíduo nos valores com maior parte decimal
  const indices = exatos
    .map((v, i) => ({ i, decimal: v - Math.floor(v) }))
    .sort((a, b) => b.decimal - a.decimal);

  for (const { i } of indices) {
    if (residuo <= 0) break;
    truncados[i]++;
    residuo--;
  }

  return truncados;
}
