<?php

namespace App\Models;

use App\Models\ModelBase;

class JobAgendado extends ModelBase
{
  protected $table = 'jobs_schedules';
  protected $fillable = ['nome_do_job', 'diario', 'horario', 'ativo'];
}
