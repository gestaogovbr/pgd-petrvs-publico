import { Base } from './base.model';
import { TipoAvaliacaoNota } from './tipo-avaliacao-nota';

export type TipoAvaliacaoTipo = 'QUALITATIVO' | 'QUANTITATIVO';

export class TipoAvaliacao extends Base {
    public notas: TipoAvaliacaoNota[] = []; /* Notas */

    public tipo: TipoAvaliacaoTipo = 'QUANTITATIVO'; /* Se a nota será um número ou um conceito */
    public nome: string = ""; /* Nome do tipo de avaliação */

    public constructor(data?: any) { super(); this.initialization(data); }
}


 