<?php

declare(strict_types=1);

namespace App\Providers;

use App\Repository\Usuario\Eloquent\EloquentUsuarioWriteRepository;

use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;

use App\Repository\Usuario\Eloquent\EloquentUsuarioReadRepository;

use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;

use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorWriteRepositoryContract;
use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorReadRepository;
use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorWriteRepository;
use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoReadRepositoryContract;
use App\Repository\PlanoTrabalhoConsolidacao\Eloquent\EloquentPlanoTrabalhoConsolidacaoReadRepository;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;
use App\Repository\Unidade\Eloquent\EloquentUnidadeReadRepository;
use App\Repository\Unidade\Eloquent\EloquentUnidadeWriteRepository;
use Illuminate\Support\ServiceProvider;

final class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            IntegracaoServidorReadRepositoryContract::class,
            EloquentIntegracaoServidorReadRepository::class,
        );

        $this->app->bind(
            IntegracaoServidorWriteRepositoryContract::class,
            EloquentIntegracaoServidorWriteRepository::class,
        );

        $this->app->bind(
            PlanoTrabalhoConsolidacaoReadRepositoryContract::class,
            EloquentPlanoTrabalhoConsolidacaoReadRepository::class,
        );

        $this->app->bind(
            UnidadeReadRepositoryContract::class,
            EloquentUnidadeReadRepository::class,
        );

        $this->app->bind(
            UnidadeWriteRepositoryContract::class,
            EloquentUnidadeWriteRepository::class,
        );

        $this->app->bind(
            UsuarioReadRepositoryContract::class,
            EloquentUsuarioReadRepository::class,
        );
        $this->app->bind(
            UsuarioWriteRepositoryContract::class,
            EloquentUsuarioWriteRepository::class,
        );
    }

    public function boot(): void
    {
    }
}
