<?php

namespace App\Services;

use App\Models\TipoDocumento;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use Throwable;

class TipoDocumentoService extends ServiceBase
{
    public function atualizar($lista, $unidade) {
        try {
            DB::beginTransaction();
            foreach ($lista as $item) {
                $entity = (TipoDocumento::where("codigo", $item["codigo"])->first() ?? new TipoDocumento());
                if($entity->nome != $item["nome"]) {
                    $entity->fill([
                        "codigo" => $item["codigo"],
                        "nome" => $item["nome"],
                        "entregavel" => true
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
