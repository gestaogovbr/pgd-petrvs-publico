<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;
use App\Models\Status;

class PlanoTrabalhoConsolidacao extends ModelBase
{
    protected $table = 'plan_trab_consolidacoes';

    protected $with = ["status"];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicial da consolidacão
        'data_fim', /* datetime; NOT NULL; */// Data final da consolidação
        'plano_trabalho_id', /* char(36); NOT NULL; */
        'status_id', /* char(36); */
        'avaliacao_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = ["status"];

    public $delete_cascade = ["status", "avaliacao"];

    // Has
    public function statusHistorico() { return $this->hasMany(Status::class, "plano_trabalho_consolidacao_id"); }
    public function ocorrencias() { return $this->hasMany(PlanoTrabalhoConsolidacaoOcorrencia::class, 'plano_trabalho_consolidacao_id'); } 
    public function atividades() { return $this->hasMany(PlanoTrabalhoConsolidacaoAtividade::class, 'plano_trabalho_consolidacao_id'); } 
    // Belongs
    public function statusAtual() { return $this->belongsTo(Status::class, "status_id"); }
    public function planoTrabalho() { return $this->belongsTo(PlanoTrabalho::class); }
    public function avaliacao() { return $this->belongsTo(Avaliacao::class); }  //nullable
    public function status() { return $this->belongsTo(Status::class); } 

}