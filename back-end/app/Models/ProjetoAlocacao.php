<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\ProjetoTarefa;
use App\Models\ProjetoRecurso;
use App\Models\ProjetoRegra;
use App\Models\MaterialServico;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class ProjetoAlocacao extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'projetos_alocacoes';

    public $fillable = [
        'descricao', 
        'quantidade', 
        'projeto_id',
        'tarefa_id',
        'recurso_id',
        'regra_id'
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
    public function tarefa() { return $this->belongsTo(ProjetoTarefa::class); }    
    public function recurso() { return $this->belongsTo(ProjetoRecurso::class); }    
    public function regra() { return $this->belongsTo(ProjetoRegra::class); }    
}