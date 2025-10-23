import { Base } from './base.model';

export class IndicadorEntrega extends Base {
    public totalObjetivos: number = 0;
    public totalProcessos: number = 0;
    public total: number = 0

    public constructor(data?: any) { super(); this.initialization(data); }
}