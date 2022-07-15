<?php

namespace App\Providers;

use App\Services\FirebaseAuthService;
use Illuminate\Support\ServiceProvider;

class FirebaseAuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(FirebaseAuthService::class, function ($app) {
            return new FirebaseAuthService(config('firebase'));
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
