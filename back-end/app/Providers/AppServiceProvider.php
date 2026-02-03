<?php

namespace App\Providers;

use App\Facades\SiapeLog;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\SolucaoController;
use App\Http\Controllers\TipoClienteController;
use App\Models\Avaliacao;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoEntregaEntregaProgresso;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\StatusJustificativa;
use App\Models\Usuario;
use App\Observers\AvaliacaoObserver;
use App\Observers\PlanoEntregaEntregaObserver;
use App\Observers\PlanoEntregaEntregaProgressoObserver;
use App\Observers\PlanoEntregaObserver;
use App\Observers\PlanoTrabalhoConsolidacaoObserver;
use App\Observers\PlanoTrabalhoEntregaObserver;
use App\Observers\PlanoTrabalhoObserver;
use App\Observers\StatusJustificativaObserver;
use App\Observers\UsuarioObserver;
use App\Services\Validador\ClienteValidador;
use App\Services\Validador\IValidador;
use App\Services\Validador\ProdutoClienteValidador;
use App\Services\Validador\ProdutoInsumoValidation;
use App\Services\Validador\ProdutoProcessoCadeiaValorValidation;
use App\Services\Validador\ProdutoSolucaoValidador;
use App\Services\Validador\ProdutoValidador;
use App\Services\Validador\SolucaoValidador;
use App\Services\Validador\TipoClienteValidador;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Stancl\Tenancy\Database\Models\Domain;

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

        Domain::saved(function (Domain $domain) {
            Cache::forget('domain:tenant_id:'.$domain->tenant_id);
            Cache::forget('domain:domain:'.$domain->domain);
        });
        Domain::deleted(function (Domain $domain) {
            Cache::forget('domain:tenant_id:'.$domain->tenant_id);
            Cache::forget('domain:domain:'.$domain->domain);
        });

        if($this->app->environment('APP_CONTEXT') == 'web') {
            Usuario::observe(UsuarioObserver::class);
            PlanoEntrega::observe(PlanoEntregaObserver::class);
            PlanoEntregaEntrega::observe(PlanoEntregaEntregaObserver::class);
            PlanoEntregaEntregaProgresso::observe(PlanoEntregaEntregaProgressoObserver::class);
            StatusJustificativa::observe(StatusJustificativaObserver::class);
            PlanoTrabalho::observe(PlanoTrabalhoObserver::class);
            PlanoTrabalhoEntrega::observe(PlanoTrabalhoEntregaObserver::class);
            \App\Models\PlanoTrabalhoConsolidacao::observe(PlanoTrabalhoConsolidacaoObserver::class);
        }
    }
}
