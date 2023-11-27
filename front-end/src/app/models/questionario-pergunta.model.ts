import { ExpressionStatement } from '@angular/compiler';
import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';



export class QuestionarioPergunta extends Base {
    public sequencia: number | undefined ; //sequencia da pergunta
    public pergunta: string = ""; //pergunta
    public tipo: string = ""; // tipo da resposta para esta pergunta
    public criado_versao: number | undefined; //versao de criacao
    public deletado_versao: number | undefined; //versao em que for deletado
    public deletedat: Date | undefined; // data caso seja deletado
    public respostas: [] = []; // opções de respostas para essa pergunta


    public constructor(data?: any) { super(); this.initialization(data); }
}

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