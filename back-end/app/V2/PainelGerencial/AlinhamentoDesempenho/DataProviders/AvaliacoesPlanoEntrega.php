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

class AvaliacoesPlanoEntrega
{
    use ResolveHierarquiaPainel;

    private const TITULO = 'Notas das avaliações dos Planos de Entregas por Unidade organizacional';
    private const INFORMACAO_ADICIONAL = 'Apresenta a distribuição percentual das notas atribuídas aos Planos de Entregas por unidade organizacional.';
    private const ORIGEM_DADOS = 'Sistema PGD Petrvs';

    // TODO: buscar dinamicamente de tipos_avaliacoes_notas
    private const SEGMENTOS = ['Excepcional', 'Alto desempenho', 'Adequado', 'Inadequado', 'Não executado'];

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
        // - Contar avaliações de planos de entrega por nota (tipo_avaliacao_nota_id)
        // - Plano de entrega vinculado a esta unidade (planos_entregas.unidade_id)
        // - Filtrar por data_avaliacao se $filtros->isHistorico()

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [0, 0, 0, 0, 0],
            total: 0,
        );
    }
}
