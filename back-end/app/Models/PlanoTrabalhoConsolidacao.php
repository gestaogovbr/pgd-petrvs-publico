<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Models\TipoAvaliacao;


class PlanoTrabalhoConsolidacao extends ModelBase
{
    protected $table = 'planos_trabalhos_consolidacoes';

    protected $with = [];

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // Belongs
    public function planoTrabalho() { return $this->belongsTo(PlanoTrabalho::class); }
    public function avaliador() { return $this->belongsTo(Usuario::class); }
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class); }

}