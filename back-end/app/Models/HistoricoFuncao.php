<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\Funcao;
use App\Models\Unidade;

class HistoricoFuncao extends ModelBase
{
    protected $table = 'historicos_funcoes';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'curriculum_profissional_id',
        'funcao_id',
        'unidade_id',
    ];

     // Belongs
    public function curriculumProfissional() { return $this->belongsTo(CurriculumProfissional::class); }
    public function funcao() { return $this->belongsTo(Funcao::class); }
    public function unidade() { return $this->belongsTo(Unidade::class); }
  
    
}
