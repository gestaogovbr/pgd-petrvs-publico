<?php

namespace App\Listeners;

use Stancl\Tenancy\Events;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class TenantBootstrapped extends TenantListenerBase
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
     * @param  \App\Events\TenancyBootstrapped  $event
     * @return void
     */
    public function handle(Events\TenancyBootstrapped $event)
    {
        $this->loadLogConfig($event->tenancy->tenant);
    }
}
