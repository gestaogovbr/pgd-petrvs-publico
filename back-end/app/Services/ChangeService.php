<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Usuario;


class ChangeService extends ServiceBase {

    public function proxyRows($rows){
        foreach($rows as $row){
            try {
                $row['responsavel'] = $row['user_id'] == null ? 'Usuário não logado' : Usuario::where('id',$row['user_id'])->first()->nome ?? 'Não encontrado - ID: ' . $row['user_id'];
            } catch (\Throwable $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
        }
        return $rows;
    }

    public function showResponsaveis() {
        $usuarios = Usuario::all()->filter(function(Usuario $u) { return $u->changes() != []; })->all();
        $a = array_map(fn($u) => ['key' => $u['id'], 'value' => $u['nome']], $usuarios);
        $b = array_merge([['key' => "null", 'value' => 'Usuário não logado']],$a);
        usort($b, function ($a, $b) {return strnatcmp($a['value'], $b['value']);});
        return $b;
    }

}
