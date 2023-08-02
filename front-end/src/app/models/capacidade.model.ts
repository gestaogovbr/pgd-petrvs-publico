import { Base } from './base.model';
import { Perfil } from './perfil.model';
import { TipoCapacidade } from './tipo-capacidade.model';

export class Capacidade extends Base {
    public perfil?: Perfil;
    public tipo_capacidade?: TipoCapacidade;

    public perfil_id: string | null = null; /* ID do Perfil */
    public tipo_capacidade_id: string = ""; /* ID do Tipo_capacidade  */

    public constructor(data?: any) { super(); this.initialization(data); }
}
