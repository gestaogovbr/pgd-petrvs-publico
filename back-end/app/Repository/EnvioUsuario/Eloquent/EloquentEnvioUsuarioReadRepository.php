<?php

declare(strict_types=1);

namespace App\Repository\EnvioUsuario\Eloquent;

use App\Models\Usuario;
use App\Repository\EnvioUsuario\Contracts\EnvioUsuarioReadRepositoryContract;
use App\Repository\UnidadeRepository;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class EloquentEnvioUsuarioReadRepository implements EnvioUsuarioReadRepositoryContract
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository
    ) {
    }

    public function query(array $data, Usuario $requestUser): array
    {
        $query = $this->baseQuery($requestUser);
        $this->applyFiltros($query, $data);

        $count = (clone $query)->count();

        $query
            ->orderByDesc('u.data_agendamento_envio')
            ->orderBy('u.id');

        $limit = (int) ($data['limit'] ?? 0);
        $page = max((int) ($data['page'] ?? 1), 1);
        if ($limit > 0) {
            $query->forPage($page, $limit);
        }

        return [
            'count' => $count,
            'rows' => collect($query->get()),
        ];
    }

    private function baseQuery(Usuario $requestUser): Builder
    {
        $query = DB::table('usuarios as u')
            ->select([
                'u.id',
                'u.cpf',
                'u.nome',
                'u.matricula',
                'u.updated_at',
                'u.data_agendamento_envio',
                'u.data_tentativa_envio',
                'u.data_conclusao_envio',
                'u.data_envio_api_pgd',
                'u.log_envio',
            ])
            ->whereNull('u.deleted_at');

        if (!$requestUser->hasPermissionTo('MOD_USER_TUDO')) {
            $areasTrabalhoWhere = $this->unidadeRepository->getAreasTrabalhoWhereClause($requestUser->id, true, 'where_unidades');
            $query->whereExists(function (Builder $q) use ($areasTrabalhoWhere): void {
                $q->select(DB::raw(1))
                    ->from('lotacoes as where_lotacoes')
                    ->leftJoin('unidades as where_unidades', 'where_unidades.id', '=', 'where_lotacoes.unidade_id')
                    ->whereColumn('where_lotacoes.usuario_id', 'u.id')
                    ->whereRaw('('.$areasTrabalhoWhere.')');
            });
        }

        return $query;
    }

    private function applyFiltros(Builder $query, array $data): void
    {
        $where = $data['where'] ?? [];

        if (($cpfFilter = $this->getFiltro($where, 'cpf')) !== null) {
            $cpfFilter = trim((string) $cpfFilter);
            if ($cpfFilter !== '') {
                $query->where('u.cpf', 'like', '%'.str_replace(' ', '%', $cpfFilter).'%');
            }
        }

        if (($nomeFilter = $this->getFiltro($where, 'nome')) !== null) {
            $nomeFilter = trim((string) $nomeFilter);
            if ($nomeFilter !== '') {
                $query->where('u.nome', 'like', '%'.str_replace(' ', '%', $nomeFilter).'%');
            }
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isNaoAgendado'))) {
            $query->whereNull('u.data_agendamento_envio');
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isAgendado'))) {
            $query->whereNotNull('u.data_agendamento_envio');
        }

        if (($value = $this->getFiltro($where, 'data_agendamento_envio_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $query->where('u.data_agendamento_envio', '>=', $value);
            }
        }

        if (($value = $this->getFiltro($where, 'data_agendamento_envio_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $query->where('u.data_agendamento_envio', '<', $fimAjustado);
            }
        }

        if (($value = $this->getFiltro($where, 'updated_at_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $query->where('u.updated_at', '>=', $value);
            }
        }

        if (($value = $this->getFiltro($where, 'updated_at_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $query->where('u.updated_at', '<', $fimAjustado);
            }
        }

        if (($value = $this->getFiltro($where, 'data_conclusao_envio_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $query->where('u.data_conclusao_envio', '>=', $value);
            }
        }

        if (($value = $this->getFiltro($where, 'data_conclusao_envio_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $query->where('u.data_conclusao_envio', '<', $fimAjustado);
            }
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isEnviado'))) {
            $query->whereNotNull('u.data_envio_api_pgd');
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isNaoEnviado'))) {
            $query->whereNull('u.data_envio_api_pgd');
        }

        if (($value = $this->getFiltro($where, 'data_envio_api_pgd_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $query->where('u.data_envio_api_pgd', '>=', $value);
            }
        }

        if (($value = $this->getFiltro($where, 'data_envio_api_pgd_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $query->where('u.data_envio_api_pgd', '<', $fimAjustado);
            }
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isFalha'))) {
            $query
                ->whereNotNull('u.data_agendamento_envio')
                ->whereNotNull('u.log_envio')
                ->where('u.log_envio', '<>', 'Envio realizado com sucesso.');
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isPendente'))) {
            $query->where(function (Builder $q): void {
                $q->whereNotNull('u.data_agendamento_envio')
                    ->where(function (Builder $q2): void {
                        $q2->whereNull('u.data_conclusao_envio')
                            ->orWhereColumn('u.data_conclusao_envio', '<', 'u.data_agendamento_envio');
                    });
            });
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isConcluido'))) {
            $query->whereNotNull('u.data_conclusao_envio');
        }
    }

    /**
     * Se existir condição com `$field` no índice 0, devolve o valor no índice 1 (última ocorrência).
     */
    private function getFiltro(array $where, string $field): mixed
    {
        $value = null;
        $found = false;
        foreach ($where as $condition) {
            if (is_array($condition) && ($condition[0] ?? null) == $field) {
                $found = true;
                $value = $condition[1] ?? null;
            }
        }

        return $found ? $value : null;
    }

    private function isFiltroValido(mixed $value): bool
    {
        return $value === true || $value === 1 || $value === '1';
    }
}
