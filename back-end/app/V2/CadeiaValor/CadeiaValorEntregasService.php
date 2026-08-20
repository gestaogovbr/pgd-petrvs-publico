<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Exceptions\NotFoundException;
use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregasDetalhamentoDTO;

class CadeiaValorEntregasService
{
    public function __construct(
        private readonly CadeiaValorReadRepositoryContract $repository,
        private readonly CadeiaValorPainelAssembler $assembler,
    ) {}

    /**
     * Retorna dados inline das entregas vinculadas ao processo, com filtros opcionais.
     * Cada linha já inclui participantes, esforço, flags e registro de execução.
     *
     * @param array{unidade_id?: string|null, plano_entrega_entrega_id?: string|null, data_inicio?: string|null, data_fim?: string|null} $filtros
     */
    public function getEntregas(string $cadeiaValorId, string $processoId, array $filtros = []): CadeiaValorPainelEntregasDetalhamentoDTO
    {
        $this->validarProcesso($cadeiaValorId, $processoId);

        $rows = $this->repository->listarDetalhamentoEntregasPainel($processoId, $filtros);
        $filtroUnidades = $this->repository->listarFiltroUnidadesPainel($processoId);
        $filtroEntregas = $this->repository->listarFiltroEntregasPainel($processoId);

        return $this->assembler->montarDetalhamento($processoId, $rows, $filtroUnidades, $filtroEntregas);
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
