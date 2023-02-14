<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Usuario;


class ChangeService extends ServiceBase {

    public function proxyRows($rows){
        foreach($rows as $row){
            try {
                $row['responsavel'] = $row['user_id'] == null ? 'Usuário não logado' : Usuario::where('id',$row['user_id'])->first()->nome;
            } catch (\Throwable $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
        }
        return $rows;
    }

    public function showResponsaveis() {
        $a = array_map(fn($u) => ['key' => $u['id'], 'value' => $u['nome']], Usuario::select(['id', 'nome'])->has('changes')->get()->toArray());
        $b = array_merge([['key' => "null", 'value' => 'Usuário não logado']],$a);
        usort($b, function ($a, $b) {return strnatcmp($a['value'], $b['value']);});
        return $b;
    }
}
