<?php

namespace App\Providers;

use App\Services\UtilService;
use Illuminate\Support\ServiceProvider;

class UtilServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    { 
        $this->app->singleton(UtilService::class, function ($app) {
            return new UtilService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
