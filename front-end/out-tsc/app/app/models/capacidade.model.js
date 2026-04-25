import { Base } from './base.model';
export class Capacidade extends Base {
    constructor(data) {
        super();
        this.perfil_id = null; /* ID do Perfil */
        this.tipo_capacidade_id = ""; /* ID do Tipo_capacidade  */
        this.initialization(data);
    }
}
//# sourceMappingURL=capacidade.model.js.map