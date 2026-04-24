<?php

declare(strict_types=1);

namespace App\Repository\EnvioUsuario\Eloquent;

use App\Models\Usuario;
use App\Repository\EnvioUsuario\Contracts\EnvioUsuarioReadRepositoryContract;
use App\Repository\UnidadeRepository;
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
                . ' LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id)'
                . ' WHERE where_lotacoes.usuario_id = u.id AND ('.$areasTrabalhoWhere.'))';
        }

        $where = $data['where'] ?? [];

        foreach ($where as $condition) {
            if (!is_array($condition) || count($condition) !== 3) {
                continue;
            }

            $field = $condition[0];
            $operator = $condition[1];
            $value = $condition[2];

            if ($field === 'cpf' && $operator === 'like') {
                $sql .= ' AND u.cpf LIKE ?';
                $params[] = $value;
                continue;
            }

            if ($field === 'nome' && $operator === 'like') {
                $sql .= ' AND u.nome LIKE ?';
                $params[] = $value;
                continue;
            }

            if ($field === 'data_agendamento_envio') {
                if ($value === null && in_array($operator, ['=', '=='], true)) {
                    $sql .= ' AND u.data_agendamento_envio IS NULL';
                    continue;
                }

                if ($value === null && in_array($operator, ['!=', '<>'], true)) {
                    $sql .= ' AND u.data_agendamento_envio IS NOT NULL';
                    continue;
                }

                if (in_array($operator, ['>=', '<'], true)) {
                    $sql .= ' AND u.data_agendamento_envio '.$this->convertOperator($operator).' ?';
                    $params[] = $value;
                }

                continue;
            }

            if ($field === 'data_conclusao_envio' && in_array($operator, ['>=', '<'], true)) {
                $sql .= ' AND u.data_conclusao_envio '.$this->convertOperator($operator).' ?';
                $params[] = $value;
                continue;
            }

            if ($field === 'data_envio_api_pgd') {
                if ($value === null && in_array($operator, ['=', '=='], true)) {
                    $sql .= ' AND u.data_envio_api_pgd IS NULL';
                    continue;
                }

                if ($value === null && in_array($operator, ['!=', '<>'], true)) {
                    $sql .= ' AND u.data_envio_api_pgd IS NOT NULL';
                    continue;
                }

                if (in_array($operator, ['>=', '<'], true)) {
                    $sql .= ' AND u.data_envio_api_pgd '.$this->convertOperator($operator).' ?';
                    $params[] = $value;
                }

                continue;
            }

            if ($field === 'envio_com_falha') {
                $sql .= " AND u.data_agendamento_envio IS NOT NULL"
                    . " AND u.log_envio IS NOT NULL"
                    . " AND u.log_envio <> 'Envio realizado com sucesso.'";
                continue;
            }

            if ($field === 'log_envio') {
                $sql .= ' AND u.log_envio IS NOT NULL';
                continue;
            }

            if ($field === 'envios_pendentes' && in_array($operator, ['=', '=='], true) && ($value === 1 || $value === '1' || $value === true)) {
                $sql .= ' AND (u.data_agendamento_envio IS NOT NULL'
                    . ' AND (u.data_conclusao_envio IS NULL OR u.data_conclusao_envio < u.data_agendamento_envio))';
                continue;
            }

            if ($field === 'envios_concluidos' && in_array($operator, ['=', '=='], true) && ($value === 1 || $value === '1' || $value === true)) {
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

    private function convertOperator(string $operator): string
    {
        return $operator === "==" ? "=" : $operator;
    }
}
