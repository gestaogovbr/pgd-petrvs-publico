<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Exceptions\NotFoundException;
use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoGraphDataProvider;
use App\V2\ArvoreInstitucional\DTOs\ArvoreResponseDTO;

class CadeiaValorArvoreService
{
    public function __construct(
        private readonly CadeiaValorReadRepositoryContract $repository,
        private readonly ArvoreInstitucionalEsforcoGraphDataProvider $esforcoGraphDataProvider,
    ) {}

    /**
     * Retorna todos os processos da cadeia de valor como mapa de nós genérico (ArvoreResponseDTO).
     * O front-end controla a janela de visualização (levelsAbove/Below).
     */
    public function getArvore(string $cadeiaValorId, string $processoId): ArvoreResponseDTO
    {
        $cadeiaValor = $this->repository->findCadeiaValor($cadeiaValorId);
        if (!$cadeiaValor instanceof CadeiaValor) {
            throw new NotFoundException("Cadeia de valor com id '{$cadeiaValorId}' não encontrada.");
        }

        $processoFocal = $this->repository->findProcesso($processoId, $cadeiaValorId);
        if (!$processoFocal instanceof CadeiaValorProcesso) {
            throw new NotFoundException("Processo com id '{$processoId}' não encontrado na cadeia de valor.");
        }

        $esforcoMap = $this->esforcoGraphDataProvider->carregarEsforcoAcumulado(CadeiaValorNoConfig::get(), containerId: $cadeiaValorId);

        return ArvoreResponseDTO::fromMapa($processoId, $esforcoMap, [
            'cadeia_valor_id' => $cadeiaValorId,
            'cadeia_valor_nome' => $cadeiaValor->nome,
        ]);
    }

}
