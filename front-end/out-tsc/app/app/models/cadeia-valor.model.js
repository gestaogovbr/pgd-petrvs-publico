import { Base } from './base.model';
export class CadeiaValor extends Base {
    constructor(data) {
        super();
        this.processos = [];
        this.data_inicio = new Date(); /* Data de início do planejamento */
        this.data_fim = null; /* Data do fim do planejamento */
        this.data_arquivamento = null; /* Data de arquivamento */
        this.nome = ""; /* Nome do plano de gestão/entregas */
        this.unidade_id = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.entidade_id = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.initialization(data);
    }
}
//# sourceMappingURL=cadeia-valor.model.js.map