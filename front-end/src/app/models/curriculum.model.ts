import { Base } from './base.model';
import { Cidade } from './cidade.model';
import { CurriculumGraduacao } from './curriculum-graduacao.model';
import { CurriculumProfissional } from './curriculum-profissional.model';
import { Usuario } from './usuario.model';

export class Curriculum extends Base {

  public usuario?: Usuario;
  public cidade?: Cidade;
  public graduacoes: CurriculumGraduacao[] = [];
  public curriculum_profissional?: CurriculumProfissional;

  public apresentacao: string = ""; //Apresentação do servidor
  public telefone: string = ""; // Telefone do servidor
  public idiomas: [] = [];// Idiomas falado pelo servidor
  public estado_civil: string = "";//
  public quantidade_filhos: number = 0;
  public ativo: number = 1; //Curriculum ativo ou não
  public usuario_id: string = ""; //ID do usuario 
  public cidade_id: string = ""; //ID da cidade

  public constructor(data?: any) { super(); this.initialization(data); }
}
