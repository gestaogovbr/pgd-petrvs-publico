import { Base } from './base.model';

export type TipoAvaliacaoTipo = 'QUALITATIVO' | 'QUANTITATIVO';
export type TipoAvaliacaoNota = {
    nota: any;
    aprova?: boolean;
    pergunta?: string;
    icone?: string;
    cor?: string
};

export class TipoAvaliacao extends Base {
    public tipo: TipoAvaliacaoTipo = 'QUANTITATIVO'; /* Se a nota será um número ou um conceito */
    public nome: string = ""; /* Nome do tipo de avaliação */
    public notas: TipoAvaliacaoNota[] = []; /* Notas */

    public constructor(data?: any) { super(); this.initialization(data); }
}


 