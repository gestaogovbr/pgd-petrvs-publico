import { ComponentColor } from 'src/app/components/component-base';

export const PRAZO_INATIVACAO_SERVIDOR_DIAS = 30;

const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;
const LIMITE_ALERTA_PRAZO_DIAS = 5;

export interface PrazoInativacaoServidor {
  label: string;
  color: ComponentColor;
  hint: string;
  vencido: boolean;
  diasRestantes: number | null;
}

export interface GridBlacklistServidorRecarregavel {
  query?: { refresh: () => void };
}

export function recarregarGridBlacklistServidor(grid?: GridBlacklistServidorRecarregavel): void {
  grid?.query?.refresh();
}

export function calcularPrazoInativacaoServidor(
  createdAt: Date | string | null | undefined,
  inativado: boolean | number | string,
  agora: Date = new Date()
): PrazoInativacaoServidor {
  if (registroFoiInativado(inativado)) {
    return {
      label: 'Inativado',
      color: 'secondary',
      hint: 'O processamento de inativação deste servidor foi concluído.',
      vencido: false,
      diasRestantes: 0
    };
  }

  const dataCriacao = createdAt instanceof Date ? createdAt : new Date(createdAt ?? '');
  if (Number.isNaN(dataCriacao.getTime())) {
    return {
      label: 'Prazo indisponível',
      color: 'warning',
      hint: 'Não foi possível calcular o prazo porque a data de criação está ausente ou inválida.',
      vencido: false,
      diasRestantes: null
    };
  }

  const dataLimite = dataCriacao.getTime() + PRAZO_INATIVACAO_SERVIDOR_DIAS * MILISSEGUNDOS_POR_DIA;
  const tempoRestante = dataLimite - agora.getTime();

  if (tempoRestante <= 0) {
    return {
      label: 'Prazo vencido',
      color: 'danger',
      hint: 'O prazo terminou e o registro aguarda a rotina diária de inativação.',
      vencido: true,
      diasRestantes: 0
    };
  }

  const diasRestantes = Math.ceil(tempoRestante / MILISSEGUNDOS_POR_DIA);

  return {
    label: `${diasRestantes} ${diasRestantes === 1 ? 'dia restante' : 'dias restantes'}`,
    color: diasRestantes <= LIMITE_ALERTA_PRAZO_DIAS ? 'warning' : 'info',
    hint: `Inativação prevista após ${PRAZO_INATIVACAO_SERVIDOR_DIAS} dias sem retorno confirmado do SIAPE.`,
    vencido: false,
    diasRestantes
  };
}

function registroFoiInativado(inativado: boolean | number | string): boolean {
  return inativado === true || inativado === 1 || inativado === '1';
}
