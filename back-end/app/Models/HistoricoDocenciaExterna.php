<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\AreaAtividadeExterna;
use App\Models\Curso;

class HistoricoDocenciaExterna extends ModelBase
{
  protected $table = 'historicos_docencias_externas_curriculum';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'curriculum_profissional_id', /* char(36); NOT NULL; */
    'area_atividade_externa_id', /* char(36); NOT NULL; */
    'curso_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  // Belongs
  public function curriculumProfissional()
  {
    return $this->belongsTo(CurriculumProfissional::class);
  }
  public function curso()
  {
    return $this->belongsTo(Curso::class);
  }
  public function areaAtividadeExterna()
  {
    return $this->belongsTo(AreaAtividadeExterna::class);
  }
}
