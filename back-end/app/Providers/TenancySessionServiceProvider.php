<?php

namespace App\Providers;

use App\Handlers\TenantSessionHandler;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;

class TenancySessionServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        Session::extend('custom-database', function ($app) {
            return new TenantSessionHandler(
                $app->db->connection(config('session.connection')), 
                config('session.table'), 
                config('session.lifetime'), 
                $app
            );
        });
    }
}