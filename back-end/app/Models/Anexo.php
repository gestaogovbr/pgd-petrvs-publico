<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Comentario;

class Anexo extends ModelBase
{
    protected $table = 'anexos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do arquivo com extensão
        'descricao', /* varchar(256); NOT NULL; */// Descrição do anexo
        'data_hora', /* datetime; NOT NULL; */// Data e horário que foi feito o comentário
        'path', /* varchar(256); */// Path relativo do arquivo
        'base64', /* text; */// Arquivo em formato base64
        'usuario_id', /* char(36); */// Referente ao Usuário
        'comentario_id', /* char(36); */// Referente ao Comentário
        //'deleted_at', /* timestamp; */
    ];
   
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }  //nullable   
    public function comentario() { return $this->belongsTo(Comentario::class); }      //nullable
}
