import { Base } from './base.model';
import { CapacidadeTecnica } from './capacidade-tecnica.model';

export class AreaTematica extends Base {

    public capacidades_tecnicas?: CapacidadeTecnica[];  // Lista de capacidades técnicas

    public nome: string = ""; //Nome da área de conhecimento
    public ativo: number = 1; //Area esta ativo ou não

    public constructor(data?: any) { super(); this.initialization(data); }
}
