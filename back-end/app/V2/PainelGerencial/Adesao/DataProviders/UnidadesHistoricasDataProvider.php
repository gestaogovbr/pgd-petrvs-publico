<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao\DataProviders;

use App\V2\PainelGerencial\DTOs\UnidadeResumoDTO;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class UnidadesHistoricasDataProvider
{
    /**
     * Retorna lista unificada de unidades combinando dados atuais e históricos.
     * Unidades atuais (tabela unidades) têm prioridade sobre dados da série.
     * Unidades que existem apenas na série (deletadas/renomeadas) também são retornadas.
     *
     * @return UnidadeResumoDTO[]
     */
    public function getData(): array
    {
        $atuais = DB::table('unidades')
            ->select('id', 'sigla', 'nome')
            ->get()
            ->keyBy('id');

        $historicasSerie1 = DB::table('serie_unidades_executoras')
            ->select('unidade_id as id', 'unidade_sigla as sigla', 'unidade_nome as nome')
            ->distinct()
            ->get();

        $historicasSerie2 = DB::table('serie_participantes_pgd')
            ->select('unidade_id as id', 'unidade_sigla as sigla', 'unidade_nome as nome')
            ->distinct()
            ->get();

        $unificadas = $atuais;

        $this->mergeHistoricas($unificadas, $historicasSerie1);
        $this->mergeHistoricas($unificadas, $historicasSerie2);

        return $unificadas
            ->sortBy('sigla')
            ->values()
            ->map(fn ($u) => UnidadeResumoDTO::fromRow($u))
            ->toArray();
    }

    private function mergeHistoricas(Collection &$unificadas, Collection $historicas): void
    {
        foreach ($historicas as $h) {
            if ($unificadas->has($h->id)) {
                continue;
            }

            $unificadas->put($h->id, $h);
        }
    }
}
