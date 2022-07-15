<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;

class TipoProcesso extends ModelBase
{
    
    public $fillable = [
        'nome',
        'codigo',
        'etiquetas',
        'checklist'
    ];

    protected $table = 'tipos_processos';

    protected static function booted()
    {
        static::creating(function ($tipoProcesso) {
            $tipoProcesso->etiquetas = $tipoProcesso->etiquetas ?? [];
            $tipoProcesso->checklist = $tipoProcesso->checklist ?? [];
        });  
    }

    // Has
    public function unidade() { return $this->hasMany(Unidade::class, 'tipo_processo_id'); }        
    // Mutattors e Casts
    public function getEtiquetasAttribute($value)
    {
        return json_decode($value);
    }   
    public function setEtiquetasAttribute($value)
    {
        $this->attributes['etiquetas'] = json_encode($value);
    }
    public function getChecklistAttribute($value)
    {
        return json_decode($value);
    }   
    public function setChecklistAttribute($value)
    {
        $this->attributes['checklist'] = json_encode($value);
    }

}
