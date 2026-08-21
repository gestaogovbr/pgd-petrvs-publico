<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelAssembler;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelResumoDTO;
use App\V2\CadeiaValor\Validators\CadeiaValorProcessoValidator;

class CadeiaValorResumoService
{
    public function __construct(
        private readonly CadeiaValorReadRepositoryContract $repository,
        private readonly ArvoreInstitucionalPainelAssembler $painelAssembler,
        private readonly CadeiaValorProcessoValidator $validator,
    ) {}

    /**
     * Retorna os dados agregados do painel lateral para um processo da cadeia de valor.
     * Inclui seções "item" (só o processo) e "consolidado" (processo + filhos).
     */
    public function getResumo(string $cadeiaValorId, string $processoId, ?string $unidadeId = null): CadeiaValorPainelResumoDTO
    {
        $this->validator->validar($cadeiaValorId, $processoId);

        $geral = $this->repository->buscarDadosGeraisPainel($processoId, $cadeiaValorId);

        $aggItem = $this->repository->agregarPainelEsforcoPessoasEntregas($processoId, $unidadeId);
        $aggConsolidado = $this->repository->agregarPainelConsolidado($processoId, $unidadeId);

        $filtroUnidades = $this->repository->listarFiltroUnidadesPainel($processoId);

        return new CadeiaValorPainelResumoDTO(
            processo_id: (string) $geral->processo_id,
            processo_nome: (string) $geral->processo_nome,
            nivel: (int) $geral->nivel,
            item: $this->painelAssembler->montarSecao($aggItem),
            consolidado: $this->painelAssembler->montarSecao($aggConsolidado),
            filtro_unidades: $filtroUnidades,
        );
    }
}
