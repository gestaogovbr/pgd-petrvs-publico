import { Base } from './base.model';

export class TipoMotivoAfastamento extends Base {
    public codigo: string | null = null; /* Código do afastamento */
    public nome: string = ""; /* Nome do motivo de afastamento */
    public icone: string = ""; /* Class do icone relacionado ao afastamento // class="fa fa-icone"  */
    public cor: string = ""; /* Código da cor em formato hex // style="color: #AABBCC00" */
    public horas: number = 0; /* Se o afastamento é medido em horas */
    public integracao: number = 0; /* Se o tipo de motivo de afastamento é integrado a outro sistema */
    //public data_inicio: Date = new Date(0); /* Data de início */
    //public data_fim: Date = new Date(0); /* Data fim */
        
    constructor(){
        super();
    }
}