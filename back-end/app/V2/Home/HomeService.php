<?php

declare(strict_types=1);

namespace App\V2\Home;

use App\V2\Home\DataProviders\AniversariantesDoDia;
use App\V2\Home\DataProviders\ContribuicoesParticipantes;
use App\V2\Home\DataProviders\EmFeriasHoje;
use App\V2\Home\DataProviders\MeusPlanosVigentes;
use App\V2\Home\DataProviders\PendenciasUsuario;
use App\V2\Home\DataProviders\PlanosVigentes;
use App\V2\Home\DataProviders\ResumoEquipe;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Validators\HomeAuthorizationValidator;
use Illuminate\Support\Facades\Auth;

class HomeService
{
    public function __construct(
        private readonly HomeAuthorizationValidator $authzValidator,
        private readonly PendenciasUsuario $pendenciasUsuario,
        private readonly PlanosVigentes $planosVigentes,
        private readonly ResumoEquipe $resumoEquipe,
        private readonly ContribuicoesParticipantes $contribuicoes,
        private readonly AniversariantesDoDia $aniversariantes,
        private readonly EmFeriasHoje $emFeriasHoje,
        private readonly MeusPlanosVigentes $meusPlanosVigentes,
    ) {}

    public function getPendencias(array $data): array
    {
        $dto = $this->buildDTO($data);

        return $this->pendenciasUsuario->getData($dto);
    }

    public function getPendenciasGlobal(): array
    {
        return $this->pendenciasUsuario->getDataGlobal(Auth::id());
    }

    public function getPlanosVigentes(array $data): array
    {
        $dto = $this->buildDTO($data);

        return $this->planosVigentes->getData($dto);
    }

    public function getResumoEquipe(array $data): array
    {
        $dto = $this->buildDTO($data);

        return $this->resumoEquipe->getData($dto);
    }

    public function getAniversariantes(array $data): array
    {
        $dto = $this->buildDTO($data);

        return $this->aniversariantes->getData($dto);
    }

    public function getEmFerias(array $data): array
    {
        $dto = $this->buildDTO($data);

        return $this->emFeriasHoje->getData($dto);
    }

    public function getContribuicoes(array $data): array
    {
        $dto = $this->buildDTO($data);

        return $this->contribuicoes->getData($dto);
    }

    public function getMeusPlanosVigentes(array $data): array
    {
        $dto = $this->buildDTO($data);

        return $this->meusPlanosVigentes->getData($dto);
    }

    private function buildDTO(array $data): HomeRequestDTO
    {
        $dto = HomeRequestDTO::fromArray($data, Auth::id());
        $this->authzValidator->validar($dto);

        return $dto;
    }
}
