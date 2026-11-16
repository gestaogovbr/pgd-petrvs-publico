import { PlanoTrabalho, planoTrabalhoStatusLabel } from './types';

function plano(overrides: Partial<PlanoTrabalho>): PlanoTrabalho {
  return { status: 'ATIVO', ...overrides } as unknown as PlanoTrabalho;
}

function isoLocal(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

describe('planoTrabalhoStatusLabel (#2740 Melhoria 1)', () => {
  it('retorna "Pronto para Execução" para plano ATIVO com início futuro', () => {
    expect(planoTrabalhoStatusLabel('ATIVO', plano({ data_inicio: '2999-01-01' as unknown as Date })))
      .toBe('Pronto para Execução');
  });

  it('mantém "Em execução" para plano ATIVO com início no passado', () => {
    expect(planoTrabalhoStatusLabel('ATIVO', plano({ data_inicio: '2000-01-01' as unknown as Date })))
      .toBe('Em execução');
  });

  it('mantém "Em execução" para plano ATIVO com início hoje', () => {
    expect(planoTrabalhoStatusLabel('ATIVO', plano({ data_inicio: isoLocal(new Date()) as unknown as Date })))
      .toBe('Em execução');
  });

  it('aceita data_inicio como Date', () => {
    expect(planoTrabalhoStatusLabel('ATIVO', plano({ data_inicio: new Date(2999, 0, 1) })))
      .toBe('Pronto para Execução');
  });

  it('não altera o label de status diferente de ATIVO com início futuro', () => {
    expect(planoTrabalhoStatusLabel('CONCLUIDO', plano({ status: 'CONCLUIDO', data_inicio: '2999-01-01' as unknown as Date })))
      .toBe('Concluído');
  });

  it('continua exibindo "Encerrado antecipadamente" quando encerrado_at está preenchido', () => {
    expect(planoTrabalhoStatusLabel('CONCLUIDO', plano({ status: 'CONCLUIDO', encerrado_at: '2026-10-20 10:00:00' })))
      .toBe('Encerrado antecipadamente');
  });

  it('retorna "-" quando o status é indefinido', () => {
    expect(planoTrabalhoStatusLabel(undefined, plano({}))).toBe('-');
  });
});
