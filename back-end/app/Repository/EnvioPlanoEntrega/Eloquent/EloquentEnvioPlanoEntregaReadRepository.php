<?php

declare(strict_types=1);

namespace App\Repository\EnvioPlanoEntrega\Eloquent;

use App\Repository\EnvioPlanoEntrega\Contracts\EnvioPlanoEntregaReadRepositoryContract;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;

class EloquentEnvioPlanoEntregaReadRepository implements EnvioPlanoEntregaReadRepositoryContract
{
    public function query(array $data): array
    {
        $query = $this->baseQuery();
        $this->applyFiltros($query, $data);

        $count = (clone $query)->count();

        $query
            ->orderByDesc('pe.data_agendamento_envio')
            ->orderBy('pe.id');

        $limit = (int) ($data['limit'] ?? 0);
        $page = max((int) ($data['page'] ?? 1), 1);
        if ($limit > 0) {
            $query->forPage($page, $limit);
        }

        $rows = collect($query->get())->map(function ($row) {
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

    private function baseQuery(): Builder
    {
        return DB::table('planos_entregas as pe')
            ->leftJoin('unidades as u', function ($join): void {
                $join->on('u.id', '=', 'pe.unidade_id')
                    ->whereNull('u.deleted_at');
            })
            ->leftJoin('programas as p', function ($join): void {
                $join->on('p.id', '=', 'pe.programa_id')
                    ->whereNull('p.deleted_at');
            })
            ->select([
                'pe.id',
                'pe.numero',
                'pe.nome',
                'pe.data_inicio',
                'pe.data_fim',
                'pe.updated_at',
                'pe.data_agendamento_envio',
                'pe.data_tentativa_envio',
                'pe.data_conclusao_envio',
                'pe.data_envio_api_pgd',
                'pe.log_envio',
                'u.id as unidade_id',
                'u.sigla as unidade_sigla',
                'p.id as programa_id',
                'p.nome as programa_nome',
            ])
            ->whereNull('pe.deleted_at');
    }

    private function applyFiltros(Builder $query, array $data): void
    {
        $where = $data['where'] ?? [];

        foreach ($where as $condition) {
            if (!is_array($condition) || count($condition) !== 3) {
                continue;
            }

            $field = $condition[0];
            $operator = $condition[1];
            $value = $condition[2];
            $normalizedOperator = $this->convertOperator((string) $operator);

            if ($field === 'numero' && $operator === 'like') {
                $query->where('pe.numero', 'like', $value);
                continue;
            }

            if ($field === 'nome' && $operator === 'like') {
                $query->where('pe.nome', 'like', $value);
                continue;
            }

            if ($field === 'unidade_id' && in_array($operator, ['=', '=='], true)) {
                $query->where('pe.unidade_id', '=', $value);
                continue;
            }

            if ($field === 'data_agendamento_envio') {
                if ($value === null && in_array($operator, ['=', '=='], true)) {
                    $query->whereNull('pe.data_agendamento_envio');
                    continue;
                }

                if ($value === null && in_array($operator, ['!=', '<>'], true)) {
                    $query->whereNotNull('pe.data_agendamento_envio');
                    continue;
                }

                if (in_array($operator, ['>=', '<'], true)) {
                    $query->where('pe.data_agendamento_envio', $normalizedOperator, $value);
                }

                continue;
            }

            if ($field === 'updated_at' && in_array($operator, ['>=', '<'], true)) {
                $query->where('pe.updated_at', $normalizedOperator, $value);
                continue;
            }

            if ($field === 'data_conclusao_envio' && in_array($operator, ['>=', '<'], true)) {
                $query->where('pe.data_conclusao_envio', $normalizedOperator, $value);
                continue;
            }

            if ($field === 'data_envio_api_pgd') {
                if ($value === null && in_array($operator, ['=', '=='], true)) {
                    $query->whereNull('pe.data_envio_api_pgd');
                    continue;
                }

                if ($value === null && in_array($operator, ['!=', '<>'], true)) {
                    $query->whereNotNull('pe.data_envio_api_pgd');
                    continue;
                }

                if (in_array($operator, ['>=', '<'], true)) {
                    $query->where('pe.data_envio_api_pgd', $normalizedOperator, $value);
                }

                continue;
            }

            if ($field === 'envio_com_falha') {
                $query
                    ->whereNotNull('pe.data_agendamento_envio')
                    ->whereNotNull('pe.log_envio')
                    ->where('pe.log_envio', '<>', 'Envio realizado com sucesso.');
                continue;
            }

            if ($field === 'log_envio') {
                $query->whereNotNull('pe.log_envio');
                continue;
            }

            if ($field === 'envios_pendentes' && in_array($operator, ['=', '=='], true) && ($value === 1 || $value === '1' || $value === true)) {
                $query->where(function (Builder $q): void {
                    $q->whereNotNull('pe.data_agendamento_envio')
                        ->where(function (Builder $q2): void {
                            $q2->whereNull('pe.data_conclusao_envio')
                                ->orWhereColumn('pe.data_conclusao_envio', '<', 'pe.data_agendamento_envio');
                        });
                });
            }
        }
    }

    private function convertOperator(string $operator): string
    {
        return $operator === '==' ? '=' : $operator;
    }
}
