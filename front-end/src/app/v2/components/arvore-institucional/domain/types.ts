import { Observable } from 'rxjs';

// ─── Tipos de API (contrato back-end → front-end) ─────────────────────────────

/** Nó genérico retornado pela API (ArvoreNodeResponseDTO no back-end). */
export type ArvoreNodeApi = {
  id: string;
  nome: string;
  container_nome: string;
  tipo_nome: string | null;
  parent_id: string | null;
  secondary_parent_id: string | null;
  filhos_ids: string[];
  filhos_secondary_ids: string[];
  total_vinculos: number;
  esforco_disponivel_horas: number;
  esforco_proprio_horas: number;
  esforco_total_horas: number;
  planejado_percentual_disponivel: number;
};

/** Resposta genérica do endpoint de árvore (ArvoreResponseDTO no back-end). */
export type ArvoreApiResponse = {
  focal_id: string;
  nos: Record<string, ArvoreNodeApi>;
  metadata: Record<string, unknown>;
};

// ─── Configuração da Árvore Institucional ──────────────────────────────────────

/** Campo exibido nos cards da árvore SVG. */
export type CampoCard = {
  /** Chave do campo em ArvoreNodeData (ex: 'nome', 'containerNome'). */
  campo: string;
  /** Classe CSS opcional para estilo diferenciado. */
  cssClass?: string;
};

/** Campo exibido na seção "Informações gerais" do painel lateral. */
export type CampoInfoGeral = {
  label: string;
  campo: string;
};

/** Textos de tooltip para indicadores de uma seção do painel. */
export type PainelSecaoTooltips = {
  esforcoDisponivel: string;
  esforcoPlanejado: string;
  esforcoExecutado: string;
  participantes: string;
  totalEntregas: string;
  entregasConcluidas: string;
};

/** Configuração completa do componente de árvore institucional para um domínio. */
export type ArvoreInstitucionalConfig = {
  titulo: string;
  legendaPrimary: string;
  legendaSecondary: string;
  breadcrumbParents: Array<{ label: string; url: string }>;
  /** Segmentos de rota usados para navegar para outro nó (ex: ['gestao', 'planejamento', 'objetivo-arvore']). */
  rotaNavegacao: readonly string[];
  /** Campos exibidos no card do nó SVG (ordem define prioridade de exibição). */
  camposCard: CampoCard[];
  /** Campos exibidos na seção "Informações gerais" do painel lateral. */
  camposInfoGeral: CampoInfoGeral[];
  /** Tooltips para as seções do painel. null = sem tooltips. */
  tooltips: { item: PainelSecaoTooltips; consolidado: PainelSecaoTooltips } | null;
  /** Label do badge do nó focal (ex: 'consultado', 'central'). */
  badgeFocal: string;
  /** Label do botão de centralizar no painel lateral. */
  labelCentralizar: string;
  /** Label exibido no detalhe expandido para o nó de origem (ex: "Item do planejamento", "Processo de origem"). */
  labelNoOrigem: string;
  /** Subtítulo exibido no card-header da árvore (ex: nome da cadeia de valor). Extraído de metadata. */
  subtituloMetadataKey?: string;
};

// ─── Dados da Árvore ───────────────────────────────────────────────────────────

/** Dados de um nó genérico da árvore. */
export type ArvoreNodeData = {
  id: string;
  nome: string;
  /** Nome do container (planejamento ou cadeia de valor). */
  containerNome: string;
  /** Tipo/etiqueta do nó (tipo objetivo ou etiqueta de processo). */
  tipoNome: string | null;
  /** ID do pai na hierarquia principal (objetivo_pai_id ou processo_pai_id). */
  parentId: string | null;
  /** ID do pai na hierarquia secundária (objetivo_superior_id). null para domínios sem hierarquia dupla. */
  secondaryParentId: string | null;
  /** IDs dos filhos na hierarquia principal. */
  filhosIds: string[];
  /** IDs dos filhos na hierarquia secundária. [] para domínios sem hierarquia dupla. */
  filhosSecondaryIds: string[];
  /** Total de vínculos (entregas vinculadas, filhos, etc). */
  totalVinculos: number;
  /** Horas de esforço disponível do próprio nó. */
  esforcoDisponivel: number;
  /** Horas de esforço planejado do próprio nó. */
  esforcoProprioHoras: number;
  /** Horas de esforço acumulado (próprio + descendentes). */
  esforcoTotalHoras: number;
  /** Percentual planejado/disponível do próprio nó. */
  planejadoPercentualDisponivel: number;
  /** Dados extras arbitrários por domínio. */
  extras?: Record<string, unknown>;
};

/** Payload retornado pelo provider ao carregar a árvore. */
export type ArvoreData = {
  focalId: string;
  nos: Record<string, ArvoreNodeData>;
  /** Metadados adicionais (ex: cadeia_valor_nome). */
  metadata?: Record<string, unknown>;
};

// ─── Painel Lateral ────────────────────────────────────────────────────────────

export type EsforcoResumo = {
  disponivel_horas: number;
  planejado_horas: number;
  executado_horas: number;
  planejado_percentual_disponivel: number;
  executado_percentual_planejado: number;
  mostrar_disponivel: boolean;
  mostrar_planejado: boolean;
  mostrar_executado: boolean;
};

export type PessoasResumo = {
  total_participantes: number;
  participantes_somente_unidade_propria: number;
  participantes_somente_outras_unidades: number;
  participantes_em_ambas: number;
};

export type EntregasResumo = {
  total_entregas: number;
  entregas_concluidas: number;
  percentual_concluidas: number;
};

export type SecaoResumo = {
  esforco: EsforcoResumo;
  pessoas: PessoasResumo;
  entregas: EntregasResumo;
};

export type FiltroOpcao = {
  id: string;
  label: string;
};

/** Dados do painel lateral para um nó selecionado. */
export type PainelResumoData = {
  /** Campos para a seção "Informações gerais" (chave=campo, valor=conteúdo). */
  informacoesGerais: Record<string, string>;
  /** Seção "Item selecionado". */
  item: SecaoResumo;
  /** Seção "Consolidado" (item + subordinados). */
  consolidado: SecaoResumo;
  /** Opções do filtro de unidades. */
  filtro_unidades: FiltroOpcao[];
};

// ─── Detalhamento de Entregas ──────────────────────────────────────────────────

export type EntregaEtiqueta = {
  key: string;
  value: string;
  icon?: string | null;
  color?: string | null;
};

/** Linha do detalhamento de entregas (contrato unificado). */
export type EntregaDetalheLinha = {
  plano_entrega_entrega_id: string;
  unidade_id: string;
  unidade_sigla: string;
  unidade_nome: string;
  plano_entrega_id: string;
  plano_entrega_nome: string;
  plano_entrega_status: string;
  plano_entrega_vigencia_inicio: string;
  plano_entrega_vigencia_fim: string | null;
  entrega_titulo: string;
  entrega_descricao: string;
  descricao_meta: string;
  etiquetas: EntregaEtiqueta[] | null;
  progresso_esperado: number;
  progresso_realizado: number;
  meta: Record<string, unknown> | null;
  realizado: Record<string, unknown> | null;
  tipo_indicador: string | null;
  lista_qualitativos: Array<{ key: string; value: string }> | null;
  registro_execucao: string | null;
  participantes_total: number;
  participantes_somente_unidade_propria: number;
  participantes_somente_outras_unidades: number;
  participantes_em_ambas: number;
  esforco_disponivel_horas: number;
  esforco_planejado_horas: number;
  esforco_executado_horas: number;
  mostrar_disponivel: boolean;
  mostrar_planejado: boolean;
  mostrar_executado: boolean;
  // Opcional — identifica o nó de origem da entrega (relevante quando abrangência inclui subordinados)
  no_origem_id?: string | null;
  no_origem_nome?: string | null;
};

/** Escopos do filtro Abrangência. */
export type Abrangencia =
  | 'item_selecionado'
  | 'itens_subordinados'
  | 'item_e_subordinados'
  | 'unidade_selecionada'
  | 'unidade_e_subordinadas';

/** Filtros do modal de detalhamento. */
export type EntregasDetalhamentoFiltros = {
  plano_entrega_entrega_id?: string;
  unidade_id?: string;
  data_inicio?: string;
  data_fim?: string;
  abrangencia?: Abrangencia;
};

/** Dados retornados pelo provider para o detalhamento de entregas. */
export type EntregasDetalhamentoData = {
  itens: EntregaDetalheLinha[];
  filtro_entregas: FiltroOpcao[];
  filtro_unidades: FiltroOpcao[];
};

// ─── View Models (componente SVG) ──────────────────────────────────────────────

export type TreeNodeVm = {
  id: string;
  nome: string;
  containerNome: string;
  tipoNome: string | null;
  totalVinculos: number;
  esforcoProprioHoras: number;
  esforcoTotalHoras: number;
  planejadoPercentualDisponivel: number;
  /** % de contribuição no esforço acumulado do pai visível; null = nó focal. */
  percentualDoPai: number | null;
  isFocal: boolean;
  level: number;
  x: number;
  y: number;
  extras?: Record<string, unknown>;
};

export type EdgeVm = {
  key: string;
  type: 'PRIMARY' | 'SECONDARY';
  path: string;
};

/** Step de um ancestral na cadeia ascendente. */
export type AncestorStep = {
  id: string;
  link: 'PRIMARY' | 'SECONDARY';
  childId: string;
};

// ─── Provider Interface ────────────────────────────────────────────────────────

/** Contrato de acesso a dados para a árvore institucional. Cada domínio implementa. */
export interface ArvoreDataProvider {
  /** Carrega árvore completa a partir dos parâmetros de rota. */
  carregarArvore(params: Record<string, string>): Observable<ArvoreData>;

  /** Carrega dados de resumo do painel lateral para um nó. */
  carregarResumo(nodeId: string, filtros?: { unidade_id?: string }): Observable<PainelResumoData>;

  /** Carrega detalhamento de entregas com filtros opcionais. */
  carregarEntregasDetalhamento(
    nodeId: string,
    filtros?: EntregasDetalhamentoFiltros
  ): Observable<EntregasDetalhamentoData>;

  /** Navegar para outro nó da árvore (recarga). Parâmetros variam por domínio. */
  navegarParaNo(nodeId: string): void;
}
