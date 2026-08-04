<?php

namespace App\Models;

class MuralAvisoLeitura extends ModelBase
{
    protected $table = 'mural_avisos_leituras';

    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'data_confirmacao',
        'created_at',
    ];

    protected $casts = [
        'data_confirmacao' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function usuario(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}
