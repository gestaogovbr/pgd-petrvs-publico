<?php

namespace App\Providers;

use App\Http\Controllers\ProdutoController;
use App\Services\Validador\IValidador;
use App\Services\Validador\ProdutoValidador;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->when(ProdutoController::class)
                  ->needs(IValidador::class)
                  ->give(ProdutoValidador::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        if($this->app->environment('APP_ENV') == 'local') {
            DB::listen(function ($query) {
                Log::info($query->sql, $query->bindings, $query->time);
            });
        }
    }
}
