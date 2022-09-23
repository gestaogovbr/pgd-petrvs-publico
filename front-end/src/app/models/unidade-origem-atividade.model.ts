import { Base } from './base.model';
import { Unidade } from './unidade.model';

export class UnidadeOrigemAtividade extends Base {
    public unidade_origem_atividade?: Unidade;

    public unidade_id: string = ""; /* ID da unidade pai */
    public unidade_origem_atividade_id: string = ""; /* ID da unidade que será utilizada como origem de atividades  */

    public constructor(data?: any) { super(); this.initialization(data); }
}
