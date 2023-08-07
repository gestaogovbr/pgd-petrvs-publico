<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoUuid;

class IntegracaoUnidade extends ModelBase
{
    use AutoUuid;

    protected $table = 'integracao_unidades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'id_servo', /* varchar(50); */
        'pai_servo', /* varchar(50); */
        'codigo_siape', /* varchar(50); */
        'pai_siape', /* varchar(50); */
        'codupag', /* varchar(50); */
        'nomeuorg', /* varchar(200); */
        'siglauorg', /* varchar(50); */
        'telefone', /* varchar(50); */
        'email', /* varchar(100); */
        'natureza', /* varchar(50); */
        'fronteira', /* varchar(50); */
        'fuso_horario', /* varchar(50); */
        'cod_uop', /* varchar(50); */
        'cod_unidade', /* varchar(50); */
        'tipo', /* varchar(50); */
        'tipo_desc', /* varchar(100); */
        'na_rodovia', /* varchar(50); */
        'logradouro', /* varchar(100); */
        'bairro', /* varchar(100); */
        'cep', /* varchar(50); */
        'ptn_ge_coordenada', /* varchar(50); */
        'municipio_siafi_siape', /* varchar(100); */
        'municipio_siscom', /* varchar(100); */
        'municipio_ibge', /* varchar(50); */
        'municipio_nome', /* varchar(100); */
        'municipio_uf', /* varchar(50); */
        'ativa', /* varchar(50); */
        'regimental', /* varchar(50); */
        'datamodificacao', /* varchar(50); */
        'und_nu_adicional', /* varchar(50); */
        'cnpjupag', /* varchar(60); */
    ];

    protected $casts = [];

    protected $keyType = 'string';
}
