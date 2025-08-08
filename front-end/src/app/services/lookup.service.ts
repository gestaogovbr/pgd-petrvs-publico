import { Injectable, Injector } from '@angular/core';
import { IIndexable } from '../models/base.model';

export type LookupItem = {
  key: any,
  value: string,
  hint?: string,
  code?: string,
  color?: string,
  icon?: string,
  data?: any,
};

export interface LookupTreeNode<T = any> {
  label?: string;
  data?: T;
  icon?: string;
  expandedIcon?: string;
  collapsedIcon?: string;
  children?: LookupTreeNode<T>[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: LookupTreeNode<T>;
  partialSelected?: boolean;
  style?: any;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  key?: string;
}

export type LookupCurriculum = {
  unidades: LookupItem[],
  funcoes: LookupItem[],
  grupos: LookupItem[],
  ct: LookupItem[],
  cargos: LookupItem[],
}

@Injectable({
  providedIn: 'root'
})
export class LookupService implements IIndexable {

  constructor(public injector: Injector) {
    // Verificar uma forma de ir no servidor buscar todos os lookups
    // Carregar os lookups diretamente na instancia do LookupService (IIndexable)
  }


  public EDICOES: LookupItem[] = [
    { key: "PRF", value: "PRF" },
    { key: "MGI", value: "MGI" }
  ];

  public SIMNAO: LookupItem[] = [
    { key: 1, value: "Sim" },
    { key: 0, value: "Não" }
  ];

  public TODOSSIMNAO: LookupItem[] = [
    { key: "", value: "Todos" },
    { key: "S", value: "Sim" },
    { key: "N", value: "Não" }
  ];

  public FORMATO_HORA: LookupItem[] = [
    { key: 1, value: "Horas" },
    { key: 0, value: "Dias" }
  ];

  public SEXO: LookupItem[] = [
    { key: "MASCULINO", value: "Masculino" },
    { key: "FEMININO", value: "Feminino" }
  ];

  public TIPO_INDICADOR: LookupItem[] = [
    { key: "QUANTIDADE", value: "Quantidade" },
    { key: "VALOR", value: "Valor" },
    { key: "PORCENTAGEM", value: "Porcentagem" },
    { key: "QUALITATIVO", value: "Qualitativo" }
  ];

  public TIPO_LAYOUT: LookupItem[] = [
    { key: 'COMPLETO', value: "Completo" },
    { key: 'SIMPLIFICADO', value: "Simplificado" }
  ];

  public TIPO_CONTAGEM: LookupItem[] = [
    { key: 'DISTRIBUICAO', value: "DISTRIBUIÇÃO" },
    { key: 'ENTREGA', value: "ENTREGA" }
  ];

  public COMENTARIO_PRIVACIDADE: LookupItem[] = [
    { key: 'PUBLICO', value: "Público" },
    { key: 'PRIVADO', value: "Privado" }
  ];

  public TIPO_RELATORIO_PRODUTIVIDADE_INDIVIDUAL: LookupItem[] = [
    { key: 'POR_PERIODO', value: "Por Período" },
    { key: 'POR_PLANO', value: "Por Plano de Trabalho" }
  ];

  public COMENTARIO_TIPO: LookupItem[] = [
    { key: 'COMENTARIO', value: "Comentário", icon: "bi bi-chat-left-quote" },
    { key: 'TECNICO', value: "Técnico", icon: "bi bi-chat-left-text" },
    { key: 'GERENCIAL', value: "Gerencial", icon: "bi bi-clipboard2-pulse" },
    { key: 'AVALIACAO', value: "Avaliação", icon: "bi bi-check2-circle" },
    { key: 'TAREFA', value: "Tarefa", icon: "bi bi-envelope-exclamation" },
    { key: 'ATIVIDADE', value: "Atividade", icon: "bi bi-envelope-exclamation" }
  ];

  public REACAO_TIPO: LookupItem[] = [
    { key: 'like', value: "Curti", icon: "like" },
    { key: 'love', value: "Amei", icon: "love" },
    { key: 'care', value: "Força", icon: "care" },
    { key: 'haha', value: "Haha", icon: "haha" },
    { key: 'wow', value: "Uau", icon: "wow" },
    { key: 'sad', value: "Triste", icon: "sad" },
    { key: 'angry', value: "Grr", icon: "angry" }
  ];

  public USUARIO_SITUACAO_FUNCIONAL: LookupItem[] = [
    { key: "ATIVO_PERMANENTE", value: "Ativo permanente" },
    { key: "APOSENTADO", value: "Aposentado" },
    { key: "CEDIDO/REQUISITADO", value: "Cedido/Requisitado" },
    { key: "NOMEADO_CARGO_COMISSIONADO", value: "Nomeado em Cargo Comissionado" },
    { key: "SEM_VINCULO", value: "Sem vínculo" },
    { key: "TABELISTA(ESP/EMERG)", value: "Tabelista(ESP/EMERG)" },
    { key: "NATUREZA_ESPECIAL", value: "Natureza especial" },
    { key: "ATIVO_EM_OUTRO_ORGAO", value: "Ativo em outro órgão" },
    { key: "REDISTRIBUIDO", value: "Redistribuído" },
    { key: "ATIVO_TRANSITORIO", value: "Ativo transitório" },
    { key: "EXCEDENTE_A_LOTACAO", value: "Excedente à lotação" },
    { key: "EM_DISPONIBILIDADE", value: "Em disponibilidade" },
    { key: "REQUISITADO_DE_OUTROS_ORGAOS", value: "Requisitado de outros órgãos" },
    { key: "INSTITUIDOR_PENSAO", value: "Instituidor de pensão" },
    { key: "REQUISITADO_MILITAR_FORCAS_ARMADAS", value: "Requisitado militar - Forças Armadas" },
    { key: "APOSENTADO_TCU733/94", value: "Aposentado TCU733/94" },
    { key: "EXERCICIO_DESCENTRALIZADO_CARREIRA", value: "Exercício descentralizado de carreira" },
    { key: "EXERCICIO_PROVISORIO", value: "Exercício provisório" },
    { key: "CELETISTA", value: "Celetista" },
    { key: "ATIVO_PERMANENTE_LEI_8878/94", value: "Ativo permanente Lei 8878/94" },
    { key: "ANISTIADO_ADCT_CF", value: "Anistiado ADCT CF" },
    { key: "CELETISTA/EMPREGADO", value: "Celetista/Empregado" },
    { key: "CLT_ANS_DECISAO_JUDICIAL", value: "CLT Anistiado decisão judicial" },
    { key: "CLT_ANS_JUDICIAL_CEDIDO", value: "CLT Anistiado judicial cedido" },
    { key: "CLT_APOS_COMPLEMENTO", value: "CLT Aposentado complemento" },
    { key: "CLT_APOS_DECISAO_JUDICIAL", value: "CLT Aposentado decisão judicial" },
    { key: "INST_PS_DECISAO_JUDICIAL", value: "Instituidor de pensão decisão judicial" },
    { key: "EMPREGO_PUBLICO", value: "Emprego público" },
    { key: "REFORMA_CBM/PM", value: "Reforma CBM/PM" },
    { key: "RESERVA_CBM/PM", value: "Reserva CBM/PM" },
    { key: "REQUISITADO_MILITAR_GDF", value: "Requisitado militar GDF" },
    { key: "ANISTIADO_PUBLICO_L10559", value: "Anistiado público L10559" },
    { key: "ANISTIADO_PRIVADO_L10559", value: "Anistiado privado L10559" },
    { key: "ATIVO_DECISAO_JUDICIAL", value: "Ativo decisão judicial" },
    { key: "CONTRATO_TEMPORARIO", value: "Contrato temporário" },
    { key: "COLAB_PCCTAE_E_MAGISTERIO", value: "Colaborador PCCTAE e Magistério" },
    { key: "COLABORADOR_ICT", value: "Colaborador ICT" },
    { key: "CLT_ANS_DEC_6657/08", value: "CLT Anistiado Decreto 6657/08" },
    { key: "EXERCICIO_7_ART93_8112", value: "Exercício §7° Art.93 Lei 8112" },
    { key: "CEDIDO_SUS/LEI_8270", value: "Cedido SUS Lei 8270" },
    { key: "INST_ANIST_PUBLICO", value: "Instituidor anistiado público" },
    { key: "INST_ANIST_PRIVADO", value: "Instituidor anistiado privado" },
    { key: "CELETISTA_DECISAO_JUDICIAL", value: "Celetista decisão judicial" },
    { key: "CONTRATO_TEMPORARIO_CLT", value: "Contrato temporário CLT" },
    { key: "EMPREGO_PCC/EX-TERRITORIO", value: "Emprego PCC/Ex-Território" },
    { key: "EXC_INDISCIPLINA", value: "Exc. indisciplina" },
    { key: "CONTRATO_PROFESSOR_SUBSTITUTO", value: "Contrato Professor Substituto" },
    { key: "ESTAGIARIO", value: "Estagiário" },
    { key: "ESTAGIARIO_SIGEPE", value: "Estagiário SIGEPE" },
    { key: "RESIDENCIA_E_PMM", value: "Residência e PMM" },
    { key: "APOSENTADO_TEMPORARIRIO", value: "Aposentado temporário" },
    { key: "CEDIDO_DF_ESTADO_MUNICIPIO", value: "Cedido DF Estado Munícipio" },
    { key: "EXERC_DESCEN_CDT", value: "Exercício descentralizado CDT" },
    { key: "EXERC_LEI_13681/18", value: "Exercício lei 13681/18" },
    { key: "PENSIONISTA", value: "Pensionista" },
    { key: "BENEFICIARIO_PENSAO", value: "Beneficiário de pensão" },
    { key: "QE/MRE_CEDIDO", value: "QE/MRE Cedido" },
    { key: "QUADRO_ESPEC_QE/MRE", value: "Quadro ESPEC QE/MRE" },
    { key: "DESCONHECIDO", value: "Desconhecido" }
  ];

  public ATIVIDADE_STATUS: LookupItem[] = [
    { key: "INCLUIDO", value: "Não iniciado", icon: "bi bi-stop-circle", color: "warning" },
    { key: "INICIADO", value: "Iniciado", icon: "bi bi-play-circle", color: "info" },
    { key: "PAUSADO", value: "Pausado", icon: "bi bi-sign-stop", color: "danger" },
    { key: "CONCLUIDO", value: "Concluído", icon: "bi bi-check-circle", color: "primary" }
  ];

  public ATIVIDADE_STATUS_COM_ARQUIVADAS: LookupItem[] = [
    { key: "INCLUIDO", value: "Não iniciado", icon: "bi bi-stop-circle", color: "warning" },
    { key: "INICIADO", value: "Iniciado", icon: "bi bi-play-circle", color: "info" },
    { key: "PAUSADO", value: "Pausado", icon: "bi bi-sign-stop", color: "danger" },
    { key: "CONCLUIDO", value: "Concluído", icon: "bi bi-check-circle", color: "primary" },
    { key: "NAOCONCLUIDO", value: "Não concluído", icon: "bi bi-play-circle", color: "info" },
    { key: "ARQUIVADO", value: "Arquivado", icon: "bi bi-inboxes", color: "secondary" }
  ];

  public DOCUMENTO_STATUS: LookupItem[] = [
    { key: "GERADO", value: "Gerado", icon: "bi bi-file-earmark-check", color: "success" },
    { key: "AGUARDANDO_SEI", value: "Aguardando SEI", icon: "bi bi-hourglass-split", color: "warning" }
  ];

  public DOCUMENTO_ESPECIE: LookupItem[] = [
    { key: 'SEI', value: "Documento SEI", icon: "bi bi-exclamation", color: "primary" },
    { key: 'TCR', value: "TCR", icon: "bi bi-file-medical-fill", color: "success" },
    //{ key: 'TCR_CANCELAMENTO', value: "Cancelamento TCR", icon: "bi bi-file-earmark-x", color: "danger" },
    { key: 'OUTRO', value: "Outro", icon: "bi bi-question-circle", color: "danger" },
    { key: 'NOTIFICACAO', value: "Notificação", icon: "bi bi-bell", color: "info" },
    { key: 'RELATORIO', value: "Relatório", icon: "bi bi-file", color: "secondary" }
  ];

  public UNIDADE_INTEGRANTE_TIPO: LookupItem[] = [
    //{ key: 'AVALIADOR_PLANO_ENTREGA', value: "Avaliador (Planos de Entrega)", icon: "bi bi-check-all", color: "warning" },
    //{ key: 'AVALIADOR_PLANO_TRABALHO', value: "Avaliador (Planos de Trabalho)", icon: "bi bi-check-circle", color: "info" },
    { key: 'COLABORADOR', value: "Vinculado", icon: "bi bi-person-add", color: "secondary" },
    { key: 'GESTOR', value: "Chefe", icon: "bi bi-star-fill", color: "primary", data: {indisponivel: true} },
    { key: 'GESTOR_DELEGADO', value: "Delegado", icon: "bi bi-star-fill", color: "danger" },
    { key: 'GESTOR_SUBSTITUTO', value: "Chefe Substituto", icon: "bi bi-star-half", color: "primary" },
    //{ key: 'HOMOLOGADOR_PLANO_ENTREGA', value: "Homologador (Planos de Entrega)", icon: "bi bi-check2-square", color: "success" },
    // { key: 'CURADOR', value: "Curador", icon: "bi bi-person-badge-fill", color: "primary" },
    { key: 'LOTADO', value: "Lotado", icon: "bi bi-file-person", color: "dark", data: {indisponivel: true} }
  ];

  public TEMPLATE_ESPECIE: LookupItem[] = this.DOCUMENTO_ESPECIE;

  public DIA_HORA_CORRIDOS_OU_UTEIS: LookupItem[] = [
    { key: 'HORAS_CORRIDAS', value: "Horas Corridas" },
    { key: 'DIAS_CORRIDOS', value: "Dias Corridos" },
    { key: 'HORAS_UTEIS', value: "Horas Úteis" },
    { key: 'DIAS_UTEIS', value: "Dias Úteis" }
  ];

  public ORIGENS_ENTREGAS_PLANO_TRABALHO: LookupItem[] = [
    { key: 'PROPRIA_UNIDADE', value: "Própria Unidade", color: "success" },
    { key: 'OUTRA_UNIDADE', value: "Outra Unidade", color: "primary" },
    { key: 'OUTRO_ORGAO', value: "Outro Órgão/Entidade", color: "warning" },
    { key: 'SEM_ENTREGA', value: "Não vinculadas a entregas", color: "info" }
  ];

  public HORAS_CORRIDAS_OU_UTEIS: LookupItem[] = [
    { key: 'HORAS_CORRIDAS', value: "Horas Corridas" },
    { key: 'HORAS_UTEIS', value: "Horas Úteis" }
  ];

  public DIA_OU_HORA: LookupItem[] = [
    { key: 'HORAS', value: "Horas" },
    { key: 'DIAS', value: "Dias" }
  ];

  public ABRANGENCIA: LookupItem[] = [
    { key: 'NACIONAL', value: "Nacional" },
    { key: 'ESTADUAL', value: "Estadual/Distrital" },
    { key: 'MUNICIPAL', value: "Municipal" }
  ];

  public TIPODIA: LookupItem[] = [
    { key: 'MES', value: "Dia do Mês" },
    { key: 'SEMANA', value: "Dia da Semana" }
  ];

  public NOTA: LookupItem[] = [
    { key: 0, value: "0" },
    { key: 1, value: "1" },
    { key: 2, value: "2" },
    { key: 3, value: "3" },
    { key: 4, value: "4" },
    { key: 5, value: "5" },
    { key: 6, value: "6" },
    { key: 7, value: "7" },
    { key: 8, value: "8" },
    { key: 9, value: "9" },
    { key: 10, value: "10" }
  ];

  public TIMEZONE: LookupItem[] = [
    { key: -2, value: "FNT Noronha (UTC -2)" },
    { key: -3, value: "BRT Brasília (UTC -3)" },
    { key: -4, value: "AMT Amazônia (UTC -4)" },
    { key: -5, value: "ACT Acre (UTC -5)" }
  ];

  public CORES = [
    { key: "#0d6efd", value: "Azul", color: "#0d6efd" },
    { key: "#6610f2", value: "Indigo", color: "#6610f2" },
    { key: "#6f42c1", value: "Roxo", color: "#6f42c1" },
    { key: "#d63384", value: "Rosa", color: "#d63384" },
    { key: "#dc3545", value: "Vermelho", color: "#dc3545" },
    { key: "#fd7e14", value: "Laranja", color: "#fd7e14" },
    { key: "#ffc107", value: "Amarelo", color: "#ffc107" },
    { key: "#198754", value: "Verde", color: "#198754" },
    { key: "#0dcaf0", value: "Ciano", color: "#0dcaf0" },
    { key: "#6c757d", value: "Cinza", color: "#6c757d" },
    { key: "#343a40", value: "Preto", color: "#343a40" }
  ];

  public CORES_BACKGROUND = [
    { key: "#FAEDCD", value: "Bege", color: "#FAEDCD" },
    { key: "#E9EDC9", value: "Verde Claro", color: "#E9EDC9" },
    { key: "#F1F7B5", value: "Verde Lima", color: "#F1F7B5" },
    { key: "#B9F3FC", value: "Azul Claro", color: "#B9F3FC" },
    { key: "#AEE2FF", value: "Azul Médio", color: "#AEE2FF" },
    { key: "#FFD4B2", value: "Laranja", color: "#FFD4B2" },
    { key: "#FFD1D1", value: "Rosa", color: "#FFD1D1" },
    { key: "#D0C9C0", value: "Cinza", color: "#D0C9C0" },
    { key: "#D7E9F7", value: "Azul", color: "#D7E9F7" },
    { key: "#DBE4C6", value: "Verde", color: "#DBE4C6" },
    { key: "#FFEB99", value: "Amarelo", color: "#FFEB99" }
  ];

  public ICONES = [
    { key: "bi bi-award", value: "Medalha", icon: "bi bi-award" },
    { key: "bi bi-bell", value: "Sino", icon: "bi bi-bell" },
    { key: "bi bi-alarm", value: "Alarme", icon: "bi bi-alarm" },
    { key: "bi bi-archive", value: "Arquivo", icon: "bi bi-archive" },
    { key: "bi bi-asterisk", value: "Asterisco", icon: "bi bi-asterisk" },
    { key: "bi bi-bar-chart", value: "Grafico", icon: "bi bi-bar-chart" },
    { key: "bi bi-bell-slash", value: "Silencioso", icon: "bi bi-bell-slash" },
    { key: "bi bi-book", value: "Livro", icon: "bi bi-book" },
    { key: "bi bi-brightness-high", value: "Sol", icon: "bi bi-brightness-high" },
    { key: "bi bi-brightness-alt-high", value: "Amanhecer", icon: "bi bi-brightness-alt-high" },
    { key: "bi bi-brush", value: "Pincel", icon: "bi bi-brush" },
    { key: "bi bi-calculator", value: "Calculadora", icon: "bi bi-calculator" },
    { key: "bi bi-calendar-date", value: "Calendário", icon: "bi bi-calendar-date" },
    { key: "bi bi-bug", value: "Bug", icon: "bi bi-bug" },
    { key: "bi bi-building", value: "Edifícios", icon: "bi bi-building" },
    { key: "bi bi-camera-fill", value: "Câmera", icon: "bi bi-camera-fill" },
    { key: "bi bi-camera-reels", value: "Filmadora", icon: "bi bi-camera-reels" },
    { key: "bi bi-camera-video-off", value: "Câmera OFF", icon: "bi bi-camera-video-off" },
    { key: "bi bi-card-checklist", value: "Checklist", icon: "bi bi-card-checklist" },
    { key: "bi bi-card-image", value: "Imagem", icon: "bi bi-card-image" },
    { key: "bi bi-card-list", value: "Lista", icon: "bi bi-card-list" },
    { key: "bi bi-cart3", value: "Carrinho", icon: "bi bi-cart3" },
    { key: "bi bi-cash", value: "Dinheiro", icon: "bi bi-cash" },
    { key: "bi bi-chat", value: "Balão de Fala (Vazio)", icon: "bi bi-chat" },
    { key: "bi bi-chat-dots", value: "Balão de Fala (...)", icon: "bi bi-chat-dots" },
    { key: "bi bi-check-circle", value: "Check", icon: "bi bi-check-circle" },
    { key: "bi bi-clock", value: "Relógio", icon: "bi bi-clock" },
    { key: "bi bi-clock-history", value: "Relógio Ativo", icon: "bi bi-clock-history" },
    { key: "bi bi-cloud", value: "Nuvem", icon: "bi bi-cloud" },
    { key: "bi bi-cone-striped", value: "Cone", icon: "bi bi-cone-striped" },
    { key: "bi bi-diagram-3", value: "Diagrama", icon: "bi bi-diagram-3" },
    { key: "bi bi-emoji-smile", value: "Emoji Sorrindo", icon: "bi bi-emoji-smile" },
    { key: "bi bi-emoji-neutral", value: "Emoji Neutro", icon: "bi bi-emoji-neutral" },
    { key: "bi bi-emoji-frown", value: "Emoji Triste", icon: "bi bi-emoji-frown" },
    { key: "bi bi-envelope", value: "Envelope", icon: "bi bi-envelope" },
    { key: "bi bi-eye", value: "Olho", icon: "bi bi-eye" },
    { key: "bi bi-folder", value: "Pasta", icon: "bi bi-folder" },
    { key: "bi bi-gear", value: "Configurações", icon: "bi bi-gear" },
    { key: "bi bi-gift", value: "Presente", icon: "bi bi-gift" },
    { key: "bi bi-hand-thumbs-up", value: "Positivo", icon: "bi bi-hand-thumbs-up" },
    { key: "bi bi-hand-thumbs-down", value: "Negativo", icon: "bi bi-hand-thumbs-down" },
    { key: "bi bi-heart", value: "Coração", icon: "bi bi-heart" },
    { key: "bi bi-house", value: "Home", icon: "bi bi-house" },
    { key: "bi bi-info-circle", value: "Informação", icon: "bi bi-info-circle" },
    { key: "bi bi-moon-stars", value: "Noite", icon: "bi bi-moon-stars" },
    { key: "bi bi-person-circle", value: "Perfil", icon: "bi bi-person-circle" },
    { key: "bi bi-printer", value: "Impressora", icon: "bi bi-printer" },
    { key: "bi bi-reply", value: "Retorno", icon: "bi bi-reply" },
    { key: "bi bi-search", value: "Lupa de Pesquisa", icon: "bi bi-search" },
    { key: "bi bi-trash", value: "Lixeira", icon: "bi bi-trash" },
    { key: "bi bi-trophy", value: "Trófeu", icon: "bi bi-trophy" },
    // Emojis FontAwesome
    { key: "far fa-frown-open", value: "Emoji triste boca aberta", icon: "far fa-frown-open" },
    { key: "fas fa-frown-open", value: "Emoji triste solido", icon: "fas fa-frown-open" },
    { key: "fas fa-frown", value: "Emoji triste solido", icon: "fas fa-frown" },
    { key: "far fa-frown", value: "Emoji triste vazado", icon: "far fa-frown" },
    { key: "fas fa-smile", value: "Emoji sorrindo solido", icon: "fas fa-smile" },
    { key: "far fa-smile", value: "Emoji sorrindo vazado", icon: "far fa-smile" },
    { key: "far fa-smile-wink", value: "Emoji piscando vazado", icon: "far fa-smile-wink" },
    { key: "fas fa-smile-wink", value: "Emoji piscando solido", icon: "fas fa-smile-wink" },
    { key: "far fa-sad-cry", value: "Emoji chorando vazado", icon: "far fa-sad-cry" },
    { key: "fas fa-sad-cry", value: "Emoji chorando solido", icon: "fas fa-sad-cry" },
    { key: "far fa-meh", value: "Emoji neutro vazado", icon: "far fa-meh" },
    { key: "fas fa-meh", value: "Emoji neutro solido", icon: "fas fa-meh" },
    { key: "far fa-grin-stars", value: "Emoji sorrindo estrela no olho vazado", icon: "far fa-grin-stars" },
    { key: "fas fa-grin-stars", value: "Emoji sorrindo estrela no olho solido", icon: "fas fa-grin-stars" },
    { key: "far fa-angry", value: "Emoji bravo vazado", icon: "far fa-angry" },
    { key: "fas fa-angry", value: "Emoji bravo solido", icon: "fas fa-angry" },
    { key: "far fa-surprise", value: "Emoji surpreso vazado", icon: "far fa-surprise" },
    { key: "fas fa-surprise", value: "Emoji surpreso solido", icon: "fas fa-surprise" },
    { key: "far fa-tired", value: "Emoji cansado vazado", icon: "far fa-tired" },
    { key: "fas fa-tired", value: "Emoji cansado solido", icon: "fas fa-tired" },
    { key: "far fa-sad-tear", value: "Emoji triste  1 lágrima", icon: "far fa-sad-tear" },
    { key: "fas fa-sad-tear", value: "Emoji triste 1 lágrima solido", icon: "fas fa-sad-tear" },
    { key: "far fa-smile-beam", value: "Emoji sorriso vazado", icon: "far fa-smile-beam" },
    { key: "fas fa-smile-beam", value: "Emoji sorriso solido", icon: "fas fa-smile-beam" },
    { key: "far fa-laugh-beam", value: "Emoji gargalhada", icon: "far fa-laugh-beam" },
    { key: "fas fa-laugh-beam", value: "Emoji gargalhada solido", icon: "fas fa-laugh-beam" },
    { key: "far fa-grin", value: "Emoji sorriso", icon: "far fa-grin" },
    { key: "fas fa-grin", value: "Emoji sorriso solido", icon: "fas fa-grin" },
    // Chart FontAwesome
    { key: "fa-solid fa-chart-pie", value: "Grafico de Pizza solido", icon: "fas fa-chart-pie" },
    { key: "fa-solid fa-chart-bar", value: "Grafico de barra vertical", icon: "fas fa-chart-bar" },
    { key: "fa-solid fa-chart-line", value: "Grafico de linha", icon: "fas fa-chart-line" },
    // Balão de comentario FontAwesome
    { key: "fa-regular fa-comment", value: "Balao vazado", icon: "far fa-comment" },
    { key: "fa-solid fa-comment", value: "Balao solido", icon: "fas fa-comment" },
    { key: "fa-regular fa-comment-dots", value: "Balao vazado com ponto", icon: "far fa-comment-dots" },
    { key: "fa-solid fa-comment-dots", value: "Balao solido com ponto", icon: "fas fa-comment-dots" },
    { key: "fa-regular fa-comments", value: "2 Baloes vazados", icon: "far fa-comments" },
    { key: "fa-solid fa-comments", value: "2 Baloes solidos", icon: "fas fa-comments" },
    { key: "fa-regular fa-message", value: "Balao retangular vazado", icon: "far fa-comment-alt" },
    { key: "fa-solid fa-message", value: "Balao retangular solido", icon: "fas fa-comment-alt" },
    // Aperto de mao FontAwesome
    { key: "fa-regular fa-handshake", value: "Aperto de mao vazado", icon: "far fa-handshake" },
    { key: "fa-solid fa-handshake", value: "Aperto de mao solido", icon: "fas fa-handshake" },
    // Seta/Flecha -> FontAwesome
    { key: "fa-solid fa-arrow-down", value: "Seta para baixo", icon: "fas fa-arrow-down" },
    { key: "fa-solid fa-arrow-down-long", value: "Seta para baixo longa", icon: "fas fa-long-arrow-alt-down" },
    { key: "fa-solid fa-arrow-left", value: "Seta para esquerda", icon: "fas fa-arrow-left" },
    { key: "fa-solid fa-arrow-left-long", value: "Seta para esquerda longa", icon: "fas fa-long-arrow-alt-left" },
    { key: "fa-solid fa-arrow-right", value: "Seta para direita", icon: "fas fa-arrow-right" },
    { key: "fa-solid fa-arrow-right-long", value: "Seta para direita longa", icon: "fas fa-long-arrow-alt-right" },
    { key: "fa-solid fa-arrow-up", value: "Seta para cima", icon: "fas fa-arrow-up" },
    { key: "fa-solid fa-arrow-up-long", value: "Seta para cima longa", icon: "fas fa-long-arrow-alt-up" },
    // Checks FontAwesome
    { key: "fa-solid fa-check", value: "Check", icon: "fas fa-check" },
    { key: "fa-solid fa-check-double", value: "Check duplo", icon: "fas fa-check-double" },
    { key: "fa-regular fa-circle-check", value: " Circulo com check vazado", icon: "far fa-check-circle" },
    { key: "fa-solid fa-circle-check", value: "Circulo com check solido", icon: "fas fa-check-circle" },
    { key: "fa-regular fa-square-check", value: " Quadrado com check vazado", icon: "far fa-check-square" },
    { key: "fa-solid fa-square-check", value: "Quadrado com check solido", icon: "fas fa-check-square" },
    { key: "fa-solid fa-clipboard-check", value: "Check de prancheta", icon: "fas fa-clipboard-check" },
    { key: "fa-solid fa-user-check", value: "Check de usuario solido", icon: "fas fa-user-check" },
    // Filtros FontAwesome
    { key: "fa-solid fa-filter", value: "Filtro solido", icon: "fas fa-filter" },
    { key: "fa-light fa-arrow-down-a-z", value: "Filtro A-Z seta para baixo", icon: "fas fa-sort-alpha-down" },
    { key: "fa-light fa-arrow-up-a-z", value: "Filtro A-Z seta para cima", icon: "fas fa-sort-alpha-up" },
    { key: "fa-light fa-arrow-down-1-9", value: "Filtro 1-9 seta para baixo", icon: "fas fa-sort-numeric-down" },
    { key: "fa-light fa-arrow-up-1-9", value: "Filtro 1-9 seta para cima", icon: "fas fa-sort-numeric-up" },
    // Arquivos FontAwesome
    { key: "fa-regular fa-file", value: " Arquivo Folha vazado", icon: "far fa-file" },
    { key: "fa-solid fa-file", value: "Arquivo Folha solido", icon: "fas fa-file" },
    { key: "fa-thin fa-folder-open", value: " Pasta vazado", icon: "far fa-folder-open" },
    { key: "fa-solid fa-folder-open", value: "Pasta solido", icon: "fas fa-folder-open" },
    // Calendario
    { key: "fa-light fa-calendar-days", value: "Calendario", icon: "far fa-calendar-alt" }
  ];

  public NUMERO_SEMANA = [
    { key: 1, value: "1ª" },
    { key: 2, value: "2ª" },
    { key: 3, value: "3ª" },
    { key: 4, value: "4ª" },
    { key: 5, value: "5ª" }
  ];

  public UF = [
    { key: "AC", code: "01", value: "Acre" },
    { key: "AL", code: "02", value: "Alagoas" },
    { key: "AP", code: "04", value: "Amapá" },
    { key: "AM", code: "03", value: "Amazonas" },
    { key: "BA", code: "05", value: "Bahia" },
    { key: "CE", code: "06", value: "Ceará" },
    { key: "DF", code: "07", value: "Distrito Federal" },
    { key: "ES", code: "08", value: "Espírito Santo" },
    { key: "GO", code: "09", value: "Goiás" },
    { key: "MA", code: "10", value: "Maranhão" },
    { key: "MT", code: "13", value: "Mato Grosso" },
    { key: "MS", code: "12", value: "Mato Grosso do Sul" },
    { key: "MG", code: "11", value: "Minas Gerais" },
    { key: "PA", code: "14", value: "Pará" },
    { key: "PB", code: "15", value: "Paraíba" },
    { key: "PR", code: "18", value: "Paraná" },
    { key: "PE", code: "16", value: "Pernambuco" },
    { key: "PI", code: "17", value: "Piauí" },
    { key: "RJ", code: "19", value: "Rio de Janeiro" },
    { key: "RN", code: "20", value: "Rio Grande do Norte" },
    { key: "RS", code: "23", value: "Rio Grande do Sul" },
    { key: "RO", code: "21", value: "Rondônia" },
    { key: "RR", code: "22", value: "Roraima" },
    { key: "SC", code: "24", value: "Santa Catarina" },
    { key: "SP", code: "26", value: "São Paulo" },
    { key: "SE", code: "25", value: "Sergipe" },
    { key: "TO", code: "27", value: "Tocantins" }
  ];

  public TIPO_CIDADE: LookupItem[] = [
    { key: 'MUNICIPIO', value: "Município" },
    { key: 'DISTRITO', value: "Distrito" },
    { key: 'CAPITAL', value: "Capital" }
  ];

  public DIA_SEMANA: LookupItem[] = [
    { key: 0, code: "domingo", value: "Domingo" },
    { key: 1, code: "segunda", value: "Segunda-feira" },
    { key: 2, code: "terca", value: "Terça-feira" },
    { key: 3, code: "quarta", value: "Quarta-feira" },
    { key: 4, code: "quinta", value: "Quinta-feira" },
    { key: 5, code: "sexta", value: "Sexta-feira" },
    { key: 6, code: "sabado", value: "Sábado" }
  ];

  public DIA_MES: LookupItem[] = [
    { key: 1, value: "1" },
    { key: 2, value: "2" },
    { key: 3, value: "3" },
    { key: 4, value: "4" },
    { key: 5, value: "5" },
    { key: 6, value: "6" },
    { key: 7, value: "7" },
    { key: 8, value: "8" },
    { key: 9, value: "9" },
    { key: 10, value: "10" },
    { key: 11, value: "11" },
    { key: 12, value: "12" },
    { key: 13, value: "13" },
    { key: 14, value: "14" },
    { key: 15, value: "15" },
    { key: 16, value: "16" },
    { key: 17, value: "17" },
    { key: 18, value: "18" },
    { key: 19, value: "19" },
    { key: 20, value: "20" },
    { key: 21, value: "21" },
    { key: 22, value: "22" },
    { key: 23, value: "23" },
    { key: 24, value: "24" },
    { key: 25, value: "25" },
    { key: 26, value: "26" },
    { key: 27, value: "27" },
    { key: 28, value: "28" },
    { key: 29, value: "29" },
    { key: 30, value: "30" },
    { key: 31, value: "31" }
  ];

  public MESES: LookupItem[] = [
    { key: 1, value: "Janeiro" },
    { key: 2, value: "Fevereiro" },
    { key: 3, value: "Março" },
    { key: 4, value: "Abril" },
    { key: 5, value: "Maio" },
    { key: 6, value: "Junho" },
    { key: 7, value: "Julho" },
    { key: 8, value: "Agosto" },
    { key: 9, value: "Setembro" },
    { key: 10, value: "Outubro" },
    { key: 11, value: "Novembro" },
    { key: 12, value: "Dezembro" }
  ];

  public TIPO_CARGA_HORARIA: LookupItem[] = [
    { key: 'DIA', icon: "bi bi-calendar3-event", value: "Horas por dia" },
    { key: 'DIA', icon: "bi bi-calendar3-week", value: "Horas por semana" },
    { key: 'DIA', icon: "bi bi-calendar3", value: "Horas por mês" }
  ];

  public MATERIAL_SERVICO_TIPO: LookupItem[] = [
    { key: 'MATERIAL', icon: "bi bi-box-seam", value: "Material" },
    { key: 'SERVICO', icon: "bi bi-tools", value: "Serviço" }
  ];

  public MATERIAL_SERVICO_UNIDADE: LookupItem[] = [
    { key: "UNIDADE", value: "Unidade" },
    { key: "CAIXA", value: "Caixa" },
    { key: "METRO", value: "Metro" },
    { key: "KILO", value: "Quilo" },
    { key: "LITRO", value: "Litro" },
    { key: "DUZIA", value: "Dúzia" },
    { key: "MONETARIO", value: "Monetário" },
    { key: "HORAS", value: "Horas" },
    { key: "DIAS", value: "Dias" },
    { key: "PACOTE", value: "Pacote" }
  ];

  public PROJETO_STATUS: LookupItem[] = [
    { key: "PLANEJADO", value: "Planejado", icon: "bi bi-bar-chart-steps", color: "bg-primary" },
    { key: "INICIADO", value: "Iniciado", icon: "bi bi-collection-play", color: "bg-success" },
    { key: "CONCLUIDO", value: "Concluído", icon: "bi bi-calendar2-check", color: "bg-dark" },
    { key: "SUSPENSO", value: "Suspenso", icon: "bi bi-pause-btn", color: "bg-warning text-dark" },
    { key: "CANCELADO", value: "Cancelado", icon: "bi bi-x-square", color: "bg-danger" }
  ];

  public CONSOLIDACAO_STATUS: LookupItem[] = [
    { key: "INCLUIDO", value: "Incluido", icon: "bi bi-pencil-square", color: "secondary" },
    { key: "CONCLUIDO", value: "Concluído", icon: "bi bi-clipboard2-check", color: "primary" },
    { key: "AVALIADO", value: "Avaliado", icon: "bi bi-star", color: "info" }
  ];

  public PERIODICIDADE_CONSOLIDACAO: LookupItem[] = [
    { key: "DIAS", value: "Dias" },
    { key: "SEMANAL", value: "Semanal" },
    { key: "QUINZENAL", value: "Quinzenal" },
    { key: "MENSAL", value: "Mensal" },
    { key: "BIMESTRAL", value: "Bimestral" },
    { key: "TRIMESTRAL", value: "Trimestral" },
    { key: "SEMESTRAL", value: "Semestral" }
  ];

  public TIPO_AVALIACAO_TIPO: LookupItem[] = [
    { key: "QUALITATIVO", value: "Qualitativo (conceitual)" },
    { key: "QUANTITATIVO", value: "Quantitativo (valor)" }
  ];

  public ADESAO_STATUS: LookupItem[] = [
    { key: "SOLICITADO", value: "Solicitado", color: "bg-primary" },
    { key: "HOMOLOGADO", value: "Homologado", color: "bg-success" },
    { key: "CANCELADO", value: "Cancelado", color: "bg-danger" },
  ];

  public PROJETO_TAREFA_STATUS: LookupItem[] = [
    { key: "PLANEJADO", value: "Planejado", icon: "bi bi-bar-chart-steps", color: "primary" },
    { key: "INICIADO", value: "Iniciado", icon: "bi bi-collection-play", color: "success" },
    { key: "CONCLUIDO", value: "Concluído", icon: "bi bi-calendar2-check", color: "secondary" },
    { key: "FALHO", value: "Falho", icon: "bi bi-question-octagon", color: "danger" },
    { key: "SUSPENSO", value: "Suspenso", icon: "bi bi-pause-btn", color: "warning" },
    { key: "CANCELADO", value: "Cancelado", icon: "bi bi-x-square", color: "danger" },
    { key: "AGUARDANDO", value: "Aguardando", icon: "bi bi-pause-fill", color: "light" }
  ];

  public TIPO_LOG_CHANGE: LookupItem[] = [
    { key: "ADD", value: "Adicionar" },
    { key: "EDIT", value: "Alterar" },
    { key: "SOFT_DELETE", value: "Excluir" },
    { key: "DELETE", value: "Excluir Permanente" },
  ];

  public TIPO_LOG_AUDIT: LookupItem[] = [
    { key: "created", value: "Criado" },
    { key: "updated", value: "Editado" },
    { key: "delete", value: "Excluído" },
  ];


  public TIPO_LOG_ERROR: LookupItem[] = [
    { key: "ERROR", value: "ERROR" },
    { key: "FRONT-ERROR", value: "FRONT-ERROR" },
    { key: "FRONT-WARNING", value: "FRONT-WARNING" },
    { key: "WARNING", value: "WARNING" }
  ];

  public PROJETO_TIPO_RECURSOS: LookupItem[] = [
    { key: "HUMANO", value: "Humano", icon: "bi bi-people-fill", color: "primary" },
    { key: "DEPARTAMENTO", value: "Departamento", icon: "bi bi-house-gear-fill", color: "success" },
    { key: "MATERIAL", value: "Material", icon: "bi bi-boxes", color: "info" },
    { key: "SERVIÇO", value: "Serviço", icon: "bi bi-tools", color: "warning" },
    { key: "CUSTO", value: "Custo", icon: "bi bi-currency-exchange", color: "danger" }
  ];

  public PLANO_ENTREGA_STATUS: LookupItem[] = [
    { key: "INCLUIDO", value: "Incluído", icon: "bi bi-pencil-square", color: "secondary", data: { justificar: ["HOMOLOGANDO"] } },
    { key: "HOMOLOGANDO", value: "Aguardando homologação", icon: "bi bi-clock", color: "warning", data: { justificar: ["ATIVO"] } },
    { key: "ATIVO", value: "Em execução", icon: "bi bi-caret-right", color: "success", data: { justificar: ["CONCLUIDO"] } },
    { key: "CONCLUIDO", value: "Concluído", icon: "bi bi-clipboard2-check", color: "primary", data: { justificar: ["AVALIADO"] } },
    { key: "AVALIADO", value: "Avaliado", icon: "bi bi-star", color: "info", data: { justificar: [] } },
    { key: "SUSPENSO", value: "Suspenso", icon: "bi bi-sign-stop", color: "dark", data: { justificar: [] } },
    { key: "CANCELADO", value: "Cancelado", icon: "bi bi-x-square", color: "danger", data: { justificar: [] } }
  ];

  public PLANO_TRABALHO_STATUS: LookupItem[] = [
    { key: "INCLUIDO", value: "Incluído", icon: "bi bi-pencil-square", color: "secondary", data: { justificar: ["AGUARDANDO_ASSINATURA"] } },
    { key: "AGUARDANDO_ASSINATURA", value: "Aguardando assinatura", icon: "bi bi-clock", color: "warning", data: { justificar: [] } },
    { key: "ATIVO", value: "Aprovado", icon: "bi bi-check2-circle", color: "success", data: { justificar: [] } },
    { key: "CONCLUIDO", value: "Executado", icon: "bi bi-clipboard2-check", color: "primary", data: { justificar: [] } },
    { key: "AVALIADO", value: "Avaliado", icon: "bi bi-star", color: "info", data: { justificar: [] } },  // Um plano de trabalho é considerado avaliado quando todas as suas consolidações o forem
    { key: "SUSPENSO", value: "Suspenso", icon: "bi bi-sign-stop", color: "dark", data: { justificar: [] } },
    { key: "CANCELADO", value: "Cancelado", icon: "bi bi-x-square", color: "danger", data: { justificar: [] } }
  ];

  public PROJETO_PERFIS: LookupItem[] = [
    { key: "ESCRITORIO", value: "Escritório", icon: "bi bi-house-gear", data: ["DEPARTAMENTO"] },
    { key: "GERENTE", value: "Gerente", icon: "bi bi-person-gear", data: ["HUMANO"] },
    { key: "ACESSAR", value: "Acessar o projeto", icon: "bi bi-unlock", data: ["HUMANO", "DEPARTAMENTO"] }
  ];

  public IDIOMAS: LookupItem[] = [
    { key: "ALEMAO", value: 'Alemão' },
    { key: "ARABE", value: 'Árabe' },
    { key: "ARGELINO", value: 'Argelino' },
    { key: "AZERI", value: 'Azeri' },
    { key: "BENGALI", value: 'Bengali' },
    { key: "CHINES", value: 'Chinês' },
    { key: "COREANO", value: 'Coreano' },
    { key: "EGIPCIO", value: 'Egípcio' },
    { key: "ESPANHOL", value: 'Espanhol' },
    { key: "FRANCES", value: 'Frances' },
    { key: "INDI", value: 'indi' },
    { key: "HOLANDES", value: 'Holandês' },
    { key: "INDONESIO", value: 'Indonésio' },
    { key: "INGLES", value: 'Inglês' },
    { key: "IORUBA", value: 'Iorubá' },
    { key: "ITALIANO", value: 'Italiano' },
    { key: "JAPONES", value: 'Japonês' },
    { key: "JAVANES", value: 'Javanês' },
    { key: "MALAIO", value: 'Malaio' },
    { key: "MALAIOB", value: 'Malaio/Bahasa' },
    { key: "MARATA", value: 'Marata' },
    { key: "PERSA ", value: 'Persa' },
    { key: "PUNJABI ", value: 'Punjabi' },
    { key: "ROMENO", value: 'Romeno' },
    { key: "RUSSO", value: 'Russo' },
    { key: "SUAILI", value: 'Suaíli' },
    { key: "TAILANDES", value: 'Tailandes' },
    { key: "TAMIL ", value: 'Tâmil' },
    { key: "TELUGU", value: 'Telugu' },
    { key: "TURCO", value: 'Turco' },
    { key: "UCRANIANO", value: 'Ucraniano' },
    { key: "URDU", value: 'Urdu' },
    { key: "VIETNAMITA", value: 'Vietnamita' }
  ];

  public NIVEL_IDIOMA: LookupItem[] = [
    { key: 'BASICO', value: 'Básico' },
    { key: 'INTERMEDIARIO', value: 'Intermediário' },
    { key: 'AVANCADO', value: 'Avançado' },
    { key: 'FLUENTE', value: 'Fluente' }
  ];

  public ESTADO_CIVIL: LookupItem[] = [
    { key: 'CASADO', value: 'Casado' },
    { key: 'DIVORCIADO', value: 'Divorciado' },
    { key: 'SOLTEIRO', value: 'Solteiro' },
    { key: 'SEPARADO', value: 'Separado' },
    { key: 'VIUVO', value: 'Viúvo' },
    { key: 'UNIAO', value: 'União Estável' },
    { key: 'OUTRO', value: 'Outro' },
  ];

  public COR_RACA: LookupItem[] = [
    { key: "BRANCA", value: "Branca" },
    { key: "PRETA", value: "Preta" },
    { key: "PARDA", value: "Parda" },
    { key: "INDIGENA", value: "Indigena" },
    { key: "AMARELA", value: "Amarela" },
  ];

  public TIPO_DISCRIMINACAO: LookupItem[] = [
    { key: "SOCIAL", value: "Social" },
    { key: "RACIAL", value: "Racial" },
    { key: "RELIGIOSA", value: "Religiosa" },
    { key: "SEXUAL", value: "Sexual" },
    { key: "POLITICA", value: "Politica" },
  ];

  public ESCOLARIDADE: LookupItem[] = [
    { key: 'ESCOLARIDADE_FUNDAMENTAL', value: 'Ensino Fundamental' },
    { key: 'ESCOLARIDADE_MEDIO', value: 'Ensino Médio' },
    { key: 'ESCOLARIDADE_SUPERIOR', value: 'Ensino Superior' },
    { key: 'ESCOLARIDADE_ESPECIAL', value: 'Especialização' },
    { key: 'ESCOLARIDADE_MESTRADO', value: 'Mestrado' },
    { key: 'ESCOLARIDADE_DOUTORADO', value: 'Doutorado' },
    { key: 'ESCOLARIDADE_POS_DOUTORADO', value: 'Pós Doutorado' }
  ];

  public TITULOS_CURSOS: LookupItem[] = [
    { key: 'GRAD_TEC', value: 'Tecnólogo' },
    { key: 'GRAD_BAC', value: 'Bacharelado' },
    { key: 'GRAD_LIC', value: 'Licenciatura' },
    { key: 'ESPECIAL', value: 'Especialização' },
    { key: 'MESTRADO', value: 'Mestrado' },
    { key: 'DOUTORADO', value: 'Doutorado' },
    { key: 'POS_DOUTORADO', value: 'Pós Doutorado' }
  ];

  public TITULOS_CURSOS_INST: LookupItem[] = [
    { key: 'INSTITUCIONAL', value: 'Institucional' },
    { key: 'GRAD_TEC', value: 'Tecnólogo' },
    { key: 'GRAD_BAC', value: 'Bacharelado' },
    { key: 'GRAD_LIC', value: 'Licenciatura' },
    { key: 'ESPECIAL', value: 'Especialização' },
    { key: 'MESTRADO', value: 'Mestrado' },
    { key: 'DOUTORADO', value: 'Doutorado' },
    { key: 'POS_DOUTORADO', value: 'Pós Doutorado' }
  ];

  public CARGOS_PRF: LookupItem[] = [
    { key: 'PRF', value: 'PRF' },
    { key: 'ADM', value: 'Agente Administrativo' }
  ];

  public SITUACAO_FUNCIONAL: LookupItem[] = [
    { key: 'CONCURSADO_E', value: 'Concursado Efetivo' },
    { key: 'CONCURSADO_T', value: 'Consursado Temporário' },
    { key: 'TERCEIRIZADO', value: 'Colaborador de empresa terceirizada' },
    { key: 'ESTAGIARIO', value: 'Estagiário' },
  ];

  public PG_PRF: LookupItem[] = [
    { key: 'PRESENCIAL', value: 'Presencial' },
    { key: 'TELETRABALHO_PARCIAL', value: 'Teletrabalho parcial' },
    { key: 'TELETRABALHO_INTEGRAL', value: 'Teletrabalho integral' }
  ];

  public QUESTIONARIO_TIPO: LookupItem[] = [
    { key: 'INTERNO', value: 'Interno' },
    { key: 'PERSONALIZADO', value: 'Personalizado' },
    { key: 'ANONIMO', value: 'Anônimo' }
  ];
  
  public QUESTIONARIO_PERGUNTA_TIPO: LookupItem[] = [
    { key: 'SELECT', value: 'Única Escolha' },
    { key: 'MULTI_SELECT', value: 'Multipla Escolha' },
    { key: 'TEXT', value: 'Texto Livre' },
    { key: 'RATE', value: 'Classificação' },
    { key: 'SWITCH', value: 'Sim/Não' },
    { key: 'RADIO', value: 'Única Escolha' },
    { key: 'NUMBER', value: 'Numérica' },
    { key: 'SEARCH', value: 'Pesquisa' },
    { key: 'EMOJI', value: 'Emojis' },
    { key: 'TEXT_AREA', value: 'Caixa de Texto' },
    { key: 'TIMER', value: 'Tempo' },
    { key: 'DATE_TIME', value: 'Data/Hora' },
    { key: 'RADIO_BUTTON', value: 'Botões' },
    { key: 'RADIO_INLINE', value: 'Única Escolha' },
    { key: 'CHECK', value: 'Múltipla Escolha' },
  ];

  public SOFT_SKILLS: LookupItem[] = [
    { key: "COMUNICACAO", value: 'Comunicação' },
    { key: "LIDERANCA", value: 'Liderança' },
    { key: "RESOLUCAO", value: 'Resolução de problemas' },
    { key: "CRIATIVIDADE", value: 'Criatividade e curiosidade' },
    { key: "PENSAMENTO", value: 'Pensamento crítico' },
    { key: "HABILIDADES", value: 'Habilidades com pessoas e equipes' },
    { key: "ADAPTABILIDADE", value: 'Adaptabilidade e resiliência' },
    { key: "ETICA", value: 'Ética' }
  ];

  public ATRIBUTOS_COMPORTAMENTAIS: LookupItem[] = [
    { key: "EXTROVERSAO", value: 'Extroversão' },
    { key: "AGRADABILIDADE", value: 'Agradabilidade' },
    { key: "CONSCIENCIOSIDADE", value: 'Conscienciosidade' },
    { key: "EMOCIONAL", value: 'Estabilidade Emocional' },
    { key: "ABERTURA", value: 'Abertura' }
  ];
 // "EMOJI" | "SELECT" | "MULTI_SELECT" | "TEXT" | "TEXT_AREA" | "TIMER" | "DATE_TIME" | "SWITCH" | "NUMBER" | "RATE" | "RADIO" | "CHECK";

  public THEMES: LookupItem[] = [
    { key: 'light', value: "Branco (light)" },
    { key: 'blue', value: "Azul (oxford)" },
    { key: 'dark', value: "Preto (dark)" }
  ];

  public TIPO_INTEGRACAO: LookupItem[] = [
    { key: 'NENHUMA', value: 'Nenhuma' },
    //{ key: 'WSO2', value: 'Siape-PRF' },
    { key: 'SIAPE', value: 'API Consulta SIAPE' },
    { key: 'API', value: 'API de envio de dados' },
    { key: 'SMTP', value: 'SMTP' },
  ];

  public GOV_BR_ENV: LookupItem[] = [
    { key: 'staging', value: 'Teste' },
    { key: 'production', value: 'Produção' },
  ];

  public EXISTE_PAGADOR: LookupItem[] = [
    { key: 'A', value: 'Vínculos ativos sem ocorrência de exclusão' },
    { key: 'B', value: 'Todos os vínculos' },
  ];

  public TIPO_VINCULO: LookupItem[] = [
    { key: 'A', value: 'Ativos em exercício no órgão' },
    { key: 'B', value: 'Ativos e aposentados' },
    { key: 'C', value: 'Ativos, aposentados e pensionistas' },
  ];

  public LOGICOS: LookupItem[] = [
    { 'key': true, 'value': 'Verdadeiro' },
    { 'key': false, 'value': 'Falso' }
  ];

  public TIPO_OPERADOR: LookupItem[] = [
    { 'key': 'number', 'value': 'Número' },
    { 'key': 'string', 'value': 'Texto' },
    { 'key': 'boolean', 'value': 'Lógico' },
    { 'key': 'variable', 'value': 'Variável' },
    { 'key': 'list', 'value': 'Lista' }
  ]

  public OPERADOR: LookupItem[] = [
    { 'key': '==', 'value': 'É igual' },
    { 'key': '<', 'value': 'É menor' },
    { 'key': '<=', 'value': 'É menor ou igual' },
    { 'key': '>', 'value': 'É maior' },
    { 'key': '>=', 'value': 'É maior ou igual' },
    { 'key': '<>', 'value': 'É diferente' }
  ];

  public LISTA_TIPO: LookupItem[] = [
    { 'key': 'indice', 'value': 'Lista utilizando índice' },
    { 'key': 'variavel', 'value': 'Lista utilizando variável' }
  ];

  public CALCULO: LookupItem[] = [
    { 'key': 'ACRESCIMO', 'value': 'Adiciona' },
    { 'key': 'DECRESCIMO', 'value': 'Subtrai' }
  ];

  public NIVEL_USUARIO_PAINEL: LookupItem[] = [
    { 'key': 1, 'value': 'Administrador geral' },
    { 'key': 2, 'value': 'Configurador' }
  ];


  public TIPO_PRODUTO: LookupItem[] = [
    { key: 'produto', value: "Produto" },
    { key: 'servico', value: "Serviço" }
  ];

  public TIPO_RELACAO_PRODUTO: LookupItem[] = [
    { key: 'input', value: "Entrada" },
    { key: 'output', value: "Saída" }
  ];

  public TIPO_ATIVO_INATIVO: LookupItem[] = [
    { key: 'ativo', value: "Ativo" },
    { key: 'inativo', value: "Inativo" }
  ];

  public TIPO_INTERNO_EXTERNO: LookupItem[] = [
    { key: 'interno', value: "Interno" },
    { key: 'externo', value: "Externo" }
  ];

  public ENVIO_ITEM_TIPO: LookupItem[] = [
    { key: "participante", value: "Participante" },
    { key: "entrega", value: "Plano de Entrega" },
    { key: "trabalho", value: "Plano de Trabalho" }
  ];

  public AGENDAMENTO_PERIODICIDADES: LookupItem[] = [
    { key: 'cada', value: "A cada" },
    { key: 'dia', value: "No dia" },
    { key: 'todos', value: "Todos os dias" },
    { key: 'domingo', value: "Todo domingo" },
    { key: 'segunda', value: "Toda segunda" },
    { key: 'terça', value: "Toda terça" },
    { key: 'quarta', value: "Toda quarta" },
    { key: 'quinta', value: "Toda quinta" },
    { key: 'sexta', value: "Toda sexta" },
    { key: 'sabado', value: "Toda sábado" },
    { key: 'custom', value: "Personalizado" }
  ];

  public AGENDAMENTO_INTERVALO_TIPOS: LookupItem[] = [
    { key: 'minuto', value: "minuto(s)" },
    { key: 'hora', value: "hora(s)" }
  ];

  public INDISPONIBILIDADE_TIPOS: LookupItem[] = [
    {
			key: "1",
			value:
				"Art 10, §2º, INC SEGES/SPGRT nº 24/2024- Primeiro ano do Estágio Probatório.",
		},
		{
			key: "2",
			value:
				"Art 10, §3º, INC SEGES/SPGRT nº 24/2024- Movimentação entre órgãos há menos de 6 (seis) meses.",
		},
  ];

  public RELATORIO_PT_SITUACOES_EXECUCAO: LookupItem[] = [
    { key: 'Aguardando', value: "Aguardando" },
    { key: 'Atrasado', value: "Atrasado" },
    { key: 'Registrado no período', value: "Registrado no período" },
    { key: 'Registrado com atraso', value: "Registrado com atraso" },
  ];

  public RELATORIO_PT_SITUACOES_AVALIACAO: LookupItem[] = [
    { key: 'Aguardando', value: "Aguardando" },
    { key: 'Atrasado', value: "Atrasado" },
    { key: 'Registrado no período', value: "Registrado no período" },
    { key: 'Registrado com atraso', value: "Registrado com atraso" },
  ];

  public RELATORIO_PE_SITUACOES_AVALIACAO: LookupItem[] = [
    { key: 'Aguardando', value: "Aguardando" },
    { key: 'Atrasado', value: "Atrasado" },
    { key: 'Registrado no período', value: "Registrado no período" },
    { key: 'Registrado com atraso', value: "Registrado com atraso" },
  ];

  public RELATORIO_UNIDADE_TIPOS: LookupItem[] = [
    { key: 'Instituidora', value: "Instituidora" },
    { key: 'Executora', value: "Executora" }
  ];

  public getLookup(itens: LookupItem[], key: any) {
    return itens.find(x => x.key == key);
  }

  public getCode(itens: LookupItem[], key: any): string {
    return itens.find(x => x.key == key)?.code || "";
  }

  public getValue(itens: LookupItem[], key: any): string {
    return itens.find(x => x.key == key)?.value || "";
  }

  public getColor(itens: LookupItem[], key: any): string {
    return itens.find(x => x.key == key)?.color || "";
  }

  public getIcon(itens: LookupItem[], key: any): string {
    return itens.find(x => x.key == key)?.icon || "";
  }

  public getData(itens: LookupItem[], key: any): any {
    return itens?.find(x => x.key == key)?.data;
  }

  /**
   * Retorna um LookupItem[] com chaves únicas
   * @param array Array original
   * @returns
   */
  public uniqueLookupItem(array: LookupItem[]): LookupItem[] {
    let novoArray: LookupItem[] = [];
    array.forEach(elem => { if (!novoArray.find(x => x.key == elem.key)) novoArray.push(elem); });
    return novoArray;
  }

  public ordenarLookupItem(array: LookupItem[]): LookupItem[] {
    return array.sort((a, b) => (a.value < b.value) ? -1 : 1);
  }

  // use para mapear uma coleção de objetos para LookupItem[]
  // Exemplo: this.lookupService.map(data, 'id', 'name');
  public map<T>(
    data: T[],
    keyField: keyof T,
    valueField: keyof T
  ): LookupItem[] {
    return data.map(item => ({
      key: String(item[keyField]),
      value: String(item[valueField])
    }));
  }
}
