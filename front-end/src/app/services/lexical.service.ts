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

  public defaults: Translate = {
    "afastamento": {single: "afastamento", plural: "afastamentos", female: false},
    "atividade": {single: "atividade", plural: "atividades", female: true},
    "avaliação": {single: "avaliação", plural: "avaliações", female: true},
    "capacidade": {single: "capacidade", plural: "capacidades", female: true},
    "data de distribuição": {single: "data de distribuição", plural: "datas de distribuição", female: false},
    "demanda": {single: "demanda", plural: "demandas", female: true},
    "documento": {single: "documento", plural: "documentos", female: false},
    "entidade": {single: "entidade", plural: "entidades", female: true},
    "entrega": {single: "Entrega", plural: "Entregas", female: true},
    "justificativa": {single: "justificativa", plural: "justificativas", female: true},
    "material e serviço": {single: "material e serviço", plural: "materiais e serviços", female: false},
    "modalidade": {single: "modalidade", plural: "modalidades", female: true},
    "motivo de afastamento": {single: "motivo de afastamento", plural: "motivos de afastamento", female: false},
    "plano de trabalho": {single: "plano de trabalho", plural: "planos de trabalho", female: false},
    "prazo de entrega": {single: "prazo de entrega", plural: "prazos de entrega", female: false},
    "processo": {single: "processo", plural: "processos", female: false},
    "programa de gestão": {single: "programa de gestão", plural: "programas de gestão", female: false},
    "projeto": {single: "projeto", plural: "projetos", female: false},
    "requisição": {single: "requisição", plural: "requisições", female: true},
    "tarefa": {single: "Tarefa", plural: "Tarefas", female: true},
    "tempo pactuado": {single: "tempo pactuado", plural: "tempos pactuados", female: false},
    "tempo planejado": {single: "tempo planejado", plural: "tempos planejados", female: false},
    "unidade": {single: "unidade", plural: "unidades", female: true},
    "usuário": {single: "usuário", plural: "usuários", female: false},
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

  public noun(name: string, plural: boolean = false, preposition: boolean = false) {

    const index = name.toLowerCase();
    var camelCase_noum = "";
    if(this.vocabulary[index]) {
      const camelCase = (name[0] == name[0].toUpperCase() && name[1] != name[1].toUpperCase());
      const allUpperCase = name == name.toUpperCase();
      const lowercase_noum = plural ? this.vocabulary[index].plural : this.vocabulary[index].single;
      const pieces = lowercase_noum.split(" ");
      const compound = pieces.length > 1;
      camelCase_noum = pieces[0][0].toUpperCase() + pieces[0].substring(1) +
        (compound ? " " + (pieces.length == 2 ? pieces[1][0].toUpperCase() + pieces[1].substring(1) :
        pieces[1] + " " + pieces[2][0].toUpperCase() + pieces[2].substring(1)) : "");
      const prefix = !preposition ? "" : plural ? (this.vocabulary[index].female ? "das " : "dos ") : (this.vocabulary[index].female ? "da " : "do ");
      return allUpperCase ? (prefix + lowercase_noum).toUpperCase() : camelCase ? prefix + camelCase_noum : prefix + lowercase_noum;
    } else {
      return name;
    }
  }
}
