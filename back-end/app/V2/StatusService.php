<?php

declare(strict_types=1);

namespace App\V2;

use App\Models\Atividade;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\StatusJustificativaRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class StatusService
{
    private const FK_MAP = [
        PlanoTrabalho::class => 'plano_trabalho_id',
        PlanoTrabalhoConsolidacao::class => 'plano_trabalho_consolidacao_id',
        Atividade::class => 'atividade_id',
    ];

    public function __construct(
        private readonly StatusJustificativaRepository $statusRepository,
    ) {}

    public function atualizaStatus(Model $entity, string $novoStatus, string $justificativa): void
    {
        $fkColumn = $this->resolveFkColumn($entity);

        if ($fkColumn === null) {
            return;
        }

        $this->statusRepository->create([
            'codigo' => $novoStatus,
            'justificativa' => $justificativa,
            'usuario_id' => Auth::id(),
            $fkColumn => $entity->id,
        ]);

        $entity->status = $novoStatus;
        // TODO: $entity->save() é operação Eloquent direta, contraditório com o uso de repository.
        // O campo `status` não está em $fillable dos models, então não pode ser atualizado via repository->update().
        // Solução: criar método `updateStatus(string $id, string $status)` em cada WriteRepository que faça a atribuição direta.
        $entity->save();
    }

    private function resolveFkColumn(Model $entity): ?string
    {
        foreach (self::FK_MAP as $class => $column) {
            if ($entity instanceof $class) {
                return $column;
            }
        }

        return null;
    }
}
