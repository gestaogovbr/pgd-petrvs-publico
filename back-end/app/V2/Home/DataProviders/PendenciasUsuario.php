<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\V2\Home\DTOs\HomeRequestDTO;

class PendenciasUsuario
{
    public function getData(HomeRequestDTO $dto): array
    {
        // TODO: implementar consulta real
        return [
            'assinaturas_pe_pendentes' => 0,
            'assinaturas_pt_pendentes' => 0,
            'registros_execucao_pe_atraso' => 0,
            'registros_execucao_pt_atraso' => 0,
            'avaliacoes_pt_pendentes' => 0,
            'avaliacoes_pe_pendentes' => 0,
        ];
    }
}
