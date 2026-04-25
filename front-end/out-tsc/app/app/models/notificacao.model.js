import { Base } from './base.model';
export class NotificacoesConfig {
    constructor() {
        this.enviar_petrvs = true;
        this.enviar_email = true;
        this.enviar_whatsapp = true;
        this.nao_notificar = [];
    }
}
export class Notificacao extends Base {
    constructor(data) {
        super();
        this.codigo = "UNKNOW"; // Código da mensagem;
        this.data_registro = new Date(); // Data e hora da inclusão da mensgaem
        this.mensagem = ""; // Mensagem
        this.numero = 0; // Número da mensagem (Gerado pelo sistema)
        this.remetente_id = null;
        this.destinatarios = [];
        this.initialization(data);
    }
}
//# sourceMappingURL=notificacao.model.js.map