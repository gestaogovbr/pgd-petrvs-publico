<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Traits\HasStatus;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use App\Models\StatusJustificativa;

class PlanoTrabalhoConsolidacao extends ModelBase
{
    use HasStatus;

    protected $table = 'planos_trabalhos_consolidacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* date; NOT NULL; */// Data inicial da consolidacão
        'data_fim', /* date; NOT NULL; */// Data final da consolidação
        'plano_trabalho_id', /* char(36); NOT NULL; */
        'status', /* enum('CONCLUIDO','AVALIADO','INCLUIDO'); */// Status atual da consolidação
        'avaliacao_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = ["avaliacao"];

    // Has
    public function statusHistorico() { return $this->hasMany(StatusJustificativa::class, "plano_trabalho_consolidacao_id"); }
    public function ocorrencias() { return $this->hasMany(PlanoTrabalhoConsolidacaoOcorrencia::class, 'plano_trabalho_consolidacao_id'); } 
    // Verificar se há a possibilidade de fazer um relacionamento utilizando a chave da entrega e pela data
    // public function atividades() { return $this->hasMany(Atividade::class); } 
    // Belongs
    public function planoTrabalho() { return $this->belongsTo(PlanoTrabalho::class); }
    public function avaliacao() { return $this->belongsTo(Avaliacao::class); }  //nullable

}