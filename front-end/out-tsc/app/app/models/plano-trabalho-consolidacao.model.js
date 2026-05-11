import { Base } from './base.model';
export class PlanoTrabalhoConsolidacao extends Base {
    constructor(data) {
        super();
        this.data_inicio = new Date();
        this.data_fim = new Date();
        this.status = "INCLUIDO"; // Status atual da consolidação
        this.avaliacoes = [];
        this.atividades = [];
        this.status_historico = [];
        this.plano_trabalho_id = "";
        this.avaliacao_id = null;
        this.justificativa_conclusao = null;
        this.initialization(data);
    }
}
//# sourceMappingURL=plano-trabalho-consolidacao.model.js.map