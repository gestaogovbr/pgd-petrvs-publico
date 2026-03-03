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

    public function getPendentesAvaliacao(array $unidadesIds, string $usuarioId, \DateTimeInterface $dataCorte): \Illuminate\Database\Eloquent\Collection
    {
        return $this->query()
            ->with(['planoTrabalho:id,unidade_id,usuario_id', 'planoTrabalho.usuario:id,nome,apelido,url_foto'])
            ->where('status', StatusEnum::CONCLUIDO->value)
            ->whereHas('planoTrabalho', function($q) use ($unidadesIds, $usuarioId) {
                $q->whereIn('unidade_id', $unidadesIds)
                  ->where('usuario_id', '!=', $usuarioId);
            })
            ->whereHas('latestStatus', function($q) use ($dataCorte) {
                $q->where('codigo', StatusEnum::CONCLUIDO->value)
                  ->where('created_at', '<', $dataCorte);
            })
            ->get();
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

