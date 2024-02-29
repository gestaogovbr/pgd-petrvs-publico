import { AreaConhecimento } from './area-conhecimento.model';
import { Base } from './base.model';
import { CurriculumGraduacao } from './currriculum-graduacao.model';
import { CurriculumProfissional } from './currriculum-profissional.model';
import { Usuario } from './usuario.model';

export class Curriculum extends Base {

    public usuario?: Usuario;
    public graduacoes: CurriculumGraduacao[] = [];
    public profissional?: CurriculumProfissional;
    public area_conhecimento?: AreaConhecimento;

    public apresentacao: string = ""; //Apresentação do servidor
    public telefone: string = ""; // Telefone do servidor
    public idiomas: [] = [];// Idiomas falado pelo servidor
    public estado_civil :  string="";//
    public quantidade_filhos : number = 0;
    public ativo: number = 1; //Curriculum ativo ou não
    
    public usuario_id: string = ""; //ID do usuario 
    public cidade_id: string = ""; //ID da cidade
   // public curriculum_id? : string= ""; 
            
    public constructor(data?: any) { super(); this.initialization(data); }
}
