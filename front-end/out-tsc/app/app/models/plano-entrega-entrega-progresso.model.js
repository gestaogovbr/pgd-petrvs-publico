import { Base } from './base.model';
export class PlanoEntregaEntregaProgresso extends Base {
    constructor(data) {
        super();
        this.data_inicio = new Date();
        this.data_fim = null;
        this.data_progresso = null;
        this.homologado = false;
        this.meta = {};
        this.realizado = {};
        this.progresso_esperado = 100;
        this.progresso_realizado = 0;
        this.plano_entrega_entrega_id = '';
        this.usuario_id = '';
        this.initialization(data);
    }
}
//# sourceMappingURL=plano-entrega-entrega-progresso.model.js.map