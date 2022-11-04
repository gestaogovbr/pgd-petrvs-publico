<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Usuario;


class ChangeService extends ServiceBase {

    public function proxyRows($rows){
        foreach($rows as $row){
            try {
                $row['responsavel'] = Usuario::where('id',$row['user_id'])->first()->nome;
            } catch (\Throwable $th) {
                return response()->json(['error' => $e->getMessage()]);
            }
        }
        return $rows;
    }

/*     public function proxyById($rows){
        foreach($rows as $row){
            try {
                $row['objeto'] = Usuario::where('id',$row['user_id'])->first()->nome;
            } catch (\Throwable $th) {
                return response()->json(['error' => $e->getMessage()]);
            }
        }
        return $rows;
    } */
}
