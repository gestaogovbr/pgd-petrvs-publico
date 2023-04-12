import { ChangeDetectorRef, Injectable, Injector } from '@angular/core';
import { Nomenclatura } from '../models/entidade.model';

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
  /* Colocar single e plural em minúsculo (Sempre seguir a ordem Alfabética)*/
  public defaults: Translate = {
    "adesao": {single: "adesão", plural: "adesões", female: false},
    "afastamento": {single: "afastamento", plural: "afastamentos", female: false},
    "atividade": {single: "atividade", plural: "atividades", female: true},
    "avaliação": {single: "avaliação", plural: "avaliações", female: true},
    "cadeia de valor": {single: "cadeia de valor", plural: "cadeias de valor", female: false},
    "capacidade": {single: "capacidade", plural: "capacidades", female: true},
    "cidade": {single: "cidade", plural: "cidades", female: true},
    "data de distribuição": {single: "data de distribuição", plural: "datas de distribuição", female: false},
    "demanda": {single: "demanda", plural: "demandas", female: true},
    "documento": {single: "documento", plural: "documentos", female: false},
    "entidade": {single: "entidade", plural: "entidades", female: true},
    "entrega": {single: "entrega", plural: "entregas", female: true},
    "eixo temático": {single: "eixo temático", plural: "eixos temáticos", female: false},
    "feriado": {single: "feriado", plural: "feriados", female: false},
    "justificativa": {single: "justificativa", plural: "justificativas", female: true},
    "lotação": {single: "lotação", plural: "lotações", female: true},
    "macroprocesso": {single: "macroprocesso", plural: "macroprocessos", female: false},
    "material e serviço": {single: "material e serviço", plural: "materiais e serviços", female: false},
    "modalidade": {single: "modalidade", plural: "modalidades", female: true},
    "motivo de afastamento": {single: "motivo de afastamento", plural: "motivos de afastamento", female: false},
    "objetivo": {single: "objetivo", plural: "objetivos", female: false},
    "perfil": {single: "perfil", plural: "perfis", female: false},
    "planejamento institucional": {single: "planejamento institucional", plural: "planejamentos institucionais", female: false},
    "plano de trabalho": {single: "plano de trabalho", plural: "planos de trabalho", female: false},
    "plano de entrega": {single: "plano de entrega", plural: "planos de entrega", female: false},
    "ponto de controle": {single: "ponto de controle", plural: "pontos de controle", female: false},
    "prazo de entrega": {single: "prazo de entrega", plural: "prazos de entrega", female: false},
    "processo": {single: "processo", plural: "processos", female: false},
    "programa de gestão": {single: "programa de gestão", plural: "programas de gestão", female: false},
    "projeto": {single: "projeto", plural: "projetos", female: false},
    "requisição": {single: "requisição", plural: "requisições", female: true},
    "rotina de integração": {single: "rotina de integração", plural: "rotinas de integração", female: true},
    "tarefa": {single: "tarefa", plural: "tarefas", female: true},
    "tcr": {single: "tcr", plural: "tcrs", female: false},
    "tempo pactuado": {single: "tempo pactuado", plural: "tempos pactuados", female: false},
    "tempo planejado": {single: "tempo planejado", plural: "tempos planejados", female: false},
    "template": {single: "template", plural: "templates", female: false},
    "termo": {single: "termo", plural: "termos", female: false},
    "unidade": {single: "unidade", plural: "unidades", female: true},
    "usuário": {single: "usuário", plural: "usuários", female: false}
  };

  public vocabulary: Translate = {};
  public cdRef?: ChangeDetectorRef;

  constructor(public injector: Injector) {
    this.vocabulary = this.defaults;
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
    this.cdRef?.detectChanges();
  }

  /**
   * @param {string} name           A expressão que se deseja traduzir. Deve estar sempre no singular. A expressão deve conter, no máximo, 3 termos.
   * @param {boolean} plural        Informa se a tradução deve vir no plural ou não. O padrão é false.
   * @param {boolean} preposition   Informa se a tradução deve vir antecedida da preposição do/da/dos/das, conforme o caso. O padrão é false.
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
      const prefix = !preposition ? "" : plural ? (this.vocabulary[index].female ? "das " : "dos ") : (this.vocabulary[index].female ? "da " : "do ");
      return isAllUpperCase ? (prefix + lowercase_noum).toUpperCase() : isCamelCase ? prefix + camelCase_noum : prefix + lowercase_noum;
    } else {
      return name;
    }
  }
}
