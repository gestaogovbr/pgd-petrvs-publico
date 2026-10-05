<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntrega\Eloquent;

use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Enums\StatusEnum;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaReadRepositoryContract;
use App\V2\PlanoEntrega\DTOs\AvaliacaoPendentePEBuscaDTO;
use App\V2\PlanoEntrega\DTOs\HomologacaoPendentePEBuscaDTO;
use App\V2\PlanoEntrega\DTOs\RegistroExecucaoAtrasoPEBuscaDTO;
use App\V2\PlanoEntrega\DTOs\VigentesPEBuscaDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator as LengthAwarePaginatorConcrete;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\DB;

/**
 * @extends AbstractEloquentReadRepository<PlanoEntrega>
 */
class EloquentPlanoEntregaReadRepository extends AbstractEloquentReadRepository implements PlanoEntregaReadRepositoryContract
{
    private const DIAS_PENDENCIA_PROGRESSO = 31;
    private const PLANO_ENTREGA_ID_COLUMN = 'planos_entregas_entregas.plano_entrega_id';
    private const PLANO_ENTREGA_PK_COLUMN = 'planos_entregas_entregas.id';
    private const PROGRESSOS_TABLE = 'planos_entregas_entregas_progressos';
    private const PROGRESSO_FK_COLUMN = 'planos_entregas_entregas_progressos.plano_entrega_entrega_id';
    private const TOTAL_SEM_PROGRESSO_ALIAS = 'total_sem_progresso';
    private const PLANO_ENTREGA_SELECT_FIELDS = ['id', 'numero', 'nome'];

    public function __construct(PlanoEntrega $model)
    {
        $this->model = $model;
    }

    public function findById(string|int $id): ?PlanoEntrega
    {
        /** @var PlanoEntrega|null */
        return parent::findById($id);
    }

    public function findOneParaEnvio(string|int $id): ?PlanoEntrega
    {
        /** @var PlanoEntrega|null */
        return $this->model->newQuery()
            ->with([
                'programa',
                'programa.unidade',
                'unidade',
                'entregas',
                'entregas.unidade',
            ])
            ->find($id);
    }

    public function findAllParaEnvio(int $chunkSize, callable $onChunk): void
    {
        DB::table('planos_entregas')
            ->whereNull('planos_entregas.deleted_at')
            ->whereIn('planos_entregas.status', StatusEnum::permitemEnvioPlanoEntrega())
            ->select('planos_entregas.id')
            ->orderBy('planos_entregas.id')
            ->chunkById($chunkSize, function (SupportCollection $planosEntrega) use ($onChunk): void {
                $onChunk($planosEntrega);
            });
    }

    public function getPlanosEntregaAvaliacao(array $unidadesIds, ?string $criadosApos = null): Collection
    {
        return $this->baseAvaliacaoQuery($unidadesIds, $criadosApos)->get();
    }

    /**
     * Lista paginada de PEs em avaliação pendente — mesmo critério de
     * countPlanosEntregaAvaliacao/getPlanosEntregaAvaliacao (consistência card x listagem).
     */
    public function paginatePlanosEntregaAvaliacao(AvaliacaoPendentePEBuscaDTO $busca): LengthAwarePaginator
    {
        if ($busca->unidadesIds === []) {
            return new LengthAwarePaginatorConcrete([], 0, $busca->perPage, $busca->page);
        }

        return $this->baseAvaliacaoQuery($busca->unidadesIds, $busca->criadosApos)
            ->with(['unidade:id,sigla,nome', 'programa:id,nome'])
            ->orderBy('numero')
            ->paginate(perPage: $busca->perPage, page: $busca->page);
    }

    /**
     * @param string[] $unidadesIds
     */
    private function baseAvaliacaoQuery(array $unidadesIds, ?string $criadosApos): Builder
    {
        $query = $this->query()
            ->where('status', StatusEnum::CONCLUIDO->value)
            ->whereIn('unidade_id', $unidadesIds)
            ->with(['unidade:id,sigla,nome']);

        if ($criadosApos !== null) {
            $query->where('created_at', '>', $criadosApos);
        }

        return $query;
    }

    public function getPlanosEntregaHomologacao(array $unidadesIds): Collection
    {
        return $this->baseHomologacaoQuery($unidadesIds)->get();
    }

    /**
     * Lista paginada de PEs aguardando homologação — mesmo critério de
     * countPlanosEntregaHomologacao/getPlanosEntregaHomologacao (consistência card x listagem).
     */
    public function paginatePlanosEntregaHomologacao(HomologacaoPendentePEBuscaDTO $busca): LengthAwarePaginator
    {
        if ($busca->unidadesIds === []) {
            return new LengthAwarePaginatorConcrete([], 0, $busca->perPage, $busca->page);
        }

        return $this->baseHomologacaoQuery($busca->unidadesIds)
            ->with(['programa:id,nome'])
            ->orderBy('numero')
            ->paginate(perPage: $busca->perPage, page: $busca->page);
    }

    /**
     * @param string[] $unidadesIds
     */
    private function baseHomologacaoQuery(array $unidadesIds): Builder
    {
        return $this->query()
            ->where('status', StatusEnum::HOMOLOGANDO->value)
            ->whereIn('unidade_id', $unidadesIds)
            ->with(['unidade:id,sigla,nome']);
    }

    public function getEntregasPlanoEntregaHomologacao(array $unidadesIds): Collection
    {
        return PlanoEntregaEntrega::where('homologado', false)
            ->where('realizado', '>', 0)
            ->whereHas('planoEntrega', function($q) use ($unidadesIds) {
                $q->whereIn('unidade_id', $unidadesIds)
                  ->where('status', StatusEnum::ATIVO->value);
            })
            ->with(['planoEntrega.unidade:id,sigla,nome', 'entrega:id,nome'])
            ->get();
    }

    public function getEntregasPlanoEntregaExecucao(array $unidadesIds, ?string $planoEntregaCriadoApos = null): Collection
    {
        return PlanoEntregaEntrega::query()
            ->whereHas('planoEntrega.unidade', fn ($query) => $query->whereIn('id', $unidadesIds))
            ->tap(fn ($query) => $this->aplicarEntregaSemProgresso($query))
            ->whereHas('planoEntrega', static function ($query) use ($planoEntregaCriadoApos): void {
                $query
                    ->where('status', StatusEnum::CONCLUIDO->value)
                    ->where('data_fim', '<=', now()->subDays(self::DIAS_PENDENCIA_PROGRESSO));

                if ($planoEntregaCriadoApos !== null) {
                    $query->where('created_at', '>', $planoEntregaCriadoApos);
                }
            })
            ->selectRaw(
                self::PLANO_ENTREGA_ID_COLUMN . ', COUNT(*) as ' . self::TOTAL_SEM_PROGRESSO_ALIAS
            )
            ->groupBy(self::PLANO_ENTREGA_ID_COLUMN)
            ->with([
                'planoEntrega' => static fn ($query) => $query->select(self::PLANO_ENTREGA_SELECT_FIELDS),
            ])
            ->get();
    }

    public function findAllByUnidadeId(string $unidadeId, ?string $dataInicio = null, ?string $dataFim = null): Collection
    {
        $query = $this->query()
            ->where('unidade_id', $unidadeId)
            ->select('id', 'nome', 'numero', 'status', 'data_inicio', 'data_fim');

        if ($dataInicio !== null) {
            $query->where('data_fim', '>=', $dataInicio);
        }

        if ($dataFim !== null) {
            $query->where('data_inicio', '<=', $dataFim);
        }

        return $query->orderBy('data_inicio', 'desc')->get();
    }

    public function findAllEntregasByPlanoId(string $planoEntregaId): Collection
    {
        return PlanoEntregaEntrega::where('plano_entrega_id', $planoEntregaId)
            ->select('id', 'plano_entrega_id', 'entrega_id', 'descricao', 'descricao_entrega')
            ->with(['entrega:id,nome'])
            ->get();
    }

    public function findEntregaById(string $entregaId): ?PlanoEntregaEntrega
    {
        return PlanoEntregaEntrega::find($entregaId);
    }

    public function countPlanosEntregaHomologacao(array $unidadesIds): int
    {
        if ($unidadesIds === []) {
            return 0;
        }

        return $this->baseHomologacaoQuery($unidadesIds)->count();
    }

    public function countPlanosEntregaAvaliacao(array $unidadesIds, ?string $criadosApos = null): int
    {
        if ($unidadesIds === []) {
            return 0;
        }

        return $this->baseAvaliacaoQuery($unidadesIds, $criadosApos)->count();
    }

    public function countEntregasSemProgresso(array $unidadesIds, ?string $planoEntregaCriadoApos = null): int
    {
        if ($unidadesIds === []) {
            return 0;
        }

        return $this->entregasSemProgressoAtrasadasQuery($unidadesIds, $planoEntregaCriadoApos)->count();
    }

    /**
     * Lista paginada de PEs com pelo menos uma entrega/RE em atraso.
     * O card conta as entregas (countEntregasSemProgresso); esta listagem mostra os PEs
     * que as contêm, sobre o mesmo critério de atraso/sem-progresso.
     */
    public function paginatePlanosEntregaComRegistroAtraso(RegistroExecucaoAtrasoPEBuscaDTO $busca): LengthAwarePaginator
    {
        if ($busca->unidadesIds === []) {
            return new LengthAwarePaginatorConcrete([], 0, $busca->perPage, $busca->page);
        }

        return $this->basePlanosEntregaComRegistroAtrasoQuery($busca)
            ->with(['unidade:id,sigla,nome', 'programa:id,nome'])
            ->orderBy('numero')
            ->paginate(perPage: $busca->perPage, page: $busca->page);
    }

    /**
     * Lista paginada de PEs VIGENTES do usuário: status ATIVO e período (data_inicio..data_fim)
     * contendo a data de hoje, nas unidades de atribuição direta informadas no DTO.
     */
    public function paginatePlanosEntregaVigentes(VigentesPEBuscaDTO $busca): LengthAwarePaginator
    {
        if ($busca->unidadesIds === []) {
            return new LengthAwarePaginatorConcrete([], 0, $busca->perPage, $busca->page);
        }

        return $this->baseVigentesQuery($busca->unidadesIds)
            ->with(['unidade:id,sigla,nome', 'programa:id,nome'])
            ->orderBy('numero')
            ->paginate(perPage: $busca->perPage, page: $busca->page);
    }

    /**
     * Query base dos PEs vigentes: status ATIVO, período corrente e sem arquivamento.
     *
     * @param string[] $unidadesIds
     * @return Builder<PlanoEntrega>
     */
    private function baseVigentesQuery(array $unidadesIds): Builder
    {
        $hoje = now();

        return $this->query()
            ->where('status', StatusEnum::ATIVO->value)
            ->whereIn('unidade_id', $unidadesIds)
            ->where('data_inicio', '<=', $hoje)
            ->where('data_fim', '>=', $hoje)
            ->whereNull('data_arquivamento');
    }

    /**
     * Query base dos PEs (distintos) com ao menos uma entrega/RE em atraso.
     * Fonte única de verdade para o contador do card e a listagem do hiperlink.
     */
    private function basePlanosEntregaComRegistroAtrasoQuery(RegistroExecucaoAtrasoPEBuscaDTO $busca)
    {
        return $this->query()
            ->whereIn('unidade_id', $busca->unidadesIds)
            ->where('status', StatusEnum::CONCLUIDO->value)
            ->where('data_fim', '<=', now()->subDays(self::DIAS_PENDENCIA_PROGRESSO))
            ->when($busca->criadosApos !== null, fn ($query) => $query->where('created_at', '>', $busca->criadosApos))
            ->whereHas('entregas', fn ($query) => $this->aplicarEntregaSemProgresso($query));
    }

    /**
     * Query de entregas (planos_entregas_entregas) sem progresso cujo PE está atrasado.
     *
     * @param string[] $unidadesIds
     * @return \Illuminate\Database\Eloquent\Builder<PlanoEntregaEntrega>
     */
    private function entregasSemProgressoAtrasadasQuery(array $unidadesIds, ?string $planoEntregaCriadoApos)
    {
        return PlanoEntregaEntrega::query()
            ->whereHas('planoEntrega', function ($query) use ($unidadesIds, $planoEntregaCriadoApos) {
                $query
                    ->whereIn('unidade_id', $unidadesIds)
                    ->where('status', StatusEnum::CONCLUIDO->value)
                    ->where('data_fim', '<=', now()->subDays(self::DIAS_PENDENCIA_PROGRESSO));

                if ($planoEntregaCriadoApos !== null) {
                    $query->where('created_at', '>', $planoEntregaCriadoApos);
                }
            })
            ->tap(fn ($query) => $this->aplicarEntregaSemProgresso($query));
    }

    /**
     * Aplica o filtro "entrega sem nenhum registro de progresso".
     *
     * A subquery é bruta (não passa pelo model), então o global scope de SoftDeletes
     * não é aplicado — filtra-se `deleted_at` explicitamente para que progressos
     * soft-deleted não sejam considerados progresso existente.
     */
    private function aplicarEntregaSemProgresso($query): void
    {
        $query->whereNotExists(function ($sub) {
            $sub->selectRaw('1')
                ->from(self::PROGRESSOS_TABLE)
                ->whereColumn(self::PROGRESSO_FK_COLUMN, self::PLANO_ENTREGA_PK_COLUMN)
                ->whereNull(self::PROGRESSOS_TABLE . '.deleted_at');
        });
    }
}
