<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\LoginUnicoService;

class LoginUnicoServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(LoginUnicoService::class, function ($app) {
            return new LoginUnicoService(config('login-unico'));
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
