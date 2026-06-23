<?php

declare(strict_types=1);

namespace App\V2;

use App\Contracts\HasStatusHistory;
use App\Repository\StatusJustificativaRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class StatusService
{
    public function __construct(
        private readonly StatusJustificativaRepository $statusRepository,
    ) {}

    /**
     * @param HasStatusHistory&Model $entity
     */
    public function atualizaStatus(HasStatusHistory $entity, string $novoStatus, string $justificativa): void
    {
        $this->statusRepository->create([
            'codigo' => $novoStatus,
            'justificativa' => $justificativa,
            'usuario_id' => Auth::id(),
            $entity->getStatusFkColumn() => $entity->getAttribute('id'),
        ]);

        $entity->setAttribute('status', $novoStatus);
        $entity->save();
    }
}
