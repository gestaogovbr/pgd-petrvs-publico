import { Base } from './base.model';

export class TipoAtividade extends Base {
    public nome: string ="";     //Descrição do tipo/categoria da atividade
    public icone: string = "";      //Classe do icone
    public cor: string ="";      //Código da cor em hex
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */

    public constructor(data?: any) { super(); this.initialization(data); }
}


 