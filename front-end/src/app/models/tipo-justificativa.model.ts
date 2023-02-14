import { Base } from './base.model';

export class TipoJustificativa extends Base {
    public nome: string = ""; /* Descrição do tipo da justificativa */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */

    public constructor(data?: any) { super(); this.initialization(data); }
}