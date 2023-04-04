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

class PlanoAvaliacao extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planos_avaliacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nota_atribuida', /* int; NOT NULL; */// Nota da avaliação 0 - 10
        'justificativas', /* json; NOT NULL; */// Justificativas da avaliação
        'usuario_id', /* char(36); NOT NULL; */
        'plano_id', /* char(36); */
        'tipo_avaliacao_id', /* char(36); */
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
    ];
 
    public $delete_cascade = [];

    // Casting
    protected $casts = [
        'justificativas' => AsJson::class
    ];

    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }  //usuário que avaliou o Plano  
    public function plano() { return $this->belongsTo(Plano::class); }
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class, 'tipo_avaliacao_id'); }

}
