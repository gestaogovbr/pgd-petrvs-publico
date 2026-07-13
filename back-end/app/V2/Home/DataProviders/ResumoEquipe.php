<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\V2\Home\DTOs\HomeRequestDTO;

class ResumoEquipe
{
    public function getData(HomeRequestDTO $dto): array
    {
        // TODO: implementar consulta real
        return [
            'participantes_pgd' => [
                'quantidade' => 0,
                'total' => 0,
                'percentual' => 0,
            ],
            'capacidade_equipe_horas_mensais' => 0,
            'contribuicoes' => [
                'entregas_propria_unidade_percentual' => 0,
                'entregas_outras_unidades_percentual' => 0,
                'nao_vinculada_entregas_percentual' => 0,
            ],
        ];
    }
}
