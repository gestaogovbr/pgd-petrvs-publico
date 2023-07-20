<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Programa;

class ProgramaParticipante extends ModelBase
{
    protected $table = 'programas_participantes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'habilitado', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se o participante está habilitado ou não para o programa
        'programa_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    public $delete_cascade = [];

    // Belongs
    public function programa() { return $this->belongsTo(Programa::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }     


}
