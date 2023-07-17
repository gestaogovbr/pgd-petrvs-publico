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

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'lotacao_atual', /* varchar(255); */// Lotação atual
        'especifique_habilidades', /* json; */// Especifique suas habilidades: (Ex: Desenvolvo em JavaScript)
        'viagem_nacional', /* tinyint; NOT NULL; */// Já fez viagem nacional a trabalho
        'viagem_internacional', /* tinyint; NOT NULL; */// Já fez viagem internacional a trabalho
        'interesse_bnt', /* tinyint; NOT NULL; */// Você tem interesse na participação do Banco Nacional de Talentos
        'pgd_inserido', /* varchar(255); */// Você está inserido no programa de gestão da Instituição
        'pgd_interesse', /* varchar(255); */// Você tem interesse em participar do programa de gestão da Instituição
        'telefone', /* varchar(64); */// Telefone do chefe imediato
        'remocao', /* tinyint; NOT NULL; */// Você tem interesse em remoção
        'curriculum_id', /* char(36); NOT NULL; */
        'centro_treinamento_id', /* char(36); NOT NULL; */
        'cargo_id', /* char(36); NOT NULL; */
        'grupo_especializado_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
        //'ano_ingresso', /* tinyint; NOT NULL; */// Ano de ingresso
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

