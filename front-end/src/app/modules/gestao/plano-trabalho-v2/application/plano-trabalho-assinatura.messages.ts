import type { PlanoTrabalho } from '../domain/types';

export const MENSAGEM_CONFIRMACAO_PRIMEIRO_SIGNATARIO =
  'Ao assinar este Plano de Trabalho, ele será encaminhado para a assinatura do segundo signatário e não poderá mais ser excluído. Deseja confirmar?';

export const MENSAGEM_CONFIRMACAO_SEGUNDO_SIGNATARIO =
  'Ao assinar este Plano de Trabalho, ele passará para a fase de execução e não poderá mais ser editado. Deseja confirmar?';

export type ContagemAssinaturasPlanoInput = {
  plano?: PlanoTrabalho | null;
  /** Usuário logado é gestor da unidade imediatamente superior à unidade do plano. */
  usuarioLogadoEhGestorUnidadeSuperiorAoPlano?: boolean;
};

/** Quantidade de assinaturas exigidas conforme o plano (não o programa). */
export function contarAssinaturasExigidasPlano(input: ContagemAssinaturasPlanoInput = {}): number {
  if (input.usuarioLogadoEhGestorUnidadeSuperiorAoPlano) {
    return 1;
  }

  const plano = input.plano;
  if (plano && planoExigeTresAssinaturas(plano)) {
    return 3;
  }

  return 2;
}

/** Plano em unidade distinta da lotação e que não é a unidade imediatamente superior à lotação. */
function planoExigeTresAssinaturas(plano: PlanoTrabalho): boolean {
  const unidadePlanoId = plano.unidade_id;
  const lotacaoUnidadeId = plano.usuario?.lotacao?.unidade_id;
  if (!lotacaoUnidadeId) {
    return false;
  }

  if (unidadePlanoId === lotacaoUnidadeId) {
    return false;
  }

  const unidadeImediataSuperiorLotacao = plano.usuario?.lotacao?.unidade?.unidade_pai_id ?? null;
  if (unidadePlanoId === unidadeImediataSuperiorLotacao) {
    return false;
  }

  return true;
}

/** Indica se, após a assinatura do usuário atual, o ciclo exigido pelo regramento estará completo. */
export function assinaturaConcluiCiclo(
  assinaturas: { usuario_id: string }[],
  usuarioAtualId: string,
  input: ContagemAssinaturasPlanoInput = {},
): boolean {
  const exigidas = contarAssinaturasExigidasPlano(input);
  const assinaturasOutros = assinaturas.filter(a => a.usuario_id !== usuarioAtualId);
  return assinaturasOutros.length + 1 >= exigidas;
}

/** Mensagem de confirmação para quem ainda não completa o ciclo ou para o último signatário. */
export function mensagemConfirmacaoAssinaturaPlano(
  assinaturas: { usuario_id: string }[],
  usuarioAtualId: string,
  input: ContagemAssinaturasPlanoInput = {},
): string {
  return assinaturaConcluiCiclo(assinaturas, usuarioAtualId, input)
    ? MENSAGEM_CONFIRMACAO_SEGUNDO_SIGNATARIO
    : MENSAGEM_CONFIRMACAO_PRIMEIRO_SIGNATARIO;
}
