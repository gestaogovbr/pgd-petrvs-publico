<?php

declare(strict_types=1);

namespace App\Repository\CadeiaValor\Contracts;

use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use Illuminate\Database\Eloquent\Collection;

interface CadeiaValorReadRepositoryContract
{
    public function findCadeiaValor(string $id): ?CadeiaValor;

    public function findProcesso(string $processoId, string $cadeiaValorId): ?CadeiaValorProcesso;

    /** @return Collection<int, CadeiaValorProcesso> */
    public function listarProcessosPorCadeia(string $cadeiaValorId): Collection;

    /**
     * @param list<string> $processoIds
     * @return list<\stdClass> Colunas: processo_origem_id, processo_id, processo_nome, cadeia_valor_id, cadeia_valor_nome
     */
    public function buscarVinculosCrossCadeia(array $processoIds, string $cadeiaValorIdAtual): array;

    /**
     * @param list<string> $processoIds
     * @return array<string, int> Mapa processo_id → contagem
     */
    public function contarVinculosPorProcesso(array $processoIds): array;

    /**
     * Retorna dados gerais do processo para o painel: nome e nível.
     *
     * @return \stdClass{processo_id: string, processo_nome: string, nivel: int}
     */
    public function buscarDadosGeraisPainel(string $processoId, string $cadeiaValorId): \stdClass;

    /**
     * Retorna IDs do processo informado + todos os descendentes recursivamente.
     *
     * @return list<string>
     */
    public function coletarIdsFilhosRecursivo(string $processoId): array;

}
