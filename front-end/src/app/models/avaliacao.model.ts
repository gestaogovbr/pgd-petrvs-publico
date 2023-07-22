import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { TipoAvaliacao } from './tipo-avaliacao.model';
import { Usuario } from './usuario.model';

export class Avaliacao extends Base {
    public usuario?: Usuario;
    public tipo_avaliacao?: TipoAvaliacao;

    public nota: number = 0; /* Nota atribuida */
    public justificativas: LookupItem[] = []; /* Justificativas */

    public usuario_id: string = ""; /* ID do Usuario */
    public tipo_avaliacao_id: string = ""; /* ID do Usuario */

    public constructor(data?: any) { super(); this.initialization(data); }
}