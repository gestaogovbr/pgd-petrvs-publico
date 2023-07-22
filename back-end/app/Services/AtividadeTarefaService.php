<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Database\Eloquent\Builder;

class AtividadeTarefaService extends ServiceBase {

    public function proxyQuery(&$query, &$data) {
        $idProcesso = $this->extractWhere($data, "id_processo");
        if(!empty($idProcesso)) {
            $query->whereHas('documento', function (Builder $query) use ($idProcesso) {
                $query->whereRaw("JSON_CONTAINS(link, ?, '$.id_processo')", [$idProcesso]);
            });
        }
    }
}
