<?php

declare(strict_types=1);

namespace App\Repository\DispensaPlanoTrabalho\Contracts;

use App\Models\DispensaPlanoTrabalho;
use App\Models\DispensaPlanoTrabalhoHistorico;
use Carbon\Carbon;

/**
 * @see \App\Repository\DispensaPlanoTrabalho\Eloquent\EloquentDispensaPlanoTrabalhoWriteRepository
 */
interface DispensaPlanoTrabalhoWriteRepositoryContract
{
    /**
     * @param  array{
     *     usuario_id: string,
     *     data_inicio: string,
     *     data_fim: string|null,
     *     ciencia_em: Carbon|string,
     *     responsavel_id: string
     * }  $attributes
     */
    public function create(array $attributes): DispensaPlanoTrabalho;

    /**
     * @param  array{
     *     data_inicio?: string,
     *     data_fim?: string|null,
     *     ciencia_em?: Carbon|string,
     *     responsavel_id?: string
     * }  $attributes
     */
    public function atualizar(DispensaPlanoTrabalho $dispensa, array $attributes): DispensaPlanoTrabalho;

    /**
     * @param  array{
     *     dispensa_id: string,
     *     usuario_id: string,
     *     data_inicio: mixed,
     *     data_fim: mixed,
     *     operacao: string,
     *     ciencia_em: Carbon|string,
     *     responsavel_id: string
     * }  $attributes
     */
    public function createHistorico(array $attributes): DispensaPlanoTrabalhoHistorico;
}
