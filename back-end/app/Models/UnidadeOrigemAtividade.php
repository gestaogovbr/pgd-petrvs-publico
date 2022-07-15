<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;

class UnidadeOrigemAtividade extends ModelBase
{

    public $fillable = [
        'unidade_id',
        'unidade_origem_atividade_id'
    ];

    protected $table = 'unidades_origem_atividades';

    // Has
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function unidadeOrigemAtividade() { return $this->belongsTo(Unidade::class); }
}
