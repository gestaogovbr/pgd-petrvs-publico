<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoObjetivo extends ModelBase
{
    protected $table = 'tipos_objetivos';

    protected $fillable = [
        'nome',
        'descricao',
    ];

    public $delete_cascade = [];

    public function objetivos(): HasMany
    {
        return $this->hasMany(PlanoEntregaEntregaObjetivo::class, 'tipo_objetivo_id');
    }
}
