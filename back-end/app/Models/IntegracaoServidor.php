<?php

namespace App\Models;

use App\Models\ModelBase;

class IntegracaoServidor extends ModelBase
{
    protected $table = 'integracao_servidores';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'cpf_ativo',
        'data_modificacao',
        'cpf',
        'nome',
        'emailfuncional',
        'sexo',
        'municipio',
        'uf',
        'datanascimento',
        'telefone',
        'vinculo_ativo',
        'matriculasiape',
        'tipo',
        'coduorgexercicio',
        'coduorglotacao',
        'codigo_servo_exercicio',
        'nomeguerra',
        'codsitfuncional',
        'codupag',
        'dataexercicionoorgao',
        'funcoes'
    ];

    protected $casts = [];
}
