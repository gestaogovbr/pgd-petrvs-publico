<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Casts\AsJson;
use App\Models\Curriculum;
use App\Models\CentroTreinamento;
use App\Models\Cargo;
use App\Models\GrupoEspecializado;

class CurriculumProfissional extends ModelBase
{
    protected $table = 'curriculums';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'telefone', /* varchar(64); NOT NULL; */// Telefone
        //'deleted_at', /* timestamp; */
        //'apresentacao', /* longtext; NOT NULL; */// Apresentação
        //'idiomas', /* json; */// Idiomas que fala
        //'estado_civil', /* varchar(64); */// Estado Civil
        //'quantidade_filhos', /* tinyint; NOT NULL; */// Qtde de filhos
        //'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Curriculum ativa ou inativa
        //'usuario_id', /* char(36); NOT NULL; */
        //'cidade_id', /* char(36); NOT NULL; */
    ];

    protected $casts = [

       
    ];

    //public $fillable_changes = ['graduacoes'];

    //public $fillable_relation = [];

    //Has
   // public function graduacoes() { return $this->hasMany(CurriculumGraduacao::class,'curriculum_id'); }

    // Belongs
    public function curriculum() { return $this->belongsTo(Curriculum::class,'curriculum_id'); }
    public function centroTreinamento() { return $this->belongsTo(CentroTreinamento::class,'centro_treinamento_id'); }
    public function cargo() { return $this->belongsTo(Cargo::class,'cargo_id'); }
    public function grupoEspecializado() { return $this->belongsTo(GrupoEspecializado::class,'grupo_especializado_id'); }
        
}

