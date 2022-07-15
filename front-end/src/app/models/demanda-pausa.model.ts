import { Base } from './base.model';

export class DemandaPausa extends Base {
    public data_inicio: Date = new Date(); /* Data de inicio da pausa */
    public data_fim: Date | null = null; /* Data fim da pausa */

    public demanda_id: string = ""; /* ID da Demanda */

    constructor(){
        super();
    }
}