<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Usuario;
use Laravel\Sanctum\Sanctum;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        Sanctum::ignoreMigrations();
    }


    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        /*Gate::define('CODIGO1', function (Usuario $usuario) {
            return $usuario->hasPermissionTo('CODIGO1');
        });*/
        Gate::before(function ($user, $ability) {
            return $user->hasPermissionTo($ability);
        });
    }
}
