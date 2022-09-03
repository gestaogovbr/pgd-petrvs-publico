<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\ProjetoTarefa;
use App\Models\TipoProjeto;
use App\Traits\AutoDataInicio;

class Projeto extends ModelBase
{
    use AutoDataInicio;

    protected $table = 'demandas_entregas';

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
    // Belongs
    public function tipoProjeto() { return $this->belongsTo(TipoProjeto::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
}