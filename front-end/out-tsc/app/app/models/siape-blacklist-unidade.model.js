import { Base } from './base.model';
export class SiapeBlacklistUnidade extends Base {
    constructor(data) {
        super();
        this.codigo = '';
        this.inativado = false;
        this.initialization(data);
    }
}
//# sourceMappingURL=siape-blacklist-unidade.model.js.map