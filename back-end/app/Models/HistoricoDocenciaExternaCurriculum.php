<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\AreaAtividadeExterna;
use App\Models\Curso;
use App\Traits\AutoDataInicio;


class HistoricoDocenciaExternaCurriculum extends ModelBase
{
    protected $table = 'historicos_docencias_externas_curriculum';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'curriculum_profissional_id',
        'area_atividade_externa_id',
        'curso_id',
                
    ];

     // Belongs
    public function curriculumProfissional() { return $this->belongsTo(CurriculumProfissional::class); }
    public function curso() { return $this->belongsTo(Curso::class); }
    public function areaAtividadeExterna() { return $this->belongsTo(AreaAtividadeExterna::class); }
    
}
