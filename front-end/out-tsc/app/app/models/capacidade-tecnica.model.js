import { Base } from './base.model';
export class CapacidadeTecnica extends Base {
    constructor(data) {
        super();
        this.nome = ""; //Nome da Capacidade Tecnica
        this.ativo = 1; //Capacidade Tecnica esta ativo ou não
        this.area_tematica_id = ""; //Área Tematica
        this.initialization(data);
    }
}
//# sourceMappingURL=capacidade-tecnica.model.js.map