<?php

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\Enums\RelatorioGeracaoTipo;
use App\Services\RelatorioPlanoTrabalhoDetalhadoService;
use App\Services\RelatorioPlanoTrabalhoService;

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
        };
    }
}
