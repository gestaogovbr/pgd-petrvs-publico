<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Documento;
use App\Traits\AutoDataInicio;

class Programa extends ModelBase
{

    use AutoDataInicio;
    protected $table = 'programas';

    public $fillable = [
        'nome',
        'normativa',
        'config',
        'data_inicio_vigencia',
        'data_fim_vigencia',
        'data_inicio',
        //'data_fim',
        'documento_id',
        'unidade_id'
    ];

    public $delete_cascade = ['documento'];
    
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function documento() { return $this->belongsTo(Documento::class, 'documento_id'); }    

}
