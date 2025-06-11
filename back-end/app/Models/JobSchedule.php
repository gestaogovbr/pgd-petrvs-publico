<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoUuid;

class JobSchedule extends ModelBase
{
    use AutoUuid;

    protected $table = 'jobs_schedules';
    protected $fillable = ['nome', 'classe', 'expressao_cron', 'ativo', 'tenant_id', 'parameters',
        'periodicidade', 'dia', 'horario', 'intervalo_tipo', 'intervalo_qtde'];
    protected $casts = [
        'parameters' => 'array'
    ];

    public function proxyFill(&$dataOrEntity, $unidade, $action)
    {
        if ($dataOrEntity['periodicidade'] !== 'custom') {
            $horario = explode(":", $dataOrEntity['horario']);
            if ($dataOrEntity['periodicidade'] == 'cada') {
                if ($dataOrEntity['intervalo_tipo'] == 'minuto') {
                    $dataOrEntity['expressao_cron'] = "*/".$dataOrEntity['intervalo_qtde']." * * * *";
                }elseif ($dataOrEntity['intervalo_tipo'] == 'hora') {
                    $dataOrEntity['expressao_cron'] = "0 */".$dataOrEntity['intervalo_qtde']." * * *";
                }
            }elseif ($dataOrEntity['periodicidade'] == 'dia') {
                 $dataOrEntity['expressao_cron'] = "{$horario[1]} {$horario[0]} ".$dataOrEntity['dia']." * *";
            }elseif ($dataOrEntity['periodicidade'] == 'todos') {
                 $dataOrEntity['expressao_cron'] = "{$horario[1]} {$horario[0]} * * *";
            }elseif ($dataOrEntity['periodicidade'] == 'domingo') {
                 $dataOrEntity['expressao_cron'] = "{$horario[1]} {$horario[0]} * * 0";
            }elseif ($dataOrEntity['periodicidade'] == 'segunda') {
                 $dataOrEntity['expressao_cron'] = "{$horario[1]} {$horario[0]} * * 1";
            }elseif ($dataOrEntity['periodicidade'] == 'terca') {
                 $dataOrEntity['expressao_cron'] = "{$horario[1]} {$horario[0]} * * 2";
            }elseif ($dataOrEntity['periodicidade'] == 'quarta') {
                 $dataOrEntity['expressao_cron'] = "{$horario[1]} {$horario[0]} * * 3";
            }elseif ($dataOrEntity['periodicidade'] == 'quinta') {
                 $dataOrEntity['expressao_cron'] = "{$horario[1]} {$horario[0]} * * 4";
            }elseif ($dataOrEntity['periodicidade'] == 'sexta') {
                 $dataOrEntity['expressao_cron'] = "{$horario[1]} {$horario[0]} * * 5";
            }elseif ($dataOrEntity['periodicidade'] == 'sabado') {
                 $dataOrEntity['expressao_cron'] = "{$horario[1]} {$horario[0]} * * 6";
            }
        }
        return $this->fill($dataOrEntity);
    }
}
