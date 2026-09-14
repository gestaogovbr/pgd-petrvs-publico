export type DispensaPlanoTrabalhoHistorico = {
  id: string;
  operacao: 'FORMALIZAR' | 'ALTERAR' | 'ENCERRAR' | string;
  data_inicio: string;
  data_fim: string | null;
  ciencia_em: string;
  responsavel_id: string;
  responsavel_nome: string;
  created_at: string;
};

export type DispensaPlanoTrabalhoResumo = {
  usuario_id: string;
  usuario_nome: string;
  elegivel: boolean;
  pode_formalizar: boolean;
  vigente: boolean;
  pode_encerrar: boolean;
  dispensa_id: string | null;
  data_inicio: string | null;
  data_fim: string | null;
  ciencia_em: string | null;
  responsavel_id: string | null;
  responsavel_nome: string | null;
  atualizado_em: string | null;
  historico: DispensaPlanoTrabalhoHistorico[];
};
