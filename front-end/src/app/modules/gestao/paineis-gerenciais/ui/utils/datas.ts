import { DatetimePickerChangeDetail } from '@govbr-ds/webcomponents';
import { IntervaloDatas } from '../../infra/painel-api.client';

/**
 * Retorna o último dia do mês informado no formato `YYYY-MM-DD`.
 *
 * Usa `Date.UTC` apenas para descobrir a quantidade de dias do mês; a
 * formatação é feita por aritmética de string, sem `toISOString()`, portanto o
 * resultado independe do fuso horário do navegador.
 *
 * @param ano Ano com 4 dígitos (ex.: 2024).
 * @param mes Mês de 1 a 12.
 */
export function ultimoDiaDoMes(ano: number, mes: number): string {
  const dia = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  return `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

/**
 * Lê o `detail` do evento `brDatetimePickerChange` em modo `date` + `range`.
 *
 * Retorna `null` quando o evento não representa um intervalo completo (modo
 * diferente, seleção em andamento ou campo limpo). A ordem dos limites é
 * validada pelo próprio picker e pelo back-end.
 *
 * @param detail Payload do evento (`event.detail`).
 */
export function lerIntervaloDoPicker(detail: DatetimePickerChangeDetail): IntervaloDatas | null {
  if (detail.mode === 'date' && detail.selectionMode === 'range' && detail.complete) {
    const { start, end } = detail.value;
    if (start && end) {
      return { inicio: start, fim: end };
    }
  }

  return null;
}
