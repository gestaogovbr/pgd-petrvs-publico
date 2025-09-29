import { Base } from './base.model';
import { Usuario } from './usuario.model';
import { TipoMotivoAfastamento } from './tipo-motivo-afastamento.model';

export class Afastamento extends Base {
    public tipo_motivo_afastamento?: TipoMotivoAfastamento;
    public usuario?: Usuario;

    public observacoes: string | null = null; /* Observação sobre o afastamento */
    public data_inicio: Date = new Date(); /* Início do afastamento  */
    public data_fim: Date = new Date(); /* Fim do afastamento */
    public horas: number|null = null /*  */
    public usuario_id: string = "" /*  */
    public tipo_motivo_afastamento_id: string = ""; /*  */

    public constructor(data?: any) { super(); this.initialization(data); }
}
