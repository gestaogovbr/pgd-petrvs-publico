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

    public constructor(data?: any) { super(); this.initialization(data); }
}
