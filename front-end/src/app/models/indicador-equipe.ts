import { Base } from './base.model';

export class IndicadorEquipe extends Base {
    public categoria: number = 0;
    public total: number = 0

    public constructor(data?: any) { super(); this.initialization(data); }
}