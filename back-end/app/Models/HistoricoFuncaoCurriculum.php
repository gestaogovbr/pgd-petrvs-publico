<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\Funcao;

class HistoricoFuncaoCurriculum extends ModelBase
{
    protected $table = 'atividades_fora_curriculum';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'curriculum_profissional_id',
        'funcao_id',
    ];

     // Belongs
    public function curriculumProfissional() { return $this->belongsTo(CurriculumProfissional::class); }
    public function funcao() { return $this->belongsTo(Funcao::class); }
  
    
}
