<?php

namespace App\Services;

use App\Models\TipoProcesso;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use Throwable;

class TipoProcessoService extends ServiceBase
{
    public function atualizar($lista, $unidade) {
        try {
            DB::beginTransaction();
            foreach ($lista as $item) {
                $entity = (TipoProcesso::where("codigo", $item["codigo"])->first() ?? new TipoProcesso());
                if($entity->nome != $item["nome"]) {
                    $entity->fill([
                        "codigo" => $item["codigo"],
                        "nome" => $item["nome"]
                    ]);
                    $entity->save();
                }                
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

}
