<?php

namespace App\Models;

use App\Models\ModelBase;

class IntegracaoServidor extends ModelBase
{
    protected $table = 'integracao_servidores';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'cpf_ativo', /* varchar(50); */
        'data_modificacao', /* varchar(50); */
        'cpf', /* varchar(50); */
        'nome', /* varchar(100); */
        'emailfuncional', /* varchar(100); */
        'sexo', /* varchar(50); */
        'municipio', /* varchar(100); */
        'uf', /* varchar(50); */
        'datanascimento', /* varchar(50); */
        'telefone', /* varchar(50); */
        'vinculo_ativo', /* varchar(50); */
        'matriculasiape', /* varchar(50); */
        'tipo', /* varchar(50); */
        'coduorgexercicio', /* varchar(50); */
        'coduorglotacao', /* varchar(50); */
        'codigo_servo_exercicio', /* varchar(50); */
        'nomeguerra', /* varchar(100); */
        'codsitfuncional', /* varchar(50); */
        'codupag', /* varchar(50); */
        'dataexercicionoorgao', /* varchar(50); */
        'funcoes', /* json; */
    ];

    protected $casts = [];
}
