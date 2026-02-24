<?php

declare(strict_types=1);

namespace App\Providers;

use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorWriteRepositoryContract;
use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorReadRepository;
use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorWriteRepository;
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
    }

    public function boot(): void
    {
    }
}
