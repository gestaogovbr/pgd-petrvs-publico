<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Enums\StatusEnum;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\V2\Home\DTOs\HomeRequestDTO;

class MeusPlanosVigentes
{
    /**
     * @return array{plano_entregas_id: string|null, plano_trabalho_id: string|null}
     */
    public function getData(HomeRequestDTO $dto): array
    {
        return [
            'plano_entregas_id' => $this->buscarPEVigenteDaUnidade($dto->unidadeId),
            'plano_trabalho_id' => $this->buscarPTVigenteDoUsuario($dto->usuarioId),
        ];
    }

    private function buscarPEVigenteDaUnidade(string $unidadeId): ?string
    {
        $hoje = now()->toDateString();

        $plano = PlanoEntrega::query()
            ->where('unidade_id', $unidadeId)
            ->where('status', StatusEnum::ATIVO->value)
            ->where('data_inicio', '<=', $hoje)
            ->where('data_fim', '>=', $hoje)
            ->orderByDesc('data_inicio')
            ->first(['id']);

        return $plano?->id;
    }

    private function buscarPTVigenteDoUsuario(string $usuarioId): ?string
    {
        $hoje = now()->toDateString();

        $plano = PlanoTrabalho::query()
            ->where('usuario_id', $usuarioId)
            ->where('status', StatusEnum::ATIVO->value)
            ->where('data_inicio', '<=', $hoje)
            ->where('data_fim', '>=', $hoje)
            ->orderByDesc('data_inicio')
            ->first(['id']);

        return $plano?->id;
    }
}
