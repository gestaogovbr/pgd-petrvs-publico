import { Base } from './base.model';
import { Unidade } from './unidade.model';

export class Programa extends Base {
    public unidade?: Unidade;

    public nome: string = ""; /* Nome do programa */
    public normativa: string = ""; /* Normativa que regula o programa */
    public config: string | null = null; /* Configuração extra de programa */
    public unidade_id: string = ""; /* Unidade vinculada ao programa */
    public data_inicio_vigencia: Date = new Date(); /* Data de início vigencia */
    public data_fim_vigencia: Date = new Date(); /* Data de fim vigencia */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */

    public constructor(data?: any) { super(); this.initialization(data); }
}
