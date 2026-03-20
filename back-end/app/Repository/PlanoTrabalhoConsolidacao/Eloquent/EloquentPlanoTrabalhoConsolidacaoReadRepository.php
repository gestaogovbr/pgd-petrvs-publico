<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacao\Eloquent;

use App\DTOs\PlanoTrabalho\PlanoTrabalhoConsolidacaoDataDTO;
use App\Enums\StatusEnum;
use App\Models\Afastamento;
use App\Models\Atividade;
use App\Models\Ocorrencia;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

final class EloquentPlanoTrabalhoConsolidacaoReadRepository extends AbstractEloquentReadRepository implements PlanoTrabalhoConsolidacaoReadRepositoryContract
{
    public function __construct(PlanoTrabalhoConsolidacao $model)
    {
        $this->model = $model;
    }

    public function getConsolidacaoData(string $id): ?PlanoTrabalhoConsolidacaoDataDTO
    {
        $consolidacao = $this->findConsolidacaoById($id);

        if ($consolidacao === null) {
            return null;
        }

        $concluido = in_array(
            $consolidacao->status,
            [StatusEnum::CONCLUIDO->value, StatusEnum::AVALIADO->value],
            true
        );

        $planosEntregasIds = array_map(
            static fn ($planoTrabalhoEntrega) => $planoTrabalhoEntrega->planoEntregaEntrega?->plano_entrega_id,
            $consolidacao->planoTrabalho->entregas?->all() ?? [],
        );

        $planosEntregas = PlanoEntrega::whereIn('id', $planosEntregasIds)->get();
        $atividades = $this->getAtividades($consolidacao, $concluido);
        $afastamentos = $this->getAfastamentos($consolidacao, $concluido);
        $ocorrencias = $this->getOcorrencias($consolidacao, $concluido);
        $comparecimentos = $consolidacao->comparecimentos ?? collect();

        return new PlanoTrabalhoConsolidacaoDataDTO(
            planoTrabalho: $consolidacao->planoTrabalho,
            programa: $consolidacao->planoTrabalho?->programa,
            planosEntregas: $planosEntregas,
            atividades: $atividades,
            afastamentos: $afastamentos,
            ocorrencias: $ocorrencias,
            comparecimentos: $comparecimentos,
            status: $consolidacao->status,
            justificativaConclusao: $consolidacao->justificativa_conclusao,
            consolidacao: $consolidacao,
        );
    }

    public function findConsolidacaoById(string $id): ?PlanoTrabalhoConsolidacao
    {
        /** @var PlanoTrabalhoConsolidacao|null */
        return $this->query()->with([
            'comparecimentos.unidade:id,nome,sigla',
            'avaliacao',
            'avaliacoes',
            'planoTrabalho.programa',
            'planoTrabalho.unidade.gestor:id,usuario_id',
            'planoTrabalho.unidade.gestoresSubstitutos:id,usuario_id',
            'planoTrabalho.entregas.entrega',
            'planoTrabalho.entregas.reacoes',
            'planoTrabalho.entregas.planoEntregaEntrega:id,descricao,plano_entrega_id,entrega_id,meta,realizado,progresso_realizado',
            'planoTrabalho.entregas.planoEntregaEntrega.entrega:id,nome,tipo_indicador',
            'planoTrabalho.entregas.planoEntregaEntrega.objetivos.objetivo',
            'planoTrabalho.entregas.planoEntregaEntrega.processos.processo',
            'planoTrabalho.tipoModalidade',
        ])->find($id);
    }

    /**
     * Busca consolidações concluídas pendentes de avaliação.
     *
     * Regras principais:
     * - Considera apenas consolidações com status CONCLUIDO e latestStatus anterior à data de corte.
     * - Para unidades gerenciadas, exclui a consolidação do gestor titular quando o avaliador é gestor substituto.
     * - Para unidades subordinadas, permite apenas planos cujo titular é gestor da unidade.
     *
     * @param array $unidadesGerenciadasIds IDs das unidades gerenciadas pelo usuário.
     * @param array $unidadesSubordinadasIds IDs de unidades subordinadas às gerenciadas.
     * @param string $usuarioId ID do usuário avaliador.
     * @param \DateTimeInterface $dataCorte Data limite para considerar pendência.
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getPendentesAvaliacao(
        array $unidadesGerenciadasIds,
        array $unidadesSubordinadasIds,
        string $usuarioId,
        \DateTimeInterface $dataCorte
    ): \Illuminate\Database\Eloquent\Collection {
        $unidadesGerenciadasIds = array_values(array_unique($unidadesGerenciadasIds));
        $unidadesSubordinadasIds = array_values(array_unique($unidadesSubordinadasIds));

        $pendenciasUnidade = new Collection();
        if ($unidadesGerenciadasIds !== []) {
            $pendenciasUnidade = $this->basePendentesAvaliacaoQuery($dataCorte)
                ->whereHas('planoTrabalho', function ($q) use ($unidadesGerenciadasIds, $usuarioId) {
                    $q->whereIn('unidade_id', $unidadesGerenciadasIds)
                        ->where('usuario_id', '!=', $usuarioId)
                        ->whereNotExists(function ($query) use ($usuarioId) {
                            $this->subqueryChefeSubstitutoNaoAvaliaGestorTitular($query, $usuarioId);
                        });
                })
                ->get();
        }

        $pendenciasSubordinadas = new Collection();
        if ($unidadesSubordinadasIds !== []) {
            $pendenciasSubordinadas = $this->basePendentesAvaliacaoQuery($dataCorte)
                ->whereHas('planoTrabalho', function ($q) use ($unidadesSubordinadasIds, $usuarioId) {
                    $q->whereIn('unidade_id', $unidadesSubordinadasIds)
                        ->where('usuario_id', '!=', $usuarioId)
                        ->whereExists(function ($query) {
                            $this->subqueryPlanoEhDoGestorTitular($query);
                        });
                })
                ->get();
        }

        $merged = $pendenciasUnidade
            ->merge($pendenciasSubordinadas)
            ->unique('id')
            ->values();

        return new Collection($merged->all());
    }

    private function basePendentesAvaliacaoQuery(\DateTimeInterface $dataCorte): \Illuminate\Database\Eloquent\Builder
    {
        return $this->query()
            ->with(['planoTrabalho:id,unidade_id,usuario_id,numero', 'planoTrabalho.usuario:id,nome,apelido,url_foto'])
            ->where('status', StatusEnum::CONCLUIDO->value)
            ->whereHas('latestStatus', function ($q) use ($dataCorte) {
                $q->where('codigo', StatusEnum::CONCLUIDO->value)
                    ->where('created_at', '<', $dataCorte);
            });
    }

    private function subqueryChefeSubstitutoNaoAvaliaGestorTitular(\Illuminate\Database\Query\Builder $query, string $usuarioId): void
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

    private function getAtividades(PlanoTrabalhoConsolidacao $consolidacao, bool $concluido): Collection
    {
        $query = Atividade::with([
            'demandante',
            'usuario',
            'tipoAtividade',
            'pausas' => static fn ($relacao) => $relacao->withTrashed(),
            'tarefas' => static fn ($relacao) => $relacao->withTrashed(),
            'tarefas.tipoTarefa:id,nome',
            'comentarios' => static fn ($relacao) => $relacao->withTrashed(),
            'comentarios.usuario:id,nome,apelido',
            'reacoes.usuario:id,nome,apelido',
        ]);

        if ($concluido) {
            return $query
                ->withTrashed()
                ->whereHas('consolidacoes', static fn ($relacao) => $relacao
                    ->where('plano_trabalho_consolidacao_id', $consolidacao->id)
                    ->where('data_conclusao', $consolidacao->data_conclusao))
                ->get();
        }

        return $query
            ->where('data_estipulada_entrega', '>=', $consolidacao->data_inicio)
            ->where('data_distribuicao', '<=', $consolidacao->data_fim)
            ->where('usuario_id', $consolidacao->planoTrabalho->usuario_id)
            ->get();
    }

    private function getAfastamentos(PlanoTrabalhoConsolidacao $consolidacao, bool $concluido): Collection
    {
        $query = Afastamento::with(['tipoMotivoAfastamento']);

        if ($concluido) {
            return $query
                ->withTrashed()
                ->whereHas('consolidacoes', static fn ($relacao) => $relacao
                    ->where('plano_trabalho_consolidacao_id', $consolidacao->id)
                    ->where('data_conclusao', $consolidacao->data_conclusao))
                ->get();
        }

        return $query
            ->where('data_fim', '>=', $consolidacao->data_inicio)
            ->where('data_inicio', '<=', $consolidacao->data_fim)
            ->where('usuario_id', $consolidacao->planoTrabalho->usuario_id)
            ->get();
    }

    private function getOcorrencias(PlanoTrabalhoConsolidacao $consolidacao, bool $concluido): Collection
    {
        $query = Ocorrencia::with(['usuario']);

        if ($concluido) {
            return $query
                ->withTrashed()
                ->whereHas('consolidacoes', static fn ($relacao) => $relacao
                    ->where('plano_trabalho_consolidacao_id', $consolidacao->id)
                    ->where('data_conclusao', $consolidacao->data_conclusao))
                ->get();
        }

        return $query
            ->where('data_fim', '>=', $consolidacao->data_inicio)
            ->where('data_inicio', '<=', $consolidacao->data_fim)
            ->where('usuario_id', $consolidacao->planoTrabalho->usuario_id)
            ->where(static fn ($relacao) => $relacao
                ->whereNull('plano_trabalho_id')
                ->orWhere('plano_trabalho_id', '=', $consolidacao->planoTrabalho->id))
            ->get();
    }
}
