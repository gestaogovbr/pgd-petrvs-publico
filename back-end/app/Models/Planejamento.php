<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class Planejamento extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planejamentos';

    protected $with = [];

    public $fillable = [
        'inicio',
        'fim',
        'nome',
        'unidade_id',
    ];

    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
}
