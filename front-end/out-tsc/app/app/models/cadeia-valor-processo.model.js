import { Base } from './base.model';
export class CadeiaValorProcesso extends Base {
    find(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor(data) {
        super();
        this.children = [];
        this.path = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.nome = ""; /* Nome do plano de gestão/entregas */
        this.sequencia = 0; /* Nome do plano de gestão/entregas */
        this.sequencia_completa = '';
        this.cadeia_valor_id = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.processo_pai_id = null; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.initialization(data);
    }
}
//# sourceMappingURL=cadeia-valor-processo.model.js.map