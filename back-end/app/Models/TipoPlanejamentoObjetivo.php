<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoPlanejamentoObjetivo extends ModelBase
{
    protected $table = 'planejamentos_tipos_objetivos';

    protected $fillable = [
        'nome',
        'descricao',
    ];

    public $delete_cascade = [];

    public function planejamentosObjetivos(): HasMany
    {
        return $this->hasMany(PlanejamentoObjetivo::class, 'tipo_objetivo_id');
    }
}
