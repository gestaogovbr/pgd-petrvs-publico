import { Base } from './base.model';
import { QuestionarioPergunta } from './questionario-pergunta.model';

export type QuestionarioTipo = "INTERNO" | "PERSONALIZADO" | "ANONIMO";

export class Questionario extends Base {
  public perguntas: QuestionarioPergunta[] = [];

  public tipo: QuestionarioTipo = "INTERNO"; //Tipo interno | personalizado
  public nome: string = ""; //Nome do questionário
  public codigo: string = ""; // Código do questionario
  public versao: number | undefined = 0; //Perguntas do questionário

  public constructor(data?: any) { super(); this.initialization(data); }
}
