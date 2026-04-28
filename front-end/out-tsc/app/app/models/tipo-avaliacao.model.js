import { Base } from './base.model';
export class TipoAvaliacao extends Base {
    constructor(data) {
        super();
        this.notas = []; /* Notas */
        this.tipo = 'QUANTITATIVO'; /* Se a nota será um número ou um conceito */
        this.nome = ""; /* Nome do tipo de avaliação */
        this.initialization(data);
    }
}
//# sourceMappingURL=tipo-avaliacao.model.js.map