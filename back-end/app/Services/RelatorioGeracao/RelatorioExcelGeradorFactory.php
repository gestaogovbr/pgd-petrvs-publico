<?php

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use App\Services\RelatorioAgenteAuthorization;
use App\Services\RelatorioAgenteService;
use App\Services\RelatorioPlanoEntregaService;
use App\Services\RelatorioPlanoTrabalhoDetalhadoService;
use App\Services\RelatorioPlanoTrabalhoService;
use App\Services\RelatorioUnidadeService;
use App\V2\RelatorioEntrega\RelatorioEntregaService;

class RelatorioExcelGeradorFactory
{
    public function make(RelatorioGeracaoTipo $tipo, RelatorioGeracao $geracao): RelatorioExcelGeradorContract
    {
        return match ($tipo) {
            RelatorioGeracaoTipo::PLANO_TRABALHO => new RelatorioPlanoTrabalhoExcelGerador(
                app(RelatorioPlanoTrabalhoService::class)
            ),
            RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO => new RelatorioPlanoTrabalhoDetalhadoExcelGerador(
                app(RelatorioPlanoTrabalhoDetalhadoService::class)
            ),
            RelatorioGeracaoTipo::PLANO_ENTREGA => new RelatorioPlanoEntregaExcelGerador(
                app(RelatorioPlanoEntregaService::class)
            ),
            RelatorioGeracaoTipo::AGENTE => new RelatorioAgenteExcelGerador(
                app(RelatorioAgenteService::class),
                app(RelatorioAgenteAuthorization::class),
                $geracao,
            ),
            RelatorioGeracaoTipo::UNIDADE => new RelatorioUnidadeExcelGerador(
                app(RelatorioUnidadeService::class)
            ),
            RelatorioGeracaoTipo::ENTREGA => new RelatorioEntregaExcelGerador(
                app(RelatorioEntregaService::class)
            ),
        };
    }
}
