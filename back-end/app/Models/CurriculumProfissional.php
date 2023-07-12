<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Curriculum;
use App\Models\CentroTreinamento;
use App\Models\Cargo;
use App\Models\GrupoEspecializado;

class CurriculumProfissional extends ModelBase
{
    protected $table = 'curriculums_profissionais';

    public $fillable = [ 
        'lotacao_atual',
        'especifique_habilidades',
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
        'grupo_especializado_id',
    ];

    protected $casts = [
        'especifique_habilidades' => AsJson::class,
    ];

    //public $fillable_changes = ['graduacoes'];

    //public $fillable_relation = [];

    //Has
   // public function graduacoes() { return $this->hasMany(CurriculumGraduacao::class,'curriculum_id'); }

    // Belongs
    public function curriculum() { return $this->belongsTo(Curriculum::class); }
    public function centroTreinamento() { return $this->belongsTo(CentroTreinamento::class); }
    public function cargo() { return $this->belongsTo(Cargo::class); }
    public function grupoEspecializado() { return $this->belongsTo(GrupoEspecializado::class); }
    public function historicoAtividadeExterna() { return $this->hasMany(HistoricoAtividadeExterna::class); }
}

