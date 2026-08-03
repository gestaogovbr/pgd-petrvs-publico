<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Exceptions\NotFoundException;
use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelResumoDTO;

class CadeiaValorResumoService
{
    public function __construct(
        private readonly CadeiaValorReadRepositoryContract $repository,
        private readonly CadeiaValorPainelAssembler $assembler,
    ) {}

    /**
     * Retorna os dados agregados do painel lateral para um processo da cadeia de valor.
     */
    public function getResumo(string $cadeiaValorId, string $processoId, ?string $unidadeId = null): CadeiaValorPainelResumoDTO
    {
        $this->validarProcesso($cadeiaValorId, $processoId);

        $geral = $this->repository->buscarDadosGeraisPainel($processoId, $cadeiaValorId);
        $agg = $this->repository->agregarPainelEsforcoPessoasEntregas($processoId, $unidadeId);
        $filtroUnidades = $this->repository->listarFiltroUnidadesPainel($processoId);

        return $this->assembler->montarResumo($geral, $agg, $filtroUnidades);
    }

    private function validarProcesso(string $cadeiaValorId, string $processoId): void
    {
        $cadeiaValor = $this->repository->findCadeiaValor($cadeiaValorId);
        if (!$cadeiaValor instanceof CadeiaValor) {
            throw new NotFoundException("Cadeia de valor com id '{$cadeiaValorId}' não encontrada.");
        }

        $processo = $this->repository->findProcesso($processoId, $cadeiaValorId);
        if (!$processo instanceof CadeiaValorProcesso) {
            throw new NotFoundException("Processo com id '{$processoId}' não encontrado na cadeia de valor.");
        }
    }
}
