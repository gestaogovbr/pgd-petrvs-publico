import { Base } from './base.model';

export class QuestionarioPergunta extends Base {
    public tipo: string = ""; //Tipo interno | personalizado
    public nome: string = ""; //Nome do questionário
    public codigo: string = ""; // Código do questionario
    public perguntas: string = ""; //Perguntas do questionário

    public constructor(data?: any) { super(); this.initialization(data); }
}