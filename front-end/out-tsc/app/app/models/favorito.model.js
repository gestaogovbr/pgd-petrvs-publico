import { Base } from './base.model';
export class Favorito extends Base {
    constructor(data) {
        super();
        this.config = [];
        this.usuario_id = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=favorito.model.js.map