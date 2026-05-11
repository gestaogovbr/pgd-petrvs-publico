import { Base } from './base.model';
export class TipoJustificativa extends Base {
    constructor(data) {
        super();
        this.nome = ""; /* Descrição do tipo da justificativa */
        this.initialization(data);
    }
}
//# sourceMappingURL=tipo-justificativa.model.js.map