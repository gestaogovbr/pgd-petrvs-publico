<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TipoModalidadeSiape extends ModelBase
{
    protected $table = 'tipos_modalidades_siape';

    protected $fillable = [
        'tipo_modalidade_id', /* varchar(256); NOT NULL; */ // relacionamento com TipoModalidade
        'nome' /* varchar(256); NOT NULL; */ // Nome da modalidade
    ];

    public function tipoModalidade(): BelongsTo
    {
        return $this->belongsTo(TipoModalidade::class, 'tipo_modalidade_id');
    }
}