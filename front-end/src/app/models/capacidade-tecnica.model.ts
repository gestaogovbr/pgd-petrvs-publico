import { Base } from './base.model';
import { AreaTematica } from './area-tematica.model';

export class CapacidadeTecnica extends Base {
    
    public area_tematica?: AreaTematica;

    public nome: string = ""; //Nome da Capacidade Tecnica
    public ativo: number = 1; //Capacidade Tecnica esta ativo ou não
    public area_tematica_id: string = ""; //Área Tematica
    
    public constructor(data?: any) { super(); this.initialization(data); }
}

