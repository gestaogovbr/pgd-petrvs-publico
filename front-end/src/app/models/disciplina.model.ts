import { Base } from './base.model';
import { Curso } from './curso.model';

export class Disciplina extends Base {

  public nome: string = ""; //Nome da disciplina
  public sigla: string = ""; //Sigla da disciplina
  public ativo: number = 1; //Disciplina está ativa ou não

  public constructor(data?: any) { super(); this.initialization(data); }
}