import { lerIntervaloDoPicker, ultimoDiaDoMes } from './datas';
import { DatetimePickerChangeDetail } from '@govbr-ds/webcomponents';

/** Monta o detail de range em modo date, como o picker emite. */
function detailRange(
  start: string | null,
  end: string | null,
  complete = start !== null && end !== null,
): DatetimePickerChangeDetail {
  return {
    mode: 'date',
    selectionMode: 'range',
    value: { start, end },
    serializedValue: `${start ?? ''}/${end ?? ''}`,
    complete,
  };
}

describe('ultimoDiaDoMes', () => {
  it('deve retornar o último dia de fevereiro em ano não bissexto', () => {
    expect(ultimoDiaDoMes(2023, 2)).toBe('2023-02-28');
  });

  it('deve retornar o último dia de fevereiro em ano bissexto', () => {
    expect(ultimoDiaDoMes(2024, 2)).toBe('2024-02-29');
  });

  it('deve retornar o último dia de um mês de 30 dias', () => {
    expect(ultimoDiaDoMes(2024, 4)).toBe('2024-04-30');
    expect(ultimoDiaDoMes(2024, 6)).toBe('2024-06-30');
    expect(ultimoDiaDoMes(2024, 9)).toBe('2024-09-30');
    expect(ultimoDiaDoMes(2024, 11)).toBe('2024-11-30');
  });

  it('deve retornar o último dia de um mês de 31 dias', () => {
    expect(ultimoDiaDoMes(2024, 1)).toBe('2024-01-31');
    expect(ultimoDiaDoMes(2024, 3)).toBe('2024-03-31');
    expect(ultimoDiaDoMes(2024, 7)).toBe('2024-07-31');
    expect(ultimoDiaDoMes(2024, 8)).toBe('2024-08-31');
    expect(ultimoDiaDoMes(2024, 10)).toBe('2024-10-31');
  });

  it('deve retornar o último dia de dezembro', () => {
    expect(ultimoDiaDoMes(2024, 12)).toBe('2024-12-31');
  });
});

describe('lerIntervaloDoPicker', () => {
  it('deve ler intervalo completo', () => {
    const intervalo = lerIntervaloDoPicker(detailRange('2024-01-01', '2024-06-30'));

    expect(intervalo).toEqual({ inicio: '2024-01-01', fim: '2024-06-30' });
  });

  it('deve retornar intervalo null quando complete for falso', () => {
    const intervalo = lerIntervaloDoPicker(detailRange('2024-01-01', null, false));

    expect(intervalo).toBeNull();
  });

  it('deve retornar intervalo null quando faltar um limite', () => {
    const intervalo = lerIntervaloDoPicker(detailRange('2024-01-01', null));

    expect(intervalo).toBeNull();
  });

  it('deve retornar intervalo null quando os limites estiverem vazios', () => {
    expect(lerIntervaloDoPicker(detailRange('', ''))).toBeNull();
  });

  it('deve retornar intervalo null quando o modo não for date', () => {
    const detail: DatetimePickerChangeDetail = {
      mode: 'datetime',
      selectionMode: 'range',
      value: { start: '2024-01-01T00:00:00-03:00', end: '2024-06-30T00:00:00-03:00' },
      serializedValue: '2024-01-01T00:00:00-03:00/2024-06-30T00:00:00-03:00',
      complete: true,
    };

    expect(lerIntervaloDoPicker(detail)).toBeNull();
  });

  it('deve retornar intervalo null quando o modo de seleção não for range', () => {
    const detail: DatetimePickerChangeDetail = {
      mode: 'date',
      selectionMode: 'single',
      value: new Date(2024, 0, 1),
      serializedValue: '2024-01-01',
    };

    expect(lerIntervaloDoPicker(detail)).toBeNull();
  });

  it('deve considerar válido quando início e fim são iguais', () => {
    const intervalo = lerIntervaloDoPicker(detailRange('2024-01-01', '2024-01-01'));

    expect(intervalo).toEqual({ inicio: '2024-01-01', fim: '2024-01-01' });
  });

  it('deve repassar intervalo invertido (a ordem é validada pelo picker e pelo back-end)', () => {
    const intervalo = lerIntervaloDoPicker(detailRange('2024-06-30', '2024-01-01'));

    expect(intervalo).toEqual({ inicio: '2024-06-30', fim: '2024-01-01' });
  });
});
