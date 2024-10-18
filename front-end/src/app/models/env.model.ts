import { Base } from './base.model';

export class Env extends Base {
    public name: string = "";
    public value: string = "";
    public parameters: any;
    public constructor(data?: any) { super(); this.initialization(data); }

    [key: string]: any;
}