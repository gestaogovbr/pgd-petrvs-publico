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
            'host' => Config::get('database.connections.log.host'),
            'port' => Config::get('database.connections.log.port'),
            'database' => Config::get('database.connections.log.database'),
            'username' => Config::get('database.connections.log.username'),
            'password' => Config::get('database.connections.log.password'),
            'traffic' => Config::get('log.traffic'),
            'changes' => Config::get('log.changes'),
            'errors' => Config::get('log.errors'),
            /* Notifications */
            'petrvs' => Config::get('notificacoes.petrvs.enviar'),
            'mail' => Config::get('notificacoes.email.enviar'),
            'mail_signature' => Config::get('notificacoes.email.signature'),
            'mail_host' => Config::get('mail.mailers.smtp.host'),
            'mail_port' => Config::get('mail.mailers.smtp.port'),
            'mail_username' => Config::get('mail.mailers.smtp.username'),
            'mail_password' => Config::get('mail.mailers.smtp.password'),
            'mail_encryption' => Config::get('mail.mailers.smtp.encryption'),
            'whatsapp' => Config::get('notificacoes.whatsapp.enviar'),
            'whatsapp_url' => Config::get('notificacoes.whatsapp.authorization'),
            'whatsapp_token' => Config::get('notificacoes.whatsapp.url'),
        ];
    }

    public function setLogConfig(array $config) {
        /* Logs */
        Config::set('database.connections.log.host', $config["host"]);
        Config::set('database.connections.log.port', $config["port"]);
        Config::set('database.connections.log.database', $config["database"]);
        Config::set('database.connections.log.username', $config["username"]);
        Config::set('database.connections.log.password', $config["password"]);
        Config::set('log.traffic', $config["traffic"]);
        Config::set('log.changes', $config["changes"]);
        Config::set('log.errors', $config["errors"]);
        DB::purge('log');
        /* Notifications */
        Config::set('notificacoes.petrvs.enviar', $config["petrvs"]);
        Config::set('notificacoes.email.enviar', $config["mail"]);
        Config::set('notificacoes.email.signature', $config["mail_signature"]);
        Config::set('mail.mailers.smtp.host', $config["mail_host"]);
        Config::set('mail.mailers.smtp.port', $config["mail_port"]);
        Config::set('mail.mailers.smtp.username', $config["mail_username"]);
        Config::set('mail.mailers.smtp.password', $config["mail_password"]);
        Config::set('mail.mailers.smtp.encryption', $config["mail_encryption"]);
        Config::set('notificacoes.whatsapp.enviar', $config["whatsapp"]);
        Config::set('notificacoes.whatsapp.authorization', $config["whatsapp_url"]);
        Config::set('notificacoes.whatsapp.url', $config["whatsapp_token"]);
    }

    public function loadLogConfig(Tenant $tenant) {
        $config = [
            /* Logs */
            'host' => $tenant->log_host ?? env("LOG_HOST") ?? "",
            'database' => $tenant->log_database ?? "log_" + $tenant->tenancy_db_name,
            'port' => $tenant->log_port ?? env("LOG_PORT") ?? "3306",
            'username' => $tenant->log_username ?? env("LOG_USERNAME") ?? "root",
            'password' => $tenant->log_password ?? env("LOG_PASSWORD") ?? "PsEeTnRhVaS",
            'traffic' => $tenant->log_traffic ?? false,
            'changes' => $tenant->log_changes ?? false,
            'errors' => $tenant->log_errors ?? false,
            /* Notifications */
            'petrvs' => $tenant->notification_petrvs ?? true,
            'mail' => $tenant->notification_mail ?? false,
            'mail_signature' => $tenant->notification_mail_signature ?? "<b>Petrvs</b>",
            'mail_host' => $tenant->notification_mail_host ?? "",
            'mail_port' => $tenant->notification_mail_port ?? 465,
            'mail_username' => $tenant->notification_mail_username ?? "",
            'mail_password' => $tenant->notification_mail_password ?? "",
            'mail_encryption' => $tenant->notification_mail_encryption ?? "SSL",
            'whatsapp' => $tenant->notification_whatsapp ?? false,
            'whatsapp_url' => $tenant->notification_whatsapp_url ?? "",
            'whatsapp_token' => $tenant->notification_whatsapp_token ?? ""
        ];
        if(!empty($config["host"]) && !empty($config["database"])) {
            if(json_encode($config) != json_encode($this->getLogConfig())) {
                $this->setLogConfig($config);
            }
            return true;
        } else {
            return false;
        }
    }

}