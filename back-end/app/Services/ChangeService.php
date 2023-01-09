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
}
