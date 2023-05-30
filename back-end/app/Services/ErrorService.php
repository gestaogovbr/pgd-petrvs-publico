<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Error;

class ErrorService extends ServiceBase {

    public function showResponsaveis() {
        $erros = Error::all()->map( function($erro) { return ['key' => $erro->user ? $erro->user->id ?? '' : '', 'value' => $erro->user ? $erro->user->nome ?? '' : '']; })
                ->unique()->reject( function($erro) { return !$erro || $erro['key'] == ''; } )->toArray();
        $result = array_merge([['key' => "null", 'value' => 'Usuário não identificado']],$erros);
        usort($result, function ($a, $b) {return strnatcmp($a['value'], $b['value']);});
        return $result;
    }

    public function proxyQuery($query, &$data) {
        $where = [];
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "user_id") {
                if(!$condition[2]) array_push($where, ['user', '==', null]); else {
                    //$sql = "JSON_SEARCH(errors, user, ?)";
                    //array_push($where, RawWhere::raw($sql, [$condition[2]]));
                };
            } else { array_push($where, $condition); }
        }
        $data["where"] = $where;
    }
}
