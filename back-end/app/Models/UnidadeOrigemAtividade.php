<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;

class UnidadeOrigemAtividade extends ModelBase
{
    protected $table = 'unidades_origem_atividades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'unidade_id', /* char(36); NOT NULL; */
        'unidade_origem_atividade_id', /* char(36); NOT NULL; */
    ];

    // Has
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function unidadeOrigemAtividade() { return $this->belongsTo(Unidade::class); }
}
