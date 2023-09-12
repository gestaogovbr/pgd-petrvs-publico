<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\TipoAvaliacao;
use App\Models\TipoAvaliacaoJustificativa;
use App\Casts\AsJson;

class TipoAvaliacaoNota extends ModelBase
{
    protected $table = 'tipos_avaliacoes_notas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'sequencia', /* int; NOT NULL; */// Sequencia da nota (serve para ordenar as notas de forma crescente)
        'nota', /* json; NOT NULL; */// Nota
        'descricao', /* varchar(255); NOT NULL; */// Descrição da nota
        'aprova', /* tinyint; NOT NULL; */// Se essa nota aprova, quando aplicável
        'pergunta', /* varchar(255); NOT NULL; */// Pergunta motivacional
        'justifica', /* tinyint; NOT NULL; */// Se é obrigatório justificar essa nota
        'icone', /* varchar(100); NOT NULL; */// Classe do icone
        'cor', /* varchar(100); NOT NULL; */// Código da cor em hex
        'codigo', /* varchar(100); NOT NULL; */// Código da cor em hex
        'tipo_avaliacao_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_relations = [
        "justificativas"
    ];

    protected $casts = [
      'nota' => AsJson::class
    ];

    // Belongs
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class); }    
    // Has
    public function justificativas() { return $this->hasMany(TipoAvaliacaoJustificativa::class); }    
}
