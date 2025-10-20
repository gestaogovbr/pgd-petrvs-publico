import { Base } from './base.model';

export class IndicadorEquipe extends Base {
    public nota: string = "";
    public quantidade: number = 0

    public constructor(data?: any) { super(); this.initialization(data); }
}