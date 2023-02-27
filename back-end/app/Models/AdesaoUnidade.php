<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;

class AdesaoUnidade extends ModelBase
{
    protected $table = 'programas_adesoes_unidades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'programa_adesao_id', /* char(36); NOT NULL; */
        'unidade_id', /* char(36); */
    ];
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
    public function adesao() { return $this->belongsTo(Adesao::class, 'programa_adesao_id'); }
}
