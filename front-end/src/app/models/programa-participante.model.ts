import { Base } from './base.model';
import { Programa } from './programa.model';
import { Usuario } from './usuario.model';

export class ProgramaParticipante extends Base {
    public usuario?: Usuario;
    public programa?: Programa;

    public habilitado: boolean = true; /* Se o participante está habilitado */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */
    public programa_id: string = ""; /* Programa */
    public usuario_id: string = ""; /* Usuario */

    public constructor(data?: any) { super(); this.initialization(data); }
}
