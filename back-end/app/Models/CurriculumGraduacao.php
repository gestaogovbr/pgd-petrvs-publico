<?php

namespace App\Models;


use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class CurriculumGraduacao extends ModelBase
{
    protected $table = 'curriculums_graduacoes';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'pretensao',
        'curriculum_id',
        'curso_id'
    ];

    //Has
   

    // Belongs
    public function curriculum() { return $this->belongsTo(Curriculum::class); }
    public function curso() { return $this->belongsTo(Curso::class); }
        
}
