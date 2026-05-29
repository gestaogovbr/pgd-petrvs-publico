<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacao\Contracts;

use App\DTOs\PlanoTrabalho\PlanoTrabalhoConsolidacaoDataDTO;
use App\Models\PlanoTrabalhoConsolidacao;
use App\V2\PlanoTrabalho\DTOs\ResumoConsolidacoesDTO;

interface PlanoTrabalhoConsolidacaoReadRepositoryContract
{
    public function getConsolidacaoData(string $id): ?PlanoTrabalhoConsolidacaoDataDTO;

    public function findConsolidacaoById(string $id): ?PlanoTrabalhoConsolidacao;

    public function findAllByPlanoTrabalhoId(string $planoTrabalhoId): \Illuminate\Database\Eloquent\Collection;

    public function findAllByPlanoTrabalhoIdAndPeriodo(string $planoTrabalhoId, string $dataInicio, string $dataFim): \Illuminate\Database\Eloquent\Collection;

    public function getPendentesAvaliacao(
        array $unidadesGerenciadasIds,
        array $unidadesSubordinadasIds,
        string $usuarioId,
        \DateTimeInterface $dataCorte
    ): \Illuminate\Database\Eloquent\Collection;

    public function resumoParaArquivamento(string $planoTrabalhoId, \DateTimeInterface $limiteRecurso): ResumoConsolidacoesDTO;

    public function possuiConsolidacaoFinalizadaPorPlano(string $planoTrabalhoId): bool;

    public function findAvaliadasComPrazoRecurso(string $usuarioId, int $prazoDias): \Illuminate\Database\Eloquent\Collection;
}
