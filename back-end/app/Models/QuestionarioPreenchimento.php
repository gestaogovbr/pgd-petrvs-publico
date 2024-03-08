<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Questionario;
use App\Models\Usuario;
use App\Models\QuestionarioRespostaPergunta;
use App\Casts\AsJson;


class QuestionarioResposta extends ModelBase
{
    protected $table = 'questionarios_respostas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_respostas', /* datetime; NOT NULL; */// Data e hora das respostas
        'editavel', /* tinyint; NOT NULL; DEFAULT: '1'; */// Possibilidade de editar as respostas
        'versao', /* integer */// Versão do questionario
        'usuario_id', /* char(36); */
        'questionario_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

   //public $delete_cascade = ['questionario_resposta_pergunta']

    /*protected $casts = [
        'respostas' => AsJson::class
    ];**/
  
    //public $fillable_changes = ['questionario_resposta_pergunta'];

    //public $fillable_relation = [];

     // Belongs
     public function questionario() { return $this->belongsTo(Questionario::class); }
     public function usuario() { return $this->belongsTo(Usuario::class); }

     //has Many
     public function questionarioRespostaPergunta() { return $this->hasMany(QuestionarioRespostaPergunta::class); }
 
    
}

