<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\TipoAvaliacao;
use App\Models\TipoAvaliacaoJustificativa;

class TipoAvaliacaoNota extends ModelBase
{
    protected $table = 'tipos_avaliacoes_notas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'sequencia',
        'nota',
        'descricao',
        'aprova',
        'pergunta',
        'justifica',
        'icone',
        'cor',
        'tipo_avaliacao_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
        //'nota', /* json; NOT NULL; */// Nota da avaliação
    ];

    // Belongs
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class); }    
    // Has
    public function justificativas() { return $this->hasMany(TipoAvaliacaoJustificativa::class); }    
}
