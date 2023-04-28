<?php

namespace App\Providers;

use App\Services\DprfSegurancaAuthService;
use Illuminate\Support\ServiceProvider;

class DprfSegurancaAuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(DprfSegurancaAuthService::class, function ($app) {
            return new DprfSegurancaAuthService(config('dprfseguranca'));
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
