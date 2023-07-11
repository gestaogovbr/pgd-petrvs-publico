<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\GoogleService;
use App\Services\LoginUnicoService;

class Login extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(LoginUnicoService::class, function ($app) {
            return new LoginUnicoService(config('login_unico'));
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
