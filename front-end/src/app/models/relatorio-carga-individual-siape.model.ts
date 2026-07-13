export type RelatorioCargaIndividualSiapeStatusCampo =
  'confirmado' |
  'ajustado' |
  'divergente' |
  'nao_aplicavel' |
  'nao_encontrado';

export type RelatorioCargaIndividualSiapeTipo = 'servidor' | 'unidade';

export type RelatorioCargaIndividualSiapeCampo = {
  campo: string;
  rotulo: string;
  recebido_siape: string | null;
  registrado_petrvs: string | null;
  status: RelatorioCargaIndividualSiapeStatusCampo;
};

export type RelatorioCargaIndividualSiapeSecao = {
  titulo: string;
  tipo: RelatorioCargaIndividualSiapeTipo;
  matricula?: string | null;
  indice?: number | null;
  status_vinculo?: 'ativo' | 'excluido' | null;
  data_ocorrencia_exclusao?: string | null;
  campos: RelatorioCargaIndividualSiapeCampo[];
};

export type RelatorioCargaIndividualSiape = {
  id: string;
  processamento_id: string;
  tipo: RelatorioCargaIndividualSiapeTipo;
  chave: string;
  status: 'sucesso' | 'parcial' | 'erro';
  entrada_valida: boolean;
  mensagem_usuario: string;
  orientacoes: string[];
  secoes: RelatorioCargaIndividualSiapeSecao[];
  processado_em: string | null;
};

export type RelatorioCargaIndividualSiapeResponse = {
  success: boolean;
  relatorio?: RelatorioCargaIndividualSiape;
  relatorios?: RelatorioCargaIndividualSiape[];
  message?: string;
};
