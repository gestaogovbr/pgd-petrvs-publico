<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Entidade;
use App\Models\Cidade;
use App\Traits\AutoDataInicio;


class Feriado extends ModelBase
{
    use AutoDataInicio;

    public $fillable = [
        'nome',
        'dia',
        'mes',
        'ano',
        'tipoDia',
        'recorrente',
        'abrangencia',
        'codigo_ibge',
        'data_inicio',
        //'data_fim',
        'entidade_id',
        'cidade_id',
        'uf'
    ];

    protected $table = 'feriados';

    // Belongs
    public function entidade() { return $this->belongsTo(Entidade::class, 'entidade_id'); }   
    public function cidade() { return $this->belongsTo(Cidade::class, 'cidade_id'); }   
}
