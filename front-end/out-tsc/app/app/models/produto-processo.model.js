import { Base } from "./base.model";
export class ProdutoProcesso extends Base {
    constructor(data) {
        super();
        this.cadeia_valor_processo_id = ''; /* ID do processo da cadeia de valor */
        this.produto_id = ''; /* ID do produto */
        this.initialization(data);
    }
}
//# sourceMappingURL=produto-processo.model.js.map