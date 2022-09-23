import { Base } from './base.model';
import { TipoCapacidade } from './tipo-capacidade.model';

export class Capacidade extends Base {
    public tipo_capacidade?: TipoCapacidade;

    public perfil_id: string | null = null; /* ID do Perfil */
    public tipo_capacidade_id: string = ""; /* ID do Tipo_capacidade  */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */

    public constructor(data?: any) { super(); this.initialization(data); }
}
