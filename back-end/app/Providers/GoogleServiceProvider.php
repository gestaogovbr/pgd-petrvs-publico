<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\GoogleService;

class GoogleServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(GoogleService::class, function ($app) {
            return new GoogleService(config('google'));
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
