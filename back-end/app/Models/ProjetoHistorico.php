<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\Usuario;

class ProjetoHistorico extends ModelBase
{
    protected $table = 'projetos_historicos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_hora', /* datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; */// Data e hora da modificação
        'completo', /* tinyint; NOT NULL; */// Se o delta corresponde ao objeto completo
        'delta', /* json; NOT NULL; */// Delta do objeto (ou objeto completo)
        'projeto_id', /* char(36); NOT NULL; */// Projeto
        'usuario_id', /* char(36); NOT NULL; */// Usuário
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [];

    public $fillable_relations = [];

    public $delete_cascade = [];

    // Has
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    
}