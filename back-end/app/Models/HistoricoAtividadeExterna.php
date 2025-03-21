<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\AreaAtividadeExterna;

class HistoricoAtividadeExterna extends ModelBase
{
  protected $table = 'historicos_atividades_externas';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'curriculum_profissional_id',
    'area_atividade_externa_id',
  ];

  // Belongs
  public function curriculumProfissional()
  {
    return $this->belongsTo(CurriculumProfissional::class);
  }
  public function areaAtividadeExterna()
  {
    return $this->belongsTo(AreaAtividadeExterna::class);
  }
}
