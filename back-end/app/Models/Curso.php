<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\AreaConhecimento;
use App\Models\TipoCurso;
use App\Models\Materia;

class Curso extends ModelBase
{
    protected $table = 'cursos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do curso
        'titulo', /* varchar(64); NOT NULL; */// Titulação do curso->Graduação, Pos, etc
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Curso ativo ou inativo
        'area_id', /* char(36); NOT NULL; */
        'tipo_curso_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

     // Belongs
     public function areaConhecimento() { return $this->belongsTo(AreaConhecimento::class,'area_id'); }
     public function tipoCurso() { return $this->belongsTo(TipoCurso::class,'tipo_curso_id'); }
      // Has
     public function materia() { return $this->hasMany(Materia::class); }
     public function curriculumGraduacao() { return $this->hasMany(CurriculumGraduacao::class); }
     public function historicosCursosInternos() { return $this->hasMany(HistoricoCursoInternoCurriculum::class); }
     public function historicosDocenciasInternas() { return $this->hasMany(HistoricoDocenciaInternaCurriculum::class); }
     public function historicosDocenciasExternas() { return $this->hasMany(HistoricoDocenciaExternaCurriculum::class); }
 
    
}
