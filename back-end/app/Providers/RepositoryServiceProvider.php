<?php

declare(strict_types=1);

namespace App\Providers;

use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorWriteRepositoryContract;
use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorReadRepository;
use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorWriteRepository;
use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoReadRepositoryContract;
use App\Repository\PlanoTrabalhoConsolidacao\Eloquent\EloquentPlanoTrabalhoConsolidacaoReadRepository;
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
    }

    public function boot(): void
    {
    }
}
