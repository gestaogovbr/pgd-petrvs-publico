<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao\DataProviders;

use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ParticipantesPGDDataProvider
{
    use ResolveHierarquiaPainel;

    private const SEGMENTOS = ['Participantes', 'Não Participantes'];
    private const ATRIBUICOES_PARTICIPANTE = ['LOTADO', 'COLABORADOR'];

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function getData(FiltrosPainelDTO $filtros): IndicadorDTO
    {
        if ($filtros->isHistorico()) {
            return $this->getDataHistorico($filtros);
        }

        return $this->getDataSituacaoAtual($filtros);
    }

    private function getDataSituacaoAtual(FiltrosPainelDTO $filtros): IndicadorDTO
    {
        $unidade = $this->getUnidadeRepository()->findById($filtros->unidadeId);

        if (!$unidade) {
            return new IndicadorDTO(segmentos: self::SEGMENTOS, distribuicoes: []);
        }

        /** @var Collection<int, Unidade> $filhas */
        $filhas = $this->getUnidadeRepository()->getSubordinadas([$unidade->id]);

        $distribuicoes = [];
        $distribuicoes[] = $this->calcularDistribuicaoAtual($unidade);

        foreach ($filhas as $filha) {
            $distribuicoes[] = $this->calcularDistribuicaoAtual($filha);
        }

        return (new IndicadorDTO(
            segmentos: self::SEGMENTOS,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    private function getDataHistorico(FiltrosPainelDTO $filtros): IndicadorDTO
    {
        $periodo = $this->extrairUltimoPeriodo($filtros);

        $unidadeId = $filtros->unidadeId;

        $filhasIds = DB::table('serie_participantes_pgd')
            ->where('unidade_pai_id', $unidadeId)
            ->where('periodo', $periodo)
            ->pluck('unidade_id')
            ->toArray();

        $registroPai = DB::table('serie_participantes_pgd')
            ->where('unidade_id', $unidadeId)
            ->where('periodo', $periodo)
            ->first();

        if (!$registroPai) {
            return new IndicadorDTO(segmentos: self::SEGMENTOS, distribuicoes: []);
        }

        $distribuicoes = [];
        $distribuicoes[] = new DistribuicaoUnidadeDTO(
            unidadeId: $registroPai->unidade_id,
            unidadeSigla: $registroPai->unidade_sigla,
            valores: [(int) $registroPai->participantes_qtd, (int) $registroPai->nao_participantes_qtd],
            total: (int) $registroPai->participantes_qtd + (int) $registroPai->nao_participantes_qtd,
        );

        $registrosFilhas = DB::table('serie_participantes_pgd')
            ->whereIn('unidade_id', $filhasIds)
            ->where('periodo', $periodo)
            ->get();

        foreach ($registrosFilhas as $r) {
            $distribuicoes[] = new DistribuicaoUnidadeDTO(
                unidadeId: $r->unidade_id,
                unidadeSigla: $r->unidade_sigla,
                valores: [(int) $r->participantes_qtd, (int) $r->nao_participantes_qtd],
                total: (int) $r->participantes_qtd + (int) $r->nao_participantes_qtd,
            );
        }

        return (new IndicadorDTO(
            segmentos: self::SEGMENTOS,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    private function calcularDistribuicaoAtual(Unidade $unidade): DistribuicaoUnidadeDTO
    {
        $unidadeIds = $this->idsComTodasSubordinadas($unidade);

        $usuarios = $this->usuarioRepository->findIntegrantesPorUnidades($unidadeIds, self::ATRIBUICOES_PARTICIPANTE);

        $participantes = $usuarios->filter(fn ($u) => $u->participa_pgd === 'sim')->count();
        $naoParticipantes = $usuarios->count() - $participantes;

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$participantes, $naoParticipantes],
            total: $usuarios->count(),
        );
    }

    private function extrairUltimoPeriodo(FiltrosPainelDTO $filtros): string
    {
        if (!$filtros->dataFim) {
            return now()->format('Y-m');
        }

        return \Carbon\Carbon::parse($filtros->dataFim)->format('Y-m');
    }
}
