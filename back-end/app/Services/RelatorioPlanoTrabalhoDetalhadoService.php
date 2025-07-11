<?php

namespace App\Services;

use App\Services\RelatorioPlanoTrabalhoService;

class RelatorioPlanoTrabalhoDetalhadoService extends RelatorioPlanoTrabalhoService
{
    public function __construct()
    {
        parent::__construct();
        $this->collection = "App\Models\ViewRelatorioPlanoTrabalhoDetalhado";
    }
}
