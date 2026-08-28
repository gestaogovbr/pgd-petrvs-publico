<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Eloquent;

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\Models\PlanoTrabalho;
use App\Enums\Atribuicao;
use App\Enums\StatusEnum;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\DB;

class EloquentPlanoTrabalhoReadRepository extends AbstractEloquentReadRepository implements PlanoTrabalhoReadRepositoryContract
{
    /** Número mínimo de avaliações para considerar uma consolidação como reavaliada. */
    private const MINIMO_AVALIACOES_REAVALIACAO = 1;

    /** Status de PT elegíveis para avaliação de consolidações. */
    private const STATUS_AVALIAVEL = [
        'ATIVO',
        'CONCLUIDO',
        'AVALIADO',
    ];

    public function __construct(
        PlanoTrabalho $model,
        private readonly DocumentoAssinaturaRepository $documentoAssinaturaRepository,
    ) {
        $this->model = $model;
    }

    public function findById(string|int $id): ?PlanoTrabalho
    {
        if ($id === '' || $id === 0) {
            return null;
        }

        /** @var PlanoTrabalho|null $planoTrabalho */
        $planoTrabalho = $this->query()->find($id);

        return $planoTrabalho instanceof PlanoTrabalho ? $planoTrabalho : null;
    }

    public function findOneParaEnvio(string|int $id): ?PlanoTrabalho
    {
        /** @var PlanoTrabalho|null */
        $planoTrabalho = $this->model->newQuery()
            ->with([
                'unidade',
                'usuario.lotacao.unidade',
                'entregas' => function ($query) {
                    $query->where(function ($query) {
                        $query
                            ->whereNull('plano_entrega_entrega_id')
                            ->orWhereHas('planoEntregaEntrega.planoEntrega', function ($query) {
                                $query->whereIn('status', StatusEnum::permitemEnvio());
                            });
                    });
                },
                'entregas.planoEntregaEntrega.planoEntrega',
                'consolidacoes' => function ($query) {
                    $query->whereIn('status', [StatusEnum::AVALIADO->value]);
                },
                'consolidacoes.avaliacao',
            ])
            ->find($id);

        return $planoTrabalho;
    }

    public function findWithAtividades(string|int $id): ?PlanoTrabalho
    {
        /** @var PlanoTrabalho|null $planoTrabalho */
        $planoTrabalho = $this->query()
            ->with(['atividades'])
            ->where('id', $id)
            ->first();

        return $planoTrabalho;
    }

    /**
     * @param array $unidadesGerenciadasIds
     * @param array $unidadesSubordinadasIds
     * @param string $usuarioId
     * @return Collection
     */
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
            ->whereNull('data_arquivamento')
            ->whereNotExists(function ($query) {
                $this->subqueryJaPossuiAssinaturaDeGestor($query);
            })
            ->with(['usuario:id,nome,apelido,nome_social,url_foto']);
    }

    /**
     * Exclui PTs cujo documento TCR já possui assinatura de alguém diferente do participante (slot de gestor preenchido).
     */
    private function subqueryJaPossuiAssinaturaDeGestor(\Illuminate\Database\Query\Builder $query): void
    {
        $query->select(DB::raw(1))
            ->from('documentos_assinaturas as da')
            ->whereColumn('da.documento_id', 'planos_trabalhos.documento_id')
            ->whereColumn('da.usuario_id', '!=', 'planos_trabalhos.usuario_id')
            ->whereNull('da.deleted_at');
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

    private function subqueryUsuarioJaAssinou(\Illuminate\Database\Query\Builder $query, string $usuarioId): void
    {
        $this->documentoAssinaturaRepository->subqueryUsuarioJaAssinou($query, $usuarioId);
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

    public function findAllParaEnvio(int $chunkSize, callable $onChunk): void
    {
        DB::table('planos_trabalhos')
            ->whereNull('planos_trabalhos.deleted_at')
            ->whereIn('planos_trabalhos.status', StatusEnum::permitemEnvio())
            ->select('planos_trabalhos.id')
            ->orderBy('planos_trabalhos.id')
            ->chunkById($chunkSize, function (SupportCollection $planosTrabalho) use ($onChunk): void {
                $onChunk($planosTrabalho);
            });
    }

    public function chunkEnviosPendentes(int $size, callable $callback): void
    {
        PlanoTrabalho::query()
            ->whereNull('deleted_at')
            ->whereIn('status', StatusEnum::permitemEnvio())
            ->where(function ($query) {
                $query->whereNull('data_envio_api_pgd')
                    ->orWhereColumn('updated_at', '>', 'data_envio_api_pgd');
            })
            ->chunkById($size, $callback);
    }

    public function buscarPlanosListagem(PlanoTrabalhoIndexDTO $filtro): LengthAwarePaginator
    {
        /** @var \Illuminate\Database\Eloquent\Builder<PlanoTrabalho> $queryBase */
        $queryBase = PlanoTrabalho::query();

        $query = $queryBase->select('planos_trabalhos.id', 'planos_trabalhos.numero', 'planos_trabalhos.usuario_id', 'planos_trabalhos.criacao_usuario_id', 'planos_trabalhos.unidade_id', 'planos_trabalhos.programa_id', 'planos_trabalhos.modalidade_pgd', 'planos_trabalhos.data_inicio', 'planos_trabalhos.data_fim', 'planos_trabalhos.data_arquivamento', 'planos_trabalhos.status', 'planos_trabalhos.encerrado_at', 'planos_trabalhos.documento_id', 'planos_trabalhos.avaliado_at')
            ->addSelect(DB::raw('(SELECT COALESCE(SUM(e.forca_trabalho), 0) FROM planos_trabalhos_entregas e WHERE e.plano_trabalho_id = planos_trabalhos.id AND e.deleted_at IS NULL) AS carga_trabalho_total'))
            ->withCount(['consolidacoes as aguardando_avaliacao' => function ($q) {
                $this->aplicarConsolidacaoPendenteAvaliacao($q);
            }])
            ->withCount(['consolidacoes as aguardando_reavaliacao' => function ($q) {
                $q->where('status', StatusEnum::CONCLUIDO)
                    ->whereHas('avaliacoes', fn($a) => $a->whereNotNull('recurso'))
                    ->where(function ($sub) {
                        $sub->whereColumn('planos_trabalhos_consolidacoes.data_inicio', '<=', 'planos_trabalhos.encerrado_at')
                            ->orWhereNull('planos_trabalhos.encerrado_at');
                    });
            }])
            ->withCount(['consolidacoes as reavaliado' => function ($q) {
                $q->where('status', StatusEnum::AVALIADO)
                    ->has('avaliacoes', '>', self::MINIMO_AVALIACOES_REAVALIACAO);
            }])
            ->withCount(['consolidacoes as has_consolidacao_concluida' => function ($q) {
                $q->whereIn('status', StatusEnum::consolidacaoFinalizada());
            }])
            ->with(['usuario:id,nome,nome_social', 'unidade:id,nome,sigla,unidade_pai_id', 'programa:id,nome']);

        if ($filtro->hierarquia) {
            $queryHierarquia = '`fn_obter_unidade_hierarquia`(`unidade_id`)';

            $query->addSelect(DB::raw("$queryHierarquia AS hierarquia"));
            if (!$filtro->orderBy) {
                $query->orderBy(DB::raw($queryHierarquia));
            }
        }

        if ($filtro->arquivados) {
            $query->whereNotNull('data_arquivamento');
        } else {
            $query->whereNull('data_arquivamento');
        }

        if ($filtro->unidadesId !== null) {
            if ($filtro->minhaEquipe) {
                $query->whereIn('usuario_id', function ($sub) use ($filtro) {
                    $sub->select('usuario_id')
                        ->from('unidades_integrantes')
                        ->whereIn('unidade_id', $filtro->unidadesId)
                        ->whereNull('deleted_at');
                });
            } else {
                $query->whereIn('unidade_id', $filtro->unidadesId);
            }
        }

        if ($filtro->usuarioId !== null) {
            $query->where('usuario_id', $filtro->usuarioId);
        }

        if ($filtro->dataInicio !== null) {
            $query->where('data_fim', '>=', $filtro->dataInicio);
        }

        if ($filtro->dataFim !== null) {
            $query->where('data_inicio', '<=', $filtro->dataFim);
        }

        if ($filtro->numero !== null) {
            $query->where('numero', $filtro->numero);
        }

        if ($filtro->modalidadePgd !== null) {
            $query->where('planos_trabalhos.modalidade_pgd', $filtro->modalidadePgd);
        }

        if ($filtro->status !== null) {
            match ($filtro->status) {
                'ENCERRADO' => $query->whereNotNull('encerrado_at'),
                default => $query->where('status', $filtro->status)->whereNull('encerrado_at'),
            };
        }

        if ($filtro->vigentes) {
            $today = today();
            $query->where('data_inicio', '<=', $today)
                ->where('data_fim', '>=', $today);
        }

        if ($filtro->usuarioNome !== null && $filtro->usuarioNome !== '') {
            $query->whereHas('usuario', fn($q) => $q->where('nome', 'like', '%' . $filtro->usuarioNome . '%'));
        }

        if ($filtro->unidadeRegramento !== null && $filtro->unidadeRegramento !== '') {
            $termo = '%' . strtolower($filtro->unidadeRegramento) . '%';
            $query->whereHas('unidade', fn($q) => $q->whereRaw('LOWER(sigla) like ?', [$termo])
                ->orWhereRaw('LOWER(nome) like ?', [$termo]));
        }

        if ($filtro->orderBy === 'numero') {
            $query->orderBy('numero', $filtro->orderDir ?? 'asc');
        } elseif ($filtro->orderBy === 'usuario_nome') {
            $query->join('usuarios', 'usuarios.id', '=', 'planos_trabalhos.usuario_id')
                ->orderBy('usuarios.nome', $filtro->orderDir ?? 'asc');
        }

        return $query->paginate(perPage: $filtro->perPage, page: $filtro->page);
    }

    public function existeConflitoPeriodo(string $usuarioId, string $dataInicio, string $dataFim): bool
    {
        return $this->query()
            ->where('usuario_id', $usuarioId)
            ->where('data_inicio', '<=', $dataFim)
            ->where('data_fim', '>=', $dataInicio)
            ->where('status', '!=', 'CANCELADO')
            ->exists();
    }

    public function existeConflitoPeriodoExcluindo(string $usuarioId, string $dataInicio, string $dataFim, string $excluirPlanoId): bool
    {
        return $this->query()
            ->where('usuario_id', $usuarioId)
            ->where('data_inicio', '<=', $dataFim)
            ->where('data_fim', '>=', $dataInicio)
            ->where('status', '!=', 'CANCELADO')
            ->where('id', '!=', $excluirPlanoId)
            ->exists();
    }

    public function findByIdComRelacoes(string $id): ?PlanoTrabalho
    {
        /** @var PlanoTrabalho|null $plano */
        $plano = PlanoTrabalho::with([
            'usuario:id,nome,apelido,nome_social,cod_jornada',
            'usuario.lotacao:id,usuario_id,unidade_id',
            'usuario.lotacao.unidade:id,unidade_pai_id',
            'unidade:id,sigla,nome,unidade_pai_id',
            'programa:id,nome',
            'entregas',
            'consolidacoes.atividades',
            'consolidacoes.afastamentos.afastamento.tipoMotivoAfastamento:id,nome,horas',
            'documento.assinaturas.usuario',
            'entregas.planoEntregaEntrega.entrega',
            'entregas.planoEntregaEntrega.planoEntrega.unidade:id,sigla,nome'
        ])->find($id);

        return $plano;
    }

    public function possuiAssinatura(string $planoId): bool
    {
        return $this->query()
            ->where('id', $planoId)
            ->whereHas('documentos.assinaturas')
            ->exists();
    }

    public function loadRelacoesClonar(PlanoTrabalho $plano): PlanoTrabalho
    {
        $plano->load('entregas.planoEntregaEntrega');

        return $plano;
    }

    /**
     * Conta PTs aguardando assinatura que o usuário logado deve assinar.
     * Nas gerenciadas: qualquer participante (exceto substituto assinando titular).
     * Nas subordinadas: apenas PTs do gestor titular.
     *
     * @param string[] $unidadesEscopo IDs das unidades no escopo (selecionada + subordinadas)
     */
    public function countPlanosTrabalhoAssinatura(array $unidadesEscopo, string $usuarioId): int
    {
        if ($unidadesEscopo === []) {
            return 0;
        }

        $gerenciadas = $this->resolverGerenciadasNoEscopo($unidadesEscopo, $usuarioId);
        $subordinadas = array_values(array_diff($unidadesEscopo, $gerenciadas));

        $count = 0;

        // PTs do próprio usuário que ele precisa assinar (como participante)
        $count += $this->basePlanosTrabalhoAssinaturaQuery()
            ->whereIn('unidade_id', $unidadesEscopo)
            ->where('usuario_id', $usuarioId)
            ->whereNotExists(function ($query) use ($usuarioId) {
                $this->subqueryUsuarioJaAssinou($query, $usuarioId);
            })
            ->count();

        // PTs de outros onde o logado é gestor (gerenciadas)
        if ($gerenciadas !== []) {
            $count += $this->basePlanosTrabalhoAssinaturaQuery()
                ->whereIn('unidade_id', $gerenciadas)
                ->where('usuario_id', '!=', $usuarioId)
                ->whereNotExists(function ($query) use ($usuarioId) {
                    $this->subqueryChefeSubstitutoNaoAssinaGestorTitular($query, $usuarioId);
                })
                ->count();
        }

        // PTs de outros nas subordinadas (só titular)
        if ($subordinadas !== []) {
            $count += $this->basePlanosTrabalhoAssinaturaQuery()
                ->whereIn('unidade_id', $subordinadas)
                ->where('usuario_id', '!=', $usuarioId)
                ->whereExists(function ($query) {
                    $this->subqueryPlanoEhDoGestorTitular($query);
                })
                ->count();
        }

        return $count;
    }

    /**
     * Conta PTs distintos que o usuário logado deve avaliar dentro do escopo de unidades.
     * Resolve internamente quais unidades são gerenciadas (qualquer participante)
     * e quais são subordinadas (apenas titular).
     *
     * @param string[] $unidadesEscopo IDs das unidades no escopo (selecionada + subordinadas)
     */
    public function countAguardandoMinhaAvaliacao(array $unidadesEscopo, string $usuarioId): int
    {
        if ($unidadesEscopo === []) {
            return 0;
        }

        $gerenciadas = $this->resolverGerenciadasNoEscopo($unidadesEscopo, $usuarioId);
        $subordinadas = array_values(array_diff($unidadesEscopo, $gerenciadas));

        $count = 0;

        if ($gerenciadas !== []) {
            $count += $this->baseAguardandoMinhaAvaliacaoQuery()
                ->whereIn('unidade_id', $gerenciadas)
                ->where('usuario_id', '!=', $usuarioId)
                ->whereNotExists(function ($query) use ($usuarioId) {
                    $this->subqueryChefeSubstitutoNaoAssinaGestorTitular($query, $usuarioId);
                })
                ->count();
        }

        if ($subordinadas !== []) {
            $count += $this->baseAguardandoMinhaAvaliacaoQuery()
                ->whereIn('unidade_id', $subordinadas)
                ->where('usuario_id', '!=', $usuarioId)
                ->whereExists(function ($query) {
                    $this->subqueryPlanoEhDoGestorTitular($query);
                })
                ->count();
        }

        return $count;
    }

    /**
     * Query base para PTs que o usuário deve avaliar:
     * PT em status avaliável + ao menos 1 consolidação pendente de avaliação.
     */
    private function baseAguardandoMinhaAvaliacaoQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return $this->query()
            ->whereIn('status', self::STATUS_AVALIAVEL)
            ->whereNull('data_arquivamento')
            ->whereHas('consolidacoes', function ($q) {
                $this->aplicarConsolidacaoPendenteAvaliacao($q);
            });
    }

    /**
     * Resolve quais unidades do escopo o usuário gerencia diretamente
     * (é GESTOR, GESTOR_SUBSTITUTO ou GESTOR_DELEGADO).
     *
     * @param string[] $unidadesEscopo
     * @return string[]
     */
    private function resolverGerenciadasNoEscopo(array $unidadesEscopo, string $usuarioId): array
    {
        return DB::table('unidades_integrantes as ui')
            ->join('unidades_integrantes_atribuicoes as uia', 'uia.unidade_integrante_id', '=', 'ui.id')
            ->where('ui.usuario_id', $usuarioId)
            ->whereIn('uia.atribuicao', Atribuicao::chefia())
            ->whereIn('ui.unidade_id', $unidadesEscopo)
            ->pluck('ui.unidade_id')
            ->unique()
            ->values()
            ->toArray();
    }

    /**
     * Aplica critério de consolidação pendente de avaliação sobre um builder de consolidação.
     * Consolidação CONCLUIDO sem nenhuma avaliação registrada.
     * Usado pelo withCount (tag) e pelas queries de avaliação pendente.
     */
    private function aplicarConsolidacaoPendenteAvaliacao(\Illuminate\Database\Eloquent\Builder $q): void
    {
        $q->where('planos_trabalhos_consolidacoes.status', StatusEnum::CONCLUIDO->value)
            ->whereDoesntHave('avaliacoes');
    }

    /**
     * @inheritDoc
     */
    public function buscarPlanosParaIndicadores(array $unidadeIds, array $filtros): SupportCollection
    {
        $query = $this->model->newQuery()
            ->select('planos_trabalhos.id', 'planos_trabalhos.usuario_id', 'planos_trabalhos.data_inicio', 'planos_trabalhos.data_fim', 'planos_trabalhos.unidade_id', 'planos_trabalhos.carga_horaria')
            ->join('usuarios', function ($join) {
                $join->on('usuarios.id', '=', 'planos_trabalhos.usuario_id')
                    ->whereNull('usuarios.deleted_at');
            })
            ->whereIn('planos_trabalhos.unidade_id', $unidadeIds)
            ->whereIn('planos_trabalhos.status', ['ATIVO', 'CONCLUIDO', 'AVALIADO']);

        if ($filtros['data_inicial'] !== null) {
            $query->where('planos_trabalhos.data_inicio', '>=', $filtros['data_inicial']);
        }
        if ($filtros['data_final'] !== null) {
            $query->whereRaw('date(`planos_trabalhos`.`data_fim`) <= ?', [$filtros['data_final']]);
        }
        if ($filtros['somente_vigentes']) {
            $query->whereRaw('now() between date(`planos_trabalhos`.`data_inicio`) and date(`planos_trabalhos`.`data_fim`)');
        }

        return $query->get()->toBase();
    }
}
