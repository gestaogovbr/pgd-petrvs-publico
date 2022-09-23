<?php

namespace App\Models;

use App\Traits\AutoDataInicio;
use App\Models\ModelBase;
use App\Models\ProjetoRecurso;

class MaterialServico extends ModelBase
{
    use AutoDataInicio;

    protected $table = 'materiais_servicos';

    public $fillable = [
        'tipo',
        'codigo',
        'referencia',
        'descricao',
        'unidade_medida'
        //'data_inicio',
        //'data_fim'
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    //public $delete_cascade = [];

    // Has
    public function projetosRecursos() { return $this->hasMany(ProjetoRecurso::class); }    
    // Belongs
    //public function () { return $this->belongsTo(::class); }    
}