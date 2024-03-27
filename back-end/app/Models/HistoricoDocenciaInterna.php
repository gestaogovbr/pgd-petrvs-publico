<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;

class HistoricoDocenciaInterna extends ModelBase
{
  protected $table = 'historicos_docencias_internas';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'curriculum_profissional_id', /* char(36); NOT NULL; */
    'disciplina_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  // Belongs
  public function curriculumProfissional()
  {
    return $this->belongsTo(CurriculumProfissional::class);
  }
  public function disciplina()
  {
    return $this->belongsTo(Disciplina::class);
  }
}
