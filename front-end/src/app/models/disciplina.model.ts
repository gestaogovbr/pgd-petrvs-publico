import { Base } from './base.model';
import { Curso } from './curso.model';
import { HistoricoDocenciaInterna } from './historico-docencia-interna.model';

export class Disciplina extends Base {
  public historicos_docencias_internas?: HistoricoDocenciaInterna[];

  public nome: string = ""; //Nome da disciplina
  public sigla: string = ""; //Sigla da disciplina
  public ativo: number = 1; //Disciplina está ativa ou não

  public constructor(data?: any) { super(); this.initialization(data); }
}