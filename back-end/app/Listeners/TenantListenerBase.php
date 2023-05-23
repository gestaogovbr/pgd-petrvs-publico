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
            'host' => Config::get('database.connections.log.host'),
            'port' => Config::get('database.connections.log.port'),
            'database' => Config::get('database.connections.log.database'),
            'username' => Config::get('database.connections.log.username'),
            'password' => Config::get('database.connections.log.password'),
            'traffic' => Config::get('log.traffic'),
            'changes' => Config::get('log.changes'),
            'errors' => Config::get('log.errors')
        ];
    }

    public function setLogConfig(array $config) {
        Config::set('database.connections.log.host', $config["host"]);
        Config::set('database.connections.log.port', $config["port"]);
        Config::set('database.connections.log.database', $config["database"]);
        Config::set('database.connections.log.username', $config["username"]);
        Config::set('database.connections.log.password', $config["password"]);
        Config::set('log.traffic', $config["traffic"]);
        Config::set('log.changes', $config["changes"]);
        Config::set('log.errors', $config["errors"]);
        DB::purge('log');
    }

    public function loadLogConfig(Tenant $tenant) {
        $config = [
            'host' => $tenant->log_host ?? "",
            'database' => $tenant->log_database ?? "",
            'port' => $tenant->log_port ?? "3306",
            'username' => $tenant->log_username ?? "root",
            'password' => $tenant->log_password ?? "PsEeTnRhVaS",
            'traffic' => $tenant->log_traffic ?? false,
            'changes' => $tenant->log_changes ?? false,
            'errors' => $tenant->log_errors ?? false
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