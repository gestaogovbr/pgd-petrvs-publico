<?php

namespace App\Services;

use App\Services\ServiceBase;

class LookupService {

    const DIA_SEMANA = [
        [ 'key' => 0, 'code' => "domingo", 'value' => "Domingo" ],
        [ 'key' => 1, 'code' => "segunda", 'value' => "Segunda-feira" ],
        [ 'key' => 2, 'code' => "terca", 'value' => "Terça-feira" ],
        [ 'key' => 3, 'code' => "quarta", 'value' => "Quarta-feira" ],
        [ 'key' => 4, 'code' => "quinta", 'value' => "Quinta-feira" ],
        [ 'key' => 5, 'code' => "sexta", 'value' => "Sexta-feira" ],
        [ 'key' => 6, 'code' => "sabado", 'value' => "Sábado" ]
    ];

    public static function getCode($itens, $k) : string {
        return array_values(array_filter($itens, function($d) use ($k) {return $d['key'] == $k;}))[0]['code'];
    }

    public static function getValue($itens, $k) : string {
        return array_values(array_filter($itens, function($d) use ($k) {return $d['key'] == $k;}))[0]['value'];
    }
}

