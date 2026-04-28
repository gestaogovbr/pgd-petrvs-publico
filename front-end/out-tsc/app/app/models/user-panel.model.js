import { Base } from './base.model';
export class UserPanel extends Base {
    constructor(data) {
        super();
        this.email = "";
        this.nome = "";
        this.cpf = "";
        this.nivel = 1;
        this.password = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=user-panel.model.js.map