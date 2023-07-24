<?php

namespace App\Models;

use App\Models\ModelBase;

class IntegracaoUnidade extends ModelBase
{
    protected $table = 'integracao_unidades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'id_servo',
        'pai_servo',
        'codigo_siape',
        'pai_siape',
        'codupag',
        'nomeuorg',
        'siglauorg',
        'telefone',
        'email',
        'natureza',
        'fronteira',
        'fuso_horario',
        'cod_uop',
        'cod_unidade',
        'tipo',
        'tipo_desc',
        'na_rodovia',
        'logradouro',
        'bairro',
        'cep',
        'ptn_ge_coordenada',
        'municipio_siafi_siape',
        'municipio_siscom',
        'municipio_ibge',
        'municipio_nome',
        'municipio_uf',
        'ativa',
        'regimental',
        'datamodificacao',
        'und_nu_adicional',
        'cnpjupag'
    ];

    protected $casts = [];
}
