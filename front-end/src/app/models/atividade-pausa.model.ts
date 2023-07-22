import { Base } from './base.model';

export class AtividadePausa extends Base {
    public data_inicio: Date = new Date(); /* Data de inicio da pausa */
    public data_fim: Date | null = null; /* Data fim da pausa */

    public atividade_id: string = ""; /* ID da Atividade */

    public constructor(data?: any) { super(); this.initialization(data); }
}