<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\PlanoTrabalhoConsolidacao;

class Comparecimento extends ModelBase
{
    protected $table = 'comparecimentos';

    protected $with = [];

    public $fillable = [ 
        'data_comparecimento', 
        'unidade_id', 
        //'usuario_id',
        //'deleted_at',
    ];

    // Casting
    protected $casts = [
        'data_comparecimento' => 'date',
    ];

    // Belongs
    public function planoTrabalhoConsolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }
    public function unidade() { return $this->belongsTo(Unidade::class); }
}