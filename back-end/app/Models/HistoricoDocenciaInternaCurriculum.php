<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\Curso;

class HistoricoDocenciaInternaCurriculum extends ModelBase
{
    protected $table = 'historicos_docencias_internas_curriculum';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'curriculum_profissional_id', /* char(36); NOT NULL; */
        'curso_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

     // Belongs
    public function curriculumProfissional() { return $this->belongsTo(CurriculumProfissional::class); }
    public function curso() { return $this->belongsTo(Curso::class); }
  
    
}
