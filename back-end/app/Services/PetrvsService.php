<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Services\UtilService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PetrvsService extends ServiceBase
{
    public function showTables() {
        $tabelas = [];
        $result = DB::select('show tables');
        /**
         * SHOW TABLES devolve um array de objetos do tipo {'key' => 'value'}, onde 'value' é o nome da tabela e 'key' é uma
         * expressão que depende do nome do banco ('Tables_in_' + database_name). Como o nome do banco varia de ambiente para
         * ambiente, optamos por transformar cada objeto do array em um array através do cast, e assim obtermos o seu valor
         * através da função array_values usando índice [0], que independe do nome da chave. 
         */
        foreach($result as $r){
            array_push($tabelas, [
                'key' => array_values((array)$r)[0],
                'value' => UtilService::inicialMaiuscula(array_values((array)$r)[0])
            ]);
        }
        /*  $tabelas = array_map(fn($t) => [
            'key' => $t->Tables_in_petrvs, 
            'value' => $util->inicialMaiuscula($t->Tables_in_petrvs)
        ], DB::select('SHOW TABLES')); */
        return $tabelas;
    }

}
