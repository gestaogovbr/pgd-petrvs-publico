<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\AvaliacaoJustificativa;
use App\Models\Demanda;
use App\Models\Usuario;
use App\Models\TipoAvaliacao;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class DemandaAvaliacao extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'demandas_avaliacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nota_atribuida', /* int; NOT NULL; */// Nota da avaliação 0 - 10
        'usuario_id', /* char(36); NOT NULL; */
        'demanda_id', /* char(36); */
        'justificativas', /* json; NOT NULL; */// Justificativas da avaliação
        'tipo_avaliacao_id', /* char(36); */
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    public $delete_cascade = [];

    // Casting
    protected $casts = [
        'justificativas' => AsJson::class
    ];
    
    // Has
    //public function avaliacoesJustificativas() { return $this->hasMany(AvaliacaoJustificativa::class, 'avaliacao_id'); }
    public function demandaAvaliacao() { return $this->hasOne(Demanda::class, 'avaliacao_id'); }    
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function demanda() { return $this->belongsTo(Demanda::class); }
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class, 'tipo_avaliacao_id'); }

}
