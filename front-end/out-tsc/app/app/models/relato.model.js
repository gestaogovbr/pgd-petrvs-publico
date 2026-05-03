import { Base } from './base.model';
export class Relato extends Base {
    constructor(data) {
        super();
        this.opcao = "";
        this.usuario_id = null;
        this.unidade_id = null;
        this.nome = "";
        this.cpf = "";
        this.matricula = "";
        this.descricao = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=relato.model.js.map