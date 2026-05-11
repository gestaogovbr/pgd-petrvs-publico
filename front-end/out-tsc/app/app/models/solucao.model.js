import { Base } from './base.model';
export class Solucao extends Base {
    constructor(data) {
        super();
        this.identificador = 0;
        this.nome = "";
        this.sigla = "";
        this.descricao = "";
        this.url = "";
        this.solucoes_unidades = [];
        this.produtos_solucoes = [];
        this.initialization(data);
    }
}
//# sourceMappingURL=solucao.model.js.map