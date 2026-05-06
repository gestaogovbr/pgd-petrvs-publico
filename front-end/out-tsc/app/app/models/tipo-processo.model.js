import { Base } from './base.model';
export class TipoProcesso extends Base {
    constructor(data) {
        super();
        this.nome = ""; /* Descrição do tipo de processo */
        this.codigo = ""; /* Codigo do tipo de processo */
        this.etiquetas = []; /* Etiquetas */
        this.checklist = []; /* Checklist */
        this.initialization(data);
    }
}
//# sourceMappingURL=tipo-processo.model.js.map