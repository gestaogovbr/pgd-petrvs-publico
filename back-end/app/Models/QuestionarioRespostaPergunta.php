<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\QuestionarioPergunta;
use App\Models\QuestionarioResposta;
use App\Casts\AsJson;


class QuestionarioRespostaPergunta extends ModelBase
{
    protected $table = 'questionarios_respostas_perguntas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'resposta', /* json resposta do questionario**/
        'questionario_pergunta_id', /* char(36); */
        'questionario_resposta_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    protected $casts = [
        'resposta' => AsJson::class
    ];
   
    //public $fillable_changes = ['graduacoes'];

    //public $fillable_relation = [];

     // Has
     public function questionarioPergunta() { return $this->hasMany(QuestionarioPergunta::class); }
     //public function questionarioPergunta() { return $this->belongsTo(QuestionarioPergunta::class); }
     //public function curriculum() { return $this->belongsTo(Curriculum::class); }
     public function questionarioResposta() { return $this->hasMany(QuestionarioResposta::class); }
     //public function questionarioResposta() { return $this->belongsTo(QuestionarioResposta::class); }
 
    
}

