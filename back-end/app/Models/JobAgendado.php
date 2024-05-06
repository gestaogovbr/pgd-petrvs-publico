<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoUuid;

class JobAgendado extends ModelBase
{
    use AutoUuid;

    protected $table = 'jobs_schedules';
    protected $fillable = ['nome_do_job', 'diario', 'horario', 'expressao_cron', 'ativo'];
}
