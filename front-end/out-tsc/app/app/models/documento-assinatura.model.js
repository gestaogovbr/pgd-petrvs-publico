import { Base } from './base.model';
export class DocumentoAssinatura extends Base {
    constructor(data) {
        super();
        this.data_assinatura = new Date(); /* Data e hora */
        this.assinatura = ""; /* Assinatura */
        this.documento_id = ""; /* Documento */
        this.usuario_id = ""; /* Usuario */
        this.initialization(data);
    }
}
//# sourceMappingURL=documento-assinatura.model.js.map