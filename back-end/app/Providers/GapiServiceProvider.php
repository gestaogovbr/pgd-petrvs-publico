<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\GapiService;

class GapiServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(GapiService::class, function ($app) {
            return new GapiService(config('gapi'));
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
