<?php

declare(strict_types=1);

namespace App\Providers;

use App\Repository\UnidadeIntegranteAtribuicao\Eloquent\EloquentUnidadeIntegranteAtribuicaoWriteRepository;

use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoWriteRepositoryContract;

use App\Repository\UnidadeIntegranteAtribuicao\Eloquent\EloquentUnidadeIntegranteAtribuicaoReadRepository;

use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoReadRepositoryContract;

use App\Repository\UnidadeIntegrante\Eloquent\EloquentUnidadeIntegranteWriteRepository;

use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteWriteRepositoryContract;

use App\Repository\UnidadeIntegrante\Eloquent\EloquentUnidadeIntegranteReadRepository;

use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteReadRepositoryContract;

use App\Repository\SiapeBlackListServidor\Eloquent\EloquentSiapeBlackListServidorWriteRepository;

use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorWriteRepositoryContract;

use App\Repository\SiapeBlackListServidor\Eloquent\EloquentSiapeBlackListServidorReadRepository;

use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorReadRepositoryContract;

use App\Repository\SiapeDadosUORG\Eloquent\EloquentSiapeDadosUORGWriteRepository;

use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGWriteRepositoryContract;

use App\Repository\SiapeDadosUORG\Eloquent\EloquentSiapeDadosUORGReadRepository;

use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGReadRepositoryContract;

use App\Repository\SiapeListaUORGS\Eloquent\EloquentSiapeListaUORGSWriteRepository;

use App\Repository\SiapeListaUORGS\Contracts\SiapeListaUORGSWriteRepositoryContract;

use App\Repository\SiapeListaUORGS\Eloquent\EloquentSiapeListaUORGSReadRepository;

use App\Repository\SiapeListaUORGS\Contracts\SiapeListaUORGSReadRepositoryContract;

use App\Repository\SiapeConsultaDadosFuncionais\Eloquent\EloquentSiapeConsultaDadosFuncionaisWriteRepository;

use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisWriteRepositoryContract;

use App\Repository\SiapeConsultaDadosFuncionais\Eloquent\EloquentSiapeConsultaDadosFuncionaisReadRepository;

use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisReadRepositoryContract;

use App\Repository\SiapeConsultaDadosPessoais\Eloquent\EloquentSiapeConsultaDadosPessoaisWriteRepository;

use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisWriteRepositoryContract;

use App\Repository\SiapeConsultaDadosPessoais\Eloquent\EloquentSiapeConsultaDadosPessoaisReadRepository;

use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisReadRepositoryContract;

use App\Repository\Entidade\Eloquent\EloquentEntidadeWriteRepository;

use App\Repository\Entidade\Contracts\EntidadeWriteRepositoryContract;

use App\Repository\Entidade\Eloquent\EloquentEntidadeReadRepository;

use App\Repository\Entidade\Contracts\EntidadeReadRepositoryContract;

use App\Repository\IntegracaoUnidade\Eloquent\EloquentIntegracaoUnidadeWriteRepository;

use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeWriteRepositoryContract;

use App\Repository\IntegracaoUnidade\Eloquent\EloquentIntegracaoUnidadeReadRepository;

use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeReadRepositoryContract;

use App\Repository\Usuario\Eloquent\EloquentUsuarioReadRepository;

use App\Repository\Usuario\Eloquent\EloquentUsuarioWriteRepository;

use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;


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
use App\Repository\Perfil\Contracts\PerfilReadRepositoryContract;
use App\Repository\Perfil\Eloquent\EloquentPerfilReadRepository;
use App\Repository\TipoModalidade\Contracts\TipoModalidadeReadRepositoryContract;
use App\Repository\TipoModalidade\Eloquent\EloquentTipoModalidadeReadRepository;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use App\Repository\PlanoTrabalho\Eloquent\EloquentPlanoTrabalhoReadRepository;
use App\Repository\PlanoTrabalho\Eloquent\EloquentPlanoTrabalhoWriteRepository;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaReadRepositoryContract;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaWriteRepositoryContract;
use App\Repository\PlanoEntrega\Eloquent\EloquentPlanoEntregaReadRepository;
use App\Repository\PlanoEntrega\Eloquent\EloquentPlanoEntregaWriteRepository;
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
            UsuarioWriteRepositoryContract::class,
            EloquentUsuarioWriteRepository::class,
        );

        $this->app->bind(
            IntegracaoUnidadeReadRepositoryContract::class,
            EloquentIntegracaoUnidadeReadRepository::class,
        );
        $this->app->bind(
            IntegracaoUnidadeWriteRepositoryContract::class,
            EloquentIntegracaoUnidadeWriteRepository::class,
        );

        $this->app->bind(
            PerfilReadRepositoryContract::class,
            EloquentPerfilReadRepository::class,
        );

        $this->app->bind(
            TipoModalidadeReadRepositoryContract::class,
            EloquentTipoModalidadeReadRepository::class,
        );

        $this->app->bind(
            PlanoTrabalhoReadRepositoryContract::class,
            EloquentPlanoTrabalhoReadRepository::class,
        );
        $this->app->bind(
            PlanoTrabalhoWriteRepositoryContract::class,
            EloquentPlanoTrabalhoWriteRepository::class,
        );

        $this->app->bind(
            PlanoEntregaReadRepositoryContract::class,
            EloquentPlanoEntregaReadRepository::class,
        );
        $this->app->bind(
            PlanoEntregaWriteRepositoryContract::class,
            EloquentPlanoEntregaWriteRepository::class,
        );

        $this->app->bind(
            UsuarioReadRepositoryContract::class,
            EloquentUsuarioReadRepository::class,
        );


        $this->app->bind(
            EntidadeReadRepositoryContract::class,
            EloquentEntidadeReadRepository::class,
        );
        $this->app->bind(
            EntidadeWriteRepositoryContract::class,
            EloquentEntidadeWriteRepository::class,
        );

        $this->app->bind(
            SiapeConsultaDadosPessoaisReadRepositoryContract::class,
            EloquentSiapeConsultaDadosPessoaisReadRepository::class,
        );
        $this->app->bind(
            SiapeConsultaDadosPessoaisWriteRepositoryContract::class,
            EloquentSiapeConsultaDadosPessoaisWriteRepository::class,
        );

        $this->app->bind(
            SiapeConsultaDadosFuncionaisReadRepositoryContract::class,
            EloquentSiapeConsultaDadosFuncionaisReadRepository::class,
        );
        $this->app->bind(
            SiapeConsultaDadosFuncionaisWriteRepositoryContract::class,
            EloquentSiapeConsultaDadosFuncionaisWriteRepository::class,
        );

        $this->app->bind(
            SiapeListaUORGSReadRepositoryContract::class,
            EloquentSiapeListaUORGSReadRepository::class,
        );
        $this->app->bind(
            SiapeListaUORGSWriteRepositoryContract::class,
            EloquentSiapeListaUORGSWriteRepository::class,
        );

        $this->app->bind(
            SiapeDadosUORGReadRepositoryContract::class,
            EloquentSiapeDadosUORGReadRepository::class,
        );
        $this->app->bind(
            SiapeDadosUORGWriteRepositoryContract::class,
            EloquentSiapeDadosUORGWriteRepository::class,
        );

        $this->app->bind(
            SiapeBlackListServidorReadRepositoryContract::class,
            EloquentSiapeBlackListServidorReadRepository::class,
        );
        $this->app->bind(
            SiapeBlackListServidorWriteRepositoryContract::class,
            EloquentSiapeBlackListServidorWriteRepository::class,
        );

        $this->app->bind(
            UnidadeIntegranteReadRepositoryContract::class,
            EloquentUnidadeIntegranteReadRepository::class,
        );
        $this->app->bind(
            UnidadeIntegranteWriteRepositoryContract::class,
            EloquentUnidadeIntegranteWriteRepository::class,
        );

        $this->app->bind(
            UnidadeIntegranteAtribuicaoReadRepositoryContract::class,
            EloquentUnidadeIntegranteAtribuicaoReadRepository::class,
        );
        $this->app->bind(
            UnidadeIntegranteAtribuicaoWriteRepositoryContract::class,
            EloquentUnidadeIntegranteAtribuicaoWriteRepository::class,
        );
    }

    public function boot(): void
    {
    }
}
