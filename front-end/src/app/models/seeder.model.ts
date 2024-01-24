import { Base } from './base.model';

export class Seeder extends Base {

    public nome: string = ""; /* Nome do seeder */

    public constructor(data?: any) { super(); this.initialization(data); }

    [key: string]: any;
}