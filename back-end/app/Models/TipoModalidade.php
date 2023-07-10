<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Plano;
use App\Models\Documento;
use App\Models\TipoModalidadeConfig;

class TipoModalidade extends ModelBase
{
    protected $table = 'tipos_modalidades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da modalidade
        'config', /* json; */
        'atividades_homologadas', /* tinyint; NOT NULL; */// Permitir apenas atividades homologadas
        'dispensa_avaliacao', /* tinyint; NOT NULL; */// Dispensa a avaliação
        'exige_assinatura', /* tinyint; NOT NULL; */// Exigir assinatura
        'exige_adesao', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se será necessário o participante realiza a adesão
        'exige_assinatura_gestor_unidade', /* tinyint; NOT NULL; */// Exigir assinatura do gestor da unidade do plano
        'exige_assinatura_gestor_entidade', /* tinyint; NOT NULL; */// Exigir assinatura do gestor da entidade
        'calcula_tempo_despendido', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se calcula tempo despendido
        'comparecer_presencialmente', /* tinyint; NOT NULL; DEFAULT: '1'; */// Se será necessário comparecer presencialmente quando convocado
        'ganho_produtividade', /* int; NOT NULL; */// Ganho de produtividade
    ];

    public $delete_cascade = ['documento'];

    // Has
    public function planos() { return $this->hasMany(Plano::class, 'tipo_modalidade_id'); }
    public function entidades() { return $this->hasMany(Entidade::class, 'tipo_modalidade_id'); }
    // Belongs
    //public function documento() { return $this->belongsTo(Documento::class, 'documento_id'); }
}
