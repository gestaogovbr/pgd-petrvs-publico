import { Base } from './base.model';
export class Ocorrencia extends Base {
    constructor(data) {
        super();
        this.data_inicio = new Date();
        this.data_fim = new Date();
        this.descricao = "";
        this.usuario_id = "";
        this.plano_trabalho_id = null;
        this.initialization(data);
    }
}
//# sourceMappingURL=ocorrencia.model.js.map