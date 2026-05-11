import { Base } from './base.model';
export class SolucaoUnidade extends Base {
    constructor(data) {
        super();
        this.id_unidade = "";
        this.id_solucao = "";
        this.status = true;
        this.initialization(data);
    }
}
//# sourceMappingURL=solucao-unidade.model.js.map