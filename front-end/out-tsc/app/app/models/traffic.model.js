import { Base } from './base.model';
export class Traffic extends Base {
    constructor() {
        super();
        this.user_id = ""; //ID do Usuário que criou o registro
        this.date_time = ""; //Data e Hora que o registro foi criado
        this.url = ""; //URL solicitada na requisição
        this.request = ""; //Dados da requisição
        this.response = ""; //Dados da resposta
    }
}
//# sourceMappingURL=traffic.model.js.map