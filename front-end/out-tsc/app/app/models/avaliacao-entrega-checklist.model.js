import { Base } from './base.model';
export class AvaliacaoEntregaChecklist extends Base {
    constructor(data) {
        super();
        this.checklist = [];
        this.avaliacao_id = ""; /* ID do avaliador */
        this.plano_trabalho_entrega_id = null; /* ID da entrega do plano de trabalho */
        this.plano_entrega_entrega_id = null; /* ID da entrega do plano de entrega */
        this.initialization(data);
    }
}
//# sourceMappingURL=avaliacao-entrega-checklist.model.js.map