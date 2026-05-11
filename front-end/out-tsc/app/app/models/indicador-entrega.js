import { Base } from './base.model';
export class IndicadorEntrega extends Base {
    constructor(data) {
        super();
        this.entregas = [];
        this.avaliacoes = [];
        this.desempenho = { entregas: 0, trabalhos: 0 };
        this.initialization(data);
    }
}
//# sourceMappingURL=indicador-entrega.js.map