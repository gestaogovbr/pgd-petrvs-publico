import { Base } from './base.model';
export class TipoCapacidade extends Base {
    constructor(data) {
        super();
        this.descricao = ""; /* Descrição da capacidade (acesso) */
        this.codigo = ""; /* Código da rotina no sistema (acesso) */
        this.grupo_id = null; /*Define o módulo */
        this.filhos = [];
        this.initialization(data);
    }
}
//# sourceMappingURL=tipo-capacidade.model.js.map