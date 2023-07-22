import { Base } from './base.model';

export class TipoProjeto extends Base {
    public nome: string = ""; /* Descrição */
    public icone: string = ""; /* Classe do icone relacionado */
    public cor: string = ""; /* Código da cor em hex */

    public constructor(data?: any) { super(); this.initialization(data); }
}


 