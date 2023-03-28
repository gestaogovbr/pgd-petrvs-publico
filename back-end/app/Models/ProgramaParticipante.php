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
        'habilitado', /* varchar(255); NOT NULL; */// Nome do programa de gestão
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'programa_id', /* char(36); */
        'usuario_id', /* char(36); NOT NULL; */
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    public $delete_cascade = [];

    // Belongs
    public function programa() { return $this->belongsTo(Programa::class); }    
    public function usuario() { return $this->belongsTo(Usuario::class); }    

}
