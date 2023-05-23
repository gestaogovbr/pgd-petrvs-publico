<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Error;

class ErrorService extends ServiceBase {

    public function showResponsaveis() {
        $erros = Error::all()->map( function($erro) {
            if($erro->user) {
                if($erro->user['id'] && $erro->user['nome']){
                    return ['key' => $erro->user['id'], 'value' => $erro->user['nome']];
                } else {
                    return ['key' => '', 'value' => ''];
                }
            }
            //return ['key' => $erro->user ? $erro->user['id'] ?? '' : '', 'value' => $erro->user ? $erro->user['nome'] ?? '' : '']; 
        });
        $erros = $erros->unique()->reject( function($erro) { return $erro['key'] == ''; } )->toArray();
        $result = array_merge([['key' => "null", 'value' => 'Usuário não logado']],$erros);
        usort($result, function ($a, $b) {return strnatcmp($a['value'], $b['value']);});
        return $result;
    }

    public function proxyQuery($query, &$data) {
        $where = [];
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "user_id") {
                $sql = "JSON_SEARCH(errors, user, ?)";
                array_push($where, RawWhere::raw($sql, [$condition[2]]));
            } else { array_push($where, $condition); }
        }
        $data["where"] = $where;
    }
}
