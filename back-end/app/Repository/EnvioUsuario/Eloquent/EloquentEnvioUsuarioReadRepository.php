<?php

declare(strict_types=1);

namespace App\Repository\EnvioUsuario\Eloquent;

use App\Models\Usuario;
use App\Repository\EnvioUsuario\Contracts\EnvioUsuarioReadRepositoryContract;
use App\Repository\UnidadeRepository;
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
        $sql = <<<SQL
            SELECT
                u.id,
                u.cpf,
                u.nome,
                u.matricula,
                u.updated_at,
                u.data_agendamento_envio,
                u.data_tentativa_envio,
                u.data_conclusao_envio,
                u.data_envio_api_pgd,
                u.log_envio
            FROM usuarios u
            WHERE u.deleted_at IS NULL
        SQL;

        $params = [];

        if (!$requestUser->hasPermissionTo('MOD_USER_TUDO')) {
            $areasTrabalhoWhere = $this->unidadeRepository->getAreasTrabalhoWhereClause($requestUser->id, true, 'where_unidades');
            $sql .= " AND EXISTS (SELECT where_lotacoes.id FROM lotacoes where_lotacoes"
                .' LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id)'
                .' WHERE where_lotacoes.usuario_id = u.id AND ('.$areasTrabalhoWhere.'))';
        }

        $where = $data['where'] ?? [];

        if (($cpfFilter = $this->getFiltro($where, 'cpf')) !== null) {
            $cpfFilter = trim((string) $cpfFilter);
            if ($cpfFilter !== '') {
                $sql .= ' AND u.cpf LIKE ?';
                $params[] = '%'.str_replace(' ', '%', $cpfFilter).'%';
            }
        }

        if (($nomeFilter = $this->getFiltro($where, 'nome')) !== null) {
            $nomeFilter = trim((string) $nomeFilter);
            if ($nomeFilter !== '') {
                $sql .= ' AND u.nome LIKE ?';
                $params[] = '%'.str_replace(' ', '%', $nomeFilter).'%';
            }
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isNaoAgendado'))) {
            $sql .= ' AND u.data_agendamento_envio IS NULL';
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isAgendado'))) {
            $sql .= ' AND u.data_agendamento_envio IS NOT NULL';
        }

        if (($value = $this->getFiltro($where, 'data_agendamento_envio_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $sql .= ' AND u.data_agendamento_envio >= ?';
                $params[] = $value;
            }
        }

        if (($value = $this->getFiltro($where, 'data_agendamento_envio_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $sql .= ' AND u.data_agendamento_envio < ?';
                $params[] = $fimAjustado;
            }
        }

        if (($value = $this->getFiltro($where, 'data_conclusao_envio_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $sql .= ' AND u.data_conclusao_envio >= ?';
                $params[] = $value;
            }
        }

        if (($value = $this->getFiltro($where, 'data_conclusao_envio_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $sql .= ' AND u.data_conclusao_envio < ?';
                $params[] = $fimAjustado;
            }
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isEnviado'))) {
            $sql .= ' AND u.data_envio_api_pgd IS NOT NULL';
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isNaoEnviado'))) {
            $sql .= ' AND u.data_envio_api_pgd IS NULL';
        }

        if (($value = $this->getFiltro($where, 'data_envio_api_pgd_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $sql .= ' AND u.data_envio_api_pgd >= ?';
                $params[] = $value;
            }
        }

        if (($value = $this->getFiltro($where, 'data_envio_api_pgd_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $sql .= ' AND u.data_envio_api_pgd < ?';
                $params[] = $fimAjustado;
            }
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isFalha'))) {
            $sql .= " AND u.data_agendamento_envio IS NOT NULL"
                ." AND u.log_envio IS NOT NULL"
                ." AND u.log_envio <> 'Envio realizado com sucesso.'";
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isPendente'))) {
            $sql .= ' AND (u.data_agendamento_envio IS NOT NULL'
                .' AND (u.data_conclusao_envio IS NULL OR u.data_conclusao_envio < u.data_agendamento_envio))';
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isConcluido'))) {
            $sql .= ' AND u.data_conclusao_envio IS NOT NULL';
        }

        $countResult = DB::select("SELECT COUNT(*) AS total FROM ($sql) envio_u", $params);
        $count = (int) ($countResult[0]->total ?? 0);

        $sql .= ' ORDER BY u.data_agendamento_envio DESC, u.id ASC';

        $limit = (int) ($data['limit'] ?? 0);
        $page = max((int) ($data['page'] ?? 1), 1);
        if ($limit > 0) {
            $offset = ($page - 1) * $limit;
            $sql .= " LIMIT $limit OFFSET $offset";
        }

        $rows = collect(DB::select($sql, $params));

        return [
            'count' => $count,
            'rows' => $rows,
        ];
    }

    /**
     * Se existir condição com `$field` no índice 0, devolve o valor no índice 1 (última ocorrência).
     * Caso contrário devolve null. Não altera `$where`.
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
