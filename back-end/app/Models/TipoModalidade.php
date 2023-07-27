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
        'plano_trabalho_assinatura_participante', /* tinyint; NOT NULL; DEFAULT: '1'; */// Exigir assinatura do usuário no plano de trabalho
        'plano_trabalho_assinatura_gestor_unidade', /* tinyint; NOT NULL; */// Exigir assinatura do gestor da unidade do plano de trabalho
        'plano_trabalho_assinatura_gestor_entidade', /* tinyint; NOT NULL; */// Exigir assinatura do gestor da entidade do plano de trabalho
        'plano_trabalho_calcula_horas', /* tinyint; NOT NULL; */// 
        'atividade_tempo_despendido', /* tinyint; NOT NULL; */// Se calcula tempo despendido na atividade
        'atividade_esforco', /* tinyint; NOT NULL; */// Se utiliza esforço (tempo para execução) na atividade
        //'deleted_at', /* timestamp; */
    ];

    public $delete_cascade = ['documento'];

    // Has
    public function planosTrabalho() { return $this->hasMany(PlanoTrabalho::class); } 
    public function entidades() { return $this->hasMany(Entidade::class); }
    // Belongs
}
