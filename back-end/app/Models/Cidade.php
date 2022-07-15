<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;

class Cidade extends ModelBase
{
    protected $with = [];

    public $fillable = [
        'codigo_ibge',
        'nome',
        'tipo',
        'uf',
        'timezone'
    ];

    protected $table = 'cidades';

    // Has
    public function unidades() { return $this->hasMany(Unidade::class); }
    public function entidades() { return $this->hasMany(Entidade::class); }
}
