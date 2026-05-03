import { Base } from './base.model';
export class PlanoTrabalhoEntrega extends Base {
    constructor(data) {
        super();
        this.descricao = "";
        this.orgao = null;
        this.forca_trabalho = 1;
        this.plano_trabalho_id = "";
        this.plano_entrega_entrega_id = null;
        this.reacoes = []; /* Reações da entrega do plano de trabalho */
        this.initialization(data);
    }
}
//# sourceMappingURL=plano-trabalho-entrega.model.js.map