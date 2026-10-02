import {
  calcularPrazoInativacaoServidor,
  PRAZO_INATIVACAO_SERVIDOR_DIAS,
  recarregarGridBlacklistServidor
} from './blacklist-servidor-prazo';

describe('calcularPrazoInativacaoServidor', () => {
  const agora = new Date('2026-09-08T12:00:00Z');

  it('issue 2555 - demonstra os dias restantes para inativacao', () => {
    const criadoEm = new Date('2026-08-19T12:00:00Z');

    const prazo = calcularPrazoInativacaoServidor(criadoEm, false, agora);

    expect(prazo.diasRestantes).toBe(10);
    expect(prazo.label).toBe('10 dias restantes');
    expect(prazo.vencido).toBeFalse();
  });

  it('issue 2555 - usa singular quando resta um dia', () => {
    const criadoEm = new Date('2026-08-10T12:00:00Z');

    const prazo = calcularPrazoInativacaoServidor(criadoEm, false, agora);

    expect(prazo.label).toBe('1 dia restante');
    expect(prazo.color).toBe('warning');
  });

  it('issue 2555 - sinaliza prazo vencido enquanto aguarda a rotina diaria', () => {
    const criadoEm = new Date(agora.getTime());
    criadoEm.setUTCDate(criadoEm.getUTCDate() - PRAZO_INATIVACAO_SERVIDOR_DIAS - 1);

    const prazo = calcularPrazoInativacaoServidor(criadoEm, false, agora);

    expect(prazo.label).toBe('Prazo vencido');
    expect(prazo.color).toBe('danger');
    expect(prazo.vencido).toBeTrue();
  });

  it('issue 2555 - identifica registro com inativacao concluida', () => {
    const prazo = calcularPrazoInativacaoServidor(agora, 1, agora);

    expect(prazo.label).toBe('Inativado');
    expect(prazo.diasRestantes).toBe(0);
    expect(prazo.vencido).toBeFalse();
  });

  it('issue 2555 - trata data de criacao invalida sem prazo enganoso', () => {
    const prazo = calcularPrazoInativacaoServidor('data-invalida', false, agora);

    expect(prazo.label).toBe('Prazo indisponível');
    expect(prazo.diasRestantes).toBeNull();
  });
});

describe('recarregarGridBlacklistServidor', () => {
  it('recarrega a consulta pela acao visual de apoio', () => {
    const refresh = jasmine.createSpy('refresh');

    recarregarGridBlacklistServidor({ query: { refresh } });

    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it('nao falha antes da inicializacao do grid', () => {
    expect(() => recarregarGridBlacklistServidor()).not.toThrow();
  });
});
