import { Base } from './base.model';

export class TipoProjeto extends Base {
    public nome: string = ""; /* Descrição */
    public icone: string = ""; /* Classe do icone relacionado */
    public cor: string = ""; /* Código da cor em hex */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */
        
    constructor(){
        super();
    }
}


 