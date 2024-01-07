<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Ocorrencia;

class PlanoTrabalhoConsolidacaoOcorrencia extends ModelBase
{
    protected $table = 'planos_trabalhos_consolidacoes_ocorrencias';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_conclusao',
        'snapshot',
        'ocorrencia_id',
        'plano_trabalho_consolidacao_id'
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    protected $casts = [
        "data_conclusao" => "datetime",
        "snapshot" => AsJson::class
    ];

    // Has
    // Belongs
    public function consolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }
    public function ocorrencia() { return $this->belongsTo(Ocorrencia::class); }
}