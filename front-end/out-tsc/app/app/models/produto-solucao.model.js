import { Base } from "./base.model";
export class ProdutoSolucao extends Base {
    constructor(data) {
        super();
        this.produto_id = ''; /* ID do produto */
        this.solucao_id = ''; /* ID da solucao */
        this.initialization(data);
    }
}
//# sourceMappingURL=produto-solucao.model.js.map