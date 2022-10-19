<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\Usuario;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class ProjetoAlocacao extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'projetos_historicos';

    public $fillable = [
        'data_hora', 
        'linha_base',
        'completo',
        'delta',
        'projeto_id',
        'usuario_id'
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    public $delete_cascade = [];

    // Has
    //public function () { return $this->hasMany(::class); }    
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
}