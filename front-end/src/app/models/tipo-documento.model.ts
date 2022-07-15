import { Base } from './base.model';

export class TipoDocumento extends Base {
    public nome: string = ""; /* Descrição do tipo de documento */
    public codigo: string | null = null; /* Codigo do tipo de documento */
    public entregavel: number = 0; /* Se o documento é entregável ou não */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */
        
    constructor(){
        super();
    }
}