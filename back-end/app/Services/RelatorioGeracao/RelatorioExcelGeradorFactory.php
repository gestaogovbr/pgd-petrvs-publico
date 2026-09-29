<?php

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\Enums\RelatorioGeracaoTipo;
use App\Services\RelatorioAgenteService;
use App\Services\RelatorioPlanoEntregaService;
use App\Services\RelatorioPlanoTrabalhoDetalhadoService;
use App\Services\RelatorioPlanoTrabalhoService;
use App\Services\RelatorioUnidadeService;

class RelatorioExcelGeradorFactory
{
    public function make(RelatorioGeracaoTipo $tipo): RelatorioExcelGeradorContract
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
                app(RelatorioAgenteService::class)
            ),
            RelatorioGeracaoTipo::UNIDADE => new RelatorioUnidadeExcelGerador(
                app(RelatorioUnidadeService::class)
            ),
        };
    }
}
