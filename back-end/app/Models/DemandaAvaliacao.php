<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\AvaliacaoJustificativa;
use App\Models\Demanda;
use App\Models\Usuario;
use App\Models\TipoAvaliacao;
use App\Traits\AutoDataInicio;

class DemandaAvaliacao extends ModelBase
{
    use AutoDataInicio;

    public $fillable = [
        'nota_atribuida',
        'usuario_id',
        'demanda_id',
        'justificativas',
        'tipo_avaliacao_id'
    ];

    public $delete_cascade = ['avaliacoesJustificativas'];

    protected $table = 'demandas_avaliacoes';
    // Has
    public function avaliacoesJustificativas() { return $this->hasMany(AvaliacaoJustificativa::class, 'avaliacao_id'); }
    public function demandaAvaliacao() { return $this->hasOne(Demanda::class, 'avaliacao_id'); }    
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function demanda() { return $this->belongsTo(Demanda::class); }
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class, 'tipo_avaliacao_id'); }
    // Mutattors e Casts
    public function getJustificativasAttribute($value)
    {
        return json_decode($value);
    }   
    public function setJustificativasAttribute($value)
    {
        $this->attributes['justificativas'] = json_encode($value);
    }
}
