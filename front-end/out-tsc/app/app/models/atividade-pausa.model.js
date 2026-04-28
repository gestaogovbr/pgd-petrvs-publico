import { Base } from './base.model';
export class AtividadePausa extends Base {
    constructor(data) {
        super();
        this.data_inicio = new Date(); /* Data de início da pausa */
        this.data_fim = null; /* Data final da pausa */
        this.atividade_id = ""; /* ID da Atividade */
        this.initialization(data);
    }
}
//# sourceMappingURL=atividade-pausa.model.js.map