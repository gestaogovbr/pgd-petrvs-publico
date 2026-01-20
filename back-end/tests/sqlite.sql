CREATE TABLE areas_atividades_externas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  ativo INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE areas_conhecimentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  ativo INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE areas_tematicas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  ativo INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE audits (
  id INTEGER   ,
  user_type TEXT DEFAULT NULL,
  user_id TEXT DEFAULT NULL,
  event TEXT ,
  auditable_type TEXT ,
  auditable_id TEXT ,
  old_values TEXT   DEFAULT NULL,
  new_values TEXT   DEFAULT NULL,
  url text DEFAULT NULL,
  ip_address TEXT DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  tags TEXT DEFAULT NULL,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  error_message TEXT DEFAULT NULL,
  enviado INTEGER  DEFAULT 0,
  PRIMARY KEY (id)
);   



CREATE TABLE cargos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  nivel TEXT DEFAULT NULL ,
  descricao TEXT DEFAULT NULL ,
  siape TEXT DEFAULT NULL ,
  cbo TEXT DEFAULT NULL ,
  efetivo INTEGER  DEFAULT 1 ,
  ativo INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE centros_treinamentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  ativo INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE cidades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  codigo_ibge TEXT  ,
  nome TEXT  ,
  tipo TEXT  ,
  uf TEXT  ,
  timezone INTEGER  ,
  PRIMARY KEY (id)
);  



CREATE TABLE disciplinas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  ativo INTEGER  DEFAULT 1 ,
  sigla TEXT DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE eixos_tematicos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  icone TEXT  ,
  cor TEXT  ,
  descricao text DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE envios (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  finished_at TEXT NULL DEFAULT NULL,
  sucesso INTEGER  DEFAULT 0,
  erros text DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  qtde_participantes_sucessos INTEGER  DEFAULT 0,
  qtde_participantes_falhas INTEGER  DEFAULT 0,
  qtde_entregas_sucessos INTEGER  DEFAULT 0,
  qtde_entregas_falhas INTEGER  DEFAULT 0,
  qtde_trabalhos_sucessos INTEGER  DEFAULT 0,
  qtde_trabalhos_falhas INTEGER  DEFAULT 0,
  numero INTEGER  ,
  qtde_participantes_aptos INTEGER  DEFAULT 0,
  qtde_entregas_aptos INTEGER  DEFAULT 0,
  qtde_trabalhos_aptos INTEGER  DEFAULT 0,
  PRIMARY KEY (id)
);  



CREATE TABLE funcoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  nivel TEXT DEFAULT NULL ,
  descricao TEXT DEFAULT NULL ,
  siape TEXT DEFAULT NULL ,
  cbo TEXT DEFAULT NULL ,
  ativo INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE grupos_especializados (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  ativo INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE integracao_servidores (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  cpf_ativo TEXT DEFAULT NULL,
  data_modificacao TEXT DEFAULT NULL,
  cpf TEXT DEFAULT NULL,
  nome TEXT DEFAULT NULL,
  emailfuncional TEXT DEFAULT NULL,
  sexo TEXT DEFAULT NULL,
  municipio TEXT DEFAULT NULL,
  uf TEXT DEFAULT NULL,
  data_nascimento TEXT DEFAULT NULL,
  telefone TEXT DEFAULT NULL,
  vinculo_ativo TEXT DEFAULT NULL,
  matriculasiape TEXT DEFAULT NULL,
  codigo_cargo TEXT DEFAULT NULL,
  coduorgexercicio TEXT DEFAULT NULL,
  coduorglotacao TEXT DEFAULT NULL,
  codigo_servo_exercicio TEXT DEFAULT NULL,
  nomeguerra TEXT DEFAULT NULL,
  situacao_funcional TEXT DEFAULT NULL,
  codupag TEXT DEFAULT NULL,
  dataexercicionoorgao TEXT DEFAULT NULL,
  funcoes TEXT   DEFAULT NULL,
  cpf_chefia_imediata TEXT DEFAULT NULL ,
  email_chefia_imediata TEXT DEFAULT NULL ,
  codigo_situacao_funcional TEXT DEFAULT NULL ,
  nome_jornada TEXT DEFAULT NULL ,
  cod_jornada INTEGER DEFAULT NULL ,
  modalidade_pgd TEXT DEFAULT NULL ,
  participa_pgd TEXT  ,
  ident_unica TEXT DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE integracao_unidades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  id_servo TEXT DEFAULT NULL,
  pai_servo TEXT DEFAULT NULL,
  codigo_siape TEXT DEFAULT NULL,
  pai_siape TEXT DEFAULT NULL,
  codupag TEXT DEFAULT NULL,
  nomeuorg TEXT DEFAULT NULL,
  siglauorg TEXT DEFAULT NULL,
  telefone TEXT DEFAULT NULL,
  email TEXT DEFAULT NULL,
  natureza TEXT DEFAULT NULL,
  fronteira TEXT DEFAULT NULL,
  fuso_horario TEXT DEFAULT NULL,
  cod_uop TEXT DEFAULT NULL,
  cod_unidade TEXT DEFAULT NULL,
  tipo TEXT DEFAULT NULL,
  tipo_desc TEXT DEFAULT NULL,
  na_rodovia TEXT DEFAULT NULL,
  logradouro TEXT DEFAULT NULL,
  bairro TEXT DEFAULT NULL,
  cep TEXT DEFAULT NULL,
  ptn_ge_coordenada TEXT DEFAULT NULL,
  municipio_siafi_siape TEXT DEFAULT NULL,
  municipio_siscom TEXT DEFAULT NULL,
  municipio_ibge TEXT DEFAULT NULL,
  municipio_nome TEXT DEFAULT NULL,
  municipio_uf TEXT DEFAULT NULL,
  ativa TEXT DEFAULT NULL,
  regimental TEXT DEFAULT NULL,
  data_modificacao TEXT DEFAULT NULL,
  und_nu_adicional TEXT DEFAULT NULL,
  cnpjupag TEXT DEFAULT NULL,
  cpf_titular_autoridade_uorg TEXT DEFAULT NULL,
  cpf_substituto_autoridade_uorg TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE jobs (
  id INTEGER   ,
  queue TEXT ,
  payload TEXT ,
  attempts INTEGER  ,
  reserved_at INTEGER  DEFAULT NULL,
  available_at INTEGER  ,
  created_at INTEGER  ,
  PRIMARY KEY (id)
);  



CREATE TABLE materiais_servicos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  tipo TEXT  DEFAULT 'MATERIAL' ,
  codigo TEXT DEFAULT NULL ,
  referencia TEXT DEFAULT NULL ,
  descricao TEXT  ,
  unidade_medida TEXT  ,
  PRIMARY KEY (id)
);  



CREATE TABLE migrations (
  id INTEGER   ,
  migration TEXT ,
  batch INTEGER ,
  PRIMARY KEY (id)
);   



CREATE TABLE orgao_central_exportacoes (
  id INTEGER   ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  data_exportacao TEXT  ,
  tipo TEXT  ,
  parametros TEXT    ,
  versao TEXT ,
  corpo TEXT   ,
  retorno TEXT   DEFAULT NULL,
  hashs TEXT   DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE perfis (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nivel INTEGER  ,
  nome TEXT  ,
  descricao text  ,
  PRIMARY KEY (id)
);  



CREATE TABLE personal_access_tokens (
  id INTEGER   ,
  tokenable_type TEXT ,
  tokenable_id TEXT ,
  name TEXT ,
  token TEXT ,
  abilities text DEFAULT NULL,
  expires_at TEXT NULL DEFAULT NULL,
  last_used_at TEXT NULL DEFAULT NULL,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);   



CREATE TABLE questionarios (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  tipo TEXT  ,
  nome TEXT  ,
  codigo TEXT  ,
  versao INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE sequences (
  id INTEGER   ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  template_numero INTEGER  DEFAULT 0 ,
  plano_entrega_numero INTEGER  DEFAULT 0 ,
  plano_trabalho_numero INTEGER  DEFAULT 0 ,
  projeto_numero INTEGER  DEFAULT 0 ,
  documento_numero INTEGER  DEFAULT 0 ,
  atividade_numero INTEGER  DEFAULT 0 ,
  notificacao_numero INTEGER  DEFAULT 0 ,
  PRIMARY KEY (id)
);   



CREATE TABLE sessions (
  id TEXT ,
  tenant_id TEXT ,
  user_id TEXT DEFAULT NULL,
  ip_address TEXT DEFAULT NULL,
  user_agent text DEFAULT NULL,
  payload text ,
  last_activity INTEGER ,
  PRIMARY KEY (id,tenant_id)
);  



CREATE TABLE siape_blacklist_servidores (
  id TEXT ,
  cpf TEXT ,
  response TEXT ,
  inativado INTEGER  DEFAULT 0,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  matricula TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE siape_blacklist_unidades (
  id TEXT ,
  codigo TEXT ,
  response TEXT ,
  inativado INTEGER  DEFAULT 0 ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE siape_consultaDadosFuncionais (
  id TEXT ,
  response TEXT ,
  cpf TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  processado INTEGER  DEFAULT 0,
  data_modificacao TEXT DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE siape_consultaDadosPessoais (
  id TEXT ,
  response TEXT ,
  cpf TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  processado INTEGER  DEFAULT 0,
  data_modificacao TEXT DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE siape_dadosUORG (
  id TEXT ,
  codigo TEXT DEFAULT NULL,
  response TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  processado INTEGER  DEFAULT 0,
  data_modificacao TEXT DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE siape_listaServidores (
  id TEXT ,
  response TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  processado INTEGER  DEFAULT 0,
  data_modificacao TEXT DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE siape_listaUORG (
  id TEXT ,
  response TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  processado INTEGER  DEFAULT 0,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE solucao_produtos_servicos (
  id TEXT ,
  nome TEXT ,
  sigla TEXT ,
  descricao text ,
  url TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  identificador INTEGER  ,
  PRIMARY KEY (id)
);  



CREATE TABLE tenants (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  data TEXT   DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_atividades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  esforco REAL  ,
  dias_planejado REAL  ,
  etiquetas TEXT   DEFAULT NULL ,
  checklist TEXT   DEFAULT NULL ,
  comentario text DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_avaliacoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  tipo TEXT  ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_clientes (
  id TEXT ,
  nome TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_cursos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  ativo INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_documentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  codigo TEXT DEFAULT NULL ,
  nome TEXT  ,
  entregavel INTEGER  ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_justificativas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_modalidades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  exige_pedagio INTEGER  DEFAULT 0,
  plano_trabalho_calcula_horas INTEGER  DEFAULT 0 ,
  atividade_tempo_despendido INTEGER  DEFAULT 0 ,
  atividade_esforco INTEGER  DEFAULT 0 ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_motivos_afastamentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  codigo TEXT DEFAULT NULL ,
  sigla TEXT  ,
  nome TEXT  ,
  calculo TEXT  DEFAULT 'DECRESCIMO' ,
  data_inicio TEXT  ,
  data_fim TEXT DEFAULT NULL ,
  situacao TEXT  ,
  icone TEXT  ,
  cor TEXT  ,
  horas INTEGER  ,
  integracao INTEGER  ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_processos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome text  ,
  codigo TEXT DEFAULT NULL ,
  etiquetas TEXT    ,
  checklist TEXT    ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_projetos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  icone TEXT  ,
  cor TEXT  ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_tarefas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  tempo_estimado REAL  ,
  documental INTEGER  ,
  comentario text DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE unidades_integrantes_atribuicoes_old (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  atribuicao TEXT DEFAULT NULL ,
  unidade_integrante_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE unidades_integrantes_old (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  unidade_id TEXT ,
  usuario_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE capacidades_tecnicas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  ativo INTEGER  DEFAULT 1 ,
  area_tematica_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE cursos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  titulo TEXT  ,
  ativo INTEGER  DEFAULT 1 ,
  area_id TEXT ,
  tipo_curso_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE domains (
  id INTEGER   ,
  domain TEXT ,
  tenant_id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE envio_itens (
  id TEXT ,
  envio_id TEXT ,
  tipo TEXT ,
  uid TEXT ,
  fonte INTEGER ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  sucesso INTEGER  DEFAULT 0,
  erros text DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE questionarios_perguntas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  sequencia INTEGER  ,
  pergunta text  ,
  tipo TEXT DEFAULT NULL,
  criado_versao INTEGER  ,
  deletado_versao INTEGER DEFAULT NULL ,
  respostas_possiveis TEXT   DEFAULT NULL ,
  questionario_id TEXT ,
  origem_id TEXT DEFAULT NULL,
  codigo text DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE tenants_logs (
  id TEXT ,
  tenant_id TEXT ,
  log_type TEXT DEFAULT NULL,
  output text DEFAULT NULL,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_avaliacoes_notas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  sequencia INTEGER  ,
  nota TEXT    ,
  descricao TEXT  ,
  pergunta TEXT  ,
  aprova INTEGER  ,
  justifica INTEGER  ,
  icone TEXT  ,
  cor TEXT  ,
  codigo TEXT DEFAULT NULL ,
  tipo_avaliacao_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_capacidades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  codigo TEXT  ,
  descricao text  ,
  grupo_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_modalidades_siape (
  id TEXT ,
  tipo_modalidade_id TEXT DEFAULT NULL,
  nome TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE usuarios (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  remember_token TEXT DEFAULT NULL,
  email TEXT  ,
  nome TEXT  ,
  password TEXT DEFAULT NULL ,
  cpf TEXT  ,
  matricula TEXT DEFAULT NULL ,
  apelido TEXT DEFAULT NULL ,
  telefone TEXT DEFAULT NULL ,
  data_nascimento TEXT DEFAULT NULL,
  id_google TEXT DEFAULT NULL ,
  url_foto TEXT DEFAULT NULL ,
  texto_complementar_plano TEXT DEFAULT NULL ,
  foto_perfil text DEFAULT NULL ,
  foto_google text DEFAULT NULL ,
  foto_microsoft text DEFAULT NULL ,
  foto_firebase text DEFAULT NULL ,
  id_sei text DEFAULT NULL ,
  uf TEXT DEFAULT NULL ,
  email_verified_at TEXT NULL DEFAULT NULL ,
  sexo TEXT DEFAULT NULL ,
  "situacao_funcional" TEXT  DEFAULT 'ATIVO_PERMANENTE',
  situacao_siape TEXT  DEFAULT 'ATIVO' ,
  data_ativacao_temporaria date DEFAULT NULL ,
  justicativa_ativacao_temporaria text DEFAULT NULL ,
  usuario_externo INTEGER  DEFAULT 0 ,
  config TEXT   DEFAULT NULL ,
  notificacoes TEXT   DEFAULT NULL ,
  metadados TEXT   DEFAULT NULL ,
  perfil_id TEXT DEFAULT NULL,
  data_modificacao TEXT DEFAULT NULL ,
  is_admin INTEGER  DEFAULT 0,
  data_envio_api_pgd TEXT NULL DEFAULT NULL,
  data_inicial_pedagio date DEFAULT NULL,
  data_final_pedagio date DEFAULT NULL,
  tipo_pedagio INTEGER  DEFAULT NULL,
  nome_jornada TEXT DEFAULT NULL ,
  cod_jornada INTEGER DEFAULT NULL ,
  modalidade_pgd TEXT DEFAULT NULL ,
  participa_pgd TEXT  ,
  ident_unica TEXT DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE afastamentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  observacoes text DEFAULT NULL ,
  data_inicio TEXT  ,
  data_fim TEXT  ,
  horas INTEGER DEFAULT NULL,
  usuario_id TEXT ,
  tipo_motivo_afastamento_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE capacidades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  perfil_id TEXT DEFAULT NULL,
  tipo_capacidade_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE curriculuns (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  apresentacao TEXT  ,
  telefone TEXT  ,
  idiomas TEXT   DEFAULT NULL ,
  estado_civil TEXT DEFAULT NULL ,
  quantidade_filhos INTEGER  DEFAULT 0 ,
  ativo INTEGER  DEFAULT 1 ,
  usuario_id TEXT ,
  cidade_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE curriculuns_graduacoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  pretensao INTEGER  DEFAULT 0 ,
  curriculum_id TEXT ,
  curso_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE curriculuns_profissionais (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  ano_ingresso INTEGER  DEFAULT 0 ,
  lotacao_atual TEXT DEFAULT NULL ,
  especifique_habilidades TEXT   DEFAULT NULL ,
  viagem_nacional INTEGER  DEFAULT 0 ,
  viagem_internacional INTEGER  DEFAULT 0 ,
  interesse_bnt INTEGER  DEFAULT 0 ,
  pgd_inserido TEXT DEFAULT NULL ,
  pgd_interesse TEXT DEFAULT NULL ,
  telefone TEXT DEFAULT NULL ,
  remocao INTEGER  DEFAULT 0 ,
  curriculum_id TEXT ,
  centro_treinamento_id TEXT DEFAULT NULL ,
  cargo_id TEXT ,
  grupo_especializado_id TEXT DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE entidades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  sigla TEXT  ,
  nome TEXT  ,
  abrangencia TEXT  ,
  codigo_ibge TEXT DEFAULT NULL ,
  uf TEXT DEFAULT NULL ,
  carga_horaria_padrao INTEGER  DEFAULT 8 ,
  gravar_historico_processo INTEGER  DEFAULT 0 ,
  layout_formulario_atividade TEXT  DEFAULT 'COMPLETO' ,
  campos_ocultos_atividade TEXT   DEFAULT NULL ,
  nomenclatura TEXT   DEFAULT NULL ,
  notificacoes TEXT   DEFAULT NULL ,
  forma_contagem_carga_horaria TEXT  DEFAULT 'DIA' ,
  expediente TEXT    DEFAULT '' ,
  tipo_modalidade_id TEXT DEFAULT NULL,
  cidade_id TEXT DEFAULT NULL,
  gestor_id TEXT DEFAULT NULL,
  gestor_substituto_id TEXT DEFAULT NULL,
  email_responsavel_siape TEXT DEFAULT NULL,
  email_remetente_siape TEXT DEFAULT NULL,
  habilitar_relatos_siape INTEGER  DEFAULT 0,
  PRIMARY KEY (id)
);  



CREATE TABLE favoritos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  config TEXT   DEFAULT NULL ,
  usuario_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE feriados (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  dia INTEGER  ,
  mes INTEGER  ,
  ano INTEGER DEFAULT NULL ,
  tipoDia TEXT  ,
  recorrente INTEGER  ,
  abrangencia TEXT  ,
  codigo_ibge TEXT DEFAULT NULL ,
  uf TEXT DEFAULT NULL ,
  entidade_id TEXT DEFAULT NULL,
  cidade_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE historicos_atividades_externas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  curriculum_profissional_id TEXT ,
  area_atividade_externa_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE historicos_atividades_internas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  curriculum_profissional_id TEXT ,
  capacidade_tecnica_id TEXT ,
  atividade_desempenhada TEXT DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE historicos_cursos_externos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  pretensao INTEGER  DEFAULT 0 ,
  curriculum_profissional_id TEXT ,
  area_atividade_externa_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE historicos_cursos_internos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  pretensao INTEGER  DEFAULT 0 ,
  curriculum_profissional_id TEXT ,
  curso_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE historicos_docencias_externas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  curriculum_profissional_id TEXT ,
  area_atividade_externa_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE historicos_docencias_internas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  curriculum_profissional_id TEXT ,
  disciplina_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE historicos_funcoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  curriculum_profissional_id TEXT ,
  funcao_id TEXT ,
  unidade_id text DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE integracoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_execucao TEXT  ,
  atualizar_unidades INTEGER  ,
  atualizar_servidores INTEGER  ,
  atualizar_gestores INTEGER  ,
  usar_arquivos_locais INTEGER  ,
  gravar_arquivos_locais INTEGER  ,
  resultado TEXT    ,
  entidade_id TEXT ,
  usuario_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE notificacoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  numero INTEGER  DEFAULT 0 ,
  codigo TEXT  ,
  data_registro TEXT  ,
  mensagem TEXT  ,
  remetente_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE notificacoes_destinatarios (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  tipo TEXT  DEFAULT 'PETRVS' ,
  data_leitura TEXT DEFAULT NULL ,
  data_envio TEXT DEFAULT NULL ,
  opcoes TEXT   DEFAULT NULL ,
  notificacao_id TEXT ,
  usuario_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE notificacoes_whatsapp (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_inicio_sessao TEXT  DEFAULT CURRENT_TIMESTAMP ,
  data_fim_sessao TEXT DEFAULT NULL ,
  data_ultima_interacao TEXT  DEFAULT CURRENT_TIMESTAMP ,
  interacoes TEXT    DEFAULT '' ,
  atual INTEGER  DEFAULT 0 ,
  usuario_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE questionarios_preenchimentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_preenchimento TEXT  ,
  editavel INTEGER  DEFAULT 1 ,
  versao INTEGER  ,
  questionario_id TEXT ,
  usuario_id TEXT ,
  resumo_resposta TEXT   DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE tipos_avaliacoes_justificativas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  tipo_avaliacao_nota_id TEXT ,
  tipo_justificativa_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE unidades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  codigo TEXT DEFAULT NULL ,
  sigla TEXT  ,
  nome TEXT  ,
  instituidora INTEGER  DEFAULT 0 ,
  path text DEFAULT NULL ,
  texto_complementar_plano TEXT DEFAULT NULL ,
  atividades_arquivamento_automatico INTEGER  DEFAULT 0 ,
  atividades_avaliacao_automatico INTEGER  DEFAULT 0,
  planos_prazo_comparecimento INTEGER  DEFAULT 10,
  planos_tipo_prazo_comparecimento TEXT  DEFAULT 'DIAS',
  data_inativacao TEXT DEFAULT NULL ,
  data_inicio_inativacao TEXT DEFAULT NULL ,
  distribuicao_forma_contagem_prazos TEXT  DEFAULT 'DIAS_UTEIS' ,
  entrega_forma_contagem_prazos TEXT  DEFAULT 'HORAS_UTEIS' ,
  autoedicao_subordinadas INTEGER  DEFAULT 1,
  etiquetas TEXT   DEFAULT NULL ,
  checklist TEXT   DEFAULT NULL ,
  notificacoes TEXT   DEFAULT NULL ,
  expediente TEXT   DEFAULT NULL ,
  cidade_id TEXT DEFAULT NULL,
  unidade_pai_id TEXT DEFAULT NULL,
  entidade_id TEXT ,
  informal INTEGER  DEFAULT 0 ,
  data_modificacao TEXT DEFAULT NULL ,
  data_ativacao_temporaria TEXT DEFAULT NULL,
  justificativa_ativacao_temporaria text DEFAULT NULL,
  executora INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE unidades_integrantes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  unidade_id TEXT ,
  usuario_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE unidades_integrantes_atribuicoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  atribuicao TEXT DEFAULT NULL ,
  unidade_integrante_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE cadeias_valores (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_inicio TEXT  ,
  data_fim TEXT DEFAULT NULL ,
  data_arquivamento TEXT DEFAULT NULL ,
  nome TEXT  ,
  entidade_id TEXT ,
  unidade_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE cadeias_valores_processos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  sequencia INTEGER  DEFAULT 0 ,
  path text DEFAULT NULL ,
  nome TEXT  ,
  cadeia_valor_id TEXT ,
  processo_pai_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE catalogo_produtos_servicos (
  id TEXT ,
  nome TEXT ,
  unidade_id TEXT ,
  curador_responsavel_id TEXT ,
  data_inicio date ,
  data_fim date DEFAULT NULL,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE clientes (
  id TEXT ,
  nome TEXT ,
  tipo_cliente_id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  unidade_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE entidade_emails (
  id TEXT ,
  entidade_id TEXT ,
  email TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE entregas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome text ,
  descricao text ,
  tipo_indicador TEXT  ,
  lista_qualitativos TEXT   DEFAULT NULL ,
  unidade_id TEXT DEFAULT NULL,
  checklist TEXT   DEFAULT NULL ,
  etiquetas TEXT   DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE historicos_lotacoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  curriculum_profissional_id TEXT ,
  unidade_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE okrs (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_inicio TEXT  ,
  data_fim TEXT  ,
  data_arquivamento TEXT DEFAULT NULL ,
  nome TEXT  ,
  unidade_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE okrs_objetivos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  sequencia INTEGER  DEFAULT 0 ,
  fundamentacao text  ,
  nome TEXT  ,
  cor TEXT  ,
  okr_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE okrs_objetivos_resultados_chaves (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_inicio TEXT  ,
  data_fim TEXT DEFAULT NULL ,
  descricao TEXT  ,
  meta TEXT    ,
  confianca REAL DEFAULT 0.00 ,
  realizado TEXT   DEFAULT NULL ,
  cor TEXT  ,
  okr_objetivo_id TEXT ,
  entrega_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE planejamentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  missao text  ,
  visao text  ,
  data_inicio TEXT  ,
  data_fim TEXT  ,
  data_arquivamento TEXT DEFAULT NULL ,
  valores TEXT    ,
  resultados_institucionais TEXT   DEFAULT NULL ,
  entidade_id TEXT ,
  unidade_id TEXT ,
  planejamento_superior_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE planejamentos_objetivos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  sequencia INTEGER  DEFAULT 0 ,
  fundamentacao text  ,
  nome text ,
  path text DEFAULT NULL ,
  planejamento_id TEXT ,
  eixo_tematico_id TEXT ,
  objetivo_pai_id TEXT DEFAULT NULL,
  objetivo_superior_id TEXT DEFAULT NULL,
  integra_okr INTEGER  DEFAULT 1 ,
  PRIMARY KEY (id)
);  



CREATE TABLE produtos (
  id TEXT ,
  responsavel_id TEXT ,
  nome TEXT ,
  nome_fantasia TEXT DEFAULT NULL,
  tipo TEXT ,
  descricao TEXT ,
  url text DEFAULT NULL,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  unidade_id TEXT ,
  data_ativado TEXT NULL DEFAULT NULL,
  data_desativado TEXT NULL DEFAULT NULL,
  identificador INTEGER  ,
  PRIMARY KEY (id)
);  



CREATE TABLE produtos_insumos (
  id TEXT ,
  produto_id TEXT ,
  origem TEXT ,
  unidade_id TEXT DEFAULT NULL,
  produto_insumo_id TEXT DEFAULT NULL,
  cliente_id TEXT DEFAULT NULL,
  descricao TEXT DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE produtos_solucoes (
  id TEXT ,
  produto_id TEXT ,
  solucao_id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE questionarios_perguntas_respostas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  resposta TEXT   DEFAULT NULL ,
  questionario_pergunta_id TEXT ,
  questionario_preenchimento_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE solucoes_unidades (
  id TEXT ,
  id_unidade TEXT ,
  id_solucao TEXT ,
  status INTEGER  DEFAULT 0,
  deleted_at TEXT NULL DEFAULT NULL,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE templates (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  codigo TEXT DEFAULT NULL ,
  numero INTEGER  DEFAULT 0 ,
  especie TEXT DEFAULT NULL,
  titulo TEXT  ,
  conteudo TEXT DEFAULT NULL ,
  dataset TEXT   DEFAULT NULL ,
  entidade_id TEXT DEFAULT NULL,
  unidade_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE produto_clientes (
  id TEXT ,
  produto_id TEXT ,
  cliente_id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE produto_processo_cadeia_valor (
  id TEXT ,
  produto_id TEXT ,
  cadeia_valor_processo_id TEXT ,
  deleted_at TEXT NULL DEFAULT NULL,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE anexos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  descricao TEXT  ,
  data_comentario TEXT  ,
  path TEXT DEFAULT NULL ,
  base64 text DEFAULT NULL ,
  usuario_id TEXT DEFAULT NULL,
  comentario_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE atividades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  numero INTEGER  ,
  descricao text  ,
  data_distribuicao TEXT  ,
  carga_horaria REAL DEFAULT NULL ,
  tempo_planejado REAL  ,
  data_estipulada_entrega TEXT  ,
  data_inicio TEXT DEFAULT NULL ,
  data_entrega TEXT DEFAULT NULL ,
  esforco REAL  ,
  tempo_despendido REAL DEFAULT NULL ,
  data_arquivamento TEXT DEFAULT NULL ,
  etiquetas TEXT   DEFAULT NULL ,
  checklist TEXT   DEFAULT NULL ,
  prioridade INTEGER DEFAULT NULL ,
  progresso REAL  DEFAULT 0.00 ,
  status TEXT  DEFAULT 'INCLUIDO' ,
  plano_trabalho_id TEXT DEFAULT NULL,
  plano_trabalho_entrega_id TEXT DEFAULT NULL,
  plano_trabalho_consolidacao_id TEXT DEFAULT NULL,
  tipo_atividade_id TEXT DEFAULT NULL,
  demandante_id TEXT ,
  usuario_id TEXT DEFAULT NULL,
  unidade_id TEXT ,
  documento_requisicao_id TEXT DEFAULT NULL,
  documento_entrega_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE atividades_pausas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_inicio TEXT  ,
  data_fim TEXT DEFAULT NULL ,
  atividade_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE atividades_tarefas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  descricao text DEFAULT NULL ,
  data_lancamento TEXT  ,
  tempo_estimado REAL  ,
  data_conclusao TEXT DEFAULT NULL ,
  documento_id TEXT DEFAULT NULL,
  atividade_id TEXT ,
  usuario_id TEXT ,
  tipo_tarefa_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE avaliacoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_avaliacao TEXT  ,
  nota TEXT    ,
  justificativa text DEFAULT NULL ,
  justificativas TEXT    DEFAULT '' ,
  recurso text DEFAULT NULL ,
  avaliador_id TEXT ,
  plano_trabalho_consolidacao_id TEXT DEFAULT NULL,
  plano_entrega_id TEXT DEFAULT NULL,
  tipo_avaliacao_id TEXT ,
  tipo_avaliacao_nota_id TEXT DEFAULT NULL,
  data_recurso TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE avaliacoes_entregas_checklist (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  checklist TEXT    ,
  avaliacao_id TEXT ,
  plano_trabalho_entrega_id TEXT DEFAULT NULL,
  plano_entrega_entrega_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE comentarios (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  texto text  ,
  path text DEFAULT NULL ,
  data_comentario TEXT  ,
  tipo TEXT  DEFAULT 'COMENTARIO' ,
  privacidade TEXT  DEFAULT 'PUBLICO' ,
  usuario_id TEXT ,
  comentario_pai_id TEXT DEFAULT NULL,
  atividade_id TEXT DEFAULT NULL,
  atividade_tarefa_id TEXT DEFAULT NULL,
  projeto_id TEXT DEFAULT NULL,
  projeto_tarefa_id TEXT DEFAULT NULL,
  plano_entrega_entrega_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE comparecimentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_comparecimento date  ,
  detalhamento TEXT  ,
  plano_trabalho_consolidacao_id TEXT ,
  unidade_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE documentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  numero INTEGER  DEFAULT 0 ,
  titulo TEXT  ,
  tipo TEXT DEFAULT NULL,
  especie TEXT DEFAULT NULL,
  conteudo TEXT DEFAULT NULL ,
  metadados TEXT   DEFAULT NULL ,
  link TEXT   DEFAULT NULL ,
  "status" TEXT  DEFAULT 'GERADO',
  template TEXT DEFAULT NULL ,
  dataset TEXT   DEFAULT NULL ,
  datasource TEXT   DEFAULT NULL ,
  template_id TEXT DEFAULT NULL,
  entidade_id TEXT DEFAULT NULL,
  plano_trabalho_id TEXT DEFAULT NULL,
  tipo_documento_id TEXT DEFAULT NULL,
  tipo_processo_id TEXT DEFAULT NULL,
  atividade_id TEXT DEFAULT NULL,
  atividade_tarefa_id TEXT DEFAULT NULL,
  usuario_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE documentos_assinaturas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_assinatura TEXT  DEFAULT CURRENT_TIMESTAMP ,
  assinatura text  ,
  documento_id TEXT ,
  usuario_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE ocorrencias (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_inicio TEXT  ,
  data_fim TEXT  ,
  descricao TEXT  ,
  plano_trabalho_id TEXT DEFAULT NULL,
  usuario_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_entregas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  numero INTEGER  DEFAULT 0 ,
  data_inicio TEXT  ,
  data_fim TEXT DEFAULT NULL ,
  data_arquivamento TEXT DEFAULT NULL ,
  nome TEXT  ,
  status TEXT  DEFAULT 'INCLUIDO' ,
  planejamento_id TEXT DEFAULT NULL,
  cadeia_valor_id TEXT DEFAULT NULL,
  unidade_id TEXT ,
  plano_entrega_id TEXT DEFAULT NULL,
  programa_id TEXT ,
  criacao_usuario_id TEXT ,
  avaliacao_id TEXT DEFAULT NULL,
  okr_id TEXT DEFAULT NULL,
  data_envio_api_pgd TEXT NULL DEFAULT NULL,
  avaliado_at date DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_entregas_entregas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  homologado INTEGER  ,
  progresso_esperado REAL DEFAULT 0.00 ,
  progresso_realizado REAL DEFAULT 0.00 ,
  data_inicio TEXT  ,
  data_fim TEXT DEFAULT NULL ,
  descricao text ,
  destinatario TEXT DEFAULT NULL ,
  meta TEXT    ,
  realizado TEXT   DEFAULT NULL ,
  plano_entrega_id TEXT ,
  entrega_id TEXT  DEFAULT '1' ,
  entrega_pai_id TEXT DEFAULT NULL,
  unidade_id TEXT ,
  checklist TEXT   DEFAULT NULL ,
  etiquetas TEXT   DEFAULT NULL ,
  descricao_meta TEXT  ,
  descricao_entrega TEXT  ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_entregas_entregas_objetivos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  planejamento_objetivo_id TEXT  ,
  entrega_id TEXT  ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_entregas_entregas_processos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  cadeia_processo_id TEXT ,
  entrega_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_entregas_entregas_produtos (
  id TEXT ,
  entrega_id TEXT ,
  produto_id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_entregas_entregas_progressos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  homologado INTEGER  DEFAULT 0 ,
  progresso_esperado REAL DEFAULT 0.00 ,
  progresso_realizado REAL DEFAULT 0.00 ,
  data_inicio TEXT DEFAULT NULL ,
  data_fim TEXT DEFAULT NULL ,
  meta TEXT   DEFAULT NULL ,
  realizado TEXT   DEFAULT NULL ,
  data_progresso date  ,
  usuario_id TEXT ,
  plano_entrega_entrega_id TEXT  ,
  registro_execucao TEXT DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_entregas_entregas_resultados_chaves (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  okr_objetivo_resultado_chave_id TEXT  ,
  entrega_id TEXT  ,
  PRIMARY KEY (id)
);  




CREATE TABLE planos_trabalhos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  carga_horaria REAL  DEFAULT 0.00 ,
  tempo_total REAL  DEFAULT 0.00 ,
  tempo_proporcional REAL  DEFAULT 0.00 ,
  numero INTEGER  DEFAULT 0 ,
  data_inicio TEXT  ,
  data_fim TEXT  ,
  data_arquivamento TEXT DEFAULT NULL ,
  forma_contagem_carga_horaria TEXT  DEFAULT 'DIA' ,
  status TEXT  DEFAULT 'INCLUIDO' ,
  programa_id TEXT ,
  usuario_id TEXT ,
  unidade_id TEXT ,
  tipo_modalidade_id TEXT ,
  criacao_usuario_id TEXT ,
  documento_id TEXT DEFAULT NULL,
  criterios_avaliacao TEXT    DEFAULT '' ,
  data_envio_api_pgd TEXT NULL DEFAULT NULL,
  avaliado_at date DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_trabalhos_consolidacoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_inicio date  ,
  data_fim date  ,
  data_conclusao TEXT DEFAULT NULL ,
  status TEXT  DEFAULT 'AGUARDANDO_REGISTRO' ,
  plano_trabalho_id TEXT ,
  avaliacao_id TEXT DEFAULT NULL,
  justificativa_conclusao text DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_trabalhos_consolidacoes_afastamentos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  snapshot TEXT    ,
  data_conclusao TEXT  ,
  plano_trabalho_consolidacao_id TEXT DEFAULT NULL ,
  afastamento_id TEXT DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_trabalhos_consolidacoes_atividades (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  snapshot TEXT    ,
  data_conclusao TEXT  ,
  plano_trabalho_consolidacao_id TEXT DEFAULT NULL ,
  atividade_id TEXT DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_trabalhos_consolidacoes_ocorrencias (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  plano_trabalho_consolidacao_id TEXT  ,
  snapshot TEXT    ,
  data_conclusao TEXT  ,
  ocorrencia_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE planos_trabalhos_entregas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  forca_trabalho REAL  DEFAULT 0.00 ,
  meta TEXT   DEFAULT NULL ,
  orgao TEXT DEFAULT NULL ,
  descricao text ,
  plano_trabalho_id TEXT ,
  plano_entrega_entrega_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE programas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  normativa TEXT DEFAULT NULL ,
  prazo_max_plano_entrega INTEGER  ,
  termo_obrigatorio INTEGER  DEFAULT 1 ,
  config TEXT   DEFAULT NULL ,
  data_inicio TEXT  ,
  data_fim TEXT  ,
  periodicidade_consolidacao TEXT  DEFAULT 'MENSAL' ,
  periodicidade_valor INTEGER  DEFAULT 1 ,
  dias_tolerancia_consolidacao INTEGER  DEFAULT 10 ,
  dias_tolerancia_avaliacao INTEGER  DEFAULT 20 ,
  dias_tolerancia_recurso_avaliacao INTEGER  DEFAULT 20 ,
  nota_padrao_avaliacao TEXT   DEFAULT NULL ,
  checklist_avaliacao_entregas_plano_entrega TEXT   DEFAULT NULL ,
  checklist_avaliacao_entregas_plano_trabalho TEXT   DEFAULT NULL ,
  registra_comparecimento INTEGER  DEFAULT 1 ,
  plano_trabalho_assinatura_participante INTEGER  DEFAULT 1 ,
  plano_trabalho_assinatura_gestor_lotacao INTEGER  DEFAULT 0 ,
  plano_trabalho_assinatura_gestor_unidade INTEGER  DEFAULT 0 ,
  plano_trabalho_assinatura_gestor_entidade INTEGER  DEFAULT 0 ,
  tipo_avaliacao_plano_trabalho_id TEXT ,
  tipo_avaliacao_plano_entrega_id TEXT ,
  tipo_justificativa_id TEXT DEFAULT NULL,
  unidade_id TEXT ,
  template_tcr_id TEXT DEFAULT NULL,
  tipo_documento_tcr_id TEXT DEFAULT NULL,
  documento_id TEXT DEFAULT NULL,
  plano_trabalho_criterios_avaliacao TEXT   DEFAULT '' ,
  link_normativa TEXT DEFAULT NULL ,
  unidade_autorizadora_id TEXT DEFAULT NULL,
  link_autorizacao TEXT DEFAULT NULL ,
  PRIMARY KEY (id)
);  



CREATE TABLE programas_participantes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  habilitado INTEGER  DEFAULT 1 ,
  programa_id TEXT ,
  usuario_id TEXT ,
  documento_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE projetos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  numero INTEGER  DEFAULT 0 ,
  nome TEXT  ,
  descricao TEXT  ,
  finalidade TEXT  ,
  status TEXT  ,
  data_inicio TEXT  ,
  data_fim TEXT  ,
  data_inicio_baseline TEXT DEFAULT NULL ,
  data_fim_baseline TEXT DEFAULT NULL ,
  custo REAL  ,
  calcula_custos INTEGER  DEFAULT 1 ,
  tempo_corrido INTEGER  DEFAULT 0 ,
  usa_baseline INTEGER  DEFAULT 1 ,
  usa_horas INTEGER  DEFAULT 1 ,
  calcula_intervalo INTEGER  DEFAULT 1 ,
  agrupador INTEGER  DEFAULT 0 ,
  soma_progresso_filhos INTEGER  DEFAULT 1 ,
  aloca_proprios_recursos INTEGER  DEFAULT 1 ,
  soma_recusos_alocados_filhos INTEGER  DEFAULT 1 ,
  custos_proprios INTEGER  DEFAULT 1 ,
  soma_custos_filhos INTEGER  DEFAULT 1 ,
  duracao REAL  ,
  progresso REAL  DEFAULT 0.00 ,
  kanban_dockers TEXT   DEFAULT NULL ,
  expediente TEXT   DEFAULT NULL ,
  usuario_id TEXT DEFAULT NULL,
  tipo_projeto_id TEXT DEFAULT NULL,
  fase_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE projetos_alocacoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  descricao TEXT  ,
  quantidade REAL  ,
  projeto_id TEXT ,
  tarefa_id TEXT DEFAULT NULL,
  recurso_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE projetos_alocacoes_regras (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  projeto_alocacao_id TEXT ,
  regra_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE projetos_fases (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_inicio TEXT DEFAULT NULL ,
  data_fim TEXT DEFAULT NULL ,
  cor TEXT  ,
  nome TEXT  ,
  descricao TEXT  ,
  projeto_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE projetos_historicos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  data_modificacao TEXT  DEFAULT CURRENT_TIMESTAMP ,
  completo INTEGER  DEFAULT 0 ,
  delta TEXT    ,
  projeto_id TEXT ,
  usuario_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE projetos_recursos (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  tipo TEXT  ,
  unidade_medida TEXT  ,
  valor REAL  ,
  projeto_id TEXT ,
  usuario_id TEXT DEFAULT NULL,
  unidade_id TEXT DEFAULT NULL,
  material_servico_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE projetos_regras (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  nome TEXT  ,
  tipo_recurso TEXT  DEFAULT 'MATERIAL' ,
  finalidade TEXT  ,
  perfis TEXT   DEFAULT NULL ,
  projeto_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE projetos_tarefas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  indice INTEGER  ,
  path text  ,
  nome TEXT  ,
  descricao TEXT  ,
  data_inicio TEXT DEFAULT NULL ,
  data_fim TEXT DEFAULT NULL ,
  data_inicio_baseline TEXT DEFAULT NULL ,
  data_fim_baseline TEXT DEFAULT NULL ,
  duracao REAL  ,
  progresso REAL  DEFAULT 0.00 ,
  inicio_marco INTEGER  DEFAULT 0 ,
  termino_marco INTEGER  DEFAULT 0 ,
  tem_filhos INTEGER  DEFAULT 0 ,
  agrupador INTEGER  DEFAULT 0 ,
  soma_progresso_filhos INTEGER  DEFAULT 1 ,
  status TEXT  ,
  contraido INTEGER  DEFAULT 0 ,
  custo REAL  ,
  calcula_intervalo INTEGER  DEFAULT 1 ,
  aloca_proprios_recursos INTEGER  DEFAULT 1 ,
  soma_recusos_alocados_filhos INTEGER  DEFAULT 1 ,
  custos_proprios INTEGER  DEFAULT 1 ,
  soma_custos_filhos INTEGER  DEFAULT 1 ,
  etiquetas TEXT   DEFAULT NULL ,
  documento_id TEXT DEFAULT NULL,
  projeto_id TEXT ,
  tarefa_pai_id TEXT DEFAULT NULL,
  tarefa_projeto_id TEXT DEFAULT NULL,
  atividade_id TEXT DEFAULT NULL,
  usuario_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE projetos_tarefas_dependencias (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  tarefa_id TEXT ,
  dependencia_id TEXT ,
  PRIMARY KEY (id)
);  



CREATE TABLE reacoes (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  tipo TEXT  DEFAULT 'like' ,
  usuario_id TEXT ,
  atividade_id TEXT DEFAULT NULL,
  plano_trabalho_entrega_id TEXT DEFAULT NULL,
  plano_entrega_entrega_id TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);  



CREATE TABLE status_justificativas (
  id TEXT ,
  created_at TEXT NULL DEFAULT NULL,
  updated_at TEXT NULL DEFAULT NULL,
  deleted_at TEXT NULL DEFAULT NULL,
  codigo TEXT  ,
  justificativa text  ,
  plano_entrega_id TEXT DEFAULT NULL,
  plano_trabalho_id TEXT DEFAULT NULL,
  plano_trabalho_consolidacao_id TEXT DEFAULT NULL,
  atividade_id TEXT DEFAULT NULL,
  usuario_id TEXT ,
  PRIMARY KEY (id)
);  