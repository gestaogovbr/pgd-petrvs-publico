<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Providers\LoginUnicoProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        $this->bootLoginUnicoSocialite();
    }

    private function bootLoginUnicoSocialite()
    {
        $socialite = $this->app->make('Laravel\Socialite\Contracts\Factory');
        $socialite->extend(
            'loginunico',
            function ($app) use ($socialite) {
                $config = $app['config']['services.login-unico'];
                return $socialite->buildProvider(LoginUnicoProvider::class, $config);
            }
        );
    }
}
