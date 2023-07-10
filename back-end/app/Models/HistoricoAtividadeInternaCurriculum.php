<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\CapacidadeTecnica;

class HistoricoAtividadeInternaCurriculum extends ModelBase
{
    protected $table = 'historicos_atividades_internas_curriculum';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'curriculum_profissional_id', /* char(36); NOT NULL; */
        'capacidade_tecnica_id', /* char(36); NOT NULL; */
    ];

     // Belongs
    public function curriculumProfissional() { return $this->belongsTo(CurriculumProfissional::class); }
    public function capacidadeTecnica() { return $this->belongsTo(CapacidadeTecnica::class); }
  
    
}
