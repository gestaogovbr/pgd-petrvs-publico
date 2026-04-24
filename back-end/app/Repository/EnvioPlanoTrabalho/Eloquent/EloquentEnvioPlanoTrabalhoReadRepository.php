<?php

declare(strict_types=1);

namespace App\Repository\EnvioPlanoTrabalho\Eloquent;

use App\Repository\EnvioPlanoTrabalho\Contracts\EnvioPlanoTrabalhoReadRepositoryContract;
use Illuminate\Support\Facades\DB;

class EloquentEnvioPlanoTrabalhoReadRepository implements EnvioPlanoTrabalhoReadRepositoryContract
{
    public function query(array $data): array
    {
        $sql = <<<SQL
            SELECT
                pt.id,
                pt.numero,
                pt.data_inicio,
                pt.data_fim,
                pt.updated_at,
                pt.data_agendamento_envio,
                pt.data_tentativa_envio,
                pt.data_conclusao_envio,
                pt.data_envio_api_pgd,
                pt.log_envio,
                u.id AS unidade_id,
                u.sigla AS unidade_sigla,
                p.id AS programa_id,
                p.nome AS programa_nome
            FROM planos_trabalhos pt
            LEFT JOIN unidades u ON u.id = pt.unidade_id AND u.deleted_at IS NULL
            LEFT JOIN programas p ON p.id = pt.programa_id AND p.deleted_at IS NULL
            WHERE pt.deleted_at IS NULL
        SQL;

        $params = [];
        $where = $data['where'] ?? [];

        foreach ($where as $condition) {
            if (!is_array($condition) || count($condition) !== 3) {
                continue;
            }

            $field = $condition[0];
            $operator = $condition[1];
            $value = $condition[2];

            if ($field === 'numero' && $operator === 'like') {
                $sql .= ' AND pt.numero LIKE ?';
                $params[] = $value;
                continue;
            }

            if ($field === 'unidade_id' && in_array($operator, ['=', '=='], true)) {
                $sql .= ' AND pt.unidade_id = ?';
                $params[] = $value;
                continue;
            }

            if ($field === 'data_agendamento_envio') {
                if ($value === null && in_array($operator, ['=', '=='], true)) {
                    $sql .= ' AND pt.data_agendamento_envio IS NULL';
                    continue;
                }

                if ($value === null && in_array($operator, ['!=', '<>'], true)) {
                    $sql .= ' AND pt.data_agendamento_envio IS NOT NULL';
                    continue;
                }

                if (in_array($operator, ['>=', '<'], true)) {
                    $sql .= ' AND pt.data_agendamento_envio '.$this->convertOperator($operator).' ?';
                    $params[] = $value;
                }

                continue;
            }

            if ($field === 'data_conclusao_envio' && in_array($operator, ['>=', '<'], true)) {
                $sql .= ' AND pt.data_conclusao_envio '.$this->convertOperator($operator).' ?';
                $params[] = $value;
                continue;
            }

            if ($field === 'data_envio_api_pgd') {
                if ($value === null && in_array($operator, ['=', '=='], true)) {
                    $sql .= ' AND pt.data_envio_api_pgd IS NULL';
                    continue;
                }

                if ($value === null && in_array($operator, ['!=', '<>'], true)) {
                    $sql .= ' AND pt.data_envio_api_pgd IS NOT NULL';
                    continue;
                }

                if (in_array($operator, ['>=', '<'], true)) {
                    $sql .= ' AND pt.data_envio_api_pgd '.$this->convertOperator($operator).' ?';
                    $params[] = $value;
                }

                continue;
            }

            if ($field === 'envio_com_falha') {
                $sql .= " AND pt.data_agendamento_envio IS NOT NULL"
                    . " AND pt.log_envio IS NOT NULL"
                    . " AND pt.log_envio <> 'Envio realizado com sucesso.'";
                continue;
            }

            if ($field === 'log_envio') {
                $sql .= ' AND pt.log_envio IS NOT NULL';
                continue;
            }

            if ($field === 'envios_pendentes' && in_array($operator, ['=', '=='], true) && ($value === 1 || $value === '1' || $value === true)) {
                $sql .= ' AND (pt.data_agendamento_envio IS NOT NULL'
                    . ' AND (pt.data_conclusao_envio IS NULL OR pt.data_conclusao_envio < pt.data_agendamento_envio))';
            }
        }

        $countResult = DB::select("SELECT COUNT(*) AS total FROM ($sql) envio_pt", $params);
        $count = (int) ($countResult[0]->total ?? 0);

        $sql .= ' ORDER BY pt.data_agendamento_envio DESC, pt.id ASC';

        $limit = (int) ($data['limit'] ?? 0);
        $page = max((int) ($data['page'] ?? 1), 1);
        if ($limit > 0) {
            $offset = ($page - 1) * $limit;
            $sql .= " LIMIT $limit OFFSET $offset";
        }

        $rows = collect(DB::select($sql, $params))->map(function ($row) {
            $row->unidade = (object) [
                'id' => $row->unidade_id,
                'sigla' => $row->unidade_sigla,
            ];
            $row->programa = (object) [
                'id' => $row->programa_id,
                'nome' => $row->programa_nome,
            ];

            unset($row->unidade_id, $row->unidade_sigla, $row->programa_id, $row->programa_nome);
            return $row;
        });

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
