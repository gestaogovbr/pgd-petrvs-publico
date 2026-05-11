import { Base } from './base.model';
export class TipoDocumento extends Base {
    constructor(data) {
        super();
        this.nome = ""; /* Descrição do tipo de documento */
        this.codigo = null; /* Codigo do tipo de documento */
        this.entregavel = 0; /* Se o documento é entregável ou não */
        this.initialization(data);
    }
}
//# sourceMappingURL=tipo-documento.model.js.map