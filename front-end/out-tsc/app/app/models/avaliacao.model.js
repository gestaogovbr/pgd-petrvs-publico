import { Base } from './base.model';
;
export class Avaliacao extends Base {
    constructor(data) {
        super();
        this.data_avaliacao = new Date(); /* Data e hora da avaliação */
        this.nota = 0; /* Nota atribuida */
        this.justificativa = null; /* Justificativa da nota atribuida */
        this.recurso = null; /* Recurso */
        this.justificativas = []; /* Justificativas */
        this.entregas_checklist = []; /* Checklist das entregas */
        this.avaliador_id = ""; /* ID do avaliador */
        this.plano_trabalho_consolidacao_id = null; /* ID do Usuario */
        this.plano_entrega_id = null; /* ID do Plano de Entrega */
        this.tipo_avaliacao_id = ""; /* ID do Tipo de Avaliacao */
        this.tipo_avaliacao_nota_id = ""; /* ID do Tipo de Avaliacao Nota*/
        this.initialization(data);
    }
}
//# sourceMappingURL=avaliacao.model.js.map