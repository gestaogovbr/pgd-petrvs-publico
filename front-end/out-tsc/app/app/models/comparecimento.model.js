import { Base } from './base.model';
export class Comparecimento extends Base {
    constructor(data) {
        super();
        this.data_comparecimento = new Date();
        this.detalhamento = "";
        this.plano_trabalho_consolidacao_id = "";
        this.unidade_id = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=comparecimento.model.js.map