<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Programa;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class ProgramaParticipante extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'programas_participantes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'habilitado', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se o perticipantes está habilitado para o programa
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência do registro
        'programa_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); */
        //'data_fim', /* datetime; */// Data fim da vigência do registro
    ];

    public $delete_cascade = [];

    // Belongs
    public function programa() { return $this->belongsTo(Programa::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    

}
