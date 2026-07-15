<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\AlinhamentoDesempenho\DataProviders;

use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Collection;

class AlinhamentoInstitucional
{
    use ResolveHierarquiaPainel;

    private const TITULO = 'Alinhamento institucional das Unidades por nível estratégico';
    private const INFORMACAO_ADICIONAL = 'Apresenta a distribuição percentual das entregas de acordo com seu nível de alinhamento institucional, considerando entregas vinculadas ao Planejamento Institucional, à Cadeia de Valor e entregas sem vinculação. São consideradas vinculadas ao Planejamento Institucional as entregas cujo encadeamento alcance o nível de Objetivo Estratégico (nível 1). São consideradas vinculadas à Cadeia de Valor as entregas cujo encadeamento alcance, no mínimo, o terceiro nível de processo (nível 3).';
    private const ORIGEM_DADOS = 'Sistema PGD Petrvs';

    private const SEGMENTOS = [
        'Vinculadas a Objetivos Estratégicos ao PEI',
        'Vinculadas a Processo da CV',
        'Não vinculadas',
    ];

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function getData(FiltrosPainelDTO $filtros): IndicadorDTO
    {
        $hierarquia = $this->resolverHierarquia($filtros->unidadeId);
        /** @var Unidade $unidade */
        $unidade = $hierarquia['unidade'];
        /** @var Collection<int, Unidade> $filhas */
        $filhas = $hierarquia['filhas'];

        $distribuicoes = [];
        $distribuicoes[] = $this->calcularDistribuicao($unidade, $filtros);

        foreach ($filhas as $filha) {
            $distribuicoes[] = $this->calcularDistribuicao($filha, $filtros);
        }

        return (new IndicadorDTO(
            titulo: self::TITULO,
            informacaoAdicional: self::INFORMACAO_ADICIONAL,
            origemDados: self::ORIGEM_DADOS,
            segmentos: self::SEGMENTOS,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    private function calcularDistribuicao(Unidade $unidade, FiltrosPainelDTO $filtros): DistribuicaoUnidadeDTO
    {
        // TODO: implementar consulta real
        // - Contar entregas vinculadas a PEI (encadeamento até objetivo nível 1)
        // - Contar entregas vinculadas a CV (encadeamento até processo nível 3+)
        // - Contar entregas sem vínculo
        // - Filtrar por período se $filtros->isHistorico()

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [0, 0, 0],
            total: 0,
        );
    }
}
