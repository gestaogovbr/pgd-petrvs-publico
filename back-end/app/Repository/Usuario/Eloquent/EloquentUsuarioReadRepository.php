<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Eloquent;

use App\Enums\Atribuicao;
use App\Enums\PerfilEnum;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\Interfaces\EnvioReadRepositoryInterface;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use App\Services\UtilService;
use App\Services\RawWhere;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection as SupportCollection;


/**
 * @extends AbstractEloquentReadRepository<Usuario>
 */
class EloquentUsuarioReadRepository extends AbstractEloquentReadRepository implements UsuarioReadRepositoryContract, EnvioReadRepositoryInterface
{
    public function __construct(
        Usuario $model,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UnidadeIntegranteRepository $unidadeIntegranteRepository,
    ) {
        $this->model = $model;
    }

    public function findById(string|int $id, $deleteTrashed = false): ?Usuario
    {
        /** @var \Illuminate\Database\Eloquent\Builder<Usuario> $query */
        $query = $this->query();

        /** @var Usuario|null $usuario */
        $usuario = $deleteTrashed ? $query->withTrashed()->find($id) : parent::findById($id);
        return $usuario;
    }

    public function findByIdComAreasTrabalho(string|int $id): ?Usuario
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()
            ->whereKey($id)
            ->with(['areasTrabalho.unidade'])
            ->first();

        return $usuario;
    }

    public function findByCpfOrEmail(string $cpf, ?string $email, ?string $exceptId = null, bool $withTrashed = false): ?Usuario
    {
        $cpf = UtilService::onlyNumbers(trim($cpf));
        $email = is_string($email) ? trim($email) : '';

        if ($cpf === '' && $email === '') {
            return null;
        }

        /** @var Builder|Usuario $query */
        $query = $this->query();

        if ($withTrashed) {
            $query->withTrashed();
        }

        $query->where(function ($q) use ($cpf, $email) {
            if ($cpf !== '') {
                $q->where('cpf', $cpf);
            }

            if ($email === '') {
                return;
            }

            if ($cpf !== '') {
                $q->orWhere('email', $email);
            }

            if ($cpf === '') {
                $q->where('email', $email);
            }
        });

        if ($exceptId) {
            $query->where('id', '!=', $exceptId);
        }

        /** @var Usuario|null $usuario */
        $usuario = $query->first();
        return $usuario;
    }

    public function isParticipanteHabilitado(string $usuarioId, string $programaId): bool
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()->find($usuarioId);
        if (!$usuario) return false;

        /** @var \App\Models\ProgramaParticipante|null $participacao */
        $participacao = $usuario->participacoesProgramas()
            ->where('programa_id', $programaId)
            ->first();

        return $participacao ? (bool) $participacao->habilitado : false;
    }

    public function isIntegrante(string $usuarioId, string $unidadeId, string $atribuicao): bool
    {
        return UnidadeIntegranteAtribuicao::where('atribuicao', $atribuicao)
            ->whereHas('vinculo', function ($q) use ($unidadeId, $usuarioId) {
                $q->where('unidade_id', $unidadeId)
                  ->where('usuario_id', $usuarioId);
            })
            ->exists();
    }

    public function getAtribuicoes(string $usuarioId, string $unidadeId): array
    {
        return UnidadeIntegranteAtribuicao::whereHas('vinculo', function ($q) use ($unidadeId, $usuarioId) {
                $q->where('unidade_id', $unidadeId)
                  ->where('usuario_id', $usuarioId);
            })
            ->pluck('atribuicao')
            ->toArray();
    }

    public function isLotacao(string $usuarioId, string $unidadeId): bool
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()->find($usuarioId);
        return $usuario && $usuario->lotacao !== null && $usuario->lotacao->unidade_id == $unidadeId;
    }

    public function findAllSemMatricula(): Collection
    {
        return $this->query()
            ->where(function ($q) {
                $q->whereNull('matricula')
                    ->orWhere('matricula', '');
            })
            ->whereNotNull('cpf')
            ->whereRaw("cpf <> ''")
            ->select('id', 'cpf')
            ->get();
    }

    public function findByCpfAndLotacao(string $cpf, string $unidadeId, string $lotacaoAtribuicao = 'LOTADO'): ?Usuario
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()
            ->where('cpf', $cpf)
            ->whereHas('lotacao', function ($q) use ($unidadeId) {
                $q->where('unidade_id', $unidadeId);
            })
            ->orderBy('created_at', 'asc')
            ->first();

        return $usuario;
    }

    public function findAllByCpf(string $cpf): Collection
    {
        return $this->query()
            ->with('unidades')
            ->where('cpf', $cpf)
            ->where('situacao_siape', '!=', \App\Enums\UsuarioSituacaoSiape::INATIVO->value)
            ->get();
    }

    public function getUnidadesVinculadas(string $cpf): Collection
    {
        return Unidade::select('unidades.*')
            ->join('unidades_integrantes as ui', 'unidades.id', '=', 'ui.unidade_id')
            ->join('usuarios as us', 'us.id', '=', 'ui.usuario_id')
            ->join('unidades_integrantes_atribuicoes as uia', 'ui.id', '=', 'uia.unidade_integrante_id')
            ->where('us.cpf', $cpf)
            ->where('us.situacao_siape', '!=', \App\Enums\UsuarioSituacaoSiape::INATIVO->value)
            ->whereNull('uia.deleted_at')
            ->distinct()
            ->get();
    }

    public function search(array $params, int $limit = 0)
    {
        $query = $this->query();
        $this->applySearchFilters($query, $params);

        if ($limit > 0) {
            return $query->paginate($limit);
        }

        return $query->get();
    }

    public function findByMatricula(string $matricula): ?Usuario
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()->where('matricula', $matricula)->first();
        return $usuario;
    }

    public function findAllByNomeMatricula(string $nomeMatricula, ?string $unidadeId = null): Collection
    {
        $term = '%' . $nomeMatricula . '%';
        $query = $this->query()
            ->where(function ($q) use ($term) {
                $q->where('nome', 'like', $term)
                  ->orWhere('matricula', 'like', $term);
            });

        if ($unidadeId !== null && $unidadeId !== '') {
            $query->whereHas('lotacao', function ($q) use ($unidadeId) {
                $q->where('unidade_id', $unidadeId);
            });
        }

        return $query->with(['lotacao'])->get();
    }

    public function findAgentesPublicosNoEscopoCadastrante(string $nomeMatricula, string $cadastranteId, int $limite = 50): Collection
    {
        $unidadesEscopoIds = $this->resolverUnidadesEscopoCadastrante($cadastranteId);
        if ($unidadesEscopoIds === []) {
            /** @var Collection<int, Usuario> */
            return $this->model->newCollection();
        }

        $term = '%' . $nomeMatricula . '%';
        $tabelaUsuarios = $this->model->getTable();

        /** @var Collection<int, Usuario> */
        return $this->query()
            ->select(["{$tabelaUsuarios}.id", "{$tabelaUsuarios}.nome", "{$tabelaUsuarios}.matricula", "{$tabelaUsuarios}.cpf"])
            ->where(function ($q) use ($term, $tabelaUsuarios) {
                $q->where("{$tabelaUsuarios}.nome", 'like', $term)
                    ->orWhere("{$tabelaUsuarios}.matricula", 'like', $term);
            })
            ->whereHas('perfil', fn ($q) => $q->where('nivel', '<', PerfilEnum::COLABORADOR->value))
            ->whereHas('areasTrabalho', fn ($q) => $q->whereIn('unidade_id', $unidadesEscopoIds))
            ->with(['lotacao:id,usuario_id,unidade_id', 'lotacao.unidade:id,unidade_pai_id'])
            ->limit($limite)
            ->get();
    }

    /**
     * Unidades de atribuição ativa do cadastrante + subordinadas (CTE recursiva, sem path).
     *
     * @return list<string>
     */
    private function resolverUnidadesEscopoCadastrante(string $cadastranteId): array
    {
        $unidadesDiretas = $this->unidadeIntegranteRepository
            ->findAllComAtribuicoesAtivasByUsuario($cadastranteId)
            ->pluck('unidade_id')
            ->toArray();

        $subordinadasIds = $this->unidadeRepository
            ->getSubordinadasRecursivas($unidadesDiretas)
            ->pluck('id')
            ->toArray();

        return array_values(array_unique(array_merge($unidadesDiretas, $subordinadasIds)));
    }

    public function agenteEstaLotadoOuVinculadoNaUnidade(string $agenteId, string $unidadeId): bool
    {
        $usuario = $this->query()->find($agenteId);
        if ($usuario === null) {
            return false;
        }

        if ($usuario->lotacao !== null && $usuario->lotacao->unidade_id === $unidadeId) {
            return true;
        }

        return $this->query()
            ->whereKey($agenteId)
            ->whereHas('areasTrabalho', function ($q) use ($unidadeId) {
                $q->where('unidade_id', $unidadeId)
                    ->whereHas('atribuicoes', function ($qAtrib) {
                        $qAtrib->whereIn('atribuicao', [
                            Atribuicao::LOTADO->value,
                            Atribuicao::COLABORADOR->value,
                        ]);
                    });
            })
            ->exists();
    }

    public function findByEmail(?string $email): ?Usuario
    {
        $email = is_string($email) ? trim($email) : '';

        if ($email === '') {
            return null;
        }

        /** @var Usuario|null $usuario */
        $usuario = $this->query()->where('email', $email)->first();
        return $usuario;
    }

    public function findActivesByCpf(string $cpf): Collection
    {
        /** @var Collection $usuarios */
        $usuarios = $this->query()
            ->where('cpf', $cpf)
            ->whereIn('situacao_siape', \App\Enums\UsuarioSituacaoSiape::ativos())
            ->get();
        return $usuarios;
    }

    public function loadUserWithRelations(string $userId, string $entidadeId): ?Usuario
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()->where("id", $userId)->with([
            "areasTrabalho" => function ($query) use ($entidadeId) {
                $query->with(["unidade.gestor.usuario", "unidade.gestoresSubstitutos.usuario", "unidade.gestoresDelegados.usuario", "unidade.cidade", "unidade.planosEntrega", "unidade.unidadePai.planosEntrega", "atribuicoes"])
                      ->whereHas('unidade', fn($q) => $q->where('entidade_id', $entidadeId));
            },
            "participacoesProgramas" => fn($q) => $q->where("habilitado", 1),
            "perfil.capacidades:id,perfil_id,tipo_capacidade_id",
            "perfil.capacidades.tipoCapacidade:id,codigo",
            "gerenciaTitular.atribuicoes",
            "gerenciaTitular.unidade",
            "gerenciasSubstitutas.atribuicoes",
            "gerenciasSubstitutas.unidade",
            "gerenciasDelegadas.atribuicoes",
            "gerenciasDelegadas.unidade",
            "notificacoesDestinatario" => fn($q) => $q->where('data_leitura', null)
        ])->first();

        return $usuario;
    }

    public function findWithAreaTrabalho(string $userId, string $unidadeId): ?Usuario
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()->where('id', $userId)
            ->with(['areasTrabalho' => fn($q) => $q->where('unidade_id', $unidadeId)])
            ->first();
        return $usuario;
    }

    public function findByCpf(string $cpf): ?Usuario
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()->where('cpf', $cpf)->first();
        return $usuario;
    }

    public function findAllByCpfWithLotacao(string $cpf): Collection
    {
        return $this->model->newQuery()
            ->with(['lotacao.unidade'])
            ->where('cpf', $cpf)
            ->get();
    }

    public function findAllByCpfUnfiltered(string $cpf): Collection
    {
        return $this->model->newQuery()
            ->with(['lotacao.unidade'])
            ->where('cpf', $cpf)
            ->get();
    }

    /**
     * Applies filters similar to proxyQuery
     */
    private function applySearchFilters(Builder $query, array $params): void
    {
        // This is a simplified adaptation of proxyQuery logic.
        // In a full refactor, we should clean up the $params structure.
        // Assuming $params['where'] contains the conditions.

        if (isset($params['where']) && is_array($params['where'])) {
            foreach ($params['where'] as $condition) {
                if (is_array($condition)) {
                     // Handle special conditions
                    if ($condition[0] == "lotacao") {
                        $query->whereHas('areasTrabalho', function (Builder $q) use ($condition) {
                            $q->where('unidade_id', $condition[2]);
                        });
                    } elseif ($condition[0] == "habilitado") {
                         if ($condition[2] == true) {
                            $query->whereHas('participacoesProgramas', function (Builder $q) {
                                $q->where('habilitado', 1);
                            });
                        } elseif ($condition[2] !== null) {
                            $query->whereHas('participacoesProgramas', function (Builder $q) {
                                $q->where('habilitado', 0);
                            });
                        }
                    } elseif ($condition[0] == "atribuicoes") {
                        $query->whereHas('unidadesIntegranteAtribuicoes', function (Builder $q) use ($condition) {
                            $q->whereIn('atribuicao', $condition[2]);
                        });
                    } elseif ($condition[0] == "subordinadas") {
                        // Handled separately or ignored if not relevant for query building
                    } elseif ($condition[0] == "deleted_at") {
                        if ($condition[2] === null) {
                             $query->whereNull('deleted_at');
                        }
                    } else {
                         // Standard where
                         if (count($condition) == 3) {
                             $query->where($condition[0], $condition[1], $condition[2]);
                         }
                    }
                } elseif ($condition instanceof RawWhere) {
                    $query->whereRaw($condition->expression, $condition->params);
                }
            }
        }

        // Handle text search if present
        if (isset($params['query']) && !empty($params['query'])) {
             $text = "%" . str_replace(" ", "%", $params['query']) . "%";
             $fields = $params['fields'] ?? ['nome', 'email', 'cpf', 'matricula', 'apelido'];

             $query->where(function($q) use ($fields, $text) {
                 foreach ($fields as $field) {
                     $q->orWhere($field, 'like', $text);
                 }
             });
        }

        if (isset($params['orderBy']) && is_array($params['orderBy'])) {
            foreach ($params['orderBy'] as $order) {
                if (!is_array($order)) continue;
                $field = $order[0] ?? null;
                if (!is_string($field) || $field === '' || str_contains($field, '.')) continue;
                $direction = strtolower((string) ($order[1] ?? 'asc'));
                $query->orderBy($field, $direction === 'desc' ? 'desc' : 'asc');
            }
        }
    }

    public function findOneParaEnvio(string $id): ?Usuario
    {
        return $this->model->newQuery()
            ->with([
                'unidadesIntegrantes' => function ($query) {
                    $query->whereHas('atribuicoes', function ($query) {
                        $query
                            ->where('atribuicao', 'LOTADO')
                            ->whereNull('deleted_at');
                    });
                },
            ])
            ->find($id);
    }

    // lista os usuário para envio ao PGD
    public function findAllParaEnvio(int $chunkSize, callable $onChunk): void
    {
        DB::table('usuarios')
            ->whereNull('usuarios.deleted_at')
            ->whereExists(function ($q) {
                $q->select(DB::raw(1))
                    ->from('planos_trabalhos as pt')
                    ->whereColumn('pt.usuario_id', 'usuarios.id')
                    ->whereNull('pt.deleted_at')
                    ->limit(1);
            })
            ->whereExists(function ($q) {
                $q->select(DB::raw(1))
                    ->from('documentos_assinaturas as da')
                    ->whereColumn('da.usuario_id', 'usuarios.id')
                    ->whereNull('da.deleted_at')
                    ->limit(1);
            })
            ->select('usuarios.id')
            ->orderBy('usuarios.id')
            ->chunkById($chunkSize, function (SupportCollection $usuarios) use ($onChunk): void {
                $onChunk($usuarios);
            });
    }
}
