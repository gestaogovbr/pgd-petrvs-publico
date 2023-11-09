import { Base } from './base.model';

export type QuestionarioPerguntaTipo = "LISTA" | "SWITCH" | "...";

export type QuestionarioPergunta = {
    id: string,
    pergunta: string,
    tipo: QuestionarioPerguntaTipo,
}

export class Questionario extends Base {
    public tipo: string = ""; //Tipo interno | personalizado
    public nome: string = ""; //Nome do questionário
    public codigo: string = ""; // Código do questionario
    public perguntas: QuestionarioPergunta[] = []; //Perguntas do questionário

    public constructor(data?: any) { super(); this.initialization(data); }
}