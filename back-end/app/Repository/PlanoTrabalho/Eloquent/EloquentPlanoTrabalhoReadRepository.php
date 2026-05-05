<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Eloquent;

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\Models\PlanoTrabalho;
use App\Enums\StatusEnum;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class EloquentPlanoTrabalhoReadRepository extends AbstractEloquentReadRepository implements PlanoTrabalhoReadRepositoryContract
{
    public function __construct(PlanoTrabalho $model)
    {
        $this->model = $model;
    }

    public function findById(string|int $id): ?PlanoTrabalho
    {
        if ($id === '' || $id === 0) {
            return null;
        }

        $found = parent::findById($id);

        return $found instanceof PlanoTrabalho ? $found : null;
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

    public function buscarPlanosListagem(PlanoTrabalhoIndexDTO $filtro): LengthAwarePaginator
    {
        /** @var \Illuminate\Database\Eloquent\Builder<PlanoTrabalho> $queryBase */
        $queryBase = PlanoTrabalho::query();

        $query = $queryBase->select('planos_trabalhos.id', 'planos_trabalhos.numero', 'planos_trabalhos.usuario_id', 'planos_trabalhos.unidade_id', 'planos_trabalhos.modalidade_pgd', 'planos_trabalhos.data_inicio', 'planos_trabalhos.data_fim', 'planos_trabalhos.data_arquivamento', 'planos_trabalhos.status')
              ->with(['usuario:id,nome', 'unidade:id,nome,sigla']);

        if($filtro->hierarquia){
            $queryHierarquia = '`fn_obter_unidade_hierarquia`(`unidade_id`)';

            $query->addSelect(DB::raw("$queryHierarquia AS hierarquia"))
                 ->orderBy(DB::raw($queryHierarquia));
        }

        if($filtro->arquivados){
            $query->whereNotNull('data_arquivamento');
        }else{
            $query->whereNull('data_arquivamento');
        }

        if ($filtro->unidadesId !== null) {
            $query->whereIn('unidade_id', $filtro->unidadesId);
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
            $query->where('modalidade_pgd', $filtro->modalidadePgd);
        }

        if ($filtro->status !== null) {
            $query->where('status', $filtro->status);
        }

        if ($filtro->vigentes) {
            $today = today();
            $query->where('data_inicio', '<=', $today)
                  ->where('data_fim', '>=', $today)
                  ->where('status', StatusEnum::ATIVO->value);
        }

        if ($filtro->usuarioNome !== null && $filtro->usuarioNome !== '') {
            $query->whereHas('usuario', fn ($q) => $q->where('nome', 'like', '%' . $filtro->usuarioNome . '%'));
        }

        if ($filtro->unidadeRegramento !== null && $filtro->unidadeRegramento !== '') {
            $termo = '%' . strtolower($filtro->unidadeRegramento) . '%';
            $query->whereHas('unidade', fn ($q) => $q->whereRaw('LOWER(sigla) like ?', [$termo])
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
            'usuario:id,nome,apelido',
            'unidade:id,sigla,nome',
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
}
