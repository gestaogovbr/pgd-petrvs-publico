<?php

namespace App\Providers;

use App\Facades\SiapeLog;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\SolucaoController;
use App\Http\Controllers\TipoClienteController;
use App\Models\TipoCliente;
use App\Services\Validador\ClienteValidador;
use App\Services\Validador\IValidador;
use App\Services\Validador\ProdutoClienteValidador;
use App\Services\Validador\ProdutoClienteValidation;
use App\Services\Validador\ProdutoProcessoCadeiaValorValidation;
use App\Services\Validador\ProdutoInsumoValidation;
use App\Services\Validador\ProdutoSolucaoValidador;
use App\Services\Validador\ProdutoValidador;
use App\Services\Validador\SolucaoValidador;
use App\Services\Validador\TipoClienteValidador;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
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
        ->give(function () {
            return [
                $this->app->make(ProdutoValidador::class),
                $this->app->make(ProdutoInsumoValidation::class),
                $this->app->make(ProdutoProcessoCadeiaValorValidation::class),
                $this->app->make(ProdutoClienteValidador::class),
                $this->app->make(ProdutoSolucaoValidador::class),
            ];
        });

        $this->app->when(ClienteController::class)
        ->needs(IValidador::class)
        ->give(function () {
            return [
                $this->app->make(ClienteValidador::class),
            ];
        });

        $this->app->when(TipoClienteController::class)
        ->needs(IValidador::class)
        ->give(function () {
            return [
                $this->app->make(TipoClienteValidador::class),
            ];
        });

        $this->app->when(SolucaoController::class)->needs(IValidador::class)->give(function () {
            return [
                $this->app->make(SolucaoValidador::class),
            ];
        });

        $this->app->singleton('siape-log', function () {
            return new SiapeLog;
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        URL::forceScheme('https');
        if($this->app->environment('APP_ENV') == 'local') {
            DB::listen(function ($query) {
                Log::info($query->sql, $query->bindings, $query->time);
            });
        }
    }
}
