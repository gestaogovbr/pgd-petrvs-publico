<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\CapacidadeTecnica;

class HistoricoAtividadeInterna extends ModelBase
{
  protected $table = 'historicos_atividades_internas';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'curriculum_profissional_id', /* char(36); NOT NULL; */
    'capacidade_tecnica_id', /* char(36); NOT NULL; */
    'atividade_desempenhada', /* varchar(256); */ // Atividade desempenhada na instituição
    //'deleted_at', /* timestamp; */
  ];

  // Belongs
  public function curriculumProfissional()
  {
    return $this->belongsTo(CurriculumProfissional::class);
  }
  public function capacidadeTecnica()
  {
    return $this->belongsTo(CapacidadeTecnica::class);
  }
}
