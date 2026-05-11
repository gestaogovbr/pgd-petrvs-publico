import { Base } from "./base.model";
export class ProdutoInsumo extends Base {
    static { this.ORIGEM_INTERNA = 'interno'; }
    static { this.ORIGEM_EXTERNA = 'externo'; }
    constructor(data) {
        super();
        this.origem = null;
        this.produto_id = ''; /* ID do produto base */
        this.unidade_id = '';
        this.produto_insumo_id = ''; /* ID do produto relacionado */
        this.cliente_id = '';
        this.descricao = '';
        this.initialization(data);
    }
}
//# sourceMappingURL=produto-insumo.model.js.map