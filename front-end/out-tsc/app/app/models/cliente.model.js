import { Base } from "./base.model";
export class Cliente extends Base {
    constructor() {
        super(...arguments);
        this.nome = '';
        this.tipo_cliente_id = '';
        this.unidade_id = null;
    }
}
//# sourceMappingURL=cliente.model.js.map