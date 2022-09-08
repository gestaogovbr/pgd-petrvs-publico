<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\ProjetoTarefa;
use App\Models\ProjetoEnvolvido;
use App\Models\ProjetoRegra;
use App\Models\TipoProjeto;
use App\Traits\AutoDataInicio;

class Projeto extends ModelBase
{
    use AutoDataInicio;

    protected static function booted()
    {
        static::creating(function ($projeto) {
            $projeto->numero = DB::select("CALL sequence_projeto_numero()")[0]->number;
        });
    }

    protected $table = 'projetos';

    public $fillable = [
        //'numero',
        'nome',
        'descricao',
        'finalidade',
        'status',
        //'data_inicio',
        //'data_fim',
        'inicio',
        'termino',
        'calcula_custos',
        'tempo_corrido',
        'usar_horas',
        'calcula_intervalo',
        'agrupador',
        'soma_progresso_filhos',
        'aloca_proprios_recursos',
        'soma_recusos_alocados_filhos',
        'custos_proprios',
        'soma_custos_filhos',
        'duracao',
        'progresso',
        'usuario_id',
        'tipo_projeto_id',
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    public $delete_cascade = ['tarefas'];

    // Has
    public function tarefas() { return $this->hasMany(ProjetoTarefa::class); }    
    public function regras() { return $this->hasMany(ProjetoRegra::class); }    
    public function envolvidos() { return $this->hasMany(ProjetoEnvolvido::class); }    
    // Belongs
    public function tipoProjeto() { return $this->belongsTo(TipoProjeto::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
}