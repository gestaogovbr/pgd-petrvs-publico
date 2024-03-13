import { Base } from './base.model';
import { AreaConhecimento } from './area-conhecimento.model';
import { TipoCurso } from './tipo-curso.model';
import { Materia } from './materia.model';
import { CurriculumGraduacao } from './curriculum-graduacao.model';
import { HistoricoCursoInterno } from './historico-curso-interno.model';
import { HistoricoDocenciaInterna } from './historico-docencia-interna.model';
import { HistoricoDocenciaExterna } from './historico-docencia-externa.model';

export class Curso extends Base {

  public area_conhecimento?: AreaConhecimento;
  public tipo_curso?: TipoCurso;
  public materias?: Materia[];
  public curriculuns_graduacoes?: CurriculumGraduacao[];
  public historicos_cursos_internos?: HistoricoCursoInterno[];
  public historicos_docencias_internas?: HistoricoDocenciaInterna[];
  public historicos_docencias_externas?: HistoricoDocenciaExterna[];

  public nome: string = ""; //Nome do curso
  public titulo: string = ""; //Graduação, pós, mestrado, doc ou posdoc
  public ativo: number = 1; //Curso esta ativo ou não
  public tipo_curso_id: string = "";  // Tipo de curso
  public area_id: string = ""; // Área do conhecimento

  public constructor(data?: any) { super(); this.initialization(data); }
}

