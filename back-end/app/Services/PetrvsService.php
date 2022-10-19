<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Services\UtilService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PetrvsService extends ServiceBase
{
    public function showTables() {
        $util = new UtilService();
        $tabelas = array_map(fn($t) => [
            'key' => $t->Tables_in_petrvs, 
            'value' => $util->inicialMaiuscula($t->Tables_in_petrvs)
        ] , DB::select('SHOW TABLES'));
        return $tabelas;
    }

}
