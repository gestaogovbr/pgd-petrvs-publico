<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoUuid;

class JobSchedule extends ModelBase
{
    use AutoUuid;

    protected $table = 'jobs_schedules';
    protected $fillable = ['nome', 'classe', 'expressao_cron', 'ativo', 'tenant_id', 'parameters'];
    protected $casts = [
        'parameters' => 'array'
    ];

}
