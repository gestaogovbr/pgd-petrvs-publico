/**
 * Converte valor de filtro da API tenant v2 para string na query (`filters[chave]=...`).
 * Alinhado ao uso em listagens Laravel: datas em ISO, boolean como `1`/`0`, objetos via `JSON.stringify`.
 */
export function stringifyFilterValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'boolean') {
    return value ? '1' : '0';
  }
  return JSON.stringify(value);
}
