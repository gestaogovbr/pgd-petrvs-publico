<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Casts\AsJson;


class RespostaQuestionario extends ModelBase
{
    protected $table = 'respostas_questionarios';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_hora', /* datetime; NOT NULL; */// Data e hora das respostas
        'editavel', /* tinyint; NOT NULL; DEFAULT: '1'; */// Possibilidade de editar as respostas
        'respostas', /* json; */// Respostas do questionário
        //'deleted_at', /* timestamp; */
        //'usuario_id', /* char(36); */
        //'curriculum_id', /* char(36); */
        //'questionario_id', /* char(36); NOT NULL; */
    ];

    protected $casts = [
        'respostas' => AsJson::class
    ];
 
    
    // Chaves estrangeiras:
    $table->foreignUuid('usuario_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade');
    $table->foreignUuid('curriculum_id')->nullable()->constrained("curriculums")->onDelete('restrict')->onUpdate('cascade');
    $table->foreignUuid('questionario_id')->constrained("questionarios")->onDelete('restrict')->onUpdate('cascade');
    //public $fillable_changes = ['graduacoes'];

    //public $fillable_relation = [];

    //Has
    public function curriculum() { return $this->hasMany(Curriculum::class,'curriculum_id'); }
    public function usuario() { return $this->hasMany(CentroTreinamento::class,'usuario_id'); }

    // Belongs
    public function questionario() { return $this->belongsTo(Questionario::class,'questionario_id'); }
    
}

