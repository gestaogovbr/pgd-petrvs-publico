import { Base } from './base.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export class Lotacao extends Base {
    public unidade?: Unidade;
    public usuario?: Usuario;

    public principal: boolean = false; /* Se é a lotação principal */
    public usuario_id: string = ""; /* Usuário vinculado */
    public unidade_id: string = ""; /* Unidade Vinculada */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */

    constructor(){
        super();
    }
}
