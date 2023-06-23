import { Base } from './base.model';

export class AreaTematica extends Base {
    public nome: string = ""; //Nome da área de conhecimento
    public ativo: number = 1; //Area esta ativo ou não

    public constructor(data?: any) { super(); this.initialization(data); }
}
