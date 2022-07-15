<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Models\Demanda;
use App\Models\Unidade;
use App\Models\TipoAtividade;
use App\Models\TipoProcesso;

class Atividade extends ModelBase
{
    use AutoDataInicio;
    
    protected $with = [];
    
    public $fillable = [
        'nome',
        'tempo_pactuado',
        'dias_planejado',
        'tempo_minimo',
        'recalcula_prazo',
        'desativa_produtividade',
        'complexidade',
        'tipos_processo',
        'etiquetas_predefinidas',
        'checklist_predefinidos',
        'comentario_predefinido',
        'parametros_adotados',
        'entregas_esperadas',
        'homologado',
        'data_homologacao',
        'data_inicio',
        //'data_fim',
        'unidade_id',
        'tipo_atividade_id',
        'tipo_processo_id'
    ];

    protected $table = 'atividades';
   
    protected static function booted()
    {
        static::creating(function ($atividade) {
            $atividade->complexidade = $atividade->complexidade ?? [];
            $atividade->etiquetas_predefinidas = $atividade->etiquetas_predefinidas ?? [];
            $atividade->checklist_predefinidos = $atividade->checklist_predefinidos ?? [];
            $atividade->parametros_adotados = $atividade->parametros_adotados ?? [];
            $atividade->entregas_esperadas = $atividade->entregas_esperadas ?? [];
        });  
    }
    
    // Has
    public function demandas() { return $this->hasMany(Demanda::class); }
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function tipoAtividade() { return $this->belongsTo(TipoAtividade::class); }
    public function tipoProcesso() { return $this->belongsTo(TipoProcesso::class); }
    // Mutattors e Casts
    public function getEntregasEsperadasAttribute($value)
    {
        return json_decode($value);
    }   
    public function setEntregasEsperadasAttribute($value)
    {
        $this->attributes['entregas_esperadas'] = json_encode($value);
    }
    // Mutattors e Casts
    public function getParametrosAdotadosAttribute($value)
    {
        return json_decode($value);
    }   
    public function setParametrosAdotadosAttribute($value)
    {
        $this->attributes['parametros_adotados'] = json_encode($value);
    }
    public function getTiposProcessoAttribute($value) {
        return json_decode($value);
    }
    public function setTiposProcessoAttribute($value)
    {
        $this->attributes['tipos_processo'] = json_encode($value);
    }
    public function getChecklistPredefinidosAttribute($value)
    {
        return json_decode($value);
    }   
    public function setChecklistPredefinidosAttribute($value)
    {
        $this->attributes['checklist_predefinidos'] = json_encode($value);
    }
    public function getEtiquetasPredefinidasAttribute($value)
    {
        return json_decode($value);
    }   
    public function setEtiquetasPredefinidasAttribute($value)
    {
        $this->attributes['etiquetas_predefinidas'] = json_encode($value);
    }
    public function getComplexidadeAttribute($value)
    {
        return json_decode($value);
    }   
    public function setComplexidadeAttribute($value)
    {
        $this->attributes['complexidade'] = json_encode($value);
    }
}
