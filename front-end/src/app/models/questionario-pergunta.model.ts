import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { Questionario } from './questionario.model';

export type QuestionarioPerguntaTipo = "SEARCH" | "EMOJI" | "SELECT" | "MULTI_SELECT" | "TEXT" | "TEXT_AREA" | "TIMER" | "DATE_TIME" | "SWITCH" | "NUMBER" | "RATE" | "RADIO" | "RADIO_BUTTON" | "RADIO_INLINE" | "CHECK";
export type QuestionarioPerguntaRespostaTimer = { tipo: "DAYS_HOURS" | "DAYS" | "HOURS" };
export type QuestionarioPerguntaRespostaDateTime = { tipo: "DATE_TIME" | "DATE" | "TIME" };
export type QuestionarioPerguntaRespostaSearch = { entity: string };
export type QuestionarioPerguntaRespostaRange = {min: number, max: number};
export type QuestionarioPerguntaResposta = null | LookupItem[] | QuestionarioPerguntaRespostaRange | QuestionarioPerguntaRespostaTimer | QuestionarioPerguntaRespostaDateTime | QuestionarioPerguntaRespostaSearch;

export class QuestionarioPergunta extends Base {
    public questionario?: Questionario;
    public pergunta_origem?: QuestionarioPergunta;

    public codigo: string | null = null; //codigo da pergunta
    public sequencia: number = 0; //sequencia da pergunta
    public pergunta: string = ""; //pergunta
    public tipo: QuestionarioPerguntaTipo = "SELECT"; // tipo da resposta para esta pergunta
    public criado_versao: number = 0 ; //versao de criacao
    public deletado_versao: number | null = null; //versao em que for deletado
    public respostas: QuestionarioPerguntaResposta = null; // opções de respostas para essa pergunta
    public questionario_id: string | null = null;
    public origem_id: string | null = null;

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
SWITCH: LookupItem[] lookup.SIMNAO
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