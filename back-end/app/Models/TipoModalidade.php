<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\Plano;

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
    ];

    public $delete_cascade = ['documento'];

    // Has
    public function planos() { return $this->hasMany(Plano::class, 'tipo_modalidade_id'); }
    public function entidades() { return $this->hasMany(Entidade::class, 'tipo_modalidade_id'); }
    // Belongs
    //public function documento() { return $this->belongsTo(Documento::class, 'documento_id'); }
}
