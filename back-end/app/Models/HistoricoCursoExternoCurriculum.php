<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;

class HistoricoCursoExternoCurriculum extends ModelBase
{
    protected $table = 'historicos_cursos_externos_curriculum';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(128); NOT NULL; */// Nome do curso externo
        'pretensao', /* tinyint; NOT NULL; */// Pretende ou não fazer o curso
        'curriculum_profissional_id', /* char(36); NOT NULL; */
        'area_atividade_externa_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];
    
    protected $casts = [];

     // Belongs
    public function curriculumProfissional() { return $this->belongsTo(CurriculumProfissional::class); }
    public function areaAtividadeExterna() { return $this->belongsTo(AreaAtividadeExterna::class); }
  
}
