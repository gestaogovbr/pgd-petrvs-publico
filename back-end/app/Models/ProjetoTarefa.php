<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\Usuario;
use App\Models\Demanda;
use App\Models\ProjetoAlocacao;
use App\Traits\AutoDataInicio;

class ProjetoTarefa extends ModelBase
{
    use AutoDataInicio;

    protected $table = 'projetos_tarefas';

    public $fillable = [
        'indice',
        'path',
        'nome',
        'descricao',
        'id_processo',
        'numero_processo',
        'id_documento',
        'numero_documento',
        'inicio',
        'termino',
        'duracao',
        'progresso',
        'inicio_marco',
        'termino_marco',
        'tem_filhos',
        'agrupador',
        'soma_progresso_filhos',
        'status',
        'contraido',
        'custo',
        'calcula_intervalo',
        'aloca_proprios_recursos',
        'soma_recusos_alocados_filhos',
        'custos_proprios',
        'soma_custos_filhos',
        'etiquetas',
        'projeto_id',
        'tarefa_pai_id',
        'terefa_projeto_id',
        'demanda_id',
        'usuario_id'
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    public $delete_cascade = [];

    // Has
    public function alocacoes() { return $this->hasMany(ProjetoAlocacao::class, "tarefa_id"); }    
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }    
    public function demanda() { return $this->belongsTo(Demanda::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    // Mutattors e Casts
    public function getEtiquetasAttribute($value)
    {
        return json_decode($value);
    }   
    public function setEtiquetasAttribute($value)
    {
        $this->attributes['etiquetas'] = json_encode($value);
    }
}