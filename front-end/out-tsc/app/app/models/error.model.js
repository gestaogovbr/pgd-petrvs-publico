import { Base } from './base.model';
export class Error extends Base {
    constructor() {
        super();
        this.user = []; //Dados do Usuário que criou o registro
        this.date_time = ""; //Data e Hora que o registro foi criado
        this.message = ""; //Mensagem da ocorrência
        this.data = ""; //Dados da ocorrência
        this.trace = ""; //Trace da ocorrência
        this.type = "ERROR"; //Tipo da ocorrência ['ERROR', 'WARNING', 'FRONT-WARNING', 'FRONT-ERROR']
    }
}
//# sourceMappingURL=error.model.js.map