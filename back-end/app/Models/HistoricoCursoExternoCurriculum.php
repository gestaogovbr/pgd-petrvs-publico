<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CurriculumProfissional;
use App\Models\Curso;
use App\Traits\AutoDataInicio;


class HistoricoCursoExternoCurriculum extends ModelBase
{
    protected $table = 'historicos_cursos_externos_curriculum';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        
        'nome', 
        'pretensao',
        'curriculum_profissional_id',
        'area_atividade_externa_id',
                
    ];
    /*
    protected $casts = [
        'nome' => AsJson::class,
    ];*/

     // Belongs
    public function curriculumProfissional() { return $this->belongsTo(CurriculumProfissional::class); }
    public function areaAtividadeExterna() { return $this->belongsTo(AreaAtividadeExterna::class); }
  
    
}
