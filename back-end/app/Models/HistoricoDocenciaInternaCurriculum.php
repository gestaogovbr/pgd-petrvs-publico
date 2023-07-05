<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\Curso;
use App\Traits\AutoDataInicio;


class HistoricoDocenciaInternaCurriculum extends ModelBase
{
    protected $table = 'historicos_cursos_internos_curriculum';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'pretensao',
        'curriculum_profissional_id',
        'curso_id',
                
    ];

     // Belongs
    public function curriculumProfissional() { return $this->belongsTo(CurriculumProfissional::class); }
    public function curso() { return $this->belongsTo(Curso::class); }
  
    
}
