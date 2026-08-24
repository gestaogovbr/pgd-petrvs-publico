<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalAbrangencia;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalAbrangenciaPolicy;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoSupport;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelAssembler;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregasDetalhamentoDTO;
use App\V2\CadeiaValor\Validators\CadeiaValorProcessoValidator;

class CadeiaValorEntregasService
{
    public function __construct(
        private readonly CadeiaValorReadRepositoryContract $repository,
        private readonly ArvoreInstitucionalPainelAssembler $painelAssembler,
        private readonly CadeiaValorProcessoValidator $validator,
        private readonly ArvoreInstitucionalAbrangenciaPolicy $abrangenciaPolicy,
    ) {}

    /**
     * Retorna dados inline das entregas vinculadas ao processo, com filtros opcionais e abrangência.
     *
     * @param array{unidade_id?: string|null, plano_entrega_entrega_id?: string|null, data_inicio?: string|null, data_fim?: string|null, abrangencia?: string|null} $filtros
     */
    public function getEntregas(string $cadeiaValorId, string $processoId, array $filtros = []): CadeiaValorPainelEntregasDetalhamentoDTO
    {
        $this->validator->validar($cadeiaValorId, $processoId);

        [$processoIds, $unidadeIds] = $this->abrangenciaPolicy->resolver(
            $processoId,
            $filtros['unidade_id'] ?? null,
            ArvoreInstitucionalAbrangencia::tryFrom($filtros['abrangencia'] ?? ''),
            fn (string $id) => $this->repository->coletarIdsFilhosRecursivo($id),
        );

        $filtrosQuery = [
            'unidade_id' => null,
            'plano_entrega_entrega_id' => $filtros['plano_entrega_entrega_id'] ?? null,
            'data_inicio' => $filtros['data_inicio'] ?? null,
            'data_fim' => $filtros['data_fim'] ?? null,
        ];

        if ($unidadeIds !== null) {
            $filtrosQuery['unidade_ids'] = $unidadeIds;
        } elseif (!empty($filtros['unidade_id'])) {
            $filtrosQuery['unidade_id'] = $filtros['unidade_id'];
        }

        $rows = $this->repository->listarDetalhamentoEntregasPainelMultiplos($processoIds, $filtrosQuery);

        $itens = [];
        foreach ($rows as $row) {
            $peStatus = (string) $row->plano_entrega_status;
            $temPtPactuado = (bool) ($row->tem_pt_pactuado ?? false);
            $temPtConcluido = (bool) ($row->tem_pt_concluido ?? false);
            $vis = ArvoreInstitucionalEsforcoSupport::visibilidadeEsforco($peStatus, $temPtPactuado, $temPtConcluido);

            $itens[] = $this->painelAssembler->montarLinha($row, $vis);
        }

        $filtrosExtraidos = $this->painelAssembler->extrairFiltros($rows);

        return new CadeiaValorPainelEntregasDetalhamentoDTO(
            processo_id: $processoId,
            itens: $itens,
            filtro_entregas: $filtrosExtraidos['filtro_entregas'],
            filtro_unidades: $filtrosExtraidos['filtro_unidades'],
        );
    }
}
