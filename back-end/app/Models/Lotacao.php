<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Unidade;

class Lotacao extends ModelBase
{
    protected $table = 'lotacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'principal', /* tinyint; NOT NULL; */// Se é a lotação principal do usuário
        'usuario_id', /* char(36); NOT NULL; */
        'unidade_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];    

    // Has
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function unidade() { return $this->belongsTo(Unidade::class); }    
}