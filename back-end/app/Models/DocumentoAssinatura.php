<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;

class DocumentoAssinatura extends ModelBase
{
    protected $table = 'documentos_assinaturas';

    public $fillable = [
        'data_hora',
        'assinatura',
        'documento_id',
        'usuario_id'
    ];

    // Has
    // Belongs
    public function documento() { return $this->belongsTo(Documento::class); }
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    // Mutattors e Casts
}
