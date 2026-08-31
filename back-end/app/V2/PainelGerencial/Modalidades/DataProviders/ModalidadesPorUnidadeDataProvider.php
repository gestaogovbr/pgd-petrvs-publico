<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Modalidades\DataProviders;

use App\Enums\ParticipaPgd;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\Support\ModalidadePgd;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Collection;

class ModalidadesPorUnidadeDataProvider
{
    use ResolveHierarquiaPainel;

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

        $segmentos = array_map(
            fn (array $opt) => $opt['value'],
            ModalidadePgd::options()
        );
        $modalidadeKeys = ModalidadePgd::keys();

        $distribuicoes = [];
        $distribuicoes[] = $this->calcularDistribuicao($unidade, $modalidadeKeys);

        foreach ($filhas as $filha) {
            $distribuicoes[] = $this->calcularDistribuicao($filha, $modalidadeKeys);
        }

        return (new IndicadorDTO(
            segmentos: $segmentos,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    /**
     * @param string[] $modalidadeKeys
     */
    private function calcularDistribuicao(Unidade $unidade, array $modalidadeKeys): DistribuicaoUnidadeDTO
    {
        $unidadeIds = $this->idsComTodasSubordinadas($unidade);

        $contagens = Usuario::query()
            ->where('participa_pgd', ParticipaPgd::SIM->value)
            ->whereNull('usuarios.deleted_at')
            ->whereHas('unidadesIntegrantes', function ($q) use ($unidadeIds) {
                $q->whereIn('unidade_id', $unidadeIds)
                    ->whereHas('atribuicoes');
            })
            ->selectRaw('modalidade_pgd, COUNT(*) as total')
            ->groupBy('modalidade_pgd')
            ->pluck('total', 'modalidade_pgd');

        $valores = array_map(
            fn (string $key) => (int) ($contagens[$key] ?? 0),
            $modalidadeKeys
        );

        $total = array_sum($valores);

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: $valores,
            total: $total,
        );
    }
}
