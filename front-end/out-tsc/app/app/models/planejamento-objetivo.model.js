import { Base } from './base.model';
export class PlanejamentoObjetivo extends Base {
    constructor(data) {
        super();
        this.nome = ""; /* Nome do objetivo */
        this.fundamentacao = ""; /* Fundamentação para a definição do objetivo */
        this.sequencia = 0;
        this.path = null;
        this.integra_okr = true;
        this.planejamento_id = null;
        this.eixo_tematico_id = null;
        this.objetivo_pai_id = null;
        this.objetivo_superior_id = null;
        this.initialization(data);
    }
}
//# sourceMappingURL=planejamento-objetivo.model.js.map