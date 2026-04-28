import { Base } from './base.model';
export class RelatorioPlanoEntrega extends Base {
    constructor(data) {
        super();
        this.id = "";
        this.numero = "";
        this.status = ""; // Status atual do plano de entrega
        this.dataInicio = ""; // Data de início do plano de entrega formatada
        this.dataFim = ""; // Data de fim do plano de entrega formatada
        this.entregaNome = ""; // Nome da entrega
        this.unidadeHierarquia = "";
        this.unidadeSigla = ""; // Nome da unidade do participante
        this.initialization(data);
    }
}
//# sourceMappingURL=relatorio-plano-entrega.model.js.map