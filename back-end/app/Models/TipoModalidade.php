<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Plano;
use App\Models\Documento;
use App\Models\TipoModalidadeConfig;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class TipoModalidade extends ModelBase
{
    use AutoDataInicio, HasDataFim;
    
    public $fillable = [
        'nome',
        'config',
        'atividades_homologadas',
        'dispensa_avaliacao',
        'exige_assinatura',
        'exige_assinatura_gestor_unidade',
        'exige_assinatura_gestor_entidade',
        'calcula_tempo_despendido',
        'comparecer_presencialmente',
        'data_inicio',
        //'data_fim',
        'ganho_produtividade',
        'documento_id'        
    ];
 
    public $delete_cascade = ['documento'];

    protected $table = 'tipos_modalidades';
    // Has
    public function tipo_modalidade_configs() { return $this->hasMany(TipoModalidadeConfig::class, 'tipo_modalidade_id'); }
    public function planos() { return $this->hasMany(Plano::class, 'tipo_modalidade_id'); }        
    public function entidades() { return $this->hasMany(Entidade::class, 'tipo_modalidade_id'); }        
    // Belongs
    public function documento() { return $this->belongsTo(Documento::class, 'documento_id'); }    
}