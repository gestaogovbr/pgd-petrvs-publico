import {
  MENSAGEM_CONFIRMACAO_PARTICIPANTE_CHEFIA_SUBSTITUTO_SUPERIOR,
  MENSAGEM_CONFIRMACAO_PRIMEIRO_SIGNATARIO,
  MENSAGEM_CONFIRMACAO_SEGUNDO_SIGNATARIO,
  assinaturaConcluiCiclo,
  contarAssinaturasExigidasPlano,
  mensagemConfirmacaoAssinaturaPlano,
} from './plano-trabalho-assinatura.messages';

describe('plano-trabalho-assinatura.messages', () => {
  const planoPadrao = {
    unidade_id: 'unidade-plano',
    usuario: {
      lotacao: {
        unidade_id: 'unidade-plano',
        unidade: { unidade_pai_id: 'unidade-pai-lotacao' },
      },
    },
  } as any;

  const planoTresAssinaturas = {
    unidade_id: 'unidade-outra',
    usuario: {
      lotacao: {
        unidade_id: 'unidade-lotacao',
        unidade: { unidade_pai_id: 'unidade-pai-lotacao' },
      },
    },
  } as any;

  it('padrão exige 2 assinaturas', () => {
    expect(contarAssinaturasExigidasPlano({ plano: planoPadrao })).toBe(2);
  });

  it('exige 3 quando a unidade do plano não é a lotação nem a superior imediata', () => {
    expect(contarAssinaturasExigidasPlano({ plano: planoTresAssinaturas })).toBe(3);
  });

  it('exige 1 quando o usuário logado é gestor da unidade superior ao plano', () => {
    expect(
      contarAssinaturasExigidasPlano({
        plano: planoTresAssinaturas,
        usuarioLogadoEhGestorUnidadeSuperiorAoPlano: true,
      }),
    ).toBe(1);
  });

  it('usa mensagem do 1º signatário quando ainda falta outra assinatura', () => {
    expect(
      mensagemConfirmacaoAssinaturaPlano([], 'user-1', { plano: planoPadrao }),
    ).toBe(MENSAGEM_CONFIRMACAO_PRIMEIRO_SIGNATARIO);
  });

  it('usa mensagem do 2º signatário quando a assinatura completa o ciclo (2 exigidas)', () => {
    expect(
      mensagemConfirmacaoAssinaturaPlano(
        [{ usuario_id: 'user-2' }],
        'user-1',
        { plano: planoPadrao },
      ),
    ).toBe(MENSAGEM_CONFIRMACAO_SEGUNDO_SIGNATARIO);
  });

  it('mantém mensagem do 1º signatário no fluxo de 3 assinaturas até a última', () => {
    expect(
      assinaturaConcluiCiclo([{ usuario_id: 'a' }], 'user-1', { plano: planoTresAssinaturas }),
    ).toBe(false);
    expect(
      mensagemConfirmacaoAssinaturaPlano(
        [{ usuario_id: 'a' }, { usuario_id: 'b' }],
        'user-1',
        { plano: planoTresAssinaturas },
      ),
    ).toBe(MENSAGEM_CONFIRMACAO_SEGUNDO_SIGNATARIO);
  });

  it('usa mensagem de execução quando só uma assinatura é exigida', () => {
    expect(
      mensagemConfirmacaoAssinaturaPlano([], 'user-1', {
        plano: planoPadrao,
        usuarioLogadoEhGestorUnidadeSuperiorAoPlano: true,
      }),
    ).toBe(MENSAGEM_CONFIRMACAO_SEGUNDO_SIGNATARIO);
  });

  it('usa mensagem específica quando o participante é chefia e substituto da unidade superior', () => {
    const planoChefiaSubstituto = {
      usuario_id: 'participante-1',
      unidade_id: 'unidade-plano',
      usuario: { id: 'participante-1' },
    } as any;

    expect(
      mensagemConfirmacaoAssinaturaPlano([], 'participante-1', {
        plano: planoChefiaSubstituto,
        participanteEhChefiaComSubstitutoUnidadeSuperior: true,
      }),
    ).toBe(MENSAGEM_CONFIRMACAO_PARTICIPANTE_CHEFIA_SUBSTITUTO_SUPERIOR);
  });
});
