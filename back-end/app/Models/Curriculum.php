<?php

namespace App\Models;

use App\Models\Usuario;
use App\Models\ModelBase;
use App\Casts\AsJson;

class Curriculum extends ModelBase
{
    protected $table = 'curriculums';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'apresentacao', /* longtext; NOT NULL; */// Apresentação
        'telefone', /* varchar(64); NOT NULL; */// Telefone
        'idiomas', /* json; */// Idiomas que fala
        'estado_civil', /* varchar(64); */// Estado Civil
        'quantidade_filhos', /* tinyint; NOT NULL; */// Qtde de filhos
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Curriculum ativa ou inativa
        'usuario_id', /* char(36); NOT NULL; */
        'cidade_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    protected $casts = [
        'idiomas' => AsJson::class,
    ];

    //public $fillable_changes = ['graduacoes'];

    public $fillable_relation = ['graduacoes'];

    //Has Many
    public function graduacoes() { return $this->hasMany(CurriculumGraduacao::class); }
    public function respostaQuestionario() { return $this->hasMany(RespostaQuestionario::class); }
    //Has One
    public function profissional() { return $this->hasOne(CurriculumProfissional::class); }
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }
    public function cidade() { return $this->belongsTo(Cidade::class); }

        
}
