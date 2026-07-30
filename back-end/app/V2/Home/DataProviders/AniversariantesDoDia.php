<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\V2\Home\DTOs\HomeRequestDTO;

class AniversariantesDoDia
{
    public function getData(HomeRequestDTO $dto): array
    {
        // TODO: implementar consulta real via dados SIAPE
        // TODO: Atualmente não há a data de nascimento do usuário
        return [
            'aniversariantes' => [],
        ];
    }
}
