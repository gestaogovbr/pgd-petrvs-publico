<?php

namespace App\Listeners;

use Stancl\Tenancy\Events;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class TenantDatabaseMigrated extends TenantListenerBase
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\DatabaseMigrated  $event
     * @return void
     */
    public function handle(Events\DatabaseMigrated $event)
    {
        $this->loadConfig($event->tenant);
        if($this->hasLogConfig($event->tenant)) {
            $database = config("database.connections.log.database");
            if(!empty($database)) {
                Config::set('database.connections.log.database', null);
                DB::purge('log');
                DB::connection('mysql')->getPdo()->exec("CREATE DATABASE IF NOT EXISTS `{$database}`");
                Config::set('database.connections.log.database', $database);
                DB::purge('log');
                Artisan::call("migrate --database=log --path=database/migrations/log");
                dd(Artisan::output());
            }
        }
    }
}
