import { Base } from './base.model';

export class AreaConhecimento extends Base {
    public nome_area: string = ""; //Nome da área de conhecimento
    public ativo: number = 1; //Area esta ativo ou não

    public constructor(data?: any) { super(); this.initialization(data); }
}
