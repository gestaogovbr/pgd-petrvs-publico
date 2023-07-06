<?php

namespace App\Services;

use App\Models\TipoAtividade;
use App\Services\ServiceBase;

class TipoAtividadeService extends ServiceBase
{
    public function atividadeDashboard($unidade_id)
    {
        return ["total_atividades" => TipoAtividade::count()];
    }
}
