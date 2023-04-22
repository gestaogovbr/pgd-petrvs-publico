<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\IntegracaoService;

class IntegracaoServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(IntegracaoService::class, function ($app) {
            return new IntegracaoService();
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
