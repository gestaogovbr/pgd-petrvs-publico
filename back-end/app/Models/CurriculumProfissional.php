<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Curriculum;
use App\Models\CentroTreinamento;
use App\Models\Cargo;
use App\Models\GrupoEspecializado;

class CurriculumProfissional extends ModelBase
{
    protected $table = 'curriculums';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'telefone', /* varchar(64); NOT NULL; */// Telefone
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

