import { ChangeDetectorRef, Injectable, Injector } from '@angular/core';
import { Nomenclatura } from '../models/entidade.model';
import { IIndexable } from '../models/base.model';
import { AppComponent } from '../app.component';

export type Translate = {
  [index: string]: {
    single: string,
    plural: string,
    female: boolean
  }
};

@Injectable({
  providedIn: 'root'
})
export class LexicalService {

  public PREPOSITIONS_MALE = ["o", "os", "ao", "aos", "do", "dos", "dum", "duns", "no", "nos", "um", "num", "uns", "nuns", "pelo", "pelos"];
  public PREPOSITIONS_FEMALE = ["a", "as", "à", "às", "da", "das", "duma", "dumas", "na", "nas", "uma", "numa", "umas", "numas", "pela", "pelas"];
  public app?: AppComponent;

  /* Colocar single e plural em minúsculo (Sempre seguir a ordem Alfabética)
  * ATENÇÃO: os campos single e plural do defaults não deverá ser mudados, pois o código faz referência a eles,
  * caso queira fazer a modificação, utilizar seeders alterando na entidade as nomenclaturas. */
  public defaults: Translate = {
    "adesao": {single: "adesão", plural: "adesões", female: true},
    "administrador": {single: "administrador", plural: "administradores", female: false},
    "afastamento": {single: "ocorrência", plural: "ocorrências", female: true},
    "área de trabalho": {single: "área de trabalho", plural: "áreas de trabalho", female: true},
    "area do conhecimento": {single: "area do conhecimento", plural: "areas dos conhecimentos", female: true},
    "atividade": {single: "atividade", plural: "atividades", female: false},
    "atribuição": {single: "atribuição", plural: "atribuições", female: true},
    "avaliação": {single: "avaliação", plural: "avaliações", female: true},
    "cadastro": {single: "cadastro", plural: "cadastros", female: false},
    "cadeiaValor": {single: "cadeia de valor", plural: "cadeias de valor", female: true},
    "capacidade": {single: "capacidade", plural: "capacidades", female: true},
    "chefe": {single: "chefe", plural: "chefes", female: true},
    "cidade": {single: "cidade", plural: "cidades", female: true},
    "consolidação": {single: "consolidação", plural: "consolidações", female: false},
    "data de distribuição": {single: "data de distribuição", plural: "datas de distribuição", female: true},
    "data de homologação": {single: "data de homologação", plural: "datas de homologação", female: true},
    "demanda": {single: "demanda", plural: "demandas", female: true},
    "desabilitado": {single: "desabilitado", plural: "desabilitados", female: false},
    "desabilitar": {single: "desabilitar", plural: "desabilitar", female: false},
    "desenvolvedor": {single: "desenvolvedor", plural: "desenvolvedores", female: false},
    "documento": {single: "documento", plural: "documentos", female: false},
    "entidade": {single: "entidade", plural: "entidades", female: true},
    "entrega": {single: "entrega", plural: "entregas", female: true},
    "eixo temático": {single: "eixo temático", plural: "eixos temáticos", female: false},
    "execução": {single: "execução", plural: "execuções", female: false},
    "feriado": {single: "feriado", plural: "feriados", female: false},
    "gerenciamento": {single: "gerenciamento", plural: "gerenciamentos", female: false},
    "inclusão de atividade": {single: "inclusão de atividade", plural: "inclusões de atividades", female: false},
    "habilitação": {single: "habilitação", plural: "habilitações", female: true},
    "habilitado": {single: "habilitado", plural: "habilitados", female: false},
    "habilitar": {single: "habilitar", plural: "habilitar", female: false},
    "justificativa": {single: "justificativa", plural: "justificativas", female: true},
    "lotação": {single: "lotação", plural: "lotações", female: true},
    "material e serviço": {single: "material e serviço", plural: "materiais e serviços", female: false},
    "modalidade": {single: "modalidade", plural: "modalidades", female: true},
    "modelo de entrega" : {single: "modelo de entrega", plural: "modelos de entregas", female: false},
    "motivo de afastamento": {single: "motivo de afastamento", plural: "motivos de afastamento", female: false},
    "notificação": {single: "notificação", plural: "notificações", female: true},
    "objetivo": {single: "objetivo", plural: "objetivos", female: false},
    "ocorrência": {single: "ocorrência", plural: "ocorrências", female: true},
    "pela unidade gestora": {single: "pela Unidade Gestora", plural: "pelas Unidades Gestoras", female: true},
    "perfil": {single: "perfil", plural: "perfis", female: false},
    "perfil do menu": {single: "perfil do menu", plural: "perfis do menu", female: false},
    "planejamento": {single: "planejamento", plural: "planejamentos", female: false},
    "planejamento institucional": {single: "planejamento institucional", plural: "planejamentos institucionais", female: false},
    "plano de trabalho": {single: "plano de trabalho", plural: "planos de trabalho", female: false},
    "plano de entrega": {single: "plano de entrega", plural: "planos de entrega", female: false},
    "ponto de controle": {single: "ponto de controle", plural: "pontos de controle", female: false},
    "ponto eletrônico": {single: "ponto eletrônico", plural: "pontos eletrônicos", female: false},
    "prazo de distribuição": {single: "prazo de distribuição", plural: "prazos de distribuição", female: false},
    "prazo de entrega": {single: "prazo de entrega", plural: "prazos de entrega", female: false},
    "prazo recalculado": {single: "prazo recalculado", plural: "prazos recalculados", female: false},
    "processo": {single: "processo", plural: "processos", female: false},
    "produtividade": {single: "produtividade", plural: "produtividades", female: true},
    "programa": {single: "programa", plural: "programas", female: false},
    "programa de gestão": {single: "programa de gestão", plural: "programas de gestão", female: false},
    "projeto": {single: "projeto", plural: "projetos", female: false},
    "requisição": {single: "requisição", plural: "requisições", female: true},
    "responsável": {single: "responsável", plural: "responsáveis", female: false},
    "resultado institucional": {single: "resultado institucional", plural: "resultados institucionais", female: false},
    "rotina de integração": {single: "rotina de integração", plural: "rotinas de integração", female: true},
    "servidor": {single: "servidor", plural: "servidores", female: false},
    "tarefa": {single: "tarefa", plural: "tarefas", female: true},
    "tarefa da atividade": {single: "tarefa da atividade", plural: "tarefas da atividade", female: true},
    "tcr": {single: "tcr", plural: "tcrs", female: false},
    "termo de ciência e responsabilidade": {single: "termo de ciência e responsabilidade", plural: "termos de ciência e responsabilidade", female: false},
    "tempo estimado": {single: "tempo estimado", plural: "tempos estimados", female: false},
    "tempo pactuado": {single: "tempo pactuado", plural: "tempos pactuados", female: false},
    "tempo planejado": {single: "tempo planejado", plural: "tempos planejados", female: false},
    "template": {single: "template", plural: "templates", female: false},
    "termo": {single: "termo", plural: "termos", female: false},
    "texto complementar": {single: "texto complementar", plural: "textos complementares", female: false},
    "tipo de indicador": {single: "tipo de indicador", plural: "tipos de indicadores", female: false},
    "tipo de atividade": {single: "tipo de atividade", plural: "tipos de atividades", female: false},
    "tipo de capacidade": {single: "tipo de capacidade", plural: "tipos de capacidades", female: false},
    "tipo de meta": {single: "tipo de meta", plural: "tipos de metas", female: false},
    "unidade": {single: "unidade", plural: "unidades", female: true},
    "usuario": {single: "usuário", plural: "usuários", female: false},
    "valor institucional": {single: "valor institucional", plural: "valores institucionais", female: false},
    "tipo de avaliação do registro de execução do plano de trabalho": {single: "Tipo de avaliação do registro de execução do plano de trabalho", plural: "Tipos de avaliações do registro de execução do plano de trabalho", female: false}
  };

  public plurals: IIndexable = {}; // Vetor reverso, contendo os plurais para permitir encontrar a key do vetor defaults pelo plural (melhorar performance)
  public vocabulary: Translate = {};
  public cdRef?: ChangeDetectorRef;

  constructor(public injector: Injector) {
    this.vocabulary = this.defaults;
    Object.entries(this.defaults).forEach(x => this.plurals[x[1].plural] = x[0]);
  }

  public loadVocabulary(nomenclatura?: Nomenclatura[]) {
    let result: Translate = {};
    Object.entries(this.defaults).forEach(([key, value]) => {
      const nome = nomenclatura?.find(x => x.nome == key);
      result[key] = nome ? {
        single: nome.singular,
        plural: nome.plural,
        female: nome.feminino
      } : value;
    });
    this.vocabulary = result;
    if(this.update) this.update();
    this.cdRef?.detectChanges();
  }

  public update() {
    this.app!.setMenuVars();
  }

  /**
   * @param string name           A expressão que se deseja traduzir. Deve estar sempre no singular. A expressão deve conter, no máximo, 3 termos.
   * @param boolean plural        Informa se a tradução deve vir no plural ou não. O padrão é false.
   * @param boolean preposition   Informa se a tradução deve vir antecedida da preposição, o padrão é false, sem preprosição.
   * @returns Retorna uma string que corresponde à tradução do parâmetro 'name'. O retorno poderá ser em um dos três formatos: lowercase,
   *          uppercase ou camelcase, a depender do formato recebido no parâmetro 'name'.
  */
  public noun(name: string, plural: boolean = false, preposition: boolean = false): string {
    const index = name.toLowerCase();
    var camelCase_noum = "";
    if(this.vocabulary[index]) {
      const isCamelCase = (name[0] == name[0].toUpperCase() && name[1] != name[1].toUpperCase());
      const isAllUpperCase = name == name.toUpperCase();
      const lowercase_noum = plural ? this.vocabulary[index].plural : this.vocabulary[index].single;
      const pieces = lowercase_noum.split(" ");
      const isCompound = pieces.length > 1;
      camelCase_noum = pieces[0][0].toUpperCase() + pieces[0].substring(1) +
        (isCompound ? " " + (pieces.length == 2 ? pieces[1][0].toUpperCase() + pieces[1].substring(1) :
        pieces[1] + " " + pieces[2][0].toUpperCase() + pieces[2].substring(1)) : "");
      const prefix = !preposition ? "" : plural ? (this.vocabulary[index].female ? " das " : " dos ") : (this.vocabulary[index].female ? " da " : " do ");
      return isAllUpperCase ? (prefix + lowercase_noum).toUpperCase() : isCamelCase ? prefix + camelCase_noum : prefix + lowercase_noum;
    } else {
      return name;
    }
  }

  /**
   * @param string phrase  A expressão que se deseja traduzir. Pode incluir preposição e/ou espaços no início. Irá respeitar o case da entrada.
   * A tabela das preposições aceitas estão listadas abaixo (incluindo a primeira linha e a primeira coluna):
   *       o    a    os    as    um  uma  uns  umas
   *     +------------------------------------------
   * a   | ao   à    aos   às 
   * de  | do   da   dos   das   dum duma duns dumas
   * em  | no   na   nos   nas   num numa nuns numas
   * por | pelo pela pelos pelas
   * @returns Retorna uma string que corresponde à tradução. O retorno irá respeitar o case da entrada, mas caso seja detectado camelcase, a inicial de cada palavra será maiúscula.
   Pré-posições: 
  */
  public translate(phrase: string) {
    /* Inicializa variáveis */
    const regex = /^(\s*)(o\s|a\s|os\s|as\s|um\s|uma\s|uns\s|umas\s|ao\s|à\s|aos\s|às\s|do\s|da\s|dos\s|das\s|dum\s|duma\s|duns\s|dumas\s|no\s|na\s|nos\s|nas\s|num\s|numa\s|nuns\s|numas\s|pelo\s|pela\s|pelos\s|pelas|)(.*)$/i;
    let groups = regex.exec(phrase);
    let spaces = groups ? groups[1] : "";
    let preposition = groups ? groups[2].trim().replace(" ", "%") : "";
    let noun = groups ? groups[3] : "";
    let plural = this.plurals[noun.toLowerCase()];
    let key = (plural || noun).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    let keyComAcento = (plural || noun).toLowerCase();
    let native = this.defaults[key] ? this.defaults[key] : this.defaults[keyComAcento] ? this.defaults[keyComAcento] : null;
    let database = this.vocabulary[key] ? this.vocabulary[key] : this.vocabulary[keyComAcento] ? this.vocabulary[keyComAcento] : null;
    /* Verifica se é necessário fazer a transformação */
    if(native && (native.single != database!.single || native.plural != database!.plural)) {
      /* Tem preposição */
      if(preposition?.length && !["de", "em", "por"].includes(preposition.toLowerCase()) && native.female !== database!.female) {
        preposition = this.keepCase(preposition, native.female ? this.PREPOSITIONS_MALE[this.PREPOSITIONS_FEMALE.indexOf(preposition.toLowerCase())] : this.PREPOSITIONS_FEMALE[this.PREPOSITIONS_MALE.indexOf(preposition.toLowerCase())]);
      }
      noun = this.keepCase(noun, plural ? database!.plural : database!.single);
    }
    return spaces + (preposition?.length ? preposition + " " : "") + noun;
  }

  public keepCase(source: string, destination: string) {
    const isCamelCase = (source[0] == source[0].toUpperCase() && source.length > 1 && source[1] != source[1].toUpperCase());
    const isAllUpperCase = source == source.toUpperCase();
    return isAllUpperCase ? destination.toUpperCase() : isCamelCase ? destination.split(" ").map(x => !this.PREPOSITIONS_MALE.includes(x) && !this.PREPOSITIONS_FEMALE.includes(x) ? x[0].toUpperCase() + x.substring(1) : x).join(" ") : destination;
  }

}
