<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlackListServidor\Eloquent;

use App\Models\SiapeBlackListServidor;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorReadRepositoryContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\JoinClause;

/**
 * @extends AbstractEloquentReadRepository<SiapeBlackListServidor>
 */
class EloquentSiapeBlackListServidorReadRepository extends AbstractEloquentReadRepository implements SiapeBlackListServidorReadRepositoryContract
{
    public function __construct(SiapeBlackListServidor $model)
    {
        $this->model = $model;
    }

    public function exists(string $cpf, string $matricula): bool
    {
        return $this->model->newQuery()
            ->where('cpf', $cpf)
            ->where('matricula', $matricula)
            ->exists();
    }

    public function existsAnyByCpf(string $cpf): bool
    {
        return $this->model->newQuery()->where('cpf', $cpf)->exists();
    }

    public function cpfsByProcessedStatus(bool $inativado): array
    {
        return $this->model->newQuery()
            ->where('inativado', $inativado)
            ->whereNotNull('cpf')
            ->distinct()
            ->pluck('cpf')
            ->map(static fn (mixed $cpf): string => (string) $cpf)
            ->all();
    }

    public function findAllByCpfForUpdate(string $cpf): Collection
    {
        return $this->model->newQuery()
            ->where('cpf', $cpf)
            ->lockForUpdate()
            ->get();
    }

    public function findAllByCpf(string $cpf): Collection
    {
        return $this->model->newQuery()->where('cpf', $cpf)->get();
    }

    public function applyUsuarioGridJoin(Builder $query): void
    {
        $query->leftJoin('usuarios', function (JoinClause $join): void {
            $join->on('siape_blacklist_servidores.cpf', '=', 'usuarios.cpf')
                ->on('siape_blacklist_servidores.matricula', '=', 'usuarios.matricula')
                ->whereNull('usuarios.deleted_at');
        });
    }

    public function findByCpfAndOptionalMatricula(string $cpf, ?string $matricula = null): ?SiapeBlackListServidor
    {
        $query = $this->model->newQuery()->where('cpf', $cpf);

        if ($matricula) {
            $query->where('matricula', $matricula);
        }

        /** @var SiapeBlackListServidor|null $model */
        $model = $query->first();

        return $model;
    }
}
