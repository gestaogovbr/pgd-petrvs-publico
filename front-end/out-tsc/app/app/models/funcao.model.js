import { Base } from './base.model';
export class Funcao extends Base {
    constructor(data) {
        super();
        this.nome = ""; //Nome da funcao
        this.nivel = ""; //Nível da funcao
        this.descricao = ""; //Descrição da funcao
        this.siape = ""; //Código SIAPE da funcao
        this.cbo = ""; //Código CBO da funcao
        this.ativo = 1; //Funcao esta ativo ou não
        this.initialization(data);
    }
}
//# sourceMappingURL=funcao.model.js.map