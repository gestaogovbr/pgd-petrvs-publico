import { Base } from './base.model';
export class SiapeBlacklistServidor extends Base {
    constructor(data) {
        super();
        this.cpf = "";
        this.inativado = false;
        this.matricula = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=siape-blacklist-servidor.model.js.map