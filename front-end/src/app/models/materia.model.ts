import { Base } from './base.model';
import { AreaConhecimento } from './area-conhecimento.model';
import { Curso } from './curso.model';

export class Materia extends Base {
    
    public area?: AreaConhecimento;
    public curso?: Curso;

    public nome: string = ""; //Nome da materia
    public horas_aula: number = 0; //Horas aula da materia
    public ativo: number = 1; //Materia esta ativo ou não
    public area_material_id: string = ""; //Área do conhecimento
    public curso_material_id: string ="" // Curso
    
    public constructor(data?: any) { super(); this.initialization(data); }
}