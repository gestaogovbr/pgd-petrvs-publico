<?php

namespace App\Services;

use App\Exceptions\LogError;
use App\Exceptions\ServerException;
use App\Models\ModelBase;
use DateTime;
use DateTimeZone;
use App\Models\Unidade;
use App\Models\Programa;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Exception;
use Throwable;

class StatusService extends ServiceBase
{

    /**
     * Retorna um array com os ids das unidades que compõem a linha hierárquica ascendente da unidade repassada como parâmetro.
     * @param string $unidade_id
     * @return array
     */
    public function atualizaStatus($entity, $novoStatus) {
        $model = $this->getModel();
        return true;
    }
}
