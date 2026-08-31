export type MuralAviso = {
  id: string;
  titulo: string;
  conteudo: string;
  destinatario: 'TODOS' | 'TENANT_ESPECIFICO';
  tenant_id: string | null;
  remetente_tipo: 'ORGAO_CENTRAL' | 'TENANT';
  remetente_tenant_id: string | null;
  publicado_por_id: number;
  data_publicacao: string;
  data_expiracao: string;
};

export type MuralAvisoPendente = {
  id: string;
  titulo: string;
  conteudo: string;
  remetente: string;
  data_publicacao: string;
};
