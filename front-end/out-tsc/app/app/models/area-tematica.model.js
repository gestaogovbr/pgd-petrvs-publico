import { Base } from './base.model';
export class AreaTematica extends Base {
    constructor(data) {
        super();
        this.nome = ""; //Nome da área de conhecimento
        this.ativo = 1; //Area esta ativo ou não
        this.initialization(data);
    }
}
//# sourceMappingURL=area-tematica.model.js.map