import { Base } from './base.model';

export class TipoMotivoAfastamento extends Base {
    public codigo: string | null = null; /* Código do afastamento */
    public nome: string = ""; /* Nome do motivo de afastamento */
    public sigla: string = ""; /* Sigla do afastamento */
    public icone: string = ""; /* Class do icone relacionado ao afastamento // class="fa fa-icone"  */
    public cor: string = ""; /* Código da cor em formato hex // style="color: #AABBCC00" */
    public horas: number = 0; /* Se o afastamento é medido em horas */
    public integracao: number = 0; /* Se o tipo de motivo de afastamento é integrado a outro sistema */
    public data_inicio: Date = new Date(); /* Início do afastamento  */
    public data_fim: Date = new Date(); /* Fim do afastamento */
    public situacao: string = "S"; /* Situação do afastamento */
    public calculo: string = ""; /* Tipo de cálculo do afastamento */

    public constructor(data?: any) { super(); this.initialization(data); }
}