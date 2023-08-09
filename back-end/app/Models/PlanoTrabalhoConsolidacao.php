<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacaoEntrega;
use App\Models\TipoAvaliacao;

class PlanoTrabalhoConsolidacao extends ModelBase
{
    protected $table = 'planos_trabalhos_consolidacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'inicio', /* datetime; NOT NULL; */// Data inicial da consolidacão
        'fim', /* datetime; NOT NULL; */// Data final da consolidação
        'nota_atribuida', /* int; NOT NULL; */// Nota da avaliação: 0 - 10
        'justificativas', /* json; */// Justificativas da avaliação
        'comentarios', /* text; */// Comentário referente à avaliação
        'plano_trabalho_id', /* char(36); NOT NULL; */
        'avaliador_id', /* char(36); */
        'tipo_avaliacao_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    public function mudancasStatus() { return $this->hasMany(Status::class, "plano_trabalho_consolidacao_id"); }
    public function entregas() { return $this->hasMany(PlanoTrabalhoConsolidacaoEntrega::class, 'consolidacao_id'); } 
    // Belongs
    public function statusAtual() { return $this->belongsTo(Status::class, "status_id"); }
    public function planoTrabalho() { return $this->belongsTo(PlanoTrabalho::class); }
    public function avaliador() { return $this->belongsTo(Usuario::class); }  //nullable
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class); }    //nullable

}