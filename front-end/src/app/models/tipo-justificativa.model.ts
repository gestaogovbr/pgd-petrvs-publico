import { Base } from './base.model';

export class TipoJustificativa extends Base {
    public nome: string = ""; /* Descrição do tipo da justificativa */

    public constructor(data?: any) { super(); this.initialization(data); }
}