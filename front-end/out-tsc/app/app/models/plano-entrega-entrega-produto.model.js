import { Base } from './base.model';
export class PlanoEntregaEntregaProduto extends Base {
    constructor(data) {
        super();
        this.produto_id = '';
        this.entrega_id = '';
        this.initialization(data);
    }
}
//# sourceMappingURL=plano-entrega-entrega-produto.model.js.map