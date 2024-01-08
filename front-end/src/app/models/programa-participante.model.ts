import { Base } from './base.model';
import { Programa } from './programa.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export class ProgramaParticipante extends Base {
    public usuario?: Usuario;
    public programa?: Programa;
    public unidade?: Unidade;

    public habilitado?: boolean = true; /* Se o participante está habilitado */

    public programa_id: string = ""; /* Programa */
    public usuario_id: string = ""; /* Usuario */

    public constructor(data?: any) { super(); this.initialization(data); }
}
