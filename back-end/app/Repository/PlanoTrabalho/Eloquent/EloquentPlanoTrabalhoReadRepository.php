<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Eloquent;

use App\Models\PlanoTrabalho;
use App\Enums\StatusEnum;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class EloquentPlanoTrabalhoReadRepository extends AbstractEloquentReadRepository implements PlanoTrabalhoReadRepositoryContract
{
    public function __construct(PlanoTrabalho $model)
    {
        $this->model = $model;
    }

    public function getPlanosTrabalhoAssinatura(array $unidadesGerenciadasIds, array $unidadesSubordinadasIds, string $usuarioId): Collection
    {
        $unidadesGerenciadasIds = array_values(array_unique($unidadesGerenciadasIds));
        $unidadesSubordinadasIds = array_values(array_unique($unidadesSubordinadasIds));

        $planosUnidade = new Collection();
        if ($unidadesGerenciadasIds !== []) {
            $planosUnidade = $this->basePlanosTrabalhoAssinaturaQuery()
                ->whereIn('unidade_id', $unidadesGerenciadasIds)
                ->where('usuario_id', '!=', $usuarioId)
                ->whereNotExists(function ($query) use ($usuarioId) {
                    $this->subqueryChefeSubstitutoNaoAssinaGestorTitular($query, $usuarioId);
                })
                ->get();
        }

        $planosSubordinadas = new Collection();
        if ($unidadesSubordinadasIds !== []) {
            $planosSubordinadas = $this->basePlanosTrabalhoAssinaturaQuery()
                ->whereIn('unidade_id', $unidadesSubordinadasIds)
                ->where('usuario_id', '!=', $usuarioId)
                ->whereExists(function ($query) {
                    $this->subqueryPlanoEhDoGestorTitular($query);
                })
                ->get();
        }

        $merged = $planosUnidade
            ->merge($planosSubordinadas)
            ->unique('id')
            ->values();

        return new Collection($merged->all());
    }

    private function basePlanosTrabalhoAssinaturaQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return $this->query()
            ->where('status', StatusEnum::AGUARDANDO_ASSINATURA->value)
            ->with(['usuario:id,nome,apelido,url_foto']);
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

    private function subqueryPlanoEhDoGestorTitular(\Illuminate\Database\Query\Builder $query): void
    {
        $query->select(DB::raw(1))
            ->from('unidades_integrantes as ui_t')
            ->join('unidades_integrantes_atribuicoes as uia_t', 'uia_t.unidade_integrante_id', '=', 'ui_t.id')
            ->where('uia_t.atribuicao', 'GESTOR')
            ->whereColumn('ui_t.unidade_id', 'planos_trabalhos.unidade_id')
            ->whereColumn('ui_t.usuario_id', 'planos_trabalhos.usuario_id');
    }

    public function planosAtivos(string $usuarioId): Collection
    {
        return $this->query()
            ->where("usuario_id", $usuarioId)
            ->where("data_inicio", "<=", now())
            ->where("data_fim", ">=", now())
            ->get();
    }

    public function planosAtivosPorData(string $dataInicial, string $dataFinal, string $usuarioId): Collection
    {
        return $this->query()
            ->where("usuario_id", $usuarioId)
            ->where("data_inicio", "<=", $dataFinal)
            ->where("data_fim", ">=", $dataInicial)
            ->get();
    }

    public function buscarPlanosPendentes(string $usuarioId, string $planoTrabalhoId, string $dataLimite): Collection
    {
        return $this->query()
            ->where('usuario_id', $usuarioId)
            ->whereIn('status', StatusEnum::pendentesPlanoTrabalhoSemIncluido())
            ->where('id', '!=', $planoTrabalhoId)
            ->where('data_fim', '<', $dataLimite)
            ->get();
    }
}
