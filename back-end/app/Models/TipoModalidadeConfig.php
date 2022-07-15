<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Atividade;
use App\Models\TipoModalidade;

class TipoModalidadeConfig extends ModelBase
{
   
    public $fillable = [
        'fator_produtividade',
        'unidade_id',
        'atividade_id',
        'tipo_modalidade_id'        
    ];
    
    protected $table = 'tipos_modalidades_config';
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }   
    public function atividade() { return $this->belongsTo(Atividade::class, 'atividade_id'); }   
    public function tipo_modalidade() { return $this->belongsTo(TipoModalidade::class, 'tipo_modalidade_id'); }   
}
