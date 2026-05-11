import { Base } from './base.model';
export class Audit extends Base {
    constructor(data) {
        super();
        this.audit_id = 0; // ID do audit (chave primária)
        this.user_id = null; // ID do usuário que realizou a ação
        this.event = ""; // Tipo de evento (created, updated, deleted)
        this.auditable_type = ""; // Tipo do modelo auditado (classe)
        this.auditable_id = null; // ID do registro auditado
        this.old_values = {}; // Valores antigos (JSON)
        this.new_values = {}; // Novos valores (JSON)
        this.url = ""; // URL onde ocorreu a ação
        this.ip_address = ""; // Endereço IP do usuário
        this.user_agent = ""; // User Agent do navegador
        this.tags = []; // Tags opcionais
        this.created_at = new Date(); // Data de criação
        this.updated_at = new Date(); // Data de última atualização
        this.initialization(data);
    }
}
//# sourceMappingURL=audit.model.js.map