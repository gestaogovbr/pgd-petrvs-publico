import { Base } from './base.model';
import { Usuario } from './usuario.model';
import { TipoMotivoAfastamento } from './tipo-motivo-afastamento.model';

export class Afastamento extends Base {
    public tipo_motivo_afastamento?: TipoMotivoAfastamento;
    public usuario?: Usuario;

    public observacoes: string | null = null; /* Observação sobre o afastamento */
    public inicio_afastamento: Date = new Date(); /* Inicio do afastamento  */
    public fim_afastamento: Date = new Date(); /* Fim do afastamento */
    public usuario_id: string = "" /*  */
    public tipo_motivo_afastamento_id: string = ""; /*  */

    public constructor(data?: any) { super(); this.initialization(data); }
}
