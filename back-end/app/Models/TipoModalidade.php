<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Models\Entidade;

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
        //'deleted_at', /* timestamp; */
    ];

    public $delete_cascade = ['documento'];

    // Has
    public function planosTrabalho() { return $this->hasMany(PlanoTrabalho::class); } //OK//
    public function entidades() { return $this->hasMany(Entidade::class); }//OK//
    // Belongs
}
