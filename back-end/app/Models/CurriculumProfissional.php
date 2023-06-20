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
        'ano_ingresso',
        'funcoes',
        'unidades_lotado',
        'lotacao_atual',
        'atividades_fora',
        'atividades_internas',
        'especifique_habilidades',
        'docencia_fora',
        'docencia_interna',
        'curso_fora',
        'curso_interno',
        'viagem_nacional',
        'viagem_internacional',
        'interesse_bnt',
        'pgd_inserido',
        'pgd_interesse',
        'telefone',
        'remocao',
        'curriculum_id',
        'centro_treinamento_id',
        'cargo_id',
        'grupo_especializado_id'

    ];

    protected $casts = [
        'funcoes' => AsJson::class,
        'unidades_lotado' => AsJson::class,
        'atividades_fora' => AsJson::class,
        'atividades_internas' => AsJson::class,
        'especifique_habilidades' => AsJson::class,
        'docencia_fora' => AsJson::class,
        'docencia_interna' => AsJson::class,
        'curso_fora' => AsJson::class,
        'curso_interno' => AsJson::class,
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

