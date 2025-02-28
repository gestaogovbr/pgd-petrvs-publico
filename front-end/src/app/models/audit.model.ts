import { Base } from './base.model';

export class Audit extends Base {
    public audit_id: number = 0; // ID do audit (chave primária)
    public user_id: number | null = null; // ID do usuário que realizou a ação
    public event: string = ""; // Tipo de evento (created, updated, deleted)
    public auditable_type: string = ""; // Tipo do modelo auditado (classe)
    public auditable_id: number | null = null; // ID do registro auditado
    public old_values: any = {}; // Valores antigos (JSON)
    public new_values: any = {}; // Novos valores (JSON)
    public url: string = ""; // URL onde ocorreu a ação
    public ip_address: string = ""; // Endereço IP do usuário
    public user_agent: string = ""; // User Agent do navegador
    public tags: string[] = []; // Tags opcionais
    public created_at: Date = new Date(); // Data de criação
    public updated_at: Date = new Date(); // Data de última atualização

    public constructor(data?: any) {
        super();
        this.initialization(data);
    }

    [key: string]: any;
}
