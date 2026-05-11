import { Base } from './base.model';
export class IndicadorGestao extends Base {
    constructor(data) {
        super();
        this.usuarios = { totalParticipantes: 0, total: 0 };
        this.unidades = { possui_PE: 0, total: 0 };
        this.initialization(data);
    }
}
//# sourceMappingURL=indicador-gestao.js.map