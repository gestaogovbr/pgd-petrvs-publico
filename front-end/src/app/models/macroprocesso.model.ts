import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';

export class Macroprocesso extends Base {
    public nome: string = ""; //Nome do macroprocesso;

    public constructor(data?: any) { super(); this.initialization(data); }
}
