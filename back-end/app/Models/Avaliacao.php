<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\TipoAvaliacao;

class Avaliacao extends ModelBase
{
    protected $table = 'avaliacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nota', /* json; NOT NULL; */// Nota da avaliação
        'usuario_id', /* char(36); NOT NULL; */
        'justificativas', /* json; NOT NULL; DEFAULT: 'json_array()'; */// Justificativas
        'tipo_avaliacao_id', /* char(36); */
    ];

    public $delete_cascade = [];

    // Casting
    protected $casts = [
        'justificativas' => AsJson::class
    ];
    
    // Has
    //public function avaliacoesJustificativas() { return $this->hasMany(AvaliacaoJustificativa::class, 'avaliacao_id'); }
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class, 'tipo_avaliacao_id'); }
}
