<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\AreaAtividadeExterna;

class HistoricoDocenciaExterna extends ModelBase
{
  protected $table = 'historicos_docencias_externas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'curriculum_profissional_id', /* char(36); NOT NULL; */
        'area_atividade_externa_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
        /*'curso_id',*/// REMOVED
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
