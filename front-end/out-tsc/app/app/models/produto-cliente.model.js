import { Base } from "./base.model";
export class ProdutoCliente extends Base {
    constructor(data) {
        super();
        this.produto_id = ''; /* ID do produto */
        this.cliente_id = ''; /* ID do cliente */
        this.initialization(data);
    }
}
//# sourceMappingURL=produto-cliente.model.js.map