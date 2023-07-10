<?php

namespace App\Models;

use App\Models\ModelBase;

class CurriculumGraduacao extends ModelBase
{
    protected $table = 'curriculums_graduacoes';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'pretensao', /* tinyint; NOT NULL; */// Pretende fazer o curso
        'curriculum_id', /* char(36); NOT NULL; */
        'curso_id', /* char(36); NOT NULL; */
    ];

    //Has
    // Belongs
    public function curriculum() { return $this->belongsTo(Curriculum::class); }
    public function curso() { return $this->belongsTo(Curso::class); }
        
}
