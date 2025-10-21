import { Base } from './base.model';

export class IndicadorGestao extends Base {
    public nome: string = "";
    public quantidade: number = 0

    public constructor(data?: any) { super(); this.initialization(data); }
}