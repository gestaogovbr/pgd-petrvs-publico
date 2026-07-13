<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\V2\Home\DTOs\HomeRequestDTO;

class PlanosVigentes
{
    public function getData(HomeRequestDTO $dto): array
    {
        // TODO: implementar consulta real
        return [
            'unidades_com_plano_entregas' => [
                'quantidade' => 0,
                'total' => 0,
                'percentual' => 0,
            ],
            'participantes_com_plano_trabalho' => [
                'quantidade' => 0,
                'total' => 0,
                'percentual' => 0,
            ],
        ];
    }
}
