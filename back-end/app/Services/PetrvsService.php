<?php

namespace App\Services;

use App\Models\Atividade;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;

class PetrvsService extends ServiceBase
{
    public function showTables() {
        $tabelas = array_map(fn($t) => $t->Tables_in_petrvs, DB::select('SHOW TABLES'));
        return $tabelas;
    }

}
