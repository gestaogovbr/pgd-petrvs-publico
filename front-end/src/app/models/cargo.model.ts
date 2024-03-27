import { Base } from './base.model';
import { CurriculumProfissional } from './curriculum-profissional.model';

export class Cargo extends Base {
  public curriculuns_profissionais?: CurriculumProfissional[];

  public nome: string = ""; //Nome do Cargo
  public nivel: string | null = null; //Nivel do Cargo
  public descricao: string | null = null; //Descricao do Cargo
  public siape: string | null = null; //Códido SIAPE do Cargo
  public cbo: string | null = null; //Código CBO do Cargo
  public efetivo: number = 1; //Cargo efetivo ou comissionado
  public ativo: number = 1; //Cargo esta ativo ou não

  public constructor(data?: any) { super(); this.initialization(data); }
}

