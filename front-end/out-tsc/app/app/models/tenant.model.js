import { Base } from './base.model';
export class Tenant extends Base {
    // public petrvs_version //pega a versao do app.json
    // public petrvs_last_migration // nome da ultima migration executada
    // public petrvs_url // nome da ultima migration executada
    constructor(data) {
        super();
        this.tenancy_db_name = ""; /* Nome do banco de dados */
        this.tenancy_db_host = null; /* Endereço do banco de dados */
        this.tenancy_db_port = null; /* Porta do banco de dados */
        this.tenancy_db_username = null; /* Nome do usuário */
        this.tenancy_db_password = null; /* Senha do usuário */
        this.log_traffic = false;
        this.log_changes = false;
        this.log_errors = false;
        this.log_host = null;
        this.log_database = null;
        this.log_port = null;
        this.log_username = null;
        this.log_password = null;
        this.notification_petrvs = true;
        this.notification_mail = false;
        this.notification_mail_signature = "";
        this.notification_mail_host = "";
        this.notification_mail_port = 465;
        this.notification_mail_username = "";
        this.notification_mail_password = "";
        this.notification_mail_encryption = "SSL";
        this.notification_whatsapp = false;
        this.notification_whatsapp_url = "";
        this.notification_whatsapp_token = "";
        this.email = "";
        this.nome_usuario = "";
        this.cpf = "";
        this.apelido = "";
        this.sigla = "";
        this.nome_entidade = "";
        this.abrangencia = "";
        this.codigo_cidade = null;
        this.dominio_url = null;
        // LOGIN
        this.login_select_entidade = false;
        this.login_google_client_id = "";
        this.login_firebase_client_id = "";
        this.login_azure_client_id = "";
        this.login_azure_secret = "";
        this.login_azure_redirect_uri = "";
        this.login_login_unico_client_id = "";
        this.login_login_unico_secret = "";
        this.login_login_unico_environment = "";
        this.login_login_unico_code_verifier = "";
        this.login_login_unico_code_challenge_method = "";
        this.login_login_unico_redirect = "";
        this.login_google = false;
        this.login_azure = false;
        this.login_login_unico = false;
        // INTEGRACAO
        this.tipo_integracao = "";
        this.integracao_auto_incluir = true;
        this.integracao_cod_unidade_raiz = "";
        this.integracao_siape_url = "";
        this.integracao_siape_upag = "";
        this.integracao_siape_sigla = "";
        this.integracao_siape_nome = "";
        this.integracao_siape_cpf = "";
        this.integracao_siape_senha = "";
        this.integracao_siape_codorgao = "";
        this.integracao_siape_uorg = "";
        this.integracao_siape_existepag = "";
        this.integracao_siape_tipovinculo = "";
        this.integracao_wso2_url = "";
        this.integracao_wso2_unidades = "";
        this.integracao_wso2_pessoas = "";
        this.integracao_wso2_token_url = "";
        this.integracao_wso2_token_authorization = "";
        this.integracao_wso2_token_acesso = "";
        this.integracao_wso2_token_user = "";
        this.integracao_wso2_token_password = "";
        this.integracao_usuario_comum = "";
        this.integracao_usuario_chefe = "";
        this.integracao_siape_conectagov_chave = "";
        this.integracao_siape_conectagov_senha = "";
        this.integracao_siape_conectagov_qtd_max_requisicoes = 10;
        // SEI
        this.modulo_sei_habilitado = false;
        this.modulo_sei_private_key = "";
        this.modulo_sei_public_key = "";
        this.modulo_sei_url = "";
        // API
        this.api_url = "";
        this.api_username = "";
        this.api_password = "";
        this.api_cod_unidade_autorizadora = "";
        //SMTP
        this.smtp_host = "";
        this.smtp_port = 25;
        this.smtp_user = "";
        this.smtp_password = "";
        this.smtp_encryption = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=tenant.model.js.map