<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DataProviders;

use App\Enums\Atribuicao;
use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class AguardandoMinhaAvaliacaoDataProvider
{
    private const STATUS_AVALIAVEL = [
        StatusEnum::ATIVO,
        StatusEnum::CONCLUIDO,
        StatusEnum::AVALIADO,
    ];

    public function buscar(string $usuarioId, int $page = 1, int $perPage = 15, ?string $orderBy = null, ?string $orderDir = null): LengthAwarePaginator
    {
        $query = $this->baseQuery($usuarioId)
            ->withCount(['consolidacoes as aguardando_avaliacao' => function ($q) {
                $q->where('planos_trabalhos_consolidacoes.status', StatusEnum::CONCLUIDO->value)
                    ->whereDoesntHave('avaliacoes');
            }])
            ->withCount(['consolidacoes as aguardando_reavaliacao' => function ($q) {
                $q->where('status', StatusEnum::CONCLUIDO)
                    ->whereHas('avaliacoes', fn ($a) => $a->whereNotNull('recurso'))
                    ->where(function ($sub) {
                        $sub->whereColumn('planos_trabalhos_consolidacoes.data_inicio', '<=', 'planos_trabalhos.encerrado_at')
                            ->orWhereNull('planos_trabalhos.encerrado_at');
                    });
            }])
            ->with(['usuario:id,nome,nome_social', 'unidade:id,nome,sigla,unidade_pai_id', 'programa:id,nome']);

        $this->aplicarOrdenacao($query, $orderBy, $orderDir);

        return $query->paginate(perPage: $perPage, page: $page);
    }

    /**
     * Aplica ordenação por 'numero' ou 'usuario_nome'; caso contrário, ordena por updated_at desc.
     *
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\PlanoTrabalho> $query
     */
    private function aplicarOrdenacao(\Illuminate\Database\Eloquent\Builder $query, ?string $orderBy, ?string $orderDir): void
    {
        $dir = $orderDir === 'desc' ? 'desc' : 'asc';
        if ($orderBy === 'numero') {
            $query->orderBy('numero', $dir);
            return;
        }
        if ($orderBy === 'usuario_nome') {
            $query->join('usuarios', 'usuarios.id', '=', 'planos_trabalhos.usuario_id')
                ->orderBy('usuarios.nome', $dir)
                ->select('planos_trabalhos.*');
            return;
        }
        $query->orderByDesc('updated_at');
    }

    public function count(string $usuarioId): int
    {
        return $this->baseQuery($usuarioId)->count();
    }

    private function baseQuery(string $usuarioId): \Illuminate\Database\Eloquent\Builder
    {
        $gerenciadas = $this->resolverGerenciadas($usuarioId);
        $unidadesAvaliaveis = $this->resolverUnidadesAvaliaveis($gerenciadas);

        return PlanoTrabalho::query()
            ->whereIn('status', array_map(fn (StatusEnum $s) => $s->value, self::STATUS_AVALIAVEL))
            ->whereNull('data_arquivamento')
            ->where('usuario_id', '!=', $usuarioId)
            ->whereHas('consolidacoes', function ($q) {
                $q->where('planos_trabalhos_consolidacoes.status', StatusEnum::CONCLUIDO->value)
                    ->whereDoesntHave('avaliacoes');
            })
            ->whereNotExists(function ($sub) use ($usuarioId) {
                $this->subqueryChefeSubstitutoNaoAssinaGestorTitular($sub, $usuarioId);
            })
            ->whereIn('unidade_id', $unidadesAvaliaveis);
    }

    /**
     * Unidades cujos Planos de Trabalho o usuário pode avaliar: as unidades que ele chefia
     * (avalia os PTs dos agentes lotados nela) MAIS as unidades imediatamente subordinadas
     * (quando o participante é chefia da própria unidade, a avaliação sobe para a chefia
     * da unidade superior — ver AvaliacaoAuthorizationValidator::podeAvaliar).
     *
     * @param string[] $gerenciadas
     * @return string[]
     */
    private function resolverUnidadesAvaliaveis(array $gerenciadas): array
    {
        if ($gerenciadas === []) {
            return [];
        }

        $filhas = DB::table('unidades')
            ->whereIn('unidade_pai_id', $gerenciadas)
            ->whereNull('deleted_at')
            ->pluck('id')
            ->toArray();

        return array_values(array_unique(array_merge($gerenciadas, $filhas)));
    }

    /** @return string[] */
    private function resolverGerenciadas(string $usuarioId): array
    {
        return DB::table('unidades_integrantes as ui')
            ->join('unidades_integrantes_atribuicoes as uia', 'uia.unidade_integrante_id', '=', 'ui.id')
            ->where('ui.usuario_id', $usuarioId)
            ->whereIn('uia.atribuicao', Atribuicao::chefia())
            ->whereNull('ui.deleted_at')
            ->whereNull('uia.deleted_at')
            ->pluck('ui.unidade_id')
            ->unique()
            ->values()
            ->toArray();
    }

    private function subqueryChefeSubstitutoNaoAssinaGestorTitular(\Illuminate\Database\Query\Builder $query, string $usuarioId): void
    {
        $query->select(DB::raw(1))
            ->from('unidades_integrantes as ui_t')
            ->join('unidades_integrantes_atribuicoes as uia_t', 'uia_t.unidade_integrante_id', '=', 'ui_t.id')
            ->join('unidades_integrantes as ui_s', function ($join) use ($usuarioId) {
                $join->on('ui_s.unidade_id', '=', 'ui_t.unidade_id')
                    ->where('ui_s.usuario_id', '=', $usuarioId);
            })
            ->join('unidades_integrantes_atribuicoes as uia_s', 'uia_s.unidade_integrante_id', '=', 'ui_s.id')
            ->where('uia_t.atribuicao', 'GESTOR')
            ->where('uia_s.atribuicao', 'GESTOR_SUBSTITUTO')
            ->whereColumn('ui_t.unidade_id', 'planos_trabalhos.unidade_id')
            ->whereColumn('ui_t.usuario_id', 'planos_trabalhos.usuario_id');
    }
}
