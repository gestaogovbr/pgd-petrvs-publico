import { Base } from './base.model';
export class Envio extends Base {
    constructor() {
        super();
        this.numero = "";
        this.finished_at = "";
        this.sucesso = false;
        this.erros = "";
        this.qtde_participantes_sucessos = 0;
        this.qtde_participantes_falhas = 0;
        this.qtde_entregas_sucessos = 0;
        this.qtde_entregas_falhas = 0;
        this.qtde_trabalhos_sucessos = 0;
        this.qtde_trabalhos_falhas = 0;
    }
}
//# sourceMappingURL=envio.model.js.map