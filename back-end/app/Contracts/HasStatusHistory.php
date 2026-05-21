<?php

declare(strict_types=1);

namespace App\Contracts;

/**
 * Models que possuem status e podem ter transições registradas via StatusService.
 *
 * Modelos permitidos: PlanoEntrega, PlanoTrabalho, PlanoTrabalhoConsolidacao, Atividade, Usuario.
 */
interface HasStatusHistory
{
    /**
     * Nome da coluna FK na tabela status_justificativas para este model.
     */
    public function getStatusFkColumn(): string;
}
