import { Base } from './base.model';
export class PlanoEntrega extends Base {
    constructor(data) {
        super();
        this.entregas = []; // Entregas que compõem o plano de entregas
        this.status_historico = []; // Mudanças de status sofridas pelo plano de entregas (histórico)
        this.data_inicio = new Date(); // Data inicial do plano de entrega
        this.data_fim = null; // Data final do plano de entrega
        this.nome = ""; // Nome do plano de entrega
        this.metadados = undefined; // Campo virtual contendo informações calculadas pelo servidor
        this.arquivar = false; // Campo virtual utilizado pelos métodos arquivar/desarquivar/avaliar
        this.status = "INCLUIDO"; // Status atual do plano de entregas
        this.avaliacoes = [];
        this.unidade_id = '';
        this.avaliacao_id = null;
        this.plano_entrega_id = null;
        this.planejamento_id = null;
        this.cadeia_valor_id = null;
        this.programa_id = null;
        this.has_progresso = false;
        this.initialization(data);
    }
}
//# sourceMappingURL=plano-entrega.model.js.map