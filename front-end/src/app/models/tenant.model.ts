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
    public nome_entidade: string = "";
    public abrangencia: string = "";
    public codigo_cidade: string | null = null
    public dominio_url: string | null = null
    // LOGIN
    public login_select_entidade: boolean = false;
    public login_google_client_id:string = "" ;
    public login_firebase_client_id:string = "" ;
    public login_azure_client_id:string = "" ;
    public login_azure_secret:string = "" ;
    public login_azure_redirect_uri:string = "" ;
    public login_login_unico_client_id:string = "" ;
    public login_login_unico_secret:string = "" ;
    public login_login_unico_environment:string = "" ;
    public login_login_unico_code_verifier:string = "" ;
    public login_login_unico_code_challenge_method:string = "" ;
    public login_login_unico_redirect:string = "" ;
    public login_google: boolean = false;
    public login_azure: boolean = false;
    public login_login_unico: boolean = false;
    // INTEGRACAO
    public tipo_integracao: string = "";
    public integracao_auto_incluir: boolean = true;
    public integracao_cod_unidade_raiz:string = "";
    public integracao_siape_url:string = "";
    public integracao_siape_upag:string = "";
    public integracao_siape_sigla:string = "";
    public integracao_siape_nome:string = "";
    public integracao_siape_cpf:string = "";
    public integracao_siape_senha:string = "";
    public integracao_siape_codorgao:string = "";
    public integracao_siape_uorg:string = "";
    public integracao_siape_existepag:string = "";
    public integracao_siape_tipovinculo:string = "";
    public integracao_wso2_url:string = "";
    public integracao_wso2_unidades:string = "";
    public integracao_wso2_pessoas:string = "";
    public integracao_wso2_token_url:string = "";
    public integracao_wso2_token_authorization:string = "";
    public integracao_wso2_token_acesso:string = "";
    public integracao_wso2_token_user:string = "";
    public integracao_wso2_token_password:string = "";
    public integracao_usuario_comum: string = "";
    public integracao_usuario_chefe: string = "";
    public integracao_siape_conectagov_chave: string = "";
    public integracao_siape_conectagov_senha: string = "";
    public integracao_siape_conectagov_qtd_max_requisicoes: number = 10;
    // SEI
    public modulo_sei_habilitado: boolean = false;
    public modulo_sei_private_key: string = "";
    public modulo_sei_public_key: string = "";
    public modulo_sei_url: string = "";
    // API
    public api_url: string = "";
    public api_username: string = "";
    public api_password: string = "";
    public api_cod_unidade_autorizadora: string = "";
    //SMTP
    public smtp_host: string = "";
    public smtp_port: number = 25;
    public smtp_user: string = "";
    public smtp_password: string = "";
    public smtp_encryption: string = "";

    // public petrvs_version //pega a versao do app.json
    // public petrvs_last_migration // nome da ultima migration executada
    // public petrvs_url // nome da ultima migration executada

    public constructor(data?: any) { super(); this.initialization(data); }
}
