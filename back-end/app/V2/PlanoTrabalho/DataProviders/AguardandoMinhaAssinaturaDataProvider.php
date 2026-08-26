<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DataProviders;

use App\Enums\Atribuicao;
use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\PlanoTrabalhoRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class AguardandoMinhaAssinaturaDataProvider
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly DocumentoAssinaturaRepository $documentoAssinaturaRepository,
    ) {}

    public function buscar(string $usuarioId, int $page = 1, int $perPage = 15): LengthAwarePaginator
    {
        $gerenciadas = $this->resolverGerenciadas($usuarioId);

        return PlanoTrabalho::query()
            ->where('status', StatusEnum::AGUARDANDO_ASSINATURA->value)
            ->whereNotNull('documento_id')
            ->whereNotExists(function ($sub) use ($usuarioId) {
                $this->documentoAssinaturaRepository->subqueryUsuarioJaAssinou($sub, $usuarioId);
            })
            ->where(function ($q) use ($usuarioId, $gerenciadas) {
                // PTs do próprio usuário (como participante)
                $q->where('usuario_id', $usuarioId);

                // OU PTs de outros onde o logado é gestor direto E chefia ainda não assinou
                if (!empty($gerenciadas)) {
                    $q->orWhere(function ($outros) use ($usuarioId, $gerenciadas) {
                        $outros->where('usuario_id', '!=', $usuarioId)
                            ->whereIn('unidade_id', $gerenciadas)
                            ->whereNotExists(function ($sub) use ($usuarioId) {
                                $this->subqueryChefeSubstitutoNaoAssinaGestorTitular($sub, $usuarioId);
                            })
                            ->whereNotExists(function ($sub) {
                                $this->subqueryChefiJaAssinou($sub);
                            });
                    });
                }
            })
            ->with(['unidade:id,sigla,nome', 'usuario:id,nome,apelido'])
            ->orderByDesc('updated_at')
            ->paginate(perPage: $perPage, page: $page);
    }

    public function count(string $usuarioId): int
    {
        $gerenciadas = $this->resolverGerenciadas($usuarioId);

        return PlanoTrabalho::query()
            ->where('status', StatusEnum::AGUARDANDO_ASSINATURA->value)
            ->whereNotNull('documento_id')
            ->whereNotExists(function ($sub) use ($usuarioId) {
                $this->documentoAssinaturaRepository->subqueryUsuarioJaAssinou($sub, $usuarioId);
            })
            ->where(function ($q) use ($usuarioId, $gerenciadas) {
                $q->where('usuario_id', $usuarioId);

                if (!empty($gerenciadas)) {
                    $q->orWhere(function ($outros) use ($usuarioId, $gerenciadas) {
                        $outros->where('usuario_id', '!=', $usuarioId)
                            ->whereIn('unidade_id', $gerenciadas)
                            ->whereNotExists(function ($sub) use ($usuarioId) {
                                $this->subqueryChefeSubstitutoNaoAssinaGestorTitular($sub, $usuarioId);
                            })
                            ->whereNotExists(function ($sub) {
                                $this->subqueryChefiJaAssinou($sub);
                            });
                    });
                }
            })
            ->count();
    }

    /** @return string[] */
    private function resolverGerenciadas(string $usuarioId): array
    {
        return DB::table('unidades_integrantes as ui')
            ->join('unidades_integrantes_atribuicoes as uia', 'uia.unidade_integrante_id', '=', 'ui.id')
            ->where('ui.usuario_id', $usuarioId)
            ->whereIn('uia.atribuicao', Atribuicao::chefia())
            ->pluck('ui.unidade_id')
            ->unique()
            ->values()
            ->toArray();
    }

    private function subqueryChefiJaAssinou(\Illuminate\Database\Query\Builder $query): void
    {
        $query->select(DB::raw(1))
            ->from('documentos_assinaturas')
            ->whereColumn('documentos_assinaturas.documento_id', 'planos_trabalhos.documento_id')
            ->whereColumn('documentos_assinaturas.usuario_id', '!=', 'planos_trabalhos.usuario_id')
            ->whereNull('documentos_assinaturas.deleted_at');
    }

    /**
     * Exclui PTs onde o dono é gestor titular da unidade e o usuário logado é substituto na mesma unidade.
     * Nesse caso, o substituto não assina o PT do titular.
     */
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
