import { Base } from './base.model';

export class Tenant extends Base {

    public tenancy_db_name: string = ""; /* Nome do banco de dados */
    public tenancy_db_host: string | null = null; /* Endereço do banco de dados */
    public tenancy_db_port: string | null = null; /* Porta do banco de dados */
    public tenancy_db_username: string | null = null; /* Nome do usuário */
    public tenancy_db_password: string | null = null; /* Senha do usuário */
    public log_traffic: boolean = false;
    public log_changes: boolean = false;
    public log_errors: boolean = false;
    public log_host: string | null = null;
    public log_database: string | null = null;
    public log_port: string | null = null;
    public log_username: string | null = null;
    public log_password: string | null = null;
    public notification_petrvs: boolean = true;
    public notification_mail: boolean = false;
    public notification_mail_signature: string = "";
    public notification_mail_host: string = "";
    public notification_mail_port: number = 465;
    public notification_mail_username: string = "";
    public notification_mail_password: string = "";
    public notification_mail_encryption: string = "SSL";
    public notification_whatsapp: boolean = false;
    public notification_whatsapp_url: string = "";
    public notification_whatsapp_token: string = "";
    public email: string = "";
    public nome_usuario: string = "";
    public cpf: string = "";
    public apelido: string = "";
    public sigla: string = "";
    public nome_entidade:string = "" ;
    public abrangencia: string = "";
    public codigo_cidade: string | null = null

    public constructor(data?: any) { super(); this.initialization(data); }
}
