import { Base } from './base.model';
export class EixoTematico extends Base {
    constructor(data) {
        super();
        this.nome = ""; //Nome do eixo temático;
        this.icone = ""; /* Classe do icone relacionado ao eixo temático */
        this.cor = ""; /* Código da cor em hex */
        this.descricao = ""; /* Descrição do eixo temático */
        this.initialization(data);
    }
}
//# sourceMappingURL=eixo-tematico.model.js.map