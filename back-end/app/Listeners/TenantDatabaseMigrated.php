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
        if($this->loadLogConfig($event->tenant)) {
            Artisan::call("migrate --database=log --path=database/migrations/log");
        }
    }
}
