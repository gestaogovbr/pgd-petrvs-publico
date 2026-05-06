import { Base } from './base.model';
export class IntegranteConsolidado extends Base {
    constructor(data) {
        super();
        this.id = ""; /* Utilizado somente para garantir o funcionamento do grid */
        this.atribuicoes = [];
        this.usuario_externo = false;
        this.initialization(data);
    }
}
;
export class UnidadeIntegrante extends Base {
    constructor(data) {
        super();
        this.atribuicoes = [];
        this.usuario_id = ""; /* Usuário vinculado */
        this.unidade_id = ""; /* Unidade Vinculada */
        this.initialization(data);
    }
}
//# sourceMappingURL=unidade-integrante.model.js.map