<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class RelatorioPlanoTrabalhoService extends ServiceBase
{
    public function __construct()
    {
        parent::__construct("App\Models\ViewRelatorioPlanoTrabalho");
    }
}
