<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\MaterialServico;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class ProjetoRecurso extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'projetos_recursos';

    public $fillable = [
        'nome', 
        'tipo', 
        'unidade_medida', 
        'valor', 
        'data_inicio', 
        'data_fim',         
        'projeto_id',
        'usuario_id',
        'unidade_id',
        'material_servico_id'
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
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function materialServico() { return $this->belongsTo(MaterialServico::class); }    
}