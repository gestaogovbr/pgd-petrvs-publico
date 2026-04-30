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

        if (($cpf = $this->extractWhere($where, 'cpf')) !== null) {
            $cpfFilter = trim((string) ($cpf[1] ?? ''));
            if ($cpfFilter !== '') {
                $sql .= ' AND u.cpf LIKE ?';
                $params[] = '%'.str_replace(' ', '%', $cpfFilter).'%';
            }
        }

        if (($nome = $this->extractWhere($where, 'nome')) !== null) {
            $nomeFilter = trim((string) ($nome[1] ?? ''));
            if ($nomeFilter !== '') {
                $sql .= ' AND u.nome LIKE ?';
                $params[] = '%'.str_replace(' ', '%', $nomeFilter).'%';
            }
        }

        if (($filtro = $this->extractWhere($where, 'isNaoAgendado')) !== null) {
            $condicao = $filtro[1] ?? false;
            if ($condicao === true || $condicao === 1 || $condicao === '1') {
                $sql .= ' AND u.data_agendamento_envio IS NULL';
            }
        }

        if (($filtro = $this->extractWhere($where, 'isAgendado')) !== null) {
            $condicao = $filtro[1] ?? false;
            if ($condicao === true || $condicao === 1 || $condicao === '1') {
                $sql .= ' AND u.data_agendamento_envio IS NOT NULL';
            }
        }

        if (($filtro = $this->extractWhere($where, 'data_agendamento_envio_gte')) !== null) {
            $value = (string) ($filtro[1] ?? '');
            if ($value !== '') {
                $sql .= ' AND u.data_agendamento_envio >= ?';
                $params[] = $value;
            }
        }

        if (($filtro = $this->extractWhere($where, 'data_agendamento_envio_lte')) !== null) {
            $value = trim((string) ($filtro[1] ?? ''));
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $sql .= ' AND u.data_agendamento_envio < ?';
                $params[] = $fimAjustado;
            }
        }

        if (($filtro = $this->extractWhere($where, 'data_conclusao_envio_gte')) !== null) {
            $value = (string) ($filtro[1] ?? '');
            if ($value !== '') {
                $sql .= ' AND u.data_conclusao_envio >= ?';
                $params[] = $value;
            }
        }

        if (($filtro = $this->extractWhere($where, 'data_conclusao_envio_lte')) !== null) {
            $value = trim((string) ($filtro[1] ?? ''));
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $sql .= ' AND u.data_conclusao_envio < ?';
                $params[] = $fimAjustado;
            }
        }

        if (($filtro = $this->extractWhere($where, 'isEnviado')) !== null) {
            $condicao = $filtro[1] ?? false;
            if ($condicao === true || $condicao === 1 || $condicao === '1') {
                $sql .= ' AND u.data_envio_api_pgd IS NOT NULL';
            }
        }

        if (($filtro = $this->extractWhere($where, 'isNaoEnviado')) !== null) {
            $condicao = $filtro[1] ?? false;
            if ($condicao === true || $condicao === 1 || $condicao === '1') {
                $sql .= ' AND u.data_envio_api_pgd IS NULL';
            }
        }

        if (($filtro = $this->extractWhere($where, 'data_envio_api_pgd_gte')) !== null) {
            $value = (string) ($filtro[1] ?? '');
            if ($value !== '') {
                $sql .= ' AND u.data_envio_api_pgd >= ?';
                $params[] = $value;
            }
        }

        if (($filtro = $this->extractWhere($where, 'data_envio_api_pgd_lte')) !== null) {
            $value = trim((string) ($filtro[1] ?? ''));
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $sql .= ' AND u.data_envio_api_pgd < ?';
                $params[] = $fimAjustado;
            }
        }

        if (($filtro = $this->extractWhere($where, 'isFalha')) !== null) {
            $condicao = $filtro[1] ?? false;
            if ($condicao === true || $condicao === 1 || $condicao === '1') {
                $sql .= " AND u.data_agendamento_envio IS NOT NULL"
                    ." AND u.log_envio IS NOT NULL"
                    ." AND u.log_envio <> 'Envio realizado com sucesso.'";
            }
        }

        if ($this->extractWhere($where, 'log_envio') !== null) {
            $sql .= ' AND u.log_envio IS NOT NULL';
        }

        if (($filtro = $this->extractWhere($where, 'isPendente')) !== null) {
            $condicao = $filtro[1] ?? false;
            if ($condicao === true || $condicao === 1 || $condicao === '1') {
                $sql .= ' AND (u.data_agendamento_envio IS NOT NULL'
                    .' AND (u.data_conclusao_envio IS NULL OR u.data_conclusao_envio < u.data_agendamento_envio))';
            }
        }

        if (($filtro = $this->extractWhere($where, 'isConcluido')) !== null) {
            $condicao = $filtro[1] ?? false;
            if ($condicao === true || $condicao === 1 || $condicao === '1') {
                $sql .= ' AND u.data_conclusao_envio IS NOT NULL';
            }
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
     * @param  array<int, mixed>  $where
     * @return array<int, mixed>|null
     */
    private function extractWhere(array &$where, string $field): ?array
    {
        $result = null;
        $kept = [];
        foreach ($where as $condition) {
            if (is_array($condition) && ($condition[0] ?? null) == $field) {
                $result = $condition;
            } else {
                $kept[] = $condition;
            }
        }
        if ($result !== null) {
            $where = $kept;
        }

        return $result;
    }
}
