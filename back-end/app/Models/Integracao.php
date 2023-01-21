<?php

namespace App\Models;

use App\Models\ModelBase;

class Integracao extends ModelBase
{
    protected $table = 'integracoes';

    protected $with = ['usuario'];
    
    public $fillable = [
        'data_execucao',
        'usuario_id',
        'entidade_id',
        'atualizar_unidades',
        'atualizar_servidores',
        'atualizar_gestores',
        'usar_arquivos_locais',
        'gravar_arquivos_locais',
        'resultado'
    ];

    protected $casts = [
        'data_execucao' => 'datetime',
        'resultado' => 'array'
    ];

    // Belongs
    public function entidade() { return $this->belongsTo(Entidade::class); }   
    public function usuario() { return $this->belongsTo(Usuario::class); }   
}
