import { ExpressionStatement } from '@angular/compiler';
import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { constructorParametersDownlevelTransform } from '@angular/compiler-cli';


export type QuestionarioPerguntaTipo = "EMOJI" | "SELECT" | "MULTI_SELECT" | "TEXT" | "TEXT_AREA" | "TIMER" | "DATE_TIME" | "SWICTH" | "NUMBER" | "RATE" | "RADIO" | "CHECK";
export type QuestionarioPerguntaRespostaTimer = "DAYS_HOURS" | "DAYS" | "HOURS";
export type QuestionarioPerguntaRespostaDateTime = "DATE_TIME" | "DATE" | "TIME";
export type QuestionarioPerguntaRespostaRange = {min: number, max: number};
export type QuestionarioPerguntaResposta = null | LookupItem[] | QuestionarioPerguntaRespostaRange | {tipo: QuestionarioPerguntaRespostaTimer | QuestionarioPerguntaRespostaDateTime};

export class QuestionarioPergunta extends Base {
    public sequencia: number | undefined ; //sequencia da pergunta
    public pergunta: string = ""; //pergunta
    public tipo:  QuestionarioPerguntaTipo = "SELECT"; // tipo da resposta para esta pergunta
    public criado_versao: number | undefined = 0 ; //versao de criacao
    public deletado_versao: number | undefined = 0; //versao em que for deletado
    public respostas: QuestionarioPerguntaResposta = null; // opções de respostas para essa pergunta

    public constructor(data?: any) { super(); this.initialization(data); }
}

/*
Preenchimento do campo respostas a depender do tipo:

EMOJI: LookupItem[] {key: "ICONE", value: "DESCRICAO", icon: "ICONE"}
SELECT: LookupItem[] {key: "CODIGO", value: "DESCRICAO"}
MULTI_SELECT: LookupItem[] {key: "CODIGO", value: "DESCRICAO"}
TEXT: undefined
TEXT_AREA: undefined
TIMER: {tipo: "DAYS_HOURS" | "DAYS" | "HOURS"}
DATE_TIME: {tipo: "DATE_TIME" | "DATE" | "TIME"}
SWICTH: LookupItem[] lookup.SIMNAO
NUMBER: undefined
RATE: {max: NUMBER, min: NUMBER},
RADIO: LookupItem[] {key: "CODIGO", value: "DESCRICAO"}
CHECK: LookupItem[] {key: "CODIGO", value: "DESCRICAO"}
*/







// tipos

//LIVRE - Resposta Aberta (Texto Livre): Permite que os respondentes expressem suas opiniões em suas próprias palavras.

//LISTA UNICA - Resposta de Escolha Única: respondente seleciona uma única opção entre as fornecidas.

//LISTA_MULTIPLA - O respondente pode selecionar várias opções entre as fornecidas.

//CLASSIFICACAO - O respondente avalia sua concordância ou discordância em uma escala. 

//VISUAL - O respondente fornece uma classificação visual, como estrelas ou emojis.

//NUMERICA - O respondente fornece um valor numérico como resposta.

//SWITCH - O respondente escolhe entre verdadeiro ou falso, sim ou não.

//INTENSIDADE - O respondente indica o nível de intensidade de uma característica. Ex. Em uma escala de 1 a 10, quão importante...

//ORDENACAO - O respondente ordena itens de acordo com suas preferências.

//LACUNA - O respondente preenche espaços em branco em uma frase.

//SWITCH-Resposta de Escolha Única: respondente seleciona uma única opção entre SIM ou NÃO.