<?php

namespace App\Listeners;

use App\Models\Tenant;
use Stancl\Tenancy\Events;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class TenantListenerBase
{

    public function getLogConfig() {
        return [
            /* logs */
            'log_host' => Config::get('database.connections.log.host'),
            'log_port' => Config::get('database.connections.log.port'),
            'log_database' => Config::get('database.connections.log.database'),
            'log_username' => Config::get('database.connections.log.username'),
            'log_password' => Config::get('database.connections.log.password'),
            'log_traffic' => Config::get('log.traffic'),
            'log_changes' => Config::get('log.changes'),
            'log_errors' => Config::get('log.errors'),
            /* Notifications */
            'notification_petrvs' => Config::get('notificacoes.petrvs.enviar'),
            'notification_mail' => Config::get('notificacoes.email.enviar'),
            'notification_mail_signature' => Config::get('notificacoes.email.signature'),
            'notification_mail_host' => Config::get('mail.mailers.smtp.host'),
            'notification_mail_port' => Config::get('mail.mailers.smtp.port'),
            'notification_mail_username' => Config::get('mail.mailers.smtp.username'),
            'notification_mail_password' => Config::get('mail.mailers.smtp.password'),
            'notification_mail_encryption' => Config::get('mail.mailers.smtp.encryption'),
            'notification_whatsapp' => Config::get('notificacoes.whatsapp.enviar'),
            'notification_whatsapp_url' => Config::get('notificacoes.whatsapp.authorization'),
            'notification_whatsapp_token' => Config::get('notificacoes.whatsapp.url'),
        ];
    }

    public function setLogConfig(array $config) {
        /* Logs */
        Config::set('database.connections.log.host', $config["log_host"]);
        Config::set('database.connections.log.port', $config["log_port"]);
        Config::set('database.connections.log.database', $config["log_database"]);
        Config::set('database.connections.log.username', $config["log_username"]); 
        Config::set('database.connections.log.password', $config["log_password"]);
        Config::set('log.traffic', $config["log_traffic"]);
        Config::set('log.changes', $config["log_changes"]);
        Config::set('log.errors', $config["log_errors"]);
        DB::purge('log');
        /* Notifications */
        Config::set('notificacoes.petrvs.enviar', $config["notification_petrvs"]);
        Config::set('notificacoes.email.enviar', $config["notification_mail"]);
        Config::set('notificacoes.email.signature', $config["notification_mail_signature"]);
        Config::set('mail.mailers.smtp.host', $config["notification_mail_host"]);
        Config::set('mail.mailers.smtp.port', $config["notification_mail_port"]);
        Config::set('mail.mailers.smtp.username', $config["notification_mail_username"]);
        Config::set('mail.mailers.smtp.password', $config["notification_mail_password"]);
        Config::set('mail.mailers.smtp.encryption', $config["notification_mail_encryption"]);
        Config::set('mail.from.address', $config["notification_mail_username"]);
        Config::set('notificacoes.whatsapp.enviar', $config["notification_whatsapp"]);
        Config::set('notificacoes.whatsapp.authorization', $config["notification_whatsapp_url"]);
        Config::set('notificacoes.whatsapp.url', $config["notification_whatsapp_token"]);
    }

    public function loadConfig(Tenant $tenant) {
        $config = [
            /* Logs */
            'log_host' => $tenant->log_host ?? env("LOG_HOST") ?? "",
            'log_database' => $tenant->log_database ?? "log_" . $tenant->tenancy_db_name,
            'log_port' => $tenant->log_port ?? env("LOG_PORT") ?? "3306",
            'log_username' => $tenant->log_username ?? env("LOG_USERNAME") ?? "root",
            'log_password' => $tenant->log_password ?? env("LOG_PASSWORD") ?? "PsEeTnRhVaS",
            'log_traffic' => $tenant->log_traffic ?? false,
            'log_changes' => $tenant->log_changes ?? false,
            'log_errors' => $tenant->log_errors ?? false,
            /* Notifications */
            'notification_petrvs' => $tenant->notification_petrvs ?? true,
            'notification_mail' => $tenant->notification_mail ?? false,
            'notification_mail_signature' => $tenant->notification_mail_signature ?? "<b>Petrvs</b>",
            'notification_mail_host' => $tenant->notification_mail_host ?? "",
            'notification_mail_port' => $tenant->notification_mail_port ?? 465,
            'notification_mail_username' => $tenant->notification_mail_username ?? "",
            'notification_mail_password' => $tenant->notification_mail_password ?? "",
            'notification_mail_encryption' => $tenant->notification_mail_encryption ?? "SSL",
            'notification_whatsapp' => $tenant->notification_whatsapp ?? false,
            'notification_whatsapp_url' => $tenant->notification_whatsapp_url ?? "",
            'notification_whatsapp_token' => $tenant->notification_whatsapp_token ?? "",

            'login_select_entidade' => $tenant ->login_select_entidade ?? "",
            'login_google_client_id' => $tenant ->login_google_client_id?? "",
            'login_firebase_client_id' => $tenant ->login_firebase_client_id?? "",
            'login_azure_client_id' => $tenant ->login_azure_client_id?? "",
            'login_azure_secret' => $tenant ->login_azure_secret?? "",
            'login_azure_redirect_uri' => $tenant ->login_azure_redirect_uri?? "",
            'login_login_unico_client_id' => $tenant ->login_login_unico_client_id?? "",
            'login_login_unico_secret' => $tenant ->login_login_unico_secret?? "",

            'tipo_integracao' => $tenant->tipo_integracao ?? "",
            'integracao_auto_incluir' => $tenant->integracao_auto_incluir ?? "",
            'integracao_cod_unidade_raiz' => $tenant->integracao_cod_unidade_raiz ?? "",
            'integracao_siape_url' => $tenant->integracao_siape_url ?? "",
            'integracao_siape_upag' => $tenant->integracao_siape_upag ?? "",
            'integracao_siape_sigla' => $tenant->integracao_siape_sigla ?? "",
            'integracao_siape_nome' => $tenant->integracao_siape_nome ?? "",
            'integracao_siape_cpf' => $tenant->integracao_siape_cpf ?? "",
            'integracao_siape_senha' => $tenant->integracao_siape_senha ?? "",
            'integracao_siape_codorgao' => $tenant->integracao_siape_codorgao ?? "",
            'integracao_siape_uorg' => $tenant->integracao_siape_uorg ?? "",
            'integracao_siape_existepag' => $tenant->integracao_siape_existepag ?? "",
            'integracao_siape_tipovinculo' => $tenant->integracao_siape_tipovinculo ?? "",
            'integracao_wso2_url' => $tenant->integracao_wso2_url ?? "",
            'integracao_wso2_unidades' => $tenant->integracao_wso2_unidades ?? "",
            'integracao_wso2_pessoas'  => $tenant->integracao_wso2_pessoas ?? "",
            'integracao_wso2_token_url' => $tenant->integracao_wso2_token_url ?? "",
            'integracao_wso2_token_authorization' => $tenant->integracao_wso2_token_authorization ?? "",
            'integracao_wso2_token_acesso' => $tenant->integracao_wso2_token_acesso ?? "",
            'integracao_wso2_token_user' => $tenant->integracao_wso2_token_user ?? "",
            'integracao_wso2_token_password' => $tenant->integracao_wso2_token_password ?? "",
            'integracao_siape_conectagov_chave' => $tenant->integracao_siape_conectagov_chave ?? "",
            'integracao_siape_conectagov_senha' => $tenant->integracao_siape_conectagov_senha    ?? "",
            'integracao_siape_conectagov_qtd_max_requisicoes' => $tenant->integracao_siape_conectagov_qtd_max_requisicoes    ?? "",
        ];
        if(json_encode($config) != json_encode($this->getLogConfig())) {
            $this->setLogConfig($config);
        }
    }

    public function hasLogConfig(Tenant $tenant) {
        return !empty($tenant->log_host) && !empty($tenant->log_database);
    }
}