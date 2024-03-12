import { Base } from './base.model';
import { Curso } from './curso.model';

export class Materia extends Base {

  public curso?: Curso;

  public nome: string = ""; //Nome da materia
  public horas_aula: number = 0; //Horas aula da materia
  public ativo: number = 1; //Materia esta ativo ou não
  public curso_id: string = "" // Curso

  public constructor(data?: any) { super(); this.initialization(data); }
}