import { Injectable, Injector } from '@angular/core';

export type LookupItem =  {
  key: any,
  value: string,
  code?: string,
  color?: string,
  icon?: string,
  data?: any
};

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(public injector: Injector) { }

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

  public TIPO_LAYOUT: LookupItem[] = [
    { key: 'COMPLETO', value: "Completo" },
    { key: 'SIMPLIFICADO', value: "Simplificado" }
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
    { key: 'COMENTARIO', value: "Comentário", icon: "bi bi-chat-left-quote"},
    { key: 'TECNICO', value: "Técnico", icon: "bi bi-chat-left-text" },
    { key: 'GERENCIAL', value: "Gerencial", icon: "bi bi-clipboard2-pulse" },
    { key: 'AVALIACAO', value: "Avaliação", icon: "bi bi-check2-circle" },
    { key: 'TAREFA', value: "Tarefa", icon: "bi bi-envelope-exclamation" },
    { key: 'ATIVIDADE', value: "Atividade", icon: "bi bi-envelope-exclamation" }
  ];

  public USUARIO_VINCULACAO: LookupItem[] = [
    { key: "SERVIDOR_EFETIVO", value: "Servidor público cargo efetivo" },
    { key: "SERVIDOR_COMISSIONADO", value: "Servidor público cargo em comissão" },
    { key: "EMPREGADO", value: "Empregado público" },
    { key: "CONTRATADO_TEMPORARIO", value: "Contratado temporário" }
  ];

  public DEMANDA_STATUS: LookupItem[] = [
    { key: "AVALIADO", value: "Avaliado", icon: "bi bi-star-half", color: "badge rounded-pill bg-success" },
    { key: "CONCLUIDO", value: "Concluído", icon: "bi bi bi-check-circle", color: "badge rounded-pill bg-primary" },
    { key: "NAOCONCLUIDO", value: "Não concluído", icon: "bi bi-play-circle", color: "badge rounded-pill bg-info text-dark" },
    { key: "INICIADO", value: "Iniciado", icon: "bi bi-play-circle", color: "badge rounded-pill bg-info text-dark" },
    { key: "LANCADO", value: "Não iniciado", icon: "bi bi-stop-circle", color: "badge rounded-pill bg-warning text-dark"}
  ];

  public DEMANDA_STATUS_COM_ARQUIVADAS: LookupItem[] = [
    { key: "LANCADO", value: "Não iniciado", icon: "bi bi-stop-circle", color: "badge rounded-pill bg-warning text-dark"},
    { key: "INICIADO", value: "Iniciado", icon: "bi bi-play-circle", color: "badge rounded-pill bg-info text-dark" },
    { key: "NAOCONCLUIDO", value: "Não concluído", icon: "bi bi-play-circle", color: "badge rounded-pill bg-info text-dark" },
    { key: "CONCLUIDO", value: "Concluído", icon: "bi bi bi-check-circle", color: "badge rounded-pill bg-primary" },
    { key: "AVALIADO", value: "Avaliado", icon: "bi bi-star-half", color: "badge rounded-pill bg-success" },
    { key: "ARQUIVADO", value: "Arquivado", icon: "bi bi-inboxes", color: "badge rounded-pill bg-secondary" }
  ];

  public DOCUMENTO_STATUS: LookupItem[] = [
    { key: "GERADO", value: "Gerado", icon: "bi bi-file-earmark-check", color: "badge rounded-pill bg-success" },
    { key: "AGUARDANDO_SEI", value: "Aguardando SEI", icon: "bi bi-hourglass-split", color: "badge rounded-pill bg-warning text-dark" }
  ];

  public DIA_HORA_CORRIDOS_OU_UTEIS: LookupItem[] = [
    { key: 'HORAS_CORRIDAS', value: "Horas Corridas" },
    { key: 'DIAS_CORRIDOS', value: "Dias Corridos" },
    { key: 'HORAS_UTEIS', value: "Horas Úteis" },
    { key: 'DIAS_UTEIS', value: "Dias Úteis" }
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

  public ICONES = [
    {key: "bi bi-award", value: "Medalha", icon: "bi bi-award" },
    {key: "bi bi-bell", value: "Sino", icon: "bi bi-bell" },
    {key: "bi bi-alarm", value: "Alarme", icon: "bi bi-alarm"},
    {key: "bi bi-archive", value: "Arquivo", icon: "bi bi-archive"},
    {key: "bi bi-asterisk", value: "Asterisco", icon: "bi bi-asterisk"},
    {key: "bi bi-bar-chart", value: "Grafico", icon: "bi bi-bar-chart"},
    {key: "bi bi-bell-slash", value: "Silencioso", icon: "bi bi-bell-slash"},
    {key: "bi bi-book", value: "Livro", icon: "bi bi-book"},
    {key: "bi bi-brightness-high", value: "Sol", icon: "bi bi-brightness-high"},
    {key: "bi bi-brightness-alt-high", value: "Amanhecer", icon: "bi bi-brightness-alt-high"},
    {key: "bi bi-brush", value: "Pincel", icon: "bi bi-brush"},
    {key: "bi bi-calculator", value: "Calculadora", icon: "bi bi-calculator"},
    {key: "bi bi-calendar-date", value: "Calendário", icon: "bi bi-calendar-date"},
    {key: "bi bi-bug", value: "Bug", icon: "bi bi-bug"},
    {key: "bi bi-building", value: "Edifícios", icon: "bi bi-building"},
    {key: "bi bi-camera-fill", value: "Câmera", icon: "bi bi-camera-fill"},
    {key: "bi bi-camera-reels", value: "Filmadora", icon: "bi bi-camera-reels"},
    {key: "bi bi-camera-video-off", value: "Câmera OFF", icon: "bi bi-camera-video-off"},
    {key: "bi bi-card-checklist", value: "Checklist", icon: "bi bi-card-checklist"},
    {key: "bi bi-card-image", value: "Imagem", icon: "bi bi-card-image"},
    {key: "bi bi-card-list", value: "Lista", icon: "bi bi-card-list"},
    {key: "bi bi-cart3", value: "Carrinho", icon: "bi bi-cart3"},
    {key: "bi bi-cash", value: "Dinheiro", icon: "bi bi-cash"},
    {key: "bi bi-chat", value: "Balão de Fala (Vazio)", icon: "bi bi-chat"},
    {key: "bi bi-chat-dots", value: "Balão de Fala (...)", icon: "bi bi-chat-dots"},
    {key: "bi bi-check-circle", value: "Check", icon: "bi bi-check-circle"},
    {key: "bi bi-clock", value: "Relógio", icon: "bi bi-clock"},
    {key: "bi bi-clock-history", value: "Relógio Ativo", icon: "bi bi-clock-history"},
    {key: "bi bi-cloud", value: "Nuvem", icon: "bi bi-cloud"},
    {key: "bi bi-cone-striped", value: "Cone", icon: "bi bi-cone-striped"},
    {key: "bi bi-diagram-3", value: "Diagrama", icon: "bi bi-diagram-3"},
    {key: "bi bi-emoji-smile", value: "Emoji Sorrindo", icon: "bi bi-emoji-smile"},
    {key: "bi bi-emoji-neutral", value: "Emoji Neutro", icon: "bi bi-emoji-neutral"},
    {key: "bi bi-emoji-frown", value: "Emoji Triste", icon: "bi bi-emoji-frown"},
    {key: "bi bi-envelope", value: "Envelope", icon: "bi bi-envelope"},
    {key: "bi bi-eye", value: "Olho", icon: "bi bi-eye"},
    {key: "bi bi-folder", value: "Pasta", icon: "bi bi-folder"},
    {key: "bi bi-gear", value: "Configurações", icon: "bi bi-gear"},
    {key: "bi bi-gift", value: "Presente", icon: "bi bi-gift"},
    {key: "bi bi-hand-thumbs-up", value: "Positivo", icon: "bi bi-hand-thumbs-up"},
    {key: "bi bi-hand-thumbs-down", value: "Negativo", icon: "bi bi-hand-thumbs-down"},
    {key: "bi bi-heart", value: "Coração", icon: "bi bi-heart"},
    {key: "bi bi-house", value: "Home", icon: "bi bi-house"},
    {key: "bi bi-info-circle", value: "Informação", icon: "bi bi-info-circle"},
    {key: "bi bi-moon-stars", value: "Noite", icon: "bi bi-moon-stars"},
    {key: "bi bi-person-circle", value: "Perfil", icon: "bi bi-person-circle"},
    {key: "bi bi-printer", value: "Impressora", icon: "bi bi-printer"},
    {key: "bi bi-reply", value: "Retorno", icon: "bi bi-reply"},
    {key: "bi bi-search", value: "Lupa de Pesquisa", icon: "bi bi-search"},
    {key: "bi bi-trash", value: "Lixeira", icon: "bi bi-trash"},
    {key: "bi bi-trophy", value: "Trófeu", icon: "bi bi-trophy"},
    // Emojis FontAwesome
    {key: "far fa-frown-open", value: "Emoji triste boca aberta", icon: "far fa-frown-open"},
    {key: "fas fa-frown-open", value: "Emoji triste solido", icon: "fas fa-frown-open"},
    {key: "fas fa-frown", value: "Emoji triste solido", icon: "fas fa-frown"},
    {key: "far fa-frown", value: "Emoji triste vazado", icon: "far fa-frown"},
    {key: "fas fa-smile", value: "Emoji sorrindo solido", icon: "fas fa-smile"},
    {key: "far fa-smile", value: "Emoji sorrindo vazado", icon: "far fa-smile"},
    {key: "far fa-smile-wink", value: "Emoji piscando vazado", icon: "far fa-smile-wink"},
    {key: "fas fa-smile-wink", value: "Emoji piscando solido", icon: "fas fa-smile-wink"},
    {key: "far fa-sad-cry", value: "Emoji chorando vazado", icon: "far fa-sad-cry"},
    {key: "fas fa-sad-cry", value: "Emoji chorando solido", icon: "fas fa-sad-cry"},
    {key: "far fa-meh", value: "Emoji neutro vazado", icon: "far fa-meh"},
    {key: "fas fa-meh", value: "Emoji neutro solido", icon: "fas fa-meh"},
    {key: "far fa-grin-stars", value: "Emoji sorrindo estrela no olho vazado", icon: "far fa-grin-stars"},
    {key: "fas fa-grin-stars", value: "Emoji sorrindo estrela no olho solido", icon: "fas fa-grin-stars"},
    {key: "far fa-angry", value: "Emoji bravo vazado", icon: "far fa-angry"},
    {key: "fas fa-angry", value: "Emoji bravo solido", icon: "fas fa-angry"},
    {key: "far fa-surprise", value: "Emoji surpreso vazado", icon: "far fa-surprise"},
    {key: "fas fa-surprise", value: "Emoji surpreso solido", icon: "fas fa-surprise"},
    {key: "far fa-tired", value: "Emoji cansado vazado", icon: "far fa-tired"},
    {key: "fas fa-tired", value: "Emoji cansado solido", icon: "fas fa-tired"},
    {key: "far fa-sad-tear", value: "Emoji triste  1 lágrima", icon: "far fa-sad-tear"},
    {key: "fas fa-sad-tear", value: "Emoji triste 1 lágrima solido", icon: "fas fa-sad-tear"},
    {key: "far fa-smile-beam", value: "Emoji sorriso vazado", icon: "far fa-smile-beam"},
    {key: "fas fa-smile-beam", value: "Emoji sorriso solido", icon: "fas fa-smile-beam"},
    {key: "far fa-laugh-beam", value: "Emoji gargalhada", icon: "far fa-laugh-beam"},
    {key: "fas fa-laugh-beam", value: "Emoji gargalhada solido", icon: "fas fa-laugh-beam"},
    {key: "far fa-grin", value: "Emoji sorriso", icon: "far fa-grin"},
    {key: "fas fa-grin", value: "Emoji sorriso solido", icon: "fas fa-grin"},
    // Chart FontAwesome
    {key: "fa-solid fa-chart-pie", value: "Grafico de Pizza solido", icon: "fas fa-chart-pie"},
    {key: "fa-solid fa-chart-bar", value: "Grafico de barra vertical", icon: "fas fa-chart-bar"},
    {key: "fa-solid fa-chart-line", value: "Grafico de linha", icon: "fas fa-chart-line"},
    // Balão de comentario FontAwesome
    {key: "fa-regular fa-comment", value: "Balao vazado", icon: "far fa-comment"},
    {key: "fa-solid fa-comment", value: "Balao solido", icon: "fas fa-comment"},
    {key: "fa-regular fa-comment-dots", value: "Balao vazado com ponto", icon: "far fa-comment-dots"},
    {key: "fa-solid fa-comment-dots", value: "Balao solido com ponto", icon: "fas fa-comment-dots"},
    {key: "fa-regular fa-comments", value: "2 Baloes vazados", icon: "far fa-comments"},
    {key: "fa-solid fa-comments", value: "2 Baloes solidos", icon: "fas fa-comments"},
    {key: "fa-regular fa-message", value: "Balao retangular vazado", icon: "far fa-comment-alt"},
    {key: "fa-solid fa-message", value: "Balao retangular solido", icon: "fas fa-comment-alt"},
    // Aperto de mao FontAwesome
    {key: "fa-regular fa-handshake", value: "Aperto de mao vazado", icon: "far fa-handshake"},
    {key: "fa-solid fa-handshake", value: "Aperto de mao solido", icon: "fas fa-handshake"},
    // Seta/Flecha -> FontAwesome
    {key: "fa-solid fa-arrow-down", value: "Seta para baixo", icon: "fas fa-arrow-down"},
    {key: "fa-solid fa-arrow-down-long", value: "Seta para baixo longa", icon: "fas fa-long-arrow-alt-down"},
    {key: "fa-solid fa-arrow-left", value: "Seta para esquerda", icon: "fas fa-arrow-left"},
    {key: "fa-solid fa-arrow-left-long", value: "Seta para esquerda longa", icon: "fas fa-long-arrow-alt-left"},
    {key: "fa-solid fa-arrow-right", value: "Seta para direita", icon: "fas fa-arrow-right"},
    {key: "fa-solid fa-arrow-right-long", value: "Seta para direita longa", icon: "fas fa-long-arrow-alt-right"},
    {key: "fa-solid fa-arrow-up", value: "Seta para cima", icon: "fas fa-arrow-up"},
    {key: "fa-solid fa-arrow-up-long", value: "Seta para cima longa", icon: "fas fa-long-arrow-alt-up"},
    // Checks FontAwesome
    {key: "fa-solid fa-check", value: "Check", icon: "fas fa-check"},
    {key: "fa-solid fa-check-double", value: "Check duplo", icon: "fas fa-check-double"},
    {key: "fa-regular fa-circle-check", value: " Circulo com check vazado", icon: "far fa-check-circle"},
    {key: "fa-solid fa-circle-check", value: "Circulo com check solido", icon: "fas fa-check-circle"},
    {key: "fa-regular fa-square-check", value: " Quadrado com check vazado", icon: "far fa-check-square"},
    {key: "fa-solid fa-square-check", value: "Quadrado com check solido", icon: "fas fa-check-square"},
    {key: "fa-solid fa-clipboard-check", value: "Check de prancheta", icon: "fas fa-clipboard-check"},
    {key: "fa-solid fa-user-check", value: "Check de usuario solido", icon: "fas fa-user-check"},
    // Filtros FontAwesome
    {key: "fa-solid fa-filter", value: "Filtro solido", icon: "fas fa-filter"},
    {key: "fa-light fa-arrow-down-a-z", value: "Filtro A-Z seta para baixo", icon: "fas fa-sort-alpha-down"},
    {key: "fa-light fa-arrow-up-a-z", value: "Filtro A-Z seta para cima", icon: "fas fa-sort-alpha-up"},
    {key: "fa-light fa-arrow-down-1-9", value: "Filtro 1-9 seta para baixo", icon: "fas fa-sort-numeric-down"},
    {key: "fa-light fa-arrow-up-1-9", value: "Filtro 1-9 seta para cima", icon: "fas fa-sort-numeric-up"},
    // Arquivos FontAwesome
    {key: "fa-regular fa-file", value: " Arquivo Folha vazado", icon: "far fa-file"},
    {key: "fa-solid fa-file", value: "Arquivo Folha solido", icon: "fas fa-file"},
    {key: "fa-thin fa-folder-open", value: " Pasta vazado", icon: "far fa-folder-open"},
    {key: "fa-solid fa-folder-open", value: "Pasta solido", icon: "fas fa-folder-open"},
    // Calendario
    {key: "fa-light fa-calendar-days", value: "Calendario", icon: "far fa-calendar-alt"}
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
    { key: 1, value: "Domingo" },
    { key: 2, value: "Segunda-feira" },
    { key: 3, value: "Terça-feira" },
    { key: 4, value: "Quarta-feira" },
    { key: 5, value: "Quinta-feira" },
    { key: 6, value: "Sexta-feira" },
    { key: 7, value: "Sábado" }
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

  public CAMPOS_OCULTOS_DEMANDA: LookupItem[] = [
    { key: 'nometeste', value: "Nome Teste" },
    { key: 'observacaoteste', value: "Observação Teste" }
  ];

  public TIPO_CARGA_HORARIA: LookupItem[] = [
    { key: 'DIA', icon: "bi bi-calendar3-event", value: "Horas por dia" },
    { key: 'DIA', icon: "bi bi-calendar3-week", value: "Horas por semana" },
    { key: 'DIA', icon: "bi bi-calendar3", value: "Horas por mês" }
  ];

  public getLookup(itens: LookupItem[], key: any) {
    return itens.find(x => x.key == key);
  }

  public getCode(itens: LookupItem[], key: any) : string {
    return itens.find(x => x.key == key)?.code || "";
  }

  public getValue(itens: LookupItem[], key: any) : string {
    return itens.find(x => x.key == key)?.value || "";
  }

  public getColor(itens: LookupItem[], key: any) : string {
    return itens.find(x => x.key == key)?.color || "";
  }

  public getIcon(itens: LookupItem[], key: any) : string {
    return itens.find(x => x.key == key)?.icon || "";
  }

}