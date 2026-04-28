import { Base } from './base.model';
export class NotificacaoDestinatario extends Base {
    constructor(data) {
        super();
        this.tipo = "PETRVS"; // Tipo de envio da mensagem
        this.data_leitura = null; // Data e hora da leitura
        this.data_envio = null; // Data e hora do envio
        this.opcoes = {}; // Opções
        this.notificacao_id = "";
        this.usuario_id = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=notificacao-destinatario.model.js.map