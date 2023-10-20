<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Atividade;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\PlanoEntregaEntrega;

class Reacao extends ModelBase
{
    protected $table = 'reacoes';
   
    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'tipo', /* enum('COMENTARIO','TECNICO','GERENCIAL','AVALIACAO','TAREFA','ATIVIDADE'); NOT NULL; DEFAULT: 'COMENTARIO'; */// Tipo do comentário
        'usuario_id', /* char(36); NOT NULL; */
        'atividade_id', /* char(36); */
        'plano_trabalho_entrega_id', /* char(36); */
        'plano_entrega_entrega_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    // Has
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function atividade() { return $this->belongsTo(Atividade::class); }    //nullable
    public function planoTrabalhoEntrega() { return $this->belongsTo(PlanoTrabalhoEntrega::class); }    //nullable
    public function planoEntregaEntrega() { return $this->belongsTo(PlanoEntregaEntrega::class); }    //nullable
}
