import { Base } from './base.model';
import { AreaConhecimento } from './area-conhecimento.model';
import { TipoCurso } from './tipo-curso.model';
import { CurriculumGraduacao } from './currriculum-graduacao.model';
import { HistoricoCursoInternoCurriculum } from './historico-curso-interno-currriculum.model';
import { HistoricoDocenciaInternaCurriculum } from './historico-docencia-interna-currriculum.model';
import { HistoricoDocenciaExternaCurriculum } from './historico-docencia-externa-currriculum.model';
import { Materia } from './materia.model';

export class Curso extends Base {
    
    public area_conhecimento?: AreaConhecimento;
    public tipo_curso?: TipoCurso;
    public materias?: Materia[];   
    public curriculuns_graduacoes?: CurriculumGraduacao[];    
    public historicos_cursos_internos?: HistoricoCursoInternoCurriculum[];
    public historicos_docencias_internas?: HistoricoDocenciaInternaCurriculum[];
    public historicos_docencias_externas?: HistoricoDocenciaExternaCurriculum[];    

    public nome: string = ""; //Nome do curso
    public titulo: string = ""; //Graduação, pós, mestrado, doc ou posdoc
    public ativo: number = 1; //Curso esta ativo ou não
    public tipo_curso_id: string = "";  // Tipo de curso
    public area_id: string = ""; // Área do conhecimento
    
    public constructor(data?: any) { super(); this.initialization(data); }
}

