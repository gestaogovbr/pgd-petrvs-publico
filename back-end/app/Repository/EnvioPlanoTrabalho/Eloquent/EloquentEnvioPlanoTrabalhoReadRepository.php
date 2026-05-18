<?php

declare(strict_types=1);

namespace App\Repository\EnvioPlanoTrabalho\Eloquent;

use App\Repository\EnvioPlanoTrabalho\Contracts\EnvioPlanoTrabalhoReadRepositoryContract;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class EloquentEnvioPlanoTrabalhoReadRepository implements EnvioPlanoTrabalhoReadRepositoryContract
{
    public function query(array $data): array
    {
        $query = $this->baseQuery();
        $this->applyFiltros($query, $data);

        $count = (clone $query)->count();

        $query
            ->orderByDesc('pt.data_agendamento_envio')
            ->orderBy('pt.id');

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
        return DB::table('planos_trabalhos as pt')
            ->leftJoin('unidades as u', function ($join): void {
                $join->on('u.id', '=', 'pt.unidade_id')
                    ->whereNull('u.deleted_at');
            })
            ->leftJoin('programas as p', function ($join): void {
                $join->on('p.id', '=', 'pt.programa_id')
                    ->whereNull('p.deleted_at');
            })
            ->select([
                'pt.id',
                'pt.numero',
                'pt.data_inicio',
                'pt.data_fim',
                'pt.updated_at',
                'pt.data_agendamento_envio',
                'pt.data_tentativa_envio',
                'pt.data_conclusao_envio',
                'pt.data_envio_api_pgd',
                'pt.log_envio',
                'u.id as unidade_id',
                'u.sigla as unidade_sigla',
                'p.id as programa_id',
                'p.nome as programa_nome',
            ])
            ->whereNull('pt.deleted_at');
    }

    private function applyFiltros(Builder $query, array $data): void
    {
        $where = $data['where'] ?? [];

        if (($numeroFilter = $this->getFiltro($where, 'numero')) !== null) {
            $numeroFilter = trim((string) $numeroFilter);
            if ($numeroFilter !== '') {
                $query->where('pt.numero', 'like', '%'.str_replace(' ', '%', $numeroFilter).'%');
            }
        }

        if (($unidadeId = $this->getFiltro($where, 'unidade_id')) !== null) {
            $unidadeId = trim((string) $unidadeId);
            if ($unidadeId !== '') {
                $query->where('pt.unidade_id', '=', $unidadeId);
            }
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isNaoAgendado'))) {
            $query->whereNull('pt.data_agendamento_envio');
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isAgendado'))) {
            $query->whereNotNull('pt.data_agendamento_envio');
        }

        if (($value = $this->getFiltro($where, 'data_agendamento_envio_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $query->where('pt.data_agendamento_envio', '>=', $value);
            }
        }

        if (($value = $this->getFiltro($where, 'data_agendamento_envio_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $query->where('pt.data_agendamento_envio', '<', $fimAjustado);
            }
        }

        if (($value = $this->getFiltro($where, 'updated_at_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $query->where('pt.updated_at', '>=', $value);
            }
        }

        if (($value = $this->getFiltro($where, 'updated_at_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $query->where('pt.updated_at', '<', $fimAjustado);
            }
        }

        if (($value = $this->getFiltro($where, 'data_conclusao_envio_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $query->where('pt.data_conclusao_envio', '>=', $value);
            }
        }

        if (($value = $this->getFiltro($where, 'data_conclusao_envio_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $query->where('pt.data_conclusao_envio', '<', $fimAjustado);
            }
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isEnviado'))) {
            $query->whereNotNull('pt.data_envio_api_pgd');
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isNaoEnviado'))) {
            $query->whereNull('pt.data_envio_api_pgd');
        }

        if (($value = $this->getFiltro($where, 'data_envio_api_pgd_gte')) !== null) {
            $value = (string) $value;
            if ($value !== '') {
                $query->where('pt.data_envio_api_pgd', '>=', $value);
            }
        }

        if (($value = $this->getFiltro($where, 'data_envio_api_pgd_lte')) !== null) {
            $value = trim((string) $value);
            if ($value !== '') {
                $fimAjustado = Carbon::parse($value)->addDay()->format('Y-m-d');
                $query->where('pt.data_envio_api_pgd', '<', $fimAjustado);
            }
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isFalha'))) {
            $query
                ->whereNotNull('pt.data_agendamento_envio')
                ->whereNotNull('pt.log_envio')
                ->where('pt.log_envio', '<>', 'Envio realizado com sucesso.');
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isPendente'))) {
            $query->where(function (Builder $q): void {
                $q->whereNotNull('pt.data_agendamento_envio')
                    ->where(function (Builder $q2): void {
                        $q2->whereNull('pt.data_conclusao_envio')
                            ->orWhereColumn('pt.data_conclusao_envio', '<', 'pt.data_agendamento_envio');
                    });
            });
        }

        if ($this->isFiltroValido($this->getFiltro($where, 'isConcluido'))) {
            $query->whereNotNull('pt.data_conclusao_envio');
        }
    }

    /**
     * Se existir condição com `$field` no índice 0, devolve o valor no índice 1 (última ocorrência).
     */
    private function getFiltro(array $where, string $field): mixed
    {
        $matches = array_values(array_filter(
            $where,
            static fn ($condition): bool => is_array($condition) && ($condition[0] ?? null) == $field
        ));

        if ($matches === []) {
            return null;
        }

        $last = $matches[array_key_last($matches)];

        return $last[1] ?? null;
    }

    private function isFiltroValido(mixed $value): bool
    {
        return $value === true || $value === 1 || $value === '1';
    }
}
