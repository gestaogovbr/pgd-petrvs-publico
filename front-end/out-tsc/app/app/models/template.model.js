import { Base } from './base.model';
export class Template extends Base {
    constructor(data) {
        super();
        this.codigo = null;
        this.numero = 0;
        this.especie = "OUTRO";
        this.titulo = "";
        this.conteudo = "";
        this.dataset = [];
        this.entidade_id = null;
        this.unidade_id = null;
        this.initialization(data);
    }
}
//# sourceMappingURL=template.model.js.map