import { Base } from './base.model';
export class StatusJustificativa extends Base {
    constructor(data) {
        super();
        this.codigo = ""; /* Código do status */
        this.justificativa = ""; /* Justificativa da mudança para o status atual */
        this.initialization(data);
    }
}
//# sourceMappingURL=status-justificativa.model.js.map