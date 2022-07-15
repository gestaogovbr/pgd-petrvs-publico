<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\TipoMotivoAfastamento;

class Afastamento extends ModelBase
{

    protected $with = [];
    
    public $fillable = [
        'observacoes',
        'inicio_afastamento',
        'fim_afastamento',
        'usuario_id',
        'tipo_motivo_afastamento_id'
    ];

    protected $table = 'afastamentos';
   
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id'); }    
    public function tipoMotivoAfastamento() { return $this->belongsTo(TipoMotivoAfastamento::class, 'tipo_motivo_afastamento_id'); }    
}
