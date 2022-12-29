import { TestBed } from '@angular/core/testing';

import { LexicalService, Translate } from './lexical.service';

fdescribe('LexicalService', () => {
  let $service: LexicalService;
  let $defaults: Translate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    $service = TestBed.inject(LexicalService);

    $defaults = {
      "atividade": {single: "tarefa", plural: "tarefas", female: true},   // usado nos testes
      "tipo de atividade": {single: "forma de tarefa", plural: "formas de tarefas", female: true},
      "afastamento": {single: "afastamento", plural: "afastamentos", female: false},
      "programa de gestão": {single: "programa de administração", plural: "programas de administração", female: false},   // usado nos testes
      "avaliação": {single: "avaliação", plural: "avaliações", female: true},
      "documento": {single: "documento", plural: "documentos", female: false},
      "justificativa": {single: "justificativa", plural: "justificativas", female: true},
      "modalidade": {single: "modalidade", plural: "modalidades", female: true},
      "entidade": {single: "entidade", plural: "entidades", female: true},
      "unidade": {single: "unidade operacional", plural: "unidades operacionais", female: true},    // usado nos testes
      "capacidade": {single: "capacidade", plural: "capacidades", female: true},
      "usuário": {single: "usuário", plural: "usuários", female: false},
      "plano de trabalho": {single: "proposta", plural: "propostas", female: true},   // usado nos testes
      "motivo de afastamento": {single: "causa da ausência", plural: "causas das ausências", female: true},   // usado nos testes
      "processo": {single: "processo", plural: "processos", female: false},
      "demanda": {single: "demanda", plural: "demandas", female: true},
      "tempo pactuado": {single: "tempo pactuado", plural: "tempos pactuados", female: false},
      "projeto": {single: "plano & ação", plural: "planos & ações", female: false}    // usado nos testes
    };

    // $service.vocabulary = $defaults;

  });

  it('O LEXICAL SERVICE DEVE SER CRIADO', () => {
    expect($service).toBeTruthy();
  });

  it('A FUNÇÃO noun() DEVE GERAR MAIÚSCULAS/MINÚSCULAS CORRETAMENTE PARA TERMOS SIMPLES', () => {

    expect($service.noun('ATIVIDADE')).toEqual('ATIVIDADE');
    expect($service.noun('atividade')).toEqual('atividade');
    expect($service.noun('Atividade')).toEqual('Atividade');
    expect($service.noun('ATIVIDADE',true)).toEqual('ATIVIDADES');
    expect($service.noun('atividade',true)).toEqual('atividades');
    expect($service.noun('Atividade',true)).toEqual('Atividades');
    expect($service.noun('ATIVIDADE',true,true)).toEqual('DAS ATIVIDADES');
    expect($service.noun('atividade',true,true)).toEqual('das atividades');
    expect($service.noun('Atividade',true,true)).toEqual('das Atividades');
    expect($service.noun('ATIVIDADE',false,true)).toEqual('DA ATIVIDADE');
    expect($service.noun('atividade',false,true)).toEqual('da atividade');
    expect($service.noun('Atividade',false,true)).toEqual('da Atividade');

 /*    expect($service.noun('UNIDADE')).toEqual('UNIDADE OPERACIONAL');
    expect($service.noun('unidade')).toEqual('unidade operacional');
    expect($service.noun('Unidade')).toEqual('Unidade Operacional');
    expect($service.noun('UNIDADE',true)).toEqual('UNIDADES OPERACIONAIS');
    expect($service.noun('unidade',true)).toEqual('unidades operacionais');
    expect($service.noun('Unidade',true)).toEqual('Unidades Operacionais');
    expect($service.noun('UNIDADE',true,true)).toEqual('DAS UNIDADES OPERACIONAIS');
    expect($service.noun('unidade',true,true)).toEqual('das unidades operacionais');
    expect($service.noun('Unidade',true,true)).toEqual('das Unidades Operacionais');
    expect($service.noun('UNIDADE',false,true)).toEqual('DA UNIDADE OPERACIONAL');
    expect($service.noun('unidade',false,true)).toEqual('da unidade operacional');
    expect($service.noun('Unidade',false,true)).toEqual('da Unidade Operacional');

    expect($service.noun('PROJETO')).toEqual('PLANO & AÇÃO');
    expect($service.noun('projeto')).toEqual('plano & ação');
    expect($service.noun('Projeto')).toEqual('Plano & Ação');
    expect($service.noun('PROJETO',true)).toEqual('PLANOS & AÇÕES');
    expect($service.noun('projeto',true)).toEqual('planos & ações');
    expect($service.noun('Projeto',true)).toEqual('Planos & Ações');
    expect($service.noun('PROJETO',true,true)).toEqual('DOS PLANOS & AÇÕES');
    expect($service.noun('projeto',true,true)).toEqual('dos planos & ações');
    expect($service.noun('Projeto',true,true)).toEqual('dos Planos & Ações');
    expect($service.noun('PROJETO',false,true)).toEqual('DO PLANO & AÇÃO');
    expect($service.noun('projeto',false,true)).toEqual('do plano & ação');
    expect($service.noun('Projeto',false,true)).toEqual('do Plano & Ação'); */
  });

  it('A FUNÇÃO noun() DEVE GERAR MAIÚSCULAS/MINÚSCULAS CORRETAMENTE PARA EXPRESSÕES COMPOSTAS', () => {

/*     expect($service.noun('PROGRAMA DE GESTÃO')).toEqual('PROGRAMA DE GESTÃO');
    expect($service.noun('programa de gestão')).toEqual('programa de gestão');
    expect($service.noun('Programa de gestão')).toEqual('Programa de Gestão'); */


    expect($service.noun('MOTIVO DE AFASTAMENTO')).toEqual('MOTIVO DE AFASTAMENTO');
    expect($service.noun('motivo de afastamento')).toEqual('motivo de afastamento');
    expect($service.noun('Motivo de afastamento')).toEqual('Motivo de Afastamento');
    expect($service.noun('MOTIVO DE AFASTAMENTO',true)).toEqual('MOTIVOS DE AFASTAMENTO');
    expect($service.noun('motivo de afastamento',true)).toEqual('motivos de afastamento');
    expect($service.noun('Motivo de afastamento',true)).toEqual('Motivos de Afastamento');
    expect($service.noun('MOTIVO DE AFASTAMENTO',true,true)).toEqual('DOS MOTIVOS DE AFASTAMENTO');
    expect($service.noun('motivo de afastamento',true,true)).toEqual('dos motivos de afastamento');
    expect($service.noun('Motivo de afastamento',true,true)).toEqual('dos Motivos de Afastamento');
    expect($service.noun('MOTIVO DE AFASTAMENTO',false,true)).toEqual('DO MOTIVO DE AFASTAMENTO');
    expect($service.noun('motivo de afastamento',false,true)).toEqual('do motivo de afastamento');
    expect($service.noun('Motivo de afastamento',false,true)).toEqual('do Motivo de Afastamento');

/*    expect($service.noun('PLANO DE TRABALHO')).toEqual('PROPOSTA');
    expect($service.noun('plano de trabalho')).toEqual('proposta');
    expect($service.noun('Plano de trabalho')).toEqual('Proposta');
    expect($service.noun('PLANO DE TRABALHO',true)).toEqual('PROPOSTAS');
    expect($service.noun('plano de trabalho',true)).toEqual('propostas');
    expect($service.noun('Plano de trabalho',true)).toEqual('Propostas');
    expect($service.noun('PLANO DE TRABALHO',true,true)).toEqual('DAS PROPOSTAS');
    expect($service.noun('plano de trabalho',true,true)).toEqual('das propostas');
    expect($service.noun('Plano de trabalho',true,true)).toEqual('das Propostas');
    expect($service.noun('PLANO DE TRABALHO',false,true)).toEqual('DA PROPOSTA');
    expect($service.noun('plano de trabalho',false,true)).toEqual('da proposta');
    expect($service.noun('Plano de trabalho',false,true)).toEqual('da Proposta');

    expect($service.noun('TIPO DE ATIVIDADE')).toEqual('FORMA DE TAREFA'); */
  });

/*   it('A FUNÇÃO loadVocabulary() DEVE TRADUZIR CORRETAMENTE TERMOS SIMPLES', () => {

  }); */

/*   it('A FUNÇÃO loadVocabulary() DEVE TRADUZIR CORRETAMENTE EXPRESSÕES COMPOSTAS', () => {
    expect($service.loadVocabulary('PROGRAMA DE GESTÃO',true)).toEqual('PROGRAMAS DE ADMINISTRAÇÃO');
    expect($service.loadVocabulary('programa de gestão',true)).toEqual('programas de administração');
    expect($service.loadVocabulary('Programa de gestão',true)).toEqual('Programas de Administração');
    expect($service.loadVocabulary('PROGRAMA DE GESTÃO',true,true)).toEqual('DOS PROGRAMAS DE ADMINISTRAÇÃO');
    expect($service.loadVocabulary('programa de gestão',true,true)).toEqual('dos programas de administração');
    expect($service.loadVocabulary('Programa de gestão',true,true)).toEqual('dos Programas de Administração');
    expect($service.loadVocabulary('PROGRAMA DE GESTÃO',false,true)).toEqual('DO PROGRAMA DE ADMINISTRAÇÃO');
    expect($service.loadVocabulary('programa de gestão',false,true)).toEqual('do programa de administração');
    expect($service.loadVocabulary('Programa de gestão',false,true)).toEqual('do Programa de Administração');
  }); */
});
