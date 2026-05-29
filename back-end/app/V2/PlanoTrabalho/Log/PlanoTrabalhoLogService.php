<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Log;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\Atividade;
use App\Models\Ocorrencia;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\Models\PlanoTrabalhoEntrega;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Services\ChangeService;
use App\V2\PlanoTrabalho\Log\DTOs\PlanoTrabalhoLogIndexDTO;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class PlanoTrabalhoLogService
{
    private const MODELOS_RELACIONADOS = [
        PlanoTrabalho::class,
        PlanoTrabalhoConsolidacao::class,
        PlanoTrabalhoConsolidacaoAfastamento::class,
        PlanoTrabalhoEntrega::class,
        Atividade::class,
        Ocorrencia::class,
    ];

    public function __construct(
        private readonly ChangeService $changeService,
        private readonly PlanoTrabalhoReadRepositoryContract $readRepository,
    ) {}

    public function index(PlanoTrabalhoLogIndexDTO $dto): array
    {
        $this->assertPodeConsultarLogs();

        $plano = $this->readRepository->findById($dto->planoTrabalhoId);
        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        request()->merge([
            'page' => $dto->page,
            'per_page' => $dto->size,
        ]);

        $filters = [
            'auditable_type' => PlanoTrabalho::class,
            'auditable_id' => $dto->planoTrabalhoId,
        ];

        if ($dto->usuarioId !== null) {
            $filters['user_id'] = $dto->usuarioId;
        } elseif ($dto->usuarioNome !== null) {
            $filters['usuario_nome'] = $dto->usuarioNome;
        }

        if ($dto->dataInicio !== null) {
            $filters['date_from'] = $dto->dataInicio;
        }
        if ($dto->dataFim !== null) {
            $filters['date_to'] = $dto->dataFim;
        }
        if ($dto->event !== null) {
            $filters['type'] = $dto->event;
        }
        if ($dto->search !== null) {
            $filters['search'] = $dto->search;
        }

        if ($dto->modelo !== null) {
            $modelClass = $this->resolveModelClass($dto->modelo);
            if ($modelClass === PlanoTrabalho::class) {
                $filters['only_direct_audits'] = true;
            } else {
                $filters['only_related_model'] = $modelClass;
            }
        }

        $result = $this->changeService->query([
            'filters' => $filters,
        ]);

        $rows = collect($result['rows'] ?? [])->map(fn ($audit) => $this->mapAuditRow($audit))->values();

        return [
            'data' => $rows,
            'total' => $result['count'] ?? $rows->count(),
            'current_page' => $result['extra']['current_page'] ?? $dto->page,
            'last_page' => $result['extra']['last_page'] ?? 1,
            'per_page' => $dto->size,
        ];
    }

    /** @return array<int, array{key: string, value: string}> */
    public function modelos(): array
    {
        $this->assertPodeConsultarLogs();

        return collect(self::MODELOS_RELACIONADOS)
            ->map(fn (string $class) => [
                'key' => $class,
                'value' => class_basename($class),
            ])
            ->values()
            ->all();
    }

    private function assertPodeConsultarLogs(): void
    {
        $usuario = Auth::user();
        if ($usuario === null || !$usuario->hasPermissionTo('MOD_AUDIT_LOG')) {
            throw new ForbiddenException('Consulta não realizada.');
        }
    }

    private function resolveModelClass(string $modelo): string
    {
        if (str_contains($modelo, '\\')) {
            return $modelo;
        }

        $resolved = 'App\\Models\\' . $modelo;
        if (!in_array($resolved, self::MODELOS_RELACIONADOS, true)) {
            throw new NotFoundException('Modelo informado não é válido para este plano de trabalho.');
        }

        return $resolved;
    }

    private function mapAuditRow(object $audit): array
    {
        $type = (string) ($audit->auditable_type ?? '');

        return [
            'id' => $audit->id,
            'event' => $audit->event,
            'auditable_type' => class_basename($type),
            'auditable_type_class' => $type,
            'usuario' => $audit->usuario ?? 'Desconhecido',
            'created_at' => $this->resolveCreatedAt($audit),
            'old_values' => $audit->old_values ?? [],
            'new_values' => $audit->new_values ?? [],
        ];
    }

    private function resolveCreatedAt(object $audit): ?string
    {
        $raw = null;

        if ($audit instanceof Model && method_exists($audit, 'getRawOriginal')) {
            $raw = $audit->getRawOriginal('created_at');
        }

        $raw ??= $audit->created_at ?? null;

        if ($raw === null || $raw === '') {
            return null;
        }

        if (is_string($raw) && preg_match('/^\d{2}\/\d{2}\/\d{4}/', $raw)) {
            return $raw;
        }

        return Carbon::parse($raw)
            ->timezone('America/Sao_Paulo')
            ->format('d/m/Y - H:i:s');
    }
}
